const delay = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}
export default {

  namespace: 'movie',

  state: {
    num: 0
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      //   return history.listen( ( { pathname, query } ) => {
      //     if(pathname !== '/mvoie'){
      //        console.log(1);
      //      };
      //  });
    }
  },

  effects: {
    * fetch ({ payload }, { call, put }) {
      yield put({ type: 'save' })
    },
    * asyncAdd (_, { call, put }) {
      yield call(delay, 1000)
      yield put({ type: 'add' })
    }
  },

  reducers: {
    add (state) {
      return { ...state, num: state.num++ }
    },
    minus (state) {
      let { num } = state
      --num
      state.num = num < 0 ? 0 : num
      return { ...state, num: state.num }
    }
  }

}
