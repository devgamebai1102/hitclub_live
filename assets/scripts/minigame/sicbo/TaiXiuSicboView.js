/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.TaiXiuSicboView = cc.Class({
        "extends": cc.Component,
        properties: {
            loading: cc.Node,
			progressBar: cc.ProgressBar,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);

            //set zIndex
            this.node.zIndex = cc.Config.getInstance().getZINDEX();

            cc.TaiXiuSicboController.getInstance().setTaiXiuSicboView(this);

            if (cc.TaiXiuSicboController.getInstance().connectHubTxSicboAuthorize()) {
                cc.TaiXiuSicboController.getInstance().sendRequestOnHub(cc.MethodHubName.ENTER_LOBBY);
            }

            this.loading.active = true;
            this.progressBar.progress = 0;
            this.loadingProgressBar();
        },

        onEnable: function () {
            cc.TaiXiuSicboController.getInstance().setIsOpen(true);
            var self = this;
            
            this.animation.play('openPopup');        
        },

        onDestroy: function () {
            cc.TaiXiuSicboController.getInstance().setTaiXiuSicboView(null);

            if (cc.sys.isNative) {
                cc.loader.releaseResDir('sicbo/prefabs');
                cc.loader.releaseResDir('sicbo/images');
            }
            cc.PopupController.getInstance().hideBusy();
        },

        resetPositionTX: function () {
            // console.log('this.node.y: ' + this.node.y);
            if (this.node.y < 40) {
                this.node.y = 50;
            }        
        },

        closeClicked: function () {
            cc.TaiXiuSicboController.getInstance().getTaiXiuSicboInputBetView().stopAllCallbacks();
            cc.TaiXiuSicboController.getInstance().setIsOpen(false);
            cc.TaiXiuSicboController.getInstance().reset();

            this.animation.play('closePopup');
            var self = this;
            var delay = 0.25;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyDynamicView(cc.GameId.SICBO);
            }, this, 1, 0, delay, false);
        },

        loadingProgressBar: function() {
            cc.tween(this.progressBar)
                .to(5, { progress: 1 })
                .call(() => { this.loading.active = false; })
                .start()
        }
    });
}).call(this);
