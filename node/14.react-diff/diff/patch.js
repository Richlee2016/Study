
import utils from './utils'
import { Element } from './element'

let keyIndex = 0
let allPatches // 这里就是完整的补丁包

function patch (root, patches) {
  allPatches = patches
  walk(root)
}

function walk (node) {
  let currentPatches = allPatches[keyIndex++];
  // 深度优先 遍历   打补丁 从下往上 打
  (node.childNodes || []).forEach(child => {
    return walk(child)
  })
  if (currentPatches) {
    console.log(node, currentPatches)
    doPatch(node, currentPatches)
  }
}

function doPatch (node, currentPatches) {
  currentPatches.forEach(patch => {
    switch (patch.type) {
      case utils.ATTRS:
        for (let attr in patch.attrs) {
          let value = patch.attrs[attr]
          if (value) {
            utils.setAttr(node, attr, value)
          } else {
            node.removeAttribute(attr)
          }
        }
        break
      case utils.TEXT:
        node.textContent = patch.content
        break
      case utils.REPLACE:
        let newNode =
          patch.node instanceof Element
            ? patch.node.render()
            : document.createTextNode(patch.node)
        console.log(patch.node)
        node.parentNode.replaceChild(newNode, node)
        break
      case utils.REMOVE:
        node.parentNode.removeChild(node)
        break
    }
  })
}

export default patch
