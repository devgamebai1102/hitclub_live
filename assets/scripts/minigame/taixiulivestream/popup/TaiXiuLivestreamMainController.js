/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var TaiXiuLivestreamMainController;

    TaiXiuLivestreamMainController = (function () {
        var instance;

        function TaiXiuLivestreamMainController() {

        }

        instance = void 0;

        TaiXiuLivestreamMainController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TaiXiuLivestreamMainController.prototype.setTaiXiuLivestreamMainView = function (TaiXiuLivestreamMainView) {
            return this.TaiXiuLivestreamMainView = TaiXiuLivestreamMainView;
        };

        TaiXiuLivestreamMainController.prototype.createGraphView = function () {
            return this.TaiXiuLivestreamMainView.createGraphView();
        };

        TaiXiuLivestreamMainController.prototype.destroyGraphView = function () {
            return this.TaiXiuLivestreamMainView.destroyGraphView();
        };

        TaiXiuLivestreamMainController.prototype.createSessionDetailView = function () {
            return this.TaiXiuLivestreamMainView.createSessionDetailView();
        };

        TaiXiuLivestreamMainController.prototype.destroySessionDetailView = function () {
            return this.TaiXiuLivestreamMainView.destroySessionDetailView();
        };

        TaiXiuLivestreamMainController.prototype.createTopView = function () {
            return this.TaiXiuLivestreamMainView.createTopView();
        };

        TaiXiuLivestreamMainController.prototype.destroyTopView = function () {
            return this.TaiXiuLivestreamMainView.destroyTopView();
        };

        TaiXiuLivestreamMainController.prototype.createHelpView = function () {
            return this.TaiXiuLivestreamMainView.createHelpView();
        };

        TaiXiuLivestreamMainController.prototype.destroyHelpView = function () {
            return this.TaiXiuLivestreamMainView.destroyHelpView();
        };
		
        TaiXiuLivestreamMainController.prototype.createRuleView = function () {
            return this.TaiXiuLivestreamMainView.createRuleView();
        };

        TaiXiuLivestreamMainController.prototype.destroyRuleView = function () {
            return this.TaiXiuLivestreamMainView.destroyRuleView();
        };

        TaiXiuLivestreamMainController.prototype.createHistoryView = function () {
            return this.TaiXiuLivestreamMainView.createHistoryView();
        };

        TaiXiuLivestreamMainController.prototype.destroyHistoryView = function () {
            return this.TaiXiuLivestreamMainView.destroyHistoryView();
        };
		
        TaiXiuLivestreamMainController.prototype.createJackpotHistoryView = function () {
            return this.TaiXiuLivestreamMainView.createJackpotHistoryView();
        };

        TaiXiuLivestreamMainController.prototype.destroyJackpotHistoryView = function () {
            return this.TaiXiuLivestreamMainView.destroyJackpotHistoryView();
        };
        return TaiXiuLivestreamMainController;

    })();

    cc.TaiXiuLivestreamMainController = TaiXiuLivestreamMainController;

}).call(this);

