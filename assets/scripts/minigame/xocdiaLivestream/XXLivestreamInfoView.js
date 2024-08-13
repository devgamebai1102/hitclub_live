/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
  cc.XXLivestreamInfoView = cc.Class({
    extends: cc.Component,
    properties: {
      //phien
      lbSID: cc.Label,
      //thoi gian
      lbTimer: cc.Label,
      //giai doan (đặt cửa, kết quả...)
      lbInfo: cc.Label,
      nodeLoading: cc.Node,
      nodeChoKQ: cc.Node,
      nodeKQ: cc.Node,
      lbBalance: cc.Node,
      lbTotalUserBet: cc.Label,
      lbWin: cc.Label,
      nodeNoty: cc.Node,
      lblNoty: cc.Label,
      //players
      //XXLivestreamPlayers: [cc.XXLivestreamPlayer],
    },

    onLoad: function () {
      var self = this;
      this.interval = null;
      this.timeBet = 54;
      this.reset();
      this.totalBet = 0;
      this.nodeNoty.active = false;
      cc.XXLivestreamController.getInstance().setXXLivestreamInfoView(this);
      this.lbChip = this.lbBalance.getComponent(cc.LabelIncrement);
      this.lbChip.formatCurrencyUnit = true;

      //this.maxPlayer = this.XXLivestreamPlayers.length;

      this.animInfo = this.lbInfo.node.parent.getComponent(cc.Animation);

      //this.currPlayer = this.XXLivestreamPlayers[0];
      this.timeouts = [];
    },
    onDestroy: function () {
      this.timeouts.forEach(function (t) {
        clearTimeout(t);
      });
      this.timeouts = [];
      if (this.interval !== null) {
        clearInterval(this.interval);
      }
    },
    //Cap nhat thong tin nguoi choi hien tai
    updateInfoCurrPlayer: function (data) {
      this.lbChip.tweenValueto(data.Balance);
      //this.currPlayer.registerPlayer(data);
    },
    //HubOn - joinGame
    joinGame: function (info) {
      //lay ve mang vi tri player
      this.positions = info.Positions;

      this.countPlayer = 0;
      //luu vi tri player tren UI
      this.positionsUI = [0, 0, 0, 0, 0, 0, 0];

      //tim index của owner
      this.onwerIndex = 0;

      //gan vi tri Owner
      this.positionsUI[this.countPlayer] =
        cc.LoginController.getInstance().getUserId();

      this.countPlayer++;
      // for (var i = 0; i < this.maxPlayer; i++) {
      //     var accID = this.positions[i];
      //     //add vi tri cac accID khac vao position tren UI
      //     if (accID > 0 && accID !== cc.LoginController.getInstance().getUserId()) {
      //         this.positionsUI[this.countPlayer] = accID;
      //         this.countPlayer++;
      //     }
      // }

      //lay ve players
      var players = info.Players;

      // for (var i = 0; i < this.maxPlayer; i++) {
      //     var accID = this.positions[i];
      //     //cac vi tri co nguoi choi: accID > 0
      //     if (accID > 0) {
      //         this.registerPlayer(this.getIndexUIBetByAccID(accID), players[accID].Account);
      //     }
      // }
      //cc.XXLivestreamController.getInstance().updatePositionPlayerUI(this.positionsUI);
    },

    //HubOn - playerJoin
    playerJoin: function (info) {
      // for (var i = 0; i < this.maxPlayer; i++) {
      //     var accID = this.positionsUI[i];
      //     if (accID === 0) {
      //         this.positionsUI[i] = info.Account.AccountID;
      //         this.registerPlayer(i, info.Account);
      //         break;
      //     }
      // }
    },

    //HubOn - playerLeave
    playerLeave: function (info) {
      //dam bao joinGame xong moi xu ly - tranh loi server neu bi
      // if (this.positionsUI) {
      //     var accID = info[0];
      //     this.unRegisterPlayer(this.getIndexUIBetByAccID(accID));
      //     var index = -1;
      //     for (var i = 0; i < this.maxPlayer; i++) {
      //         if (accID === this.positionsUI[i]) {
      //             index = i;
      //             break;
      //         }
      //     }
      //     this.positionsUI[index] = 0;
      // }
    },

    //HubOn - updateConnectionStatus
    updateConnectionStatus: function (info) {
      // if (this.positionsUI) {
      //     var accID = info[0];
      //     var status = info[1];
      //     this.XXLivestreamPlayers[this.getIndexUIBetByAccID(accID)].updateConnectionStatus(status);
      //     //neu la owner dky rời game -> tắt game
      //     if (status === cc.XXLivestreamConnectionStatus.REGISTER_LEAVE_GAME && accID === cc.LoginController.getInstance().getUserId()) {
      //         cc.LobbyController.getInstance().destroyDynamicView(null);
      //     }
      // }
    },

    //HubOn - updatePlayerStatus
    updatePlayerStatus: function (playerStatus) {
      // if (this.positionsUI) {
      //     this.XXLivestreamPlayers[0].updatePlayerStatus(playerStatus);
      // }
    },
    //HubOn - summaryPlayer
    summaryPlayer: function (totalUser) {
      //this.lbTotalUser.string = totalUser;
    },

    //HubOn - vipPlayer
    // vipPlayer: function (dataPlayers) {
    //     let countPlayer = 0;
    //     this.positionsUI = [0, 0, 0, 0, 0, 0, 0];
    //     this.positionsUI[0] = cc.LoginController.getInstance().getUserId();
    //     countPlayer++;
    //     dataPlayers.map(player => {
    //         if (player.AccountID != cc.LoginController.getInstance().getUserId()) {
    //             if (countPlayer <= 6) {
    //                 this.positionsUI[countPlayer] = player.AccountID;
    //                 countPlayer++;
    //             }
    //         }
    //     }, this);
    //     //Hien thi player
    //     this.positionsUI.forEach(function (accID, index) {
    //         if (accID != 0) {
    //             try {
    //                 let playerInfo = dataPlayers.filter(player => player.AccountID == accID);
    //                 //Loai tru player hien tai
    //                 if (playerInfo.length > 0 && index != 0) {
    //                     this.XXLivestreamPlayers[index].registerPlayer(playerInfo[0].Account);
    //                     this.XXLivestreamPlayers[index].resetPlayerResultUI();
    //                 }
    //             } catch (e) {
    //             }
    //         } else {
    //             //Reset lai vi tri cua player
    //             this.XXLivestreamPlayers[index].unRegisterPlayer();
    //         }
    //     }, this);
    //     cc.XXLivestreamController.getInstance().updatePositionPlayerUI(this.positionsUI);
    // },
    // //HubOn - totalUserWin
    // totalUserWin: function (amount) {
    //     //set gia tri
    //     // this.lbTotalUserWin.string = '+' + cc.Tool.getInstance().formatNumber(amount);
    //     // this.lbTotalUserWin.font = cc.XXLivestreamController.getInstance().getWinFont();
    //     // //play fx thang
    //     // this.lbTotalUserWin.node.active = true;
    //     // this.lbTotalUserWin.node.scaleY = 0;
    //     // this.lbTotalUserWin.node.getComponent(cc.Animation).play('xxWin');
    // },
    // HubOn - WinResultVip
    winResultVip: function (dataPlayer) {
      // if (!this.positionsUI)
      //     return;
      // if (dataPlayer.length > 0) {
      //     dataPlayer.map(player => {
      //         let indexPlayer = this.positionsUI.indexOf(player.AccountID);
      //         if (player.AccountID != cc.LoginController.getInstance().getUserId() && indexPlayer != -1) {
      //             this.XXLivestreamPlayers[indexPlayer].playerResultUI(true, player.Award);
      //             this.XXLivestreamPlayers[indexPlayer].updateChip(player.Balance);
      //         }
      //     });
      // }
    },
    //HubOn - WinResult
    winResult: function (dataPlayer) {
      cc.XXLivestreamController.getInstance().updateChip(
        dataPlayer.AccountID,
        dataPlayer.Balance
      );
      this.lbWin.string =
        "+" + cc.Tool.getInstance().formatNumber(dataPlayer.Award);
      this.lbWin.node.active = true;
      //hiệu ứng lên tiền
      // if (!this.currPlayer)
      //     return;
      //this.currPlayer.playerResultUI(true, dataPlayer.Award);
      //this.currPlayer.updateChip(dataPlayer.Balance);
    },
    updateChip: function (chip) {
      this.lbChip.tweenValueto(chip);
    },
    updateTotalBet: function (amount) {
      this.totalBet += amount;
      this.lbTotalUserBet.string = cc.Tool.getInstance().formatNumber(
        this.totalBet
      );
    },

    // getPositions: function () {
    //     return this.positionsUI;
    // },

    //lay ve index bet theo accID
    // getIndexUIBetByAccID: function (accID) {
    //     var indexBet = -1;
    //     try {
    //         for (var i = 0; i < this.maxPlayer; i++) {
    //             if (this.positionsUI[i] === accID) {
    //                 indexBet = i;
    //                 break;
    //             }
    //         }
    //     } catch (err) {

    //     }
    //     // console.log('getIndexUIBetByAccID: ' + indexBet);
    //     return indexBet;
    // },

    //lay ve index bet theo accID
    // getIndexUIBetByPosition: function (pos) {
    //     var indexBet = pos;

    //     if (indexBet > this.onwerIndex) {
    //         //map lai theo UI
    //         indexBet += this.onwerIndex;

    //         if (indexBet >= this.maxPlayer) {
    //             indexBet -= (this.maxPlayer - 1);
    //         }
    //     } else if (indexBet < this.onwerIndex) {
    //         //map lai theo UI
    //         indexBet -= this.onwerIndex;
    //         if (indexBet < 0) {
    //             indexBet = (this.maxPlayer + indexBet);
    //         }
    //     } else {
    //         indexBet = 0;
    //     }

    //     // console.log('getIndexUIBetByPosition: ' + indexBet);
    //     return indexBet;
    // },

    //reset UI ket qua (win/lose) sau moi Phien cua tat ca player
    // resetPlayersResultUI: function () {
    //     this.lbTotalUserWin.node.active = false;
    //     for (var i = 0; i < this.maxPlayer; i++) {
    //         this.XXLivestreamPlayers[i].resetPlayerResultUI();
    //     }
    // },

    //set ket qua cua player
    // playerResultUI: function (playerIndex, isWin, amount) {
    //     this.XXLivestreamPlayers[playerIndex].playerResultUI(isWin, amount);
    // },

    //player vao phong
    // registerPlayer: function (playerIndex, info) {
    //     this.XXLivestreamPlayers[playerIndex].registerPlayer(info);
    // },

    // unRegisterPlayer: function (playerIndex) {
    //     this.XXLivestreamPlayers[playerIndex].unRegisterPlayer();
    // },

    playerShowBubbleChat: function (message) {},

    reset: function () {
      this.nodeLoading.active = false;
      this.nodeChoKQ.active = false;
      this.nodeKQ.active = false;
      this.isTimer = false;
      this.timer = 0;
      this.currentState = 999;
      if (this.interval !== null) {
        clearInterval(this.interval);
      }
    },

    startTimer: function (remaining) {
      if (this.interval !== null) {
        clearInterval(this.interval);
      }

      var self = this;
      this.timer = remaining;
      this.isTimer = true;

      ////update timer UI
      this.updateTimer(remaining);

      // this.interval = setInterval(function () {
      //     if (self.isTimer) {
      //         self.timer -= 1;
      //         self.updateTimer(self.timer);
      //     }
      // }, 1000);
    },

    updateTimer: function (time) {
      var self = this;
      if (this.currentState == cc.XXLivestreamState.WAITINGRESULT) {
        this.nodeLoading.active = true;
        this.nodeChoKQ.active = true;
        cc.tween(self.nodeChoKQ).then(cc.blink(400.0, 266)).start();
        this.nodeKQ.active = false;
      }
      if (this.lbTimer) {
        var timeInt = time;
        this.timeInt = timeInt;

        if (timeInt > 0) {
          this.lbTimer.string = timeInt;
        }
      }
    },

    getTime: function () {
      return this.timeInt;
    },

    updateSessionId: function (sID) {
      this.lbSID.string = "#" + sID;
    },

    updateInfo: function (info, state, time) {
      var self = this;
      //check state de xu ly hien thi
      this.updateTimer(time);
      switch (state) {
        //giai doan dat cuoc
        case cc.XXLivestreamState.BETTING:
          if (this.currentState !== state) {
            this.lbWin.node.active = false;
            this.nodeNoty.active = false;
            this.updateSessionId(info.SessionID);
            cc.XXLivestreamController.getInstance().setSID(info.SessionID);
            //this.startTimer(time);
            //this.resetPlayersResultUI();
            this.lbTimer.node.color = cc.Color.GREEN;
            this.lbTimer.node.active = true;
            //.lbInfo.string = 'Đặt cửa';
            //this.animInfo.play('xxInfo');
            //cc.XXLivestreamController.getInstance().resetDraw();
            //cc.XXLivestreamController.getInstance().draw(info.History.reverse());
          }
          break;

        //giai doan mo dia
        case cc.XXLivestreamState.WAITINGRESULT:
          if (this.currentState !== state) {
            this.nodeNoty.active = false;
            this.updateSessionId(info.SessionID);
            cc.XXLivestreamController.getInstance().setSID(info.SessionID);
            this.nodeLoading.active = true;
            this.nodeChoKQ.active = true;
            this.nodeKQ.active = false;
            this.lbTimer.node.active = false;
            //this.startTimer(time);
            //this.resetPlayersResultUI();
            //this.lbTimer.node.color = cc.Color.WHITE;
            //this.lbInfo.string = 'Mở bát';
            //this.animInfo.play('xxInfo');
          }
          break;

        //giai doan ket qua
        case cc.XXLivestreamState.SHOW_RESULT: //15
          if (this.currentState !== state) {
            this.updateSessionId(info.SessionID);
            cc.XXLivestreamController.getInstance().setSID(info.SessionID);
            this.nodeLoading.active = false;
            this.nodeChoKQ.active = false;
            this.nodeKQ.active = true;
            this.lbTimer.node.active = false;
            //this.startTimer(time);
            //this.lbTimer.node.color = cc.Color.WHITE;
            //this.lbInfo.string = 'Kết quả';
            //this.animInfo.play('xxInfo');
          }
          break;

        //giai doan cho phien moi
        case cc.XXLivestreamState.WAITING:
          if (this.currentState !== state) {
            this.lbTotalUserBet.string = "0";
            this.lbWin.node.active = false;
            this.totalBet = 0;
            this.lblNoty.string = "Phiên mới";
            this.nodeNoty.active = true;
            this.updateSessionId(info.SessionID);
            cc.XXLivestreamController.getInstance().setSID(info.SessionID);
            this.lbTimer.node.active = false;
            //this.progressTimer.node.parent.active = false;
            //this.startTimer(time);
            //this.resetPlayersResultUI();
            //this.lbTimer.node.color = cc.Color.WHITE;
            // this.lbInfo.string = 'Đợi phiên mới';
            // this.animInfo.play('xxInfo');
          }
          break;

        //giai doan xoc dia
        case cc.XXLivestreamState.ENDBETTING:
          if (this.currentState !== state) {
            this.lblNoty.string = "Ngừng nhận cược";
            this.nodeNoty.active = true;
            this.updateSessionId(info.SessionID);
            //cc.XXLivestreamController.getInstance().clearAllChip();
            //this.progressTimer.node.parent.active = false;
            this.startTimer(time);
            //this.resetPlayersResultUI();
            // this.lbTimer.node.color = cc.Color.WHITE;
            // this.lbInfo.string = 'Xóc xóc';
            // this.animInfo.play('xxInfo');
          }
          break;
      }

      //luu lai state hien tai
      this.currentState = state;
    },
  });
}).call(this);
