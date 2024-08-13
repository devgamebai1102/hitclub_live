import Play from "./ShootFish.Play";
import App from "./common/App";
import Configs from "./common/Configs";
import PopupCoinTransfer from "./ShootFish.PopupCoinTransfer";
import Utils from "./common/Utils";
import BroadcastReceiver from "./common/BroadcastReceiver";
// import MiniGameNetworkClient from "../../../scripts/networks/MiniGameNetworkClient";
// import InPacket from "../../../scripts/networks/Network.InPacket";
// import cmd from "../../../Lobby/src/Lobby.Cmd";
import ShootFishNetworkClient from "./networks/ShootFishNetworkClient";
import AudioManager from "./common/Common.AudioManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Lobby extends cc.Component {

    public static instance: Lobby = null;

    @property(cc.Node)
    playNode: cc.Node = null;
    @property(cc.Label)
    lblBalance: cc.Label = null;
    @property(PopupCoinTransfer)
    popupCoinTransfer: PopupCoinTransfer = null;
    @property({type: cc.AudioClip})
    clipBgm: cc.AudioClip = null;
    @property({type: cc.AudioClip})
    clipClick: cc.AudioClip = null;
    @property(cc.Label)
    lblUserName: cc.Label = null;
    @property(cc.Sprite)
    avatar: cc.Sprite = null;

    private play: Play = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Lobby.instance = this;

        this.play = this.playNode.getComponent(Play);
        this.play.node.active = false;

        this.lblBalance.string = Utils.formatNumber(Configs.Login.CoinFish);
        //var node = cc.find('Canvas/widget-top-view').getChildByName("group-loginSuccess");    
      //  this.lblUserName.string = node.getChildByName("lbNickName").getComponent(cc.Label).string;
       // var spriteAvar = node.getChildByName("wrapAvatar").getChildByName("btnAvatar").getComponent(cc.Sprite).spriteFrame;
      //  this.avatar.spriteFrame = spriteAvar;

        BroadcastReceiver.register(BroadcastReceiver.USER_UPDATE_COIN, () => {
            this.lblBalance.string = Utils.formatNumber(Configs.Login.CoinFish);
        }, this);

        cc.find('Canvas/popupView-noHide').getComponent('PopupView').showBusy();
        this.connectToServer();

        // MiniGameNetworkClient.getInstance().addListener((data) => {
        //     let inPacket = new InPacket(data);
        //     switch (inPacket.getCmdId()) {
        //         case cmd.Code.GET_MONEY_USE: {
        //             let res = new cmd.ResGetMoneyUse(data);
        //             Configs.Login.Coin = res.moneyUse;
        //             BroadcastReceiver.send(BroadcastReceiver.USER_UPDATE_COIN);
        //             break;
        //         }
        //     }
        // }, this);

        AudioManager.getInstance().playBackgroundMusic(this.clipBgm);
    }

    onDestroy() {
        cc.find('Canvas/popupView-noHide').getComponent('PopupView').hideBusy();
        AudioManager.getInstance().stopBackgroundMusic();
        console.log('onDestroy stopBackgroundMusic');
    }

    connectToServer() {
        ShootFishNetworkClient.getInstance().checkConnect((isLogined) => {
            cc.find('Canvas/popupView-noHide').getComponent('PopupView').hideBusy();
            // console.log('checkConnect', isLogined);
            if (!isLogined) {
                cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Đăng nhập thất bại, vui lòng thử lại.");

                // App.instance.alertDialog.showMsgWithOnDismissed("Đăng nhập thất bại, vui lòng thử lại.", () => {
                //     this.actBack();
                // });
                return;
            }
            Play.SERVER_CONFIG = Configs.Login.FishConfigs;
            BroadcastReceiver.send(BroadcastReceiver.USER_UPDATE_COIN);
            if (Configs.Login.CoinFish <= 0) {
                // cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Tiền trong Bắn Cá của bạn đã hết, vui lòng chuyển vào thêm!");
                this.popupCoinTransfer.show();

                // App.instance.confirmDialog.show3("Tiền trong Bắn Cá của bạn đã hết, bạn có muốn chuyển tiền vào không?", "Có", (isConfirm) => {
                //     if (isConfirm) {
                //         this.popupCoinTransfer.show();
                //     }
                // });
            }
        });

        ShootFishNetworkClient.getInstance().addOnClose(() => {        
            cc.find('Canvas/popupView-noHide').getComponent('PopupView').hideBusy();
            if (ShootFishNetworkClient.getInstance().getUrlRequest() == "quit") {
                this.actBack();
            } else if (ShootFishNetworkClient.getInstance().getIsErrorConnect()){
                cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Hệ thống đang bận, vui lòng vào lại sau!");
            }
            // App.instance.showErrLoading("Mất kết nối, đang thử kết nối lại...");
            // cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Mất kết nối, đang thử kết nối lại...");
        }, this);
    }

    actBack() {
        // NetworkClient.getInstance().close();
        AudioManager.getInstance().playEffect(this.clipClick);
        ShootFishNetworkClient.getInstance().disconnect();
        cc.find('Canvas').getComponent('LobbyView').destroyDynamicView('80');
		 cc.LobbyController.getInstance().offuserguest(true);
    }

    actHonors() {

    }

    actRoom1() {
        // if (!Configs.Login.isLogined) {
        //     return;
        // }
        this.show(false);
        AudioManager.getInstance().playEffect(this.clipClick);
        this.play.show(true, 1);
    }

    actRoom2() {
        // if (!Configs.Login.isLogined) {
        //     return;
        // }
        this.show(false);
        AudioManager.getInstance().playEffect(this.clipClick);
        this.play.show(true, 2);
    }

    actRoom3() {
        // if (!Configs.Login.isLogined) {
        //     return;
        // }
        this.show(false);
        AudioManager.getInstance().playEffect(this.clipClick);
        this.play.show(true, 3);
    }

    public show(isShow: boolean) {
        this.node.active = isShow;
        BroadcastReceiver.send(BroadcastReceiver.USER_UPDATE_COIN);
    }
}
