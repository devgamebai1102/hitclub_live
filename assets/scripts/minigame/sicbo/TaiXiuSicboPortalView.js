/**
 * Created by Nofear on 6/7/2017.
 */
var taiXiuSicboConfig = require("TaiXiuSicboConfig");
var netConfig = require("NetConfig");
var timeAll = 60;
(function () {
  cc.TaiXiuSicboPortalView = cc.Class({
    extends: cc.Component,
    properties: {
      //lbiTotalBetTai: cc.LabelIncrement, //tong tien bet Tai
      //lbiTotalBetXiu: cc.LabelIncrement, //tong tien bet Xiu
      // lbTimer: cc.Label,
      //
      // animationTaiXiu: cc.Animation,
    },

    onLoad: function () {
      timeAll = 60;
      this.interval = null;

      //this.nodeParentTai = this.lbiTotalBetTai.node.parent;
      //this.nodeParentXiu = this.lbiTotalBetXiu.node.parent;

      cc.TaiXiuSicboController.getInstance().setTaiXiuSicboPortalView(this);
      this.lastTimeReconnect = new Date().getTime();

      this.isAuthorized = false;
      this.connectHubTxSicbo();
    },

    onDestroy: function () {
      timeAll = 60;
      if (this.interval !== null) {
        clearInterval(this.interval);
      }
      this.unscheduleAllCallbacks();
      cc.TaiXiuSicboController.getInstance().setTaiXiuSicboPortalView(null);
    },

    reset: function () {
      timeAll = 60;
      this.isTimer = false;
      this.timer = 0;
      this.currentState = 999;
      if (this.interval !== null) {
        clearInterval(this.interval);
      }
    },

    startTimer: function (remaining) {
      if (remaining >= timeAll) {
        return;
      } else timeAll = remaining;
      if (this.interval !== null) {
        clearInterval(this.interval);
      }

      var self = this;
      this.timer = remaining;
      this.isTimer = true;

      ////update timer UI
      this.updateTimer(remaining);

      this.interval = setInterval(function () {
        if (self.isTimer) {
          self.timer -= 1;
          timeAll = self.timer;
          self.updateTimer(Math.round(self.timer));
          if (self.timer <= 1) {
            timeAll = 60;
          }
        }
      }, 1000);
    },

    stopTimer: function () {
      this.isTimer = false;
      if (this.interval !== null) {
        clearInterval(this.interval);
      }
      timeAll = 60;
    },

    updateInfo: function (sicbosessionInfo) {
      this.startTimer(sicbosessionInfo.Ellapsed);
      cc.MINIController.getInstance().updateInfoTx(
        sicbosessionInfo,
        this.currentState
      );
      //luu lai state hien tai
      this.currentState = sicbosessionInfo.CurrentState;

      //set thong tin
      //this.lbiTotalBetTai.tweenValueto(sicbosessionInfo.TotalBetTai);
      //this.lbiTotalBetXiu.tweenValueto(sicbosessionInfo.TotalBetXiu);
    },

    updateTimer: function (time) {
      if (time < 1) return;
      // this.lbTimer.string = cc.Tool.getInstance().convertSecondToTime2(time);
      cc.TaiXiuSicboController.getInstance().updateTimerInfoView(time);
      //cc.MINIController.getInstance().updateTimerTxSicbo(time, this.currentState);
      //console.log('updateTimer: ' + time);
    },

    disconnectAndLogout: function () {
      if (this.SicboluckyDiceHub) {
        this.SicboluckyDiceHub.disconnect();
      }
      this.lastTimeReconnect = new Date().getTime();
      this.isAuthorized = false;
      timeAll = 60;
    },

    connectHubTxSicboAuthorize: function () {
      if (!this.isAuthorized) {
        if (this.SicboluckyDiceHub) {
          this.SicboluckyDiceHub.disconnect();
        }

        this.lastTimeReconnect = new Date().getTime();
        this.isAuthorized = true;
        //cc.PopupController.getInstance().showBusy();
        var sicboluckyDiceNegotiateCommand =
          new cc.TaiXiuSicboNegotiateCommand();
        sicboluckyDiceNegotiateCommand.execute(this);

        return false;
      } else {
        return true;
      }
    },

    connectHubTxSicbo: function () {
      //console.log('connectHubTxSicbo');
      //cc.PopupController.getInstance().showBusy();
      this.isAuthorized = false;
      var sicboluckyDiceNegotiateCommand = new cc.TaiXiuSicboNegotiateCommand();
      sicboluckyDiceNegotiateCommand.execute(this);
    },

    reconnect: function () {
      console.log("sicboluckydiceHub reconnect");
      this.lastTimeReconnect = new Date().getTime();
      this.SicboluckyDiceHub.connect(
        this,
        cc.HubName.SicboLuckyDiceHub,
        this.connectionToken,
        true
      );
      timeAll = 60;
    },

    sendRequestOnHub: function (method, data1, data2) {
      switch (method) {
        case cc.MethodHubName.ENTER_LOBBY:
          this.SicboluckyDiceHub.enterLobby();
          break;
        case cc.MethodHubName.BET:
          this.SicboluckyDiceHub.bet(data1, data2);
          break;
        case cc.MethodHubName.CORD_INFO:
          this.SicboluckyDiceHub.cordInfo();
          break;
      }
    },

    onLuckyDiceNegotiateResponse: function (response) {
      this.connectionToken = response.ConnectionToken;
      this.SicboluckyDiceHub = new cc.Hub();
      this.SicboluckyDiceHub.connect(
        this,
        cc.HubName.SicboLuckyDiceHub,
        response.ConnectionToken
      );
    },

    onHubMessage: function (response) {
      //console.log(response);

      if (response.M !== undefined && response.M.length > 0) {
        var m = response.M[0];

        switch (m.M) {
          //vao Phong
          case cc.MethodHubOnName.SESSION_INFO_SICBO:
            var data = m.A[0];
            this.updateInfo(data);
            cc.TaiXiuSicboController.getInstance().updateInfoView(data);
            cc.TaiXiuSicboController.getInstance().updateResultView(data);
            cc.TaiXiuSicboController.getInstance().setSID(data.SessionID);
            break;
          //vao Phong
          case cc.MethodHubOnName.GAME_HISTORY_SICBO:
            cc.TaiXiuSicboController.getInstance().updateSessionHistory(m.A[0]);

            //login roi -> moi goi
            if (
              cc.LoginController.getInstance().getLoginState() &&
              cc.TaiXiuSicboController.getInstance().getIsOpen()
            ) {
              this.sendRequestOnHub(cc.MethodHubName.CORD_INFO);
            }
            break;
          //vao Phong
          case cc.MethodHubOnName.BET_OF_ACCOUNT_SICBO:
            cc.director.getScheduler().schedule(
              function () {
                cc.TaiXiuSicboController.getInstance().updateBetInfoView(
                  m.A[0]
                );
              },
              this,
              1,
              0,
              0.2,
              false
            );
            break;

          //su kien trieu hoi PH
          case cc.MethodHubOnName.CORD_ACCOUNT_INFO_SICBO:
            var data = m.A[0];
            if (data.IsEventDragon) {
              cc.TaiXiuSicboController.getInstance().activeEventPH(true);
              cc.TaiXiuSicboController.getInstance().setUserCord(
                data.CordWin,
                data.CordLost
              );
            } else {
              cc.TaiXiuSicboController.getInstance().activeEventPH(false);
            }
            break;
          //su kien trieu hoi PH
          case cc.MethodHubOnName.EVENT_WINNER_RESULT_SICBO:
            //set giai thuong + user goi duoc rong
            cc.TaiXiuSicboController.getInstance().setEventWinnerResult(m.A[0]);
            //Khoi tao hieu ung khi dang o portal hoặc đang bật TX
            if (
              cc.LobbyController.getInstance().checkLobbyActive() ||
              cc.TaiXiuSicboController.getInstance().getIsOpen()
            ) {
              cc.LobbyController.getInstance().createFxSummonDragon();
            }

            //login roi -> moi goi
            if (cc.LoginController.getInstance().getLoginState()) {
              this.sendRequestOnHub(cc.MethodHubName.CORD_INFO);
            }

            //Khoi tao hieu ung khi đang bật TX
            // if (cc.TaiXiuSicboController.getInstance().getIsOpen()) {
            //     cc.LobbyController.getInstance().createFxSummonDragon();
            // }

            break;
          //su kien trieu hoi PH
          case cc.MethodHubOnName.SUMMON_DRAGON_AWARD_SICBO:
            //user nam trong TOP dây Win/Lose -> duoc thuong -> lay lai thong tin balance
            // {
            //     "AccountID": 100000012,
            //     "PrizeValue": 1756234,
            //     "Balance": 243553877
            // }

            cc.LobbyController.getInstance().refreshAccountInfo();
            break;

          //bet thanh cong
          case cc.MethodHubOnName.BET_SUCCESS_SICBO:
            var data = m.A[0];
            cc.TaiXiuSicboController.getInstance().updateBetInfoView(data);
            //update lai balance
            cc.BalanceController.getInstance().updateRealBalance(m.A[1]);
            cc.BalanceController.getInstance().updateBalance(m.A[1]);
            cc.TaiXiuSicboController.getInstance()
              .getTaiXiuSicboInputBetView()
              .addSuccess();
            cc.DDNA.getInstance().betSummary(
              cc.DDNAGame.TAI_XIU_SICBO,
              data.BetValue,
              cc.TaiXiuSicboController.getInstance().getSID()
            );
            break;
          case cc.MethodHubOnName.WIN_RESULT_SICBO:
            var data = m.A[0];
            var waitTime = taiXiuSicboConfig.TIME_WAIT_DICE_ANIMATION;
            //dang bat che do Nan
            if (cc.TaiXiuSicboController.getInstance().getIsNan()) {
              //thoi gian doi show ket qua win lau hon
              waitTime = taiXiuSicboConfig.TIME_WAIT_SHOW_WIN_RESULT_NAN;
            }

            cc.director.getScheduler().schedule(
              function () {
                //play fx win
                cc.TaiXiuSicboController.getInstance().playEffectWin(
                  data.Award
                );
                //update lai balance
                cc.BalanceController.getInstance().updateRealBalance(
                  data.Balance
                );
                cc.BalanceController.getInstance().updateBalance(data.Balance);
              },
              this,
              0,
              0,
              waitTime,
              false
            );

            break;
          case cc.MethodHubOnName.MESSAGE:
            var data = m.A[0];
            if (data.Description) {
              cc.PopupController.getInstance().showMessage(data.Description);
            } else if (data.Message) {
              cc.PopupController.getInstance().showMessage(data.Message);
            } else {
              cc.PopupController.getInstance().showMessage(data);
            }
            break;
          case cc.MethodHubOnName.OTHER_DEVICE:
            // m.A[0] = ma loi , m.A[1] = message
            //vao phong choi tren thiet bi khac
            cc.PopupController.getInstance().showPopupOtherDevice(
              m.A[1],
              cc.GameId.TAI_XIU_SICBO
            );
            break;
        }
      } else {
        //PING PONG
        if (response.I) {
          this.SicboluckyDiceHub.pingPongResponse(response.I);
        }
      }
    },

    onHubOpen: function () {
      cc.PopupController.getInstance().hideBusy();
      if (this.isAuthorized) {
        this.sendRequestOnHub(cc.MethodHubName.ENTER_LOBBY);
      }
    },

    onHubClose: function () {
      cc.TaiXiuSicboController.getInstance().reset();
      //reconnect
      // console.log((new Date()).getTime() - this.lastTimeReconnect);
      if (
        new Date().getTime() - this.lastTimeReconnect >=
        netConfig.RECONNECT_TIME * 1000
      ) {
        this.reconnect();
      } else {
        cc.director
          .getScheduler()
          .schedule(
            this.reconnect,
            this,
            netConfig.RECONNECT_TIME,
            0,
            0,
            false
          );
      }
    },

    onHubError: function () {},
  });
}.call(this));
