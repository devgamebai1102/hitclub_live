/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TaiXiuSicboSessionDetailItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbTime: cc.Label,
            //lbSID: cc.Label,
            lbNickName: cc.Label,
            lbBet: cc.Label,
            lbRefund: cc.Label,
            sicboBetSideName: cc.TaiXiuSicboBetSideName,
        },

        updateItem: function(item, itemID) {
            this.lbTime.string = this.sicboBetSideName.GetTuCuoc(item.BetSide); //item.BetSide;//cc.Tool.getInstance().convertUTCTime2(item.CreateTime);
            // this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(item.ServiceID);
            this.lbNickName.string = cc.Tool.getInstance().formatMoney(item.Bet);//item.UserName;
            
            this.lbBet.string = cc.Tool.getInstance().formatMoney(item.Award);
            this.lbRefund.string = cc.Tool.getInstance().formatMoney(item.Refund);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
