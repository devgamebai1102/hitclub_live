/**
 * Created by Nofear on 3/15/2019.
 */

/**
 Draw tu phai qua trai
 Draw tu duoi len tren
 */


(function () {
    cc.XXLivestreamSoiCauView = cc.Class({
        "extends": cc.Component,
        properties: {
            animation: cc.Animation,

            nodeParent: cc.Node,
            nodeEvenTemp: cc.Node,
            nodeOddTemp: cc.Node,
            sfDots: [cc.SpriteFrame],
            contentDraw: cc.Node,
            iconSoiCauChanTemplate: cc.Node,
            iconSoiCauLeTemplate: cc.Node,
            iconSoiCauChanTemplate1: cc.Node,
            iconSoiCauLeTemplate2: cc.Node,
            lbCountChan: cc.Label,
            lbCountLe: cc.Label,
            tabs: cc.ToggleContainer,
            tabContents: cc.Node
        },

        onLoad: function () {
            this.tabSelectedIdx = 0;
            cc.XXLivestreamController.getInstance().setXXLivestreamSoiCauView(this);
            for (let i = 0; i < this.tabs.toggleItems.length; i++) {
                this.tabs.toggleItems[i].node.on("toggle", () => {
                    this.tabSelectedIdx = i;
                    this.onTabChanged(this.data2);
                });
            }

            // this.rootPosX = -9.6; //toa do goc
            // this.rootPosY = -47; //toa do goc

            this.rootPosX = -66; //toa do goc
            this.rootPosY = -47; //toa do goc

            this.spaceX = 19;
            this.spaceY = 19;

            this.maxItemPerCol = 4;
        },
        onTabChanged:function(list) {
            for (let i = 0; i < this.tabContents.childrenCount; i++) {
                this.tabContents.children[i].active = i == this.tabSelectedIdx;
                if (this.tabSelectedIdx == 0 ) {
                    this.drawPage2(list);
                }
                else{
                    this.draw3(list);
                }
                
            }
        },

        convertToMatrix: function (list) {
            var self = this;
            //luu lai side dau tien
            var currentSide = this.getSide(list[0]);

            var matrix = [];
            var arrCols = [];
            list.forEach(function (item) {
                var itemSide = self.getSide(item);
                if (arrCols.length === self.maxItemPerCol) {
                    //du 6 thi dua vao matrix + chuyen sang cot khac
                    matrix.push(arrCols);
                    //reset cols
                    arrCols = [];
                    //push vao cols
                    arrCols.push(item);
                    //set lai currentSide
                    currentSide = itemSide;
                } else if (itemSide === currentSide) {
                    //giong thi them vao
                    arrCols.push(item);
                } else {
                    //khac thi push vao matrix + reset cols
                    matrix.push(arrCols);
                    //reset cols
                    arrCols = [];
                    //set lai currentSide
                    currentSide = itemSide;
                    //push vao cols
                    arrCols.push(item);
                }
            });

            //push arr cuoi vao matrix
            matrix.push(arrCols);
            return matrix;
        },

        getSide: function (gate) {
            switch (gate) {
                case cc.XXLivestreamResult.EVEN:
                    return 'EVEN';
                case cc.XXLivestreamResult.EVEN_FOUR_DOWN:
                    return 'EVEN';
                case cc.XXLivestreamResult.EVEN_FOUR_UP:
                    return 'EVEN';
                case cc.XXLivestreamResult.ODD_THREE_DOWN:
                    return 'ODD';
                case cc.XXLivestreamResult.ODD_THREE_UP:
                    return 'ODD';
            }
        },

        draw: function (list) {
            if (list.length === 0) return;
            // list.reverse();
            this.even = 0;
            this.fourUp = 0;
            this.fourDown = 0;
            this.odd = 0;
            this.threeUp = 0;
            this.threeDown = 0;

            // var list = [2,4,1,1,1,6,5,2,1,6,6,6,6,5,4,4];

            var matrix = this.convertToMatrix(list);
            var length = Math.min(matrix.length, 10);
            for (var i = 0; i < length; i++) {
                this.drawCol(matrix[i], i);
            }
            // this.nodeParent.width = Math.max(matrix.length * 40, 802);
        },

        drawCol: function (cols, colIndex) {
            //vi tri X
            var posX = this.rootPosX + (colIndex * this.spaceX);
            //toa do Y bat dau ve
            var starY = this.rootPosY + (this.maxItemPerCol - cols.length) * this.spaceY;

            for (var i = 0; i < cols.length; i++) {
                this.createNode(cols[i], cc.v2(posX, starY + (this.spaceY * i)));
            }
        },

        createNode: function (item, pos) {
            // if (this.gameAssets === undefined) {
            //     this.gameAssets = cc.XXLivestreamController.getInstance().getAssets();
            // }

            switch (item) {
                case cc.XXLivestreamResult.EVEN:
                    var nodeView = cc.instantiate(this.nodeEvenTemp);
                    this.even++;
                    break;
                case cc.XXLivestreamResult.EVEN_FOUR_DOWN:
                    nodeView = cc.instantiate(this.nodeEvenTemp);
                    this.even++;
                    this.fourDown++;
                    break;
                case cc.XXLivestreamResult.EVEN_FOUR_UP:
                    nodeView = cc.instantiate(this.nodeEvenTemp);
                    this.even++;
                    this.fourUp++;
                    break;
                case cc.XXLivestreamResult.ODD_THREE_DOWN:
                    nodeView = cc.instantiate(this.nodeOddTemp);
                    this.odd++;
                    this.threeDown++;
                    break;
                case cc.XXLivestreamResult.ODD_THREE_UP:
                    nodeView = cc.instantiate(this.nodeOddTemp);
                    this.odd++;
                    this.threeUp++;
                    break;
            }

            nodeView.parent = this.nodeParent;
            nodeView.position = pos;
            nodeView.getComponent(cc.Sprite).spriteFrame = this.sfDots[item];

            //set gia tri
            this.lbEven.string = this.even;
            this.lbFourUp.string = this.fourUp;
            this.lbFourDown.string = this.fourDown;

            this.lbOdd.string = this.odd;
            this.lbThreeUp.string = this.threeUp;
            this.lbThreeDown.string = this.threeDown;
        },

        resetDraw: function () {
            //xoa cac node con
            this.contentDraw.removeAllChildren();
            var children = this.nodeParent.children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.nodeParent.removeChild(children[i]);
            }
        },
        
        // hideClicked: function () {
        //     this.animation.play('xxHideSoiCau');
        // },
        
        // showClicked: function () {
        //     this.animation.play('xxShowSoiCau');
        // },
        drawPage2: function(data1) {
            this.data2 = data1;
            var startPosX = -119;
            var startPosY = 106;
            var spacingX = 18.3;
            var spacingY = 18.3;
    
            this.contentDraw.removeAllChildren();
            var data = [];
            var curData = [];
            if(data1){
            var count = data1.length;
            var countTai = 0;
            var countXiu = 0;
            //thong ke 1
            if (count > 1) {
                var dices = data1[0];
                var isChan = dices == 0 || dices == 2 || dices == 4;
                var maxItem = 5;
                for (var i = count ; i >= 0; i--) {
                    dices = data1[i];
                    var _isChan = dices == 0 || dices == 2 || dices == 4;
                    if (_isChan !== isChan) {
                        if (curData.length > maxItem) {
                            curData.splice(0, curData.length - maxItem);
                        }
                        data.push(curData);
                        if (isChan) {
                            countTai += curData.length;
                        } else {
                            countXiu += curData.length;
                        }
    
                        isChan = _isChan;
                        curData = [];
                        curData.push(dices);
                    } else {
                        curData.push(dices);
                        if (curData.length > maxItem) {
                            curData.splice(0, curData.length - maxItem);
                            data.push(curData);
                            curData = [];
                            curData.push(dices);
                        }
                    }
                    
                    if (i === 0) {
                        if (curData.length > maxItem) {
                            curData.splice(0, curData.length - maxItem);
                        }
                        data.push(curData);
                        
                    }
                    if (isChan) {
                        countTai += curData.length;
                    } else {
                        countXiu += curData.length;
                    }
                }
            }
            
            if (data.length > 17) {
                data.splice(0,data.length - 17);
            }
            //this.lblTai1.string = countTai + "";
            //this.lblXiu1.string = countXiu + "";
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].length; j++) {
                    let score = data[i][j];
                    let icon = null;
                    if (score % 2 == 0) {
                        icon = cc.instantiate(this.iconSoiCauChanTemplate);
                        icon.children[0].color = cc.Color.WHITE;
                    }
                    else {
                        icon = cc.instantiate(this.iconSoiCauLeTemplate);
                    }
                    icon.parent = this.contentDraw;
                    icon.setPosition(cc.v2(startPosX + spacingX * i, startPosY - spacingY * j));
                    icon.children[0].getComponent(cc.Label).string = "" + score;
                    if (i == data.length - 1 && j == data[i].length - 1) {
                        cc.tween(icon).then(cc.blink(10.0, 20)).start();
                    }
                }
                
            }
            }
        },
        draw3:function(data){
            //thong ke 2
            if(data){
            this.data2 = data;
            var startPosX = -119;
            var startPosY = 116;
            var spacingX = 36.5;
            var spacingY = 26.5;
            this.contentDraw.removeAllChildren(true);
            var data3 = [];
            var curData2 = [];
            var maxItem = 4;
            // if (data.length > 36) {
            //     data.splice(0,35);
            // }
            
            for (var i = 0; i < 36; i++) {
                curData2.push(data[i]);
                if (curData2.length == maxItem) {
                    data3.push(curData2);
                    curData2 = [];
                }
                
            }
            
            //console.log(data2);
            data3 = data3.reverse();
            for (let i = 0; i < 9; i++) {
                if (i % 2 != 0) {                   
                    for (let j = 0; j < data3[i].length; j++) {
                        let score = data3[i][j];
                        let icon = null;
                        if (score % 2 == 0) {
                            icon = cc.instantiate(this.iconSoiCauChanTemplate1);
                            icon.children[0].color = cc.Color.WHITE;
                        }
                        else {
                            icon = cc.instantiate(this.iconSoiCauLeTemplate2);
                            
                        }
                        icon.parent = this.contentDraw;
                        icon.setPosition(cc.v2(startPosX + spacingX * i, startPosY - spacingY * j));
                        icon.children[0].getComponent(cc.Label).string = "" + score;
                    }
                }
                else{
                    for (let j = data3[i].length -1; j >= 0; j--) {
                        let score = data3[i][j];
                        let icon = null;
                        if (score % 2 == 0) {
                            icon = cc.instantiate(this.iconSoiCauChanTemplate1);
                            icon.children[0].color = cc.Color.WHITE;
                        }
                        else {
                            icon = cc.instantiate(this.iconSoiCauLeTemplate2);
                        }
                        icon.parent = this.contentDraw;
                        icon.setPosition(cc.v2(startPosX + spacingX * i, startPosY - spacingY * (3-j)));
                        icon.children[0].getComponent(cc.Label).string = "" + score;
                    }
                }
                
            }
            }
        }
    });
}).call(this);
