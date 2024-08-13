

(function () {
    var TXLIVESTREAMGetHistoryJackpotCommand;

    TXLIVESTREAMGetHistoryJackpotCommand = (function () {
        function TXLIVESTREAMGetHistoryJackpotCommand() {
        }

        TXLIVESTREAMGetHistoryJackpotCommand.prototype.execute = function (controller) {
            var url = 'api/livestreamluckydice/GetJackpotsHis';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_LIVESTREAM, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetHistoryResponse(obj);
            });
        };

        return TXLIVESTREAMGetHistoryJackpotCommand;

    })();

    cc.TXLIVESTREAMGetHistoryJackpotCommand = TXLIVESTREAMGetHistoryJackpotCommand;

}).call(this);
