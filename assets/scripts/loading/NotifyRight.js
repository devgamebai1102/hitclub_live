
cc.Class({
    extends: cc.Component,

    properties: {
		text1: cc.RichText,
		text2: cc.RichText,
		text3: cc.RichText,
		text4: cc.RichText,
		text5: cc.RichText,
		text6: cc.RichText,
		text7: cc.RichText,
		text8: cc.RichText,
		text9: cc.RichText,
		text10: cc.RichText,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		this.text1.node.active = true;
		this.randomShow();
	},
	
	randomShow: function() {
		var timer = 200;
		var self = this;
		setInterval(function() {
			if (timer > 0)
				timer--;
			if (timer <= 0)
				timer = 200;

			if (timer === 200) {
				self.text1.node.active = true;
				self.text2.node.active = false;
				self.text3.node.active = false;
				self.text4.node.active = false;
				self.text5.node.active = false;
				self.text6.node.active = false;
				self.text7.node.active = false;
				self.text8.node.active = false;
				self.text9.node.active = false;
				self.text10.node.active = false;
			}

			if (timer === 180) {
				self.text1.node.active = false;
				self.text2.node.active = true;
				self.text3.node.active = false;
				self.text4.node.active = false;
				self.text5.node.active = false;
				self.text6.node.active = false;
				self.text7.node.active = false;
				self.text8.node.active = false;
				self.text9.node.active = false;
				self.text10.node.active = false;
			}
			
			if (timer === 160) {
				self.text1.node.active = false;
				self.text2.node.active = false;
				self.text3.node.active = true;
				self.text4.node.active = false;
				self.text5.node.active = false;
				self.text6.node.active = false;
				self.text7.node.active = false;
				self.text8.node.active = false;
				self.text9.node.active = false;
				self.text10.node.active = false;
			}
			
			if (timer === 140) {
				self.text1.node.active = false;
				self.text2.node.active = false;
				self.text3.node.active = false;
				self.text4.node.active = true;
				self.text5.node.active = false;
				self.text6.node.active = false;
				self.text7.node.active = false;
				self.text8.node.active = false;
				self.text9.node.active = false;
				self.text10.node.active = false;
			}
			
			if (timer === 120) {
				self.text1.node.active = false;
				self.text2.node.active = false;
				self.text3.node.active = false;
				self.text4.node.active = false;
				self.text5.node.active = true;
				self.text6.node.active = false;
				self.text7.node.active = false;
				self.text8.node.active = false;
				self.text9.node.active = false;
				self.text10.node.active = false;
			}
			
			if (timer === 100) {
				self.text1.node.active = false;
				self.text2.node.active = false;
				self.text3.node.active = false;
				self.text4.node.active = false;
				self.text5.node.active = false;
				self.text6.node.active = true;
				self.text7.node.active = false;
				self.text8.node.active = false;
				self.text9.node.active = false;
				self.text10.node.active = false;
			}

			if (timer === 80) {
				self.text1.node.active = false;
				self.text2.node.active = false;
				self.text3.node.active = false;
				self.text4.node.active = false;
				self.text5.node.active = false;
				self.text6.node.active = false;
				self.text7.node.active = true;
				self.text8.node.active = false;
				self.text9.node.active = false;
				self.text10.node.active = false;
			}
			
			if (timer === 60) {
				self.text1.node.active = false;
				self.text2.node.active = false;
				self.text3.node.active = false;
				self.text4.node.active = false;
				self.text5.node.active = false;
				self.text6.node.active = false;
				self.text7.node.active = false;
				self.text8.node.active = true;
				self.text9.node.active = false;
				self.text10.node.active = false;
			}
			
			if (timer === 40) {
				self.text1.node.active = false;
				self.text2.node.active = false;
				self.text3.node.active = false;
				self.text4.node.active = false;
				self.text5.node.active = false;
				self.text6.node.active = false;
				self.text7.node.active = false;
				self.text8.node.active = false;
				self.text9.node.active = true;
				self.text10.node.active = false;
			}
			
			if (timer === 20) {
				self.text1.node.active = false;
				self.text2.node.active = false;
				self.text3.node.active = false;
				self.text4.node.active = false;
				self.text5.node.active = false;
				self.text6.node.active = false;
				self.text7.node.active = false;
				self.text8.node.active = false;
				self.text9.node.active = false;
				self.text10.node.active = true;
			}
		}, 1000);
		
	},
    // update (dt) {},
});
