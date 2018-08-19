const OBSERVER = Symbol('observer')

export default class Mvvm {
    constructor(opt) {
        this.$el = document.querySelector(opt.el || 'body');
        const data = opt.data;
        this.$data = data || {};
        observer(data);
    }

    // [OBSERVER](data) {
    //     for (let [key, val] of Object.entries(data)) {
    //         this[OBSERVER](val);
    //         Object.defineProperty(data, key, {
    //             enumerable: true,
    //             configurable: true,
    //             get() {
    //                 return val;
    //             },
    //             set:(newVal)=> {
    //                 if (newVal==val) return;
    //                 val = newVal;
    //                 this[OBSERVER](newVal);
    //             }
    //         })
    //     }
    // }

}
function Observer(data) {
    for (let [key, val] of Object.entries(data)) {
        observer(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                return val;
            },
            set: (newVal) => {
                if (newVal == val) return;
                val = newVal;
                observer(val);
            }
        })
    }
}
function observer(data) {
    if(typeof data !== 'object') return;
    return new Observer(data);
}
