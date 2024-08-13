/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var TaiXiuLivestreamController;

    TaiXiuLivestreamController = (function () {
        var instance;

        function TaiXiuLivestreamController() {

        }

        instance = void 0;

        TaiXiuLivestreamController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };
        
        TaiXiuLivestreamController.prototype.setTaiXiuLivestreamPortalView = function (TaiXiuLivestreamPortalView) {
            return this.TaiXiuLivestreamPortalView = TaiXiuLivestreamPortalView;
        };
		
        TaiXiuLivestreamController.prototype.setTaiXiuLiveStreamView = function (TaiXiuLiveStreamView) {
            return this.TaiXiuLiveStreamView = TaiXiuLiveStreamView;
        };

        TaiXiuLivestreamController.prototype.setTaiXiuLivestreamInfoView = function (TaiXiuLivestreamInfoView) {
            return this.TaiXiuLivestreamInfoView = TaiXiuLivestreamInfoView;
        };

        TaiXiuLivestreamController.prototype.setTaiXiuLivestreamResultView = function (TaiXiuLivestreamResultView) {
            return this.TaiXiuLivestreamResultView = TaiXiuLivestreamResultView;
        };

        TaiXiuLivestreamController.prototype.setTaiXiuLivestreamResultEffectView = function (TaiXiuLivestreamResultEffectView) {
            return this.TaiXiuLivestreamResultEffectView = TaiXiuLivestreamResultEffectView;
        };

        TaiXiuLivestreamController.prototype.setTaiXiuLivestreamInputBetView = function (taiXiuLivestreamInputBetView) {
            return this.taiXiuLivestreamInputBetView = taiXiuLivestreamInputBetView;
        };

        TaiXiuLivestreamController.prototype.setTaiXiuLivestreamButtonView = function (TaiXiuLivestreamButtonView) {
            return this.TaiXiuLivestreamButtonView = TaiXiuLivestreamButtonView;
        };

        TaiXiuLivestreamController.prototype.setTaiXiuLivestreamBetView = function (TaiXiuLivestreamBetView) {
            return this.TaiXiuLivestreamBetView = TaiXiuLivestreamBetView;
        };

        TaiXiuLivestreamController.prototype.setTaiXiuLivestreamSessionHistoryView = function (TaiXiuLivestreamSessionHistoryView) {
            return this.TaiXiuLivestreamSessionHistoryView = TaiXiuLivestreamSessionHistoryView;
        };

        TaiXiuLivestreamController.prototype.setTaiXiuLivestreamEventView = function (TaiXiuLivestreamEventView) {
            return this.TaiXiuLivestreamEventView = TaiXiuLivestreamEventView;
        };

        TaiXiuLivestreamController.prototype.setIsOpen = function (isOpen) {
            return this.isOpen = isOpen;
        };

        TaiXiuLivestreamController.prototype.getIsOpen = function () {
            return this.isOpen;
        };

        TaiXiuLivestreamController.prototype.setSID = function (sID) {
            return this.sID = sID;
        };

        TaiXiuLivestreamController.prototype.getSID = function () {
            return this.sID;
        };

        //set ket qua Summon Dragon Event
        TaiXiuLivestreamController.prototype.setEventWinnerResult = function (livestreameventWinnerResult) {
            return this.livestreameventWinnerResult = livestreameventWinnerResult;
        };

        TaiXiuLivestreamController.prototype.getEventWinnerResult = function () {
            return this.livestreameventWinnerResult;
        };

        TaiXiuLivestreamController.prototype.openEndDiaNanView = function () {
          if (this.TaiXiuLivestreamResultView)
           return this.TaiXiuLivestreamResultView.openEndDiaNan();
        };

        //RESET
        TaiXiuLivestreamController.prototype.reset = function () {
            if (this.TaiXiuLivestreamPortalView)
                this.TaiXiuLivestreamPortalView.reset();

            if (this.TaiXiuLivestreamInfoView)
                this.TaiXiuLivestreamInfoView.reset();

            if (this.TaiXiuLivestreamResultView)
                this.TaiXiuLivestreamResultView.reset();

            if (this.TaiXiuLivestreamBetView)
                this.TaiXiuLivestreamBetView.reset();

            if (this.taiXiuLivestreamlivestreamInputBetView)
                this.taiXiuLivestreamInputBetView.reset();

            if (this.TaiXiuLivestreamResultEffectView)
                this.TaiXiuLivestreamResultEffectView.reset();

            if (this.TaiXiuLivestreamVideoView)
                this.TaiXiuLivestreamVideoView.reset();
        };

        TaiXiuLivestreamController.prototype.resetBetAndResultInfo = function () {
            if (this.TaiXiuLivestreamResultEffectView)
                this.TaiXiuLivestreamResultEffectView.reset();

            if (this.TaiXiuLivestreamResultView)
                this.TaiXiuLivestreamResultView.reset();

            if (this.TaiXiuLivestreamBetView)
                this.TaiXiuLivestreamBetView.reset();

            if (this.taiXiuLivestreamInputBetView)
                this.taiXiuLivestreamInputBetView.reset();
        };

        TaiXiuLivestreamController.prototype.resetBetInfo = function () {
            if (this.TaiXiuLivestreamBetView)
                this.TaiXiuLivestreamBetView.reset();

            if (this.taiXiuLivestreamInputBetView)
                this.taiXiuLivestreamInputBetView.reset();
        };
        //EVENT VIEW
        TaiXiuLivestreamController.prototype.clickUIEventPH = function () {
            if (this.TaiXiuLivestreamEventView)
                return this.TaiXiuLivestreamEventView.clickUIEventPH();
        };

        TaiXiuLivestreamController.prototype.activeEventPH = function (enable) {
            if (this.TaiXiuLivestreamEventView)
                return this.TaiXiuLivestreamEventView.activeEventPH(enable);
        };

        TaiXiuLivestreamController.prototype.setUserCord = function (cordWin, cordLost) {
            if (this.TaiXiuLivestreamEventView)
                return this.TaiXiuLivestreamEventView.setUserCord(cordWin, cordLost);
        };


        //PORTAL VIEW
        //ket noi luc dau chua login
        TaiXiuLivestreamController.prototype.connectHubTxLivestream = function () {
            if (this.TaiXiuLivestreamPortalView)
                return this.TaiXiuLivestreamPortalView.connectHubTxLivestream();
        };

        //ket noi sau khi da Login
        TaiXiuLivestreamController.prototype.connectHubTxLivestreamAuthorize = function () {
            if (this.TaiXiuLivestreamPortalView)
                return this.TaiXiuLivestreamPortalView.connectHubTxLivestreamAuthorize();
        };

        TaiXiuLivestreamController.prototype.disconnectAndLogout = function () {
            if (this.TaiXiuLivestreamPortalView)
                return this.TaiXiuLivestreamPortalView.disconnectAndLogout();
        };

        TaiXiuLivestreamController.prototype.sendRequestOnHub = function (method, data1, data2) {
            if (this.TaiXiuLivestreamPortalView)
                return this.TaiXiuLivestreamPortalView.sendRequestOnHub(method, data1, data2);
        };

        //INFO VIEW
        TaiXiuLivestreamController.prototype.updateInfoView = function (livestreamsessionInfo) {
            if (this.TaiXiuLivestreamInfoView)
                return this.TaiXiuLivestreamInfoView.updateInfo(livestreamsessionInfo);
        };

        TaiXiuLivestreamController.prototype.updateTimerInfoView = function (time) {
            if (this.TaiXiuLivestreamInfoView)
                return this.TaiXiuLivestreamInfoView.updateTimerInfo(time);
        };

        //SESSION HISTORY VIEW
        TaiXiuLivestreamController.prototype.updateSessionHistory = function (livestreamgameHistory) {
            if (this.TaiXiuLivestreamSessionHistoryView)
            return this.TaiXiuLivestreamSessionHistoryView.updateSessionHistory(livestreamgameHistory);
        };

        //BUTTON VIEW
        TaiXiuLivestreamController.prototype.lightOnEvent = function () {
            if (this.TaiXiuLivestreamButtonView)
            return this.TaiXiuLivestreamButtonView.lightOnEvent();
        };

        //RESULT EFFECT VIEW
        TaiXiuLivestreamController.prototype.playEffectWin = function (amount) {
            if (this.TaiXiuLivestreamResultEffectView)
            return this.TaiXiuLivestreamResultEffectView.playEffectWin(amount);
        };

        //BET VIEW
        TaiXiuLivestreamController.prototype.updateBetInfoView = function (betInfo) {
            if (this.TaiXiuLivestreamBetView)
                return this.TaiXiuLivestreamBetView.updateBetInfo(betInfo);
        };

        TaiXiuLivestreamController.prototype.getBetSide = function () {
            if (this.TaiXiuLivestreamBetView)
                return this.TaiXiuLivestreamBetView.getBetSide();
        };

        //TAI XIU VIEW
        TaiXiuLivestreamController.prototype.resetPositionTX = function () {
            if (this.TaiXiuLiveStreamView)
                return this.TaiXiuLiveStreamView.resetPositionTX();
        };

        //RESULT VIEW
        TaiXiuLivestreamController.prototype.getIsBowl = function () {
            if (this.TaiXiuLivestreamResultView)
                return this.TaiXiuLivestreamResultView.getIsBowl();
        };
		
        TaiXiuLivestreamController.prototype.getIsDia = function () {
            if (this.TaiXiuLivestreamResultView)
                return this.TaiXiuLivestreamResultView.getIsDia();
        };
		
        TaiXiuLivestreamController.prototype.playAnimation = function (livestreamsessionInfo) {
          //  if (this.TaiXiuLivestreamResultView)
          //  return this.TaiXiuLivestreamResultView.playAnimation(livestreamsessionInfo);
        };

        TaiXiuLivestreamController.prototype.playAnimFinish = function () {
            if (this.TaiXiuLivestreamResultView)
            return this.TaiXiuLivestreamResultView.playAnimFinish();
        };
		
        TaiXiuLivestreamController.prototype.playAnimationAndSetResult = function (livestreamsessionInfo) {
            if (this.TaiXiuLivestreamResultView)
            return this.TaiXiuLivestreamResultView.playAnimationAndSetResult(livestreamsessionInfo);
        };
		
        TaiXiuLivestreamController.prototype.diceAnimFinish = function () {
            if (this.TaiXiuLivestreamResultView)
            return this.TaiXiuLivestreamResultView.diceAnimFinish();
        };

        TaiXiuLivestreamController.prototype.updateResultView = function (livestreamsessionInfo) {
            if (this.TaiXiuLivestreamResultView)
                return this.TaiXiuLivestreamResultView.updateResult(livestreamsessionInfo);
        };
        //Video Livestream
        TaiXiuLivestreamController.prototype.setTaiXiuLivestreamVideoView = function (livestreamvideoView) {
            this.TaiXiuLivestreamVideoView = livestreamvideoView;
        };
        TaiXiuLivestreamController.prototype.hideOrshowVideo = function (isShowVideo) {
            if (this.TaiXiuLivestreamVideoView)
            return this.TaiXiuLivestreamVideoView.hideOrshowVideo(isShowVideo);
        };

        //PROPERTY
        TaiXiuLivestreamController.prototype.setIsNan = function (isNan) {
            return this.isNan = isNan;
        };

        TaiXiuLivestreamController.prototype.getIsNan = function () {
            return this.isNan;
        };

        TaiXiuLivestreamController.prototype.getSessionId = function () {
            return this.sessionId;
        };

        TaiXiuLivestreamController.prototype.setDetailIndex= function (detailIndex) {
            return this.detailIndex = detailIndex;
        };

        TaiXiuLivestreamController.prototype.getDetailIndex = function () {
            return this.detailIndex;
        };

        TaiXiuLivestreamController.prototype.setGameHistory = function (livestreamgameHistory) {
            return this.livestreamgameHistory = livestreamgameHistory;
        };

        TaiXiuLivestreamController.prototype.getGameHistory = function () {
            return this.livestreamgameHistory;
        };
        TaiXiuLivestreamController.prototype.clickgame = function () {
            return this.TaiXiuLiveStreamView.clickgame();
        };

        return TaiXiuLivestreamController;

    })();

    cc.TaiXiuLivestreamController = TaiXiuLivestreamController;

}).call(this);

