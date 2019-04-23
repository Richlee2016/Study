export const setGrim = n => {
  n = n === 10 ? 9 : n
  const w = n % 2 === 1 ? (n + 1) / 2 : n / 2
  const h = n % 2 === 1 ? (n - 1) / 2 : n / 2
  const mathM = (t, s) => {
    let i = 0

    let r = 100
    while (i < t) {
      r = r / 2
      i++
    }
    return r
  }
  return {
    width: mathM(w) + '%',
    height: mathM(h) + '%'
  }
}
