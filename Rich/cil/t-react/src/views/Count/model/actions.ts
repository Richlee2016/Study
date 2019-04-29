import {ADD, MIN} from './types';
import { action } from 'typesafe-actions';
import {Dispatch} from 'redux';
import {push} from 'connected-react-router';
export const add = (num: number = 1) => action(ADD, num);
export const min = () => action(MIN);
export const asyncAdd = () => (dispatch: Dispatch) => {
    setTimeout(() => {
        dispatch(add());
        dispatch(push('/group'));
    }, 2000);
};
