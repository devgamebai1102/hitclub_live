/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TaiXiuLivestreamHistoryView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            TaiXiuLivestreamHistoryListView: cc.TaiXiuLivestreamHistoryListView,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
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
            var txlivestreamGetHistoryCommand = new cc.TXLIVESTREAMGetHistoryCommand;
            txlivestreamGetHistoryCommand.execute(this);
        },

        onTXGetHistoryResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.TaiXiuLivestreamHistoryListView.resetList();
                this.TaiXiuLivestreamHistoryListView.initialize(list);
            }
        },

        closeClicked: function () {
            cc.TaiXiuLivestreamController.getInstance().hideOrshowVideo(false);
            this.TaiXiuLivestreamHistoryListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.TaiXiuLivestreamMainController.getInstance().destroyHistoryView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
