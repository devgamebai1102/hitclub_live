/**
 * Created by Welcome on 5/28/2019.
 */

const players = require('PlayerData').players;

(function () {
    cc.XXLivestreamInputView = cc.Class({
        "extends": cc.Component,
        properties: {

            btnBetVals: [cc.Button],
            btnChips: [cc.Button],

            btnX2: cc.Button,
            btnRepeat: cc.Button,

            spriteNan: cc.Sprite,

            //totalBet các cửa
            lbTotalBets: [cc.Label],

            //totalBet các cửa của user
            lbTotalUserBets: [cc.Label],
            //scrollChip: cc.ScrollView
        },

        onLoad: function () {
            cc.XXLivestreamController.getInstance().setXXLivestreamInputView(this);
            this.percentScroll = 0;
            //this.scrollChip.scrollToPercentHorizontal(this.percentScroll, 0.1);
            //danh dau che do Nan
            // this.isNan = false;
            // cc.XXLivestreamController.getInstance().setIsNan(this.isNan);

            this.nodeChipPress = [];
            var self = this;
            this.btnChips.forEach(function (btnChip) {
                self.nodeChipPress.push(btnChip.node.getChildByName('choose'));
            });

            //toa do X, Y tu min -> max cac o BET theo thu tu
            //4 3 0 1
            //5     2

            this.minXs = [150, 220, 30, -310, -360,-160];
            this.maxXs = [310, 350, 170,  -150, -210,-25];
            this.minYs = [-15, -180, -180, -15, -180, -180];
            this.maxYs = [30, -140, -140, 30, -140, -140];

            //vi tri dealer
            this.rootDealerPos = cc.v2(0, 136);

            //index chip
            this.chipIndex = 1;

            //mang cac gia tri Bet (map voi button)
            //this.betVals = [1000,5000,10000, 50000,100000,500000,1000000];
            this.betVals = [1000000,500000,100000,50000,10000,5000,1000];
           // this.processBetValUI();

            //reset lastBetData
            cc.XXLivestreamController.getInstance().setLastBetData(null);

            //reset totalBetUI
            this.resetTotalBetUI();

            //thoi gian giua cac lan dat (minisecond)
            this.timePerBet = 100;

            this.currentState = -1;

            //arr timeout reBet
            this.timeouts = [];

            //Vi tri cua groupUser
            this.posGroupUser = cc.v2(675, -200);

           // this.initGateChip();
            cc.XXLivestreamController.getInstance().initLogBet();
        },
        initGateChip: function () {
            //Chip cua tung gate
            this.gateChips = [];
            //Khoi tao gateChip tung cua
            for (let i = 1; i <= 6; i++) {
                this.gateChips[i] = [];
            }
        },

        //HubOn - PlayerBet
        playerBet: function (info) {
            //dam bao joinGame xong moi xu ly - tranh loi server neu bi
            var accID = info[0];
                var amount = info[1];
                var gate = info[2];
                var chip = info[3];

                //cc.XXLivestreamController.getInstance().updateChip(accID, chip);

                // this.playFxUserBet(
                //     cc.XXLivestreamController.getInstance().getIndexUIBetByAccID(accID),
                //     gate,
                //     this.getChipIndexFromValue(amount),
                //     true
                // );

                //them tong dat o cac cua
                this.totalBets[gate - 1] += amount;
                this.lbTotalBets[gate - 1].string = cc.Tool.getInstance().formatMoney(this.totalBets[gate - 1]);

                //them tong dat o cac cua (cua user)
                if (accID === cc.LoginController.getInstance().getUserId()) {
                    cc.XXLivestreamController.getInstance().setLogBet({
                        'AccountID': accID,
                        'Amount': amount,
                        'Gate': gate
                    });
                    this.totalUserBets[gate - 1] += amount;
                    this.lbTotalUserBets[gate - 1].string = cc.Tool.getInstance().formatNumber(this.totalUserBets[gate - 1]);
                    this.lbTotalUserBets[gate - 1].node.parent.active = true;
                    cc.XXLivestreamController.getInstance().updateChip(accID,chip);
                    cc.XXLivestreamController.getInstance().updateTotalBetUser(amount);
                    cc.DDNA.getInstance().betSummary(cc.DDNAGame.XOC_DIA_LIVESTREAM, amount, cc.XXLivestreamController.getInstance().getSID());
                }
        },

        reBet: function (betLog, isX2) {
            var self = this;
            var totalBet = 0;

            //tinh truoc tong tien de kiem tra balance
            //duyet qua cac luot bet
            betLog.forEach(function (bet) {
                totalBet += bet.Amount;
            });
            if (isX2) {
                totalBet *= 2;
            }

            // console.log('reBet totalBet: ' + totalBet);
            // console.log('reBet Số dư: ' + cc.BalanceController.getInstance().getBalance());

            //kiem tra so du du ko? -> ko đủ return luôn
            if (totalBet > cc.BalanceController.getInstance().getBalance()) {
                cc.PopupController.getInstance().showMessageUnderWebview('Số dư không đủ.');
                return;
            }

            //GỘP CHIP BET LẠI

            //tính tông số chip đặt các cửa
            var ODD = 0;
            var THREE_UP = 0;
            var THREE_DOWN = 0;
            var EVEN = 0;
            var FOUR_UP = 0;
            var FOUR_DOWN = 0;
            //duyet qua cac luot bet
            betLog.forEach(function (bet) {
                switch (bet.Gate) {
                    case cc.XXLivestreamGate.ODD:
                        ODD += bet.Amount;
                        break;
                    case cc.XXLivestreamGate.THREE_UP:
                        THREE_UP += bet.Amount;
                        break;
                    case cc.XXLivestreamGate.THREE_DOWN:
                        THREE_DOWN += bet.Amount;
                        break;
                    case cc.XXLivestreamGate.EVEN:
                        EVEN += bet.Amount;
                        break;
                    case cc.XXLivestreamGate.FOUR_UP:
                        FOUR_UP += bet.Amount;
                        break;
                    case cc.XXLivestreamGate.FOUR_DOWN:
                        FOUR_DOWN += bet.Amount;
                        break;
                }
            });
            var bet1M = 0; //đếm số bet
            var bet500K = 0; //đếm số bet
            var bet100K = 0; //đếm số bet
            var bet50K = 0; //đếm số bet
            var bet10K = 0; //đếm số bet
            var bet5K = 0; //đếm số bet
            var bet1K = 0; //đếm số bet
            var bet500 = 0; //đếm số bet
            var bet100 = 0; //đếm số bet

            //tổng số chip đặt các cửa
            var gates = [ODD, THREE_UP, THREE_DOWN, EVEN, FOUR_UP, FOUR_DOWN];
            //luu lai gia tri Bet da toi uu
            var bets = [];

            for (var i = 0; i < 6; i++) {
                bet1M = 0; //đếm số bet
                bet500K = 0; //đếm số bet
                bet100K = 0; //đếm số bet
                bet50K = 0; //đếm số bet
                bet10K = 0; //đếm số bet
                bet5K = 0; //đếm số bet
                bet1K = 0; //đếm số bet
                bet500 = 0; //đếm số bet
                bet100 = 0; //đếm số bet

                totalBet = gates[i];
                if (isX2) {
                    totalBet *= 2;
                }
                // console.log('totalBet: ', totalBet);
                if (totalBet > 0) {
                    bet1M = Math.floor(totalBet / 1000000);
                    // console.log('bet1M: ' + bet1M, i);
                    totalBet = totalBet - (bet1M * 1000000);
                }
                if (totalBet > 0) {
                    bet500K = Math.floor(totalBet / 500000);
                    // console.log('bet500K: ' + bet500K, i);
                    totalBet = totalBet - (bet500K * 500000);
                }
                

                if (totalBet > 0) {
                    bet100K = Math.floor(totalBet / 100000);
                    // console.log('bet100K: ' + bet100K, i);
                    totalBet = totalBet - (bet100K * 100000);
                }
                if (totalBet > 0) {
                    bet50K = Math.floor(totalBet / 50000);
                    // console.log('bet50K: ' + bet50K, i);
                    totalBet = totalBet - (bet50K * 50000);
                }

                if (totalBet > 0) {
                    bet10K = Math.floor(totalBet / 10000);
                    // console.log('bet10K: ' + bet10K, i);
                    totalBet = totalBet - (bet10K * 10000);
                }

                if (totalBet > 0) {
                    bet5K = Math.floor(totalBet / 5000);
                    // console.log('bet5K: ' + bet5K, i);
                    totalBet = totalBet - (bet5K * 5000);
                }

                if (totalBet > 0) {
                    bet1K = Math.floor(totalBet / 1000);
                    // console.log('bet1K: ' + bet1K, i);
                }
                if (totalBet > 0) {
                    bet500 = Math.floor(totalBet / 500);
                    // console.log('bet500: ' + bet500, i);
                    totalBet = totalBet - (bet500 * 500);
                }

                if (totalBet > 0) {
                    bet100 = Math.floor(totalBet / 100);
                    // console.log('bet100: ' + bet100, i);
                }

                for (var j = 0; j < bet1M; j++) {
                    bets.push({
                        'Gate': i + 1,
                        'Amount': 1000000,
                    });
                }

                for (var j = 0; j < bet500K; j++) {
                    bets.push({
                        'Gate': i + 1,
                        'Amount': 500000,
                    });
                }

                for (j = 0; j < bet100K; j++) {
                    bets.push({
                        'Gate': i + 1,
                        'Amount': 100000,
                    });
                }
                for (var j = 0; j < bet50K; j++) {
                    bets.push({
                        'Gate': i + 1,
                        'Amount': 50000,
                    });
                }

                for (j = 0; j < bet10K; j++) {
                    bets.push({
                        'Gate': i + 1,
                        'Amount': 10000,
                    });
                }

                for (j = 0; j < bet5K; j++) {
                    bets.push({
                        'Gate': i + 1,
                        'Amount': 5000,
                    });
                }

                for (j = 0; j < bet1K; j++) {
                    bets.push({
                        'Gate': i + 1,
                        'Amount': 1000,
                    });
                }
                for (j = 0; j < bet500; j++) {
                    bets.push({
                        'Gate': i + 1,
                        'Amount': 500,
                    });
                }

                for (j = 0; j < bet100; j++) {
                    bets.push({
                        'Gate': i + 1,
                        'Amount': 100,
                    });
                }
            }

            this.count = 0;
            //duyet qua cac luot bet

            this.timeouts = [];
            bets.forEach(function (bet) {
                self.timeouts.push(
                    setTimeout(function () {
                        if (self.currentState === cc.XXLivestreamState.BETTING) {
                            self.sendRequestReBet(bet);
                        }
                    }, self.timePerBet * self.count)
                );

                self.count++;
            });

        },

        sendRequestReBet: function (bet) {
            //kiem tra so du
            if (cc.BalanceController.getInstance().getBalance() < bet.Amount) {
                cc.PopupController.getInstance().showMessageUnderWebview('Số dư không đủ');
                return;
            } else {
                //send request
                cc.XXLivestreamController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, bet.Amount, bet.Gate);
            }
        },

        showLastInput: function (info) {
            // console.log('XXInput showLastInput');
            var self = this;
            var betLogs = info;
            //duyet qua betLog của tat ca player
            betLogs.forEach(function (betLog) {
                //duyet qua cac luot bet cua player
                betLog.forEach(function (bet) {
                    // self.playFxUserBet(
                    //     cc.XXLivestreamController.getInstance().getIndexUIBetByAccID(bet.AccountID),
                    //     bet.BetSide,
                    //     self.getChipIndexFromValue(bet.BetValue),
                    //     false
                    // );

                    //them tong dat o cac cua
                    self.totalBets[bet.BetSide - 1] += bet.BetValue;
                    self.lbTotalBets[bet.BetSide - 1].string = cc.Tool.getInstance().formatMoney(self.totalBets[bet.BetSide - 1]);

                    //them tong dat o cac cua (cua user)
                    if (bet.AccountID === cc.LoginController.getInstance().getUserId()) {
                        cc.XXLivestreamController.getInstance().setLogBet({
                            'AccountID': bet.AccountID,
                            'Amount': bet.BetValue,
                            'Gate': bet.BetSide
                        });
                        self.totalUserBets[bet.BetSide - 1] += bet.BetValue;
                        self.lbTotalUserBets[bet.BetSide - 1].string = cc.Tool.getInstance().formatNumber(self.totalUserBets[bet.BetSide - 1]);
                        self.lbTotalUserBets[bet.BetSide - 1].node.parent.active = true;
                    }
                })
            });
        },


        //lay ve player bet
        getPlayerBets: function () {
            return players;
        },

        //lay ve index loai Chip bet
        getChipIndexFromValue: function (betVal) {
            var index = 0;
            var length = this.betVals.length;
            for (var i = 0; i < length; i++) {
                if (betVal === this.betVals[i]) {
                    index = i;
                    break;
                }
            }
            return index;
        },

        //tat/bat cac button chuc nang
        activeAllButtonBet: function (enable) {
            this.btnBetVals.forEach(function (btnBet) {
                btnBet.interactable = enable;
            });

            this.btnX2.interactable = enable;
            this.btnRepeat.interactable = enable;
        },

        //button bet val đang chon ko click duoc
        processBetValUI: function () {
            // for (var i = 0; i < 3; i++) {
            //     this.btnChips[i].interactable = true;
            //     this.nodeChipPress[i].active = false;
            // }

            // this.btnChips[this.chipIndex].interactable = false;
            // this.nodeChipPress[this.chipIndex].active = true;
            // cc.tween(this.nodeChipPress[this.chipIndex])
            //                 .repeatForever(
            //                     cc.tween().sequence(
            //                         cc.tween().to(0.3, { scale: 1.1 }, { easing: cc.easing.sineOut }),
            //                         cc.tween().to(0.3, { scale: 0.9 }, { easing: cc.easing.sineOut })))
            //                 .start();
         },

        //reset mang chip cac player
        resetInput: function () {
            // console.log('XXInput resetInput');
            players.forEach(function (player) {
                player.chips = [];
            });
        },

        clearAllTimeOut: function () {
            this.timeouts.forEach(function (timeOut) {
                clearTimeout(timeOut);
            });
            this.timeouts = [];
        },

        resetTotalBetUI: function () {
            this.totalBets = [0, 0, 0, 0, 0, 0];
            this.totalUserBets = [0, 0, 0, 0, 0, 0];

            this.lbTotalBets.forEach(function (lbTotalBet) {
                lbTotalBet.string = '';
            });

            this.lbTotalUserBets.forEach(function (lbTotalUserBet) {
                lbTotalUserBet.string = '';
            });
        },
        betOfAccount: function (data) {

        },
        //save lai du lieu last bet
        saveLastBetData: function () {
            /*var betLog = [];
            var uID = cc.LoginController.getInstance().getUserId();
            var player = players[0];
            // chipItem.betIndex = betIndex;
            // chipItem.gate = gate;
            // chipItem.playerId = playerId;
            var self = this;
            player.chips.forEach(function (chip) {
                betLog.push(
                    {
                        'AccountID': uID,
                        'Amount': self.betVals[chip.chipIndex],
                        'Gate': chip.gate
                    }
                );
            });*/
            let logBet = [...cc.XXLivestreamController.getInstance().getLogBet()];

            cc.XXLivestreamController.getInstance().setLastBetData(logBet);
        },

        updateInput: function (state) {
            //check state de xu ly hien thi
            switch (state) {
                //giai doan dat cuoc
                case cc.XXLivestreamState.BETTING: //54
                    if (this.currentState !== state) {
                        this.clearAllTimeOut();
                        this.resetInput();
                        this.resetTotalBetUI();
                        this.activeAllButtonBet(true);
                    }

                    break;
                //giai doan mo bat
                case cc.XXLivestreamState.OPEN_PLATE:
                    if (this.currentState !== state) {
                        this.clearAllTimeOut();
                        this.activeAllButtonBet(false);
                        this.saveLastBetData();
                    }
                    break;

                //giai doan ket qua
                case cc.XXLivestreamState.SHOW_RESULT: //15
                    if (this.currentState !== state) {
                        this.activeAllButtonBet(false);
                    }
                    break;

                //giai doan cho phien moi
                case cc.XXLivestreamState.WAITING:
                    if (this.currentState !== state) {
                        this.resetTotalBetUI();
                        this.resetInput();
                        this.activeAllButtonBet(false);
                        //Khoi tao logBet moi
                        cc.XXLivestreamController.getInstance().initLogBet();
                    }
                    break;
                //xoc dia
                case cc.XXLivestreamState.SHAKING:
                    if (this.currentState !== state) {
                        this.resetTotalBetUI();
                        this.resetInput();
                        this.activeAllButtonBet(false);
                    }
                    break;
            }

            //luu lai state hien tai
            this.currentState = state;
        },
        //Lay danh sach chip tung gate
        // getGateChips: function () {
        //     return this.gateChips;
        // },
        //hieu ung chip khi 1 user bet
        // playFxUserBet: function (playerId, gate, chipIndex, isMove) {
        //     cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_BET);

        //     var betIndex = gate - 1;
        //     var minX = this.minXs[betIndex];
        //     var maxX = this.maxXs[betIndex];
        //     var minY = this.minYs[betIndex];
        //     var maxY = this.maxYs[betIndex];

        //     var x = minX + Math.floor(Math.random() * (Math.abs(maxX - minX)));
        //     var y = minY + Math.floor(Math.random() * (Math.abs(maxY - minY)));

        //     //var nodeChip = cc.XXLivestreamController.getInstance().createChip();
        //     //nodeChip.parent = this.nodeParentChip;

        //     let nodePosition = null;
        //     if (playerId != -1) {
        //         nodePosition = players[playerId].position;
        //     } else {
        //         nodePosition = this.posGroupUser;
        //     }
        //     nodeChip.position = nodePosition;//players[playerId].position;

        //     var chipItem = nodeChip.getComponent(cc.XXChipItem);
        //     //set vi tri bet
        //     chipItem.betIndex = betIndex;
        //     chipItem.gate = gate;
        //     chipItem.playerId = playerId;
        //     chipItem.position = nodePosition;

        //     //players[playerId].chips.push(chipItem);

        //     chipItem.setChip(chipIndex);

        //     if (isMove) {
        //         chipItem.moveTo(cc.v2(x, y));
        //     } else {
        //         chipItem.setPosition(cc.v2(x, y));
        //     }
        //     //Push chipItem vao mang
        //     this.gateChips[gate].push(chipItem);
        // },

        //hieu ung chip bay tu dealer -> ra ban
        playFxDealerPay: function (chipBet) {
            // var self = this;

            // //var nodeChip = cc.XXLivestreamController.getInstance().createChip();
            // //nodeChip.parent = self.nodeParentChip;
            // //nodeChip.position = self.rootDealerPos; //vi tri dealer
            // var chipItem = nodeChip.getComponent(cc.XXChipItem);
            // chipItem.betIndex = chipBet.betIndex;
            // chipItem.playerId = chipBet.playerId;
            // chipItem.position = chipBet.position;
            // //set loai chip theo ChipIndex luc bet
            // chipItem.setChip(chipBet.chipIndex);
            // this.gateChips[chipBet.gate].push(chipItem);

            // //push chung chip pay vao chip bet
            // //players[chipBet.playerId].chips.push(chipItem);

            // //di chuyen den vi tri chip dang bet
            // var indexBet = chipBet.betIndex;
            // var minX = self.minXs[indexBet];
            // var maxX = self.maxXs[indexBet];
            // var minY = self.minYs[indexBet];
            // var maxY = self.maxYs[indexBet];

            // var x = minX + Math.floor(Math.random() * (Math.abs(maxX - minX)));
            // var y = minY + Math.floor(Math.random() * (Math.abs(maxY - minY)));

            // chipItem.moveTo(cc.v2(x, y));

        },

        //hieu ung chip bay tu ban -> den nguoi choi win
        playFxPay: function (chipBet) {
            // let positionEnd = null;
            // if(chipBet.playerId != -1) {
            //     positionEnd = players[chipBet.playerId].position
            // }else {
            //     positionEnd = this.posGroupUser;
            // }
            //chipBet.moveToEnd(players[chipBet.playerId].position);
            //chipBet.moveToEnd(chipBet.position);
        },

        //hieu ung chip bay tu ban -> ve dealer
        playFxLost: function (chipBet) {
            //chip bet -> bay ve dealer
            //chipBet.moveToEnd(this.rootDealerPos);

            // var self = this;
            // var chipBets = players[playerId].chips;
            // chipBets.forEach(function (chipBet) {
            //     //chip bet -> bay ve dealer
            //     chipBet.moveToEnd(self.rootDealerPos);
            // });
        },

        //chon muc bet
        betValueClicked: function (event, data) {
            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_SELECT);
            this.chipIndex = parseInt(data.toString());
            this.processBetValUI();
        },

        //dat cua
        betClicked: function (event, data) {
            if (cc.XXLivestreamController.getInstance().getTime() <= 3) {
                cc.PopupController.getInstance().showMessageUnderWebview('Đã hết thời gian đặt cửa.');
                cc.XXLivestreamController.getInstance().activeAllButtonBet(false);
                return;
            }

            this.indexBet = parseInt(data.toString());
            var betVal = this.betVals[this.chipIndex];
            //var betVal = 200000;

            //kiem tra so du
            console.log(cc.BalanceController.getInstance().getBalance(),betVal);
            if (cc.BalanceController.getInstance().getBalance() < betVal) {
                cc.PopupController.getInstance().showMessageUnderWebview('Số dư không đủ');
                return;
            } else {
                //send request
                cc.XXLivestreamController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, betVal, this.indexBet + 1);
                //dat -> tat luon nut X2 + reBet
                this.btnX2.interactable = false;
                this.btnRepeat.interactable = false;
            }
        },

        //tat/bat che do Nan
        // nanClicked: function () {
        //     this.isNan = !this.isNan;
        //     if (this.isNan) {
        //         this.spriteNan.spriteFrame = cc.XXLivestreamController.getInstance().getNans()[0];
        //     } else {
        //         this.spriteNan.spriteFrame = cc.XXLivestreamController.getInstance().getNans()[1];
        //     }

        //     cc.XXLivestreamController.getInstance().setIsNan(this.isNan);
        // },

        x2Clicked: function () {
            if (cc.XXLivestreamController.getInstance().getTime() <= 3) {
                cc.PopupController.getInstance().showMessageUnderWebview('Đã hết thời gian đặt cửa.');
                cc.XXLivestreamController.getInstance().activeAllButtonBet(false);
                return;
            }

            var lastBetData = cc.XXLivestreamController.getInstance().getLastBetData();
            if (lastBetData && lastBetData.length > 0) {
                this.reBet(lastBetData, true);
                this.btnX2.interactable = false;
                this.btnRepeat.interactable = false;
            } else {
                cc.PopupController.getInstance().showMessageUnderWebview('Không có dữ liệu đặt của phiên trước.');
            }
        },

        repeatClicked: function () {
            if (cc.XXLivestreamController.getInstance().getTime() <= 3) {
                cc.PopupController.getInstance().showMessageUnderWebview('Đã hết thời gian đặt cửa.');
                cc.XXLivestreamController.getInstance().activeAllButtonBet(false);
                return;
            }

            var lastBetData = cc.XXLivestreamController.getInstance().getLastBetData();
            if (lastBetData && lastBetData.length > 0) {
                this.reBet(lastBetData);
                this.btnX2.interactable = false;
                this.btnRepeat.interactable = false;
            } else {
                cc.PopupController.getInstance().showMessageUnderWebview('Không có dữ liệu đặt của phiên trước.');
            }
        },

        //clear all chip
        clearAllChip: function() {
            // this.nodeParentChip.removeAllChildren(true);
        },
        // onBtnScrollLeft() {
        //     this.percentScroll -= 0.3;
        //     if (this.percentScroll <= 0) this.percentScroll = 0;
    
        //     this.scrollChip.scrollToPercentHorizontal(this.percentScroll, 0.1);
        // },
    
        // onBtnScrollRight() {
        //     this.percentScroll += 0.3;
        //     if (this.percentScroll >= 1) this.percentScroll = 1;
        //     this.scrollChip.scrollToPercentHorizontal(this.percentScroll, 0.1);
        // },
        scrollEvent(event,data){
            //console.log(event);
        }
    });
}).call(this);
