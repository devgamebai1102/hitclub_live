/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TaiXiuLivestreamGraph100View = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeParent: cc.Node,
            nodeTaiTemp: cc.Node,
            nodeXiuTemp: cc.Node,
        },

        draw: function (list) {
            var countTai = 0;
            var self = this;
            let i = 1;
            for (var j = 0; j < 100; j = j + 5) {
                let newitem = [];
                for (var m = 0; m < 5; m++) {
                    let s = j+m;
                    newitem.push(list[s]);
                }
                //console.log(newitem);
                if(i%2 != 0){
                    for (var k = 4; k >= 0; k--) {
                        let item = newitem[k];
                        //console.log(item);
                        if (item.BetSide === cc.TaiXiuBetSide.TAI) {
                            countTai++;
                            self.createNode(self.nodeTaiTemp);
                        } else {
                            self.createNode(self.nodeXiuTemp);
                        }
                    }
                }else{
                    for (var k = 0; k <= 4; k++) {
                        let item = newitem[k];
                        //console.log(item);
                        if (item.BetSide === cc.TaiXiuBetSide.TAI) {
                            countTai++;
                            self.createNode(self.nodeTaiTemp);
                        } else {
                            self.createNode(self.nodeXiuTemp);
                        }
                    }
                }
                i++;
                
            }
            return countTai;
        },

        createNode: function (nodeTemp) {
            var nodeView = cc.instantiate(nodeTemp);
            nodeView.parent = this.nodeParent;
        },

        resetDraw: function () {
            //xoa cac node con
            var children = this.nodeParent.children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.nodeParent.removeChild(children[i]);
            }
        },
    });
}).call(this);
