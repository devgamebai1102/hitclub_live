import Player from "./ShootFish.Player";
import Bullet from "./ShootFish.Bullet";
import Utils from "./common/Utils";
import Fish from "./ShootFish.Fish";
import Configs from "./common/Configs";
import Tween from "./common/Tween";
import CoinEffect from "./ShootFish.CoinEffect";
import EffectJackpot from "./ShootFish.EffectJackpot";

import Lobby from "./ShootFish.Lobby";
import PanelMenu from "./ShootFish.PanelMenu";
import PopupGuide from "./ShootFish.PopupGuide";
import EffectBigWin from "./ShootFish.EffectBigWin";
import ShootFishNetworkClient from "./networks/ShootFishNetworkClient";
import AudioManager from "./common/Common.AudioManager";


//import * as SAT from 'sat';
// import SAT from 'sat';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Play extends cc.Component {

    public static instance: Play = null;
    public static SERVER_CONFIG = null;

    @property(cc.Node)
    lobby: cc.Node = null;
    @property(cc.Node)
    loading: cc.Node = null;
    @property(cc.Node)
    touchPad: cc.Node = null;
    @property([cc.SpriteFrame])
    sprFramesBullet: cc.SpriteFrame[] = [];
    @property(cc.Node)
    bulletTemplate: cc.Node = null;
    @property([Player])
    players: Player[] = [];
    @property([cc.Node])
    fishsAnim: cc.Node[] = [];
    @property(cc.Node)
    fishsNode: cc.Node = null;
    @property(cc.Node)
    fishTemplate: cc.Node = null;
    @property(cc.Node)
    coinEffectTemplate: cc.Node = null;
    @property(cc.Label)
    lblJackpot: cc.Label = null;
    @property(cc.Toggle)
    toggleAuto: cc.Toggle = null;
    @property(cc.Node)
    target: cc.Node = null;
    @property(cc.Node)
    waveState: cc.Node = null;

    @property(cc.Button)
    btnFastShoot: cc.Button = null;
    @property(cc.ProgressBar)
    progressFastShoot: cc.ProgressBar = null;
    @property(cc.Label)
    lblFastShootTime: cc.Label = null;

    @property(cc.Button)
    btnTargetFish: cc.Button = null;
    @property(cc.ProgressBar)
    progressTargetFish: cc.ProgressBar = null;
    @property(cc.Label)
    lblTargetFishTime: cc.Label = null;

    //effect
    @property(EffectJackpot)
    effectJackpot: EffectJackpot = null;
    @property(EffectBigWin)
    effectBigWin: EffectBigWin = null;
    @property(EffectBigWin)
    effectMegaWin: EffectBigWin = null;
    @property(PanelMenu)
    panelMenu: PanelMenu = null;
    @property(cc.Node)
    popupGuide: cc.Node = null;
    @property(cc.Label)
    lblPing: cc.Label = null;
    @property(cc.Label)
    lblServerTime: cc.Label = null;

    //audio
    @property({ type: cc.AudioClip })
    clipClick: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    clipHit: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    clipCoin: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    clipJackpot: cc.AudioClip = null;

    public mePlayer: Player = null;
    private bullets: Bullet[] = [];
    private fishs: Fish[] = [];
    private coinEffects: CoinEffect[] = [];
    private isStateGeted = false;
    private inited = false;
    private lastUpdateTime = -1;

    private roomId = 0;
    private listBet: Array<number> = [];
    private listJackpot: Array<number> = [];
    private betIdx = 0;
    private readonly mapPlayersIdx = [
        [0, 1, 2, 3],
        [1, 0, 3, 2],
        [2, 3, 0, 1],
        [3, 2, 1, 0]
    ];

    private shootInterval = 0.6;
    private fastShootInterval = 0.4;
    private curShootInterval = 0;
    private isShoot = false;
    private isFastShoot = false;
    private isTargetFish = false;

    private targetFish: Fish = null;
    private readonly intervalFindTargetFish = 4;
    private curIntervalFindTargetFish = 0;

    private curTimeFastShootCountdown = 0;
    private curTimeTargetFishCountdown = 0;
    private tweens = new Array<cc.Tween>();
    private countShoot = 0;

    private init() {
        if (this.inited) return;

        this.mePlayer = this.players[0];
    }

    onLoad() {
        Play.instance = this;
    }

    start() {
        this.bulletTemplate.active = false;

        this.touchPad.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            var touchPos = event.getLocation();
            this.mePlayer.rotateGun(touchPos);
            this.isShoot = true;
        }, this.touchPad);

        this.touchPad.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Event.EventTouch) => {
            var touchPos = event.getLocation();
            this.mePlayer.rotateGun(touchPos);
        }, this.touchPad);

        this.touchPad.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
            this.isShoot = false;
        }, this.touchPad);

        this.touchPad.on(cc.Node.EventType.TOUCH_CANCEL, (event: cc.Event.EventTouch) => {
            this.isShoot = false;
        }, this.touchPad);

        this.toggleAuto.node.on("toggle", () => {
            this.playClickSound();
            if (this.toggleAuto.isChecked) {
                this.touchPad.active = false; //false
                this.curIntervalFindTargetFish = this.intervalFindTargetFish;
                this.isShoot = true;
                this.btnTargetFish.node.active = false;
                this.findTargetFishInWorld();
            } else {
                this.btnTargetFish.node.active = true;
                this.stopAutoShoot();
            }
        });

        ShootFishNetworkClient.getInstance().addListener((route, data) => {
            if (!this.node.active || !this.isStateGeted) return;
            switch (route) {
                case "OnUpdateJackpot": {
                    //console.log("route: " + route + " data: "+ JSON.stringify(data));
                    this.listJackpot.length = 0;
                    this.listJackpot.push(data[this.roomId + "1"]);
                    this.listJackpot.push(data[this.roomId + "2"]);
                    this.listJackpot.push(data[this.roomId + "3"]);
                    this.listJackpot.push(data[this.roomId + "4"]);

                    Tween.numberTo(this.lblJackpot, this.listJackpot[this.betIdx], 0.3);
                    break;
                }
                case "OnEnterPlayer": {
                    //console.log("route: " + route + " data: "+ JSON.stringify(data));
                    let playerData = data["data"];
                    let localPos = this.mapPlayersIdx[this.mePlayer.serverPos][playerData["posIndex"]];
                    let player = this.players[localPos];
                    player.set(playerData["id"], playerData["playerId"], playerData["nickname"], playerData["cash"], playerData["avatar"], playerData["serviceId"]);
                    player.serverPos = playerData["posIndex"];
                    player.lblBet.string = Utils.formatNumberMin(this.listBet[this.betIdx]);
                    break;
                }
                case "OnLeavePlayer": {
                    // console.log("route: " + route + " data: " + JSON.stringify(data));
                    let username = data["playerId"];
                    if (username == Configs.Login.UsernameFish) {
                        if (data["reason"] == 1) {
                            // App.instance.alertDialog.showMsg("Bạn được mời ra khỏi phòng do không thao tác trong thời gian dài.");
                            cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Bạn được mời ra khỏi phòng do không thao tác trong thời gian dài.");
                        }
                        this.back();
                    }
                    let player = this.getPlayerByUsername(username);
                    if (player == null) break;
                    player.leave();
                    break;
                }
                case "OnUpdateObject": {
                    //console.log("route: " + route + " data: "+ JSON.stringify(data));
                    let fishId = data["id"];
                    let fish = this.getFishById(fishId);
                    if (fish == null) {
                        // console.log("can't find fish " + fishId);
                        break;
                    }
                    fish.setData(data);

                    break;
                }
                case "OnUpdateCash": {
                    // console.log("route: " + route + " data: "+ JSON.stringify(data));
                    let username = data['playerId'];
                    let coin = Number(data['cash']);
                    let scr = data['scr'];
                    if (username == Configs.Login.UsernameFish) {
                        Configs.Login.CoinFish = coin;
                    }
                    let player = this.getPlayerByUsername(username);
                    if (player == null) break;
                    player.coin = coin;
                    player.lblCoin.string = Utils.formatNumber(coin);

                    switch (scr) {
                        case 2:
                            //jackpot
                            this.effectBigWin.show(false);
                            this.effectMegaWin.show(false);
                            this.effectJackpot.show(true, player.nickname, coin, player.serviceId);
                            AudioManager.getInstance().playEffect(this.clipJackpot);
                            break;
                        case 3:
                            //ech ngam vang
                            break;
                    }
                    break;
                }
                case "OnObjectDie": {
                    //console.log("route: " + route + " data: "+ JSON.stringify(data));
                    let fishId = data["id"];
                    let coin = data["value"];
                    let playerId = data["playerId"];

                    let fish = this.getFishById(fishId);
                    if (fish == null) break;
                    fish.die();

                    //reset targetFish
                    if (fish == this.targetFish) {
                        this.exploreAllBulletWithTargetFishId(this.targetFish.id);
                        this.target.active = false;
                        this.targetFish = null;
                        this.curIntervalFindTargetFish = 0;
                    }

                    let player = this.getPlayerByUsername(playerId);
                    if (player == null) break;
                    //coin effect
                    let coinEffect = this.getCoinEffect();
                    coinEffect.run(coin, fish.node.position, player.node.position);

                    switch (fish.type) {
                        case 15:
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                        case 20:
                        case 21:
                            if (!this.effectJackpot.node.active)
                                this.effectMegaWin.show(true, player.nickname, coin, player.serviceId);
                            break;
                        case 22:
                        case 23:
                        case 24:
                            if (!this.effectJackpot.node.active)
                                this.effectBigWin.show(true, player.nickname, coin, player.serviceId);
                            break;
                        case 10:
                            //an than tai
                            break;
                    }
                    break;
                }
                case "OnShoot": {
                    // console.log("route: " + route + " data: " + JSON.stringify(data));
                    let username = data["playerId"];
                    let betIdx = Number(data['type']) - 1;
                    let rad = data['rad'];
                    let target = Number(data["target"]);
                    let cash = Number(data['cash']);

                    if (username == Configs.Login.UsernameFish) break;

                    let player = this.getPlayerByUsername(username);

                    if (player == null) {
                        break;
                    }

                    var nameCheck = username.substring(0, 4);
                    if (nameCheck === '#BOT') {
                        player.updateCash(cash);
                    }

                    let radByMe = rad;
                    switch (this.mePlayer.serverPos) {
                        case 0:
                            radByMe = rad;
                            break;
                        case 1:
                            radByMe = Math.PI - rad;
                            break;
                        case 2:
                            radByMe = rad - Math.PI;
                            break;
                        case 3:
                            radByMe = -rad;
                            break;
                    }
                    player.lblBet.string = Utils.formatNumberMin(this.listBet[betIdx]);
                    player.gunRotate.rotation = (radByMe * Utils.Rad2Deg);
                    player.setGun(betIdx);
                    player.shoot();

                    var bullet = this.getBullet();
                    bullet.targetFishId = target;
                    bullet.bullet.getComponent(cc.Sprite).spriteFrame = this.sprFramesBullet[betIdx];
                    bullet.node.rotation = player.gunRotate.rotation;
                    var pos = bullet.node.parent.convertToNodeSpaceAR(player.gunRotate.convertToWorldSpaceAR(cc.Vec2.ZERO));
                    pos.x += Utils.degreesToVec2(bullet.node.rotation).x * 90;
                    pos.y += Utils.degreesToVec2(bullet.node.rotation).y * 90;
                    bullet.node.position = pos;
                    bullet.run();
                    AudioManager.getInstance().playEffect(this.clipHit);
                    break;
                }
                case "OnChat": {
                    //console.log("route: " + route + " data: "+ JSON.stringify(data));
                    break;
                }
                case "OnNewState": {
                    //console.log("route: " + route + " data: "+ JSON.stringify(data));
                    switch (data['state']) {
                        case 3: {
                            //ca tran
                            this.waveState.stopAllActions();
                            this.waveState.active = true;
                            let pos = this.waveState.position;
                            pos.x = 1400;
                            this.waveState.position = pos;
                            pos.x = -1400;
                            this.waveState.runAction(cc.sequence(cc.moveTo(1, pos), cc.callFunc(() => {
                                this.waveState.active = false;
                            })));
                            break;
                        }
                    }
                    break;
                }
                case "OnJackpot": {
                    //console.log("route: " + route + " data: "+ JSON.stringify(data));
                    let nickname = data['nickname'];
                    let value = data['value'];
                    let roomIdx = data['tableIndex'];

                    var roomName = "Phòng 1";
                    switch (roomIdx) {
                        case 2:
                            roomName = "Phòng 2";
                            break;
                        case 3:
                            roomName = "Phòng 3";
                            break;
                    }
                    let msg = "Chúc mừng \"" + nickname + "\" đã săn được " + Utils.formatNumber(value) + " Xu trong " + roomName + ".";

                    // this.effectJackpot.show(true, player.nickname, coin, player.serviceId);

                    break;
                }
                default:
                    // console.log("====route: " + route);
                    break;
            }
        }, this);

        this.init();
    }

    onDisable() {
        this.tweens.forEach(element => {
            element.stop();
        });
    }

    onDestroy() {
        this.tweens.forEach(element => {
            element.stop();
        });
    }

    update(dt) {
        if (this.lblPing != null) {
            this.lblPing.string = ShootFishNetworkClient.PING + "ms";
        }
        if (this.lblServerTime != null && this.lblServerTime.node.active) {
            this.lblServerTime.string = "t: " + ShootFishNetworkClient.systemCurrentTimeMillis() + " d: " + ShootFishNetworkClient.TIME_DISTANCE + " mp: " + ShootFishNetworkClient.MIN_PING;
        }

        let now = ShootFishNetworkClient.systemCurrentTimeMillis();
        if (this.isStateGeted && this.lastUpdateTime > 0 && now - this.lastUpdateTime > 500) {
            // console.log("onresume getstate");
            this.getState(false);
        }
        this.lastUpdateTime = now;

        if (this.curTimeFastShootCountdown > 0) {
            this.curTimeFastShootCountdown = Math.max(0, this.curTimeFastShootCountdown - dt);
            this.lblFastShootTime.string = Math.round(this.curTimeFastShootCountdown) + "s";
            if (this.curTimeFastShootCountdown == 0) {
                this.lblFastShootTime.node.active = false;
                this.btnFastShoot.enabled = true;
            }
        }

        if (this.curTimeTargetFishCountdown > 0) {
            this.curTimeTargetFishCountdown = Math.max(0, this.curTimeTargetFishCountdown - dt);
            this.lblTargetFishTime.string = Math.round(this.curTimeTargetFishCountdown) + "s";
            if (this.curTimeTargetFishCountdown == 0) {
                this.lblTargetFishTime.node.active = false;
                this.btnTargetFish.enabled = true;
            }
        }

        this.updateShoot(dt);

        //update bullets
        for (var i = 0, c = this.bullets.length; i < c; i++) {
            let bulet = this.bullets[i];
            bulet.updateRealTime(dt);
        }

        //update fishs
        var listFishPoly = new Array<SAT.Polygon>();
        for (var i = 0, c = this.fishs.length; i < c; i++) {
            let fish = this.fishs[i];
            fish.updateRealTime(dt);
            if (fish.node.active && Math.abs(fish.node.x) < 640 * 1.1 && Math.abs(fish.node.y) < 360 * 1.1) {
                listFishPoly.push(fish.getPolygon());
            } else {
                listFishPoly.push(null);
            }
        }

        //check collision
        for (var i = 0, cBullet = this.bullets.length; i < cBullet; i++) {
            var bullet = this.bullets[i];
            if (!bullet.node.active || bullet.isExploring || bullet.isExplored) continue;
            var bulletCircle = bullet.getCircle();
            for (var j = 0, cFish = this.fishs.length; j < cFish; j++) {
                var fish = this.fishs[j];
                if (listFishPoly[j] == null) continue;
                if (bullet.targetFishId > 0 && bullet.targetFishId != fish.id) continue;
                var isCollision = SAT.testCirclePolygon(bulletCircle, listFishPoly[j]);
                if (isCollision) {
                    bullet.explore();
                    fish.hurt();
                    break;
                }
            }
        }
        listFishPoly.length = 0;//clear memory
    }

    private play() {
        this.isStateGeted = false;
        this.resetView();
        ShootFishNetworkClient.getInstance().ping(() => {
            ShootFishNetworkClient.getInstance().ping(() => {
                ShootFishNetworkClient.getInstance().ping(() => {
                    // console.log(this.roomId);
                    ShootFishNetworkClient.getInstance().request("play", {
                        "playerId": Configs.Login.UsernameFish,
                        "password": Configs.Login.PasswordFish,
                        "index": this.roomId,//roomId
                        'access_token': Configs.Login.Token
                    }, (res) => {
                        // console.log(res);
                        if (!res["ok"]) {
                            switch (res["err"]) {
                                case 4:
                                    // App.instance.confirmDialog.show2("Số dư không đủ vui lòng nạp thêm.", (isConfirm) => {
                                    //     if (isConfirm) {
                                    //         Lobby.instance.popupCoinTransfer.show();
                                    //     }
                                    // });
                                    cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Số dư không đủ vui lòng nạp thêm.");
                                    break;
                                case 1:
                                    ShootFishNetworkClient.getInstance().request("quit", null, () => {
                                    }, this);
                                    // App.instance.alertDialog.showMsg("Lỗi " + res["err"] + ", vui lòng thử lại.");
                                    cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Lỗi " + res["err"] + ", vui lòng thử lại.");
                                    break;
                                default:
                                    // App.instance.alertDialog.showMsg("Lỗi " + res["err"] + ", không xác định.");
                                    cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Lỗi " + res["err"] + ", không xác định.");
                                    break;
                            }
                            this.show(false);
                            this.lobby.getComponent(Lobby).show(true);
                            return;
                        }
                        this.getState(true);
                    }, this);
                }, this);
            }, this);
        }, this);
    }

    private resetView() {
        this.betIdx = 0;

        for (let i = 0; i < this.players.length; i++) {
            this.players[i].leave();
        }

        for (let i = 0; i < this.fishs.length; i++) this.fishs[i].node.removeFromParent();
        this.fishs.length = 0;

        for (let i = 0; i < this.bullets.length; i++) this.bullets[i].node.active = false;
        for (let i = 0; i < this.coinEffects.length; i++) this.coinEffects[i].node.active = false;

        this.effectBigWin.show(false);
        this.effectMegaWin.show(false);
        this.effectJackpot.show(false);

        this.popupGuide.active = false;

        this.waveState.stopAllActions();
        this.waveState.active = false;
    }

    private getJackpot() {
        ShootFishNetworkClient.getInstance().request("getJackpot", null, (res) => {
            if (!res["ok"]) return;
            this.listJackpot.length = 0;
            this.listJackpot.push(res["data"][this.roomId + "1"]);
            this.listJackpot.push(res["data"][this.roomId + "2"]);
            this.listJackpot.push(res["data"][this.roomId + "3"]);
            this.listJackpot.push(res["data"][this.roomId + "4"]);

            Tween.numberTo(this.lblJackpot, this.listJackpot[this.betIdx], 0.3);
        }, this);
    }

    private getState(isFirst: boolean) {
        if (!isFirst) {
            // cc.warn("Loading...");
            cc.find('Canvas/popupView-noHide').getComponent('PopupView').showBusy();
        }
        this.isStateGeted = false;

        this.resetView();

        ShootFishNetworkClient.getInstance().request("state", null, (res) => {
            if (!isFirst) {
                // App.instance.showLoading(false);
                cc.find('Canvas/popupView-noHide').getComponent('PopupView').hideBusy();
            }
            // console.log("state: " + JSON.stringify(res));
            //init players
            let playersData: Array<any> = res["players"];
            let mePlayerData = null;
            let mePlayerServerPos = 0;
            for (let i = 0; i < playersData.length; i++) {
                if (playersData[i]["playerId"] == Configs.Login.UsernameFish) {
                    mePlayerServerPos = playersData[i]["posIndex"];
                    mePlayerData = playersData[i];
                    Configs.Login.CoinFish = playersData[i]["cash"];
                    break;
                }
            }
            // console.log("mePlayerServerPos: " + mePlayerServerPos);
            for (let i = 0; i < playersData.length; i++) {
                let localPos = this.mapPlayersIdx[mePlayerServerPos][playersData[i]["posIndex"]];
                let playerData = playersData[i];
                let player = this.players[localPos];
                player.set(playerData["id"], playerData["playerId"], playerData["nickname"], playerData["cash"], playerData["avatar"], playerData["serviceId"]);
                player.serverPos = playerData["posIndex"];
                player.lblBet.string = Utils.formatNumberMin(this.listBet[this.betIdx]);
            }
            //end init players

            //init fishs
            let objects = res["objects"].concat(res["sobjects"]);
            for (let i = 0; i < objects.length; i++) {

                let fishNode = cc.instantiate(this.fishTemplate);
                // console.log('fishNode', fishNode.rotation);

                let fish = fishNode.getComponent(Fish);

                fish.node.parent = this.fishsNode;

                fish.setData(objects[i]);
                this.fishs.push(fish);
            }
            //end init fish

            //time skill
            //fast shoot
            var rfire = res['time'] - mePlayerData['rfire'];
            var cRfire = Play.SERVER_CONFIG['FastFireCoolDownS'];
            this.progressFastShoot.progress = 0;
            if (rfire > cRfire) {
                this.btnFastShoot.enabled = true;
                this.lblFastShootTime.node.active = false;
            } else {
                this.btnFastShoot.enabled = false;
                this.curTimeFastShootCountdown = rfire;
                this.lblFastShootTime.string = this.curTimeFastShootCountdown + "s";
                this.lblFastShootTime.node.active = true;
            }
            //target 
            var snipe = res['time'] - mePlayerData['snipe'];
            var cSpine = Play.SERVER_CONFIG['SnipeCoolDownS'];
            this.progressTargetFish.progress = 0;
            if (snipe > cSpine) {
                this.btnTargetFish.enabled = true;
                this.lblFastShootTime.node.active = false;
            } else {
                this.btnTargetFish.enabled = false;
                this.curTimeTargetFishCountdown = snipe;
                this.lblTargetFishTime.string = this.curTimeTargetFishCountdown + "s";
                this.lblTargetFishTime.node.active = true;
            }

            this.isStateGeted = true;

            this.getJackpot();

            if (isFirst) this.loading.active = false;
        }, this);
    }

    private updateShoot(dt: number) {
        if (this.toggleAuto.isChecked || this.isTargetFish) {
            if (this.targetFish != null) {
                var gunWorldPos = this.mePlayer.gunRotate.convertToWorldSpaceAR(cc.Vec2.ZERO);
                var fishWorldPos = this.targetFish.node.convertToWorldSpaceAR(cc.v2(this.targetFish.node.width / 2, 0));
                var distance = Utils.v2Distance(fishWorldPos, gunWorldPos);

                if (Math.abs(this.targetFish.node.x) > 640 * 0.8 || Math.abs(this.targetFish.node.y) > 360 * 0.8 || distance < 115) {
                    this.exploreAllBulletWithTargetFishId(this.targetFish.id);
                    this.target.active = false;
                    this.targetFish = null;
                    this.curIntervalFindTargetFish = 0;
                }
                else {
                    var dAngle = fishWorldPos.sub(gunWorldPos);
                    var angle = Math.atan2(dAngle.y, dAngle.x) * Utils.Rad2Deg;
                    this.mePlayer.gunRotate.rotation = angle;
                    // this.target.position = this.targetFish.node.position;
                    this.target.position = this.target.parent.convertToNodeSpaceAR(fishWorldPos);
                }
            }

            if (this.countShoot <= 10) {            
                this.countShoot += 1;
            } else {
                this.countShoot = 0;        
                this.findTargetFishInWorld();
            }
        }

        if (this.curShootInterval > 0) {
            this.curShootInterval = Math.max(0, this.curShootInterval - dt);
        } else if (this.isShoot) {
            this.curShootInterval = this.isFastShoot ? this.fastShootInterval : this.shootInterval;

            if (Configs.Login.CoinFish < this.listBet[this.betIdx]) {
                cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Số dư không đủ, vui lòng nạp thêm.");
                // App.instance.alertDialog.showMsg("Số dư không đủ, vui lòng nạp thêm.");
                this.isShoot = false;
                if (this.toggleAuto.isChecked) this.stopAutoShoot();
                return;
            }

            if ((this.toggleAuto.isChecked || this.isTargetFish) && this.targetFish == null) return;

            Configs.Login.CoinFish = Math.max(0, Configs.Login.CoinFish - this.listBet[this.betIdx]);
            this.mePlayer.coin = Configs.Login.CoinFish;
            this.mePlayer.lblCoin.string = Utils.formatNumber(Configs.Login.CoinFish);

            this.mePlayer.shoot();

            let bulletAngle = this.mePlayer.gunRotate.rotation;

            // console.log('updateShoot: ', bulletAngle);

            var bullet = this.getBullet();
            bullet.bullet.getComponent(cc.Sprite).spriteFrame = this.sprFramesBullet[this.betIdx];
            bullet.targetFishId = this.targetFish != null ? this.targetFish.id : -1;
            bullet.node.rotation = bulletAngle;
            var pos = bullet.node.parent.convertToNodeSpaceAR(this.mePlayer.gunRotate.convertToWorldSpaceAR(cc.Vec2.ZERO));
            pos.x += Utils.degreesToVec2(bullet.node.rotation).x * 90;
            pos.y += Utils.degreesToVec2(bullet.node.rotation).y * 90;
            bullet.node.position = pos;
            bullet.run();
            AudioManager.getInstance().playEffect(this.clipHit);

            let shootRad = bulletAngle * Utils.Deg2Rad;
            switch (this.mePlayer.serverPos) {
                case 0:
                    shootRad = shootRad;
                    break;
                case 1:
                    shootRad = Math.PI - shootRad;
                    break;
                case 2:
                    shootRad = shootRad - Math.PI;
                    break;
                case 3:
                    shootRad = -shootRad;
                    break;
            }
            ShootFishNetworkClient.getInstance().notify("shoot", {
                'rad': shootRad,//goc ban
                'type': this.betIdx + 1,//loai sung 1->4
                'target': this.targetFish != null ? this.targetFish.id : -1,//id ca target
                'rapidFire': this.isFastShoot, //ban nhanh boolean,
                'auto': false //ban tu dong boolean
            });
        }
    }

    private findTargetFishInWorld() {
        this.curIntervalFindTargetFish = this.intervalFindTargetFish;

        let listFishActiveInWorld = [];

        var gunWorldPos = this.mePlayer.gunRotate.convertToWorldSpaceAR(cc.Vec2.ZERO);
        for (let i = 0; i < this.fishs.length; i++) {
            var fishNode = this.fishs[i].node;
            if (fishNode.active && Math.abs(fishNode.position.x) <= 640 * 0.8 && Math.abs(fishNode.position.y) <= 360 * 0.8) {
                var fishWorldPos = fishNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
                var distance = Utils.v2Distance(gunWorldPos, fishWorldPos);
                if (distance >= 115) {
                    listFishActiveInWorld.push({
                        fish: this.fishs[i],
                        distance: distance
                    });
                }
            }
        }
        if (listFishActiveInWorld.length > 0) {
            this.targetFish = listFishActiveInWorld[Utils.randomRangeInt(0, listFishActiveInWorld.length)]["fish"];
            this.target.active = true;
            this.target.position = this.targetFish.node.position;
        }
    }

    private stopAutoShoot() {
        this.isShoot = false;
        this.toggleAuto.isChecked = false;
        this.target.active = false;
        this.touchPad.active = true;
        this.curIntervalFindTargetFish = 0;
        this.targetFish = null;
    }

    private getBullet(): Bullet {
        let bullet: Bullet = null;
        for (let i = 0; i < this.bullets.length; i++) {
            if (!this.bullets[i].node.active) {
                bullet = this.bullets[i];
                break;
            }
        }
        if (bullet == null) {
            let node = cc.instantiate(this.bulletTemplate);
            node.parent = this.bulletTemplate.parent;
            bullet = node.getComponent(Bullet);
            this.bullets.push(bullet);
        }
        bullet.node.active = true;
        bullet.targetFishId = -1;
        return bullet;
    }

    private exploreAllBulletWithTargetFishId(fishId: number) {
        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].node.active && this.bullets[i].targetFishId >= 0 && this.bullets[i].targetFishId == fishId) {
                this.bullets[i].targetFishId = -1;
            }
        }
    }

    public getCoinEffect(): CoinEffect {
        let coinEffect: CoinEffect = null;
        for (let i = 0; i < this.coinEffects.length; i++) {
            if (!this.coinEffects[i].node.active) {
                coinEffect = this.coinEffects[i];
                break;
            }
        }
        if (coinEffect == null) {
            let node = cc.instantiate(this.coinEffectTemplate);
            node.parent = this.coinEffectTemplate.parent;
            coinEffect = node.getComponent(CoinEffect);
            this.coinEffects.push(coinEffect);
        }
        coinEffect.node.active = true;
        coinEffect.node.setSiblingIndex(coinEffect.node.parent.children.length - 1);
        AudioManager.getInstance().playEffect(this.clipCoin);
        return coinEffect;
    }

    private getFishById(id: number): Fish {
        for (let i = 0; i < this.fishs.length; i++) {
            if (this.fishs[i].id == id) return this.fishs[i];
        }
        return null;
    }

    private getPlayerById(id: number): Player {
        if (id <= 0) return null;
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].id > 0 && this.players[i].id == id) return this.players[i];
        }
        return null;
    }

    private getPlayerByUsername(username: string): Player {
        if (username == null || username == "") return null;
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].username != null && this.players[i].username != "" && this.players[i].username == username) return this.players[i];
        }
        return null;
    }

    public getFishAnimByType(type: number): cc.Node {
        let name = "";
        switch (type) {
            case 0:
                name = "fish0";
                break;
            case 1:
                name = "fish1";
                break;
            case 2:
                name = "fish2";
                break;
            case 3:
                name = "fish3";
                break;
            case 4:
                name = "fish4";
                break;
            case 5:
                name = "fish5";
                break;
            case 6:
                name = "fish6";
                break;
            case 7:
                name = "fish7";
                break;
            case 8:
                name = "fish9";
                break;
            case 9:
                name = "fish9";
                break;
            case 10:
                name = "fish10";
                break;
            case 11:
                name = "fish11";
                break;
            case 12:
                name = "fish12";
                break;
            case 13:
                name = "fish13";
                break;
            case 14:
                name = "fish14";
                break;
            case 15:
                name = "fish15";
                break;
            case 16:
                name = "fish16";
                break;
            case 17:
                name = "fish17";
                break;
            case 18:
                name = "fish18";
                break;
            case 19:
                name = "fish19";
                break;
            case 20:
                name = "fish20";
                break;
            case 21:
                name = "fish21";
                break;
            case 22:
                name = "fish22";
                break;
            case 23:
                name = "fish23";
                break;
            case 24:
                name = "fish24";
                break;
        }
        for (let i = 0; i < this.fishsAnim.length; i++) {
            if (this.fishsAnim[i].name != null && this.fishsAnim[i].name != "" && this.fishsAnim[i].name == name) {
                return this.fishsAnim[i];
            }
        }
        return this.fishsAnim[0];
    }

    public actGetState() {
        this.getState(false);
    }

    public actBetUp() {
        if (this.betIdx < this.listBet.length - 1) {
            this.betIdx++;
            this.mePlayer.lblBet.string = Utils.formatNumberMin(this.listBet[this.betIdx]);
            this.mePlayer.setGun(this.betIdx);
            Tween.numberTo(this.lblJackpot, this.listJackpot[this.betIdx], 0.3);
        }
        AudioManager.getInstance().playEffect(this.clipClick);
    }

    public actBetDown() {
        if (this.betIdx > 0) {
            this.betIdx--;
            this.mePlayer.lblBet.string = Utils.formatNumberMin(this.listBet[this.betIdx]);
            this.mePlayer.setGun(this.betIdx);
            Tween.numberTo(this.lblJackpot, this.listJackpot[this.betIdx], 0.3);
        }
        AudioManager.getInstance().playEffect(this.clipClick);
    }

    public actBack() {
        // App.instance.confirmDialog.show2("Bạn có muốn rời khỏi bàn không", (isConfirm) => {
        //     if (isConfirm) {
        //         this.back();
        //     }
        // });

        this.back();

        AudioManager.getInstance().playEffect(this.clipClick);
    }

    public actFastShoot() {
        this.isFastShoot = true;
        this.btnFastShoot.enabled = false;
        var cDuration = Play.SERVER_CONFIG['FastFireDuration'];
        this.progressFastShoot.progress = 1;
        this.tweens.push(cc.tween(this.progressFastShoot).to(cDuration, { progress: 0 }).call(() => {
            this.isFastShoot = false;
            this.curTimeFastShootCountdown = Play.SERVER_CONFIG['FastFireCoolDownS'];
            this.lblFastShootTime.string = this.curTimeFastShootCountdown + "s";
            this.lblFastShootTime.node.active = true;
        }).start());
        AudioManager.getInstance().playEffect(this.clipClick);
    }

    public actTargetFish() {
        this.isShoot = true;
        this.isTargetFish = true;
        this.btnTargetFish.enabled = false;
        var cDuration = Play.SERVER_CONFIG['SnipeDurationS'];
        this.progressTargetFish.progress = 1;
        this.tweens.push(cc.tween(this.progressTargetFish).to(cDuration, { progress: 0 }).call(() => {
            this.isTargetFish = false;
            this.targetFish = null;
            this.target.active = false;
            this.curTimeTargetFishCountdown = Play.SERVER_CONFIG['SnipeCoolDownS'];
            this.lblTargetFishTime.string = this.curTimeTargetFishCountdown + "s";
            this.lblTargetFishTime.node.active = true;
            this.fishs.forEach(x => {
                x.getComponent(cc.Button).enabled = false;
            });
            this.isShoot = this.toggleAuto.isChecked;
            this.touchPad.active = !this.toggleAuto.isChecked;
        }).start());

        this.touchPad.active = false;
        this.fishs.forEach(x => {
            x.getComponent(cc.Button).enabled = true;
            x.node.off("click");
            x.node.on("click", () => {
                this.targetFish = x;
                this.target.active = true;
            });
        });
        AudioManager.getInstance().playEffect(this.clipClick);
    }

    private back() {
        this.isStateGeted = false;
        this.stopAutoShoot();
        cc.find('Canvas/popupView-noHide').getComponent('PopupView').showBusy();
        // App.instance.showLoading(true);
        ShootFishNetworkClient.getInstance().request("quit", null, () => {
            cc.find('Canvas/popupView-noHide').getComponent('PopupView').hideBusy();
            // App.instance.showLoading(false);
            this.resetView();
            this.show(false);
            this.lobby.getComponent(Lobby).show(true);
        }, this);
    }

    public actEffectJackpotTest() {
        this.effectJackpot.show(true, "Test nickname", 54032423);
    }

    public actEffectBigWinTest() {
        this.effectBigWin.show(true, "Test nickname", 54032423);
    }

    public actEffectMegaWinTest() {
        this.effectMegaWin.show(true, "Test nickname", 54032423);
    }

    public show(isShow: boolean, roomId: number = 0) {
        if (isShow) {
            if (Play.SERVER_CONFIG == null) {
                this.lobby.getComponent(Lobby).show(true);
                cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Bạn chưa đăng nhập.");
                // App.instance.alertDialog.showMsg("Bạn chưa đăng nhập.");
                return;
            }
            this.node.active = true;
            this.loading.active = true;
            this.roomId = roomId;

            this.stopAutoShoot();
            this.panelMenu.show(false);

            this.listBet.length = 0;
            this.listBet.push(Play.SERVER_CONFIG["TypeToValue"]["Bullet1"] * Play.SERVER_CONFIG['TableBulletValueRate'][this.roomId]);
            this.listBet.push(Play.SERVER_CONFIG["TypeToValue"]["Bullet2"] * Play.SERVER_CONFIG['TableBulletValueRate'][this.roomId]);
            this.listBet.push(Play.SERVER_CONFIG["TypeToValue"]["Bullet3"] * Play.SERVER_CONFIG['TableBulletValueRate'][this.roomId]);
            this.listBet.push(Play.SERVER_CONFIG["TypeToValue"]["Bullet4"] * Play.SERVER_CONFIG['TableBulletValueRate'][this.roomId]);
            this.shootInterval = 1 / Play.SERVER_CONFIG["FIRE_RATE"];
            this.fastShootInterval = this.shootInterval / Play.SERVER_CONFIG["FastFireRate"];
            this.play();
        } else {
            if (this.popupGuide.active) {
                this.popupGuide.getComponent(PopupGuide).dismiss();
            }
            this.node.active = false;
        }
    }

    public playClickSound() {
        AudioManager.getInstance().playEffect(this.clipClick);
    }
}
