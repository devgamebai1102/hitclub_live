/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var TaiXiuSicboNegotiateCommand;

    TaiXiuSicboNegotiateCommand = (function () {
        function TaiXiuSicboNegotiateCommand() {
        }

        TaiXiuSicboNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {				
                var obj = JSON.parse(response);
				//console.log(obj);
                return controller.onLuckyDiceNegotiateResponse(obj);

            }, true);
        };

        return TaiXiuSicboNegotiateCommand;

    })();

    cc.TaiXiuSicboNegotiateCommand = TaiXiuSicboNegotiateCommand;

}).call(this);
