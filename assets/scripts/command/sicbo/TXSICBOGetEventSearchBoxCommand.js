

(function () {
    var TXSICBOGetEventSearchBoxCommand;

    TXSICBOGetEventSearchBoxCommand = (function () {
        function TXSICBOGetEventSearchBoxCommand() {
        }

        TXSICBOGetEventSearchBoxCommand.prototype.execute = function (controller) {
            var url = 'api/sieutoc/GetEventSearchBox';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetEventSearchBoxResponse(obj);
            });
        };

        return TXSICBOGetEventSearchBoxCommand;

    })();

    cc.TXSICBOGetEventSearchBoxCommand = TXSICBOGetEventSearchBoxCommand;

}).call(this);
