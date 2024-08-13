/**
 * Created by Nofear on 6/7/2017.
 */
import Utils from "../../../scripts/shootFish/common/Utils";
import Tween from "../../../scripts/shootFish/common/Tween";
var netConfig = require("NetConfig");

(function () {
  cc.LobbyView = cc.Class({
    extends: cc.Component,
    properties: {
      //prefab portal

      prefabLoginView: cc.Prefab,
      prefabAccountView: cc.Prefab,

      prefabShopTopupViewBank: cc.Prefab,

      prefabShopCastOutView: cc.Prefab,

      prefabHistoryView: cc.Prefab,
      // prefabHistoryViewBank: cc.Prefab,

      setingview: cc.Node,
      showhotrophone: cc.Node,
      showhopthu: cc.Node,
      hotrosdtvn: cc.Node,
      //hotrolivechat: cc.Node,

      prefabEvent: cc.Prefab,
      prefabVQMM: cc.Prefab,

      //event - x2 Nap
      prefabX2Popup: cc.Prefab,
      prefabX2Reward: cc.Prefab,

      //prefab FX summon Dragon
      prefabFxSummonDragon: cc.Prefab,

      //slots chinh
      //prefabShowPercentLoadGame:cc.Prefab,
      lbLoadingEgypt: cc.Label,
      progressBarAquarium: cc.ProgressBar,
      progressBanCa: cc.ProgressBar,
      progressEgypt: cc.ProgressBar,
      progressTK: cc.ProgressBar,
      progressDragonBall: cc.ProgressBar,
      progressCowboy: cc.ProgressBar,
      progressDragonTiger: cc.ProgressBar,
      progressXocXoc: cc.ProgressBar,
      progressTaiXiu: cc.ProgressBar,
      progressTaiXiuMd5: cc.ProgressBar,
      progressxocdiaLiveStream: cc.ProgressBar,
      progressTaiXiuLiveStream: cc.ProgressBar,
      progressTaiXiuSieuToc: cc.ProgressBar,
      progressMiniPoker: cc.ProgressBar,
      progress777: cc.ProgressBar,
      progressTQ: cc.ProgressBar,
      progressPoker: cc.ProgressBar,
      progressThreeCards: cc.ProgressBar,
      progressTLMN: cc.ProgressBar,
      progressTLMNSolo: cc.ProgressBar,
      progressMB: cc.ProgressBar,
      progressBaccarat: cc.ProgressBar,
      progressBauCua: cc.ProgressBar,
      progressLoDe: cc.ProgressBar,
      lbLoadingTK: cc.Label,
      lbLoadingAquarium: cc.Label,
      lbLoadingDragonBall: cc.Label,

      lbLoadingCowboy: cc.Label,

      lbLoadingDragonTiger: cc.Label,
      lbLoadingXocXoc: cc.Label,
      lbLoadingBauCua: cc.Label,
      lbLoadingLoDe: cc.Label,

      //minigame
      lbLoadingTaiXiu: cc.Label,
      lbLoadingTaiXiuMd5: cc.Label,
      lbLoadingxocdiaLiveStream: cc.Label,
      lbLoadingTaiXiuLiveStream: cc.Label,
      lbLoadingTaiXiuSieuToc: cc.Label,
      lbLoadingSicbo: cc.Label,
      lbLoadingMiniPoker: cc.Label,
      lbLoading777: cc.Label,
      lbLoadingTQ: cc.Label,

      //card game
      lbLoadingPoker: cc.Label,
      lbLoadingThreeCards: cc.Label,
      lbLoadingTLMN: cc.Label,
      lbLoadingTLMNSolo: cc.Label,
      lbLoadingMB: cc.Label,
      lbLoadingBaccarat: cc.Label,

      //ban ca
      lbLoadingShootFish: cc.Label,

      nodemanutab: cc.Node,
      nodeLobbys: [cc.Node],
      nodeTopBar: cc.Node,
      nodeSetting: cc.Node,

      //audio
      audioBg: cc.AudioSource,
      toggleAudio: cc.Toggle,
      lbTopVp: cc.Label,
	  
      wvThinhvip: cc.Node,

      nodeEventTop: cc.Node,
      nodeguest: cc.Node,
      //Esports
      lbJpbaucua: cc.Label,
      lbJpxocdia: cc.Label,
      //lbLoadingEsport: cc.Label,
    },
    start() {
      let scale = 100000;
      this.jackpot0 = Utils.randomRangeInt(2000 * scale, 700 * scale);
      this.jackpotMax0 =
        this.jackpot0 + Utils.randomRangeInt(2000 * scale, 400 * scale);
      this.jackpot1 = Utils.randomRangeInt(2000 * scale, 700 * scale);
      Tween.numberTo(this.lbJpbaucua, this.jackpot1, 1);
      Tween.numberTo(this.lbJpxocdia, this.jackpot0, 1);
      // this.updateNext0 = Utils.randomRangeInt(3, 5);
        },
        actWebView: function(){
            this.wvThinhvip.active = !this.wvThinhvip.active;
        },
    // use this for initialization
    onLoad: function () {
      if (cc.sys.isNative && cc.sys.isMobile) {
        jsb.device &&
          jsb.device.setKeepScreenOn &&
          jsb.device.setKeepScreenOn(true);
      }
      this.nodeguest.active = true;
      this.nodemanutab.active = false;
      cc.LobbyController.getInstance().setLobbyView(this);
      this.nodeTaiXiu = null;
      this.nodeTaiXiuMd5 = null;
      this.nodeTaiXiuSieuToc = null;
      this.nodexocdiaLiveStream = null;
      this.nodeTaiXiuLiveStream = null;
      this.nodeSicbo = null;
      this.nodeEsport = null;
      this.nodeMiniPoker = null;
      this.node777 = null;
      this.nodeTQ = null;
      this.nodeLW = null;
      this.nodeSlotsView = null;
      this.nodeVQMMView = null;
      var tool = cc.Tool.getInstance();
      if (tool.getItem("@onAudioBg") !== null) {
        if (tool.getItem("@onAudioBg") === "true") {
          this.IsOnAudioBg = true;
        } else {
          this.IsOnAudioBg = false;
        }
      } else {
        this.IsOnAudioBg = true;
      }
      this.toggleAudio.isChecked = this.IsOnAudioBg;
    },

    onEnable: function () {
      if (this.IsOnAudioBg) {
        this.audioBg.play();
      } else {
        this.audioBg.stop();
      }
      this.lbTopVp.string = cc.Tool.getInstance().formatNumber(
        cc.LoginController.getInstance().getTopVPResponse()
      );
      if (!cc.LoginController.getInstance().getLoginState()) {
        var tool = cc.Tool.getInstance();
        if (tool.getItem("@isLanding") !== null) {
          if (tool.getItem("@isLanding") === "true") {
            cc.LobbyController.getInstance().showRegisterView();
          }
        }
      }
    },
    livechat: function () {
      cc.sys.openURL(cc.Config.getInstance().liveChat());
    },
    fanpage: function () {
      cc.sys.openURL(cc.Config.getInstance().fanPageFB());
    },
    actsodienthoai() {
      this.showhotrophone.active = !this.showhotrophone.active;
      return;
    },
    actshowhopthu() {
      this.showhopthu.active = !this.showhopthu.active;
      return;
    },

    actsetingview() {
      this.setingview.active = !this.setingview.active;
      return;
    },
    acthotro() {
      this.hotrosdtvn.active = !this.hotrosdtvn.active;
      return;
    },
    acthotrolivechat() {
      this.hotrolivechat.active = !this.hotrolivechat.active;
      return;
    },

    //event X2
    createX2PopupView: function () {
      this.nodeX2Popup = this.createView(this.prefabX2Popup);
    },

    destroyX2PopupView: function () {
      if (this.nodeX2Popup) this.nodeX2Popup.destroy();
    },

    createX2RewardView: function () {
      this.nodeX2Reward = this.createView(this.prefabX2Reward);
    },

    destroyX2RewardView: function () {
      if (this.nodeX2Reward) this.nodeX2Reward.destroy();
    },

    //event san KHO BAU
    createEventPopupView: function () {
      if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
        this.nodeEventPopup = this.createView(this.prefabEventPopup);
      } else {
        this.nodeEventPopup = this.createView(this.prefabEventVNPopup);
      }
    },

    destroyEventPopupView: function () {
      if (this.nodeEventPopup) this.nodeEventPopup.destroy();
    },

    //event san KHO BAU
    createTreasureView: function () {
      this.nodeTreasureView = this.createView(this.prefabTreasure);
    },

    destroyTreasureView: function () {
      if (this.nodeTreasureView) this.nodeTreasureView.destroy();
    },

    //buy carrot
    createBuyCarrotView: function () {
      this.nodeBuyCarrotView = this.createView(this.prefabBuyCarrot);
    },

    destroyBuyCarrotView: function () {
      if (this.nodeBuyCarrotView) this.nodeBuyCarrotView.destroy();
    },

    //chon qua vat ly
    createTreasureGiftView: function () {
      this.nodeTreasureGiftView = this.createView(this.prefabTreasureGift);
    },

    destroyTreasureGiftView: function () {
      if (this.nodeTreasureGiftView) this.nodeTreasureGiftView.destroy();
    },

    //carrot daily bonus popup
    createCarrotDailyBonusView: function () {
      this.nodeCarrotDailyBonusView = this.createView(
        this.prefabCarrotDailyBonus
      );
    },

    destroyCarrotDailyBonusView: function () {
      if (this.nodeCarrotDailyBonusView)
        this.nodeCarrotDailyBonusView.destroy();
    },

    //treasure rule popup
    createTreasureRuleView: function () {
      this.nodeTreasureRuleView = this.createView(this.prefabTreasureRule);
    },

    destroyTreasureRuleView: function () {
      if (this.nodeTreasureRuleView) this.nodeTreasureRuleView.destroy();
    },

    //treasure top popup
    createTreasureTopView: function () {
      this.nodeTreasureTopView = this.createView(this.prefabTreasureTop);
    },

    destroyTreasureTopView: function () {
      if (this.nodeTreasureTopView) this.nodeTreasureTopView.destroy();
    },

    //Fx
    createFxSummonDragon: function () {
      this.nodeFxSummonDragon = this.createView(this.prefabFxSummonDragon);
    },

    destroyFxSummonDragon: function () {
      if (this.nodeFxSummonDragon) this.nodeFxSummonDragon.destroy();
    },
    //end fx

    //Portal Portal Portal
    createLoginView: function () {
      if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
        this.nodeLoginView = this.createView(this.prefabLoginView);
      } else {
        this.nodeLoginView = this.createView(this.prefabLoginView);
      }
    },

    destroyLoginView: function () {
      if (this.nodeLoginView) this.nodeLoginView.destroy();
    },

    //createVQMMView: function () {
    //  if (this.nodeVQMMView === null) {
    //      this.nodeVQMMView = this.createView(this.prefabVQMM);
    //  }
    // },

    // destroyVQMMView: function () {
    //  if (this.nodeVQMMView) {
    //   this.nodeVQMMView.destroy();
    //   this.nodeVQMMView = null;
    // }
    //   },

    createHistoryView: function () {
      // if (cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_3
      //     || cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_2) {
      //     this.nodeHistoryView = this.createView(this.prefabHistoryViewBank);
      // } else {
      //     this.nodeHistoryView = this.createView(this.prefabHistoryView);
      // }

      if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
        //this.nodeHistoryView = this.createView(this.prefabHistoryViewBank);
        this.nodeHistoryView = this.createView(this.prefabHistoryView);
      }

      //hide cac node o lobby
      // this.activeNodeLobby(false);
    },

    destroyHistoryView: function () {
      // this.activeNodeLobby(true);

      //cc.BannerController.getInstance().switchPage();

      if (this.nodeHistoryView) this.nodeHistoryView.destroy();
    },

    createAccountView: function () {
      this.nodeAccountView = this.createView(this.prefabAccountView);
      //hide cac node o lobby
      // this.activeNodeLobby(false);
    },

    destroyAccountView: function () {
      // this.activeNodeLobby(true);

      //cc.BannerController.getInstance().switchPage();

      cc.LobbyController.getInstance().refreshAccountInfo();
      if (this.nodeAccountView) this.nodeAccountView.destroy();
    },

    createSecurityView: function () {
      this.nodeSecurityView = this.createView(this.prefabSecurityView);
      //hide cac node o lobby
      // this.activeNodeLobby(false);
    },

    destroySecurityView: function () {
      cc.LobbyController.getInstance().refreshAccountInfo();
      if (this.nodeSecurityView) this.nodeSecurityView.destroy();
    },

    createPopupUpdateUserPassView: function () {
      this.nodePopupUpdateUserPass = this.createView(
        this.prefabPopupUpdateUserPass
      );
    },

    destroyPopupUpdateUserPassView: function () {
      cc.LobbyController.getInstance().refreshAccountInfo();
      if (this.nodePopupUpdateUserPass) this.nodePopupUpdateUserPass.destroy();
    },

    createShopTopupView: function () {
      // if (cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_3) {
      //     this.nodeShopTopupView = this.createView(this.prefabShopTopupViewBank);
      // } else {
      //     this.nodeShopTopupView = this.createView(this.prefabShopTopupView);
      // }

      this.nodeShopTopupView = this.createView(this.prefabShopTopupViewBank);

      //hide cac node o lobby
      // this.activeNodeLobby(false);
    },

    destroyShopTopupView: function () {
      // this.activeNodeLobby(true);

      //cc.BannerController.getInstance().switchPage();

      cc.LobbyController.getInstance().refreshAccountInfo();
      if (this.nodeShopTopupView) this.nodeShopTopupView.destroy();
      //hide cac node o lobby
    },

    createShopCastOutView: function () {
      // if (cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_3) {
      //     this.nodeShopTopupView = this.createView(this.prefabShopTopupViewBank);
      // } else {
      //     this.nodeShopTopupView = this.createView(this.prefabShopTopupView);
      // }
      console.log("createShopCastOutView:" + 1);
      this.nodeShopCastOutView = this.createView(this.prefabShopCastOutView);

      //hide cac node o lobby
      // this.activeNodeLobby(false);
    },
    offuserguest: function () {
      this.nodeguest.active = false;
    },

    destroyShopCastOutView: function () {
      // this.activeNodeLobby(true);

      //cc.BannerController.getInstance().switchPage();

      cc.LobbyController.getInstance().refreshAccountInfo();
      if (this.nodeShopCastOutView) this.nodeShopCastOutView.destroy();
      //hide cac node o lobby
    },

    createShopView: function () {
      if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
        // this.nodeShopView = this.createView(this.prefabShopView);
        // this.nodeShopView = this.createView(this.prefabShopViewBank);

        if (
          cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_3
        ) {
          this.nodeShopView = this.createView(this.prefabShopViewBank);
        } else {
          this.nodeShopView = this.createView(this.prefabShopView);
        }
      }

      //hide cac node o lobby
      // this.activeNodeLobby(false);
    },

    destroyShopView: function () {
      // this.activeNodeLobby(true);

      //cc.BannerController.getInstance().switchPage();

      cc.LobbyController.getInstance().refreshAccountInfo();
      if (this.nodeShopView) this.nodeShopView.destroy();
      //hide cac node o lobby
    },

    createEventView: function () {
      this.nodeEventView = this.createView(this.prefabEvent);
    },

    createAppSafeHelpView: function () {
      this.createView(this.prefabAppSafeHelp);
    },

    createDNSHelpView: function () {
      this.createView(this.prefabDNSHelp);
    },

    createUpdateAccountView: function () {
      this.createView(this.prefabUpdateAccount);
    },

    createMoveBBView: function () {
      this.createView(this.prefabMoveBB);
    },
    destroyMoveBBView: function () {
      if (this.prefabMoveBB) this.prefabMoveBB.destroy();
    },

    createBlockBBView: function () {
      this.createView(this.prefabBlockBB);
    },
    //Tao cac game (prefab load dynamic)
    createDynamicView: function (gameId) {
      switch (gameId) {
        case cc.GameId.XOC_DIA_LIVESTREAM:

        //kiem tra da tao roi -> ko tao them
        if (this.nodexocdiaLiveStream !== null) {
          return;
        }

        this.isLoading = true;
        var self = this;
        //Bat loading
        self.lbLoadingxocdiaLiveStream.node.parent.active = true;
        var percent = 0;
        cc.loader.loadRes(
          "xocdialivestream/prefabs/xocdiaLivestreamView",
          function (a, b, c) {
            var tempPercent = Math.round((100 * a) / b);

            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
            if (tempPercent > percent) {
              percent = tempPercent;
            }
            self.progressxocdiaLiveStream.progress = a / b;
            self.lbLoadingxocdiaLiveStream.string = parseInt((a / b) * 100) + "%";
          },
          function (err, prefab) {
            //Load xong
            self.isLoading = false;
            //Tat loading
            self.lbLoadingxocdiaLiveStream.node.parent.active = false;
            //Tao game
            self.nodexocdiaLiveStream = self.createView(prefab);
          }
        );
        break;

      case cc.GameId.TAI_XIU_LIVESTREAM:

        //kiem tra da tao roi -> ko tao them
        if (this.nodeTaiXiuLiveStream !== null) {
          return;
        }

        this.isLoading = true;
        var self = this;
        //Bat loading
        self.lbLoadingTaiXiuLiveStream.node.parent.active = true;
        var percent = 0;
        cc.loader.loadRes(
          "taixiuLivestream/prefabs/taixiuLivestreamView",
          function (a, b, c) {
            var tempPercent = Math.round((100 * a) / b);

            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
            if (tempPercent > percent) {
              percent = tempPercent;
            }
            self.progressTaiXiuLiveStream.progress = a / b;
            self.lbLoadingTaiXiuLiveStream.string = parseInt((a / b) * 100) + "%";
          },
          function (err, prefab) {
            //Load xong
            self.isLoading = false;
            //Tat loading
            self.lbLoadingTaiXiuLiveStream.node.parent.active = false;
            //Tao game
            self.nodeTaiXiuLiveStream = self.createView(prefab);
          }
        );
        break;
        case cc.GameId.SHOOT_FISH:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingShootFish.node.parent.active = true;
          var percent = 0;
          //self.progressBarbanca.percent = percent / 100;
          cc.loader.loadRes(
            "shootFish/prefabs/ShootFish",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressBanCa.progress = a / b;
              self.lbLoadingShootFish.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingShootFish.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              //hide cac node o lobby
              self.activeNodeLobby(false);
            }
          );

          break;

        case cc.GameId.EGYPT:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingEgypt.node.parent.active = true;
          //

          //

          var percent = 0;
          cc.loader.loadRes(
            "egypt/prefabs/egyptView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressEgypt.progress = a / b;
              self.lbLoadingEgypt.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingEgypt.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              //hide cac node o lobby
              self.activeNodeLobby(false);
            }
          );
          break;

        case cc.GameId.THREE_KINGDOM:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingTK.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "tk/prefabs/tkView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressTK.progress = a / b;
              self.lbLoadingTK.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingTK.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
            }
          );

          break;

        case cc.GameId.AQUARIUM:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingAquarium.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "aquarium/prefabs/aquariumView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressBarAquarium.progress = a / b;
              self.lbLoadingAquarium.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingAquarium.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
            }
          );
          break;

        case cc.GameId.DRAGON_BALL:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingDragonBall.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "dragonball/prefabs/dbView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressDragonBall.progress = a / b;
              self.lbLoadingDragonBall.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingDragonBall.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
            }
          );
          break;

        case cc.GameId.COWBOY:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingCowboy.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "cowboy/prefabs/cbView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressCowboy.progress = a / b;
              self.lbLoadingCowboy.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingCowboy.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
            }
          );
          break;

        case cc.GameId.DRAGON_TIGER:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingDragonTiger.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "dragontiger/prefabs/dragonTigerView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressDragonTiger.progress = a / b;
              self.lbLoadingDragonTiger.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingDragonTiger.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
            }
          );
          break;

        case cc.GameId.XOC_XOC:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingXocXoc.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "xocxoc/prefabs/xocxocView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressXocXoc.progress = a / b;
              self.lbLoadingXocXoc.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingXocXoc.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
            }
          );
          break;

        case cc.GameId.TAI_XIU:
          //kiem tra da tao roi -> ko tao them
          if (this.nodeTaiXiu !== null) return;

          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingTaiXiu.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "taixiu/prefabs/taixiuView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressTaiXiu.progress = a / b;
              self.lbLoadingTaiXiu.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingTaiXiu.node.parent.active = false;
              //Tao game
              self.nodeTaiXiu = self.createView(prefab);
            }
          );
          break;
        case cc.GameId.TAI_XIU_MD5:
          //kiem tra da tao roi -> ko tao them
          if (this.nodeTaiXiuMd5 !== null) return;

          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingTaiXiuMd5.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "taixiumd5/prefabs/taixiuMd5View",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressTaiXiuMd5.progress = a / b;
              self.lbLoadingTaiXiuMd5.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingTaiXiuMd5.node.parent.active = false;
              //Tao game
              self.nodeTaiXiuMd5 = self.createView(prefab);
            }
          );
          break;
        case cc.GameId.TAI_XIU_SIEU_TOC:
            //kiem tra da tao roi -> ko tao them
            if (this.nodeTaiXiuSieuToc !== null) return;
  
            this.isLoading = true;
            var self = this;
            //Bat loading
            self.lbLoadingTaiXiuSieuToc.node.parent.active = true;
            var percent = 0;
            cc.loader.loadRes(
              "taixiusieutoc/prefabs/taiXiuSieuTocView",
              function (a, b, c) {
                var tempPercent = Math.round((100 * a) / b);
  
                //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                if (tempPercent > percent) {
                  percent = tempPercent;
                }
                self.progressTaiXiuSieuToc.progress = a / b;
                self.lbLoadingTaiXiuSieuToc.string = `${parseInt((a / b) * 100)}%`;
              },
              function (err, prefab) {
                //Load xong
                self.isLoading = false;
                //Tat loading
                self.lbLoadingTaiXiuSieuToc.node.parent.active = false;
                //Tao game
                self.nodeTaiXiuSieuToc = self.createView(prefab);
              }
            );
            break;
        case cc.GameId.SICBO:
          //kiem tra da tao roi -> ko tao them
          if (this.nodeSicbo !== null) return;

          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingSicbo.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "sicbo/prefabs/SicboView",
            cc.Prefab,
            function (completedCount, totalCount, item) {
              var tempPercent = Math.round(100 * (completedCount / totalCount));

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }

              self.lbLoadingSicbo.string = percent + "%";
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingSicbo.node.parent.active = false;
              //Tao game
              self.nodeSicbo = self.createView(prefab);
            }
          );
          break;

        case cc.GameId.MINI_POKER:
          //kiem tra da tao roi -> ko tao them
          if (this.nodeMiniPoker !== null) return;

          this.isLoading = true;
          var self = this;
          var percent = 0;
          //Bat loading
          self.lbLoadingMiniPoker.node.parent.active = true;
          // self.progressBar.percent = percent / 100;

          cc.loader.loadRes(
            "minipoker/prefabs/minipokerView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressMiniPoker.progress = a / b;
              self.lbLoadingMiniPoker.string = `${parseInt((a / b) * 100)}%`;
              // self.progressBar.percent = percent / 100;
              self.lbLoadingMiniPoker.string = percent + "%";
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingMiniPoker.node.parent.active = false;
              //Tao game
              self.nodeMiniPoker = self.createView(prefab);
            }
          );
          break;

        case cc.GameId.SEVEN77:
          //kiem tra da tao roi -> ko tao them
          if (this.node777 !== null) return;

          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoading777.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "777/prefabs/777View",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progress777.progress = a / b;
              self.lbLoading777.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoading777.node.parent.active = false;
              //Tao game
              self.node777 = self.createView(prefab);
            }
          );

          break;

        case cc.GameId.BLOCK_BUSTER:
          //kiem tra da tao roi -> ko tao them
          if (this.nodeTQ !== null) return;

          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingTQ.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "tq/prefabs/tqView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressTQ.progress = a / b;
              self.lbLoadingTQ.string = `${parseInt((a / b) * 100)}%`;

              self.lbLoadingTQ.string = percent + "%";
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingTQ.node.parent.active = false;
              //Tao game
              self.nodeTQ = self.createView(prefab);
            }
          );

          break;

        //CARD GAME
        case cc.GameId.POKER_TEXAS:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingPoker.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "poker/prefabs/pokerView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressPoker.progress = a / b;
              self.lbLoadingPoker.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingPoker.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
              self.activeNodeTopBar(true);
            }
          );
          break;

        case cc.GameId.BA_CAY:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingThreeCards.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "3cay/prefabs/3CLobby",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressThreeCards.progress = a / b;
              self.lbLoadingThreeCards.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingThreeCards.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
              self.activeNodeTopBar(true);
            }
          );
          break;

        case cc.GameId.TIEN_LEN_MN:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingTLMN.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "tienlenMN/prefabs/TLMNLobby",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressTLMN.progress = a / b;
              self.lbLoadingTLMN.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingTLMN.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
              self.activeNodeTopBar(true);
            }
          );
          break;

        case cc.GameId.TIEN_LEN_MN_SOLO:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingTLMNSolo.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "tienlenMNSoLo/prefabs/TLMNSoLoLobby",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressTLMNSolo.progress = a / b;
              self.lbLoadingTLMNSolo.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingTLMNSolo.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
              self.activeNodeTopBar(true);
            }
          );
          break;

        case cc.GameId.MAU_BINH:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingMB.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "maubinh/prefabs/MBLobby",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressMB.progress = a / b;
              self.lbLoadingMB.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingMB.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
              self.activeNodeTopBar(true);
            }
          );
          break;

        case cc.GameId.BACCARAT:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingBaccarat.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "bacarat/prefabs/BaCaratView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressBaccarat.progress = a / b;
              self.lbLoadingBaccarat.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingBaccarat.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);
              self.activeNodeLobby(false);
            }
          );
          break;
        case cc.GameId.BAUCUA:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;
          //Bat loading
          self.lbLoadingBauCua.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "baucua/prefabs/BauCuaView",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressBauCua.progress = a / b;
              self.lbLoadingBauCua.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingBauCua.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);
              self.activeNodeLobby(false);
            }
          );
          break;

        case cc.GameId.LODE:
          if (this.nodeSlotsView !== null) return;

          cc.RoomController.getInstance().setGameId(gameId);
          this.isLoading = true;
          var self = this;

          //Bat loading
          self.lbLoadingLoDe.node.parent.active = true;
          var percent = 0;
          cc.loader.loadRes(
            "lode/prefabs/LoDeLobby",
            function (a, b, c) {
              var tempPercent = Math.round((100 * a) / b);

              //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
              if (tempPercent > percent) {
                percent = tempPercent;
              }
              self.progressLoDe.progress = a / b;
              self.lbLoadingLoDe.string = `${parseInt((a / b) * 100)}%`;
            },
            function (err, prefab) {
              //Load xong
              self.isLoading = false;
              //Tat loading
              self.lbLoadingLoDe.node.parent.active = false;
              //Tao game
              self.nodeSlotsView = self.createView(prefab);

              self.activeNodeLobby(false);
             // self.activeNodeTopBar(true);
            }
          );
          break;
      }
    },

    destroyDynamicView: function (gameId) {
      switch (gameId) {
        case cc.GameId.EVENT_TREASURE:
          if (this.nodeTreasureView) {
            this.nodeTreasureView.destroy();
            this.nodeTreasureView = null;
          }

          if (this.nodeTreasureGiftView) {
            this.nodeTreasureGiftView.destroy();
            this.nodeTreasureGiftView = null;
          }

          if (this.nodeBuyCarrotView) {
            this.nodeBuyCarrotView.destroy();
            this.nodeBuyCarrotView = null;
          }
          break;
        case cc.GameId.TAI_XIU:
          if (this.nodeTaiXiu) {
            this.nodeTaiXiu.destroy();
            this.nodeTaiXiu = null;
          }
          break;
        case cc.GameId.TAI_XIU_MD5:
          if (this.nodeTaiXiuMd5) {
            this.nodeTaiXiuMd5.destroy();
            this.nodeTaiXiuMd5 = null;
          }
          break;
        case cc.GameId.TAI_XIU_SIEU_TOC:
          if (this.nodeTaiXiuSieuToc) {
            this.nodeTaiXiuSieuToc.destroy();
            this.nodeTaiXiuSieuToc = null;
          }
          break;
          case cc.GameId.XOC_DIA_LIVESTREAM:
          if (this.nodexocdiaLiveStream) {
            this.nodexocdiaLiveStream.destroy();
            this.nodexocdiaLiveStream = null;
          }
          break;
        case cc.GameId.TAI_XIU_LIVESTREAM:
          if (this.nodeTaiXiuLiveStream) {
            this.nodeTaiXiuLiveStream.destroy();
            this.nodeTaiXiuLiveStream = null;
          }
          break;
        case cc.GameId.SICBO:
          if (this.nodeSicbo) {
            this.nodeSicbo.destroy();
            this.nodeSicbo = null;
          }
          break;
        case cc.GameId.MINI_POKER:
          if (this.nodeMiniPoker) {
            this.nodeMiniPoker.destroy();
            this.nodeMiniPoker = null;
          }
          break;
        case cc.GameId.SEVEN77:
          if (this.node777) {
            this.node777.destroy();
            this.node777 = null;
          }
          break;
        case cc.GameId.BLOCK_BUSTER:
          if (this.nodeTQ) {
            this.nodeTQ.destroy();
            this.nodeTQ = null;
          }
          break;
        case cc.GameId.LUCKY_WILD:
          if (this.nodeLW) {
            this.nodeLW.destroy();
            this.nodeLW = null;
          }
          break;
        case cc.GameId.ESPORTS:
          if (this.nodeEsport) {
            this.nodeEsport.destroy();
            this.nodeEsport = null;
          }
          break;
        default:
          this.activeNodeTopBar(false);
          //bat lai cac node o lobby
          this.activeNodeLobby(true);

          //cc.BannerController.getInstance().switchPage();

          //mac dinh se là cac game slots
          if (this.nodeSlotsView) {
            this.nodeSlotsView.destroy();
            this.nodeSlotsView = null;
          }

          if (this.nodeEventView) {
            this.nodeEventView.destroy();
            this.nodeEventView = null;
          }

          if (this.nodeEventViewTopVP) {
            this.nodeEventViewTopVP.destroy();
            this.nodeEventViewTopVP = null;
          }

          break;
      }
      cc.LobbyController.getInstance().refreshAccountInfo();
    },

    destroyAllMiniGameView: function () {
      this.destroyDynamicView(cc.GameId.TAI_XIU);
      this.destroyDynamicView(cc.GameId.TAI_XIU_MD5);
      this.destroyDynamicView(cc.GameId.TAI_XIU_SIEU_TOC);
      this.destroyDynamicView(cc.GameId.TAI_XIU_LIVESTREAM);
      this.destroyDynamicView(cc.GameId.XOC_DIA_LIVESTREAM);
      this.destroyDynamicView(cc.GameId.SICBO);
      this.destroyDynamicView(cc.GameId.MINI_POKER);
      this.destroyDynamicView(cc.GameId.SEVEN77);
      this.destroyDynamicView(cc.GameId.BLOCK_BUSTER);
      this.destroyDynamicView(cc.GameId.LUCKY_WILD);

      this.destroyDynamicView(null);
    },

    createView: function (prefab, posY) {
      var nodeView = cc.instantiate(prefab);
      nodeView.parent = this.node;
      if (posY) {
        nodeView.setPosition(0, posY);
      } else {
        nodeView.setPosition(0, 0);
      }

      return nodeView;
    },

     loginSuccess: function () {
			this.nodeguest.active = false;
			this.nodemanutab.active = true;
            cc.OneSignalController.getInstance().sendTag('AccountID', cc.LoginController.getInstance().getUserId());
            cc.OneSignalController.getInstance().sendTag('AccountName', cc.LoginController.getInstance().getNickname());

            //cap nhat lai trang thai
            cc.LoginController.getInstance().setLoginState(true);
            //hien UI NickName + avatar
            cc.LobbyController.getInstance().updateUILogin(false);
            //open hub portal
            cc.GameController.getInstance().portalNegotiate();

            cc.LobbyController.getInstance().topBarUpdateInfo();

            //Kiem tra thu chua doc
            cc.LobbyController.getInstance().getMailUnRead();

            //Bat huong dan appSafe sau khi Login + chua tich hopj AppSafe
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();

            if (!cc.DomainController.getInstance().checkErrorDomain()) {
                

                cc.DDNA.getInstance().clientDevice();
                cc.DDNA.getInstance().gameStarted();

                var getChargeDefaultCommand = new cc.GetChargeDefaultCommand;
                getChargeDefaultCommand.execute(this);
            }

           
        },

    //EVENT SAN KHO BAU
    checkHaveDailyBonus: function () {
      var treasureGetCarrotNameKnownCommand =
        new cc.TreasureGetCarrotNameKnownCommand();
      treasureGetCarrotNameKnownCommand.execute(this);
    },

    onTreasureGetCarrotNameKnownResponse: function (response) {
      if (response !== null)
        cc.TreasureController.getInstance().setIsDailyBonus(response.IsInDay); //= true la nhan roi

      //chua nhan thi moi hien
      if (response !== null && !response.IsInDay) {
        cc.LobbyController.getInstance().createCarrotDailyBonusView();
      }
    },

    joinGame: function (gameId) {
      if (cc.LoginController.getInstance().checkLogin()) {
        if (this.isLoading) return;

        if (gameId === undefined) {
          // || gameId === cc.GameId.BLOCK_BUSTER
          //cc.PopupController.getInstance().showMessage('Sắp ra mắt!');
          cc.PopupController.getInstance().showMessage("Sắp ra mắt!");
          return;
        }

        switch (gameId.toString()) {
          case cc.GameId.SHOOT_FISH:
            this.createDynamicView(cc.GameId.SHOOT_FISH);
            break;
          case cc.GameId.ESPORTS:
            this.createDynamicView(cc.GameId.ESPORTS);
            break;
          //Game slots chinh
          case cc.GameId.EGYPT:
            this.createDynamicView(cc.GameId.EGYPT);
            break;
          case cc.GameId.THREE_KINGDOM:
            this.createDynamicView(cc.GameId.THREE_KINGDOM);
            break;
            case cc.GameId.XOC_DIA_LIVESTREAM:
            this.createDynamicView(cc.GameId.XOC_DIA_LIVESTREAM);
            break;
          case cc.GameId.TAI_XIU_LIVESTREAM:
            this.createDynamicView(cc.GameId.TAI_XIU_LIVESTREAM);
            break;
          case cc.GameId.AQUARIUM:
            this.createDynamicView(cc.GameId.AQUARIUM);
            break;
          case cc.GameId.DRAGON_BALL:
            this.createDynamicView(cc.GameId.DRAGON_BALL);
            break;
          case cc.GameId.BUM_BUM:
            this.createDynamicView(cc.GameId.BUM_BUM);
            break;
          case cc.GameId.COWBOY:
            this.createDynamicView(cc.GameId.COWBOY);
            break;
          case cc.GameId.THUONG_HAI:
            this.createDynamicView(cc.GameId.THUONG_HAI);
            break;
          case cc.GameId.GAINHAY:
            this.createDynamicView(cc.GameId.GAINHAY);
            break;
          //Game mini full màn hình
          case cc.GameId.BACCARAT:
            this.createDynamicView(cc.GameId.BACCARAT);
            break;
          case cc.GameId.MONKEY:
            this.createDynamicView(cc.GameId.MONKEY);
            break;
          case cc.GameId.DRAGON_TIGER:
            this.createDynamicView(cc.GameId.DRAGON_TIGER);
            break;
          case cc.GameId.BAUCUA:
            this.createDynamicView(cc.GameId.BAUCUA);
            break;
          //CARD GAME
          case cc.GameId.XOC_XOC:
            this.createDynamicView(cc.GameId.XOC_XOC);
            break;
          case cc.GameId.POKER_TEXAS:
          case cc.GameId.BA_CAY:
          case cc.GameId.TIEN_LEN_MN:
          case cc.GameId.TIEN_LEN_MN_SOLO:
            if (cc.BalanceController.getInstance().getBalance() < 20000) {
              cc.PopupController.getInstance().showMessage(
                "Bạn không đủ tiền để vào phòng. Tối thiểu cần 10.000"
              );
              return;
            } else {
              this.createDynamicView(gameId.toString());
            }
            break;
          case cc.GameId.MAU_BINH:
		  case cc.GameId.SICBO:
            if (cc.BalanceController.getInstance().getBalance() < 30000) {
              cc.PopupController.getInstance().showMessage(
                "Bạn không đủ tiền để vào phòng. Tối thiểu cần 30.000"
              );
              return;
            } else {
              this.createDynamicView(gameId.toString());
            }
            break;
          //MINI game
          case cc.GameId.TAI_XIU:
            this.createDynamicView(cc.GameId.TAI_XIU);
            break;
          case cc.GameId.TAI_XIU_MD5:
            this.createDynamicView(cc.GameId.TAI_XIU_MD5);
            break;
          case cc.GameId.TAI_XIU_SIEU_TOC:
            this.createDynamicView(cc.GameId.TAI_XIU_SIEU_TOC);
            break;
          case cc.GameId.SICBO:
            this.createDynamicView(cc.GameId.SICBO);
            break;
          case cc.GameId.MINI_POKER:
            this.createDynamicView(cc.GameId.MINI_POKER);
            break;
          case cc.GameId.SEVEN77:
            this.createDynamicView(cc.GameId.SEVEN77);
            break;
          case cc.GameId.BLOCK_BUSTER:
            this.createDynamicView(cc.GameId.BLOCK_BUSTER);
            break;
          case cc.GameId.LUCKY_WILD:
            this.createDynamicView(cc.GameId.LUCKY_WILD);
            break;

          case cc.GameId.LODE:
            this.createDynamicView(cc.GameId.LODE);
            break;
          case cc.GameId.VIETLOT:
            this.createDynamicView(cc.GameId.VIETLOT);
            break;
          case "100":
            cc.PopupController.getInstance().showMessage("Sắp ra mắt");
            break;
          case "101":
            cc.PopupController.getInstance().showMessage("Sắp ra mắt");
            break;
        }
      }
    },

    gamebaitri: function () {
      cc.PopupController.getInstance().showMessage("Sắp ra mắt!");
    },

    gamebaotri: function () {
      cc.PopupController.getInstance().showMessage("Game bảo trì!");
    },

    refreshAccountInfo: function () {
      var getAccountInfoCommand = new cc.GetAccountInfoCommand();
      getAccountInfoCommand.execute(this);
    },

    activeNodeLobby: function (enable) {
      if (enable) {
        this.nodeguest.active = true;
        this.nodemanutab.active = false;
        this.activeNodeTopBar(false);
        this.playAudioBg();
      } else {
        this.nodeguest.active = false;
        this.nodemanutab.active = false;
        this.audioBg.stop();
      }
      this.nodeEventTop.active = enable;
      this.nodemanutab.active = enable;
      this.nodeLobbys.forEach(function (nodeLobby) {
        nodeLobby.active = enable;
      });

      cc.LobbyController.getInstance().setLobbyActive(enable);
    },

    activeNodeTopBar: function (enable) {
      this.nodeTopBar.active = enable;
      this.nodeSetting.active = enable;
      this.nodeTopBar.getComponent(cc.TopBarView).isCardGame = enable;
      if (enable) {
        this.nodeTopBar.zIndex = cc.NoteDepth.TOP_BAR_CARD_GAME;
        this.refreshAccountInfo();
      } else {
        this.nodeTopBar.zIndex = cc.NoteDepth.TOP_BAR;
      }
    },

    //response
    onGetAccountInfoResponse: function (response) {
      if (response !== null) {
        cc.LoginController.getInstance().setLoginResponse(response.AccountInfo);
        cc.LoginController.getInstance().setNextVPResponse(response.NextVIP);
        cc.LoginController.getInstance().setTopVPResponse(response.TopVP);
      }
      cc.LobbyController.getInstance().topBarUpdateInfo();
      this.lbTopVp.string = cc.Tool.getInstance().formatNumber(
        cc.LoginController.getInstance().getTopVPResponse()
      );
    },

     checkVQMMInfo: function () {
          var vqmmGetInfoCommand = new cc.VQMMGetInfoCommand;
      vqmmGetInfoCommand.execute(this);
      },

     onVQMMGetInfoResponse: function (response) {
    //Quantity":1,"IsOpen":false,"Response":0}
       if (response !== null && response.Quantity > 0 && response.IsOpen) {
         this.createVQMMView();
      }
      },

    joinGameClicked: function (event, data) {
      if (cc.LoginController.getInstance().checkLogin()) {
        this.joinGame(data);
        cc.DDNA.getInstance().uiInteraction(
          cc.DDNAUILocation.PORTAL,
          cc.DDNA.getInstance().getGameById(data.toString()),
          cc.DDNAUIType.BUTTON
        );
      }
    },

    setIsAudioBg: function () {
      this.IsOnAudioBg = !this.IsOnAudioBg;
      cc.Tool.getInstance().setItem("@onAudioBg", this.IsOnAudioBg);
      if (this.IsOnAudioBg) this.audioBg.play();
      else this.audioBg.stop();
      this.toggleAudio.isChecked = this.IsOnAudioBg;
    },

    playAudioBg: function () {
      if (this.IsOnAudioBg) {
        this.audioBg.play();
      } else {
        this.audioBg.stop();
      }
    },
  });
}.call(this));
