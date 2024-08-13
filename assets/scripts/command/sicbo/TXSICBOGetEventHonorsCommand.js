

(function () {
    var TXSICBOGetEventHonorsCommand;

    TXSICBOGetEventHonorsCommand = (function () {
        function TXSICBOGetEventHonorsCommand() {
        }

        TXSICBOGetEventHonorsCommand.prototype.execute = function (controller) {

            var url = 'api/sieutoc/GetEventHonors?top=100'
                + '&cordType=' + controller.cordType
                + '&recallCode=' + controller.recallCode;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetEventHonorsResponse(obj);
            });
        };

        return TXSICBOGetEventHonorsCommand;

    })();

    cc.TXSICBOGetEventHonorsCommand = TXSICBOGetEventHonorsCommand;

}).call(this);
