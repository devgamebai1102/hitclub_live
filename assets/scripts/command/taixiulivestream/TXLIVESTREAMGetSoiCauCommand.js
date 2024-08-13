

(function () {
    var TXLIVESTREAMGetSoiCauCommand;

    TXLIVESTREAMGetSoiCauCommand = (function () {
        function TXLIVESTREAMGetSoiCauCommand() {
        }

        TXLIVESTREAMGetSoiCauCommand.prototype.execute = function (controller) {
            var url = 'api/livestreamluckydice/GetSoiCau';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_LIVESTREAM, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetSoiCauResponse(obj);
            });
        };

        return TXLIVESTREAMGetSoiCauCommand;

    })();

    cc.TXLIVESTREAMGetSoiCauCommand = TXLIVESTREAMGetSoiCauCommand;

}).call(this);
