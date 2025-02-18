/*
 * Generated by BeChicken
 * on 9/27/2019
 * version v1.0
 */
(function () {
    cc.DragonTigerInfoView = cc.Class({
        extends: cc.Component,
        properties: {
            lstPlayers: [cc.DragonTigerPlayer],
        },
        onLoad: function () {
            cc.DragonTigerController.getInstance().setInfoView(this);

            this.interval = null;
            this.time = 0;
            this.currPlayer = this.lstPlayers[0];
            this.currPlayer.showPlayer(true);
        },
        onDestroy: function () {
            try {
                if (this.interval) {
                    clearInterval(this.interval);
                }
            } catch (e) {

            }
        },
        resetPlayerUI: function () {
            this.lstPlayers.map(player => {
                player.resetPlayerResultUI();
            }, this)
        },
        //UnRegisterPlayer cho HubOn PlayerLeave
        unRegisterAllPlayer: function () {
            this.lstPlayers.map(player => player.unRegisterPlayer());
        },
        //Cap nhat thong tin nguoi choi hien tai
        updatePlayerInfor: function (dataPlayer) {
            this.currPlayer.registerPlayer(dataPlayer.Account);
        },
        //Cap nhat thong tin player
        updatePlayersUI: function (dataPlayers) {

            let countPlayer = 0;
            this.positionsUI = [0, 0, 0, 0, 0, 0, 0];
            this.positionsUI[0] = cc.LoginController.getInstance().getUserId();
            countPlayer++;
            dataPlayers.map(player => {
                if (player.AccountID != cc.LoginController.getInstance().getUserId()) {
                    if(countPlayer <= 6) {
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
                        this.lstPlayers[index].showPlayer(true);
                        //Loai tru player hien tai
                        if (playerInfo.length > 0 && index != 0) {
                            this.lstPlayers[index].registerPlayer(playerInfo[0].Account);
                            this.lstPlayers[index].resetPlayerResultUI();
                        }
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    //Reset lai vi tri cua player
                    this.lstPlayers[index].unRegisterPlayer();
                    this.lstPlayers[index].showPlayer(false);
                }
            }, this);
            cc.DragonTigerController.getInstance().updatePositionPlayerUI(this.positionsUI);
        },
        //Cap nhat so du cua player hien tai
        updateBalanceCurrPlayer: function (balance) {
            this.currPlayer.updateChipNormal(balance);
        },
        //Cap nhat so du nguoi choi
        updatePlayerBalance: function (data) {
            //Kiem tra player co ngoi trong ban hay ko
            let indexPlayer = this.positionsUI.indexOf(data[2]);
            if( indexPlayer != -1) {
                this.lstPlayers[indexPlayer].updateChip(data[3]);
            }

        },
        //Hien thi ket qua thang
        winResult: function (data) {
            this.currPlayer.playerResultUI(data.Award, data.Balance);
        },
        winResultVip: function (data) {
            data.map(player => {
                //Kiem tra player co trong mang hay ko
                if (this.positionsUI && this.positionsUI.includes(player.AccountID) && player.AccountID != cc.LoginController.getInstance().getUserId()) {
                    let indexPlayer = this.positionsUI.indexOf(player.AccountID);
                    if (indexPlayer != -1) {
                        this.lstPlayers[indexPlayer].playerResultUI(player.Award, player.Balance);
                    }

                }
            }, this);
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
