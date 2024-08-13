/**
 * Created by Nofear on 6/7/2017.
 */
var netConfig = require('NetConfig');

(function () {
    cc.SicboPlayer = cc.Class({
        "extends": cc.Component,
        properties: {
            lbSID: cc.Label,
            lbName: cc.Label,
            nickName: "",
			avatar: cc.Avatar,
        },
		onLoad: function () {
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
			this.avatar.setAvatar(cc.AccountController.getInstance().getAvatarImage(loginResponse.AvatarID));
			this.lbName.string = loginResponse.AccountName;
        },
        


    });
}).call(this);