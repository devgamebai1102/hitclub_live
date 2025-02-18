/*
 * Generated by BeChicken
 * on 8/12/2019
 * version v1.0
 */
(function () {
    cc.TLMNPlayer = cc.Class({
        extends: cc.Component,
        properties: {
            cardOnHand: cc.Node,
            layoutCard: cc.Node,
            nickName: ""

        },
        onLoad: function () {
            //animation
            this.animation = this.node.getComponent(cc.Animation);
            //node emotion
            var nodeChat = this.node.getChildByName('chat');
            this.nodeEmotion = nodeChat.getChildByName('emotion');
            this.nodeBubble = nodeChat.getChildByName('bubble');
            //skeleton Emotion
            this.skeEmotion = this.nodeEmotion.getComponent(sp.Skeleton);
            //label Chat
            this.lbBubbleChat = this.nodeBubble.getComponentInChildren(cc.Label);
            nodeChat.active = false;

            //avatar cua player
            this.avatar = this.node.getComponentInChildren(cc.Avatar);

            //node win/lose cua player
            this.nodeWin = this.node.getChildByName('win');
            this.animWin = this.nodeWin.getComponent(sp.Skeleton);

            this.nodeNofity = this.node.getChildByName('notify');

            //lbWin cua player
            this.lbWin = this.node.getChildByName("lbWin").getComponent(cc.Label);
            //anim lbWin cua player
            this.animLbWin = this.node.getComponentInChildren(cc.Animation);

            //node thong tin player (name + chip)
            this.nodeInfo = this.node.getChildByName('ava_money');

            //lbChip cua player
            this.lbChip = this.nodeInfo.getChildByName('lbChip').getComponent(cc.LabelIncrement);

            //lbName cua player
            this.layoutName = this.nodeInfo.getChildByName("layoutName");
            this.lbName = this.layoutName.getChildByName('lbName').getComponent(cc.Label);
            this.lbSID = this.layoutName.getChildByName('lbSID').getComponent(cc.Label);

            //nodeOut cua player
            this.nodeOut = this.node.getChildByName('nodeOut');

            //node time progress
            this.nodeTimeProgress = this.node.getChildByName('timeprogress').getComponent(cc.ProgressBar);

            //node cards
            this.nodeCard = this.cardOnHand;

            //lable so bai
            this.lbNumberCards = this.cardOnHand.getChildByName('lbNumberCard').getComponent(cc.Label);

            //label ket qua
            this.lbResult = this.node.getChildByName('lbResult').getComponent(cc.Label);
            //layout bai cua player
            this.interval = null;

            this.resetPlayerResultUI(false);
        },
        onDestroy: function () {
            if (this.interval) {
                clearInterval(this.interval)
            }
        },

        //Cap nhat progress cho truong hop START_ACTION_TIMER
        updateProgressOwner: function (timeInfo) {
            if (!this.nodeTimeProgress)
                return;

            if (this.interval !== null) {
                clearInterval(this.interval);
            }

            let time = timeInfo[1];
            if (time == 0) {
                return;
            }
            this.nodeTimeProgress.node.active = true;
            this.speed = time;
            this.nodeTimeProgress.progress = 1;

            this.interval = setInterval(function () {
                let progress = this.nodeTimeProgress.progress;
                progress -= 0.01 / this.speed;
                if (progress < 0)
                    progress = 0;
                this.nodeTimeProgress.progress = progress;
            }.bind(this), 10);
        },

        //Cap nhat progress cho truong hop joinGame
        updateProgressOwnerJoinGame: function (timeInfo) {
            if (!this.nodeTimeProgress)
                return;

            if (this.interval !== null) {
                clearInterval(this.interval);
            }

            let totalTime = timeInfo[0];
            let time = timeInfo[1];

            if (time == 0) {
                return;
            }

            this.nodeTimeProgress.node.active = true;

            this.speed = totalTime;
            this.nodeTimeProgress.progress = 1 - (totalTime - time) / totalTime;

            this.interval = setInterval(function () {
                let progress = this.nodeTimeProgress.progress;
                progress -= 0.01 / this.speed;
                if (progress < 0)
                    progress = 0;
                this.nodeTimeProgress.progress = progress;
            }.bind(this), 10);
        },
        resetProgressOwner: function () {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            this.nodeTimeProgress.node.active = false;
        },
        stopUpdateProgressOwner: function () {
            this.nodeTimeProgress.node.active = false;
        },

        resetPlayerResultUI: function (isStartGame) {
            // Anim
            this.nodeWin.active = false;
            this.nodeNofity.active = false;
            //Lb Ket qua
            this.lbResult.node.active = false;
            // lb thang/thua
            this.lbWin.node.active = false;
            // icon thoat
            this.nodeOut.active = false;

            this.nodeCard.active = false;

            this.avatar.node.opacity = 255;

            this.nodeTimeProgress.node.active = false;

            this.nodeInfo.active = isStartGame;
            if (!isStartGame) {
                this.avatar.setAvatar(cc.TLMN_Controller.getInstance().getAvatarDef());
            }
            this.layoutCard.removeAllChildren();
        },
        setAvatarBlur: function () {
            this.avatar.node.opacity = 150;
        },
        //player vao phong
        registerPlayer: function (accountInfo, status) {
            // hien thi ai la chuong
            let player = accountInfo.Account;
            this.accId = player.AccountID;
            var avatarID = player.Avatar;
            if (avatarID <= 0) {
                avatarID = 1;
            }
            if (status == cc.TLMNPlayerStatus.INGAME) {
                this.avatar.node.opacity = 255;
            } else {
                this.avatar.node.opacity = 150;
            }
            this.nodeInfo.active = true;
            this.nickName = player.NickName;
            //set avatar
            this.avatar.setAvatar(cc.AccountController.getInstance().getAvatarImage(avatarID));
            //set name
            if (player.ServiceID) {
                this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(player.ServiceID);
                //set name
                this.lbName.string = cc.Config.getInstance().formatName(player.NickName, 7);
            } else {
                this.lbSID.string = '';
                //set name
                this.lbName.string = cc.Config.getInstance().formatName(player.NickName, 10);
            }
            //set chip
            this.lbChip.tweenValueto(player.Star);
            //bat node thong tin
            this.node.opacity = 255;
            //Hien thi trang thai dang ky roi phong
            this.nodeOut.active = accountInfo.RegisterLeaveRoom;
            //Kiem tra la currplayer thi tao bai
            this.updateCardPlayer(accountInfo);

        },
        showEmotion: function (index, message) {
            this.nodeBubble.active = false;
            this.nodeEmotion.active = true;

            this.skeEmotion.clearTracks();
            this.skeEmotion.setToSetupPose();

            //fix loi server cam chat sexy
            if (index === 15) {
                this.skeEmotion.setAnimation(index, '16-extreme-sexy-girl', true);
            } else {
                this.skeEmotion.setAnimation(index, message[1], true);
            }

            this.animation.play('showBubbleChat');
        },
        //player roi phong
        unRegisterPlayer: function () {
            //reset trang thai ban dau
            this.resetPlayerResultUI(false);
            this.avatar.setAvatar(cc.TLMN_Controller.getInstance().getAvatarDef());
        },

        updateConnectionStatus: function (status) {
            switch (status) {
                case cc.TLMNConnectionStatus.DISCONNECTED:
                    this.node.opacity = 150;
                    break;
                case cc.TLMNConnectionStatus.REGISTER_LEAVE_GAME:
                    this.node.opacity = 255;
                    this.nodeOut.active = true;
                    break;
                case cc.TLMNConnectionStatus.CONNECTED:
                    this.nodeOut.active = false;
                    this.node.opacity = 255;
                    break;
            }
        },

        updatePlayerStatus: function (playerStatus) {
            if (playerStatus == cc.TLMNPlayerStatus.INGAME) {
                this.node.opacity = 255;
            } else {
                this.node.opacity = 150;
            }
        },
        //Update bai sau khi xep bai
        updateCardOnShortHand: function (handCards) {
            //tao bai
            if (handCards.length > 0) {
                this.layoutCard.removeAllChildren();
                handCards.forEach(function (cardInfo) {
                    let cardPrefab = cc.TLMN_Controller.getInstance().createCard();
                    cardPrefab.y = 0;
                    cardPrefab.setScale(cc.v2(0.8, 0.8));

                    //Lay spriteFrame cua bai
                    let sfCard = cc.TLMN_Controller.getInstance().getSpriteCard(cardInfo.CardNumber, cardInfo.CardSuite);

                    let cardItem = cardPrefab.getComponent(cc.CardItem);
                    cardItem.ordinalValue = cardInfo.OrdinalValue;
                    cardItem.cardNumber = cardInfo.CardNumber;
                    cardItem.cardSuite = cardInfo.CardSuite;
                    cardItem.isClose = false;

                    cardPrefab.getComponent(cc.Sprite).spriteFrame = sfCard;

                    this.layoutCard.addChild(cardPrefab, 1, 'cardItem');
                    //chay anmimation xep bai
                    cardItem.getComponent(cc.Animation).play('flip');

                }, this);
            }
        },
        //Update bai sau khi chia
        updateCardPlayer: function (accountInfo) {
            let handCards = accountInfo.HandCards;
            if (accountInfo.Account.AccountID == cc.LoginController.getInstance().getUserId()) {
                //tao bai
                if (handCards.length > 0) {
                    this.layoutCard.removeAllChildren();
                    handCards.forEach(function (cardInfo) {
                        let cardPrefab = cc.TLMN_Controller.getInstance().createCard();
                        cardPrefab.y = 0;
                        cardPrefab.setScale(cc.v2(0.8, 0.8));

                        //Lay spriteFrame cua bai
                        let sfCard = cc.TLMN_Controller.getInstance().getSpriteCard(cardInfo.CardNumber, cardInfo.CardSuite);

                        let cardItem = cardPrefab.getComponent(cc.CardItem);
                        cardItem.ordinalValue = cardInfo.OrdinalValue;
                        cardItem.cardNumber = cardInfo.CardNumber;
                        cardItem.cardSuite = cardInfo.CardSuite;
                        cardItem.isClose = false;

                        cardPrefab.getComponent(cc.Sprite).spriteFrame = sfCard;

                        this.layoutCard.addChild(cardPrefab, 1, 'cardItem');
                        //chay anmimation xep bai
                        //cardItem.getComponent(cc.Animation).play('flip');

                    }, this);
                    //this.layoutCard.getComponent(cc.Animation).play('scale-card');
                }
            } else {

                if (handCards.length == 0)
                    return;
                this.nodeCard.active = true;
                this.lbNumberCards.string = handCards.length;
            }
        },
        hideLayoutCardOnHands: function () {
            this.cardOnHand.active = false;
        },
        onShowResult: function (accountInfo, baiThoi) {
            this.cardOnHand.active = false;
            let handCards = accountInfo.HandCards;
            handCards.forEach(function (cardInfo) {
                let cardPrefab = cc.TLMN_Controller.getInstance().createCard();
                cardPrefab.y = 0;
                cardPrefab.setScale(cc.v2(0.85, 0.85));

                //Lay spriteFrame cua bai
                let sfCard = cc.TLMN_Controller.getInstance().getSpriteCard(cardInfo.CardNumber, cardInfo.CardSuite);

                let cardItem = cardPrefab.getComponent(cc.CardItem);
                cardItem.ordinalValue = cardInfo.OrdinalValue;
                cardItem.cardNumber = cardInfo.CardNumber;
                cardItem.cardSuite = cardInfo.CardSuite;
                cardItem.isClose = false;

                cardPrefab.getComponent(cc.Sprite).spriteFrame = sfCard;

                this.layoutCard.addChild(cardPrefab, 1, 'cardItem');
                this.layoutCard.zIndex = 99;
                cardItem.node.color = cc.TLMN_Controller.getInstance().getColorDark();
                //Hien thi bai thoi
                if (baiThoi.length > 0) {
                    if (baiThoi.includes(cardItem.ordinalValue)) {
                        cardItem.node.color = cc.TLMN_Controller.getInstance().getColorWhite();
                        let nodeBorder = new cc.Node('borderCard');
                        let spriteBorder = nodeBorder.addComponent(cc.Sprite);
                        spriteBorder.spriteFrame = cc.TLMN_Controller.getInstance().getSfBorderCard();
                        nodeBorder.parent = cardItem.node;
                    }
                }
                //chay anmimation xep bai
                cardItem.getComponent(cc.Animation).play('show-card');

            }, this);
        },

        //Hien list bai cho phep chan ngay
        showCardAllowChanNgay: function (lstCard) {
            let listCardOnHand = this.getListNodeCard();
            listCardOnHand.map(card => {
                let ordinalValue = card.getComponent(cc.CardItem).ordinalValue;
                if (lstCard.includes(ordinalValue)) {
                    card.getComponent(cc.CardItem).eventSelected();
                }
            }, this);
            //let listCardSelected = cc.TLMN_Controller.getInstance().getSelectedCard();

        },
        //Hien thi bo luot cua player
        showBoLuot: function (enable) {

            this.nodeNofity.active = enable;

            if (enable) {
                this.nodeNofity.getComponent(cc.Sprite).spriteFrame = cc.TLMN_Controller.getInstance().getSfGameResult(cc.TLMNResultFamily.BO_LUOT);
            }

        },

        //Hien thi thong bao thang thua
        showNofity: function (resultFamily, winType) {
            //Map hien thi ket qua tra ve
            if (resultFamily == cc.TLMNResultFamily.NHAT || resultFamily == cc.TLMNResultFamily.TOI_TRANG) {
                let animationName = null;
                switch (resultFamily) {
                    case cc.TLMNResultFamily.NHAT:
                        animationName = cc.TLMN_ANIMATION_NAME.THANG;
                        break;
                    case cc.TLMNResultFamily.TOI_TRANG:
                        animationName = cc.TLMN_ANIMATION_NAME.TOI_TRANG;
                        break;
                }
                this.animWin.clearTracks();
                this.animWin.setToSetupPose();
                this.animWin.setAnimation(0, animationName, true);
                this.nodeWin.active = true;

                if (resultFamily == cc.TLMNResultFamily.TOI_TRANG) {
                    //Thong bao animation
                    let winAnimationName = null;
                    switch (winType) {
                        case cc.TLMN_TOI_TRANG_TYPE.TU_QUY_BA:
                            winAnimationName = cc.TLMN_ANIMATION_NAME.TU_QUY_BA;
                            break;
                        case cc.TLMN_TOI_TRANG_TYPE.BA_DOI_THONG_CHUA_BA_BICH:
                            winAnimationName = cc.TLMN_ANIMATION_NAME.BA_DOI_THONG_BA_BICH;
                            break;
                        case cc.TLMN_TOI_TRANG_TYPE.TU_QUY_HAI:
                            winAnimationName = cc.TLMN_ANIMATION_NAME.TU_QUY_HAI;
                            break;
                        case cc.TLMN_TOI_TRANG_TYPE.NAM_DOI_THONG:
                            winAnimationName = cc.TLMN_ANIMATION_NAME.NAM_DOI_THONG;
                            break;
                        case cc.TLMN_TOI_TRANG_TYPE.SAU_DOI_BAT_KY:
                            winAnimationName = cc.TLMN_ANIMATION_NAME.SAU_DOI;
                            break;
                    }
                    if (winAnimationName != null) {
                        cc.TLMN_Controller.getInstance().showAllNofity(winAnimationName, 5);
                    }
                }

                return;
            }
            this.nodeNofity.active = true;
            let spriteResult = cc.TLMN_Controller.getInstance().getSfGameResult(resultFamily);
            this.nodeNofity.getComponent(cc.Sprite).spriteFrame = spriteResult;
        },

        onUpdateAccount: function (account) {

            let accountInfo = account[0];
            let value = account[1];
            // Khong hien thi neu value = 0
            if (value == 0) {
                return;
            }

            let star = accountInfo.Star;
            let accountID = accountInfo.AccountID;
            //Cap nhat so du UI
            if (!cc.game.isPaused()) {
                this.lbChip.tweenValueto(star);
            }
            else {
                this.lbChip.setValue(star);
            }
            //Cap nhat so du neu la current player
            if (this.isCurrentPlayer(accountID)) {
                cc.BalanceController.getInstance().updateRealBalance(star);
            }
            //Hien thi tien thang/thua
            value = parseInt(value);
            let formatValue = cc.Tool.getInstance().formatNumber(Math.abs(value));
            let font = cc.TLMN_Controller.getInstance().getWinFont();

            if (value < 0) {
                font = cc.TLMN_Controller.getInstance().getLoseFont();
                formatValue = "-" + formatValue;
            } else {
                formatValue = "+" + formatValue;
            }
            this.lbWin.string = formatValue;
            this.lbWin.font = font;
            this.lbWin.node.active = true;
            if (!cc.game.isPaused()) {
                this.lbWin.node.getComponent(cc.Animation).play('showMoney');
            }

        },
        //Lay danh sach bai con lai cua player hien tai
        getListCurrCardPlayer: function () {
            return this.layoutCard.children;
        },
        //Cap nhat bai cua player sau khi co event danh bai
        updateCardPlayerOnDanhBai: function (accountInfo) {
            let handCards = accountInfo.HandCards;
            if (accountInfo.Account.AccountID != cc.LoginController.getInstance().getUserId()) {

                if (handCards.length == 0) {
                    this.cardOnHand.active = false;
                }
                this.lbNumberCards.string = handCards.length;
            }
        },

        //Tra ve danh sach card cua player
        getListNodeCard: function () {
            return this.layoutCard.children;
        },

        isCurrentPlayer: function (accID) {
            return accID == cc.LoginController.getInstance().getUserId();
        },

        showBubbleChat: function (message) {
            this.nodeBubble.active = true;
            this.nodeEmotion.active = false;

            this.lbBubbleChat.string = message[1];

            this.animation.play('showBubbleChat');
        },
    })
}).call(this);