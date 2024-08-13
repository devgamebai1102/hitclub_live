/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TaiXiuLivestreamGraphDiceSumView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            TaiXiuLivestreamGraph100View: cc.TaiXiuLivestreamGraph100View,
            TaiXiuLivestreamGraphCatCauView: cc.TaiXiuLivestreamGraphCatCauView,
            TaiXiuLivestreamGraphDiceSumView: cc.TaiXiuLivestreamGraphDiceSumView,
            TaiXiuLivestreamGraphDice3View: cc.TaiXiuLivestreamGraphDice3View,

            pageView: cc.PageView,
            btnNext: cc.Button,
            btnBack: cc.Button,

            lbTotalTai: cc.Label,
            lbTotalXiu: cc.Label,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.timeSwitchPage = 0.3;
            this.totalPages = 2;
            this.currentPageIndex = this.pageView.getCurrentPageIndex();
            this.checkStatusButton();
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getSoiCau();
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');

            //set tam du lieu de demo
        },

        getSoiCau: function () {
            var txlivestreamGetSoiCauCommand = new cc.TXLIVESTREAMGetSoiCauCommand;
            txlivestreamGetSoiCauCommand.execute(this)
        },

        onTXGetSoiCauResponse: function (list) {
            /*
            {
                "SessionId": 173183,
                "FirstDice": 4,
                "SecondDice": 2,
                "ThirdDice": 4,
                "DiceSum": 10,
                "BetSide": 1,
                "CreatedDate": "2019-04-04T07:10:44.94"
              }
            * */

            var countTai = this.TaiXiuLivestreamGraph100View.draw(list);
            this.lbTotalTai.string = countTai;
            this.lbTotalXiu.string = 100 - countTai;
            this.TaiXiuLivestreamGraphCatCauView.draw(list);

            this.TaiXiuLivestreamGraphDiceSumView.draw(list);
            this.TaiXiuLivestreamGraphDice3View.draw(list);
        },

        pageEvent: function () {
            this.checkStatusButton();
        },

        closeClicked: function () {
            //reset truoc khi close cho ko lag
            cc.TaiXiuLivestreamController.getInstance().hideOrshowVideo(false);
            this.TaiXiuLivestreamGraph100View.resetDraw();
            this.TaiXiuLivestreamGraphCatCauView.resetDraw();
            this.TaiXiuLivestreamGraphDiceSumView.resetDraw();
            this.TaiXiuLivestreamGraphDice3View.resetDraw();

            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.TaiXiuLivestreamMainController.getInstance().destroyGraphView();
            }, this, 1, 0, delay, false);
        },

        nextPageClicked: function() {
            this.currentPageIndex++;
            this.pageView.scrollToPage(this.currentPageIndex, this.timeSwitchPage);
            this.checkStatusButton();
        },

        backPageClicked: function() {
            this.currentPageIndex--;
            this.pageView.scrollToPage(this.currentPageIndex, this.timeSwitchPage);
            this.checkStatusButton();
        },

        checkStatusButton: function () {
            this.currentPageIndex = this.pageView.getCurrentPageIndex();
            if (this.currentPageIndex <  this.totalPages - 1) {
                this.btnNext.interactable = true;
            } else {
                this.btnNext.interactable = false;
            }

            if (this.currentPageIndex > 0) {
                this.btnBack.interactable = true;
            } else {
                this.btnBack.interactable = false;
            }
        },
    });
}).call(this);
