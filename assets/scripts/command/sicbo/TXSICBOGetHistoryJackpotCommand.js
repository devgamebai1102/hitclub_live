

(function () {
    var TXSICBOGetHistoryJackpotCommand;

    TXSICBOGetHistoryJackpotCommand = (function () {
        function TXSICBOGetHistoryJackpotCommand() {
        }

        TXSICBOGetHistoryJackpotCommand.prototype.execute = function (controller) {
            var url = 'api/sicbo/GetJackpotsHis';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetHistoryResponse(obj);
            });
        };

        return TXSICBOGetHistoryJackpotCommand;

    })();

    cc.TXSICBOGetHistoryJackpotCommand = TXSICBOGetHistoryJackpotCommand;

}).call(this);
