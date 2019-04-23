/**
 * 在dom diff 中如何识别处理 key
 */

const REMOVE = "REMOVE";
const INSERT = "INSERT";

class Element {
  constructor(tagName, key, children) {
    this.tagName = tagName;
    this.key = key;
    this.children = children;
  }

  render() {
    let element = document.createElement(this.tagName);
    element.innerHTML = this.children;
    element.setAttribute("key", this.key);
    console.log("render");
    return element;
  }
}

function el(tagName, key, children) {
  return new Element(tagName, key, children);
}

let oldChildren = [
  el("li", "A", "A"),
  el("li", "B", "B"),
  el("li", "C", "C"),
  el("li", "D", "D")
];

let ul = document.createElement("ul");

oldChildren.forEach(item => {
  ul.appendChild(item.render());
});

document.body.appendChild(ul);

let newChildren = [
  el("li", "D", "D"),
  el("li", "B", "B"),
  el("li", "R", "6"),
  el("li", "A", "A")
];

let patches = diff(oldChildren, newChildren);
console.log(patches);
patch(ul, patches);
// [{type:REMOVE,index:0},{type:INSERT,index:3,{key:"E"}}]
function diff(oldChildren, newChildren) {
  let patches = [];
  let newKeys = newChildren.map(item => item.key);
  // 第一步 把老数组再新数组中没有的元素移除掉
  let oldIndex = 0,
    newIndex = 0;
  while (oldIndex < oldChildren.length) {
    let oldKey = oldChildren[oldIndex].key;
    // console.log(oldKey);
    if (!newKeys.includes(oldKey)) {
      remove(oldIndex);
      oldChildren.splice(oldIndex, 1);
    } else {
      oldIndex++;
    }
    // console.log(oldIndex);
  }
  // 第二步  插入
  oldIndex = 0;
  newIndex = 0;
  while (newIndex < newChildren.length) {
    let oldKey = (oldChildren[oldIndex] || []).key;

    let newKey = (newChildren[newIndex] || []).key;

    if (!oldKey) {
      //对比的时候 没有 key  则插入新的key（尾添加）
      insert(newIndex, newKey);
      newIndex++;
    } else if (oldKey !== newKey) {
      //key 不同
      insert(newIndex, newKey);
      newIndex++;
    } else {
      //key 相同  则 跳下一个对比
      oldIndex++;
      newIndex++;
    }
  }
  // 第三步  把老数组中多余的删除掉
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

function patch(root, patches = []) {
  // 优化
  let nodeMap = {};
  // 得到一个key和这个key对应的dom之间的映射 优化
  Array.from(root.childNodes).forEach(node => {
    nodeMap[node.getAttribute("key")] = node;
  });
  // console.log(nodeMap);
  patches.forEach(patch => {
    let oldNode;
    // console.log(root.childNodes[patch.index]);
    switch (patch.type) {
      case INSERT:
        //判断一下将要插入的key 对应的老街店有没有 如果有 取出  没有 创建 
        let newNode = nodeMap[patch.node.key] || patch.node.render();
        oldNode = root.childNodes[patch.index];
        if (oldNode) {
          root.insertBefore(newNode, oldNode);
        } else {
          root.appendChild(newNode);
        }
        break;
      case REMOVE:
        // console.log(oldNode);
         oldNode = root.childNodes[patch.index];
        if(oldNode){
          root.removeChild(oldNode);
        };
        break;
    }
  });
}
