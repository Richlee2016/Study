import utils from "./utils";
let keyIndex = 0;

function diff(oldTree, newTree) {
  keyIndex = 0;
  let patches = {};
  let index = 0;
  walk(oldTree, newTree, index, patches);
  return patches;
}
/**
 *
 * @param {*} oldNode 老节点
 * @param {*} newNode 新节点
 * @param {*} index 老节点在旧树深度遍历中的索引
 * @param {*} patches 补丁对象
 */
function walk(oldNode, newNode, index, patches) {
  let currentPatch = [];
  //   新元素没有  移除补丁
  if (newNode == null) {
    currentPatch.push({ type: utils.REMOVE, index });
    // 新旧 元素都为 文本补丁
  } else if (utils.isString(oldNode) && utils.isString(newNode)) {
    if (oldNode != newNode) {
      currentPatch.push({ type: utils.TEXT, content: newNode });
    }
    // 标签相同  但属性不同  属性补丁
  } else if (oldNode.tagName == newNode.tagName) {
    let attrsPatch = diffAttrs(oldNode, newNode);
    if (Object.keys(attrsPatch).length > 0) {
      currentPatch.push({ type: utils.ATTRS, attrs: attrsPatch });
    }
    //自己比完自己之后 再 比自己的儿子们
    
    diffChildren(
      oldNode.children,
      newNode.children,
      index,
      patches,
      currentPatch
    );
  } else {
    currentPatch.push({ type: utils.REPLACE, node: newNode });
  }
  if (currentPatch.length > 0) {
    patches[index] = currentPatch;
  }
}

//老的节点的儿子们 新节点的儿子们 父节点的需要 完整不定对象 当前纠结点的补丁对象
function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
  oldChildren.forEach((oldChild, idx) => {
    walk(oldChild, newChildren[idx], ++keyIndex, patches);
  });
}

function diffAttrs(oldNode, newNode) {
  let attrsPatch = {};
  //   不同的属性
  for (let attr in oldNode.attrs) {
    if (oldNode.attrs[attr] != newNode.attrs[attr]) {
      attrsPatch[attr] = newNode.attrs[attr];
    }
  }
  //   新添加的属性
  for (let attr in newNode.attrs) {
    if (!oldNode.attrs.hasOwnProperty(attr)) {
      attrsPatch[attr] = newNode.attrs[attr];
    }
  }
  return attrsPatch;
}
export default diff;
