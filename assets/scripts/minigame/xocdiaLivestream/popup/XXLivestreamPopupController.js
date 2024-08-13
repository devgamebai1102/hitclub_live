
(function () {
    var XXLivestreamPopupController;

    XXLivestreamPopupController = (function () {
        var instance;

        function XXLivestreamPopupController() {
        }

        instance = void 0;

        XXLivestreamPopupController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        XXLivestreamPopupController.prototype.setXXLivestreamPopupView = function (XXLivestreamPopupView) {
            return this.XXLivestreamPopupView = XXLivestreamPopupView;
        };

        XXLivestreamPopupController.prototype.createSessionDetailView = function () {
            return this.XXLivestreamPopupView.createSessionDetailView();
        };

        XXLivestreamPopupController.prototype.destroySessionDetailView = function () {
            return this.XXLivestreamPopupView.destroySessionDetailView();
        };

        XXLivestreamPopupController.prototype.createTopView = function () {
            return this.XXLivestreamPopupView.createTopView();
        };

        XXLivestreamPopupController.prototype.destroyTopView = function () {
            return this.XXLivestreamPopupView.destroyTopView();
        };
        XXLivestreamPopupController.prototype.createSettingView = function () {
            return this.XXLivestreamPopupView.createSettingView();
        };

        XXLivestreamPopupController.prototype.destroySettingView = function () {
            return this.XXLivestreamPopupView.destroySettingView();
        };

        XXLivestreamPopupController.prototype.createHelpView = function () {            
            return this.XXLivestreamPopupView.createHelpView();
        };

        XXLivestreamPopupController.prototype.destroyHelpView = function () {
            return this.XXLivestreamPopupView.destroyHelpView();
        };

        XXLivestreamPopupController.prototype.createHistoryView = function () {
            return this.XXLivestreamPopupView.createHistoryView();
        };

        XXLivestreamPopupController.prototype.destroyHistoryView = function () {
            return this.XXLivestreamPopupView.destroyHistoryView();
        };

        XXLivestreamPopupController.prototype.createGroupUserView = function () {
            return this.XXLivestreamPopupView.createGroupUserView();
        };
        XXLivestreamPopupController.prototype.destroyGroupUserView = function () {
            return this.XXLivestreamPopupView.destroyGroupUserView();
        };

        //property
        XXLivestreamPopupController.prototype.setDetailIndex = function (detailIndex) {
            return this.detailIndex = detailIndex;
        };

        XXLivestreamPopupController.prototype.getDetailIndex = function () {
            return this.detailIndex;
        };


        XXLivestreamPopupController.prototype.setGameHistory = function (gameHistory) {
            return this.gameHistory = gameHistory;
        };

        XXLivestreamPopupController.prototype.getGameHistory = function () {
            return this.gameHistory;
        };

        return XXLivestreamPopupController;

    })();

    cc.XXLivestreamPopupController = XXLivestreamPopupController;

}).call(this);
