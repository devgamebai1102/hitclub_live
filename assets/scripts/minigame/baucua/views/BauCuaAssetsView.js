/*
 * Generated by BeChicken
 * on 11/13/2019
 * version v1.0
 */
(function () {
    cc.BauCuaAssetsView = cc.Class({
        extends: cc.Component,
        properties: {
            sfDices: [cc.SpriteFrame],//spriteFrame cua quan vi
            sfPrefabChip: [cc.Prefab],//0:1K,1:5K,2:10K,3:50k,4:100K,5:500K,6:1M
            sfNan: [cc.SpriteFrame]
        },
        onLoad: function () {
            cc.BauCuaController.getInstance().setAssetView(this);
            this.chip1kPool = new cc.NodePool();
            this.chip5kPool = new cc.NodePool();
            this.chip10kPool = new cc.NodePool();
            this.chip100kPool = new cc.NodePool();
            this.chip500kPool = new cc.NodePool();
            this.chip5mPool = new cc.NodePool();
        },
        onDestroy: function () {
            this.clearPools();
        },
        clearPools: function () {
            try {
                //Clear pool
                this.chip1kPool.clear();
                this.chip5kPool.clear();
                this.chip10kPool.clear();
                this.chip100kPool.clear();
                this.chip500kPool.clear();
                this.chip5mPool.clear();
            } catch (e) {
                console.log(e);
            }
        },
        createChip: function (type) {
            let nodeChip = null;
            switch (type) {
                case cc.BacaratMapChip['1K']:
                    if (this.chip1kPool.size() > 0) {
                        nodeChip = this.chip1kPool.get();
                    } else {
                        nodeChip = cc.instantiate(this.sfPrefabChip[0]);
                    }
                    break;
                case cc.BacaratMapChip['5K']:
                    if (this.chip5kPool.size() > 0) {
                        nodeChip = this.chip5kPool.get();
                    } else {
                        nodeChip = cc.instantiate(this.sfPrefabChip[1]);
                    }
                    break;
                case cc.BacaratMapChip['10K']:
                    if (this.chip10kPool.size() > 0) {
                        nodeChip = this.chip10kPool.get();
                    } else {
                        nodeChip = cc.instantiate(this.sfPrefabChip[2]);
                    }
                    break;
                case cc.BacaratMapChip['100K']:
                    if (this.chip100kPool.size() > 0) {
                        nodeChip = this.chip100kPool.get();
                    } else {
                        nodeChip = cc.instantiate(this.sfPrefabChip[3]);
                    }
                    break;
                case cc.BacaratMapChip['500K']:
                    if (this.chip500kPool.size() > 0) {
                        nodeChip = this.chip500kPool.get();
                    } else {
                        nodeChip = cc.instantiate(this.sfPrefabChip[4]);
                    }
                    break;
                case cc.BacaratMapChip['5M']:
                    if (this.chip5mPool.size() > 0) {
                        nodeChip = this.chip5mPool.get();
                    } else {
                        nodeChip = cc.instantiate(this.sfPrefabChip[5]);
                    }
                    break;
            }

            try {
                nodeChip.setScale(0.7, 0.7);
            } catch (e) {
                console.log(e);
                this.createChip(type);
            }

            return nodeChip;
        },
        putChipToPool: function (nodeChip, betValue) {
            switch (betValue) {
                case 1000:
                    this.chip1kPool.put(nodeChip);
                    break;
                case 5000:
                    this.chip5kPool.put(nodeChip);
                    break;
                case 10000:
                    this.chip10kPool.put(nodeChip);
                    break;
                case 100000:
                    this.chip100kPool.put(nodeChip);
                    break;
                case 500000:
                    this.chip500kPool.put(nodeChip);
                    break;
                case 5000000:
                    this.chip5mPool.put(nodeChip);
                    break;
            }
        },
        //Lay spriteFrame nan
        getSfNan: function (isNan) {
            if (isNan) {
                return this.sfNan[0]
            } else {
                return this.sfNan[1];
            }
        },
        //Lay spriteFrame Dice
        getSfDice: function (indexDice) {
            return this.sfDices[indexDice];
        }

    });
}).call(this);