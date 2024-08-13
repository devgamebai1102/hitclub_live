

(function () {
    var TXSICBOGetSessionInfoCommand;

    TXSICBOGetSessionInfoCommand = (function () {
        function TXSICBOGetSessionInfoCommand() {

        }

        TXSICBOGetSessionInfoCommand.prototype.execute = function (controller, sessionId) {
            var url = 'api/sicbo/GetSessionInfo?sessionId=' + sessionId;
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetSessionInfoResponse(obj);
            });					
        };		
        return TXSICBOGetSessionInfoCommand;

    })();

    cc.TXSICBOGetSessionInfoCommand = TXSICBOGetSessionInfoCommand;

}).call(this);
