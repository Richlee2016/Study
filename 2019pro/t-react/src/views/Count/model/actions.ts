import {ADD, MIN} from './types';
import { action } from 'typesafe-actions';
import {Dispatch} from 'redux';
export const add = (num: number = 1) => action(ADD, num);
export const min = () => action(MIN);
export const asyncAdd = () => (dispatch: Dispatch) => {
    setTimeout(() => {
        dispatch(add());
    }, 2000);
};
