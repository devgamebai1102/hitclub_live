/**
 * Created by Nofear on 6/7/2017.
 */
var TaiXiuLivestreamConfig = require('TaiXiuLivestreamConfig');
var netConfig = require('NetConfig');
var timeAll=60;
(function () {
    cc.TaiXiuLivestreamPortalView = cc.Class({
        "extends": cc.Component,
        properties: {
             lbiTotalBetTai: cc.LabelIncrement, //tong tien bet Tai
             lbiTotalBetXiu: cc.LabelIncrement, //tong tien bet Xiu
            // lbTimer: cc.Label,
            //
            // animationTaiXiu: cc.Animation,
        },

        onLoad: function () {
            timeAll = 60;
            this.interval = null;

            this.nodeParentTai = this.lbiTotalBetTai.node.parent;
            this.nodeParentXiu = this.lbiTotalBetXiu.node.parent;

            cc.TaiXiuLivestreamController.getInstance().setTaiXiuLivestreamPortalView(this);
            this.lastTimeReconnect = (new Date()).getTime();

            this.isAuthorized = false;
            this.connectHubTxLivestream();
        },

        onDestroy: function () {
            timeAll = 60;
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            this.unscheduleAllCallbacks();
            cc.TaiXiuLivestreamController.getInstance().setTaiXiuLivestreamPortalView(null);
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
            if(remaining >= timeAll){
                return;
            }else timeAll = remaining;
            if (this.interval !== null) {
                clearInterval(this.interval);
            }

            var self = this;
            this.timer = remaining;
            this.isTimer = true;

            ////update timer UI
            this.updateTimer(remaining);

            this.interval = setInterval(function(){
                if (self.isTimer) {
                    self.timer -= 1;
                    timeAll = self.timer;
                    self.updateTimer(Math.round(self.timer));
                    if(self.timer <=1){
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

        updateInfo: function (livestreamsessionInfo) {
            this.startTimer(livestreamsessionInfo.Ellapsed);
			//cc.MINIController.getInstance().updateInfoTx(livestreamsessionInfo, this.currentState);
            //luu lai state hien tai
            this.currentState = livestreamsessionInfo.CurrentState;

            //set thong tin
            this.lbiTotalBetTai.tweenValueto(livestreamsessionInfo.TotalBetTai);
            this.lbiTotalBetXiu.tweenValueto(livestreamsessionInfo.TotalBetXiu);
        },


        updateTimer: function (time) {
            if (time < 1) return;
            // this.lbTimer.string = cc.Tool.getInstance().convertSecondToTime2(time);
            cc.TaiXiuLivestreamController.getInstance().updateTimerInfoView(time);
        },

        disconnectAndLogout: function () {
            if (this.LivestreamluckyDiceHub) {
                this.LivestreamluckyDiceHub.disconnect();
            }
            this.lastTimeReconnect = (new Date()).getTime();
            this.isAuthorized = false;
            timeAll = 60;
        },

        connectHubTxLivestreamAuthorize: function () {
            if (!this.isAuthorized) {
                if (this.LivestreamluckyDiceHub) {
                    this.LivestreamluckyDiceHub.disconnect();
                }

                this.lastTimeReconnect = (new Date()).getTime();
                this.isAuthorized = true;
                //cc.PopupController.getInstance().showBusy();
                var livestreamluckyDiceNegotiateCommand = new cc.LivestreamLuckyDiceNegotiateCommand;
                livestreamluckyDiceNegotiateCommand.execute(this);

                return false;
            } else {
                return true;
            }
        },

        connectHubTxLivestream: function () {
            //cc.PopupController.getInstance().showBusy();
            this.isAuthorized = false;
            var livestreamluckyDiceNegotiateCommand = new cc.LivestreamLuckyDiceNegotiateCommand;
            livestreamluckyDiceNegotiateCommand.execute(this);
        },

        reconnect: function () {
            this.lastTimeReconnect = (new Date()).getTime();
            this.LivestreamluckyDiceHub.connect(this, cc.HubName.LivestreamLuckyDiceHub, this.connectionToken, true);
            timeAll = 60;
        },

        sendRequestOnHub: function (method, data1, data2) {
            switch (method) {
                case cc.MethodHubName.ENTER_LOBBY:
                    this.LivestreamluckyDiceHub.enterLobby();
                    break;
                case cc.MethodHubName.BET:
                    this.LivestreamluckyDiceHub.bet(data1, data2);
                    break;
                case cc.MethodHubName.CORD_INFO:
                    this.LivestreamluckyDiceHub.cordInfo();
                    break;
            }
        },

        onLuckyDiceNegotiateResponse: function (response) { 
            this.connectionToken = response.ConnectionToken;
            this.LivestreamluckyDiceHub = new cc.Hub;
            this.LivestreamluckyDiceHub.connect(this, cc.HubName.LivestreamLuckyDiceHub, response.ConnectionToken);
        },

        onHubMessage: function (response) {
           

            if (response.M !== undefined && response.M.length > 0) {
                var m = (response.M)[0];   
                //console.log(m);          
                switch (m.M) {
                    //vao Phong
                    case cc.MethodHubOnName.SESSION_INFO_LIVESTREAM:
                        var data = m.A[0];
                        
                        this.updateInfo(data);
                        cc.TaiXiuLivestreamController.getInstance().updateInfoView(data);
                        cc.TaiXiuLivestreamController.getInstance().updateResultView(data);
                        cc.TaiXiuLivestreamController.getInstance().setSID(data.SessionID);
                        break;
                    //vao Phong
                    case cc.MethodHubOnName.GAME_HISTORY_LIVESTREAM:

                        cc.TaiXiuLivestreamController.getInstance().updateSessionHistory(m.A[0]);

                        //login roi -> moi goi
                        if (cc.LoginController.getInstance().getLoginState() && cc.TaiXiuLivestreamController.getInstance().getIsOpen()) {
                            this.sendRequestOnHub(cc.MethodHubName.CORD_INFO);
                        }
                        break;
                    //vao Phong
                    case cc.MethodHubOnName.BET_OF_ACCOUNT_LIVESTREAM:
                        cc.director.getScheduler().schedule(function () {
                            cc.TaiXiuLivestreamController.getInstance().updateBetInfoView(m.A[0]);
                        }, this, 1, 0, 0.2, false);
                        break;

                    //su kien trieu hoi PH
                    case cc.MethodHubOnName.CORD_ACCOUNT_INFO_LIVESTREAM:
                        var data = m.A[0];
                        if (data.IsEventDragon) {
                            cc.TaiXiuLivestreamController.getInstance().activeEventPH(true);
                            cc.TaiXiuLivestreamController.getInstance().setUserCord(data.CordWin, data.CordLost);
                        } else {
                            cc.TaiXiuLivestreamController.getInstance().activeEventPH(false);
                        }
                        break;
                    //su kien trieu hoi PH
                    case cc.MethodHubOnName.EVENT_WINNER_RESULT_LIVESTREAM:
                        //set giai thuong + user goi duoc rong
                        cc.TaiXiuLivestreamController.getInstance().setEventWinnerResult(m.A[0]);
                        //Khoi tao hieu ung khi dang o portal hoặc đang bật TX
                        if (cc.LobbyController.getInstance().checkLobbyActive() || cc.TaiXiuLivestreamController.getInstance().getIsOpen()) {
                            cc.LobbyController.getInstance().createFxSummonDragon();
                        }


                        //login roi -> moi goi
                        if (cc.LoginController.getInstance().getLoginState()) {
                            this.sendRequestOnHub(cc.MethodHubName.CORD_INFO);
                        }

                        //Khoi tao hieu ung khi đang bật TX
                        // if (cc.TaiXiuLivestreamController.getInstance().getIsOpen()) {
                        //     cc.LobbyController.getInstance().createFxSummonDragon();
                        // }

                        break;
                    //su kien trieu hoi PH
                    case cc.MethodHubOnName.SUMMON_DRAGON_AWARD_LIVESTREAM:
                        //user nam trong TOP dây Win/Lose -> duoc thuong -> lay lai thong tin balance
                        // {
                        //     "AccountID": 100000012,
                        //     "PrizeValue": 1756234,
                        //     "Balance": 243553877
                        // }

                        cc.LobbyController.getInstance().refreshAccountInfo();
                        break;

                    //bet thanh cong
                    case cc.MethodHubOnName.BET_SUCCESS_LIVESTREAM:
                        var data = m.A[0];
                        cc.TaiXiuLivestreamController.getInstance().updateBetInfoView(data);
                        //update lai balance
                        cc.BalanceController.getInstance().updateRealBalance(m.A[1]);
                        cc.BalanceController.getInstance().updateBalance(m.A[1]);

                        cc.DDNA.getInstance().betSummary(cc.DDNAGame.TAI_XIU_LIVESTREAM, data.BetValue, cc.TaiXiuLivestreamController.getInstance().getSID());
                        break;
                    case cc.MethodHubOnName.WIN_RESULT_LIVESTREAM:
                        var data = m.A[0];
                        var waitTime = TaiXiuLivestreamConfig.TIME_WAIT_DICE_ANIMATION;
                        //dang bat che do Nan
                        if (cc.TaiXiuLivestreamController.getInstance().getIsNan()) {
                            //thoi gian doi show ket qua win lau hon
                            waitTime = TaiXiuLivestreamConfig.TIME_WAIT_SHOW_WIN_RESULT_NAN;
                        }

                        cc.director.getScheduler().schedule(function () {
                            //play fx win
                            cc.TaiXiuLivestreamController.getInstance().playEffectWin(data.Award);
                            //update lai balance
                            cc.BalanceController.getInstance().updateRealBalance(data.Balance);
                            cc.BalanceController.getInstance().updateBalance(data.Balance);
                        }, this, 0, 0, waitTime, false);

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
                        cc.PopupController.getInstance().showPopupOtherDevice( m.A[1], cc.GameId.TAI_XIU_LIVESTREAM);
                        break;
                }
            }  else {
                //PING PONG
                if (response.I) {
                    this.LivestreamluckyDiceHub.pingPongResponse(response.I);
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
            cc.TaiXiuLivestreamController.getInstance().reset();
            //reconnect
            if ((new Date()).getTime() - this.lastTimeReconnect >= netConfig.RECONNECT_TIME * 1000) {
                this.reconnect();
            } else {
                cc.director.getScheduler().schedule(this.reconnect, this, netConfig.RECONNECT_TIME, 0, 0, false);
            }
        },

        onHubError: function () {

        },
    });
}).call(this);
