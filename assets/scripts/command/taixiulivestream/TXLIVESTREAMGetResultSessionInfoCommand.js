

(function () {
    var TXLIVESTREAMGetResultSessionInfoCommand;

    TXLIVESTREAMGetResultSessionInfoCommand = (function () {
        function TXLIVESTREAMGetResultSessionInfoCommand() {

        }

        TXLIVESTREAMGetResultSessionInfoCommand.prototype.execute = function (controller, sessionId) {
            var url = 'api/livestreamluckydice/GetResultSessionInfo?sessionId=' + sessionId;
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_LIVESTREAM, url, function (response) {
				//console.log(response);
                var obj = JSON.parse(response);
                return controller.onTXGetResultSessionInfoResponse(obj);
            });					
        };		
        return TXLIVESTREAMGetResultSessionInfoCommand;

    })();

    cc.TXLIVESTREAMGetResultSessionInfoCommand = TXLIVESTREAMGetResultSessionInfoCommand;

}).call(this);
