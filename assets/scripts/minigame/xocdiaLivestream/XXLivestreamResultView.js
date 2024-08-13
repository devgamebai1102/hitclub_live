/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.XXLivestreamResultView = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteVis: [cc.Sprite],
            sfVis: [cc.SpriteFrame],

            nodeChan1: cc.Node,
            nodeChan2: cc.Node,
            nodeChan3: cc.Node,

            nodeLe1: cc.Node,
            nodeLe2: cc.Node,
            nodeLe3: cc.Node,
            nodeAllResult : cc.Node,
        },

        onLoad: function () {
            cc.XXLivestreamController.getInstance().setXXLivestreamResultView(this);
            var self = this;
            this.valueJp = 0;
            this.currentState = -1;
            //this.nodeFxResult = this.nodeChan1.parent;

            //node parent Vi
            //this.nodeViParent = this.spriteVis[0].node.parent;

            //toa do cua bat Nan
            this.timeouts = [];
        },
        onDestroy:function(){
            this.timeouts.forEach(function(t){
                clearTimeout(t);
            })
            this.timeouts = [];
        },

        reset: function () {
        },

        updateResult: function (players, result, originResult, state, openNow,data) {
            //check state de xu ly hien thi
            switch (state) {

                //giai doan ket qua
                case cc.XXLivestreamState.SHOW_RESULT: //15
                    
                    if (this.currentState !== state) {
                        this.playFxResult(result, originResult, openNow);
                        this.playPayFx(players, result);
                        this.nodeAllResult.active = true;
                        this.spriteVis[0].spriteFrame = this.sfVis[result.Dice1];
                        this.spriteVis[1].spriteFrame = this.sfVis[result.Dice2];
                        this.spriteVis[2].spriteFrame = this.sfVis[result.Dice3];
                        this.spriteVis[3].spriteFrame = this.sfVis[result.Dice4];
                    }
                    break;

                //giai doan cho phien moi
                case cc.XXLivestreamState.WAITING:
                    if (this.currentState !== state) {
                       // cc.XXLivestreamController.getInstance().initGateChip();
                        //this.nodeFxResult.active = false;
                        this.nodeAllResult.active = false;
                        this.nodeChan1.active = false;
                        this.nodeChan2.active = false;
                        this.nodeChan3.active = false;
                        this.nodeLe1.active = false;
                        this.nodeLe2.active = false;
                        this.nodeLe3.active = false;
                    }
                    break;
            }

            //luu lai state hien tai
            this.currentState = state;
        },

        playFxResult: function (result, originResult, openNow) {
           
            var self = this;

            //this.nodeFxResult.active = true;

            this.nodeChan1.active = false;
            this.nodeChan2.active = false;
            this.nodeChan3.active = false;
            this.nodeLe1.active = false;
            this.nodeLe2.active = false;
            this.nodeLe3.active = false;
            //var results = originResult.split(',');
            //duyet qua ket qua cua tung Vi
            var index = 0;
        },
        playPayFx: function (players, result) {
            //lay ve danh sach cac player
            //let gateChips = cc.XXLivestreamController.getInstance().getGateChips();
            var self = this;
            let bigGate = parseInt(result.BigGate);
            let smallGate = parseInt(result.SmallGate);
            switch (smallGate) {
                case cc.XXLivestreamGate.THREE_UP:
                    self.nodeLe1.active = true;
                    self.nodeLe2.active = true;
                    cc.tween(self.nodeLe1).then(cc.blink(15.0, 20)).start();
                    cc.tween(self.nodeLe2).then(cc.blink(15.0, 20)).start();
                    break;
                case cc.XXLivestreamGate.THREE_DOWN:
                    self.nodeLe1.active = true;
                    self.nodeLe3.active = true;
                    cc.tween(self.nodeLe1).then(cc.blink(15.0, 20)).start();
                    cc.tween(self.nodeLe3).then(cc.blink(15.0, 20)).start();
                    break;
                case cc.XXLivestreamGate.FOUR_DOWN:
                    self.nodeChan1.active = true;
                    self.nodeChan3.active = true;
                    cc.tween(self.nodeChan1).then(cc.blink(15.0, 20)).start();
                    cc.tween(self.nodeChan3).then(cc.blink(15.0, 20)).start();
                    break;
                case cc.XXLivestreamGate.FOUR_UP:
                    self.nodeChan1.active = true;
                    self.nodeChan2.active = true;
                    cc.tween(self.nodeChan1).then(cc.blink(15.0, 20)).start();
                    cc.tween(self.nodeChan2).then(cc.blink(15.0, 20)).start();
                    break;
                default:
                    self.nodeChan1.active = true;
                    cc.tween(self.nodeChan1).then(cc.blink(15.0, 20)).start();
            }

            //Loc danh sach cua thang
            let arrGateWin = [bigGate, smallGate];

            //Loc danh sach cua thua
            //let arrGateLose = [];
            // gateChips.map((gate, index) => {
            //     if (!arrGateWin.includes(index)) {
            //         arrGateLose.push(index)
            //     }
            // }, this);

            var totalLost = 0;
            //Hieu ung chip thua bay tu table -> dealer

            var totalWin = 0;
            //Hieu ung chip thang bay tu dealer -> table

            var total = 0;
            //Hieu ung chip thang bay tu table -> player

        }
    });

}).call(this);
