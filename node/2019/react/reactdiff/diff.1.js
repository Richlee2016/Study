const REMOVE = 'REMOVE'
const INSERT = 'INSERT'

export const diff = (oldElement, newElement) => {
  let patches = []
  let oldIndex = 0
  let newIndex = 0
  const newKey = newElement.map(o => o.key)
  // 删除为实际操作
  while (oldIndex < oldElement.length) {
    if (!newKey.includes(oldElement[oldIndex].key)) {
      remove(oldIndex)
      oldElement.splice(oldIndex, 1)
    } else {
      oldIndex++
    }
  }
  oldIndex = 0
  newIndex = 0
  // 虚拟操作
  while (newIndex < newElement.length) {
    let newKey = newElement[newIndex].key
    let oldKey = oldElement[oldIndex].key
    if (newKey !== oldKey) {
      insert(newIndex, newKey)
    } else if (!oldKey) {
      insert(newIndex, newKey)
    } else {
      oldIndex++
    }
    newIndex++
  }
  // 删除剩余的
  while (oldIndex < oldElement.length) {
    oldIndex++
    remove(newIndex)
  }

  function insert (index, children) {
    patches.push({ type: INSERT, index, node: newElement[index] })
  }

  function remove (index) {
    patches.push({ type: REMOVE, index })
  }
  return patches
}

export const patch = (node, patches) => {
  // 保存 map
  let nodeMap = {}

  Array.from(node.childNodes).forEach(o => {
    nodeMap[o.getAttribute('key')] = o
  })
  patches.forEach(patch => {
    let oldNode
    if (patch.type === INSERT) {
      let newNode = nodeMap[patch.node['key']] || patch.node.render()
      oldNode = node.childNodes[patch.index]
      if (oldNode) {
        node.insertBefore(newNode, oldNode)
      } else {
        node.appendChild(newNode)
      }
    } else if (patch.type === REMOVE) {
      oldNode = node.childNodes[patch.index]
      if (oldNode) {
        node.removeChild(oldNode)
      }
    }
  })
}
