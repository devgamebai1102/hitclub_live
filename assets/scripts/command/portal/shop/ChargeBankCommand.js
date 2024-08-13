/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var ChargeBankCommand;

    ChargeBankCommand = (function () {
        function ChargeBankCommand() {
        }

        ChargeBankCommand.prototype.execute = function (controller) {
            console.log(controller.bankCode);
            var url = 'api/MopayBank/GetBank?bankCode=' +controller.bankCode;

            if (controller.type) {
                var params = JSON.stringify({
                    Amount: controller.amount,
                    BankName: controller.lbSelectedBank.string,
                    Type: controller.type,
                    PrivateKey: cc.ServerConnector.getInstance().getCaptchaPrivateKey(),
                    Captcha: controller.captcha,
                });
            } else {
                var params = JSON.stringify({
                    Amount: controller.amount,
                    BankName: controller.lbSelectedBank.string,
                    PrivateKey: cc.ServerConnector.getInstance().getCaptchaPrivateKey(),
                    Captcha: controller.captcha,
                    OperatorID: controller.operatorID
                });
            }

            cc.PopupController.getInstance().showBusy();

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);

                cc.PopupController.getInstance().hideBusy();

                if (obj.ResponseCode === 1) {
                    //========
                    return controller.onChargeBankResponse(obj);
                } else {
                    return controller.onChargeBankResponseError(obj);

                }

            });
        };

        return ChargeBankCommand;

    })();

    cc.ChargeBankCommand = ChargeBankCommand;

}).call(this);
