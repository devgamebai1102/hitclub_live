/**
 * Dat cuoc
 */

(function () {
    cc.TaiXiuSicboDiceAnimationEvent = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        diceAnimFinish: function () {
            cc.TaiXiuSicboController.getInstance().diceAnimFinish();
        },
    });
}).call(this);
