/**
 * Created by Nofear on 3/15/2019.
 */

var helper = require("Helper");
(function () {
  cc.BankingView = cc.Class({
    extends: cc.Component,
    properties: {
      nodeStep1: cc.Node,
      // nodeStep2: cc.Node,
      // nodeHelp: cc.Node,

      // nodeLogoUSDTs: [cc.Node],

      //step1
      toggleChooseValue: cc.ToggleChooseValue,
      lbSelectedBank: cc.Label,
      animationMenuBank: cc.Animation,
      editBoxValue: cc.EditBox,
      editBoxtentk: cc.EditBox,
      editBoxnoidung: cc.EditBox,
      //  editBoxCaptcha: cc.EditBox,
      lbMoney: cc.Label,
      // imageUrlCaptcha: cc.ImageUrl,
      btnConfirm: cc.Button,
      // lbConfirms: [cc.Label],

      //step2
      lbInfoBank: cc.Label,
      lbInfoBankAccountNumber: cc.Label,
      lbInfoBankAccountName: cc.Label,
      lbInfoBankDesc: cc.Label,
      //  lbInfoMoney: cc.Label,
      // lbInfoTranID: cc.Label,

      // lbMinimum: cc.Label,
      // lbMaximum: cc.Label,
      // lbRate: cc.Label,

      //lbRule: cc.Label,
      //lbRule2: cc.Label,
    },

    onLoad: function () {
      this.OperatorID = -1;
      this.animOpenName = "showDropdownMenu";
      this.animCloseName = "hideDropdownMenu";
      this.contentChuyen =
        "vn " + cc.LoginController.getInstance().getLoginResponse().AccountName;

      // cc.TopupController.getInstance().setTopupView(this);

      // this.editBoxValue.placeholder = 'Số ' + cc.Config.getInstance().currency() + ' muốn nạp';

      cc.PopupController.getInstance().showBusy();
      this.getListTopupBank();
    },

    onEnable: function () {
      this.animationMenuBank.node.scaleY = 0;
      //  this.getCaptcha();
      this.resetInput();

      //3s click confirm 1 lan
      this.isTimerConfirm = false;
      this.timerConfirm = 0;
      this.timePerConfirm = 3;
      this.processTimeConfirm();

      this.nodeStep1.active = true;
      //this.nodeStep2.active = false;
      // this.nodeHelp.active = false;

      if (
        cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_3
      ) {
        // this.activateLogo(true);
        // switch (cc.ShopController.getInstance().getChargeDefault()) {
        //     case 'CARD':
        //         this.activateLogo(true);
        //         break;
        //     case 'BANK':
        //         this.activateLogo(true);
        //         break;
        //     default:
        //         this.activateLogo(false);
        // }
      } else {
        // this.activateLogo(false);
      }
    },

    update: function (dt) {
      if (this.isTimerConfirm) {
        this.timerConfirm -= dt;

        this.processTimeConfirm();
      }
    },

    activateLogo: function (enabled) {
      this.nodeLogoUSDTs.forEach(function (nodeLogo) {
        nodeLogo.active = enabled;
      });
    },

    getListTopupBank: function () {
      var getListTopupBank1Command = new cc.GetListTopupBank1Command();
      getListTopupBank1Command.execute(this);
    },

    onGetListTopupBankResponse: function (response) {
      cc.BankController.getInstance().setResponseTopupBanks(response);
      //this.rate = response.Rate;
      //this.min = response.Min;
      //this.max = response.Max;
      //this.contentChuyen = "thanhno " + response.Content;
      console.log(response);
      if (response.Type) {
        this.type = response.Type;
      }

      //this.lbMinimum.string = cc.Tool.getInstance().formatNumber(response.Min) + ' đ'; // + cc.Config.getInstance().currency();
      //this.lbMaximum.string = cc.Tool.getInstance().formatNumber(response.Max) + ' đ'; // + cc.Config.getInstance().currency();
      // this.lbRate.string = 'Nạp 100.000 đ nhận ' + cc.Tool.getInstance().formatNumber(Math.round(response.Rate * 100000)) + ' ' +  cc.Config.getInstance().currency();
      //this.lbRule.string = '\n' +  'Người chuyển chịu phí.\n' +
      "\n" +
        "Nhập chính xác số tiền và nội dung khi chuyển khoản. Nếu sai sẽ không nhận được " +
        cc.Config.getInstance().currency() +
        ".\n" +
        "\n" +
        "Hệ thống tự động cộng " +
        cc.Config.getInstance().currency() +
        " trong vòng 3 phút kể từ khi nhận được tiền trong tài khoản ngân hàng.\n" +
        "\n" +
        "Lưu ý: Chỉ chuyển trực tiếp trong hệ thống ngân hàng hoặc chuyển nhanh 24/7  qua Napas.";

      // this.lbRule2.string = 'Nhập chính xác số tiền và nội dung khi chuyển khoản. Nếu sai sẽ không nhận được ' + cc.Config.getInstance().currency();

      // {
      //     "ResponseCode": 1,
      //     "Banks": [
      //     {
      //         "BankName": "VPBank"
      //     },
      //     {
      //         "BankName": "Techcombank"
      //     },
      //     {
      //         "BankName": "Vietcombank"
      //     },
      //     {
      //         "BankName": "ACB"
      //     }
      // ],
      //     "Rate": 1.15
      // }

      var list = response.Banks;

      this.toggleChooseValue.resetListChooseValue();

      var self = this;
      var posY = -35; // Vi tri dau tien cua Item -> fix bug
      var index = 0;
      list.forEach(function (bank) {
        self.toggleChooseValue.initializeToggleChooseValue(
          self,
          "BankingView",
          "selectBankEvent",
          bank,
          bank.OperatorName,
          posY
        );
        //if (index === 0) {
        //    self.setLBSelectedBank(bank);
        //}
        //index++;

        //Moi phan tu cac nhau 50 (do ko dung layout de fix bug)
        posY -= 50;
      });
    },

    activeTimeConfirm: function () {
      this.isTimerConfirm = true;
      this.timerConfirm = this.timePerConfirm;
    },

    processTimeConfirm: function () {
      if (this.timerConfirm <= 0) {
        this.isTimerConfirm = false;
        this.btnConfirm.interactable = true;

        // this.lbConfirms.forEach(function (lbConfirm) {
        // lbConfirm.string = 'Lấy thông tin';
        // });
      } else {
        var self = this;
        var time = Math.round(self.timerConfirm);
        this.isTimerConfirm = true;
        this.btnConfirm.interactable = false;
        //   this.lbConfirms.forEach(function (lbConfirm) {
        //  lbConfirm.string = time;
        // });
      }
    },

    resetScale: function () {
      this.animationMenuBank.node.scaleY = 0;
      this.animationMenuBank.node.opacity = 255;
    },

    restoreScale: function () {
      this.animationMenuBank.node.scaleY = 1;
      this.animationMenuBank.node.opacity = 0;
    },

    resetInput: function () {
      if (this.editBoxValue) {
        this.editBoxValue.string = "";
        this.lbMoney.string = "Số tiền nhận được: " + "0";
      }
    },

    getCaptcha: function () {
      var getCaptchaCommand = new cc.GetCaptchaCommand();
      getCaptchaCommand.execute(this);
    },

    setLBSelectedBank: function (bank) {
      //var i = Math.floor(Math.random() * bank.BankItems.length);
      this.lbInfoBank.string = bank.OperatorName;
      this.OperatorID = bank.BankOperatorsSecondaryID;
      this.banks = bank;
      console.log(bank);
      if (this.banks !== null && this.banks !== undefined) {
        this.lbInfoBankAccountNumber.string =
          this.banks.BankItems[0].BankNumber;
        this.lbInfoBankAccountName.string = this.banks.BankItems[0].BankName;
      } else {
        this.lbInfoBankAccountNumber.string = "Vui lòng chọn ngân hàng!";
        this.lbInfoBankAccountName.string = "Vui lòng chọn ngân hàng!";
      }
      //this.lbInfoTranID.string = cc.LoginController.getInstance().getNickname();
      this.bankCode = bank.OperatorCode;
      // var chargeBankCommand = new cc.ChargeBankCommand;
      // chargeBankCommand.execute(this);
		  this.lbInfoBankDesc.string = cc.LoginController.getInstance().getNickname();
    },

    selectBank: function (value) {
      this.bankType = value;
    },

    onGetCaptchaResponse: function (response) {
      if (this.imageUrlCaptcha)
        this.imageUrlCaptcha.get(
          "data:image/png;base64," +
            cc.Tool.getInstance().removeStr(response[1], "\r\n")
        );
    },

    onChargeBankResponse: function (response) {
      //if (response.Message)
      //    cc.PopupController.getInstance().showMessage(response.Message);
      //else if (response.Description)
      //    cc.PopupController.getInstance().showMessage(response.Description);
      //else {
      if (response != null) {
        //this.nodeStep1.active = false;
        //this.nodeStep2.active = true;
        // {
        //     "ResponseCode": 1,
        //     "Orders": {
        //     "Amount": 100000, //tien VND
        //         "Code": "UT342DUV",
        //         "Timeout": 120,
        //         "Remain": 7199.982861,
        //         "AmountReceived": 115000, //tien Game
        //         "Banks": {
        //             "BankName": "VPBank",
        //             "MasterBankAccount": "188630917",
        //             "MasterBankName": "CHU THUY QUYNH"
        //         }
        //     }
        // }

        var orders = response.Orders;
        this.orders = orders;
        this.banks = orders.List;
        //     if (orders.List.BankOperatorsSecondaryID === 3){
        // 		this.lbInfoBank.string = 'Vietcombank';
        // }else if (orders.List.BankOperatorsSecondaryID === 2){
        // 		this.lbInfoBank.string = 'Techcombank';
        // }else  if (orders.List.BankOperatorsSecondaryID === 1){
        // 		this.lbInfoBank.string = 'Ngân hàng quốc tế VIB';
        // }else if (orders.List.BankOperatorsSecondaryID === 4){
        // 		this.lbInfoBank.string = 'Ngân hàng TPBank';
        // }else if (orders.List.BankOperatorsSecondaryID === 5){
        // 		this.lbInfoBank.string = 'Ngân hàng MBBank';
        // }else  if (orders.List.BankOperatorsSecondaryID === 6){
        // 		this.lbInfoBank.string = 'Ngân hàng ACB';
        // }else if (orders.List.BankOperatorsSecondaryID === 7){
        // 		this.lbInfoBank.string = 'Ngân hàng MSB';
        // }else if (orders.List.BankOperatorsSecondaryID === 8){
        // 		this.lbInfoBank.string = 'Agribank';
        // }else  if (orders.List.BankOperatorsSecondaryID === 9){
        // 		this.lbInfoBank.string = 'SeaBank';
        // }else if (orders.List.BankOperatorsSecondaryID === 10){
        // 		this.lbInfoBank.string = 'Ví Điện Tử - MoMo';
        // }else{
        // 	this.lbInfoBank.string = orders.List.BankOperatorsSecondaryID;
        // }
        this.lbInfoBank.string = orders.List.OperatorName;

        this.lbInfoBankAccountNumber.string = orders.List.BankNumber;
        this.lbInfoBankAccountName.string = orders.List.BankName;
        //this.lbInfoMoney.string = cc.Tool.getInstance().formatNumber(orders.Amount);
        var macode = helper.randomStringABC(5);
        var name = cc.LoginController.getInstance().getLoginResponse();
        //this.lbInfoTranID.string = "Btc "+macode+name.AccountName;
        // this.lbInfoTranID.string = orders.List.code+" "+macode+name.AccountName;
        //HH:MM ngày DDMMYY
        //var lateTime = cc.Tool.getInstance().getLocalDateNow3(-2);
        //this.lbRule2.string = 'Hãy chuyển tiền vào tài khoản ngân hàng theo nội dung bên dưới.\nThời gian chuyển chậm nhất ' + lateTime + ' (2 giờ).'
      }

      //cc.PopupController.getInstance().showMessage('Gửi yêu cầu nạp thành công.');

      //this.getCaptcha();
      this.resetInput();
    },

    onChargeBankResponseError: function (response) {
      if (response.Description)
        cc.PopupController.getInstance().showMessageError(response.Description);
      else
        cc.PopupController.getInstance().showMessageError(
          response.Message,
          response.ResponseCode
        );

      // this.getCaptcha();
      //nap that bai thi reset captcha
      //this.editBoxCaptcha.string = '';
    },

    copyBankClicked: function () {},

    copyBankAccountNumberClicked: function () {
      if (
        this.banks != null &&
        cc.Tool.getInstance().copyToClipboard(this.lbInfoBankAccountNumber.string)
      ) {
        cc.PopupController.getInstance().showMessage(
          "Đã sao chép số tài khoản."
        );
      }
    },

    copyBankAccountNameClicked: function () {
      if (
        this.banks != null &&
        cc.Tool.getInstance().copyToClipboard(this.lbInfoBankAccountName.string)
      ) {
        cc.PopupController.getInstance().showMessage(
          "Đã sao chép tên tài khoản."
        );
      }
    },

    copyMoneyValueClicked: function () {},

    copylbInfoBankDesc: function () {
      if (
        this.banks != null &&
        cc.Tool.getInstance().copyToClipboard(this.lbInfoBankDesc.string)
      ) {
        cc.PopupController.getInstance().showMessage(
          "Đã sao chép nội dung chuyển khoản."
        );
      }
    },

    onEditingValueChanged: function () {
      var val = cc.Tool.getInstance().removeDot(this.editBoxValue.string);
      this.editBoxValue.string = cc.Tool.getInstance().formatNumberkvn1102(val);

      //fix loi lam tron
      // if (this.rate === 1.15
      //     && (val === 100 || val === 100000 || val === 100000000 ||
      //         val === 200 || val === 200000 || val === 200000000 ||
      //         val === 400 || val === 400000 || val === 400000000 ||
      //         val === 700 || val === 700000 || val === 700000000 ||
      //         val === 800 || val === 800000 || val === 800000000
      //     )) {
      //     var receive = Math.floor(val * this.rate) + 1;
      // } else {
      //     receive = Math.floor(val * this.rate);
      // }
      var receive = Math.round(val * this.rate);

      this.lbMoney.string =
        "Số " +
        cc.Config.getInstance().currency() +
        " nhận được: " +
        cc.Tool.getInstance().formatNumber(receive);
    },

    onEditingValueDidEnd: function () {
      var val = cc.Tool.getInstance().removeDot(this.editBoxValue.string);
      this.editBoxValue.string = cc.Tool.getInstance().formatNumberkvn1102(val);

      //fix loi lam tron
      // if (this.rate === 1.15
      //     && (val === 100 || val === 100000 || val === 100000000 ||
      //         val === 200 || val === 200000 || val === 200000000 ||
      //         val === 400 || val === 400000 || val === 400000000 ||
      //         val === 700 || val === 700000 || val === 700000000 ||
      //         val === 800 || val === 800000 || val === 800000000
      //     )) {
      //     var receive = Math.floor(val * this.rate) + 1;
      // } else {
      //     receive = Math.floor(val * this.rate);
      // }

      var receive = Math.round(val * this.rate);

      this.lbMoney.string =
        "Số " +
        cc.Config.getInstance().currency() +
        " nhận được: " +
        cc.Tool.getInstance().formatNumber(receive);
    },

    openMenuBankClicked: function () {
      this.animationMenuBank.play(this.animOpenName);
    },

    hideMenuBankClicked: function () {
      this.animationMenuBank.play(this.animCloseName);
    },

    selectBankEvent: function (event, data) {
      this.bankCode = data.bankCode;
      this.selectBank(data.BankName);
      this.setLBSelectedBank(data);
      this.animationMenuBank.play(this.animCloseName);
    },

    chooseBankClicked: function (event, data) {
      this.selectBank(data.toString());
      this.setLBSelectedBank(data.toString());
    },

    refreshCaptchaClicked: function () {
      this.getCaptcha();
    },

    historyClicked: function () {
      cc.LobbyController.getInstance().createHistoryView(cc.HistoryTab.BANK);
    },

    continueClicked: function () {
      this.nodeStep1.active = true;
      this.nodeStep2.active = false;
      this.resetInput();
    },

    topupClicked: function () {
      this.amount = cc.Tool.getInstance().removeDot(this.editBoxValue.string);
      // this.captcha = this.editBoxCaptcha.string;
      if (this.lbInfoBank.string === "") {
        cc.PopupController.getInstance().showMessage(
          "Vui lòng chọn ngân hàng."
        );
        return;
      }
      if (this.editBoxValue.string === "") {
        cc.PopupController.getInstance().showMessage(
          "Vui lòng nhập số tiền muốn nạp."
        );
        return;
      }

      // if (this.editBoxtentk === '') {
      //     cc.PopupController.getInstance().showMessage('Vui lòng nhập tên người gửi.');
      //     return;
      // }
      //   if (this.editBoxnoidung === '') {
      //     cc.PopupController.getInstance().showMessage('Vui lòng nhập nội dung chuyển tiền.');
      //     return;
      // }

      if (this.amount > this.max) {
        cc.PopupController.getInstance().showMessage(
          "Số tiền nạp tối đa là " +
            cc.Tool.getInstance().formatNumber(this.max) +
            " đ"
        );
        return;
      }

      if (this.amount < this.min) {
        cc.PopupController.getInstance().showMessage(
          "Số tiền nạp tối thiểu là " +
            cc.Tool.getInstance().formatNumber(this.min) +
            " đ"
        );
        return;
      }

      this.VarAmount = helper.getOnlyNumberInString(this.editBoxValue.string);

      var Naptienbanking = new cc.Naptienbanking();

      Naptienbanking.execute(this);
      this.activeTimeConfirm();
    },
    onNaptienbankingResponse: function (data) {
      cc.PopupController.getInstance().showMessage(
        "Gửi yêu cầu nạp tiền thành công!"
      );
    },
    onNaptienbankingResponseError: function (data) {
      cc.PopupController.getInstance().showMessageError(data.Message);
    },
    helpClicked: function () {
      // this.nodeHelp.active = true;
    },

    closeHelpClicked: function () {
      this.nodeHelp.active = false;
    },
  });
}.call(this));
