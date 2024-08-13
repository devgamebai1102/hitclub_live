/**
 * video livestream
 */


(function () {
    cc.XocDiaLivestreamVideoView = cc.Class({
        "extends": cc.Component,
        properties: {
            videolive: cc.Node,            
        },
        

        onLoad: function () {
            //setView
            cc.XXLivestreamController.getInstance().setXocDiaLivestreamVideoView(this);
            this.reset();
        },

        onDestroy: function () {
            cc.XXLivestreamController.getInstance().setXocDiaLivestreamVideoView(null);
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
            this.videolive.active = !this.videolive.active;
        },  
		
    });
}).call(this);