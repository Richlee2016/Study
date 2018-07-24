import * as types from '@/r/store/action-types'

export default function (state = { num: 0 }, action) {
    switch (action.type) {
        case types.ADD:
            return { num: state.num + 1 }
        case types.MINUS:
            return { num: state.num + 1 }
        default:
            return state
    }
}