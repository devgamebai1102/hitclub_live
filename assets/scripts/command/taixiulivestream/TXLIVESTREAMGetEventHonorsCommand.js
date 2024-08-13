

(function () {
    var TXLIVESTREAMGetEventHonorsCommand;

    TXLIVESTREAMGetEventHonorsCommand = (function () {
        function TXLIVESTREAMGetEventHonorsCommand() {
        }

        TXLIVESTREAMGetEventHonorsCommand.prototype.execute = function (controller) {

            var url = 'api/livestreamluckydice/GetEventHonors?top=100'
                + '&cordType=' + controller.cordType
                + '&recallCode=' + controller.recallCode;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_LIVESTREAM, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetEventHonorsResponse(obj);
            });
        };

        return TXLIVESTREAMGetEventHonorsCommand;

    })();

    cc.TXLIVESTREAMGetEventHonorsCommand = TXLIVESTREAMGetEventHonorsCommand;

}).call(this);
