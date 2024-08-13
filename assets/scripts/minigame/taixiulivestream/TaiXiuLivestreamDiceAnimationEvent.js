/**
 * Dat cuoc
 */

(function () {
    cc.TaiXiuLivestreamDiceAnimationEvent = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        diceAnimFinish: function () {
            cc.TaiXiuLivestreamController.getInstance().diceAnimFinish();
        },
    });
}).call(this);
