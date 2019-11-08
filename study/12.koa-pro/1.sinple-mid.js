let noop = () => {}

const f1 = () => {
  console.log(1)
  f2()
  console.log(2)
}

const f2 = () => {
  console.log(3)
  f3()
  console.log(4)
}

const f3 = () => {
  console.log(5)
  noop()
  console.log(6)
}

f1()
