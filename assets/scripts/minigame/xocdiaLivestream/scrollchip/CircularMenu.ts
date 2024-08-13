import CircularItem from './CircularItem';
import XXLivestreamController from "../XXLivestreamController";
const { ccclass, property } = cc._decorator;

const MIN_INTERVAL = 0;
const MAX_INTERVAL = 0.3;

@ccclass
export default class CircularMenu extends cc.Component {

    @property(cc.Prefab) 
    prefab: cc.Prefab = null!;

    items: CircularItem[] = []

    private _radius: number = 360;
    private _interval: number = 0.6;
    private _maxItemCount: number;
    private currentMinIndex: number;
    private currentMaxIndex: number;
    private currentInfo: any;
    private total = 7;
    private config: any = [];
    private indexItem = 4;
    //private livestreamController = null;

    public get radius() { 
        return this._radius;
    }
    public get interval() { 
        return this._interval; 
    }
    public get maxItemCount() { 
        return this._maxItemCount ;
    }

    protected onLoad(): void {

        for (let i = 0; i < this.total; ++i) {
            this.config.push({ name: i });
        }
        //this.livestreamController = new XXLivestreamController();
        this._interval = Math.max(this._interval, MIN_INTERVAL);
        this._interval = Math.min(this._interval, MAX_INTERVAL);

        this._maxItemCount = this.config.length > 9 ? 9 : this.config.length;
        for (let i = 0; i < this.maxItemCount; ++i) {
            const info = this.config[i];
            var item = this.getItem();
            item.node.name = i.toString();
            item.show(i, info, this);
            this.items.push(item);
        }
        this.currentMinIndex = 0;
        this.currentMaxIndex = this.maxItemCount - 1;

        var index = 4;
        this.items[index].onClick();
    }

    public onClick(target: any): void {
        let index = Number(target.info.name);
        cc.XXLivestreamController.getInstance().betValueClicked(index);
        if (this.currentInfo === target.info) {
            cc.warn("Không được ấn nhiều lần");
            return;
        }
        this.currentInfo = target.info
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            item.follow(target);
            item.resetItem();
        }
        this.items[index].setActiveItem();
    }

    public onCenter(info: any): void {
        
    }
    
    public getItem(): CircularItem {
        var obj = cc.instantiate(this.prefab);
        this.node.addChild(obj);
        var item = obj.getComponent(CircularItem);
        return item;
    }

    public addIndexs(item: any): void {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].addIndex(item);
        }
        this.currentMinIndex--;
        this.currentMaxIndex--;
        if (this.currentMinIndex < 0) {
            this.currentMinIndex = this.config.length - 1;
        }
        if (this.currentMaxIndex < 0) {
            this.currentMaxIndex = this.config.length - 1;
        }
        item.refreshItem(this.config[this.currentMinIndex]);
    }

    public remIndexs(item: any): void {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].remIndex(item);
        }
        this.currentMaxIndex++;
        this.currentMinIndex++;
        if (this.currentMaxIndex >= this.config.length) {
            this.currentMaxIndex = 0;
        }
        if (this.currentMinIndex >= this.config.length) {
            this.currentMinIndex = 0;
        }
        item.refreshItem(this.config[this.currentMaxIndex]);
    }

}
