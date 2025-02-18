/*
 * Generated by BeChicken
 * on 10/1/2019
 * version v1.0
 */
(function () {
    cc.BacaratChipsView = cc.Class({
        extends: cc.Component,
        properties: {
            layoutChip: cc.Node,
            posChips: [cc.Node],
            posPPlayer: cc.Node,
            posPlayer: cc.Node,
            posTie: cc.Node,
            posBanker: cc.Node,
            posPBanker: cc.Node,
            posGroupUsers: cc.Node,
            posDealer: cc.Node,

            //Danh sach posPlayer
            lstPosPlayer: [cc.Node],

            //listVector: [cc.v2(0, 0)]
        },
        onLoad: function () {
            cc.BacaratController.getInstance().setChipsView(this);
            this.initParamChips();
        },
        initParamChips: function () {
            this.chipsBetPPair = [];
            this.chipsBetPlayer = [];
            this.chipsBetTie = [];
            this.chipsBetBanker = [];
            this.chipsBetPBanker = [];
        },
        //Lay random vi tri chip cua betSide
        randomPosChip: function (betValue, betSide) {
            betSide = parseInt(betSide);
            let pos = null;
            switch (betSide) {
                case cc.BacaratBetSite.PLAYER_PAIR:
                    pos = this.posPPlayer;
                    break;
                case cc.BacaratBetSite.PLAYER:
                    pos = this.posPlayer;
                    break;
                case cc.BacaratBetSite.TIE:
                    pos = this.posTie;
                    break;
                case cc.BacaratBetSite.BANKER:
                    pos = this.posBanker;
                    break;
                case cc.BacaratBetSite.BANKER_PAIR:
                    pos = this.posPBanker;
                    break;
            }

            let posEnd = pos.position;

            let xMax = pos.width / 2;
            let xMin = -xMax;

            let yMax = pos.height / 2;
            let yMin = -yMax;

            let xRandom = Math.floor(Math.random() * (xMax - xMin + 1) + xMin);
            let yRandom = Math.floor(Math.random() * (yMax - yMin + 1) + yMin);

            posEnd.x = posEnd.x + xRandom;
            posEnd.y = posEnd.y + yRandom;

            return posEnd;
        },
        //Di chuyen chip cua player khi bet thanh cong
        moveChipBet: function (betValue, betSide, type, accID) {
            this.layoutChip.position = cc.v2(0, 0);
            try {

                betValue = parseInt(betValue);
                //Lay vi tri bat dau cua chip
                let posChipStart = this.posChips[cc.BacaratMapChipSpriteFrame[betValue]].position;
                if (type === cc.BacaratChipOf.USERS) {
                    posChipStart = this.posGroupUsers.position;
                    //Lay danh sach player
                    let positionPlayerUI = cc.BacaratController.getInstance().positionPlayerUI();
                    let indexPosition = positionPlayerUI.indexOf(accID);
                    if (indexPosition !== -1) {
                        posChipStart = this.lstPosPlayer[indexPosition].position;
                    }
                }
                let posChipEnd = this.randomPosChip(betValue, betSide);
                //Khoi tao chip
                let chip = cc.BacaratController.getInstance().createChip(cc.BacaratMapChipSpriteFrame[betValue]);
                chip.parent = this.layoutChip;
                chip.position = posChipStart;
                let moveAction = cc.moveTo(0.3, posChipEnd);
                //moveAction.easing(cc.easeExponentialOut());
                if (!cc.game.isPaused()) {
                    chip.runAction(moveAction);
                } else {
                    chip.position = posChipEnd;
                }


                //Luu vi tri de di chuyen chip cho ket qua
                let positionEndChip = posChipStart;
                if (type === cc.BacaratChipOf.PLAYER) {
                    positionEndChip = this.lstPosPlayer[0].position;
                }

                //Push node chip vao mang
                switch (betSide) {
                    case cc.BacaratBetSite.PLAYER_PAIR:
                        this.chipsBetPPair.push([chip, betValue, positionEndChip]);
                        break;
                    case cc.BacaratBetSite.PLAYER:
                        this.chipsBetPlayer.push([chip, betValue, positionEndChip]);
                        break;
                    case cc.BacaratBetSite.TIE:
                        this.chipsBetTie.push([chip, betValue, positionEndChip]);
                        break;
                    case cc.BacaratBetSite.BANKER:
                        this.chipsBetBanker.push([chip, betValue, positionEndChip]);
                        break;
                    case cc.BacaratBetSite.BANKER_PAIR:
                        this.chipsBetPBanker.push([chip, betValue, positionEndChip]);
                        break;
                }

            } catch (e) {
                // console.log(e)
            }

        },

        //Cap nhat chip cho betsession
        updateChipForBetSession: function (data) {
            if (data.length === 0) {
                return;
            }
            data.map(dataChip => {
                if (dataChip.length === 0) {
                    return;
                }

                dataChip.map(sideData => {
                    let betSide = parseInt(sideData.BetSide);
                    let betValue = parseInt(sideData.BetValue);

                    let chip = cc.BacaratController.getInstance().createChip(cc.BacaratMapChipSpriteFrame[betValue]);

                    // console.log('betValue: ', betValue);

                    let positionChip = this.randomPosChip(betValue, betSide);

                    chip.parent = this.layoutChip;
                    chip.position = positionChip;
                    let posChipEnd = this.posGroupUsers.position;

                    //Lay danh sach player
                    let positionPlayerUI = cc.BacaratController.getInstance().positionPlayerUI();
                    let indexPosition = positionPlayerUI.indexOf(sideData.AccountID);
                    if (indexPosition !== -1) {
                        posChipEnd = this.lstPosPlayer[indexPosition].position;
                    }

                    //Push node chip vao mang
                    switch (betSide) {
                        case cc.BacaratBetSite.PLAYER_PAIR:
                            this.chipsBetPPair.push([chip, betValue, posChipEnd]);
                            break;
                        case cc.BacaratBetSite.PLAYER:
                            this.chipsBetPlayer.push([chip, betValue, posChipEnd]);
                            break;
                        case cc.BacaratBetSite.TIE:
                            this.chipsBetTie.push([chip, betValue, posChipEnd]);
                            break;
                        case cc.BacaratBetSite.BANKER:
                            this.chipsBetBanker.push([chip, betValue, posChipEnd]);
                            break;
                        case cc.BacaratBetSite.BANKER_PAIR:
                            this.chipsBetPBanker.push([chip, betValue, posChipEnd]);
                            break;
                    }
                }, this);

            }, this);
        },
        //Tra chip thang
        refundChips: function (sideWin) {
            sideWin = parseInt(sideWin);
            let lstChip = null;
            switch (sideWin) {
                case cc.BacaratBetSite.PLAYER_PAIR:
                    lstChip = this.chipsBetPPair;
                    break;
                case cc.BacaratBetSite.PLAYER:
                    lstChip = this.chipsBetPlayer;
                    break;
                case cc.BacaratBetSite.TIE:
                    lstChip = this.chipsBetTie;
                    break;
                case cc.BacaratBetSite.BANKER:
                    lstChip = this.chipsBetBanker;
                    break;
                case cc.BacaratBetSite.BANKER_PAIR:
                    lstChip = this.chipsBetPBanker;
                    break;
            }

            let totalTime = 0;

            if (lstChip.length === 0) {
                return;
            }

            lstChip.map((chip, index) => {
                try {
                    index = (index > 5) ? 5 : index;

                    totalTime = index * 0.1;
                    //Tao chip
                    let chipRefund = cc.BacaratController.getInstance().createChip(cc.BacaratMapChipSpriteFrame[chip[1]]);
                    chipRefund.parent = this.layoutChip;
                    chipRefund.position = this.posDealer.position;
                    let posEnd = this.randomPosChip(chip[1], sideWin);
                    //Kiem tra game pause
                    if (!cc.game.isPaused()) {
                        let moveRefund = cc.moveTo(0.3, posEnd);
                        cc.director.getScheduler().schedule(function () {
                            chipRefund.runAction(moveRefund);
                        }, this, 0, 0, index * 0.1, false);
                    } else {
                        chipRefund.position = posEnd;
                    }

                    //Gan chip vao mang chipWin de di chuyen chip ve phia groupUser
                    cc.BacaratController.getInstance().setChipWin(chip[0], chip[1], chip[2]);
                    cc.BacaratController.getInstance().setChipWin(chipRefund, chip[1], chip[2]);

                } catch (e) {
                    console.log(e);
                }
            }, this);

            //Tra chip ve cho user
            cc.director.getScheduler().schedule(function () {
                this.runRefundChipForUser();
            }, this, 0, 0, totalTime + 1.5, false);
        },
        //Tra chip cho user
        runRefundChipForUser: function () {
            try {
                let chips = cc.BacaratController.getInstance().getChipsWin();
                chips.map((chip, index) => {
                    if (index > 5) {
                        index = 5;
                    }
                    let posEnd = chip[2];
                    //console.log('posEnd: ', posEnd)
                    //Kiem tra game pause
                    if (!cc.game.isPaused()) {
                        cc.director.getScheduler().schedule(function () {
                            //Tao chip
                            let moveRefund = cc.moveTo(0.3, posEnd);
                            let callBack = cc.callFunc(function () {
                                //chip.destroy();
                                chip[0].runAction(cc.fadeOut());
                                setTimeout(function(){
                                    cc.BacaratController.getInstance().putChipToPool(chip[0], chip[1]);
                                }.bind(this), 1000);

                                chip[0].removeFromParent(true);
                            }, this);
                            chip[0].runAction(cc.sequence(moveRefund, callBack));
                        }, this, 0, 0, index * 0.1, false);
                    } else {
                        cc.BacaratController.getInstance().putChipToPool(chip[0], chip[1]);
                        chip[0].removeFromParent(true);
                    }

                }, this)

            } catch (e) {
                console.log(e);
            }
        },

        //Hoan chip hoa
        refundChipsTie: function () {
            try {
                let chips = [...this.chipsBetPlayer, ...this.chipsBetBanker];
                chips.map((chip, index) => {
                    if (index > 5) {
                        index = 5;
                    }
                    let posEnd = chip[2];
                    //Kiem tra game pause
                    if (!cc.game.isPaused()) {
                        cc.director.getScheduler().schedule(function () {
                            //Tao chip
                            let moveRefund = cc.moveTo(0.3, posEnd);
                            let callBack = cc.callFunc(function () {
                                //chip.destroy();
                                cc.BacaratController.getInstance().putChipToPool(chip[0], chip[1]);
                                chip[0].removeFromParent(true);
                            }, this);
                            chip[0].runAction(cc.sequence(moveRefund, callBack));
                        }, this, 0, 0, index * 0.1, false);
                    } else {
                        cc.BacaratController.getInstance().putChipToPool(chip[0], chip[1]);
                        chip[0].removeFromParent(true);
                    }

                }, this)

            } catch (e) {
                console.log(e);
            }
        },
        //Lay chip thua
        getChipsLose: function (sideLose, isTie) {
            let lstChip = null;
            sideLose = parseInt(sideLose);
            switch (sideLose) {
                case cc.BacaratBetSite.PLAYER_PAIR:
                    lstChip = this.chipsBetPPair;
                    break;
                case cc.BacaratBetSite.PLAYER:
                    lstChip = this.chipsBetPlayer;
                    break;
                case cc.BacaratBetSite.TIE:
                    lstChip = this.chipsBetTie;
                    break;
                case cc.BacaratBetSite.BANKER:
                    lstChip = this.chipsBetBanker;
                    break;
                case cc.BacaratBetSite.BANKER_PAIR:
                    lstChip = this.chipsBetPBanker;
                    break;
            }
            if (lstChip.length === 0) {
                return;
            }
            if (isTie && (sideLose == cc.BacaratBetSite.PLAYER || sideLose == cc.BacaratBetSite.BANKER)) {
                return;
            }
            lstChip.map((chip, index) => {
                try {
                    if (index > 5) {
                        index = 5;
                    }
                    let endPos = this.posDealer.position;
                    //Kiem tra game pause
                    if (!cc.game.isPaused()) {
                        cc.director.getScheduler().schedule(function () {
                            let moveEnd = cc.moveTo(0.3, endPos);
                            let callBack = cc.callFunc(function () {
                                cc.BacaratController.getInstance().putChipToPool(chip[0], chip[1]);
                                chip[0].removeFromParent(true);
                            }, this);
                            chip[0].runAction(cc.sequence(moveEnd, callBack));
                        }, this, 0, 0, index * 0.1, false)
                    } else {
                        cc.BacaratController.getInstance().putChipToPool(chip[0], chip[1]);
                        chip[0].removeFromParent(true);
                    }


                } catch (e) {
                    console.log(e)
                }

            }, this);
            //Reset list
            lstChip = [];
        },

        clearAllChips: function () {
            cc.BacaratController.getInstance().clearPools();
            this.layoutChip.removeAllChildren();
        }

    });
}).call(this);
