/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TQHistoryItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // sprite: cc.Sprite,

            lbSessionID: cc.Label,
            lbTime: cc.Label,
            lbBet: cc.Label,
            lbWin: cc.Label,
            //lbDesc: cc.Label,
        },

        updateItem: function(item, itemID) {
            // this.sprite.enabled = itemID % 2 !== 0;
            this.lbSessionID.string = '#' + item.SpinId;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.CreatedDate); //UpdateDate
            this.lbBet.string = cc.Tool.getInstance().formatNumber(item.TotalBetValue);
            this.lbWin.string = cc.Tool.getInstance().formatNumber(item.TotalPrizeValue);

            /*
             if (item.TotalPrizeValue >= 500000) {
             this.lbDesc.string = 'NỔ HŨ';
             this.lbWin.node.color = this.jackpotColor;
             } else  if (item.TotalPrizeValue >= item.TotalBetValue * 2) {
             this.lbDesc.string = 'THẮNG LỚN';
             this.lbWin.node.color = this.bigWinColor;
             } else {
             this.lbDesc.string = 'THẮNG';
             this.lbWin.node.color = cc.Color.WHITE;
             }
             * */

            this.item = item;
            this.itemID = itemID;
        },

        openDetailClicked: function () {
            cc.TQHistoryController.getInstance().setSessionDetailData(this.item);
            cc.TQPopupController.getInstance().createSessionDetailView();
        },
    });
}).call(this);
