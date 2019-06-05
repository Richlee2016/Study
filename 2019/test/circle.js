
class Ring {
    constructor(el, process, opt = {}){
        this.el = document.querySelector(el);
        this.process = process
        this.opt = opt;
        // 圆环默认设置
        this.circle = {
            r: opt.r || 60,
            cx: opt.strokeWidth + opt.r || 70,
            cy: opt.strokeWidth + opt.r  || 70,
            fill: 'none',
            "stroke-width":opt.strokeWidth || 10,
        }
    }

    init() {
        const svg = this.createSvg();
        const circle = this.createCircle();
        const ring = this.createRing(this.process);
        const animate = this.createAnimate(this.process);
        ring.appendChild(animate);
        svg.appendChild(circle);
        svg.appendChild(ring);
        this.el.appendChild(svg);
    };

    // 创建SVG标签
    createSvgTag(tag) {
        return document.createElementNS("http://www.w3.org/2000/svg", tag);
    };

    // 创建svg
    createSvg() {
        const svg = this.createSvgTag('svg');
        const box = (this.circle.r + this.circle["stroke-width"])*2
        this.setAttr(svg, {
            width: box,
            height: box,
            class: 'ring-box',
            transform: 'rotate(-90,0,0)'
        })
        return svg;
    };

    // 創建外层圆环
    createCircle() {
        const circle = this.createSvgTag('circle')
        this.setAttr(circle, {
            ...this.circle,
            stroke: this.opt.stroke || '#cccccc'
        });
        return circle;
    };

    // 创建内层圆
    createRing(pro) {
        const circle = this.createSvgTag('circle')
        this.setAttr(circle, {
            ...this.circle,
            stroke: this.opt.ringStroke || 'red',
            "stroke-linecap": 'round',
            "stroke-dasharray": this.setProcess(pro)
        });
        return circle;
    }

    // 创建动画
    createAnimate(process) {
        const animate = this.createSvgTag('animate');
        this.setAttr(animate, {
            attributeName: 'stroke-dasharray',
            from: this.setProcess(0),
            to: this.setProcess(process),
            dur: '0.5s'
        })
        return animate
    };

    // 创建文字
    createTex() {

    };

    // 设置进度
    setProcess(num) {
        var line = 2 * Math.PI * this.circle.r
        return line * (num / 100) + ',' + line * ((100 - num) / 100)
    };
    
    // 设置属性
    setAttr(dom, attrs) {
        if(!attrs) return;
        for (const [name,val] of Object.entries(attrs)) {
            dom.setAttribute(name, val);
        }
    };
}


const myRing = new Ring('#Process',30)
myRing.init()
