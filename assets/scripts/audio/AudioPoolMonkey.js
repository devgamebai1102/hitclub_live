/**
 * Created by Nofear on 6/8/2017.
 */

(function () {
    cc.AudioPoolMonkey = cc.Class({
        "extends": cc.AudioPool,
        properties: {
            musicBackground: cc.AudioSource,

            background: cc.AudioSource,
            readyGo: cc.AudioSource,
        },

        enableMusic: function (enable) {
            if (this.musicBackground) {
                if (enable) {
                    if (!this.musicBackground.isPlaying) {
                        this.musicBackground.play();
                    }
                } else {
                    this.musicBackground.stop();
                }
            }
        },

        enableSound: function (enable) {
            this.background.mute = !enable;
            this.readyGo.mute = !enable;
        },

        getAudioClip: function (clipType) {
            var audioClip;
            audioClip = null;
            switch (clipType) {
                case cc.AudioTypes.MONKEY_READY_GO:
                    audioClip = this.readyGo;
                    break;
                case cc.AudioTypes.MONKEY_BG:
                    audioClip = this.background;
                    break;
            }
            return audioClip;
        }
    });

}).call(this);
