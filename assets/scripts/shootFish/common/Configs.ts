export default class Configs {

    public static Login = {
        CoinFish: 0,
        UsernameFish: '',
        PasswordFish: '',
        UserIdFish: '',
        FishConfigs: null,

        Coin: 0,
        Username: '',
        Password: '',
        Token: '',
        Platform: 0,
        Balance: 0,

        isLogined: false,
    };

    public static App = {
        USE_WSS: true,
        HOST_SHOOT_FISH: {
            // host: '172.31.39.110',
            // port: 82

            host: 'fish.lin99.club', //253-live
            port: 2053
        },
        Password: '',

        IsSound: true,
        IsMusic: true,

        Debug: false,
    };

    static CPName = "";
}

