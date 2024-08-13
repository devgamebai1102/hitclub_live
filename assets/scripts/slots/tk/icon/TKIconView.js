/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.TKIconView = cc.Class({
        "extends": cc.Component,
        properties: {
			icons: [cc.SpriteFrame],
			icons1: [cc.SpriteFrame],
			icons2: [cc.SpriteFrame],
            skeletonDataIcons: [sp.SkeletonData],
            skeletonDataIcons2: [sp.SkeletonData],
            skeletonDataIcons3: [sp.SkeletonData],

            bgRooms: [cc.SpriteFrame],
        },

        onLoad: function () {
            cc.SpinController.getInstance().setIconView(this);
        }
    });
}).call(this);
