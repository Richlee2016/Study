import createElement from './createElement'
import { diff, patch } from './diff'

const body = document.querySelector('body')

const oldElement = createElement('ul', { class: 'box' }, [
  createElement('li', { style: 'background:blue;' }, '1'),
  createElement('li', { style: 'background:green;' }, '2'),
  createElement('li', { style: 'background:yellow;' }, '3'),
  createElement('li', { style: 'background:red;' }, '4')
])
const one = oldElement.render()
body.appendChild(one)

class Element {
  constructor (tagName, key, children) {
    this.tagName = tagName
    this.key = key
    this.children = children
  }

  render () {
    let element = document.createElement(this.tagName)
    element.innerHTML = this.children
    element.setAttribute('key', this.key)
    console.log('render')
    return element
  }
}
function el (tagName, key, children) {
  return new Element(tagName, key, children)
}
const app1 = [
  el('li', 'A', 'A'),
  el('li', 'B', 'B'),
  el('li', 'C', 'C'),
  el('li', 'D', 'D')
]

/*
A D
B B
D R
  A
*/

const app2 = [
  el('li', 'D', 'D'),
  el('li', 'B', 'B'),
  el('li', 'R', '6'),
  el('li', 'A', 'A')
]

let ul = document.createElement('ul')

app1.forEach(item => {
  ul.appendChild(item.render())
})

document.body.appendChild(ul)

const patchs = diff(app1, app2)
patch(ul, patchs)
