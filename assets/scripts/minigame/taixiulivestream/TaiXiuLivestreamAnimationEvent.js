

(function () {
    cc.TaiXiuLivestreamAnimationEvent = cc.Class({
        "extends": cc.Component,
        properties: {
        },


        lightOnEvent: function () {
            cc.TaiXiuLivestreamController.getInstance().lightOnEvent();
        },
    });
}).call(this);
