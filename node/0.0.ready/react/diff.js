/**
 * diff 算法
 *
 * 1. 新元素
 * 2. 属性(更换 新加)
 * 3. 子元素
 * 2. 文本
 * walk
 * diff
 * diffChildren
 * diffAttrs
 */
import * as utils from "./utils";

const REMOVE = "REMOVE";
const INSERT = "INSERT";

export default function diff(oldChildren, newChildren) {
  let patches = [];
  let oldIndex = 0;
  let newIndex = 0;

  let newKeys = newChildren.map(item => item.key);

  while (oldIndex < oldChildren.length) {
    let oldKey = oldChildren[oldIndex].key;
    if (!newKeys.includes(oldKey)) {
      remove(oldIndex);
      oldChildren.splice(oldIndex, 1);
    } else {
      oldIndex++;
    }
  }

  oldIndex = 0;
  newIndex = 0;
  
  while(newIndex < newChildren.length){
    let oldKey = (oldChildren[oldIndex] || []).key;

    let newKey = (newChildren[newIndex] || []).key;

    if (!oldKey) {
      insert(newIndex, newKey);
      newIndex++;
    } else if (oldKey !== newKey) {
      insert(newIndex, newKey);
      newIndex++;
    } else {
      oldIndex++;
      newIndex++;
    }

  }

  function insert(index, key) {
    patches.push({ type: INSERT, index, node: newChildren[index] });
  }
  function remove(index) {
    patches.push({ type: REMOVE, index });
  }

  return patches;
}
