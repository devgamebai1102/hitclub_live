import AlertDialog from "../common/AlertDialog";
import ConfirmDialog from "../common/ConfirmDialog";
// import SubpackageDownloader from "./SubpackageDownloader";
import BroadcastReceiver from "./BroadcastReceiver";
// import MiniGameNetworkClient from "../networks/MiniGameNetworkClient";
import Configs from "./Configs";
// import MiniGame from "../../Lobby/src/MiniGame";
// import ButtonMiniGame from "../../Lobby/src/ButtonMiniGame";
// import PopupShop from "../../Lobby/src/Lobby.PopupShop";
// import InPacket from "../networks/Network.InPacket";
// import cmd from "../networks/Network.Cmd";

const { ccclass, property } = cc._decorator;

@ccclass
export default class App extends cc.Component {

    static instance: App = null;

    @property
    designResolution: cc.Size = new cc.Size(1398, 786);

    @property(cc.Node)
    loading: cc.Node = null;
    @property(cc.Node)
    loadingIcon: cc.Node = null;
    @property(cc.Label)
    loadingLabel: cc.Label = null;

    @property(AlertDialog)
    alertDialog: AlertDialog = null;

    @property(ConfirmDialog)
    confirmDialog: ConfirmDialog = null;

    @property([cc.SpriteFrame])
    sprFrameAvatars: Array<cc.SpriteFrame> = new Array<cc.SpriteFrame>();

    @property(cc.Node)
    buttonMiniGameNode: cc.Node = null;

    @property(cc.Node)
    miniGame: cc.Node = null;

    // @property(PopupShop)
    // popupShop: PopupShop = null;

    // public buttonMiniGame: ButtonMiniGame;

    private lastWitdh: number = 0;
    private lastHeight: number = 0;

    private timeOutLoading: any = null;
    private isFisrtNetworkConnected = false;

    private subpackageLoaded: Object = {};

    // private taiXiuDouble: MiniGame = null;
    // private miniPoker: MiniGame = null;
    // private caoThap: MiniGame = null;
    // private bauCua: MiniGame = null;
    // private slot3x3: MiniGame = null;
    // private oanTuTi: MiniGame = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log("App onLoad");
        if (App.instance != null) {
            this.node.destroy();
            return;
        }
        App.instance = this;
        cc.game.addPersistRootNode(App.instance.node);
        // cc.debug.setDisplayStats(true);

        //this.buttonMiniGame = this.buttonMiniGameNode.getComponent(ButtonMiniGame);

        BroadcastReceiver.register(BroadcastReceiver.USER_LOGOUT, () => {

        }, this);
    }

    start() {
        this.updateSize();
        // MiniGameNetworkClient.getInstance().addListener((data) => {
        //     let inPacket = new InPacket(data);cmd
        //     // console.log(inPacket.getCmdId());
        //     switch (inPacket.getCmdId()) {
        //         case cmd.Code.GET_MONEY_USE: {
        //             let res = new cmd.ResGetMoneyUse(data);
        //             // console.log(res);
        //             Configs.Login.Coin = res.moneyUse;
        //             BroadcastReceiver.send(BroadcastReceiver.USER_UPDATE_COIN);
        //             break;
        //         }
        //     }
        // }, this);
    }

    showLoading(isShow: boolean, timeOut: number = 15) {
        // cc.warn('showLoading');

        // this.loadingLabel.string = "Đang tải...";
        // if (this.timeOutLoading != null) clearTimeout(this.timeOutLoading);
        // if (isShow) {
        //     if (timeOut > 0) {
        //         this.timeOutLoading = setTimeout(() => {
        //             this.showLoading(false);
        //         }, timeOut * 1000);
        //     }
        //     this.loading.active = true;
        // } else {
        //     this.loading.active = false;
        // }
        // this.loadingIcon.stopAllActions();
        // this.loadingIcon.runAction(cc.repeatForever(cc.rotateBy(1, 360)));
    }

    showErrLoading(msg?: string) {
        cc.warn(msg);
        cc.find('Canvas/popupView-noHide').getComponent('PopupView').hideBusy();
        // this.showLoading(true, -1);
        // this.loadingLabel.string = msg ? msg : "Mất kết nối, đang thử lại...";
    }

    update(dt: number) {
        this.updateSize();
    }

    updateSize() {
        var frameSize = cc.view.getFrameSize();
        if (this.lastWitdh !== frameSize.width || this.lastHeight !== frameSize.height) {

            this.lastWitdh = frameSize.width;
            this.lastHeight = frameSize.height;

            var newDesignSize = cc.Size.ZERO;
            if (this.designResolution.width / this.designResolution.height > frameSize.width / frameSize.height) {
                newDesignSize = cc.size(this.designResolution.width, this.designResolution.width * (frameSize.height / frameSize.width));
            } else {
                newDesignSize = cc.size(this.designResolution.height * (frameSize.width / frameSize.height), this.designResolution.height);
            }
            // cc.log("update node size: " + newDesignSize);
            this.node.setContentSize(newDesignSize);
            this.node.setPosition(cc.v2(newDesignSize.width / 2, newDesignSize.height / 2));
        }
    }

    getAvatarSpriteFrame(avatar: string): cc.SpriteFrame {
        let avatarInt = parseInt(avatar);
        if (isNaN(avatarInt) || avatarInt < 0 || avatarInt >= this.sprFrameAvatars.length) {
            return this.sprFrameAvatars[0];
        }
        return this.sprFrameAvatars[avatarInt];
    }

    loadScene(sceneName: string) {
        cc.director.preloadScene(sceneName, (c, t, item) => {
            this.showErrLoading("Đang tải..." + parseInt("" + ((c / t) * 100)) + "%");
        }, (err) => {
            this.showLoading(false);
            cc.director.loadScene(sceneName);
        });
    }

    loadSceneInSubpackage(subpackageName: string, sceneName: string) {
        // if (!this.subpackageLoaded.hasOwnProperty(subpackageName) || !this.subpackageLoaded[subpackageName]) {
        //     this.showLoading(true, -1);
        //     SubpackageDownloader.downloadSubpackage(subpackageName, (err, progress) => {
        //         if (err == "progress") {
        //             this.showErrLoading("Đang tải..." + parseInt("" + (progress * 100)) + "%");
        //             return;
        //         }
        //         this.showLoading(false);
        //         if (err) {
        //             this.alertDialog.showMsg(err);
        //             return;
        //         }
        //         this.showLoading(true, -1);
        //         this.subpackageLoaded[subpackageName] = true;
        //         cc.director.preloadScene(sceneName, (c, t, item) => {
        //             this.showErrLoading("Đang tải..." + parseInt("" + ((c / t) * 100)) + "%");
        //         }, (err, sceneAsset) => {
        //             this.showLoading(false);
        //             cc.director.loadScene(sceneName);
        //         });
        //     });
        // } else {
        //     cc.director.preloadScene(sceneName, (c, t, item) => {
        //         this.showErrLoading("Đang tải..." + parseInt("" + ((c / t) * 100)) + "%");
        //     }, (err, sceneAsset) => {
        //         this.showLoading(false);
        //         cc.director.loadScene(sceneName);
        //     });
        // }
    }

    loadPrefabInSubpackage(subpackageName: string, prefabPath: string, onLoaded: (err: string, prefab: cc.Prefab) => void) {
        // if (!this.subpackageLoaded.hasOwnProperty(subpackageName) || !this.subpackageLoaded[subpackageName]) {
        //     this.showLoading(true, -1);
        //     SubpackageDownloader.downloadSubpackage(subpackageName, (err, progress) => {
        //         if (err == "progress") {
        //             this.showErrLoading("Đang tải..." + parseInt("" + (progress * 100)) + "%");
        //             return;
        //         }
        //         this.showLoading(false);
        //         if (err) {
        //             this.alertDialog.showMsg(err);
        //             return;
        //         }
        //         this.subpackageLoaded[subpackageName] = true;
        //         cc.loader.loadRes(prefabPath, cc.Prefab, (c, t, item) => {
        //             this.showErrLoading("Đang tải..." + parseInt("" + ((c / t) * 100)) + "%");
        //         }, (err, prefab) => {
        //             this.showLoading(false);
        //             onLoaded(err == null ? null : err.message, prefab);
        //         });
        //     });
        // } else {
        //     this.showLoading(true, -1);
        //     cc.loader.loadRes(prefabPath, cc.Prefab, (c, t, item) => {
        //         this.showErrLoading("Đang tải..." + parseInt("" + ((c / t) * 100)) + "%");
        //     }, (err, prefab) => {
        //         this.showLoading(false);
        //         onLoaded(err == null ? null : err.message, prefab);
        //     });
        // }
    }
}
