/*
 * Generated by BeChicken
 * on 9/27/2019
 * version v1.0
 */
(function () {
    cc.BacaratInfoView = cc.Class({
        extends: cc.Component,
        properties: {
            lbTime: cc.Label,
            lbSessionID: cc.Label,
            layoutCard: cc.Node,
            lbStatus: cc.Label,
            lbTotalPlayer: cc.Label,
            lstPlayers: [cc.BacaratPlayer],
        },
        onLoad: function () {
            cc.BacaratController.getInstance().setInfoView(this);

            this.activeTimer(false);
            this.showStatus(null);
            this.isShowCard = false;
            this.currentState = null;
            this.interval = null;
            this.time = 0;
            this.currPlayer = this.lstPlayers[0];
        },
        onDestroy: function () {
            try {
                if (this.interval) {
                    clearInterval(this.interval);
                }
            } catch (e) {

            }
        },
        updateSessionInfo: function (data) {
            let state = data.CurrentState;
            switch (state) {
                case cc.BacaratMapGameState.BETTING:
                    if (this.currentState != state) {
                        cc.BacaratController.getInstance().setWinResult(null);
                        cc.BacaratController.getInstance().setWinVipResult(null);

                        //Chia bai truoc khi dat cuoc
                        this.showStatus("ĐẶT CƯỢC");
                        this.activeLayoutCard(true);
                        if (!this.isShowCard) {
                            cc.BacaratController.getInstance().initCardOnTable();
                        }
                        cc.BacaratController.getInstance().disableBetAgain(false);

                        this.lbTime.node.color = cc.Color.GREEN;
                        this.updateTime(data.Ellapsed);
                        this.activeTimer(true);
                        //??? tai sao lai delay
                        // setTimeout(function () {
                        //     this.activeTimer(true);
                        // }.bind(this), 1000);

                        cc.BacaratController.getInstance().enableClickBet(true);
                    }
                    break;
                //Hien Thi ket qua
                case cc.BacaratMapGameState.SHOW_RESULT:
                    if (this.currentState != state) {
                        this.showStatus(null);
                        this.activeLayoutCard(true);

                        this.showStatus("KẾT QUẢ");

                        this.lbTime.node.color = cc.Color.WHITE;
                        this.updateTime(data.Ellapsed);
                        this.activeTimer(true);

                        cc.BacaratController.getInstance().enableClickBet(false);
                        //Khoi tao mang chip
                        cc.BacaratController.getInstance().initChipsWin();
                        try {
                            if (parseInt(data.Ellapsed) >= 15 && !cc.game.isPaused()) {
                                //Chia bai
                                cc.BacaratController.getInstance().onSlideCard(data);
                            } else {
                                //Hien thi ket qua luon
                                cc.BacaratController.getInstance().forceShowResult(data, data.Ellapsed);
                            }
                        } catch (e) {
                            console.log(e);
                        }

                    }
                    break;
                //Chuan bi round moi
                case cc.BacaratMapGameState.PREPARE_NEW_ROUD:

                    if (this.currentState != state) {
                        this.isShowCard = true;
                        // this.showStatus("BẮT ĐẦU");
                        this.showStatus(null);
                        this.activeLayoutCard(false);
                        this.activeTimer(false);
                        // this.updateTime(data.Ellapsed);
                        //Reset trang thai
                        cc.BacaratController.getInstance().enableClickBet(false);
                        //Reset
                        cc.BacaratController.getInstance().resetLayoutCard();
                        //Stop animation
                        cc.BacaratController.getInstance().stopAnimationWin();
                        //Clear chip
                        cc.BacaratController.getInstance().clearAllChips();
                        //Khoi tao lai paramchip
                        cc.BacaratController.getInstance().initParamChips();

                        //Clear session truoc
                        cc.BacaratController.getInstance().clearBetLog(cc.BacaratController.getInstance().getBetLogSession());
                        //Tao session betlog
                        cc.BacaratController.getInstance().setBetLogSession(cc.BacaratController.getInstance().getBetLogSession() + 1);
                        this.resetPlayerUI();

                        //Chia bai
                        if (!cc.game.isPaused()) {
                            cc.director.getScheduler().schedule(function () {
                                this.activeLayoutCard(true);
                                cc.BacaratController.getInstance().slideCardOnBet();
                            }, this, 0, 0, 0.5, false);
                        } else {
                            this.activeLayoutCard(true);
                            cc.BacaratController.getInstance().initCardOnTable();
                        }

                    }
                    break;
                case cc.BacaratMapGameState.END_BETTING:
                    if (this.currentState != state) {

                        this.showStatus("HẾT THỜI GIAN CƯỢC");

                        this.lbTime.node.color = cc.Color.RED;
                        this.updateTime(data.Ellapsed);
                        this.activeTimer(true);

                        this.activeLayoutCard(true);
                        //Kiem tra da hien thi bai tren ban hay chua
                        if (!this.isShowCard) {
                            cc.BacaratController.getInstance().initCardOnTable();
                        }
                        //Disable betting
                        cc.BacaratController.getInstance().enableClickBet(false);
                        cc.BacaratController.getInstance().disableBetAgain(true);
                    }
                    break;
            }
            this.updateSessionId(data.SessionID);
            this.currentState = state;
            cc.BacaratController.getInstance().setCurrentState(state);
        },
        updatePlayersInGame: function (totalPlayer) {
            this.lbTotalPlayer.string = totalPlayer;
        },

        resetPlayerUI: function () {
            this.lstPlayers.map(player => {
                player.resetPlayerResultUI();
            }, this)
        },
        //Cap nhat thong tin nguoi choi hien tai
        updatePlayerInfor: function (dataPlayer) {
            this.currPlayer.registerPlayer(dataPlayer.Account);
        },
        //Cap nhat thong tin player
        updatePlayersUI: function (dataPlayers) {
            this.positionsUI = [0, 0, 0, 0, 0, 0, 0];
            let countPlayer = 0;
            this.positionsUI[countPlayer] = cc.LoginController.getInstance().getUserId();
            countPlayer++;
            dataPlayers.map(player => {
                if (player.AccountID != cc.LoginController.getInstance().getUserId()) {
                    if (countPlayer <= 6) {
                        this.positionsUI[countPlayer] = player.AccountID;
                        countPlayer++;
                    }
                }
            }, this);

            //Hien thi player
            this.positionsUI.forEach(function (accID, index) {
                if (accID != 0) {
                    try {
                        let playerInfo = dataPlayers.filter(player => player.AccountID == accID);
                        //Loai tru player hien tai
                        if (playerInfo.length > 0 && index != 0) {
                            this.lstPlayers[index].registerPlayer(playerInfo[0].Account);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    //Reset lai vi tri cua player
                    this.lstPlayers[index].unRegisterPlayer();
                }
            }, this);
            cc.BacaratController.getInstance().updatePositionPlayerUI(this.positionsUI);
        },
        updateBalanceCurrPlayer: function (balance) {
            this.currPlayer.updateChipNormal(balance);
        },
        //Cap nhat balance player khac
        updateBalancePlayer: function (data) {
            let accID = data[0];
            let balance = data[3];
            let indexPlayer = this.positionsUI.indexOf(accID);
            if(indexPlayer != -1) {
                this.lstPlayers[indexPlayer].updateChip(balance);
            }
        },
        //Hien thi ket qua thang
        winResult: function (data) {
            this.currPlayer.playerResultUI(data.Award, data.Balance);
        },
        winResultVip: function (data) {
            data.map(player => {
                //Kiem tra player co trong mang hay ko
                if (this.positionsUI.includes(player.AccountID) && player.AccountID != cc.LoginController.getInstance().getUserId()) {
                    let indexPlayer = this.positionsUI.indexOf(player.AccountID);
                    this.lstPlayers[indexPlayer].playerResultUI(player.Award, player.Balance);
                }
            }, this);
        },
        showStatus: function (strStatus) {
            if (strStatus != null) {
                this.lbStatus.string = strStatus;
                this.lbStatus.node.parent.active = true;
                this.lbStatus.node.getComponent(cc.Animation).play('notify-checkchi');
            } else {
                this.lbStatus.node.parent.active = false;
            }
        },
        activeLayoutCard: function (isActive) {
            this.layoutCard.active = isActive;
        },
        activeTimer: function (isActive) {
            this.lbTime.node.parent.active = isActive;
            if (this.interval && !isActive) {
                clearInterval(this.interval);
            }
        },
        updateSessionId: function (sID) {
            this.lbSessionID.string = ": #" + sID;
        },
        updateTime: function (time) {
            //Clear interval
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.time = parseInt(time);
            this.startTimer();

            this.interval = setInterval(function () {
                this.startTimer();
            }.bind(this), 1000)
        },
        startTimer: function () {
            if (this.time < 0) {
                this.time = 0;
                return;
            }
            // let color = cc.BacaratController.getInstance().getColorType(cc.BacaratColor.WHITE);
            // if (this.time <= 3) {
            //     color = cc.BacaratController.getInstance().getColorType(cc.BacaratColor.RED);
            //     // this.lbTime.node.getComponent(cc.Animation).play('time');
            // }
            // this.lbTime.node.color = color;
            this.lbTime.string = this.time;
            this.time--;

        },
        playerShowBubbleChat: function (message) {
            if (message[4] == false && message[3] != cc.LoginController.getInstance().getUserId()) {
                return;
            }
            if (cc.ChatRoomController.getInstance().checkIsEmotion(message)) {
                this.lstPlayers.forEach(function (player) {
                    let playerNickName = player.nickName;
                    let nickName = message[0];
                    if (nickName === playerNickName) {
                        player.showEmotion(cc.ChatRoomController.getInstance().getIndexEmotion(message)
                            , message);
                    }
                });
            } else {
                this.lstPlayers.forEach(function (player) {
                    let playerNickName = player.nickName;
                    let nickName = message[0];
                    if (nickName === playerNickName) {
                        player.showBubbleChat(message);
                    }
                });
            }

        },
    });
}).call(this);
