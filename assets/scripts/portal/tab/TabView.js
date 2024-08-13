/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
  cc.TabView = cc.Class({
    extends: cc.Component,
    properties: {
      nodeContent: cc.Node,

      nodeMinis: [cc.Node],
      nodeCards: [cc.Node],
      nodeSlots: [cc.Node],
	  nodelive: [cc.Node],
      nodethethao: [cc.Node],
      nodeSlots: [cc.Node],
      nodeAlls: [cc.Node],

      btnAll: cc.Button,
      btnSlots: cc.Button,
      btnlive: cc.Button,
      btnthethao: cc.Button,
      btnMini: cc.Button,
      btnCard: cc.Button,
    },
    onLoad: function () {
      this.nodeAlls.forEach(function (node) {
        if (node) node.active = true;
      });
      this.btnAll.interactable = false;
    },
    selectTabClicked: function (event, data) {
      this.btnAll.interactable = true;
      this.btnSlots.interactable = true;
	  this.btnlive.interactable = true;
      this.btnthethao.interactable = true;
      this.btnMini.interactable = true;
      this.btnCard.interactable = true;

      switch (data.toString()) {
        case "all":
          this.nodeAlls.forEach(function (node) {
            if (node) node.active = true;
          });
          this.btnAll.interactable = false;
          break;
        case "card":
          this.nodeAlls.forEach(function (node) {
            if (node) node.active = false;
          });
          this.nodeCards.forEach(function (node) {
            if (node) node.active = true;
          });
          this.btnCard.interactable = false;
        case "live":
          this.nodeAlls.forEach(function (node) {
            if (node) node.active = false;
          });
          this.nodelive.forEach(function (node) {
            if (node) node.active = true;
          });
          this.btnCard.interactable = false;
        case "thethao":
          this.nodeAlls.forEach(function (node) {
            if (node) node.active = false;
          });
          this.nodethethao.forEach(function (node) {
            if (node) node.active = true;
          });
          this.btnCard.interactable = false;
          break;
        case "slots":
          this.nodeAlls.forEach(function (node) {
            if (node) node.active = false;
          });
          this.nodeSlots.forEach(function (node) {
            if (node) node.active = true;
          });
          this.btnSlots.interactable = false;
          break;
        case "mini":
          this.nodeAlls.forEach(function (node) {
            if (node) node.active = false;
          });
          this.nodeMinis.forEach(function (node) {
            if (node) node.active = true;
          });
          this.btnMini.interactable = false;
          break;
      }

      // var self = this;
      // setTimeout(function () {
      //     self.nodeLayoutEvent.x = (-self.nodeContent.width) + 35;
      //     self.nodeLayoutJackpot.x = (-self.nodeContent.width);
      // }, 15);
    },
  });
}.call(this));
