
(function () {
    cc.XXLivestreamSetting = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            nodeDisplayChatOn: cc.Node,
            nodeDisplayChatOff: cc.Node,
            nodeHieuUngOn: cc.Node,
            nodeHieuUngOff:cc.Node,
            nodeSoundOn:cc.Node,
            nodeSoundOff:cc.Node
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
            this.displayChat = true;
            this.hieuung = true;
            this.sound = cc.Tool.getInstance().getItem("@Sound").toString() === 'true';
            if (this.sound) {
                this.nodeSoundOn.active = true;
                this.nodeSoundOff.active = false;
                //bat sound               
            }
            else{
                this.nodeSoundOn.active = false;
                this.nodeSoundOff.active = true;
                //tatsound
            }
            cc.AudioController.getInstance().enableSound(this.sound);
        },
        
        btnSound:function(){
            this.sound = !this.sound;
            cc.Tool.getInstance().setItem("@Sound", this.sound);

            if (this.sound) {
                this.nodeSoundOn.active = true;
                this.nodeSoundOff.active = false;
                //bat sound               
            }
            else{
                this.nodeSoundOn.active = false;
                this.nodeSoundOff.active = true;
                //tatsound
            }
            cc.AudioController.getInstance().enableSound(this.sound);
        },
        btnDisplayChat:function(){
            this.displayChat = !this.displayChat;

            if (this.displayChat) {
                this.nodeDisplayChatOn.active = true;
                this.nodeDisplayChatOff.active = false;
                //bat sound               
            }
            else{
                this.nodeDisplayChatOn.active = false;
                this.nodeDisplayChatOff.active = true;
                //tatsound
            }
        },
        btnHieuUng:function(){
            this.hieuung = !this.hieuung;

            if (this.hieuung) {
                this.nodeHieuUngOn.active = true;
                this.nodeHieuUngOff.active = false;
                //bat sound               
            }
            else{
                this.nodeHieuUngOn.active = false;
                this.nodeHieuUngOff.active = true;
                //tatsound
            }
        },

        closeFinished: function () {
            cc.XXLivestreamPopupController.getInstance().destroySettingView();
        },
    });
}).call(this);
