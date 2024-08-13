
(function () {
    cc.XXLivestreamHelpView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            tabs: cc.ToggleContainer,
            tabContents: cc.Node
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
            for (let i = 0; i < this.tabs.toggleItems.length; i++) {
                this.tabs.toggleItems[i].node.on("toggle", () => {
                    this.tabSelectedIdx = i;
                    this.onTabChanged();
                });
            }
        },

        closeFinished: function () {
            cc.XXLivestreamController.getInstance().hideOrshowVideo(false);
            cc.XXLivestreamPopupController.getInstance().destroyHelpView();
        },
		
		showRuleClicked: function () {
			cc.XXLivestreamPopupController.getInstance().destroyHelpView();
			cc.XXLivestreamPopupController.getInstance().createRuleView();
		},
        onTabChanged: function(){
            for (let i = 0; i < this.tabContents.childrenCount; i++) {
                this.tabContents.children[i].active = i == this.tabSelectedIdx;
            }
        }
    });
}).call(this);
