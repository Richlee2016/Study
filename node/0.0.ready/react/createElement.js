/**
 * 1.创建
 * document.createElement
 * 2.赋予属性
 * el.setAttribute /attrs
 * el.style.cssText /style
 * el.value /value
 * el.tagName
 * 3.文本
 * document.createTextNode
 * 4.循环追加
 * el.appendChild()
 */
import * as utils from './utils'
class Element{
    constructor(tagName,attrs,children){
        this.tagName = tagName;
        this.attrs = attrs;
        this.children = children;
    }

    render(){
        let el = document.createElement(this.tag);
        for (const [attr,val] of Object.entries(this.attrs)) {
            utils.setAttr(el,attr,val);
        }

        this.children.forEach(child => {
            let son = child instanceof Element?child.render() : document.createTextNode(child)
            el.appendChild(son);
        })
        return el;
    }
}

export default function createElement(tag,attrs,children){
    return new Element(tag,attrs,children);
}