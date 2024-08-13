

(function () {
    var TXLIVESTREAMGetSessionInfoCommand;

    TXLIVESTREAMGetSessionInfoCommand = (function () {
        function TXLIVESTREAMGetSessionInfoCommand() {

        }

        TXLIVESTREAMGetSessionInfoCommand.prototype.execute = function (controller, sessionId) {
            var url = 'api/livestreamluckydice/GetSessionInfo?sessionId=' + sessionId;
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_LIVESTREAM, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetSessionInfoResponse(obj);
            });					
        };		
        return TXLIVESTREAMGetSessionInfoCommand;

    })();

    cc.TXLIVESTREAMGetSessionInfoCommand = TXLIVESTREAMGetSessionInfoCommand;

}).call(this);
