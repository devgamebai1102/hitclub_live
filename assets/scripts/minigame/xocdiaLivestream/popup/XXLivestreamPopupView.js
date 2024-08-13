/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.XXLivestreamPopupView = cc.Class({
        "extends": cc.PopupViewBase,
        properties: {
            prefabGroupUser: cc.Prefab,
            prefabSetting: cc.Prefab
        },

        onLoad: function () {            
            cc.XXLivestreamPopupController.getInstance().setXXLivestreamPopupView(this);
        },
        createGroupUserView: function () {
            this.nodeGroupUser = this.createView(this.prefabGroupUser);
        },
        createSettingView: function () {
            this.nodeSetting = this.createView(this.prefabSetting);
        },
        destroyGroupUserView: function () {
            if (this.nodeGroupUser)
                this.nodeGroupUser.destroy();
        },
        destroySettingView: function () {
            if (this.nodeSetting)
                this.nodeSetting.destroy();
        },
        
    });
}).call(this);
