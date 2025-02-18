/*
 * Generated by BeChicken
 * on 9/27/2019
 * version v1.0
 */
(function () {
    cc.BacaratCardView = cc.Class({
        extends: cc.Component,
        properties: {
            lstPlayerCard: [cc.Node],
            lbScorePlayer: cc.Label,
            lstBankerCard: [cc.Node],
            lbScoreBanker: cc.Label
        },
        onLoad: function () {
            cc.BacaratController.getInstance().setCardView(this);
            this.playerCard1Item = this.lstPlayerCard[0].getComponent('BacaratCardItem');
            this.playerCard2Item = this.lstPlayerCard[1].getComponent('BacaratCardItem');
            this.playerCard3Item = this.lstPlayerCard[2].getComponent('BacaratCardItem');

            this.bankerCard1Item = this.lstBankerCard[0].getComponent('BacaratCardItem');
            this.bankerCard2Item = this.lstBankerCard[1].getComponent('BacaratCardItem');
            this.bankerCard3Item = this.lstBankerCard[2].getComponent('BacaratCardItem');

            this.nodeParentLbScorePlayer = this.lbScorePlayer.node.parent;
            this.nodeParentLbScoreBanker = this.lbScoreBanker.node.parent;

            this.resetLayoutCard();

            //Khoi tao rotation cho playerCard3, bankerCard3
            this.playerRotate = -90;
            this.bankerRotate = 90;
            //Khoi tao vi tri ban dau cac quan bai
            this.rootCardsPos = this.initRootPositionCards();
        },
        activeNodeScore: function (isActive) {
            this.nodeParentLbScorePlayer.active = isActive;
            this.nodeParentLbScoreBanker.active = isActive;
        },
        activeNodeCards: function (isActive) {
            this.playerCard1Item.node.active = isActive;
            this.playerCard2Item.node.active = isActive;
            this.playerCard3Item.node.active = isActive;

            this.bankerCard1Item.node.active = isActive;
            this.bankerCard2Item.node.active = isActive;
            this.bankerCard3Item.node.active = isActive;

        },
        resetLayoutCard: function () {
            this.activeNodeCards(false);
            this.activeNodeScore(false);
        },
        initRootPositionCards: function () {
            let rootPlayerCardPos = [];
            let rootBankerCardPos = [];
            this.lstPlayerCard.map(node => {
                rootPlayerCardPos.push(node.position);
            });
            this.lstBankerCard.map(node => {
                rootBankerCardPos.push(node.position);
            });
            return {playerCardPos: rootPlayerCardPos, bankerCardPos: rootBankerCardPos};
        },
        showScoreSide: function (dataScore) {
            let result = dataScore.Result;
            this.activeNodeCards(true);
            this.lbScorePlayer.string = dataScore.Result.HandValuePlayer;
            this.lbScoreBanker.string = dataScore.Result.HandValueBanker;
        },
        //Hien thi score theo thu tu
        showScoreArr: function (data) {
            let playerData = data.player;
            let bankerData = data.banker;
            this.activeNodeScore(true);
            this.lbScorePlayer.string = this.calculateScore(playerData);
            this.lbScoreBanker.string = this.calculateScore(bankerData);

            // this.lbScorePlayer.node.getComponent(cc.Animation).play('score');
            // this.lbScoreBanker.node.getComponent(cc.Animation).play('score');
        },
        //Tinh toan diem tung ben
        calculateScore: function (sideData) {
            let score = 0;
            sideData.map(ordinal => {
                let number = (ordinal - 1) % 13 + 1;
                number = (number >= 10) ? 0 : number;
                score += number;
            });
            //Neu score > 10 thi lay
            if (score >= 10) {
                return score.toString().split('')[1];
            }
            return score;
        },
        initCardOnTable: function () {
            let playerCardsPos = this.rootCardsPos.playerCardPos;
            let bankerCardsPos = this.rootCardsPos.bankerCardPos;
            this.resetCard();
            this.playerCard1Item.setPosition(playerCardsPos[0]);
            this.playerCard2Item.setPosition(playerCardsPos[1]);
            this.bankerCard1Item.setPosition(bankerCardsPos[0]);
            this.bankerCard2Item.setPosition(bankerCardsPos[1]);
        },
        resetCard: function () {
            this.playerCard1Item.initValue(-1);
            this.playerCard2Item.initValue(-1);
            this.playerCard3Item.initValue(-1);

            this.bankerCard1Item.initValue(-1);
            this.bankerCard2Item.initValue(-1);
            this.bankerCard3Item.initValue(-1);

        },
        //Chia bai trong luc dat cuoc
        slideCardOnBet: function () {
            let playerCardsPos = this.rootCardsPos.playerCardPos;
            let bankerCardsPos = this.rootCardsPos.bankerCardPos;

            //reset bai
            this.resetCard();

            if (!cc.game.isPaused()) {
                //Chia la bai 1 player
                cc.director.getScheduler().schedule(function () {
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.OPEN_CARD);
                    this.playerCard1Item.moveTo(playerCardsPos[0]);
                }, this, 0, 0, 0, false);

                // Chia la bai 1 banker
                cc.director.getScheduler().schedule(function () {
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.OPEN_CARD);
                    this.bankerCard1Item.moveTo(bankerCardsPos[0]);
                }, this, 0, 0, 0.3, false);

                //Chia la bai 2 player
                cc.director.getScheduler().schedule(function () {
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.OPEN_CARD);
                    this.playerCard2Item.moveTo(playerCardsPos[1]);
                }, this, 0, 0, 0.6, false);
                //Chia la bai 2 banker
                cc.director.getScheduler().schedule(function () {
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.OPEN_CARD);
                    this.bankerCard2Item.moveTo(bankerCardsPos[1]);
                }, this, 0, 0, 0.9, false);
            } else {
                this.playerCard1Item.setPosition(playerCardsPos[0]);
                this.playerCard2Item.setPosition(playerCardsPos[1]);
                this.bankerCard1Item.setPosition(bankerCardsPos[0]);
                this.bankerCard2Item.setPosition(bankerCardsPos[1]);
            }
        },
        //Chia bai
        onSlideCard: function (dataCard) {
            let resultCard = dataCard.Result;
            let gateData = resultCard.GateData;
            let ordinalPlayerCard1 = resultCard.PlayerCard1;
            let ordinalPlayerCard2 = resultCard.PlayerCard2;
            let ordinalPlayerCard3 = resultCard.PlayerCard3;

            let ordinalBankerCard1 = resultCard.BankerCard1;
            let ordinalBankerCard2 = resultCard.BankerCard2;
            let ordinalBankerCard3 = resultCard.BankerCard3;

            //Time cho hien thi side win
            let timeWait = 1.5;
            if (ordinalPlayerCard3 != 0 && ordinalBankerCard3 != 0) {
                timeWait = 7;
            }
            if (ordinalPlayerCard3 != 0 && ordinalBankerCard3 == 0) {
                timeWait = 5;
            }
            if (ordinalPlayerCard3 == 0 && ordinalBankerCard3 != 0) {
                timeWait = 5.5;
            }

            cc.director.getScheduler().schedule(function () {
                var result = cc.BacaratController.getInstance().getWinResult();
                if (result) {
                    cc.BacaratController.getInstance().winResult(result);
                }

                var vipResult = cc.BacaratController.getInstance().getWinVipResult();
                if (vipResult) {
                    cc.BacaratController.getInstance().winResultVip(vipResult);
                }
            }, this, 0, 0, timeWait + 4.8, false);


            let playerCardsPos = this.rootCardsPos.playerCardPos;
            let bankerCardsPos = this.rootCardsPos.bankerCardPos;
            //Check TH vao game luc hien thi ket qua
            if (!this.playerCard1Item.node.active) {
                this.initCardOnTable();
            }

            //reset trang thai ban dau
            this.playerCard1Item.updateOrdinal(ordinalPlayerCard1);
            this.playerCard2Item.updateOrdinal(ordinalPlayerCard2);
            this.playerCard3Item.updateOrdinal(ordinalPlayerCard3);

            this.bankerCard1Item.updateOrdinal(ordinalBankerCard1);
            this.bankerCard2Item.updateOrdinal(ordinalBankerCard2);
            this.bankerCard3Item.updateOrdinal(ordinalBankerCard3);


            if (!cc.game.isPaused()) {

                if (!cc.game.isPaused()) {
                    //Game Active
                    //Mo la bai 1
                    cc.director.getScheduler().schedule(function () {
                        this.playerCard1Item.animationShowCard();
                        this.bankerCard1Item.animationShowCard();
                        cc.director.getScheduler().schedule(function () {
                            //Hien thi diem
                            this.showScoreArr({
                                player: [ordinalPlayerCard1],
                                banker: [ordinalBankerCard1]
                            });
                        }, this, 0, 0, 0.5, false)

                    }, this, 0, 0, 0, false);

                    //Mo la bai 2
                    cc.director.getScheduler().schedule(function () {
                        this.playerCard2Item.animationShowCard();
                        this.bankerCard2Item.animationShowCard();
                        cc.director.getScheduler().schedule(function () {
                            //Hien thi diem
                            this.showScoreArr({
                                player: [ordinalPlayerCard1, ordinalPlayerCard2],
                                banker: [ordinalBankerCard1, ordinalBankerCard2]
                            });
                        }, this, 0, 0, 0.5, false);
                    }, this, 0, 0, 1, false);

                } else {
                    //Game Pause
                    this.playerCard1Item.forceShowCard(playerCardsPos[0]);
                    this.playerCard2Item.forceShowCard(playerCardsPos[1]);

                    this.bankerCard1Item.forceShowCard(bankerCardsPos[0]);
                    this.bankerCard2Item.forceShowCard(bankerCardsPos[1]);
                    this.showScoreArr({
                        player: [ordinalPlayerCard1, ordinalPlayerCard2],
                        banker: [ordinalBankerCard1, ordinalBankerCard2]
                    });
                }
                //Chia la bai 3 player
                if (ordinalPlayerCard3 != 0) {
                    if (!cc.game.isPaused()) {
                        //Game Active
                        cc.director.getScheduler().schedule(function () {
                            cc.AudioController.getInstance().playSound(cc.AudioTypes.OPEN_CARD);
                            this.playerCard3Item.moveTo(playerCardsPos[2]);
                        }, this, 0, 0, 2.5, false);

                        cc.director.getScheduler().schedule(function () {
                            this.playerCard3Item.animationShowCard(true);
                            cc.director.getScheduler().schedule(function () {
                                this.playerCard3Item.rotateCard(this.playerRotate);
                                //Hien thi diem
                                this.showScoreArr({
                                    player: [ordinalPlayerCard1, ordinalPlayerCard2, ordinalPlayerCard3],
                                    banker: [ordinalBankerCard1, ordinalBankerCard2]
                                });
                            }, this, 0, 0, 1, false);

                        }, this, 0, 0, 3.5, false);
                    } else {
                        //Game pause
                        this.playerCard3Item.forceShowCard(playerCardsPos[2], this.playerRotate);
                        this.showScoreArr({
                            player: [ordinalPlayerCard1, ordinalPlayerCard2, ordinalPlayerCard3],
                            banker: [ordinalBankerCard1, ordinalBankerCard2]
                        });
                    }
                } else {
                    this.playerCard3Item.reset();
                }

                //Chia la bai 3 banker
                if (ordinalBankerCard3 != 0) {
                    if (!cc.game.isPaused()) {
                        //Game Active
                        let timeWait2 = (ordinalPlayerCard3 != 0) ? 4.5 : 2.5;
                        cc.director.getScheduler().schedule(function () {
                            cc.AudioController.getInstance().playSound(cc.AudioTypes.OPEN_CARD);
                            this.bankerCard3Item.moveTo(bankerCardsPos[2]);
                        }, this, 0, 0, timeWait2, false);
                        cc.director.getScheduler().schedule(function () {
                            this.bankerCard3Item.animationShowCard(true);
                            cc.director.getScheduler().schedule(function () {
                                this.bankerCard3Item.rotateCard(this.bankerRotate);
                                //Hien thi diem
                                this.showScoreArr({
                                    player: [ordinalPlayerCard1, ordinalPlayerCard2, ordinalPlayerCard3],
                                    banker: [ordinalBankerCard1, ordinalBankerCard2, ordinalBankerCard3]
                                });
                            }, this, 0, 0, 1, false);

                        }, this, 0, 0, timeWait2 + 1, false);
                    } else {
                        //Game Pause
                        this.bankerCard3Item.forceShowCard(bankerCardsPos[2], this.bankerRotate);
                        this.showScoreArr({
                            player: [ordinalPlayerCard1, ordinalPlayerCard2, ordinalPlayerCard3],
                            banker: [ordinalBankerCard1, ordinalBankerCard2, ordinalBankerCard3]
                        });
                    }
                } else {
                    this.bankerCard3Item.reset();
                }
                if (!cc.game.isPaused()) {
                    cc.director.getScheduler().schedule(function () {
                        let lstGate = ["1", "2", "3", "4", "5"];
                        let lstWin = gateData.split(',');
                        let lstLose = lstGate.filter((gate) => !lstWin.includes(gate));
                        let isTie = lstWin.includes("" + cc.BacaratBetSite.TIE);
                        //Hien thi side thang
                        this.showGateWin(gateData);
                        //Thu chip
                        lstLose.map((gateLost) => {
                            gateLost = parseInt(gateLost);
                            cc.BacaratController.getInstance().getChipsLose(gateLost, isTie);
                        }, this);

                        cc.director.getScheduler().schedule(function () {
                            //Tra chip
                            lstWin.map(gateWin => {
                                gateWin = parseInt(gateWin);
                                cc.BacaratController.getInstance().refundChips(gateWin);
                            }, this);

                            //Kiem tra neu hoa thi tra chip ve cho user
                            if (isTie) {
                                cc.BacaratController.getInstance().refundChipsTie();
                            }
                        }, this, 0, 0, 2, false);

                    }, this, 0, 0, timeWait, false);
                } else {
                    cc.BacaratController.getInstance().clearAllChips();
                }

            } else {
                //Hien thi bai luon
                this.playerCard1Item.forceShowCard(playerCardsPos[0]);
                this.playerCard2Item.forceShowCard(playerCardsPos[1]);
                this.playerCard3Item.forceShowCard(playerCardsPos[2], this.playerRotate);

                this.bankerCard1Item.forceShowCard(bankerCardsPos[0]);
                this.bankerCard2Item.forceShowCard(bankerCardsPos[1]);
                this.bankerCard3Item.forceShowCard(bankerCardsPos[2], this.bankerRotate);
                //Hien thi diem
                this.showScoreArr({
                    player: [ordinalPlayerCard1, ordinalPlayerCard2, ordinalPlayerCard3],
                    banker: [ordinalBankerCard1, ordinalBankerCard2, ordinalBankerCard3]
                });
                this.showGateWin(gateData);
                //ClearPool
                cc.BacaratController.getInstance().clearPools();

            }
        },
        showGateWin: function (gateData) {
            let lstWin = gateData.split(',');
            lstWin.map(gateWin => {
                cc.BacaratController.getInstance().playAnimationWin(gateWin);
            }, this);
        },
        //Hien thi ket qua ngay
        forceShowResult: function (dataCard, timeEllapsed) {
            let resultCard = dataCard.Result;
            let gateData = resultCard.GateData;
            let ordinalPlayerCard1 = resultCard.PlayerCard1;
            let ordinalPlayerCard2 = resultCard.PlayerCard2;
            let ordinalPlayerCard3 = resultCard.PlayerCard3;

            let ordinalBankerCard1 = resultCard.BankerCard1;
            let ordinalBankerCard2 = resultCard.BankerCard2;
            let ordinalBankerCard3 = resultCard.BankerCard3;

            let playerCardsPos = this.rootCardsPos.playerCardPos;
            let bankerCardsPos = this.rootCardsPos.bankerCardPos;

            //reset trang thai ban dau
            this.playerCard1Item.initValue(ordinalPlayerCard1);
            this.playerCard2Item.initValue(ordinalPlayerCard2);
            this.playerCard3Item.initValue(ordinalPlayerCard3);

            this.bankerCard1Item.initValue(ordinalBankerCard1);
            this.bankerCard2Item.initValue(ordinalBankerCard2);
            this.bankerCard3Item.initValue(ordinalBankerCard3);

            //Hien thi bai
            this.playerCard1Item.forceShowCard(playerCardsPos[0]);
            this.playerCard2Item.forceShowCard(playerCardsPos[1]);
            this.playerCard3Item.forceShowCard(playerCardsPos[2], this.playerRotate);

            this.bankerCard1Item.forceShowCard(bankerCardsPos[0]);
            this.bankerCard2Item.forceShowCard(bankerCardsPos[1]);
            this.bankerCard3Item.forceShowCard(bankerCardsPos[2], this.bankerRotate);

            //Hien thi diem
            this.showScoreArr({
                player: [ordinalPlayerCard1, ordinalPlayerCard2, ordinalPlayerCard3],
                banker: [ordinalBankerCard1, ordinalBankerCard2, ordinalBankerCard3]
            });
            this.showGateWin(gateData);

            let lstGate = ["1", "2", "3", "4", "5"];
            let lstWin = gateData.split(',');
            let lstLose = lstGate.filter((gate) => !lstWin.includes(gate));
            let isTie = lstWin.includes("" + cc.BacaratBetSite.TIE);
            //Neu thoi gian con lai > 5 thi chay action

            //Nguoc lai clear het chip
            if (parseInt(timeEllapsed) > 5 && !cc.game.isPaused()) {
                cc.director.getScheduler().schedule(function () {
                    //Thu chip
                    lstLose.map((gateLost) => {
                        gateLost = parseInt(gateLost);
                        cc.BacaratController.getInstance().getChipsLose(gateLost, isTie);
                    }, this);

                }, this, 0, 0, 1, false);

                cc.director.getScheduler().schedule(function () {
                    //Tra chip
                    lstWin.map(gateWin => {
                        gateWin = parseInt(gateWin);
                        cc.BacaratController.getInstance().refundChips(gateWin);
                    }, this);
                    //Kiem tra neu hoa thi tra chip ve cho user
                    if (isTie) {
                        cc.BacaratController.getInstance().refundChipsTie();
                    }
                }, this, 0, 0, 1.5, false);

            } else {
                cc.BacaratController.getInstance().clearAllChips();
            }

        }

    });
}).call(this);
