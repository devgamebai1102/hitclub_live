
(function () {
    cc.TaiXiuSicboHelpView = cc.Class({
        "extends": cc.PopupBase,
        properties: {

        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU_SICBO;
        },

        closeFinished: function () {
            cc.TaiXiuSicboMainController.getInstance().destroyHelpView();
        },
		
		showRuleClicked: function () {
			cc.TaiXiuSicboMainController.getInstance().destroyHelpView();
			cc.TaiXiuSicboMainController.getInstance().createRuleView();
		},
    });
}).call(this);
