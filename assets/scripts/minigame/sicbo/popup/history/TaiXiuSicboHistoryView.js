/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TaiXiuSicboHistoryView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            TaiXiuSicboHistoryListView: cc.TaiXiuSicboHistoryListView,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU_SICBO;
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getTopSessionWinners();
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');
        },

        getTopSessionWinners: function () {
            var txsicboGetHistoryCommand = new cc.TXSICBOGetHistoryCommand;
            txsicboGetHistoryCommand.execute(this);
        },

        onTXGetHistoryResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.TaiXiuSicboHistoryListView.resetList();
                this.TaiXiuSicboHistoryListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.TaiXiuSicboHistoryListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.TaiXiuSicboMainController.getInstance().destroyHistoryView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
