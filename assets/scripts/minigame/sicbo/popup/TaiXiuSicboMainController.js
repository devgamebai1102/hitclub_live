/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var TaiXiuSicboMainController;

    TaiXiuSicboMainController = (function () {
        var instance;

        function TaiXiuSicboMainController() {

        }

        instance = void 0;

        TaiXiuSicboMainController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TaiXiuSicboMainController.prototype.setTaiXiuSicboMainView = function (TaiXiuSicboMainView) {
            return this.TaiXiuSicboMainView = TaiXiuSicboMainView;
        };

        TaiXiuSicboMainController.prototype.createGraphView = function () {
            return this.TaiXiuSicboMainView.createGraphView();
        };

        TaiXiuSicboMainController.prototype.destroyGraphView = function () {
            return this.TaiXiuSicboMainView.destroyGraphView();
        };

        TaiXiuSicboMainController.prototype.createSessionDetailView = function () {
            return this.TaiXiuSicboMainView.createSessionDetailView();
        };

        TaiXiuSicboMainController.prototype.destroySessionDetailView = function () {
            return this.TaiXiuSicboMainView.destroySessionDetailView();
        };

        TaiXiuSicboMainController.prototype.createTopView = function () {
            return this.TaiXiuSicboMainView.createTopView();
        };

        TaiXiuSicboMainController.prototype.destroyTopView = function () {
            return this.TaiXiuSicboMainView.destroyTopView();
        };

        TaiXiuSicboMainController.prototype.createHelpView = function () {
            return this.TaiXiuSicboMainView.createHelpView();
        };

        TaiXiuSicboMainController.prototype.destroyHelpView = function () {
            return this.TaiXiuSicboMainView.destroyHelpView();
        };
		
        TaiXiuSicboMainController.prototype.createRuleView = function () {
            return this.TaiXiuSicboMainView.createRuleView();
        };

        TaiXiuSicboMainController.prototype.destroyRuleView = function () {
            return this.TaiXiuSicboMainView.destroyRuleView();
        };

        TaiXiuSicboMainController.prototype.createHistoryView = function () {
            return this.TaiXiuSicboMainView.createHistoryView();
        };

        TaiXiuSicboMainController.prototype.destroyHistoryView = function () {
            return this.TaiXiuSicboMainView.destroyHistoryView();
        };
		
        TaiXiuSicboMainController.prototype.createJackpotHistoryView = function () {
            return this.TaiXiuSicboMainView.createJackpotHistoryView();
        };

        TaiXiuSicboMainController.prototype.destroyJackpotHistoryView = function () {
            return this.TaiXiuSicboMainView.destroyJackpotHistoryView();
        };
        return TaiXiuSicboMainController;

    })();

    cc.TaiXiuSicboMainController = TaiXiuSicboMainController;

}).call(this);

