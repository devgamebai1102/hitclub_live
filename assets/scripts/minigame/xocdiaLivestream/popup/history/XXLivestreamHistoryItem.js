/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.XXLivestreamHistoryItem = cc.Class({
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
			lbchitiet: cc.Label,
        },

        updateItem: function(item, itemID) {
            // this.nodeBG.active = itemID % 2 !== 0;
            this.lbSession.string = item.SessionID;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.CreateTime);
            this.lbSide.string = this.getGateBet(item.GateID);

            this.lbBet.string = cc.Tool.getInstance().formatNumber(item.Bet);
			
			
           // this.lbResult.string = item.Result;
            this.lbRefund.string = cc.Tool.getInstance().formatNumber(item.Refund);
            
			var tiennhancuoc = (item.Bet-item.Refund);
			
			
			//this.lbResult.string = this.getResult(item.GatesData);
			if (item.Award > 0){
				this.lbWin.node.color = cc.color(0, 255, 0, 255)
				var tongtiennhan = cc.Tool.getInstance().formatNumber(item.Award+item.Refund);
				this.lbWin.string = '+'+cc.Tool.getInstance().formatNumber(item.Award);
				this.lbResult.string = this.getResult(item.GatesData);
			}else if (item.Bet === item.Refund){
				this.lbWin.string = 'HÒA';
				var tongtiennhan = cc.Tool.getInstance().formatNumber(0+item.Refund);
				this.lbWin.node.color = cc.color(255, 255, 255, 255)
				this.lbResult.string = this.getResult(item.GatesData);
			}else if (item.GatesData === ''){
				var tongtiennhan = '-';
				this.lbWin.string = '-';
				 this.lbResult.string = 'chờ kq';
			}else{
				this.lbResult.string = this.getResult(item.GatesData);
				this.lbWin.string = cc.Tool.getInstance().formatNumber(item.Award-item.Bet+item.Refund);
				var tongtiennhan = cc.Tool.getInstance().formatNumber(0+item.Refund);
				this.lbWin.node.color = cc.color(255, 0, 0, 255)
			}
			
			this.lbchitiet.string = 'Đặt '+this.lbSide.string+' Kết quả '+this.lbResult.string+', Tổng đặt '+this.lbBet.string+' Hoàn trả '+this.lbRefund.string+', Nhận '+tongtiennhan;

            this.item = item;
            this.itemID = itemID;
        },
        getGateBet(GateId){
            let betSide = '';
            switch (GateId) {
                case 1:
                    betSide = 'Lẻ'
                    break;
                case 2:
                    betSide = '3Đ-1T'
                    break;
                case 3:
                    betSide = '1Đ-3T'
                    break;
                case 4:
                    betSide = 'Chẵn'
                    break;
                case 5:
                    betSide = '4Đ'
                    break;
                case 6:
                    betSide = '4T'
                    break;
            
                default:
                    break;
            }
            return betSide;
        },
        getResult(GateData){
            let rs = GateData.split(',');
            let rsString = '';
            let bigGate = parseInt(rs[0]);
            if (rs.length == 1) {
                if (bigGate == 1) {
                    rsString = 'Lẻ';
                }
                else{
                    rsString = 'Chẵn';
                }
            }
            else{
                if (bigGate == 1) {
                    if (parseInt(rs[1]) == 2) {
                        rsString = '3Đ-1T';
                    }
                    else{
                        rsString = '1Đ-3T';
                    }
                }
                else{
                    if (parseInt(rs[1]) == 5) {
                        rsString = '4Đ';
                    }
                    else{
                        rsString = '4T';
                    }
                }
            }
            return rsString;
        }
    });
}).call(this);
