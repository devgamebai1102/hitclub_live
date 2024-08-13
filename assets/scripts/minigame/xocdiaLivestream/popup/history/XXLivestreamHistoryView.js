/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.XXLivestreamHistoryView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            XXLivestreamHistoryListView: cc.XXLivestreamHistoryListView,
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
            var xxlivestreamGetHistoryCommand = new cc.XXLIVESTREAMGetHistoryCommand;
            xxlivestreamGetHistoryCommand.execute(this);
        },

        onXXGetHistoryResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.XXLivestreamHistoryListView.resetList();
                this.XXLivestreamHistoryListView.initialize(list);
            }
        },

        closeClicked: function () {
            cc.XXLivestreamController.getInstance().hideOrshowVideo(false);
            this.XXLivestreamHistoryListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.XXLivestreamPopupController.getInstance().destroyHistoryView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
