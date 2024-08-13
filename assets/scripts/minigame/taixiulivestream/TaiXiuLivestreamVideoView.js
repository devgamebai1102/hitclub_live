/**
 * video livestream
 */


(function () {
    cc.TaiXiuLivestreamVideoView = cc.Class({
        "extends": cc.Component,
        properties: {
            videolive: cc.Node,            
        },
        

        onLoad: function () {
            //setView
            cc.TaiXiuLivestreamController.getInstance().setTaiXiuLivestreamVideoView(this);
            this.reset();
        },

        onDestroy: function () {
            cc.TaiXiuLivestreamController.getInstance().setTaiXiuLivestreamResultView(null);
        },

        reset: function () {
            this.resetUI();
        },

        resetUI: function () {
            this.videolive.active = true;
        },

        hideOrshowVideo: function(isShow){

            this.videolive.active = !isShow;
        },
        hideVideo: function(){
            this.videolive.active = false;
        },
        showVideo: function(){
            this.videolive.active = true;
        },
        hideOrshowVideo2: function(){
            console.log(this.videolive.active);
            this.videolive.active = !this.videolive.active;
        },  
		
    });
}).call(this);