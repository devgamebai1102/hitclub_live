/**
 * Thong tin phien
 */

var TaiXiuLivestreamConfig = require("TaiXiuLivestreamConfig");
import Utils from "../../../scripts/shootFish/common/Utils";
import Tween from "../../../scripts/shootFish/common/Tween";
var helper = require("Helper");
(function () {
  cc.TaiXiuLivestreamInfoView = cc.Class({
    extends: cc.Component,
    properties: {
      //animationBigTimer: cc.Animation,
      //nodeBGTimer: cc.Node,
      lbSessionID: cc.Label,
      lbBigTimer: cc.Label, //thoi gian to chinh giua
      //lbTimer: cc.Label, //thoi gian nho khi dang o man ket qua,
      lbTotalBetTai: cc.Label, //tong tien bet Tai
      lbTotalBetXiu: cc.Label, //tong tien bet Xiu
      lbUserBetTai: cc.Label, //so user bet Tai
      lbUserBetXiu: cc.Label, //so user bet Xiu
      nodeMain: cc.Node,
      choketqua: cc.Node,
      //node effect bat len khi win
      nodeTaiWins: cc.Node,
      nodeXiuWins: cc.Node,
      nodeNoty: cc.Node,
      lblTextNotiNewGame: cc.Label,
      //node Tai/Xiu tat di khi chay fx
      nodeTai: cc.Node,
      nodeXiu: cc.Node,
      rollDice: cc.AudioSource,
      winSound: cc.AudioSource,
      xnAnimation: {
        default: [],
        type: sp.Skeleton,
      },
      Showketqua: cc.Node,
      xnEffect: sp.Skeleton,
    },

    onLoad: function () {
      cc.TaiXiuLivestreamController.getInstance().setTaiXiuLivestreamInfoView(
        this
      );
      //this.animationMess = this.lblTextNotiNewGame.node.parent.getComponent(cc.Animation);
      this.reset();
    },

    onEnable: function () {
      if (
        cc.sys.isNative &&
        this.nodeMain !== null &&
        this.nodeMain !== undefined
      ) {
        this.nodeMain.scaleX = 1;
        this.nodeMain.scaleY = 1;
      }
    },

    onDestroy: function () {
      cc.TaiXiuLivestreamController.getInstance().setTaiXiuLivestreamInfoView(
        null
      );
    },

    reset: function () {
      this.currentState = 999;
      this.lastTime = 999;
    },

    updateInfo: function (livestreamsessionInfo) {
      //check state de xu ly hien thi
      switch (livestreamsessionInfo.CurrentState) {
        //giai doan dat cuoc
        case cc.TaiXiuMd5State.BETTING:
          this.nodeNoty.active = false; //54
          if (this.currentState !== livestreamsessionInfo.CurrentState) {
            //goi reset thong tin betInfo
            cc.TaiXiuLivestreamController.getInstance().resetBetAndResultInfo();
          }
          helper.numberToEfect(
            this.lbTotalBetTai,
            livestreamsessionInfo.TotalBetTai
          );
          helper.numberToEfect(
            this.lbTotalBetXiu,
            livestreamsessionInfo.TotalBetXiu
          );
          break;

        //giai doan cho ket qua (ko cho dat cuoc)
        case 3:
          this.lbBigTimer.node.active = true;
          //this.animationMess.play('openMessage');
          this.nodeNoty.active = true;
          this.lblTextNotiNewGame.string = "Ngừng nhận cược";
          // this.lbTimer.node.active = false;
          // this.nodeBGTimer.active = false;
          if (livestreamsessionInfo.Ellapsed <= 1) {
            this.choketqua.active = true;
            this.nodeNoty.active = false;
            this.lbBigTimer.node.active = false;
          }
          break;

        //giai doan ket qua
        case cc.TaiXiuMd5State.RESULT: //15
          this.nodeNoty.active = false;
          helper.numberToEfect(
            this.lbTotalBetTai,
            livestreamsessionInfo.TotalBetTai
          );
          helper.numberToEfect(
            this.lbTotalBetXiu,
            livestreamsessionInfo.TotalBetXiu
          );
          //dem thoi gian o local
          this.lbBigTimer.node.active = false;
          this.choketqua.active = false;
          break;

        //giai doan cho phien moi
        case cc.TaiXiuMd5State.PREPARE_NEW_SESSION:
          //kiem tra neu chua start timer -> start
          this.nodeNoty.active = true;
          this.lblTextNotiNewGame.string = "Phiên mới";
          cc.TaiXiuLivestreamController.getInstance().resetBetInfo();
          this.lbBigTimer.node.active = false;
          // this.lbTimer.node.active = true;
          // this.nodeBGTimer.active = true;
          break;
      }
      //luu lai state hien tai
      this.currentState = livestreamsessionInfo.CurrentState;
      //set thong tin
      this.lbSessionID.string = "#" + livestreamsessionInfo.SessionID;
      this.lbUserBetTai.string = cc.Tool.getInstance().formatNumber(
        livestreamsessionInfo.TotalTai
      );
      this.lbUserBetXiu.string = cc.Tool.getInstance().formatNumber(
        livestreamsessionInfo.TotalXiu
      );
    },
    playAnimationvn: function () {
      this.Showketqua.active = true;
      this.xnAnimation[0].setAnimation(0, `xi ngau bay ${1}`, false);
      this.xnAnimation[1].setAnimation(0, `xi ngau bay ${1}`, false);
      this.xnAnimation[2].setAnimation(0, `xi ngau bay ${1}`, false);
      this.rollDice.play();
      this.xnEffect.node.active = true;
      this.xnEffect.setAnimation(0, "effect", false);
      this.xnAnimation[0].setCompleteListener(function () {}.bind(this), 70);
    },

    updateTimerInfo: function (time) {
      console.log(time, this.currentState);
      switch (this.currentState) {
        case cc.TaiXiuMd5State.BETTING: //54
          this.lbBigTimer.string = time;
          
          if (time >= 48) {
            this.lbBigTimer.node.active = true;
            this.choketqua.active = false;
          this.nodeNoty.active = false;
          this.Showketqua.active = false;
            cc.TaiXiuLivestreamController.getInstance().playAnimation();
          }
          break;
        case cc.TaiXiuMd5State.END_BETTING: //15
          //kiem tra thoi gian de dieu chinh animation
          this.lbBigTimer.string = time;
          if (time <= 1) {
            this.choketqua.active = true;
            this.nodeNoty.active = false;
            this.lbBigTimer.node.active = false;
          }
          break;
        case cc.TaiXiuMd5State.RESULT: //15
          console.log("result time", time);
          this.lbBigTimer.node.active = false;
          this.lbBigTimer.node.color = cc.Color.WHITE;
          // this.lbBigTimer.string = time;
          this.elapsedTime = 0;

          if (time === 10 || time === 5) {
            cc.LobbyController.getInstance().refreshAccountInfo();
          }

          break;

        case cc.TaiXiuMd5State.PREPARE_NEW_SESSION:
          console.log("result time4", time);
          //this.lbTimer.string = time;
          this.lbBigTimer.node.color = cc.Color.WHITE;
          this.lbBigTimer.node.active = false;
          if (time === 1) {
            this.lbBigTimer.string = 50;
          } else {
            this.lbBigTimer.string = time;
          }

          break;
      }
      this.lastTime = time;
    },

    showRuleClick: function () {
      cc.TaiXiuLivestreamMainController.getInstance().createRuleView();
    },
  });
}).call(this);
