

(function () {
    cc.TaiXiuSicboAnimationEvent = cc.Class({
        "extends": cc.Component,
        properties: {
        },


        lightOnEvent: function () {
            cc.TaiXiuSicboController.getInstance().lightOnEvent();
        },
    });
}).call(this);
