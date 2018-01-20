import Observe from "./observer"
// import Watcher from "./watcher"
// import Compile from "./compile"
export default class MVVM {
    constructor(options) {
        this.$opt = options;
        this.$data = this.options.data;
        this.init();
    }

    init() {
        Observe(this.$data, this)
    }

    _proxyData() {

    }

    _initComputed() {

    }

}