/**
 * Ket qua, effect ket qua,
 */


var TaiXiuLivestreamConfig = require('TaiXiuLivestreamConfig');

(function () {
    cc.TaiXiuLivestreamResultView = cc.Class({
        "extends": cc.Component,
        properties: {
            //node ket qua
            //nodeResult: cc.Node,
            //node 3 dice ket qua
            // nodeResultDice: cc.Node,

            //animation Dice
            //nodeBGTimer: cc.Node,
            //animationDice: cc.Animation,
            xnAnimation: {
                default: [],
                type: sp.Skeleton,
            },
            //Showketqua: cc.Node,
            //xnEffect:sp.Skeleton,
            //sprite 3 dice
            spriteDice1: cc.Sprite,
            spriteDice2: cc.Sprite,
            spriteDice3: cc.Sprite,
            //label tong diem cua 3 dice
            // nodeBgTotalDice: cc.Node,
            lbTotalDice: cc.Label,
            //amthanhmodia: cc.AudioSource,
            lblTextNotiNewGame: cc.Label,
            //node effect bat len khi win
            nodeTaiWins: [cc.Node],
            nodeXiuWins: [cc.Node],
            winSound: cc.AudioSource,
            //node Tai/Xiu tat di khi chay fx
            nodeTai: cc.Node,
            nodeXiu: cc.Node,

            //spriteFrame 6 dice
            sfDice1s: [cc.SpriteFrame],
            sfDice2s: [cc.SpriteFrame],
            sfDice3s: [cc.SpriteFrame],
            diceAnimation: sp.Skeleton,
            nodeDice: cc.Node,
            sfDice: [cc.SpriteFrame]

        },

        onLoad: function () {
            //setView
            cc.TaiXiuLivestreamController.getInstance().setTaiXiuLivestreamResultView(this);
            this.animationMess = this.lblTextNotiNewGame.node.parent.getComponent(cc.Animation);
            this.animation = this.node.getComponent(cc.Animation);

            this.reset();
        },

        onDestroy: function () {
            cc.TaiXiuLivestreamController.getInstance().setTaiXiuLivestreamResultView(null);
        },

        reset: function () {
            this.currentState = 999;
            this.resetUI();
        },

        resetUI: function () {
            //dang play anim dice?
            // this.animationOpenPlaying = false;
            // this.animationDice.stop();
            // this.animationDice.node.active = false;
            //this.nodeResult.active = false;
            //this.nodeResultDice.active = false;
            //this.nodeBGTimer.active = false;
            // this.nodeDiceAnim.active = false;

            // this.nodeBgTotalDice.active = false;
            this.lbTotalDice.node.active = false;
            // this.xnEffect.node.active = false;
            //reset lai vi tri bowl

            this.nodeTaiWins.forEach(function (nodeTaiWin) {
                nodeTaiWin.active = false;
            });
            this.nodeXiuWins.forEach(function (nodeXiuWin) {
                nodeXiuWin.active = false;
            });

            this.nodeTai.active = true;
            this.nodeXiu.active = true;
        },

        updateResult: function (livestreamsessionInfo) {
            if (livestreamsessionInfo.CurrentState !== this.currentState) {

                //check state de xu ly hien thi
                switch (livestreamsessionInfo.CurrentState) {
                    case 0: //54
                        //reset lai UI
                        this.resetUI();
                        break;
                    case 3:
                        //this.animationMess.play('openMessage');
                        //this.lblTextNotiNewGame.string = 'Dừng cược';
                        //Ko cho dat cuoc nua
                        //reset lai UI
                        this.resetUI();
                        break;
                    // result
                    case 1: //15
                        if (livestreamsessionInfo.Result.Dice1 != -1) {
                            this.playAnimationAndSetResult(livestreamsessionInfo);
                        }
                        break;

                    case cc.TaiXiuState.PREPARE_NEW_SESSION:
                        this.nodeDice.active = false;
                        //neu dang hien thi bat de nan -> tat bat di + play fx
                        this.startEffectResult();
                        break;

                }
            }

            this.currentState = livestreamsessionInfo.CurrentState;
        },



        playAnimationAndSetResult: function (livestreamsessionInfo) {
            //tinh total Dice
            this.totalDice = livestreamsessionInfo.Result.Dice1 + livestreamsessionInfo.Result.Dice2 + livestreamsessionInfo.Result.Dice3;

            //bat node Result
            //this.nodeResult.active = true;


            this.diceAnimation.node.active = true;
            this.spriteDice1.spriteFrame = this.sfDice[livestreamsessionInfo.Result.Dice1 - 1];
            this.spriteDice2.spriteFrame = this.sfDice[livestreamsessionInfo.Result.Dice2 - 1];
            this.spriteDice3.spriteFrame = this.sfDice[livestreamsessionInfo.Result.Dice3 - 1];
            //set thong so diem cua Dice
            this.lbTotalDice.string = this.totalDice;

            //set ket qua vao sprite Dice
            this.diceAnimation.setAnimation(0, 'animation', false);
            this.diceAnimation.setCompleteListener(function () {
                //this.nodeBGTimer.active = true;
                this.diceAnimation.node.active = false;

                this.nodeDice.active = true;

            }.bind(this))

            // this.xnAnimation[0].setAnimation(0, `${livestreamsessionInfo.Result.Dice1}`, false);
            // this.xnAnimation[1].setAnimation(0, `${livestreamsessionInfo.Result.Dice2}`, false);
            // this.xnAnimation[2].setAnimation(0, `${livestreamsessionInfo.Result.Dice3}`, false);
            //this.amthanhxucxac.play();
            //this.xnEffect.node.active = true
            //this.xnEffect.setAnimation(0,'effect',false)

            //this.xnAnimation[0].setCompleteListener(function(){
            //this.nodeBGTimer.active = true;
            this.diceAnimFinish();
            //}.bind(this))


            //Tat node Dice Ket qua (3 Dice)
            //this.nodeResultDice.active = false;

            //anim mới
            // this.nodeDiceAnim.active = true;               
            // this.animXocBat.__preload();

            //Bat node Dice Anim
            // this.animationDice.node.active = true;
            // this.animationDice.play('diceAnimNew'); //diceAnimationOld

            //danh dau la dang play
            //this.animationOpenPlaying = true;
        },

        //chi bat ket qua xuc xac (che do Nan)

        //goi set ket qua luon (ko chay animation dice)


        startEffectResult: function () {
            this.winSound.play();
            //Kiem tra xem ban nao thang
            if (this.totalDice > 10) {
                //TAI
                this.nodeTaiWins.forEach(function (nodeTaiWin) {
                    nodeTaiWin.active = true;
                });
                this.nodeXiuWins.forEach(function (nodeXiuWin) {
                    nodeXiuWin.active = false;
                });
                this.nodeTai.active = false;
            } else if (this.totalDice > 2 && this.totalDice <= 10) {
                //XIU
                this.nodeTaiWins.forEach(function (nodeTaiWin) {
                    nodeTaiWin.active = false;
                });
                this.nodeXiuWins.forEach(function (nodeXiuWin) {
                    nodeXiuWin.active = true;
                });
                this.nodeXiu.active = false;
            }
        },

        //sau khi play xong animation Dice
        diceAnimFinish: function () {
            //this.nodeBGTimer.active = true;
            this.lbTotalDice.node.active = true;
            //effect
            this.startEffectResult();
        }

    });
}).call(this);
