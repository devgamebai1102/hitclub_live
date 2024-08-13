
const { ccclass, property } = cc._decorator;

const customManifestStr = (hots) => JSON.stringify({
    "packageUrl": `${hots}/`,
    "remoteManifestUrl": `${hots}/project.manifest`,
    "remoteVersionUrl": `${hots}/version.manifest`,
    "version": "0.0.0",
    "assets": {
        "compressed": true
    },
    "searchPaths": []
});

function versionCompareHandle(versionA: string, versionB: string) {
    // cc.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
    var vA = versionA.split('.');
    var vB = versionB.split('.');
    for (var i = 0; i < vA.length; ++i) {
        var a = parseInt(vA[i]);
        var b = parseInt(vB[i] || '0');
        if (a === b) {
            continue;
        }
        else {
            return a - b;
        }
    }
    if (vB.length > vA.length) {
        return -1;
    }
    else {
        return 0;
    }
};

@ccclass
export default class LoadGameController extends cc.Component {

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;

    @property(cc.Label)
    loadingLabel: cc.Label = null;

    @property(cc.Node)
    rocketNode: cc.Node = null;

    private _updating = false;
    private _canRetry = false;
    private _storagePath = '';
    private stringHost = '';
    private _am: jsb.AssetsManager = null!;
    private _checkListener = null;
    private _updateListener = null;
    private _failCount = 0;

    private progress = 0;

    onLoad() {
        if (cc.sys.isNative) {
            if (cc.Device) {
                cc.Device.setKeepScreenOn(true);
            } else if ( jsb.Device) {
                jsb.Device.setKeepScreenOn(true);
            } else {
                // console.log('cc.Device undefined');
            }
        } else {
            // this.getGeolocation();
        }

        // Hot update is only available in Native build
        if (!cc.sys.isNative) {
            this.loadSceneGame();
            return;
        }
        this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'remote-assets');
        // cc.log('Storage path for remote asset : ' + this._storagePath);
        // Init with empty manifest url for testing custom manifest
        this._am = new jsb.AssetsManager('', this._storagePath, versionCompareHandle);
        this._am.setVerifyCallback(function (path, asset) {
            // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
            var compressed = asset.compressed;
            // Retrieve the correct md5 value.
            var expectedMD5 = asset.md5;
            // asset.path is relative path and path is absolute.
            var relativePath = asset.path;
            // The size of asset file, but this value could be absent.
            var size = asset.size;
            if (compressed) {
                cc.log("Verification passed : " + relativePath);
                return true;
            }
            else {
                cc.log("Verification passed : " + relativePath + ' (' + expectedMD5 + ')');
                return true;
            }
        });

        if (cc.sys.isNative) {
            this.stringHost = 'https://android.b29apires.club/remote-assets';
            this.checkUpdate();
        } else {
            this.loadSceneGame();
        }
    }

    onDestroy() {
        if (this._updateListener) {
            this._am.setEventCallback(null!);
            this._updateListener = null;
        }
    }

    checkCb(event: any) {
        console.log('Code: ' + event.getEventCode());
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log("No local manifest file found, hot update skipped.");
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log("Fail to download manifest file, hot update skipped.");
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log("Already up to date with the latest remote version.");
                this.loadSceneGame();
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                console.log('New version found, please try to update. (' + Math.ceil(this._am.getTotalBytes() / 1024) + 'kb)');
                break;
            default:
                return;
        }

        if (event.getEventCode() === jsb.EventAssetsManager.NEW_VERSION_FOUND) {
            this._am.setEventCallback(null);
            this._checkListener = null;
            this._updating = false;
            console.log("HOT UPDATE: call hotUpdate.");
            //tien hanh cap nhat
            this.hotUpdate();
        } else {
            this._am.setEventCallback(null);
            this._checkListener = null;
            this._updating = false;
        }
    }

    updateCb(event: any) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log('No local manifest file found, hot update skipped.');
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                // this.panel.byteProgress.progress = event.getPercent();
                // this.panel.fileProgress.progress = event.getPercentByFile();

                const percent = event.getDownloadedFiles() / event.getTotalFiles();
                // this.panel.byteLabel.string = event.getDownloadedBytes() + ' / ' + event.getTotalBytes();
                var msg = event.getMessage();
                if (msg) {
                    // cc.log(event.getPercent()/100 + '% : ' + msg);
                }
                this.updateProcess(percent);
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log('Fail to download manifest file, hot update skipped.');
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log('Loading Already up to date with the latest remote version.');
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                console.log('Update finished. ' + event.getMessage());
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                console.log('Update failed. ' + event.getMessage());
                this._updating = false;
                this._canRetry = true;
                failed = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                console.log('Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
                failed = true;
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                console.log(event.getMessage());
                failed = true;
                break;
            default:
                break;
        }

        if (failed) {
            this._am.setEventCallback(null!);
            this._updateListener = null;
            this._updating = false;
        }
        if (needRestart) {
            this._am.setEventCallback(null!);
            this._updateListener = null;
            // Prepend the manifest's search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._am.getLocalManifest().getSearchPaths();
            // cc.log(JSON.stringify(newPaths));
            Array.prototype.unshift.apply(searchPaths, newPaths);
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('HotUpdateSearchPaths-game', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);
            // cc.log('JSON.stringify(searchPaths)', JSON.stringify(searchPaths))
            // restart game.
            setTimeout(() => {
                console.log('restart game')
                cc.game.restart();
            }, 500)
        }
    }

    checkUpdate() {
        if (this._updating) {
            console.log('Checking or updating ...');
            return;
        }
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            var manifest = new jsb.Manifest(customManifestStr(this.stringHost), this._storagePath);
            this._am.loadLocalManifest(manifest, this._storagePath);
        }
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
            console.log('Failed to load local manifest ...');
            return;
        }
        this._am.setEventCallback(this.checkCb.bind(this));

        this._am.checkUpdate();
        this._updating = true;
    }

    hotUpdate() {
        if (this._am && !this._updating) {
            this._am.setEventCallback(this.updateCb.bind(this));

            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                var manifest = new jsb.Manifest(customManifestStr(this.stringHost), this._storagePath);
                this._am.loadLocalManifest(manifest, this._storagePath);
            }

            this._failCount = 0;
            this._am.update();
            this._updating = true;
        }
    }

    updateProcess(progress) {
        cc.log('Updated file: ' + progress);
        this.progressBar.progress = progress;
        this.loadingLabel.string = Math.round(progress * 100) + '%';
        this.rocketNode.x += -280 + Math.round(this.progress) * 653 / 100;
    }

    loadSceneGame() {
        var self = this;
        this.progress = 0;
        this.progressBar.progress = this.progress / 100;
        this.loadingLabel.string = '0%';

        cc.director.preloadScene(
            'MainGame',
            function (completedCount, totalCount, item) {
                var tempProgress = (100 * completedCount / totalCount).toFixed(2);

                //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                // if (tempProgress > progress) {
                //     progress = tempProgress;
                // }
                self.progress = tempProgress;

                self.progressBar.progress = self.progress / 100;
                self.loadingLabel.string = Math.round(self.progress) + '%';
                self.rocketNode.x = -280 + Math.round(self.progress) * 653 / 100;
            },
            function (err) {
                if (err) {
                    console.log(err);
                    return;
                }

                //play animation end
                cc.director.loadScene('MainGame', function (err, data) {
                    // self.animationLoading.play('ending');
                });
            }
        );
    }
}
