import * as utils from './utils'
class Element {
  constructor (tagName, attrs, children) {
    this.tagName = tagName
    this.attrs = attrs
    this.children = children
  }

  render () {
    let element = document.createElement(this.tagName)
    for (const [key, val] of Object.entries(this.attrs)) {
      utils.setAttr(element, key, val)
    }
    if (typeof this.children === 'string') {
      element.appendChild(document.createTextNode(this.children))
    } else {
      this.children.forEach(child => {
        let childrenElement = (child instanceof Element) ? child.render() : document.createTextNode(child)
        element.appendChild(childrenElement)
      })
    }
    return element
  }
}

export default (tag, value, context) => new Element(tag, value, context)
