

(function () {
    var TXSICBOGetSoiCauCommand;

    TXSICBOGetSoiCauCommand = (function () {
        function TXSICBOGetSoiCauCommand() {
        }

        TXSICBOGetSoiCauCommand.prototype.execute = function (controller) {
            var url = 'api/sicbo/GetSoiCau';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetSoiCauResponse(obj);
            });
        };

        return TXSICBOGetSoiCauCommand;

    })();

    cc.TXSICBOGetSoiCauCommand = TXSICBOGetSoiCauCommand;

}).call(this);
