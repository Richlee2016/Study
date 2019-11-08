import utils from './utils'
export class Element {
  constructor(tagName, attrs, children) {
    /**
     * 标签名
     * 属性对象
     * 子元素数组
     */
    this.tagName = tagName;
    this.attrs = attrs;
    this.children = children;
  }
  //  渲染
  render() {
    let element = document.createElement(this.tagName);
    // 1.给真实dom元素节点添加属性
    for (let attr in this.attrs) {
      utils.setAttr(element, attr, this.attrs[attr]);
    }

    // 2.先序深度递归遍历 ul - li1 - 1 - li2 - 2 -li3 - 3
    this.children.forEach(child => {
        // 如果 子节点是个元素 就调用他的 render 方法创建子节点的真实dom 如果是个字符串的话就创建文本节点
        let childElement = (child instanceof Element) ? child.render() : document.createTextNode(child);
        element.appendChild(childElement);
    });
    return element;
  }
}

export function createElement(tagName, attrs, children) {
  return new Element(tagName, attrs, children);
}

