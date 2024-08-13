/**
 * Ket qua, effect ket qua,
 */

var taiXiuSicboConfig = require("TaiXiuSicboConfig");

(function () {
  cc.TaiXiuSicboResultView = cc.Class({
    extends: cc.Component,
    properties: {
      //node ket qua
      nodeResult: cc.Node,
      //node 3 dice ket qua
      nodeResultDice: cc.Node,

      //bat de nan
      nodeBowl: cc.Node,
      nodeDia: cc.Node,

      //animation Dice
      animationDice: cc.Animation,
      //diceAnimationSpine: cc.Node,
      //sprite 3 dice
      spriteDice1: sp.Skeleton,
      spriteDice2: sp.Skeleton,
      spriteDice3: sp.Skeleton,

      skeDice1: sp.Skeleton,
      skeDice2: sp.Skeleton,
      skeDice3: sp.Skeleton,
      //label tong diem cua 3 dice
      nodeBgTotalDice: cc.Node,
      lbTotalDice: cc.Label,
      lbSicboHash: cc.Label,
      lbResult: cc.Label,
      nodeSicboResult: cc.Node,
      nodeSicboResultMD5: cc.Node,
      lblTextNotiNewGame: cc.Label,

      //node effect bat len khi win
      nodeTaiWins: cc.Node,
      nodeXiuWins: cc.Node,
      nodeLeWins: cc.Node,
      nodeChanWins: cc.Node,
      //node 1 so
      nodeMotWins: cc.Node,
      nodeHaiWins: cc.Node,
      nodeBaWins: cc.Node,
      nodeBonWins: cc.Node,
      nodeNamWins: cc.Node,
      nodeSauWins: cc.Node,
      //node tong 3 dice
      nodeTong4Wins: cc.Node,
      nodeTong5Wins: cc.Node,
      nodeTong6Wins: cc.Node,
      nodeTong7Wins: cc.Node,
      nodeTong8Wins: cc.Node,
      nodeTong9Wins: cc.Node,
      nodeTong10Wins: cc.Node,
      nodeTong11Wins: cc.Node,
      nodeTong12Wins: cc.Node,
      nodeTong13Wins: cc.Node,
      nodeTong14Wins: cc.Node,
      nodeTong15Wins: cc.Node,
      nodeTong16Wins: cc.Node,
      nodeTong17Wins: cc.Node,

      node1_2Wins: cc.Node,
      node1_3Wins: cc.Node,
      node1_4Wins: cc.Node,
      node1_5Wins: cc.Node,
      node1_6Wins: cc.Node,
      node2_3Wins: cc.Node,
      node2_4Wins: cc.Node,
      node2_5Wins: cc.Node,
      node2_6Wins: cc.Node,
      node3_4Wins: cc.Node,
      node3_5Wins: cc.Node,
      node3_6Wins: cc.Node,
      node4_5Wins: cc.Node,
      node4_6Wins: cc.Node,
      node5_6Wins: cc.Node,

      node1_1Wins: cc.Node,
      node2_2Wins: cc.Node,
      node3_3Wins: cc.Node,
      node4_4Wins: cc.Node,
      node5_5Wins: cc.Node,
      node6_6Wins: cc.Node,
      node1_1_1Wins: cc.Node,
      node2_2_2Wins: cc.Node,
      node3_3_3Wins: cc.Node,
      node4_4_4Wins: cc.Node,
      node5_5_5Wins: cc.Node,
      node6_6_6Wins: cc.Node,
      node_BoBaBatKy_Wins: cc.Node,

      //node Tai/Xiu tat di khi chay fx
      nodeTai: cc.Node,
      nodeXiu: cc.Node,
      btnCopyHash: cc.Node,
      btnCopyResult: cc.Node,
      nodeDiceAnim: {
        default: null,
        type: cc.Node,
      },
      xnEffect: sp.Skeleton,
      rollDice: cc.AudioSource,
      winSound: cc.AudioSource,

      sfDices: [cc.SpriteFrame],
      sprDice1: cc.Sprite,
      sprDice2: cc.Sprite,
      sprDice3: cc.Sprite,

      sfDicesFace: [cc.SpriteFrame],
      sprDice1Face: cc.Sprite,
      sprDice2Face: cc.Sprite,
      sprDice3Face: cc.Sprite,

      resultAnim: cc.Animation,
      shakeAnim: cc.Animation,
      progress: cc.Sprite,
      lblResult: cc.Label,
      lblResultNew: cc.Label,
    },

    onLoad: function () {
      //setView
      cc.TaiXiuSicboController.getInstance().setTaiXiuSicboResultView(this);
      this.rootPasBowl = this.nodeBowl.position; //save lai vi tri goc
      this.rootPasDia = this.nodeDia.position; //save lai vi tri goc
      this.animXocBat = this.nodeDiceAnim.getComponent(sp.Skeleton);
      this.animationMess = this.lblTextNotiNewGame.node.parent.getComponent(
        cc.Animation
      );

      this.reset();
    },

    onDestroy: function () {
      cc.TaiXiuSicboController.getInstance().setTaiXiuSicboResultView(null);
    },

    reset: function () {
      this.currentState = 999;
      this.resetUI();
    },

    resetUI: function () {
      this.spriteDice1.clearTracks();
      this.spriteDice1.setToSetupPose();

      this.spriteDice2.clearTracks();
      this.spriteDice2.setToSetupPose();

      this.spriteDice3.clearTracks();
      this.spriteDice3.setToSetupPose();

      this.skeDice1.clearTracks();
      this.skeDice1.setToSetupPose();

      this.skeDice2.clearTracks();
      this.skeDice2.setToSetupPose();

      this.skeDice3.clearTracks();
      this.skeDice3.setToSetupPose();
      //dang play anim dice?
      this.animationOpenPlaying = false;
      this.animationDice.stop();
      this.animationDice.node.active = false;
      this.nodeResult.active = false;
      this.nodeResultDice.active = false;
      this.nodeDiceAnim.active = false;
      this.nodeBgTotalDice.active = false;
      this.lbTotalDice.node.active = false;

      //reset lai vi tri bowl
      this.nodeBowl.position = this.rootPasBowl;
      this.nodeDia.position = this.rootPasDia;
      this.nodeBowl.active = false;
      this.nodeDia.active = false;

      this.nodeTaiWins.active = false;
      this.nodeXiuWins.active = false;

      this.nodeLeWins.active = false;
      this.nodeChanWins.active = false;

      this.nodeMotWins.active = false;
      this.nodeHaiWins.active = false;
      this.nodeBaWins.active = false;
      this.nodeBonWins.active = false;
      this.nodeNamWins.active = false;
      this.nodeSauWins.active = false;

      this.nodeTong4Wins.active = false;
      this.nodeTong5Wins.active = false;
      this.nodeTong6Wins.active = false;
      this.nodeTong7Wins.active = false;
      this.nodeTong8Wins.active = false;
      this.nodeTong9Wins.active = false;
      this.nodeTong10Wins.active = false;
      this.nodeTong11Wins.active = false;
      this.nodeTong12Wins.active = false;
      this.nodeTong13Wins.active = false;
      this.nodeTong14Wins.active = false;
      this.nodeTong15Wins.active = false;
      this.nodeTong16Wins.active = false;
      this.nodeTong17Wins.active = false;

      this.node1_2Wins.active = false;
      this.node1_3Wins.active = false;
      this.node1_4Wins.active = false;
      this.node1_5Wins.active = false;
      this.node1_6Wins.active = false;
      this.node2_3Wins.active = false;
      this.node2_4Wins.active = false;
      this.node2_5Wins.active = false;
      this.node2_6Wins.active = false;
      this.node3_4Wins.active = false;
      this.node3_5Wins.active = false;
      this.node3_6Wins.active = false;
      this.node4_5Wins.active = false;
      this.node4_6Wins.active = false;
      this.node5_6Wins.active = false;

      this.node1_1Wins.active = false;
      this.node2_2Wins.active = false;
      this.node3_3Wins.active = false;
      this.node4_4Wins.active = false;
      this.node5_5Wins.active = false;
      this.node6_6Wins.active = false;
      this.node1_1_1Wins.active = false;
      this.node2_2_2Wins.active = false;
      this.node3_3_3Wins.active = false;
      this.node4_4_4Wins.active = false;
      this.node5_5_5Wins.active = false;
      this.node6_6_6Wins.active = false;
      this.node_BoBaBatKy_Wins.active = false;

      //this.nodeTai.active = true;
      //this.nodeXiu.active = true;

      this.resultAnim.node.active = false;
      this.shakeAnim.node.active = false;
    },

    getIsBowl: function () {
      return this.nodeBowl.active;
    },
    playAnimationNotify: function (text) {
      this.animationMess.play("openMessage");
      this.lblTextNotiNewGame.string = text;
      this.animationMess.play("closeMessage");
    },
    getIsDia: function () {
      return this.nodeDia.active;
    },

    updateResult: function (sicbosessionInfo) {
      if (sicbosessionInfo.CurrentState !== this.currentState) {
        //check state de xu ly hien thi
        switch (sicbosessionInfo.CurrentState) {
          case cc.TaiXiuSicboState.BETTING: //54
            if (sicbosessionInfo.Ellapsed <= 48) {
              this.nodeDia.active = true;
              //this.lbSicboHash.node.active = true;
            }
            this.nodeSicboResult.active = false;
            this.nodeSicboResultMD5.active = true;
            this.lbResult.node.active = false;
            //this.lbSicboHash.string = sicbosessionInfo.SicboEncript;
            //reset lai UI
            this.resetUI();

            this.resultAnim.node.active = true;
            this.shakeAnim.node.active = false;
            this.resultAnim.play("result_idle", 0);
            break;
          case cc.TaiXiuSicboState.END_BETTING:
            //Ko cho dat cuoc nua
            this.animationMess.play("openMessage");
            this.lblTextNotiNewGame.string = "Dừng cược";
            this.animationMess.play("closeMessage");
            //reset lai UI
            this.resetUI();

            this.resultAnim.node.active = true;
            this.shakeAnim.node.active = false;
            this.resultAnim.play("result_idle", 0);
            this.progress.fillRange = 0;
            break;
          case cc.TaiXiuSicboState.RESULT: //15
            this.playAnimationAndSetResult(sicbosessionInfo);
            this.nodeSicboResult.active = true;
            this.nodeSicboResultMD5.active = false;
            this.lbResult.node.active = true;
            this.lbResult.string = sicbosessionInfo.Md5Decript;
            break;
          case cc.TaiXiuSicboState.PREPARE_NEW_SESSION:
            //neu dang hien thi bat de nan -> tat bat di + play fx
            console.log("Prepare new session");

            if (this.nodeBowl.active) {
              this.nodeBowl.active = false;
              this.startEffectResult();
              //hien effect
            } else {
              this.setResult(sicbosessionInfo);
            }

            this.resultAnim.node.active = true;
            this.shakeAnim.node.active = false;
            this.resultAnim.play("result_idle", 0);
            this.progress.fillRange = 0;
            break;
        }
      }
      this.currentState = sicbosessionInfo.CurrentState;

      if (this.currentState == cc.TaiXiuSicboState.BETTING)
        this.progress.fillRange = sicbosessionInfo.Ellapsed / 50;
    },

    openEndDiaNan: function () {
      if (this.nodeBowl.active) {
        this.nodeBowl.active = false;
        this.resultAnim.node.active = true;
        this.resultAnim.node.getChildByName("light").active = true;
        this.resultAnim.node.getChildByName("resultText").active = true;
        this.startEffectResult();

        this.schedule(
          function () {
            // Here this refers to component
            this.resultAnim.resume();
          },
          0,
          0,
          0.1
        );
      }
    },

    playAnimation: function (sicbosessionInfo) {
      this.schedule(
        function () {
          // Here this refers to component
          this.diceAnimFinish();
        },
        0,
        0,
        1.4
      );

      this.rollDice.play();
      //set ket qua vao sprite Dice
      this.xnEffect.setAnimation(0, "effect", false);

      //anim mới
      this.spriteDice1.setAnimation(6, "xi ngau bay 1", false);
      this.spriteDice2.setAnimation(6, "xi ngau bay 1", false);
      this.spriteDice3.setAnimation(6, "xi ngau bay 1", false);
      //Bat node Dice Anim
      this.animationDice.node.active = true;
      //danh dau la dang play
      this.animationOpenPlaying = true;
      this.nodeResultDice.active = false;

      this.resultAnim.node.active = false;
      this.shakeAnim.node.active = true;
      this.shakeAnim.play("dice_shake", 0);
    },

    playAnimationAndSetResult: function (sicbosessionInfo) {
      this.schedule(
        function () {
          // Here this refers to component
          this.playAnimFinish();
        },
        0,
        0,
        0.5
      );

      this.totalDice =
        sicbosessionInfo.Result.Dice1 +
        sicbosessionInfo.Result.Dice2 +
        sicbosessionInfo.Result.Dice3;
      this.totalDice1 = sicbosessionInfo.Result.Dice1;
      this.totalDice2 = sicbosessionInfo.Result.Dice2;
      this.totalDice3 = sicbosessionInfo.Result.Dice3;

      this.skeDice1.setAnimation(
        sicbosessionInfo.Result.Dice1 - 1,
        sicbosessionInfo.Result.Dice1.toString(),
        false
      );
      this.skeDice2.setAnimation(
        sicbosessionInfo.Result.Dice2 - 1,
        sicbosessionInfo.Result.Dice2.toString(),
        false
      );
      this.skeDice3.setAnimation(
        sicbosessionInfo.Result.Dice3 - 1,
        sicbosessionInfo.Result.Dice3.toString(),
        false
      );

      //this.nodeResult.active = true;
      //Tat node Dice Ket qua (3 Dice)
      this.nodeResultDice.active = false;
      this.nodeDiceAnim.active = false;
      this.animationOpenPlaying = true;

      this.resultAnim.node.active = true;
      this.shakeAnim.node.active = false;
      this.resultAnim.play("result_show", 0);

      this.sprDice1.spriteFrame =
        this.sfDices[sicbosessionInfo.Result.Dice1 - 1];
      this.sprDice2.spriteFrame =
        this.sfDices[sicbosessionInfo.Result.Dice2 - 1];
      this.sprDice3.spriteFrame =
        this.sfDices[sicbosessionInfo.Result.Dice3 - 1];

      this.sprDice1Face.spriteFrame =
        this.sfDicesFace[sicbosessionInfo.Result.Dice1 - 1];
      this.sprDice2Face.spriteFrame =
        this.sfDicesFace[sicbosessionInfo.Result.Dice2 - 1];
      this.sprDice3Face.spriteFrame =
        this.sfDicesFace[sicbosessionInfo.Result.Dice3 - 1];

      this.lblResult.string = `${this.totalDice} - ${
        this.totalDice >= 11 ? "TÀI" : "XỈU"
      }`;
      this.lblResultNew.string = `${this.totalDice} / ${
        this.totalDice >= 11 ? "TÀI" : "XỈU"
      }`;
    },

    //chi bat ket qua xuc xac (che do Nan)
    setResultDice: function (sicbosessionInfo) {
      //set ket qua vao sprite Dice
      this.xnEffect.setAnimation(0, "effect", false);
      this.skeDice1.setAnimation(
        sicbosessionInfo.Result.Dice1 - 1,
        sicbosessionInfo.Result.Dice1.toString(),
        false
      );
      this.skeDice2.setAnimation(
        sicbosessionInfo.Result.Dice2 - 1,
        sicbosessionInfo.Result.Dice2.toString(),
        false
      );
      this.skeDice3.setAnimation(
        sicbosessionInfo.Result.Dice3 - 1,
        sicbosessionInfo.Result.Dice3.toString(),
        false
      );
      this.nodeResultDice.active = true;
      this.nodeResult.active = true;
    },

    //goi set ket qua luon (ko chay animation dice)
    setResult: function (sicbosessionInfo) {
      //neu dang play animation dice thi return luon. Ket qua se tu hien sau khi anim ket thuc
      if (this.animationOpenPlaying) return;
      //hien luon ket qua
      this.totalDice =
        sicbosessionInfo.Result.Dice1 +
        sicbosessionInfo.Result.Dice2 +
        sicbosessionInfo.Result.Dice3;
      //set thong so diem cua Dice
      this.lbTotalDice.string = this.totalDice;
      //set ket qua vao sprite Dice
      this.skeDice1.setAnimation(
        sicbosessionInfo.Result.Dice1 - 1,
        sicbosessionInfo.Result.Dice1.toString(),
        false
      );
      this.skeDice2.setAnimation(
        sicbosessionInfo.Result.Dice2 - 1,
        sicbosessionInfo.Result.Dice2.toString(),
        false
      );
      this.skeDice3.setAnimation(
        sicbosessionInfo.Result.Dice3 - 1,
        sicbosessionInfo.Result.Dice3.toString(),
        false
      );
      this.nodeResult.active = true;
      //Bat node Dice Ket qua (3 Dice)
      this.nodeResultDice.active = true;
      this.nodeDiceAnim.active = false;
      //effect
      this.startEffectResult();
    },

    startEffectResult: function () {
      console.log("Start effect result ");
      this.winSound.play();
      this.nodeDiceAnim.active = false;
      this.nodeSicboResult.active = true;
      this.nodeSicboResultMD5.active = false;
      this.lbResult.node.active = true;
      //this.lbSicboHash.node.active = false;
      this.btnCopyHash.active = false;
      this.btnCopyResult.active = true;
      let tongTienWin = 0;

      //Kiem tra xem ban nao thang
      if (this.totalDice > 10) {
        //TAI
        this.nodeTaiWins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.TAI, 2);
      } else if (this.totalDice > 2 && this.totalDice <= 10) {
        //XIU
        this.nodeXiuWins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.XIU, 2);
      }
      //chan-le
      if (this.totalDice % 2 == 0) {
        //CHAN
        this.nodeChanWins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.CHAN, 2);
      } else {
        //LE
        this.nodeLeWins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.LE, 2);
      }
      //1-6
      if (
        this.totalDice1 == 1 ||
        this.totalDice2 == 1 ||
        this.totalDice3 == 1
      ) {
        //Mot
        this.nodeMotWins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_1, 1.5);
      }
      if (
        this.totalDice1 == 2 ||
        this.totalDice2 == 2 ||
        this.totalDice3 == 2
      ) {
        //Hai
        this.nodeHaiWins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_2, 2);
      }
      if (
        this.totalDice1 == 3 ||
        this.totalDice2 == 3 ||
        this.totalDice3 == 3
      ) {
        //Ba
        this.nodeBaWins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_3, 3);
      }
      if (
        this.totalDice1 == 4 ||
        this.totalDice2 == 4 ||
        this.totalDice3 == 4
      ) {
        //Bon
        this.nodeBonWins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_4, 4);
      }
      if (
        this.totalDice1 == 5 ||
        this.totalDice2 == 5 ||
        this.totalDice3 == 5
      ) {
        //Nam
        this.nodeNamWins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_5, 5);
      }
      if (
        this.totalDice1 == 6 ||
        this.totalDice2 == 6 ||
        this.totalDice3 == 6
      ) {
        //Sau
        this.nodeSauWins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_6, 6);
      }
      //Tổng 3 dice
      if (this.totalDice == 4) {
        this.nodeTong4Wins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_TONG_4, 66);
      } else if (this.totalDice == 5) {
        this.nodeTong5Wins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_TONG_5, 33);
      } else if (this.totalDice == 6) {
        this.nodeTong6Wins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_TONG_6, 20);
      } else if (this.totalDice == 7) {
        this.nodeTong7Wins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_TONG_7, 13.5);
      } else if (this.totalDice == 8) {
        this.nodeTong8Wins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_TONG_8, 9.5);
      } else if (this.totalDice == 9) {
        this.nodeTong9Wins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_TONG_9, 8);
      } else if (this.totalDice == 10) {
        this.nodeTong10Wins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_TONG_10, 7.5);
      } else if (this.totalDice == 11) {
        this.nodeTong11Wins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_TONG_11, 7.5);
      } else if (this.totalDice == 12) {
        this.nodeTong12Wins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_TONG_12, 8);
      } else if (this.totalDice == 13) {
        this.nodeTong13Wins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_TONG_13, 9.5);
      } else if (this.totalDice == 14) {
        this.nodeTong14Wins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_TONG_14, 13.5);
      } else if (this.totalDice == 15) {
        this.nodeTong15Wins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_TONG_15, 20);
      } else if (this.totalDice == 16) {
        this.nodeTong16Wins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_TONG_16, 33);
      } else if (this.totalDice == 17) {
        this.nodeTong17Wins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_TONG_17, 66);
      }

      if (
        this.totalDice1 == 1 ||
        this.totalDice2 == 1 ||
        this.totalDice3 == 1
      ) {
        if (
          this.totalDice1 == 2 ||
          this.totalDice2 == 2 ||
          this.totalDice3 == 2
        ) {
          this.node1_2Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_1_2, 7);
        }
        if (
          this.totalDice1 == 3 ||
          this.totalDice2 == 3 ||
          this.totalDice3 == 3
        ) {
          this.node1_3Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_1_3, 7);
        }
        if (
          this.totalDice1 == 4 ||
          this.totalDice2 == 4 ||
          this.totalDice3 == 4
        ) {
          this.node1_4Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_1_4, 7);
        }
        if (
          this.totalDice1 == 5 ||
          this.totalDice2 == 5 ||
          this.totalDice3 == 5
        ) {
          this.node1_5Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_1_5, 7);
        }
        if (
          this.totalDice1 == 6 ||
          this.totalDice2 == 6 ||
          this.totalDice3 == 6
        ) {
          this.node1_6Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_1_6, 7);
        }
      }
      if (
        this.totalDice1 == 2 ||
        this.totalDice2 == 2 ||
        this.totalDice3 == 2
      ) {
        if (
          this.totalDice1 == 3 ||
          this.totalDice2 == 3 ||
          this.totalDice3 == 3
        ) {
          this.node2_3Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_2_3, 7);
        }
        if (
          this.totalDice1 == 4 ||
          this.totalDice2 == 4 ||
          this.totalDice3 == 4
        ) {
          this.node2_4Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_2_4, 7);
        }
        if (
          this.totalDice1 == 5 ||
          this.totalDice2 == 5 ||
          this.totalDice3 == 5
        ) {
          this.node2_5Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_2_5, 7);
        }
        if (
          this.totalDice1 == 6 ||
          this.totalDice2 == 6 ||
          this.totalDice3 == 6
        ) {
          this.node2_6Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_2_6, 7);
        }
      }
      if (
        this.totalDice1 == 3 ||
        this.totalDice2 == 3 ||
        this.totalDice3 == 3
      ) {
        if (
          this.totalDice1 == 4 ||
          this.totalDice2 == 4 ||
          this.totalDice3 == 4
        ) {
          this.node3_4Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_3_4, 7);
        }
        if (
          this.totalDice1 == 5 ||
          this.totalDice2 == 5 ||
          this.totalDice3 == 5
        ) {
          this.node3_5Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_3_5, 7);
        }
        if (
          this.totalDice1 == 6 ||
          this.totalDice2 == 6 ||
          this.totalDice3 == 6
        ) {
          this.node3_6Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_3_6, 7);
        }
      }
      if (
        this.totalDice1 == 4 ||
        this.totalDice2 == 4 ||
        this.totalDice3 == 4
      ) {
        if (
          this.totalDice1 == 5 ||
          this.totalDice2 == 5 ||
          this.totalDice3 == 5
        ) {
          this.node4_5Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_4_5, 7);
        }
        if (
          this.totalDice1 == 6 ||
          this.totalDice2 == 6 ||
          this.totalDice3 == 6
        ) {
          this.node4_6Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_4_6, 7);
        }
      }
      if (
        this.totalDice1 == 5 ||
        this.totalDice2 == 5 ||
        this.totalDice3 == 5
      ) {
        if (
          this.totalDice1 == 6 ||
          this.totalDice2 == 6 ||
          this.totalDice3 == 6
        ) {
          this.node5_6Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_5_6, 7);
        }
      }

      if (
        this.totalDice1 == this.totalDice2 &&
        this.totalDice1 == this.totalDice3 &&
        this.totalDice2 == this.totalDice3
      ) {
        if (this.totalDice1 == 1) {
          this.node1_1_1Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_1_1_1, 3);
        } else if (this.totalDice1 == 2) {
          this.node2_2_2Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_2_2_2, 6);
        } else if (this.totalDice1 == 3) {
          this.node3_3_3Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_3_3_3, 9);
        } else if (this.totalDice1 == 4) {
          this.node4_4_4Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_4_4_4, 12);
        } else if (this.totalDice1 == 5) {
          this.node5_5_5Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_5_5_5, 15);
        } else if (this.totalDice1 == 6) {
          this.node6_6_6Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_6_6_6, 18);
        }
        this.node_BoBaBatKy_Wins.active = true;
        tongTienWin += cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_BOBABATKY, 35);
      }

      if (
        this.totalDice1 == 1 ||
        this.totalDice2 == 1 ||
        this.totalDice3 == 1
      ) {
        if (
          (this.totalDice1 + this.totalDice2 == 2 &&
            this.totalDice1 == this.totalDice2) ||
          (this.totalDice1 + this.totalDice3 == 2 &&
            this.totalDice1 == this.totalDice3) ||
          (this.totalDice2 + this.totalDice3 == 2 &&
            this.totalDice2 == this.totalDice3)
        ) {
          this.node1_1Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_1_1, 2);
        }
      }
      if (
        this.totalDice1 == 2 ||
        this.totalDice2 == 2 ||
        this.totalDice3 == 2
      ) {
        if (
          (this.totalDice1 + this.totalDice2 == 4 &&
            this.totalDice1 == this.totalDice2) ||
          (this.totalDice1 + this.totalDice3 == 4 &&
            this.totalDice1 == this.totalDice3) ||
          (this.totalDice2 + this.totalDice3 == 4 &&
            this.totalDice2 == this.totalDice3)
        ) {
          this.node2_2Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_2_2, 4);
        }
      }
      if (
        this.totalDice1 == 3 ||
        this.totalDice2 == 3 ||
        this.totalDice3 == 3
      ) {
        if (
          (this.totalDice1 + this.totalDice2 == 6 &&
            this.totalDice1 == this.totalDice2) ||
          (this.totalDice1 + this.totalDice3 == 6 &&
            this.totalDice1 == this.totalDice3) ||
          (this.totalDice2 + this.totalDice3 == 6 &&
            this.totalDice2 == this.totalDice3)
        ) {
          this.node3_3Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_3_3, 6);
        }
      }
      if (
        this.totalDice1 == 4 ||
        this.totalDice2 == 4 ||
        this.totalDice3 == 4
      ) {
        if (
          (this.totalDice1 + this.totalDice2 == 8 &&
            this.totalDice1 == this.totalDice2) ||
          (this.totalDice1 + this.totalDice3 == 8 &&
            this.totalDice1 == this.totalDice3) ||
          (this.totalDice2 + this.totalDice3 == 8 &&
            this.totalDice2 == this.totalDice3)
        ) {
          this.node4_4Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_4_4, 8);
        }
      }
      if (
        this.totalDice1 == 5 ||
        this.totalDice2 == 5 ||
        this.totalDice3 == 5
      ) {
        if (
          (this.totalDice1 + this.totalDice2 == 10 &&
            this.totalDice1 == this.totalDice2) ||
          (this.totalDice1 + this.totalDice3 == 10 &&
            this.totalDice1 == this.totalDice3) ||
          (this.totalDice2 + this.totalDice3 == 10 &&
            this.totalDice2 == this.totalDice3)
        ) {
          this.node5_5Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_5_5, 10);
        }
      }
      if (
        this.totalDice1 == 6 ||
        this.totalDice2 == 6 ||
        this.totalDice3 == 6
      ) {
        if (
          (this.totalDice1 + this.totalDice2 == 12 &&
            this.totalDice1 == this.totalDice2) ||
          (this.totalDice1 + this.totalDice3 == 12 &&
            this.totalDice1 == this.totalDice3) ||
          (this.totalDice2 + this.totalDice3 == 12 &&
            this.totalDice2 == this.totalDice3)
        ) {
          this.node6_6Wins.active = true;
          tongTienWin += cc.TaiXiuSicboController.getInstance()
            .getTaiXiuSicboInputBetView()
            .getTienCuocFromBetSide(cc.TaiXiuSicboBetSide.BTN_6_6, 12);
        }
      }

      console.log("Tong tien user thang la");
      console.log(tongTienWin);

      if (tongTienWin > 0) {
        cc.TaiXiuSicboController.getInstance()
          .getTaiXiuSicboInputBetView()
          .startEffectUserWin(tongTienWin);
      }
    },

    playAnimFinish: function () {
      if (this.nodeBowl.active) {
        this.nodeDiceAnim.active = false;
      }
      //dang mo bat de nan -> ko chay animation thang
      if (cc.TaiXiuSicboController.getInstance().getIsNan()) {
        this.nodeBowl.active = true;
        this.nodeDia.active = false;
        this.animationMess.play("openMessage");
        this.lblTextNotiNewGame.string = "Xin mời nặn";
        this.animationMess.play("closeMessage");
        this.lbResult.node.active = false;
        this.nodeSicboResult.active = false;
        this.nodeSicboResultMD5.active = true;
        this.btnCopyResult.active = false;
        //tat node Dice Anim
        this.animationDice.node.active = false;
        //Bat node Dice Ket qua (3 Dice)
        this.nodeResultDice.active = true;
        this.nodeResultDice.position = this.nodeBowl.position;

        this.resultAnim.node.getChildByName("light").active = false;
        this.resultAnim.node.getChildByName("nap").active = false;
        this.resultAnim.node.getChildByName("napIdle").active = false;
        this.resultAnim.node.getChildByName("resultDices").active = true;
        this.resultAnim.pause();

        setTimeout(() => {
          this.openEndDiaNan();
        }, 3000);
      } else {
        //tat node Dice Anim
        this.animationDice.node.active = false;
        //Bat node Dice Ket qua (3 Dice)
        this.nodeResultDice.active = true;
        //Bat node ket qua tong
        this.nodeBgTotalDice.active = false;
        this.lbTotalDice.node.active = false;
        //effect
        if (this.nodeDia.active) {
          this.nodeDia.position = cc.v2(-189, 339);
          setTimeout(() => {
            this.nodeDia.active = false;
            this.startEffectResult();
          }, 300);
        } else {
          this.startEffectResult();
        }
      }
    },

    //sau khi play xong animation Dice
    diceAnimFinish: function () {
      this.btnCopyHash.active = true;
      this.btnCopyResult.active = false;
      this.nodeDia.active = true;
      this.animationMess.play("openMessage");
      this.lblTextNotiNewGame.string = "Mời đặt cược";
      this.animationMess.play("closeMessage");
      this.animationDice.node.active = false;
      this.nodeResultDice.active = false;
      this.nodeSicboResult.active = false;
      this.nodeSicboResultMD5.active = true;
      //this.lbSicboHash.node.active = true;
      this.lbResult.node.active = false;
    },
    copyHashClicked: function () {
      cc.Tool.getInstance().copyToClipboard(this.lbSicboHash.string);
      this.animationMess.play("openMessage");
      this.lblTextNotiNewGame.string = "Copy chuỗi MD5 thành công";
      this.animationMess.play("closeMessage");
    },

    copyResultClicked: function () {
      cc.Tool.getInstance().copyToClipboard(this.lbResult.string);
      this.animationMess.play("openMessage");
      this.lblTextNotiNewGame.string = "Copy chuỗi kết quả thành công";
      this.animationMess.play("closeMessage");
    },
  });
}).call(this);
