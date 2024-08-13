

(function () {
    var TXLIVESTREAMGetBigWinnersCommand;

    TXLIVESTREAMGetBigWinnersCommand = (function () {
        function TXLIVESTREAMGetBigWinnersCommand() {
        }

        TXLIVESTREAMGetBigWinnersCommand.prototype.execute = function (controller) {
            var url = 'api/livestreamluckydice/GetBigWinner';
            var params = JSON.stringify({
                day: controller.daysearch,
            });
            //console.log(params);

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.TAI_XIU_LIVESTREAM, url, params, function (response) {

                //return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU, url, function (response) {
                // console.log(response);
                var obj = JSON.parse(response);
                return controller.onTXGetBigWinnersResponse(obj);
            });
        };

        return TXLIVESTREAMGetBigWinnersCommand;

    })();

    cc.TXLIVESTREAMGetBigWinnersCommand = TXLIVESTREAMGetBigWinnersCommand;

}).call(this);
