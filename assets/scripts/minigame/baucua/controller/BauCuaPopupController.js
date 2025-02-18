/*
 * Generated by BeChicken
 * on 11/13/2019
 * version v1.0
 */
(function () {
    var BauCuaPopupController;

    BauCuaPopupController = (function () {
        var instance;

        function BauCuaPopupController() {

        }

        instance = void 0;

        BauCuaPopupController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        BauCuaPopupController.prototype.setPopupView = function (popupView) {
            return this.baucuaPopupView = popupView;
        };

        BauCuaPopupController.prototype.createTopView = function () {
            return this.baucuaPopupView.createTopView();
        };

        BauCuaPopupController.prototype.destroyTopView = function () {
            return this.baucuaPopupView.destroyTopView();
        };

        BauCuaPopupController.prototype.createHelpView = function () {
            return this.baucuaPopupView.createHelpView();
        };

        BauCuaPopupController.prototype.destroyHelpView = function () {
            return this.baucuaPopupView.destroyHelpView();
        };

        BauCuaPopupController.prototype.createHistoryView = function () {
            return this.baucuaPopupView.createHistoryView();
        };

        BauCuaPopupController.prototype.destroyHistoryView = function () {
            return this.baucuaPopupView.destroyHistoryView();
        };

        BauCuaPopupController.prototype.createGroupUserView = function () {
            return this.baucuaPopupView.createGroupUserView();
        };

        BauCuaPopupController.prototype.destroyGroupUserView = function () {
            return this.baucuaPopupView.destroyGroupUserView();
        };

        BauCuaPopupController.prototype.createGraphView = function () {
            return this.baucuaPopupView.createGraphView();
        };

        BauCuaPopupController.prototype.destroyGraphView = function () {
            return this.baucuaPopupView.destroyGraphView();
        };
        return BauCuaPopupController;

    })();

    cc.BauCuaPopupController = BauCuaPopupController;

}).call(this);