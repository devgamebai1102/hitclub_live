import Configs from "./common/Configs";
import BroadcastReceiver from "./common/BroadcastReceiver";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PanelMenu extends cc.Component {

    @property(cc.Node)
    arrow: cc.Node = null;

    @property(cc.Button)
    btnSound: cc.Button = null;
    @property(cc.SpriteFrame)
    sfSoundOn: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    sfSoundOff: cc.SpriteFrame = null;
    @property(cc.Button)

    btnMusic: cc.Button = null;
    @property(cc.SpriteFrame)
    sfMusicOn: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    sfMusicOff: cc.SpriteFrame = null;

    @property(cc.Button)
    btnSoundMain: cc.Button = null;
    @property(cc.SpriteFrame)
    sfSoundOnMain: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    sfSoundOffMain: cc.SpriteFrame = null;

    @property(cc.Button)
    btnMusicMain: cc.Button = null;
    @property(cc.SpriteFrame)
    sfMusicOnMain: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    sfMusicOffMain: cc.SpriteFrame = null;

    private isShow = false;

    show(isShow: boolean) {
        this.isShow = isShow;
        if (this.isShow) {
            this.node.runAction(cc.moveTo(0.3, cc.v2(-115, 0)));
            this.arrow.runAction(cc.rotateTo(0.3, 0));
        } else {
            this.node.runAction(cc.moveTo(0.3, cc.v2(0, 0)));
            this.arrow.runAction(cc.rotateTo(0.3, 180));
        }

        this.btnSound.getComponent(cc.Sprite).spriteFrame = Configs.App.IsSound ? this.sfSoundOn : this.sfSoundOff;
        this.btnMusic.getComponent(cc.Sprite).spriteFrame = Configs.App.IsMusic ? this.sfMusicOn : this.sfMusicOff;

        this.btnSoundMain.getComponent(cc.Sprite).spriteFrame = Configs.App.IsSound ? this.sfSoundOnMain : this.sfSoundOffMain;
        this.btnMusicMain.getComponent(cc.Sprite).spriteFrame = Configs.App.IsMusic ? this.sfMusicOnMain : this.sfMusicOffMain;
    }

    toggleShow() {
        this.show(!this.isShow);
    }

    toggleSound() {
        if (Configs.App.IsSound) {
            Configs.App.IsSound = false;
        } else {
            Configs.App.IsSound = true;
        }
        // SPUtils.setSoundVolumn(SPUtils.getSoundVolumn() > 0 ? 0 : 1);
        this.btnSound.getComponent(cc.Sprite).spriteFrame = Configs.App.IsSound ? this.sfSoundOn : this.sfSoundOff;
        this.btnSoundMain.getComponent(cc.Sprite).spriteFrame = Configs.App.IsSound ? this.sfSoundOnMain : this.sfSoundOffMain;
        BroadcastReceiver.send(BroadcastReceiver.ON_AUDIO_CHANGED);
    }

    toggleMusic() {
        if (Configs.App.IsMusic) {
            Configs.App.IsMusic = false;
        } else {
            Configs.App.IsMusic = true;
        }
        // SPUtils.setMusicVolumn(SPUtils.getMusicVolumn() > 0 ? 0 : 1);
        this.btnMusic.getComponent(cc.Sprite).spriteFrame = Configs.App.IsMusic ? this.sfMusicOn : this.sfMusicOff;
        this.btnMusicMain.getComponent(cc.Sprite).spriteFrame = Configs.App.IsMusic ? this.sfMusicOnMain : this.sfMusicOffMain;
        BroadcastReceiver.send(BroadcastReceiver.ON_AUDIO_CHANGED);
    }
}
