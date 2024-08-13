/*
 * Generated by BeChicken
 * on 6/10/2019
 * version v1.0
 */
(function () {
    cc.DragonTigerResultEffectView = cc.Class({
        "extends": cc.Component,
        properties: {
            bgWinRong: cc.Node,
            bgWinHoa: cc.Node,
            bgWinHo: cc.Node,
            btnNodeRong: cc.Node,
            btnNodeHoa: cc.Node,
            btnNodeHo: cc.Node,
            resultAnimation: cc.Animation
        },

        onLoad: function () {
            //setView
            cc.DragonTigerController.getInstance().setDragonTigerResultEffectView(this);
        },

        onDestroy: function () {
            cc.DragonTigerController.getInstance().setDragonTigerResultEffectView(null);
        },
        stopEffect: function () {
            this.reset();
        },
        reset: function () {
            this.resultAnimation.stop();
            this.bgWinRong.active = false;
            this.bgWinHoa.active = false;
            this.bgWinHo.active = false;
        },

        playEffectWin: function (sideWin) {
            let dragonTigerShowCard = cc.DragonTigerController.getInstance().dragonTigerShowCard;
            //this.reset();
            switch (sideWin) {
                case cc.DragonTigerBetSide.RONG:
                    this.bgWinRong.active = true;
                    dragonTigerShowCard.playAnimation(cc.DragonTigerBetSide.RONG);
                    this.btnNodeRong.opacity = 255;
                    this.resultAnimation.play('rong-win');
                    break;
                case cc.DragonTigerBetSide.HOA:
                    this.bgWinHoa.active = true;
                    dragonTigerShowCard.playAnimation(cc.DragonTigerBetSide.HOA);
                    this.btnNodeHoa.opacity = 255;
                    this.resultAnimation.play('hoa-win');
                    break;
                case cc.DragonTigerBetSide.HO:
                    this.bgWinHo.active = true;
                    dragonTigerShowCard.playAnimation(cc.DragonTigerBetSide.HO);
                    this.btnNodeHo.opacity = 255;
                    this.resultAnimation.play('ho-win');
                    break;
            }
        }
    });
}).call(this);