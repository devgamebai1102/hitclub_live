/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
  var TaiXiuSicboController;

  TaiXiuSicboController = (function () {
    var instance;

    function TaiXiuSicboController() {}

    instance = void 0;

    TaiXiuSicboController.getInstance = function () {
      if (instance === void 0) {
        instance = this;
      }
      return instance.prototype;
    };

    TaiXiuSicboController.prototype.setTaiXiuSicboPortalView = function (
      taiXiuSicboPortalView
    ) {
      return (this.taiXiuSicboPortalView = taiXiuSicboPortalView);
    };

    TaiXiuSicboController.prototype.setTaiXiuSicboView = function (
      taiXiuSicboView
    ) {
      return (this.taiXiuSicboView = taiXiuSicboView);
    };

    TaiXiuSicboController.prototype.setTaiXiuSicboInfoView = function (
      taiXiuSicboInfoView
    ) {
      return (this.taiXiuSicboInfoView = taiXiuSicboInfoView);
    };

    TaiXiuSicboController.prototype.setTaiXiuSicboResultView = function (
      taiXiuSicboResultView
    ) {
      return (this.taiXiuSicboResultView = taiXiuSicboResultView);
    };

    TaiXiuSicboController.prototype.getTaiXiuSicboResultView = function () {
      return this.taiXiuSicboResultView;
    };

    TaiXiuSicboController.prototype.getTaiXiuSicboInputBetView = function () {
      return this.taiXiuSicboInputBetView;
    };

    TaiXiuSicboController.prototype.setTaiXiuSicboResultEffectView = function (
      taiXiuSicboResultEffectView
    ) {
      return (this.taiXiuSicboResultEffectView = taiXiuSicboResultEffectView);
    };

    TaiXiuSicboController.prototype.setTaiXiuSicboInputBetView = function (
      taiXiuSicboInputBetView
    ) {
      return (this.taiXiuSicboInputBetView = taiXiuSicboInputBetView);
    };

    TaiXiuSicboController.prototype.setTaiXiuSicboButtonView = function (
      taiXiuSicboButtonView
    ) {
      return (this.taiXiuSicboButtonView = taiXiuSicboButtonView);
    };

    TaiXiuSicboController.prototype.setTaiXiuSicboBetView = function (
      taiXiuSicboBetView
    ) {
      return (this.taiXiuSicboBetView = taiXiuSicboBetView);
    };

    TaiXiuSicboController.prototype.setTaiXiuSicboSessionHistoryView =
      function (taiXiuSicboSessionHistoryView) {
        return (this.taiXiuSicboSessionHistoryView =
          taiXiuSicboSessionHistoryView);
      };

    TaiXiuSicboController.prototype.setTaiXiuSicboEventView = function (
      taiXiuSicboEventView
    ) {
      return (this.taiXiuSicboEventView = taiXiuSicboEventView);
    };

    TaiXiuSicboController.prototype.setIsOpen = function (isOpen) {
      return (this.isOpen = isOpen);
    };

    TaiXiuSicboController.prototype.getIsOpen = function () {
      return this.isOpen;
    };

    TaiXiuSicboController.prototype.setSID = function (sID) {
      return (this.sID = sID);
    };

    TaiXiuSicboController.prototype.getSID = function () {
      return this.sID;
    };

    //set ket qua Summon Dragon Event
    TaiXiuSicboController.prototype.setEventWinnerResult = function (
      sieutoceventWinnerResult
    ) {
      return (this.sieutoceventWinnerResult = sieutoceventWinnerResult);
    };

    TaiXiuSicboController.prototype.getEventWinnerResult = function () {
      return this.sieutoceventWinnerResult;
    };

    TaiXiuSicboController.prototype.openEndDiaNanView = function () {
      if (this.taiXiuSicboResultView)
        return this.taiXiuSicboResultView.openEndDiaNan();
    };

    //RESET
    TaiXiuSicboController.prototype.reset = function () {
      if (this.taiXiuSicboPortalView) this.taiXiuSicboPortalView.reset();

      if (this.taiXiuSicboInfoView) this.taiXiuSicboInfoView.reset();

      if (this.taiXiuSicboResultView) this.taiXiuSicboResultView.reset();

      if (this.taiXiuSicboBetView) this.taiXiuSicboBetView.reset();

      if (this.taiXiuSicboInputBetView) this.taiXiuSicboInputBetView.reset();

      if (this.taiXiuSicboResultEffectView)
        this.taiXiuSicboResultEffectView.reset();
    };

    TaiXiuSicboController.prototype.resetBetAndResultInfo = function () {
      if (this.taiXiuSicboResultEffectView)
        this.taiXiuSicboResultEffectView.reset();

      if (this.taiXiuSicbo5ResultView) this.taiXiuSicboResultView.reset();

      if (this.taiXiuSicboBetView) this.taiXiuSicboBetView.reset();

      if (this.taiXiuSicboInputBetView) this.taiXiuSicboInputBetView.reset();
    };

    TaiXiuSicboController.prototype.resetBetInfo = function () {
      if (this.taiXiuSicboBetView) this.taiXiuSicboBetView.reset();

      if (this.taiXiuSicboInputBetView) this.taiXiuSicboInputBetView.reset();
    };
    //EVENT VIEW
    TaiXiuSicboController.prototype.clickUIEventPH = function () {
      if (this.taiXiuSicboEventView)
        return this.taiXiuSicboEventView.clickUIEventPH();
    };

    TaiXiuSicboController.prototype.activeEventPH = function (enable) {
      if (this.taiXiuSicboEventView)
        return this.taiXiuSicboEventView.activeEventPH(enable);
    };

    TaiXiuSicboController.prototype.setUserCord = function (cordWin, cordLost) {
      if (this.taiXiuSicboEventView)
        return this.taiXiuSicboEventView.setUserCord(cordWin, cordLost);
    };

    //PORTAL VIEW
    //ket noi luc dau chua login
    TaiXiuSicboController.prototype.connectHubTxSicbo = function () {
      if (this.taiXiuSicboPortalView)
        return this.taiXiuSicboPortalView.connectHubTxSicbo();
    };

    //ket noi sau khi da Login
    TaiXiuSicboController.prototype.connectHubTxSicboAuthorize = function () {
      if (this.taiXiuSicboPortalView)
        return this.taiXiuSicboPortalView.connectHubTxSicboAuthorize();
    };

    TaiXiuSicboController.prototype.disconnectAndLogout = function () {
      if (this.taiXiuSicboPortalView)
        return this.taiXiuSicboPortalView.disconnectAndLogout();
    };

    TaiXiuSicboController.prototype.sendRequestOnHub = function (
      method,
      data1,
      data2
    ) {
      if (this.taiXiuSicboPortalView)
        return this.taiXiuSicboPortalView.sendRequestOnHub(
          method,
          data1,
          data2
        );
    };

    //INFO VIEW
    TaiXiuSicboController.prototype.updateInfoView = function (
      sieutocsessionInfo
    ) {
      if (this.taiXiuSicboInfoView)
        return this.taiXiuSicboInfoView.updateInfo(sieutocsessionInfo);
    };

    TaiXiuSicboController.prototype.updateTimerInfoView = function (time) {
      if (this.taiXiuSicboInfoView)
        return this.taiXiuSicboInfoView.updateTimerInfo(time);
    };

    //SESSION HISTORY VIEW
    TaiXiuSicboController.prototype.updateSessionHistory = function (
      sieutocgameHistory
    ) {
      if (this.taiXiuSicboSessionHistoryView)
        return this.taiXiuSicboSessionHistoryView.updateSessionHistory(
          sieutocgameHistory
        );
    };

    //BUTTON VIEW
    TaiXiuSicboController.prototype.lightOnEvent = function () {
      if (this.taiXiuSicboButtonView)
        return this.taiXiuSicboButtonView.lightOnEvent();
    };

    //RESULT EFFECT VIEW
    TaiXiuSicboController.prototype.playEffectWin = function (amount) {
      if (this.taiXiuSicboResultEffectView)
        return this.taiXiuSicboResultEffectView.playEffectWin(amount);
    };

    //BET VIEW
    TaiXiuSicboController.prototype.updateBetInfoView = function (betInfo) {
      if (this.taiXiuSicboBetView)
        return this.taiXiuSicboBetView.updateBetInfo(betInfo);
    };

    TaiXiuSicboController.prototype.getBetSide = function () {
      if (this.taiXiuSicboBetView) return this.taiXiuSicboBetView.getBetSide();
    };

    //TAI XIU VIEW
    TaiXiuSicboController.prototype.resetPositionTX = function () {
      if (this.taiXiuSicboView) return this.taiXiuSicboView.resetPositionTX();
    };

    //RESULT VIEW
    TaiXiuSicboController.prototype.getIsBowl = function () {
      if (this.taiXiuSicboResultView)
        return this.taiXiuSicboResultView.getIsBowl();
    };

    TaiXiuSicboController.prototype.getIsDia = function () {
      if (this.taiXiuSicboResultView)
        return this.taiXiuSicboResultView.getIsDia();
    };

    TaiXiuSicboController.prototype.playAnimation = function (
      sieutocsessionInfo
    ) {
      if (this.taiXiuSicboResultView)
        return this.taiXiuSicboResultView.playAnimation(sieutocsessionInfo);
    };

    TaiXiuSicboController.prototype.playAnimFinish = function () {
      if (this.taiXiuSicboResultView)
        return this.taiXiuSicboResultView.playAnimFinish();
    };

    TaiXiuSicboController.prototype.playAnimationAndSetResult = function (
      sieutocsessionInfo
    ) {
      if (this.taiXiuSicboResultView)
        return this.taiXiuSicboResultView.playAnimationAndSetResult(
          sieutocsessionInfo
        );
    };

    TaiXiuSicboController.prototype.diceAnimFinish = function () {
      if (this.taiXiuSicboResultView)
        return this.taiXiuSicboResultView.diceAnimFinish();
    };

    TaiXiuSicboController.prototype.updateResultView = function (
      sieutocsessionInfo
    ) {
      if (this.taiXiuSicboResultView)
        return this.taiXiuSicboResultView.updateResult(sieutocsessionInfo);
    };

    //PROPERTY
    TaiXiuSicboController.prototype.setIsNan = function (isNan) {
      return (this.isNan = isNan);
    };

    TaiXiuSicboController.prototype.getIsNan = function () {
      return this.isNan;
    };

    TaiXiuSicboController.prototype.getSessionId = function () {
      return this.sessionId;
    };

    TaiXiuSicboController.prototype.setDetailIndex = function (detailIndex) {
      return (this.detailIndex = detailIndex);
    };

    TaiXiuSicboController.prototype.getDetailIndex = function () {
      return this.detailIndex;
    };

    TaiXiuSicboController.prototype.setGameHistory = function (
      sieutocgameHistory
    ) {
      return (this.sieutocgameHistory = sieutocgameHistory);
    };

    TaiXiuSicboController.prototype.getGameHistory = function () {
      return this.sieutocgameHistory;
    };
    return TaiXiuSicboController;
  })();

  cc.TaiXiuSicboController = TaiXiuSicboController;
}.call(this));
