import BroadcastReceiver from "./BroadcastReceiver";
import Configs from "./Configs";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    private static instance: AudioManager = null;
    public static getInstance(): AudioManager {
        if (this.instance == null) {
            let node = new cc.Node("AudioManager");
            this.instance = node.addComponent(AudioManager);
            this.instance.audioSource = node.addComponent(cc.AudioSource);

            // console.log(cc.director.getScene());
            cc.game.addPersistRootNode(node);
        }
        return this.instance;
    }

    private audioSource: cc.AudioSource = null;
    private isOnMusic = true;
    private isOnSound = true;

    start() {
        BroadcastReceiver.register(BroadcastReceiver.ON_AUDIO_CHANGED, () => {
            this.isOnMusic = Configs.App.IsMusic;
            this.isOnSound = Configs.App.IsSound;

            // this.isOnMusic = true;
            // this.isOnSound = true;

            this.audioSource.mute = !this.isOnMusic;
            if (!this.isOnSound) {
                cc.audioEngine.stopAllEffects();
            }
        }, this);
        this.isOnMusic = Configs.App.IsMusic;
        this.isOnSound = Configs.App.IsSound;
        this.audioSource.mute = !this.isOnMusic;
    }

    public playEffect(audioClip: cc.AudioClip, volumn: number = 1) {
        if (audioClip == null) {
            cc.warn("AudioManager playEffect audioClip is null");
            return;
        }
        if (this.isOnSound && volumn > 0) cc.audioEngine.play(audioClip, false, volumn);
    }

    public playBackgroundMusic(audioClip: cc.AudioClip, loop: boolean = true, volumn: number = 1) {
        if (audioClip == null) {
            cc.warn("AudioManager playBackgroundMusic audioClip is null");
            return;
        }
        this.audioSource.stop();
        this.audioSource.clip = audioClip;
        this.audioSource.volume = volumn;
        this.audioSource.mute = !this.isOnMusic;
        this.audioSource.loop = loop;
        this.audioSource.play();
    }

    public stopBackgroundMusic() {
        this.audioSource.stop();
    }
}
