/**
 * Input dat cuoc
 */

(function () {
    cc.TaiXiuLivestreamSessionHistoryView = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteSides:[cc.Sprite],
            sfSides: [cc.SpriteFrame],
            nodeBlink:cc.Node
        },

        onLoad: function () {
            cc.TaiXiuLivestreamController.getInstance().setTaiXiuLivestreamSessionHistoryView(this);
        },

        onDestroy: function () {
            cc.TaiXiuLivestreamController.getInstance().setTaiXiuLivestreamSessionHistoryView(null);
        },

        updateSessionHistory: function (livestreamgameHistory) {
         //   console.log(livestreamgameHistory);
            if (livestreamgameHistory) {
                this.livestreamgameHistory = livestreamgameHistory;
                cc.TaiXiuLivestreamController.getInstance().setGameHistory(livestreamgameHistory);
                var self = this;
                var index = livestreamgameHistory.length - 1;
                livestreamgameHistory.forEach(function (game) {
                    var sprite = self.spriteSides[index];
                    sprite.spriteFrame = self.sfSides[game.DiceSum > 10 ? 0 : 1];
                    if (index == 0) {
                        cc.tween(self.nodeBlink)
                            .repeatForever(
                                cc.tween().sequence(
                                    cc.tween().to(0.3, { scale: 1 }, { easing: cc.easing.sineOut }),
                                    cc.tween().to(0.3, { scale: 0.9 }, { easing: cc.easing.sineOut })))
                            .start();
                    }
                    //sprite.node.getComponent(cc.Button).clickEvents[0].customEventData = index;
                    index--;
                });
            }
        },

        //Chi tiet 1 phien
        sessionDetailClicked: function (event, index) {
			var index = 0;
            if (this.livestreamgameHistory && this.livestreamgameHistory.length > index) {
                cc.TaiXiuLivestreamController.getInstance().setDetailIndex(index);
                cc.TaiXiuLivestreamMainController.getInstance().createSessionDetailView(0);
            }
        }
    });
}).call(this);
