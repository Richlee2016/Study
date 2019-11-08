const compose = fns => {
  if (fns.length == 1) return fns[0];
  return fns.reduce((a, b) => (...arg) => a(b(...arg)));
};

export default compose;
