/*
 * Generated by BeChicken
 * on 10/30/2019
 * version v1.0
 */
(function () {
    var XXGetHistoryCommand;

    XXGetHistoryCommand = (function () {
        function XXGetHistoryCommand() {
        }

        XXGetHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/XocDia/GetHistory';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.XOC_XOC, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onXXGetHistoryResponse(obj);
            });
        };

        return XXGetHistoryCommand;

    })();

    cc.XXGetHistoryCommand = XXGetHistoryCommand;

}).call(this);