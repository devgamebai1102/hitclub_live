/*
 * Generated by BeChicken
 * on 10/15/2019
 * version v1.0
 */
(function () {
    cc.DragonTigerPlayer = cc.Class({
        extends: cc.BacaratPlayer,
        properties: {},
        onEnable: function () {
            this.showPlayer(false);
        },
        showPlayer: function (isShow) {
            this.node.opacity = (isShow) ? 255 : 0;
        }
    })
}).call(this);