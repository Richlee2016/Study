/**
 * diff 算法  新旧比较法
 * 
 * REMOVE  INSERT
 *1.去旧
 *2.迎新
 *3.拆遗(优化可去掉)
 *
 * 优化(将已有的key insertBefor  没有的 appendChild)
 * 
 * 1.diff  
 * includes
 * splice
 * 
 * 2.patch
 * Array.form
 * getAttribute
 * insertBefore
 * appendChild
 * removeChild
 */
import * as utils from "./utils";

const REMOVE = "REMOVE";
const INSERT = "INSERT";

export function diff(oldChildren, newChildren) {
  let patches = [];
  let oldIndex = 0;
  let newIndex = 0;

  let newKeys = newChildren.map(item => item.key);
  // 去旧
  while (oldIndex < oldChildren.length) {
    let oldKey = oldChildren[oldIndex].key;
    if (!newKeys.includes(oldKey)) {
      remove(oldIndex);
      oldChildren.splice(oldIndex, 1);
    } else {
      oldIndex++;
    }
  }
  //迎新
  oldIndex = 0;
  newIndex = 0;
  while (newIndex < newChildren.length) {
    let oldKey = (oldChildren[oldIndex] || []).key;
    let newKey = (newChildren[newIndex] || []).key;

    if (!oldKey) {
      insert(newIndex, newKey);
    } else if (oldKey != newKey) {
      insert(newIndex, newKey);
    } else {
      oldIndex++;
    }
    newIndex++;
  }

  //拆遗
  // while (oldIndex++ < oldChildren.length) {
  //   remove(newIndex);
  // }

  function insert(index, key) {
    patches.push({ type: INSERT, index, node: newChildren[index] });
  }
  function remove(index) {
    patches.push({ type: REMOVE, index });
  }

  return patches;
}

export function patch(root, patchs = []) {
    console.log(patchs);
  let nodeMap = {};
  Array.from(root.childNodes).forEach(node => {
    nodeMap[node.getAttribute("key")] = node;
  });
  patchs.forEach(patch => {
    let oldNode;
    switch (patch.type) {
      case INSERT:
      let newNode = nodeMap[patch.node.key] || patch.node.render();
        oldNode = root.childNodes[patch.index];
        if (oldNode) {
          root.insertBefore(newNode, oldNode);
        } else {
          root.appendChild(newNode);
        }
        break;

      case REMOVE:
        oldNode = root.childNodes[patch.index];
        if (oldNode) {
          root.removeChild(oldNode);
        }
        break;
    }
  });
}
