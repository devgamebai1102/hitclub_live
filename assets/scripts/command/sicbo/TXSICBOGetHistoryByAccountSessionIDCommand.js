

(function () {
    var TXSICBOGetHistoryByAccountSessionIDCommand;

    TXSICBOGetHistoryByAccountSessionIDCommand = (function () {
        function TXSICBOGetHistoryByAccountSessionIDCommand() {
        }

        TXSICBOGetHistoryByAccountSessionIDCommand.prototype.execute = function (controller, sessionId) {
            var url = 'api/sicbo/GetHistoryByAccountSessionID?sessionId=' + sessionId;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {
				//console.log(response);
                var obj = JSON.parse(response);
                return controller.onTXGetHistoryBySessionIdResponse(obj);
            });
        };

        return TXSICBOGetHistoryByAccountSessionIDCommand;

    })();

    cc.TXSICBOGetHistoryByAccountSessionIDCommand = TXSICBOGetHistoryByAccountSessionIDCommand;

}).call(this);
