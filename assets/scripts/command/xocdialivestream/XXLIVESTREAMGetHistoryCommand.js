

(function () {
    var XXLIVESTREAMGetHistoryCommand;

    XXLIVESTREAMGetHistoryCommand = (function () {
        function XXLIVESTREAMGetHistoryCommand() {
        }

        XXLIVESTREAMGetHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/xocdia/GetHistory';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.XOC_DIA_LIVESTREAM, url, function (response) {
				//console.log(response);
                var obj = JSON.parse(response);
                return controller.onXXGetHistoryResponse(obj);
            });
        };

        return XXLIVESTREAMGetHistoryCommand;

    })();

    cc.XXLIVESTREAMGetHistoryCommand = XXLIVESTREAMGetHistoryCommand;

}).call(this);
