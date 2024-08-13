cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        this.animation = this.node.getComponent(cc.Animation);
    },

    menuOpenClicked: function() {
        this.animation.play('openMenu');
    },

    menuCloseClicked: function() {
        this.animation.play('closeMenu');
    },
});
