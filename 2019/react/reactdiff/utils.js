export const setAttr = (node, name, value) => {
  if (name === 'value') {
    let tagName = node.tagName.toLowerCase()
    if (tagName === 'input' || tagName === 'textarea') {
      node.value = value
    } else {
      node.setAttribute(name, value)
    }
  } else if (name === 'style') {
    node.style.cssText = value
  } else {
    node.setAttribute(name, value)
  }
}
