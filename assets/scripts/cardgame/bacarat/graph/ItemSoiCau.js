/*
 * Generated by BeChicken
 * on 9/27/2019
 * version v1.0
 */
(function () {
    cc.ItemSoiCau = cc.Class({
        extends: cc.Component,
        properties: {
            nodePPair: cc.Node,
            nodeBPair: cc.Node,
            sprite: cc.Sprite,
        },

        setSpiteFrameItem: function (gateWin, isPlayerPair, isBankerPair) {
            if (this.gameAssets === undefined) {
                this.gameAssets = cc.BacaratController.getInstance().getAssetView();
            }

            this.gateWin = gateWin;

            this.nodePPair.active = isPlayerPair;
            this.nodeBPair.active = isBankerPair;
            switch (this.gateWin) {
                case cc.BacaratBetSite.PLAYER:
                    this.sprite.spriteFrame = this.gameAssets.sfPlayers[0];
                    break;
                case cc.BacaratBetSite.TIE:
                    this.sprite.spriteFrame = this.gameAssets.sfTies[0];
                    break;
                case cc.BacaratBetSite.BANKER:
                    this.sprite.spriteFrame = this.gameAssets.sfBankers[0];
                    break;
            }
        },

        setScore: function (score) {
            switch (this.gateWin) {
                case cc.BacaratBetSite.PLAYER:
                    this.sprite.spriteFrame = this.gameAssets.sfPlayers[score + 1];
                    break;
                case cc.BacaratBetSite.TIE:
                    this.sprite.spriteFrame = this.gameAssets.sfTies[score + 1];
                    break;
                case cc.BacaratBetSite.BANKER:
                    this.sprite.spriteFrame = this.gameAssets.sfBankers[score + 1];
                    break;
            }
        }

    });
}).call(this)
