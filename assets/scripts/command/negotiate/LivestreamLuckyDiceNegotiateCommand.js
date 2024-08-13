/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var LivestreamLuckyDiceNegotiateCommand;

    LivestreamLuckyDiceNegotiateCommand = (function () {
        function LivestreamLuckyDiceNegotiateCommand() {
        }

        LivestreamLuckyDiceNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';
            return cc.ServerConnector.getInstance().sendRequest("taixiulivestream.", url, function (response) {	
                			
                var obj = JSON.parse(response);
                return controller.onLuckyDiceNegotiateResponse(obj);

            }, true);
        };

        return LivestreamLuckyDiceNegotiateCommand;

    })();

    cc.LivestreamLuckyDiceNegotiateCommand = LivestreamLuckyDiceNegotiateCommand;

}).call(this);
