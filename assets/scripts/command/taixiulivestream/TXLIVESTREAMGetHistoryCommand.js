

(function () {
    var TXLIVESTREAMGetHistoryCommand;

    TXLIVESTREAMGetHistoryCommand = (function () {
        function TXLIVESTREAMGetHistoryCommand() {
        }

        TXLIVESTREAMGetHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/livestreamluckydice/GetHistory';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_LIVESTREAM, url, function (response) {
				//console.log(response);
                var obj = JSON.parse(response);
                return controller.onTXGetHistoryResponse(obj);
            });
        };

        return TXLIVESTREAMGetHistoryCommand;

    })();

    cc.TXLIVESTREAMGetHistoryCommand = TXLIVESTREAMGetHistoryCommand;

}).call(this);
