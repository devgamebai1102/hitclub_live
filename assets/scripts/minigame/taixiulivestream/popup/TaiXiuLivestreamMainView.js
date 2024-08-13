/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.TaiXiuLivestreamMainView = cc.Class({
        "extends": cc.PopupViewBase,
        properties: {
            prefabGraph: cc.Prefab, //soi cau
			prefabJackpotHistory: cc.Prefab,
			prefabRule: cc.Prefab,
        },

        onLoad: function () {
            cc.TaiXiuLivestreamMainController.getInstance().setTaiXiuLivestreamMainView(this);
        },

        createGraphView: function () {
            this.nodeGraphView = this.createView(this.prefabGraph);
        },

        destroyGraphView: function () {
            if (this.nodeGraphView)
                this.nodeGraphView.destroy();
        },
        createJackpotHistoryView: function () {
            this.jackpotHistoryView = this.createView(this.prefabJackpotHistory);
        },
        destroyJackpotHistoryView: function () {
            if (this.jackpotHistoryView)
                this.jackpotHistoryView.destroy();
        },
		
        createRuleView: function () {
            this.ruleView = this.createView(this.prefabRule);
        },
        destroyRuleView: function () {
            if (this.ruleView)
                this.ruleView.destroy();
        },
    });
}).call(this);
