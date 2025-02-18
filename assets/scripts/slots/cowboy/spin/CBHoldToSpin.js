/*
 * Generated by BeChicken
 * on 11/1/2019
 * version v1.0
 */
(function () {
    cc.CBHoldToSpin = cc.Class({
        extends: cc.HoldToSpin,
        properties: {
            spinView: cc.CBSpinView
        },
        update: function (dt) {
            if (this.holdStart) {
                this.holdTime += dt;
                if (this.sendEventHold === false && this.holdTime >= 1) {
                    this.sendEventHold = true;
                    this.eventHold();
                }
            }
        },
        TouchStart: function () {
            this.holdStart = true;
            this.holdTime = 0;
            this.sendEventHold = false;
        },

        TouchCancel: function () {
            this.holdStart = false;
            this.sendEventHold = false;
            this.callSpin();
        },

        TouchEnd: function () {
            this.holdStart = false;
            this.sendEventHold = false;
            this.callSpin();
        },
        callSpin: function () {
            if (this.holdTime < 1) {
                this.stopAuto();
                if (!this.spinView.isSpining) {
                    if (cc.BonusGameController.getInstance().getData()) {
                        return;
                    }
                    this.spinView.spinClicked();
                }

            }
        },
        eventHold: function () {
            this.startAuto();
            this.spinView.autoSpinClicked();
        }

    })
}).call(this);