

(function () {
    var TXSICBOGetResultSessionInfoCommand;

    TXSICBOGetResultSessionInfoCommand = (function () {
        function TXSICBOGetResultSessionInfoCommand() {

        }

        TXSICBOGetResultSessionInfoCommand.prototype.execute = function (controller, sessionId) {
            var url = 'api/sicbo/GetResultSessionInfo?sessionId=' + sessionId;
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {
				console.log(response);
                var obj = JSON.parse(response);
                return controller.onTXGetResultSessionInfoResponse(obj);
            });					
        };		
        return TXSICBOGetResultSessionInfoCommand;

    })();

    cc.TXSICBOGetResultSessionInfoCommand = TXSICBOGetResultSessionInfoCommand;

}).call(this);
