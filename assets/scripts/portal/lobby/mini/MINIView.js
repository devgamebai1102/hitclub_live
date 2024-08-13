/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.MINIView = cc.Class({
        "extends": cc.Component,
        properties: {
            animationMINI: cc.Animation,
            nodeMini: cc.Node,
            nodeCancel: cc.Node,

            nodeBtnMini: cc.Node,

            lbTimerTxs: [cc.Label],
        },

        // use this for initialization
        onLoad: function () {
            this.isOpen = false;
            this.node.zIndex = cc.NoteDepth.MINI_VIEW;
            this.nodeBtnMini.parent.zIndex = cc.NoteDepth.MINI_VIEW_BUTTON;
            this.animationBtnMini = this.nodeBtnMini.getComponent(cc.Animation);

            cc.MINIController.getInstance().setMiniView(this);
        },

        updateTimerTx: function (timer, txState) {
            this.lbTimerTxs.forEach(function (lbTimer) {
                switch (txState) {
                    case cc.TaiXiuState.BETTING:
                    case cc.TaiXiuState.END_BETTING:
                        lbTimer.node.color = cc.Color.YELLOW;
                        break;
                    case cc.TaiXiuState.RESULT: //15
                    case cc.TaiXiuState.PREPARE_NEW_SESSION:
                        lbTimer.node.color = cc.Color.WHITE;
                        break;

                }
                lbTimer.string = timer;
            });
        },
        
		updateInfoTx: function (info, txState) {
			//var totalDice = info.Result.Dice1 + info.Result.Dice2 + info.Result.Dice3;
			//console.log(totalDice);
            switch (txState) {
                case cc.TaiXiuState.BETTING:
                case cc.TaiXiuState.END_BETTING:
                case cc.TaiXiuState.PREPARE_NEW_SESSION:
                    //this.nodeAniTai.active = false;
                    //this.nodeAniXiu.active = false;
                    //if(this.nodeMini.active) {
                        //this.nodeAniTai.active = false;
                        //this.nodeAniXiu.active = false;
                    //}
                    break;
                case cc.TaiXiuState.RESULT:
                    if(cc.TaiXiuController.getInstance().getIsNan()) {
                        //this.nodeAniTai.active = false;
                        //this.nodeAniXiu.active = false;
                        //if(this.nodeMini.active) {
                            //this.nodeAniTai.active = false;
                        //}
                        //if(this.nodeMini.active) {
                            //this.nodeAniXiu.active = false;
                        //}
                    } else {
						//if (info.Result.Dice1 + info.Result.Dice2 + info.Result.Dice3 > 10) {
                            //this.nodeAniTai.active = true;
                            //if(this.nodeMini.active) {
                                //this.nodeAniTai.active = true;
                            //}
                        //} else {
                            //this.nodeAniXiu.active = true;
                            //if(this.nodeMini.active) {
                                //this.nodeAniXiu.active = true;
                            //}
                        //}
                    }
                    break;
            }
		},

        open: function () {
            console.log("click mini-1");
            this.animationMINI.play('openMINI');
            this.isOpen = true;
            this.nodeCancel.active = true;
            this.nodeMini.active = true;

            this.animationBtnMini.play('fadeIn');

            var self = this;
            var delay = 0.25;
            cc.director.getScheduler().schedule(function () {
                self.nodeBtnMini.parent.active = false; 
            }, this, 1, 0, delay, false);
        },

        close: function () {
            console.log("close mini-1");
            this.animationMINI.play('closeMINI');        
            this.isOpen = false;
            this.nodeCancel.active = false;        
            this.animationBtnMini.play('fadeOut');

            var self = this;
            cc.director.getScheduler().schedule(function () {            
                self.nodeBtnMini.parent.active = true;
                self.nodeMini.active = false;
            }, this, 0, 0, 0.3, false);
        },

        openClicked: function () {
            this.open();
        },

        closeClicked: function () {
            this.close();
        },

        joinGameClicked: function (event, data) {
            this.close();
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().joinGame(data);
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, cc.DDNA.getInstance().getGameById(data.toString()), cc.DDNAUIType.MINIGAME);
            }
        },

        openVQMMClicked: function () {
            this.close();

            // cc.PopupController.getInstance().showMessage('Sắp ra mắt!');
            // return;

            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createVQMMView();
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'MINIGAME', cc.DDNAUIType.BUTTON);
            }
        },
    });
}).call(this);
