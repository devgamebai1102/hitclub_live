/**
 * Input dat cuoc
 */

var BetSelf = {};

(function () {
  cc.TaiXiuSicboInputBetView = cc.Class({
    extends: cc.Component,
    properties: {
      nodeInput: cc.Node, //node input
      nodeInputValue: cc.Node, //node chon so tien de bet
      nodeInputFree: cc.Node, //node tu do chon so tien
      nodeGroupBotBet: cc.Node,
      lbBetTaiTemp: cc.Label,
      lbBetXiuTemp: cc.Label,
      lbUserWin: cc.Label,
      audioChonSo: cc.AudioSource,
      editBoxDatTai: cc.EditBox,
      editBoxDatXiu: cc.EditBox,
      nodeTaiSelect: cc.Node,
      nodeXiuSelect: cc.Node,
      nodePlayer: cc.Node,
      nodeBots: [cc.Node],
      nodeUsers: cc.Node,
      sprBotAvatars: [cc.SpriteFrame],
      lblBotNames: [cc.Label],
      nodeChipParent: cc.Node,
      chips: cc.Node,
      chip100: cc.SpriteFrame,
      chip500: cc.SpriteFrame,
      chip1000: cc.SpriteFrame,
      chip5000: cc.SpriteFrame,
      chip10000: cc.SpriteFrame,
      chip50000: cc.SpriteFrame,
      chip100000: cc.SpriteFrame,
      chip500000: cc.SpriteFrame,
      chip1000000: cc.SpriteFrame,
      chip5000000: cc.SpriteFrame,
      chip10000000: cc.SpriteFrame,
      chip50000000: cc.SpriteFrame,
      chip100000000: cc.SpriteFrame,
      chip150000000: cc.SpriteFrame,
      chip200000000: cc.SpriteFrame,
      heightChip: {
        type: cc.Float,
        default: 2.182,
      },
      _inputXengDictionary: {
        type: Object,
        default: {},
      },
    },
    addSuccess: function () {
      if (BetSelf) {
        let lbXengBet = BetSelf.betNode
          .getChildByName("lb_bet")
          .getComponent(cc.Label);

        this._inputXengDictionary[BetSelf.betSide].money2 += BetSelf.betValue;

        lbXengBet.string = cc.Tool.getInstance().formatMoney(
          this._inputXengDictionary[BetSelf.betSide].money2
        );
      }
    },
    onLoad: function () {
      this.resetInput();
      this.chip2s = [1000, 5000, 10000, 50000, 100000];

      this.chipArr = [
        this.chip1000,
        this.chip5000,
        this.chip10000,
        this.chip50000,
        this.chip100000,
      ];

      this.animation = this.node.getComponent(cc.Animation);
      cc.TaiXiuSicboController.getInstance().setTaiXiuSicboInputBetView(this);

      this.reset();
      this.chipsIdx = 0;
      this.sttBot = 0;
      this.sttBotIdx = 0;
      this.ignoreBot = -1;
      this.startJoinRoom();

      for (let i of this.nodeBots) {
        var lbWin = i.getChildByName("lb win");

        if (lbWin) {
          lbWin.getComponent(cc.Label).string = "";
        }
      }

      for (var k of Object.keys(this._inputXengDictionary)) {
        var input = this._inputXengDictionary[k];
        this._inputXengDictionary[k].money = 0;
        this._inputXengDictionary[k].money2 = 0;

        for (var xeng of input.xengs) {
          xeng.active = false;
        }
      }

      this.lbUserWin.string = "";
    },
    onClickTaiSelect: function () {
      //this.nodeTaiSelect.active = false;
      //this.openInputBetTaiClicked();
    },
    onClickXiuSelect: function () {
      // this.nodeXiuSelect.active = false;
      //this.openInputBetXiuClicked();
    },
    reset: function () {
      if (cc.sys.isNative) {
        this.editBoxDatTai.active = false;
        this.editBoxDatXiu.active = false;
      }
    },
    stopAllCallbacks: function () {
      this.unscheduleAllCallbacks();
      this.destroyAllInputBetView();
      cc.TaiXiuSicboController.getInstance().setTaiXiuSicboInputBetView(null);
    },
    startJoinRoom: function () {
      this.nodeUsers
        .getComponentInChildren("LabelIncrement")
        .tweenValueto(Math.floor(Math.random() * (500 - 100 + 1) + 100), 3000);

      if (this.sttBotIdx != 0) {
        clearTimeout(this.sttBotIdx);
      }

      // node group bot bet
      this.schedulerGroup = cc.director.getScheduler();

      this.schedulerGroup.schedule(
        function () {
          let sicboResult =
            cc.TaiXiuSicboController.getInstance().getTaiXiuSicboResultView();

          if (
            sicboResult &&
            sicboResult.currentState != cc.TaiXiuSicboState.BETTING
          ) {
            return;
          }

          var rand = Math.floor(Math.random() * (51 - 0 + 1) + 0);

          var rand3 = Math.floor(
            Math.random() * (this.chipArr.length - 1 + 1) + 0
          );

          this._createBotChipAnimation(
            this.nodeGroupBotBet.position,
            this.nodeChipParent.children[rand],
            this.chipArr[rand3],
            this.chip2s[rand3],
            rand
          );
        },
        this,
        0.05,
        cc.macro.REPEAT_FOREVER,
        3,
        false
      );

      if (this.sttBot > this.nodeBots.length - 1) {
        this.scheduler = cc.director.getScheduler();

        this.scheduler.schedule(
          function () {
            let sicboResult =
              cc.TaiXiuSicboController.getInstance().getTaiXiuSicboResultView();

            if (
              sicboResult &&
              sicboResult.currentState != cc.TaiXiuSicboState.BETTING
            ) {
              return;
            }

            var rand = Math.floor(Math.random() * (51 - 0 + 1) + 0);

            var rand2 = Math.floor(
              Math.random() * (this.nodeBots.length - 0 + 1) + 0
            );

            if (!this.nodeBots[rand2]) return;

            var rand3 = Math.floor(
              Math.random() * (this.chipArr.length - 1 + 1) + 0
            );

            let bot = this.nodeBots[rand2];

            let botBet = Number(
              bot.getComponentInChildren(cc.Label).string.replaceAll(",", "")
            );

            let rndValue = Number(this.chip2s[rand3]);

            if (botBet < rndValue && this.ignoreBot != rand2) {
              this.ignoreBot = rand2;
              this.id2 = setTimeout(
                function () {
                  var rndSpr = Math.floor(
                    Math.random() * (this.sprBotAvatars.length - 0 + 1) + 0
                  );

                  this.nodeBots[this.ignoreBot]
                    .getComponentInChildren("Avatar")
                    .setAvatar(this.sprBotAvatars[rndSpr]);

                  this.nodeBots[this.ignoreBot]
                    .getComponentInChildren("LabelIncrement")
                    .setValue(
                      Math.floor(
                        Math.random() * (75000000 - 50000000 + 1) + 50000000
                      )
                    );

                  this.ignoreBot = -1;
                  clearTimeout(this.id2);
                }.bind(this),
                500
              );

              return;
            }

            bot
              .getComponentInChildren("LabelIncrement")
              .tweenValueto(Math.abs(botBet - rndValue));

            this._createBotChipAnimation(
              bot.position,
              this.nodeChipParent.children[rand],
              this.chipArr[rand3],
              this.chip2s[rand3],
              rand
            );
          },
          this,
          0.15,
          cc.macro.REPEAT_FOREVER,
          1,
          false
        );

        return;
      }

      this.sttBotIdx = setTimeout(
        function () {
          var rndSpr = !!this.sprBotAvatars.length
            ? Math.floor(
                Math.random() * (this.sprBotAvatars.length - 0 + 1) + 0
              )
            : 0;

          this.nodeBots[this.sttBot]
            .getComponentInChildren("Avatar")
            .setAvatar(this.sprBotAvatars[rndSpr]);

          this.nodeBots[this.sttBot]
            .getComponentInChildren("LabelIncrement")
            .setValue(
              Math.floor(Math.random() * (75000000 - 50000000 + 1) + 50000000)
            );
          var bots = [
            "gintama202",
            "johnwick65",
            "sadboiz",
            "racingboiz",
            "vuataixiu11",
            "daika88",
            "icd25",
            "xzct52",
            "wanganhvippro",
            "yugioh",
            "konkac18",
            "myquene9",
            "phattonhulai",
            "5hand5",
            "linhxinhgai",
            "yeumoiemthoi77",
            "choitaoah58",
            "batbaijjk",
            "dwwgmakerx",
            "zzVIPzz",
            "narutool",
          ];
          var botRand = bots[Math.floor(Math.random() * bots.length)];
          this.lblBotNames[this.sttBot].string = botRand;

          this.sttBot++;
          this.startJoinRoom();
        }.bind(this),
        Math.floor(Math.random() * (750 - 500 + 1) + 750)
      );
    },
    //reset lai gia tri input
    resetInput: function () {
      try {
        //  this.nodeXiuSelect.active = true;
        // this.nodeTaiSelect.active = true;

        this.editBoxDatXiu.string = "";
        this.editBoxDatTai.string = "";
        this.betValue = 0;
        this.betNode = null;
      } catch (ex) {
        console.log("Lỗi reset input sicbo:" + ex);
      }
    },

    //mo cua so input
    openInput: function () {
      cc.TaiXiuSicboController.getInstance().resetPositionTX();

      //this.nodeInput.active = true;
      this.nodeInputValue.active = true;
      this.nodeInputFree.active = false;
      this.isInputValue = true;
      this.animation.play("openBetInput");
    },

    //dong input
    closeInput: function () {
      this.resetInput();
      this.animation.play("closeBetInput");
    },

    //animation trigger goi sau khi dong cua so input
    closeBetInputEvent: function () {
      //     this.nodeInput.active = false;
      //   this.nodeTaiSelect.active = true;
      //   this.nodeXiuSelect.active = true;
    },

    //cap nhat gia tri bet dua tren so tien Bet
    updateValueBetUI: function () {
      // if (this.betSide === cc.TaiXiuSicboBetSide.TAI) {
      //   this.lbBetTaiTemp.string = cc.Tool.getInstance().formatMoney(
      //     this.betValue
      //   );
      // } else {
      //   this.lbBetXiuTemp.string = cc.Tool.getInstance().formatMoney(
      //     this.betValue
      //   );
      // }
    },
    startEffectUserWin: function (money) {
      this.lbUserWin.node.active = true;
      this.lbUserWin.string = "+" + cc.Tool.getInstance().formatMoney(money);

      setTimeout(
        function () {
          this.lbUserWin.node.active = false;
        }.bind(this),
        3000
      );
    },
    //click mo cua so input Tai
    openInputBetTaiClicked: function () {
      if (
        /*this.nodeInput.active &&*/ this.betSide === cc.TaiXiuSicboBetSide.TAI
      ) {
        this.closeInput();
      } else if (
        /*this.nodeInput.active &&*/ this.betSide === cc.TaiXiuSicboBetSide.XIU
      ) {
        this.betSide = cc.TaiXiuSicboBetSide.TAI;
        //this.lbBetXiuTemp.string = "0";
        this.nodeXiuSelect.active = true;
        // this.lbBetTaiTemp.string = cc.Tool.getInstance().formatMoney(
        //   this.betValue
        // );
      } else {
        this.betSide = cc.TaiXiuSicboBetSide.TAI;
        //this.lbBetTaiTemp.string = 0;
        this.openInput();
        if (!cc.sys.isNative) {
          this.editBoxDatTai.setFocus();
        }
      }
    },

    //click mo cua so input Xiu
    openInputBetXiuClicked: function () {
      if (
        /*this.nodeInput.active &&*/ this.betSide === cc.TaiXiuSicboBetSide.XIU
      ) {
        this.closeInput();
      } else if (
        /*this.nodeInput.active &&*/ this.betSide === cc.TaiXiuSicboBetSide.TAI
      ) {
        this.betSide = cc.TaiXiuSicboBetSide.XIU;
        //this.lbBetTaiTemp.string = "0";
        //      this.nodeTaiSelect.active = true;
        // this.lbBetXiuTemp.string = cc.Tool.getInstance().formatMoney(
        //   this.betValue
        // );
      } else {
        this.betSide = cc.TaiXiuSicboBetSide.XIU;
        //this.lbBetXiuTemp.string = 0;
        this.openInput();
        if (!cc.sys.isNative) {
          this.editBoxDatXiu.setFocus();
        }
      }
    },

    //chon gia tri
    betValueClicked: function (event, data) {
      this.betValue += parseInt(data.toString());

      this.updateValueBetUI();
      this.audioChonSo.play();
    },

    //them so
    addValueClicked: function (event, data) {
      this.betValue += data.toString();
      this.betValue = parseInt(this.betValue);

      this.updateValueBetUI();
      this.audioChonSo.play();
    },

    //lui 1 so
    deleteClicked: function () {
      this.betValue = this.betValue
        .toString()
        .substring(0, this.betValue.toString().length - 1);

      if (this.betValue === "") {
        this.betValue = 0;
      } else {
        this.betValue = parseInt(this.betValue);
      }

      this.updateValueBetUI();
      this.audioChonSo.play();
    },
    destroyAllInputBetView: function () {
      try {
        for (let i of this.nodeBots) {
          var lbWin = i.getChildByName("lb win");

          if (lbWin) {
            lbWin.getComponent(cc.Label).string = "";
          }
        }

        if (this.sttBot >= this.nodeBots.length - 1) {
          var rnd = Math.floor(Math.random() * (6 - 1 + 1) + 1);
          var bots = [];
          var prevBot = [];
          bots.push(...this.nodeBots);

          for (var i = 0; i < rnd; i++) {
            var rndBot = Math.floor(Math.random() * (bots.length - 0 + 1) + 0);

            if (prevBot.includes(rndBot)) {
              continue;
            }

            var amount = Math.floor(
              Math.random() * (5000000 - 2000000 + 1) + 2000000
            );

            prevBot.push(rndBot);

            try {
              let bot = bots[rndBot];
              bots.splice(rndBot, 1);

              if (bot) {
                let realAmount = Number(amount);

                if (realAmount > 0) {
                  let nodeOther = bot.getChildByName("lb win");
                  nodeOther.active = true;

                  nodeOther.getComponent(cc.Label).string =
                    "+" + cc.Tool.getInstance().formatMoney(realAmount);

                  setTimeout(
                    function () {
                      nodeOther.active = false;
                    }.bind(this),
                    3000
                  );
                }

                // bot
                //   .getComponentInChildren("LabelIncrement")
                //   .tweenValueto(
                //     Math.abs(
                //       Number(
                //         bot
                //           .getComponentInChildren(cc.Label)
                //           .string.replaceAll(",", "")
                //       ) - realAmount
                //     )
                //   );
              }
            } catch (e) {
              console.log(e);
            }
          }
        }

        for (var k of Object.keys(this._inputXengDictionary)) {
          var input = this._inputXengDictionary[k];
          this._inputXengDictionary[k].money = 0;
          this._inputXengDictionary[k].money2 = 0;

          for (var xeng of input.xengs) {
            xeng.active = false;
          }
        }
      } catch (ex) {
        console.error(ex);
      }
    },
    //huy input
    cancelClicked: function () {
      this.closeInput();
      this.audioChonSo.play();
    },
    allInClick() {
      let coin = cc.BalanceController.getInstance().getBalance();
      if (this.betSide == cc.TaiXiuSicboBetSide.XIU) {
        this.onTextXiuChange(coin);
      } else {
        this.onTextTaiChange(coin);
      }
    },
    //xac nhan bet
    confirmClicked: function (e, val) {
      //goi len Hub params(bet, betValue, betSide)

      if (this.betValue < 1000) {
        cc.PopupController.getInstance().showMessage(
          "Đặt tối thiểu 1.000 " + cc.Config.getInstance().currency()
        );
      } else if (
        cc.BalanceController.getInstance().getBalance() < this.betValue
      ) {
        cc.PopupController.getInstance().showMessage("Số dư không đủ");
      } else {
        // bet side là số id của từng ô cược
        //console.log("da dat cuoc", this.betValue, this.betSide);
        // viết code tạo animation chip bay đến các thứ vào đây

        let sicboResult =
          cc.TaiXiuSicboController.getInstance().getTaiXiuSicboResultView();

        if (
          sicboResult &&
          sicboResult.currentState != cc.TaiXiuSicboState.BETTING
        ) {
          sicboResult.playAnimationNotify(
            "Vui lòng chờ phiên tiếp theo để đặt cược"
          );

          return;
        }

        if (this._inputXengDictionary.hasOwnProperty(this.betSide)) {
          this._inputXengDictionary[this.betSide].money += this.betValue;
        } else {
          this._inputXengDictionary[this.betSide] = {
            money: this.betValue,
            money2: 0,
            xengs: [],
          };
        }

        this._createChipAnimation(this.nodePlayer);

        cc.TaiXiuSicboController.getInstance().sendRequestOnHub(
          cc.MethodHubName.BET,
          this.betValue,
          this.betSide
        );
      }

      this.closeInput();
      this.audioChonSo.play();
    },
    getTienCuocFromBetSide: function (betSide, multiply = 1) {
      if (this._inputXengDictionary.hasOwnProperty(betSide)) {
        return this._inputXengDictionary[betSide].money2 * multiply;
      }

      return 0;
    },
    _createBotChipAnimation: function (
      startPosition,
      _betNode,
      _betSprite,
      _betValue,
      _betSide
    ) {
      let xeng = undefined;

      if (this._inputXengDictionary.hasOwnProperty(_betSide)) {
        this._inputXengDictionary[_betSide].money += _betValue;

        if (this._inputXengDictionary[_betSide].xengs.length > 0) {
          for (
            let i = 0;
            i < this._inputXengDictionary[_betSide].xengs.length;
            i++
          ) {
            let nd = this._inputXengDictionary[_betSide].xengs[i].node;

            if (nd && !nd.activeInHierarchy) {
              xeng = nd;

              xeng.name =
                "Tien Cuoc " +
                (this._inputXengDictionary[_betSide].xengs.length + 1);

              break;
            }
          }
        }
      } else {
        this._inputXengDictionary[_betSide] = {
          money: _betValue,
          money2: 0,
          xengs: [],
        };
      }

      if (xeng === undefined) {
        xeng = new cc.Node(
          "Tien Cuoc " + (this._inputXengDictionary[_betSide].xengs.length + 1)
        );

        this._inputXengDictionary[_betSide].xengs.push(xeng);
      }

      let sprite = xeng.getComponent(cc.Sprite);

      if (!sprite) {
        sprite = xeng.addComponent(cc.Sprite);
      }

      let vitrixeng = _betNode.getChildByName("vitrixeng");
      sprite.spriteFrame = _betSprite;

      xeng.setParent(this.nodeChipParent);
      xeng.setScale(0.35, 0.35);
      xeng.setPosition(startPosition.x, startPosition.y);
      xeng.setSiblingIndex(this.nodeChipParent.children.length);
      let totalEnabledXeng = 0;

      for (
        var k = 0;
        k < this._inputXengDictionary[_betSide].xengs.length;
        k++
      ) {
        if (this._inputXengDictionary[_betSide].xengs[k].activeInHierarchy) {
          totalEnabledXeng++;
        }
      }

      let xeng_action = cc.spawn(
        cc.moveTo(
          1,
          cc.v2(
            vitrixeng.position.x + _betNode.position.x,
            vitrixeng.position.y +
              _betNode.position.y +
              totalEnabledXeng * this.heightChip
          )
        ),
        cc.scaleTo(1, 0.15, 0.15)
      );

      xeng.runAction(xeng_action.easing(cc.easeQuarticActionOut(1)));
      let oldSide = _betSide;

      setTimeout(
        function () {
          try {
            this._updateChip(this._inputXengDictionary[oldSide]);
          } catch (e) {
            console.log(e);
          }
        }.bind(this),
        350
      );
    },
    _createChipAnimation: function (startPosition) {
      let xeng = undefined;

      for (
        let i = 0;
        i < this._inputXengDictionary[this.betSide].xengs.length;
        i++
      ) {
        let nd = this._inputXengDictionary[this.betSide].xengs[i].node;

        if (nd && !nd.activeInHierarchy) {
          xeng = nd;
          xeng.name =
            "Tien Cuoc " +
            (this._inputXengDictionary[this.betSide].xengs.length + 1);

          break;
        }
      }

      if (xeng === undefined) {
        xeng = new cc.Node(
          "Tien Cuoc " +
            (this._inputXengDictionary[this.betSide].xengs.length + 1)
        );

        this._inputXengDictionary[this.betSide].xengs.push(xeng);
      }

      let sprite = xeng.getComponent(cc.Sprite);

      if (!sprite) {
        sprite = xeng.addComponent(cc.Sprite);
      }

      let vitrixeng = this.betNode.getChildByName("vitrixeng");
      sprite.spriteFrame = this.betSprite;

      xeng.setParent(this.nodeChipParent);
      xeng.setScale(0.15, 0.15);
      xeng.setPosition(startPosition.x, startPosition.y);
      xeng.setSiblingIndex(this.nodeChipParent.children.length);
      let totalEnabledXeng = 0;

      for (
        var k = 0;
        k < this._inputXengDictionary[this.betSide].xengs.length;
        k++
      ) {
        if (
          this._inputXengDictionary[this.betSide].xengs[k].activeInHierarchy
        ) {
          totalEnabledXeng++;
        }
      }

      let xeng_action = cc.moveTo(
        1,
        cc.v2(
          vitrixeng.position.x + this.betNode.position.x,
          vitrixeng.position.y +
            this.betNode.position.y +
            totalEnabledXeng * this.heightChip
        ),
        cc.scaleTo(1, 0.15, 0.15)
      );

      xeng.runAction(xeng_action.easing(cc.easeQuarticActionOut(1)));

      let oldSide = this.betSide;

      setTimeout(
        function () {
          this._updateChip(this._inputXengDictionary[oldSide]);
        }.bind(this),
        350
      );
    },
    _updateChip: function (inputXeng) {
      if (!inputXeng || inputXeng.money === NaN) {
        return;
      }

      let totalXeng = inputXeng.money;
      let n200000000 = 0;
      let n150000000 = 0;
      let n100000000 = 0;

      let n50000000 = 0;
      let n10000000 = 0;

      let n5000000 = 0;
      let n1000000 = 0;

      let n500000 = 0;
      let n100000 = 0;

      let n50000 = 0;
      let n10000 = 0;

      let n5000 = 0;
      let n1000 = 0;

      if (totalXeng >= 200000000) {
        n200000000 = Math.floor(totalXeng / 200000000);
        totalXeng = totalXeng - n200000000 * 200000000;
      }

      if (totalXeng >= 150000000) {
        n150000000 = Math.floor(totalXeng / 150000000);
        totalXeng = totalXeng - n150000000 * 150000000;
      }

      if (totalXeng >= 100000000) {
        n100000000 = Math.floor(totalXeng / 100000000);
        totalXeng = totalXeng - n100000000 * 100000000;
      }

      if (totalXeng >= 50000000) {
        n50000000 = Math.floor(totalXeng / 50000000);
        totalXeng = totalXeng - n50000000 * 50000000;
      }

      if (totalXeng >= 10000000) {
        n10000000 = Math.floor(totalXeng / 10000000);
        totalXeng = totalXeng - n10000000 * 10000000;
      }

      if (totalXeng >= 5000000) {
        n5000000 = Math.floor(totalXeng / 5000000);
        totalXeng = totalXeng - n5000000 * 5000000;
      }

      if (totalXeng >= 1000000) {
        n1000000 = Math.floor(totalXeng / 1000000);
        totalXeng = totalXeng - n1000000 * 1000000;
      }

      if (totalXeng >= 500000) {
        n500000 = Math.floor(totalXeng / 500000);
        totalXeng = totalXeng - n500000 * 500000;
      }

      if (totalXeng >= 100000) {
        n100000 = Math.floor(totalXeng / 100000);
        totalXeng = totalXeng - n100000 * 100000;
      }

      if (totalXeng >= 50000) {
        n50000 = Math.floor(totalXeng / 50000);
        totalXeng = totalXeng - n50000 * 50000;
      }

      if (totalXeng >= 10000) {
        n10000 = Math.floor(totalXeng / 10000);
        totalXeng = totalXeng - n10000 * 10000;
      }

      if (totalXeng >= 5000) {
        n5000 = Math.floor(totalXeng / 5000);
        totalXeng = totalXeng - n5000 * 5000;
      }

      if (totalXeng >= 1000) {
        n1000 = Math.floor(totalXeng / 1000);
        totalXeng = totalXeng - n1000 * 1000;
      }

      let used = 0;
      for (var i = 0; i < n200000000; i++) {
        if (used > inputXeng.xengs.length - 1) break;
        let spr = inputXeng.xengs[used].getComponent(cc.Sprite);

        spr.node.active = true;
        spr.spriteFrame = this.chip200000000;

        used++;
      }
      for (var i = 0; i < n150000000; i++) {
        if (used > inputXeng.xengs.length - 1) break;
        let spr = inputXeng.xengs[used].getComponent(cc.Sprite);

        spr.node.active = true;
        spr.spriteFrame = this.chip150000000;

        used++;
      }
      for (var i = 0; i < n100000000; i++) {
        if (used > inputXeng.xengs.length - 1) break;
        let spr = inputXeng.xengs[used].getComponent(cc.Sprite);

        spr.node.active = true;
        spr.spriteFrame = this.chip100000000;

        used++;
      }
      for (var i = 0; i < n50000000; i++) {
        if (used > inputXeng.xengs.length - 1) break;
        let spr = inputXeng.xengs[used].getComponent(cc.Sprite);

        spr.node.active = true;
        spr.spriteFrame = this.chip50000000;

        used++;
      }
      for (var i = 0; i < n10000000; i++) {
        if (used > inputXeng.xengs.length - 1) break;
        let spr = inputXeng.xengs[used].getComponent(cc.Sprite);

        spr.node.active = true;
        spr.spriteFrame = this.chip10000000;

        used++;
      }
      for (var i = 0; i < n5000000; i++) {
        if (used > inputXeng.xengs.length - 1) break;
        let spr = inputXeng.xengs[used].getComponent(cc.Sprite);

        spr.node.active = true;
        spr.spriteFrame = this.chip5000000;

        used++;
      }
      for (var i = 0; i < n1000000; i++) {
        if (used > inputXeng.xengs.length - 1) break;
        let spr = inputXeng.xengs[used].getComponent(cc.Sprite);

        spr.node.active = true;
        spr.spriteFrame = this.chip1000000;

        used++;
      }
      for (var i = 0; i < n500000; i++) {
        if (used > inputXeng.xengs.length - 1) break;
        let spr = inputXeng.xengs[used].getComponent(cc.Sprite);

        spr.node.active = true;
        spr.spriteFrame = this.chip500000;

        used++;
      }
      for (var i = 0; i < n100000; i++) {
        if (used > inputXeng.xengs.length - 1) break;
        let spr = inputXeng.xengs[used].getComponent(cc.Sprite);

        spr.node.active = true;
        spr.spriteFrame = this.chip100000;

        used++;
      }
      for (var i = 0; i < n50000; i++) {
        if (used > inputXeng.xengs.length - 1) break;
        let spr = inputXeng.xengs[used].getComponent(cc.Sprite);

        spr.node.active = true;
        spr.spriteFrame = this.chip50000;

        used++;
      }
      for (var i = 0; i < n10000; i++) {
        if (used > inputXeng.xengs.length - 1) break;
        let spr = inputXeng.xengs[used].getComponent(cc.Sprite);

        spr.node.active = true;
        spr.spriteFrame = this.chip10000;

        used++;
      }
      for (var i = 0; i < n5000; i++) {
        if (used > inputXeng.xengs.length - 1) break;
        let spr = inputXeng.xengs[used].getComponent(cc.Sprite);

        spr.node.active = true;
        spr.spriteFrame = this.chip5000;
        used++;
      }
      for (var i = 0; i < n1000; i++) {
        if (used > inputXeng.xengs.length - 1) break;

        let spr = inputXeng.xengs[used].getComponent(cc.Sprite);
        spr.node.active = true;
        spr.spriteFrame = this.chip1000;
        used++;
      }

      for (i = used; i < inputXeng.xengs.length; i++) {
        //for (let i = inputXeng.xengs.length - used - 1; i >= 0; i--) {
        if (inputXeng.xengs[i]) inputXeng.xengs[i].active = false;
      }
    },
    //chuyen kieu input
    otherClicked: function () {
      this.betValue = 0;
      this.updateValueBetUI();

      this.nodeInputValue.active = !this.isInputValue;
      this.nodeInputFree.active = this.isInputValue;
      this.isInputValue = !this.isInputValue;
      this.audioChonSo.play();
    },

    //text xiu change
    onTextXiuChange: function (data) {
      this.betValue = data.toString();
      this.betValue = parseInt(this.betValue);
      // this.lbBetXiuTemp.string = cc.Tool.getInstance().formatMoney(
      //   this.betValue
      // );
      this.audioChonSo.play();
    },
    //text tai change
    onTextTaiChange: function (data) {
      this.betValue = data.toString();
      this.betValue = parseInt(this.betValue);
      // this.lbBetTaiTemp.string = cc.Tool.getInstance().formatMoney(
      //   this.betValue
      // );
      this.audioChonSo.play();
    },

    // CƯỢC TÀI
    onClickBetTai: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.TAI);
    },
    // CƯỢC XỈU
    onClickBetXiu: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.XIU);
    },
    //CƯỢC CHẴN
    onClickBetChan: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.CHAN);
    },
    //CƯỢC LẼ
    onClickBetLe: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.LE);
    },
    //CƯỢC 1_1
    onClickBet_1_1: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_1_1);
    },
    //CƯỢC 2_2
    onClickBet_2_2: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_2_2);
    },
    //CƯỢC 3_3
    onClickBet_3_3: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_3_3);
    },
    //CƯỢC 4_4
    onClickBet_4_4: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_4_4);
    },
    //CƯỢC 5_5
    onClickBet_5_5: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_5_5);
    },
    //CƯỢC 6_6
    onClickBet_6_6: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_6_6);
    },
    //CƯỢC 1_1_1
    onClickBet_1_1_1: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_1_1_1);
    },
    //CƯỢC 2_2_2
    onClickBet_2_2_2: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_2_2_2);
    },
    //CƯỢC 3_3_3
    onClickBet_3_3_3: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_3_3_3);
    },
    //CƯỢC 4_4_4
    onClickBet_4_4_4: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_4_4_4);
    },
    //CƯỢC 5_5_5
    onClickBet_5_5_5: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_5_5_5);
    },
    //CƯỢC 6_6_6
    onClickBet_6_6_6: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_6_6_6);
    },
    //CƯỢC BoBaBatKy
    onClickBet_BoBaBatKy: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_BOBABATKY);
    },
    //CƯỢC BTN_TONG_4
    onClickBet_BTN_TONG_4: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_TONG_4);
    },
    //CƯỢC BTN_TONG_5
    onClickBet_BTN_TONG_5: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_TONG_5);
    },
    //CƯỢC BTN_TONG_6
    onClickBet_BTN_TONG_6: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_TONG_6);
    },
    //CƯỢC BTN_TONG_7
    onClickBet_BTN_TONG_7: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_TONG_7);
    },
    //CƯỢC BTN_TONG_8
    onClickBet_BTN_TONG_8: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_TONG_8);
    },
    //CƯỢC BTN_TONG_9
    onClickBet_BTN_TONG_9: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_TONG_9);
    },
    //CƯỢC BTN_TONG_10
    onClickBet_BTN_TONG_10: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_TONG_10);
    },
    //CƯỢC BTN_TONG_11
    onClickBet_BTN_TONG_11: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_TONG_11);
    },
    //CƯỢC BTN_TONG_12
    onClickBet_BTN_TONG_12: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_TONG_12);
    },
    //CƯỢC BTN_TONG_13
    onClickBet_BTN_TONG_13: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_TONG_13);
    },
    //CƯỢC BTN_TONG_14
    onClickBet_BTN_TONG_14: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_TONG_14);
    },
    //CƯỢC BTN_TONG_15
    onClickBet_BTN_TONG_15: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_TONG_15);
    },
    //CƯỢC BTN_TONG_16
    onClickBet_BTN_TONG_16: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_TONG_16);
    },
    //CƯỢC BTN_TONG_17
    onClickBet_BTN_TONG_17: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_TONG_17);
    },
    //CƯỢC BTN_1_2
    onClickBet_BTN_1_2: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_1_2);
    },
    //CƯỢC BTN_1_3
    onClickBet_BTN_1_3: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_1_3);
    },
    //CƯỢC BTN_1_4
    onClickBet_BTN_1_4: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_1_4);
    },
    //CƯỢC BTN_1_5
    onClickBet_BTN_1_5: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_1_5);
    },
    //CƯỢC BTN_1_6
    onClickBet_BTN_1_6: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_1_6);
    },
    //CƯỢC BTN_2_3
    onClickBet_BTN_2_3: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_2_3);
    },
    //CƯỢC BTN_2_4
    onClickBet_BTN_2_4: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_2_4);
    },
    //CƯỢC BTN_2_5
    onClickBet_BTN_2_5: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_2_5);
    },
    //CƯỢC BTN_2_6
    onClickBet_BTN_2_6: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_2_6);
    },
    //CƯỢC BTN_3_4
    onClickBet_BTN_3_4: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_3_4);
    },
    //CƯỢC BTN_3_5
    onClickBet_BTN_3_5: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_3_5);
    },
    //CƯỢC BTN_3_6
    onClickBet_BTN_3_6: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_3_6);
    },
    //CƯỢC BTN_4_5
    onClickBet_BTN_4_5: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_4_5);
    },
    //CƯỢC BTN_4_6
    onClickBet_BTN_4_6: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_4_6);
    },
    //CƯỢC BTN_5_6
    onClickBet_BTN_5_6: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_5_6);
    },
    //CƯỢC BTN_1
    onClickBet_BTN_1: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_1);
    },
    //CƯỢC BTN_2
    onClickBet_BTN_2: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_2);
    },
    //CƯỢC BTN_3
    onClickBet_BTN_3: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_3);
    },
    //CƯỢC BTN_4
    onClickBet_BTN_4: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_4);
    },
    //CƯỢC BTN_5
    onClickBet_BTN_5: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_5);
    },
    //CƯỢC BTN_6
    onClickBet_BTN_6: function (e, data) {
      this._Internal_Click_Bet(e.target, cc.TaiXiuSicboBetSide.BTN_6);
    },
    onClickNextChip() {
      this.chipsIdx++;
      if (this.chipsIdx > 1) this.chipsIdx = 1;
      this.chips.x = -this.chipsIdx * 495;
    },
    onClickPrevChip() {
      this.chipsIdx--;
      if (this.chipsIdx < 0) this.chipsIdx = 0;
      this.chips.x = -this.chipsIdx * 495;
    },
    _Internal_Click_Bet: function (node, betSide, isBot = false) {
      this.betNode = node;
      this.betSide = betSide;

      let betChecked = this.chips
        .getComponent(cc.ToggleContainer)
        .toggleItems.find((e) => e.isChecked == true).node;

      this.betSprite = betChecked.getComponent(cc.Sprite).spriteFrame;
      this.betValue = Number(betChecked.name);

      BetSelf = {
        betNode: node,
        betSide: betSide,
        betValue: this.betValue,
      };

      if (!isBot) this.confirmClicked();
    },
  });
}).call(this);
