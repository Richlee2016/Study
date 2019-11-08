const REMOVE = 'REMOVE'
const INSERT = 'INSERT'

export const diff = (oldElement, newElement) => {
  let patchs = []
  let oldIdx = 0
  let newIdx = 0
  let newKeks = newElement.map(o => o.key)
  // 删除
  while (oldIdx < oldElement.length) {
    if (!newKeks.includes(oldElement[oldIdx]['key'])) {
      remove(oldIdx)
      oldElement.splice(oldIdx)
    } else {
      oldIdx++
    }
  }

  oldIdx = 0
  newIdx = 0

  while (newIdx < newElement.length) {
    let oldKey = oldElement[oldIdx]['key']
    let newKey = newElement[newIdx]['key']
    if (oldKey === newKey) {
      oldIdx++
    } else if ((oldKey !== newKey) || !oldKey) {
      insert(newIdx)
    }
    newIdx++
  }

  // while (oldIdx <= oldElement.length) {
  //   remove(newIdx)
  //   oldIdx++
  // }

  function insert (index) {
    patchs.push({ type: INSERT, index, node: newElement[index] })
  }
  function remove (index) {
    patchs.push({ type: REMOVE, index })
  }
  console.log(patchs)
  return patchs
}

export const patch = (node, patches) => {
  let nodeMap = {}
  Array.from(node.childNodes).forEach(o => {
    nodeMap[o.getAttribute('key')] = o
  })
  patches.forEach(patch => {
    switch (patch.type) {
      case INSERT:
        let oldNode = node.childNodes[patch.index]
        let newNode = nodeMap[patch.node['key']] || patch.node.render()
        if (oldNode) {
          node.insertBefore(newNode, oldNode)
        } else {
          node.appendChild(newNode)
        }
        break
      case REMOVE:
        node.removeChild(node.childNodes[patch.index])
        break
    }
  })
}
