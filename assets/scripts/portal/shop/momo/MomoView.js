/**
 * Created by Nofear on 3/15/2019.
 */

 (function () {
    cc.MomoView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeActive: cc.Node,
            nodeDeActive: cc.Node,
            nodeDeForm:cc.Node,
            lbMoMoName: cc.Label,
            lbMoMoPhone: cc.Label,
            lbMoMoContent: cc.Label,
            lbMoMoContent2: cc.Label,
            lbMoMos: [cc.Label],
            lbQRMoMo: cc.Sprite,
			lbCoins: [cc.Label],
			lbMoMotime: cc.Label,
            nodeRates: [cc.Node],
            lbColCoin: cc.Label,
            lbRule: cc.Label,
            editBoxMenhGia: cc.EditBox,
        },

        onLoad: function () {
            this.lbColCoin.string = cc.Config.getInstance().currency() + ' nhận';
            this.lbRule.string = 'Lưu ý:\n' +
                '- Nhập SAI: Số điện thoại, nội dung chuyển khoản sẽ không nhận\n' +
                'được ' + cc.Config.getInstance().currency() + '\n' +
                '- Chỉ chuyển khoản tối thiểu 10.000.\n' +
                '- Kiểm tra nội dung chuyển khoản trước khi thực hiện chuyển khoản.\n' +
                '- Hệ thống sẽ tự động cộng ' + cc.Config.getInstance().currency() + ' trong vòng 3 phút kể từ khi nhận \n' +
                'được tiền trong tài khoản MoMo';
            this._action = false;
                
        },
        onStart :function () {
            this._action = false;
             
            this.nodeActive.active = false;
            this.nodeDeForm.active = true;
            this.nodeDeActive.active =false;
        },
        onEnable: function () {
            this.nodeRates.forEach(function (nodeRate) {
                nodeRate.active = false;
            });
            this._action = false;
            // var response = {
            //     ResponseCode: 1,
            //     Orders: {
            //         Message: "MAX 15665119",
            //         WalletAccountName: "Nguyen Van Canh",
            //         WalletAccount: "0398665428",
            //         Rate: 1.15,
            //         List: [
            //             10000,
            //             20000,
            //             50000,
            //             100000,
            //             200000,
            //             500000,
            //             100000
            //         ]
            //     }
            // };

            // this.onGetListMomoResponse(response);

            // this.onGetListMomoResponseError(response);

          //  this.amountNap = 10000;

          //  var getListMomoCommand = new cc.GetListMomoCommand;
           // getListMomoCommand.execute(this);

            this.nodeActive.active = false;
            this.nodeDeForm.active = true;
            this.nodeDeActive.active =false;

        },
		
		
        onGetListMomoResponse: function (response) {
    // Gán giá trị cho các thành phần UI
    this.lbMoMoName.string = response.Orders.WalletAccountName || '';
    this.lbMoMoPhone.string = response.Orders.WalletAccount || '';
    this.lbMoMoContent.string = this.generateRandomNumber();
    this.lbMoMoContent2.string = response.Orders.Message || '';

    // Xử lý danh sách Orders.List
    response.Orders.List.slice(0, 7).forEach((item, index) => {
        this.lbMoMos[index].string = cc.Tool.getInstance().formatNumber(item.Amount);
        this.lbCoins[index].string = cc.Tool.getInstance().formatNumber(item.AmountReceive);
        this.nodeRates[index].active = true;
    });

    // Xử lý theo điều kiện _action
    this.nodeActive.active = this._action;
    this.nodeDeActive.active = !this._action;
    this.nodeDeForm.active = !this._action;
},

generateRandomNumber: function () {
    return (Math.floor(100000 + Math.random() * 900000)).toString();
},


        onGetListMomoResponseError: function (response) {
            this.nodeActive.active = false;
            this.nodeDeForm.active = false;
            this.nodeDeActive.active = true;
        },

        copyMoMoAccountClicked: function () {
    const moMoAccountNumber = "0357494982";
    
    if (cc.Tool.getInstance().copyToClipboard(moMoAccountNumber)) {
        cc.PopupController.getInstance().showMessage('Đã sao chép số tài khoản.');
    }
},

		showQRImage: function () {
    var lbQRMoMoSprite = this.lbQRMoMo.getComponent(cc.Sprite);
    var lbMoMoContentLabel = this.lbMoMoContent.getComponent(cc.Label);

    if (lbQRMoMoSprite && lbMoMoContentLabel) {
        // Thay đổi spriteFrame của lbQRMoMo thành hình ảnh bạn muốn hiển thị
        // lbQRMoMoSprite.spriteFrame = newSpriteFrame;

        // Hiển thị nội dung từ lbMoMoContent
        var randomNumber = Math.floor(100000 + Math.random() * 900000);
        lbMoMoContentLabel.string = randomNumber.toString();

        // Hiển thị node lbQRMoMo và lbMoMoContent
        lbQRMoMoSprite.node.active = true;
        this.lbMoMoContent.node.active = true;
    }
},
		
        copyMoMonamebankClicked: function () {
    const moMoContent = "DO TIEN HAI";
    
    if (cc.Tool.getInstance().copyToClipboard(moMoContent)) {
        cc.PopupController.getInstance().showMessage('Đã sao chép tên người nhận.');
    }
},
		copyMoMoContentClicked: function () {
    const moMoContent = this.lbMoMoContent.string;
    
    if (cc.Tool.getInstance().copyToClipboard(moMoContent)) {
        cc.PopupController.getInstance().showMessage('Đã sao chép nội dung chuyển khoản.');
    }
},


        napTien: function (event) {
            this._action = true;
            //this.amountNap = cc.Tool.getInstance().removeDot(this.editBoxMenhGia.string);
			this.amountNap = "500000";
            var getListMomoCommand = new cc.GetListMomoCommand;
            getListMomoCommand.execute(this);
            
           this.nodeActive.active = true;
           this.nodeDeForm.active = false;
        },
        onEditingValueChanged: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxMenhGia.string);
            this.editBoxMenhGia.string = cc.Tool.getInstance().formatNumber(val);
           // this.lbValueTransfer.string = 'Số ' + cc.Config.getInstance().currency() + ' cần chuyển: ' + this.editBoxMenhGia.string;
        },

        onEditingValueDidEnd: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxMenhGia.string);
            this.editBoxMenhGia.string = cc.Tool.getInstance().formatNumber(val);
           //this.lbValueTransfer.string = 'Số ' + cc.Config.getInstance().currency() + ' cần chuyển: ' + this.editBoxMenhGia.string;
        },

    });
}).call(this);
		
		