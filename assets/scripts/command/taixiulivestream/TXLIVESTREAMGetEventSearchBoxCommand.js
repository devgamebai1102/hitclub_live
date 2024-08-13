

(function () {
    var TXLIVESTREAMGetEventSearchBoxCommand;

    TXLIVESTREAMGetEventSearchBoxCommand = (function () {
        function TXLIVESTREAMGetEventSearchBoxCommand() {
        }

        TXLIVESTREAMGetEventSearchBoxCommand.prototype.execute = function (controller) {
            var url = 'api/livestreamluckydice/GetEventSearchBox';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_LIVESTREAM, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetEventSearchBoxResponse(obj);
            });
        };

        return TXLIVESTREAMGetEventSearchBoxCommand;

    })();

    cc.TXLIVESTREAMGetEventSearchBoxCommand = TXLIVESTREAMGetEventSearchBoxCommand;

}).call(this);
