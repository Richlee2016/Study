// 监听
class Observer {
    constructor(data) {
        this.data = data;
    }
}

export default function(data, vm) {
    if (!data || typeof data !== "object") {
        return;
    }
    return new Observer();
}