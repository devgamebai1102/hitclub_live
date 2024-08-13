/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TaiXiuLiveStreamTopItemHistory = cc.Class({
        "extends": cc.Component,
        properties: {
            // nodeBG: cc.Node,

            lbRank: cc.Label,
            //lbSID: cc.Label,
            lbNickName: cc.Label,
            lbTotalWin: cc.Label,
            rankSprite1: cc.Sprite,
            rankSprite2: cc.Sprite,
            rankSprite3: cc.Sprite,
            fontRegurlar: cc.Font,
            fontBold: cc.Font,
            bgrow: cc.Node,
            linerow: cc.Node,
            lbTotalThuong: cc.Label,
        },

        updateItem: function (item, itemID) {
             
            if(item){
                itemID = item.Stt - 1;
            this.linerow.active = false;
            this.bgrow.active = itemID % 2 !== 1;

                console.log(itemID);
            var color = cc.Color.WHITE;
            
                this.lbRank.node.active = false;
                this.lbNickName.font = this.fontBold;
                //this.lbTotalWin.font = this.fontBold;
                if (itemID == 0) {
                    this.rankSprite1.node.active = true;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = false;
                    this.lbNickName.node.color = color.fromHEX("#FF0000");

                } else if (itemID == 1) {
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = true;
                    this.rankSprite3.node.active = false;
                    this.lbNickName.node.color = color.fromHEX("#E7EA00");
                } else if (itemID == 2) {
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = true;
                    this.lbNickName.node.color = color.fromHEX("#00EA00");
                }else if (itemID == 3) {
					this.lbRank.string = itemID + 1;
                    this.lbRank.node.active = true;
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = false;
                    this.lbNickName.node.color = color.fromHEX("#0095FF");
                   // this.lbTotalWin.node.color = color.fromHEX("#27C7F4");
                }else if (itemID == 4) {
					this.lbRank.string = itemID + 1;
                    this.lbRank.node.active = true;
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = false;
                    this.lbNickName.node.color = color.fromHEX("#0095FF");
                    this.linerow.active = true;
                }else if (itemID == 5) {
                    this.lbRank.string = itemID + 1;
                    this.lbRank.node.active = true;
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = false;
                    this.lbNickName.node.color = color.fromHEX("#0095FF");
                }else if (itemID == 6) {
                    this.lbRank.string = itemID + 1;
                    this.lbRank.node.active = true;
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = false;
                    this.lbNickName.node.color = color.fromHEX("#0095FF");
                }else if (itemID == 7) {
                    this.lbRank.string = itemID + 1;
                    this.lbRank.node.active = true;
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = false;
                    this.lbNickName.node.color = color.fromHEX("#0095FF");
                    this.lbTotalThuong.string = "15.000.000";
                }else if (itemID == 8) {
                    this.lbRank.string = itemID + 1;
                    this.lbRank.node.active = true;
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = false;
                    this.lbNickName.node.color = color.fromHEX("#0095FF");
                    this.lbTotalThuong.string = "15.000.000";
                }else if (itemID == 9) {
                    this.lbRank.string = itemID + 1;
                    this.lbRank.node.active = true;
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = false;
                    this.lbNickName.node.color = color.fromHEX("#0095FF");
                    this.lbTotalThuong.string = "10.000.000";
                }else {
                    this.lbRank.string = itemID + 1;
                    this.lbRank.node.active = true;
                    //this.thuongtoplast.active = true;
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = false;
                    this.lbNickName.node.color = color.fromHEX("#8300FF");

                  
                    if (itemID == 10) {
                        this.lbTotalThuong.string = "10.000.000";
                    }else if (itemID == 11) {
                        this.lbTotalThuong.string = "10.000.000";
                    }else if (itemID == 12) {
                        this.lbTotalThuong.string = "8.000.000";
                    }else if (itemID == 13) {
                        this.lbTotalThuong.string = "8.000.000";
                    }else if (itemID == 14) {
                        this.lbTotalThuong.string = "8.000.000";
                    }else{
                        this.lbTotalThuong.string = "5.000.000";
                    }


                }
           
            //this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(item.ServiceID);
            this.lbNickName.string = item.UserName;
            this.lbTotalWin.string = cc.Tool.getInstance().formatNumber(item.Award);
            

            this.item = item;
            this.itemID = itemID;
            }
        },
    });
}).call(this);