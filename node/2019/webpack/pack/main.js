// import './static/css/main.css'
import './static/less/common.less'
import png from './static/images/8.png'
const box = a => {
  let b = 3
  return a + b
}
console.log(png)
const img = new Image()
img.src = png
document.querySelector('body').appendChild(img)
