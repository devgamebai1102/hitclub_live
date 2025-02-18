import Dialog from "./common/Dialog";
import BroadcastReceiver from "./common/BroadcastReceiver";
import Utils from "./common/Utils";
import Configs from "./common/Configs";
import App from "./common/App";
// import MiniGameNetworkClient from "../../../scripts/networks/MiniGameNetworkClient";
// import cmd from "../../../Lobby/src/Lobby.Cmd";
import ShootFishNetworkClient from "./networks/ShootFishNetworkClient";

const { ccclass, property } = cc._decorator;

@ccclass("PopupCoinTransfer.TabCashIn")
export class TabCashIn {
    @property(cc.Label)
    lblBalance: cc.Label = null;
    @property(cc.EditBox)
    edbCoin: cc.EditBox = null;
    @property(cc.Node)
    quickButtons: cc.Node = null;

    private popup: PopupCoinTransfer = null;

    private readonly values = [50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000, 20000000];

    public start(popup: PopupCoinTransfer) {
        // cc.find('Canvas').getComponent('LobbyView').refreshAccountInfo();

        this.popup = popup;
        this.edbCoin.node.on("editing-did-ended", () => {
            let number = Utils.stringToInt(this.edbCoin.string);
            this.edbCoin.string = Utils.formatNumber(number);
        });
        for (let i = 0; i < this.quickButtons.childrenCount; i++) {
            var btn = this.quickButtons.children[i];
            let value = this.values[i];
            btn.getComponentInChildren(cc.Label).string = Utils.formatNumber(value);
            btn.on("click", () => {
                this.edbCoin.string = Utils.formatNumber(value);
            });
        }


    }

    public submit() {
        let coin = Utils.stringToInt(this.edbCoin.string);
        if (coin <= 0) {
            // App.instance.alertDialog.showMsg("Số tiền đã nhập không hợp lệ.");
            cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Số tiền đã nhập không hợp lệ.");
            return;
        }
        // App.instance.showLoading(true);
        cc.find('Canvas/popupView-noHide').getComponent('PopupView').showBusy();
        ShootFishNetworkClient.getInstance().request("xxengCashin", {
            "ccash": coin ,
            'access_token': Configs.Login.Token
        }, (res) => {
            cc.find('Canvas/popupView-noHide').getComponent('PopupView').hideBusy();
            // App.instance.showLoading(false);
            // console.log(res);
            if (!res["ok"]) {
                // App.instance.alertDialog.showMsg("Thao tác thất bại, vui lòng thử lại sau.");
                cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Thao tác thất bại, vui lòng thử lại sau.");
                return;
            }
            Configs.Login.CoinFish = res["newCash"];
            BroadcastReceiver.send(BroadcastReceiver.USER_UPDATE_COIN);
            // App.instance.alertDialog.showMsg("Thao tác thành công.");
            // cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Thao tác thành công.");
            this.reset();

            cc.find('Canvas').getComponent('LobbyView').refreshAccountInfo();
            // MiniGameNetworkClient.getInstance().send(new cmd.ReqGetMoneyUse());
        }, this.popup);


    }

    public reset() {
        this.edbCoin.string = "";
        this.lblBalance.string = Utils.formatNumber(Configs.Login.Coin);
    }
}

@ccclass("PopupCoinTransfer.TabCashOut")
export class TabCashOut {
    @property(cc.Label)
    lblBalance: cc.Label = null;
    @property(cc.EditBox)
    edbCoin: cc.EditBox = null;
    @property(cc.Node)
    quickButtons: cc.Node = null;

    private popup: PopupCoinTransfer = null;

    private readonly values = [50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000, 20000000];

    public start(popup: PopupCoinTransfer) {
        this.popup = popup;
        this.edbCoin.node.on("editing-did-ended", () => {
            let number = Utils.stringToInt(this.edbCoin.string);
            this.edbCoin.string = Utils.formatNumber(number);
        });
        for (let i = 0; i < this.quickButtons.childrenCount; i++) {
            var btn = this.quickButtons.children[i];
            let value = this.values[i];
            btn.getComponentInChildren(cc.Label).string = Utils.formatNumber(value);
            btn.on("click", () => {
                this.edbCoin.string = Utils.formatNumber(value);
            });
        }

    }

    public submit() {
        let coin = Utils.stringToInt(this.edbCoin.string);
        if (coin <= 0) {
            // App.instance.alertDialog.showMsg("Số tiền đã nhập không hợp lệ.");
            cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Số tiền đã nhập không hợp lệ.");
            return;
        }
        // App.instance.showLoading(true);
        cc.find('Canvas/popupView-noHide').getComponent('PopupView').showBusy();
        ShootFishNetworkClient.getInstance().request("xxengCashin", {
            "ccash": -coin,
            'access_token': Configs.Login.Token
        }, (res) => {
            // App.instance.showLoading(false);
            cc.find('Canvas/popupView-noHide').getComponent('PopupView').hideBusy();
            // console.log(res);
            if (!res["ok"]) {
                // App.instance.alertDialog.showMsg("Thao tác thất bại, vui lòng thử lại sau.");
                cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Thao tác thất bại, vui lòng thử lại sau.");
                return;
            }
            Configs.Login.CoinFish = res["newCash"];
            BroadcastReceiver.send(BroadcastReceiver.USER_UPDATE_COIN);
            // App.instance.alertDialog.showMsg("Thao tác thành công.");
            // cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Thao tác thành công.");
            this.reset();

            // MiniGameNetworkClient.getInstance().send(new cmd.ReqGetMoneyUse());
            cc.find('Canvas').getComponent('LobbyView').refreshAccountInfo();
        }, this.popup);
    }

    public reset() {
        this.edbCoin.string = "";
        this.lblBalance.string = Utils.formatNumber(Configs.Login.CoinFish);
    }
}

@ccclass
export default class PopupCoinTransfer extends Dialog {
    @property(cc.ToggleContainer)
    tabs: cc.ToggleContainer = null;
    @property(cc.Node)
    tabContents: cc.Node = null;
    @property(TabCashIn)
    tabCashIn: TabCashIn = null;
    @property(TabCashOut)
    tabCashOut: TabCashOut = null;

    private tabSelectedIdx = 0;

    start() {
        for (let i = 0; i < this.tabs.toggleItems.length; i++) {
            this.tabs.toggleItems[i].node.on("toggle", () => {
                this.tabSelectedIdx = i;
                this.onTabChanged();
            });
        }

        BroadcastReceiver.register(BroadcastReceiver.USER_UPDATE_COIN, () => {
            this.tabCashIn.lblBalance.string = Utils.formatNumber(Configs.Login.Coin);
            this.tabCashOut.lblBalance.string = Utils.formatNumber(Configs.Login.CoinFish);
        }, this);

        this.tabCashIn.start(this);
        this.tabCashOut.start(this);
    }

    onEnable () {
        // console.log('onEnable', Configs.Login.CoinFish);
        this.tabCashOut.lblBalance.string = Utils.formatNumber(Configs.Login.CoinFish);
    }

    show() {
        super.show();
        this.tabSelectedIdx = 0;
        this.tabs.toggleItems[this.tabSelectedIdx].isChecked = true;
        this.onTabChanged();
    }

    private onTabChanged() {
        for (let i = 0; i < this.tabContents.childrenCount; i++) {
            this.tabContents.children[i].active = i == this.tabSelectedIdx;
        }
        for (let j = 0; j < this.tabs.toggleItems.length; j++) {
            this.tabs.toggleItems[j].node.getComponentInChildren(cc.LabelOutline).color = j == this.tabSelectedIdx ? cc.Color.BLACK.fromHEX("#AA5F00") : cc.Color.BLACK.fromHEX("#4677F3");
        }
        switch (this.tabSelectedIdx) {
            case 0:
                this.tabCashIn.reset();
                break;
            case 1:
                this.tabCashOut.reset();
                break;
        }
    }

    public actSubmitCashIn() {
        this.tabCashIn.submit();
    }

    public actSubmitCashOut() {
        this.tabCashOut.submit();
    }

    public actClearCashIn() {
        this.tabCashIn.edbCoin.string = "0";
    }

    public actClearCashOut() {
        this.tabCashOut.edbCoin.string = "0";
    }
}
