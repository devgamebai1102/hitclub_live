

(function () {
    var TXSICBOGetHistoryCommand;

    TXSICBOGetHistoryCommand = (function () {
        function TXSICBOGetHistoryCommand() {
        }

        TXSICBOGetHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/sicbo/GetHistory';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {
				//console.log(response);
                var obj = JSON.parse(response);
                return controller.onTXGetHistoryResponse(obj);
            });
        };

        return TXSICBOGetHistoryCommand;

    })();

    cc.TXSICBOGetHistoryCommand = TXSICBOGetHistoryCommand;

}).call(this);
