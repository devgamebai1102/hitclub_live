/**
 * Thong tin phien
 */

var taiXiuSicboConfig = require("TaiXiuSicboConfig");
import Utils from "../../../scripts/shootFish/common/Utils";
import Tween from "../../../scripts/shootFish/common/Tween";

(function () {
  cc.TaiXiuSicboInfoView = cc.Class({
    extends: cc.Component,
    properties: {
      //animationBigTimer: cc.Animation,
      nodeBGTimer: cc.Node,
      lbSessionID: cc.Label,
      lbBigTimer: cc.Label, //thoi gian to chinh giua
      lbTimer: cc.Label, //thoi gian nho khi dang o man ket qua,
      lbTotalBetTai: cc.Label, //tong tien bet Tai
      lbTotalBetXiu: cc.Label, //tong tien bet Xiu
      lbUserBetTai: cc.Label, //so user bet Tai
      lbUserBetXiu: cc.Label, //so user bet Xiu
      nodeMain: cc.Node,
      sicbo: cc.Label,
      lblTextNotiNewGame: cc.Label,
      lbMoney: cc.Label,
    },

    onLoad: function () {
      this.lbMoney.string = cc.Tool.getInstance().formatNumber(
        cc.BalanceController.getInstance().getBalance(this)
      );
      cc.TaiXiuSicboController.getInstance().setTaiXiuSicboInfoView(this);
      this.animationMess = this.lblTextNotiNewGame.node.parent.getComponent(
        cc.Animation
      );
      this.reset();
    },
    playAnimationNotify: function (text) {
      this.animationMess.play("openMessage");
      this.lblTextNotiNewGame.string = text;
      this.animationMess.play("closeMessage");
    },
    onEnable: function () {
      if (
        cc.sys.isNative &&
        this.nodeMain !== null &&
        this.nodeMain !== undefined
      ) {
        this.nodeMain.scaleX = 0.9;
        this.nodeMain.scaleY = 0.9;
      }
    },

    onDestroy: function () {
      cc.TaiXiuSicboController.getInstance().setTaiXiuSicboInfoView(null);
    },

    reset: function () {
      this.currentState = 999;
      this.lastTime = 999;
    },

    updateInfo: function (sicbosessionInfo) {
      //check state de xu ly hien thi
      switch (sicbosessionInfo.CurrentState) {
        //giai doan dat cuoc
        case cc.TaiXiuSicboState.BETTING: //54
          if (this.currentState !== sicbosessionInfo.CurrentState) {
            //goi reset thong tin betInfo
            cc.TaiXiuSicboController.getInstance().resetBetAndResultInfo();
          }
          this.lbBigTimer.node.active = true;
          this.lbTimer.node.active = false;
          this.nodeBGTimer.active = false;
          this.lbTotalBetTai.string = cc.Tool.getInstance().formatMoney(
            sicbosessionInfo.TotalBetTai
          );

          this.lbTotalBetXiu.string = cc.Tool.getInstance().formatMoney(
            sicbosessionInfo.TotalBetXiu
          );
          if (sicbosessionInfo.Ellapsed <= 47) {
            this.sicbo.node.active = true;
            this.sicbo.string = sicbosessionInfo.Md5Encript;
          }

          break;
        //giai doan cho ket qua (ko cho dat cuoc)
        case cc.TaiXiuSicboState.END_BETTING:
          this.lbBigTimer.node.active = true;
          this.lbTimer.node.active = false;
          this.nodeBGTimer.active = false;
          //return;
          break;

        //giai doan ket qua
        case cc.TaiXiuSicboState.RESULT: //15
          //dem thoi gian o local
          this.lbBigTimer.node.active = false;
          this.lbTimer.node.active = true;
          this.nodeBGTimer.active = true;
          this.sicbo.node.active = false;
          break;

        //giai doan cho phien moi
        case cc.TaiXiuSicboState.PREPARE_NEW_SESSION:
          //kiem tra neu chua start timer -> start
          cc.TaiXiuSicboController.getInstance().resetBetInfo();
          this.lbBigTimer.node.active = false;
          this.lbTimer.node.active = true;
          this.nodeBGTimer.active = true;
          break;
      }
      //luu lai state hien tai
      this.currentState = sicbosessionInfo.CurrentState;
      //set thong tin
      this.lbSessionID.string = "#" + sicbosessionInfo.SessionID;
      this.lbUserBetTai.string = cc.Tool.getInstance().formatMoney(
        sicbosessionInfo.TotalTai
      );
      this.lbUserBetXiu.string = cc.Tool.getInstance().formatMoney(
        sicbosessionInfo.TotalXiu
      );
    },

    updateTimerInfo: function (time) {
      switch (this.currentState) {
        case cc.TaiXiuSicboState.BETTING: //54
          this.lbBigTimer.string = time;
          this.lbTimer.string = time;
          if (time >= 49) {
            cc.TaiXiuSicboController.getInstance().playAnimation();
          }
          break;
        case cc.TaiXiuSicboState.END_BETTING: //15
          //kiem tra thoi gian de dieu chinh animation
          this.lbBigTimer.string = time;
          if (time === 1 || time <= 2) {
            this.lbTimer.string = 10;
          } else {
            this.lbTimer.string = time;
          }
          break;
        case cc.TaiXiuSicboState.RESULT: //15
          this.lbTimer.string = time;
          this.lbBigTimer.node.color = cc.Color.WHITE;
          this.lbBigTimer.string = time;
          this.elapsedTime = 0;
          if (time === 10 || time === 5) {
            cc.LobbyController.getInstance().refreshAccountInfo();
          }
          break;

        case cc.TaiXiuSicboState.PREPARE_NEW_SESSION:
          this.lbTimer.string = time;
          this.lbBigTimer.node.color = cc.Color.WHITE;
          if (time === 1) this.lbBigTimer.string = 10;
          else this.lbBigTimer.string = time;
          break;
      }
      this.lastTime = time;
    },
    copyHashClicked: function () {
      cc.Tool.getInstance().copyToClipboard(this.sicbo.string);
      this.animationMess.play("openMessage");
      this.lblTextNotiNewGame.string = "Copy chuỗi MD5 thành công";
      this.animationMess.play("closeMessage");
    },
    showRuleClick: function () {
      cc.TaiXiuSicboMainController.getInstance().createRuleView();
    },
  });
}.call(this));
