/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TaiXiuSicboHistoryItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // nodeBG: cc.Node,

            lbSession: cc.Label,
            lbTime: cc.Label,
            lbSide: cc.Label,
            lbResult: cc.Label,
            lbBet: cc.Label,
            lbRefund: cc.Label,
            lbWin: cc.Label,
			lbKetqua: cc.Label,
			lbCuaDat: cc.Label,
			lbNhan: cc.Label,
			lbPhien: cc.Label,
			lbAmount: cc.Label,
        },

        updateItem: function(item, itemID) {
			//console.log(item);
            // this.nodeBG.active = itemID % 2 !== 0;
            this.lbSession.string = '#' + item.SessionID;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.CreateTime);
            this.lbSide.string = item.BetSide === cc.TaiXiuSicboBetSide.TAI ? 'TÀI' : 'XỈU';

            this.lbBet.string = cc.Tool.getInstance().formatNumber(item.Bet);
            this.lbResult.string = item.Result;
            this.lbRefund.string = cc.Tool.getInstance().formatNumber(item.Refund);
            this.lbWin.string = cc.Tool.getInstance().formatNumber(item.Award);
			
			this.lbCuaDat.string = item.BetSide === cc.TaiXiuSicboBetSide.TAI ? 'Tài' : 'Xỉu'  + ':';
			this.lbAmount.string = cc.Tool.getInstance().formatNumber(item.Bet);
            this.lbKetqua.string = item.Result + '.';
            this.lbNhan.string = cc.Tool.getInstance().formatNumber(item.Award);
			this.lbPhien.string = '#' + item.SessionID;

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
