/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var XXLivestreamController;

    XXLivestreamController = (function () {
        var instance;

        function XXLivestreamController() {

        }

        instance = void 0;

        XXLivestreamController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };


        //SET VIEW
        XXLivestreamController.prototype.setXXLivestream = function (XXLivestream) {
            return this.XXLivestream = XXLivestream;
        };

        XXLivestreamController.prototype.setXXLivestreamSoiCauView = function (XXLivestreamSoiCauView) {
            return this.XXLivestreamSoiCauView = XXLivestreamSoiCauView;
        };

        XXLivestreamController.prototype.setXXAssets = function (xxAssets) {
            return this.xxAssets = xxAssets;
        };

        XXLivestreamController.prototype.setXXChipPool = function (xxChipPool) {
            return this.xxChipPool = xxChipPool;
        };


        XXLivestreamController.prototype.setXXLivestreamInfoView = function (XXLivestreamInfoView) {
            return this.XXLivestreamInfoView = XXLivestreamInfoView;
        };

        XXLivestreamController.prototype.setXXLivestreamInputView = function (XXLivestreamInputView) {
            return this.XXLivestreamInputView = XXLivestreamInputView;
        };

        XXLivestreamController.prototype.setXXLivestreamResultView = function (XXLivestreamResultView) {
            return this.XXLivestreamResultView = XXLivestreamResultView;
        };

        //PROPERTY
        XXLivestreamController.prototype.setIsNan = function (isNan) {
            return this.isNan = isNan;
        };

        XXLivestreamController.prototype.getIsNan = function () {
            return this.isNan;
        };

        XXLivestreamController.prototype.setLastBetData = function (lastBetData) {
            return this.lastBetData = lastBetData;
        };

        XXLivestreamController.prototype.getLastBetData = function () {
            return this.lastBetData;
        };

        XXLivestreamController.prototype.setSID = function (sID) {
            return this.sID = sID;
        };

        XXLivestreamController.prototype.getSID = function () {
            return this.sID;
        };


        //ASSETS
        XXLivestreamController.prototype.getAssets = function () {
            return this.xxAssets;
        };

        XXLivestreamController.prototype.getWinFont = function () {
            return this.xxAssets.getWinFont();
        };

        XXLivestreamController.prototype.getLoseFont = function () {
            return this.xxAssets.getLoseFont();
        };

        XXLivestreamController.prototype.getChips = function () {
            return this.xxAssets.getChips();
        };

        XXLivestreamController.prototype.getNans = function () {
            return this.xxAssets.getNans();
        };

        XXLivestreamController.prototype.getAvatarDef = function () {
            return this.xxAssets.getAvatarDef();
        };

        //XX VIEW
        XXLivestreamController.prototype.sendRequestOnHub = function (method, data1, data2) {
            if (this.XXLivestream)
                return this.XXLivestream.sendRequestOnHub(method, data1, data2);
        };

        //INFO
        //HubOn joinGame
        XXLivestreamController.prototype.joinGame = function (info) {
            return this.XXLivestreamInfoView.joinGame(info);
        };
        //HubOn playerJoin
        XXLivestreamController.prototype.playerJoin = function (info) {
            return this.XXLivestreamInfoView.playerJoin(info);
        };

        //HubOn playerLeave
        XXLivestreamController.prototype.playerLeave = function (info) {
            this.XXLivestreamInfoView.playerLeave(info);
            this.XXLivestream.playerLeave(info);
        };

        //HubOn updateConnectionStatus
        XXLivestreamController.prototype.updateConnectionStatus = function (info) {
            return this.XXLivestreamInfoView.updateConnectionStatus(info);
        };

        XXLivestreamController.prototype.updatePlayerStatus = function (status) {
            return this.XXLivestreamInfoView.updatePlayerStatus(status);
        };
        //Cap nhat thong tin nguoi choi hien tai
        XXLivestreamController.prototype.updateInfoCurrPlayer = function (data) {
            return this.XXLivestreamInfoView.updateInfoCurrPlayer(data);
        };


        XXLivestreamController.prototype.updateChip = function (accID, chip) {
            //neu la owner thi update ca realBal
            if (accID === cc.LoginController.getInstance().getUserId()) {
                cc.BalanceController.getInstance().updateRealBalance(chip);
            }
            return this.XXLivestreamInfoView.updateChip(chip);
        };
        XXLivestreamController.prototype.updateTotalBetUser = function (chip) { 
            return this.XXLivestreamInfoView.updateTotalBet(chip);
        };

        XXLivestreamController.prototype.getPositions = function () {
            //return this.XXLivestreamInfoView.getPositions();
        };

        XXLivestreamController.prototype.updateSessionId = function (sID) {
            return this.XXLivestreamInfoView.updateSessionId(sID);
        };

        XXLivestreamController.prototype.updateInfo = function (info, state, time) {
            return this.XXLivestreamInfoView.updateInfo(info, state, time);
        };

        XXLivestreamController.prototype.getIndexUIBetByAccID = function (accID) {
            //return this.XXLivestreamInfoView.getIndexUIBetByAccID(accID);
        };

        XXLivestreamController.prototype.getIndexUIBetByPosition = function (position) {
            return this.XXLivestreamInfoView.getIndexUIBetByPosition(position);
        };

        XXLivestreamController.prototype.getTime = function () {
            return this.XXLivestreamInfoView.getTime();
        };

        XXLivestreamController.prototype.playerShowBubbleChat = function (message) {
            return this.XXLivestreamInfoView.playerShowBubbleChat(message);
        };

        //player vao phong
        XXLivestreamController.prototype.registerPlayer = function (playerIndex) {
            return this.XXLivestreamInfoView.registerPlayer(playerIndex);
        };

        //player thoat khoi phong
        XXLivestreamController.prototype.unRegisterPlayer = function (playerIndex) {
            return this.XXLivestreamInfoView.unRegisterPlayer(playerIndex);
        };

        //reset UI ket qua (win/lose) sau moi Phien cua tat ca player
        XXLivestreamController.prototype.resetPlayersResultUI = function () {
            return this.XXLivestreamInfoView.resetPlayersResultUI();
        };
        XXLivestreamController.prototype.totalUserWin = function (amout) {
            return this.XXLivestreamInfoView.totalUserWin(amout);
        };


        //set ket qua cua player
        XXLivestreamController.prototype.playerResultUI = function (playerIndex, isWin, amount) {
            return this.XXLivestreamInfoView.playerResultUI(playerIndex, isWin, amount);
        };

        // HubOn - summaryPlayer
        XXLivestreamController.prototype.summaryPlayer = function (total) {
            return this.XXLivestreamInfoView.summaryPlayer(total);
        };
        // HubOn - vipPlayer
        XXLivestreamController.prototype.vipPlayer = function (dataPlayers) {
            //return this.XXLivestreamInfoView.vipPlayer(dataPlayers);
        };
        // HubOn - winResultVip
        XXLivestreamController.prototype.winResultVip = function (dataPlayers) {
            return this.XXLivestreamInfoView.winResultVip(dataPlayers);
        };

        // HubOn - winResult
        XXLivestreamController.prototype.winResult = function (dataPlayers) {
            return this.XXLivestreamInfoView.winResult(dataPlayers);
        };

        XXLivestreamController.prototype.updateTimer = function (time) {
            return this.XXLivestreamInfoView.updateTimer(time);
        };


        //INPUT
        //HubOn playerBet
        XXLivestreamController.prototype.playerBet = function (info) {
            return this.XXLivestreamInputView.playerBet(info);
        };

        XXLivestreamController.prototype.updateInput = function (state) {
            return this.XXLivestreamInputView.updateInput(state);
        };

        XXLivestreamController.prototype.getGateChips = function () {
            return this.XXLivestreamInputView.getGateChips();
        };


        XXLivestreamController.prototype.showLastInput = function (info) {
            return this.XXLivestreamInputView.showLastInput(info);
        };

        XXLivestreamController.prototype.getPlayerBets = function () {
            return this.XXLivestreamInputView.getPlayerBets();
        };

        XXLivestreamController.prototype.playFxDealerPay = function (chipBet) {
            return this.XXLivestreamInputView.playFxDealerPay(chipBet);
        };

        XXLivestreamController.prototype.initGateChip = function () {
            return this.XXLivestreamInputView.initGateChip();
        };


        XXLivestreamController.prototype.playFxPay = function (chipBet) {
            return this.XXLivestreamInputView.playFxPay(chipBet);
        };

        XXLivestreamController.prototype.playFxLost = function (playFxLost) {
            return this.XXLivestreamInputView.playFxLost(playFxLost);
        };

        XXLivestreamController.prototype.playFxUserBet = function (playerId, indexBet) {
            return this.XXLivestreamInputView.playFxUserBet(playerId, indexBet);
        };

        XXLivestreamController.prototype.resetInput = function () {
            return this.XXLivestreamInputView.resetInput();
        };

        XXLivestreamController.prototype.activeAllButtonBet = function (enable) {
            return this.XXLivestreamInputView.activeAllButtonBet(enable);
        };

        XXLivestreamController.prototype.clearAllChip = function () {
            return this.XXLivestreamInputView.clearAllChip();
        };
        XXLivestreamController.prototype.betValueClicked = function (data) {
            return this.XXLivestreamInputView.betValueClicked(null,data);
        };

        //RESULT
        XXLivestreamController.prototype.updateResult = function (players, result, originResult, state, openNow,data) {
            return this.XXLivestreamResultView.updateResult(players, result, originResult, state, openNow,data);
        };

        //SOI CAU
        XXLivestreamController.prototype.draw = function (list) {
            return this.XXLivestreamSoiCauView.onTabChanged(list);
        };

        XXLivestreamController.prototype.resetDraw = function () {
            return this.XXLivestreamSoiCauView.resetDraw();
        };

        //CHIP POOL
        XXLivestreamController.prototype.createChip = function () {
            return this.xxChipPool.createChip();
        };

        XXLivestreamController.prototype.putToPool = function (node) {
            return this.xxChipPool.putToPool(node);
        };

        XXLivestreamController.prototype.clearPool = function () {
            return this.xxChipPool.clearPool();
        };

        XXLivestreamController.prototype.updatePositionPlayerUI = function (positions) {
            return this.positionsUI = positions;
        };

        XXLivestreamController.prototype.getPositionsUI = function () {
            return this.positionsUI;
        };

        XXLivestreamController.prototype.initLogBet = function () {
            return this.logBet = [];
        };
        XXLivestreamController.prototype.setLogBet = function (betData) {
            return this.logBet.push(betData);
        };
        XXLivestreamController.prototype.getLogBet = function () {
            return this.logBet;
        };
        //Video Livestream
        XXLivestreamController.prototype.setXocDiaLivestreamVideoView = function (livestreamvideoView) {
            this.XocDiaLivestreamVideoView = livestreamvideoView;
        };
        XXLivestreamController.prototype.hideOrshowVideo = function (isShowVideo) {
            if (this.XocDiaLivestreamVideoView)
            return this.XocDiaLivestreamVideoView.hideOrshowVideo(isShowVideo);
        };
        return XXLivestreamController;

    })();

    cc.XXLivestreamController = XXLivestreamController;

}).call(this);

