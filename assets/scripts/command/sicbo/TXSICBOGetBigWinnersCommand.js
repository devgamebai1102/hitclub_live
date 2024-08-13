

(function () {
    var TXSICBOGetBigWinnersCommand;

    TXSICBOGetBigWinnersCommand = (function () {
        function TXSICBOGetBigWinnersCommand() {
        }

        TXSICBOGetBigWinnersCommand.prototype.execute = function (controller) {
            var url = 'api/sicbo/GetBigWinner';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetBigWinnersResponse(obj);
            });
        };

        return TXSICBOGetBigWinnersCommand;

    })();

    cc.TXSICBOGetBigWinnersCommand = TXSICBOGetBigWinnersCommand;

}).call(this);
