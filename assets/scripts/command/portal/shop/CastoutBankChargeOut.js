/**
 * Created by Nofear on 3/19/2019.
 */

 (function () {
    var CastoutBankChargeOut;

    CastoutBankChargeOut = (function () {
        function CastoutBankChargeOut() {
        }

        CastoutBankChargeOut.prototype.execute = function (controller) {
            var url = 'api/CastOutBank/ChargeOut';
           
            var params = JSON.stringify({
                SoTk:controller.VarSoTk,
                NameTk:controller.VarNameTk,
                Amount:controller.VarAmount,
				CodeValue:controller.VarCodeValue,
				Otp:controller.VarOtp,
                BankName:controller.VarBankName
            });

            cc.PopupController.getInstance().showBusy();
            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                cc.PopupController.getInstance().hideBusy();
                if (obj.ResponseCode === 1) {
                    return controller.onCastoutBankChargeOutResponse(obj);
                } else {
                    return controller.onCastoutBankChargeOutResponseError(obj);

                }
            });
        };
        return CastoutBankChargeOut;

    })();
    cc.CastoutBankChargeOut = CastoutBankChargeOut;

}).call(this);
