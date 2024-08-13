
(function () {
    cc.TaiXiuSicboRuleView = cc.Class({
        "extends": cc.PopupBase,
        properties: {

        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU_SICBO;
        },

        closeFinished: function () {
            cc.TaiXiuSicboMainController.getInstance().destroyRuleView();
        },
		
		goCheckSicbo: function () {
			cc.sys.openURL(cc.Config.getInstance().md5Service());
		},
    });
}).call(this);
