/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.TaiXiuLiveStreamView = cc.Class({
        "extends": cc.Component,
        properties: {
            maingame: cc.Node,
            bgmaingame: cc.Node,
            bgmaingame2: cc.Node
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);

            //set zIndex
            this.node.zIndex = cc.Config.getInstance().getZINDEX();

            cc.TaiXiuLivestreamController.getInstance().setTaiXiuLiveStreamView(this);

            if (cc.TaiXiuLivestreamController.getInstance().connectHubTxLivestreamAuthorize()) {
                cc.TaiXiuLivestreamController.getInstance().sendRequestOnHub(cc.MethodHubName.ENTER_LOBBY);
            }
        },

        onEnable: function () {
            cc.TaiXiuLivestreamController.getInstance().setIsOpen(true);
            var self = this;
            
            this.animation.play('openPopup');        
        },

        onDestroy: function () {
            cc.TaiXiuLivestreamController.getInstance().setTaiXiuLiveStreamView(null);

            if (cc.sys.isNative) {
                cc.loader.releaseResDir('taixiulivestream/prefabs');
                cc.loader.releaseResDir('taixiulivestream/images');
            }
            cc.PopupController.getInstance().hideBusy();
        },

        resetPositionTX: function () {
            // if (this.node.y < 40) {
            //     this.node.y = 50;
            // }        
        },

        closeClicked: function () {
            cc.TaiXiuLivestreamController.getInstance().setIsOpen(false);
            cc.TaiXiuLivestreamController.getInstance().reset();

            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyDynamicView(cc.GameId.TAI_XIU_LIVESTREAM);
            }, this, 1, 0, delay, false);
        },
        clickbg: function () {
            //cc.TaiXiuMd5Controller.getInstance().closeChat();
            cc.TaiXiuLivestreamController.getInstance().hideOrshowVideo(true);
            this.maingame.opacity = 100;
            this.bgmaingame.active = false;
            this.bgmaingame2.active = false;
        },
        clickgame: function () {
            cc.TaiXiuLivestreamController.getInstance().hideOrshowVideo(false);
            this.maingame.opacity = 255;
            this.bgmaingame.active = true;
            this.bgmaingame2.active = true;
        },
    });
}).call(this);
