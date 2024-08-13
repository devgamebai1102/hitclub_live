cc.Class({
    extends: cc.Component,

    properties: {
        nodeshowMenu:cc.Node,
        nodecloseMenu:cc.Node
    },

    onLoad: function () {
        this.animation = this.node.getComponent(cc.Animation);
    },

    menuOpenClicked: function() {
        this.animation.play('openMenu');
        this.activeButtonMenu(false);
    },

    menuCloseClicked: function() {
        this.animation.play('closeMenu');
        this.activeButtonMenu(true);
    },
    activeButtonMenu(active){
        this.nodeshowMenu.active = active;
        this.nodecloseMenu.active = !active
    },
    clickHuongDan(){
        cc.XXLivestreamController.getInstance().hideOrshowVideo(true);
        cc.XXLivestreamPopupController.getInstance().createHelpView();
    },
    clickHistory(){
        cc.XXLivestreamController.getInstance().hideOrshowVideo(true);
        cc.XXLivestreamPopupController.getInstance().createHistoryView();
    }
});