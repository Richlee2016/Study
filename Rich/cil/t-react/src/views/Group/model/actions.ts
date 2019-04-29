import {ADD_GROUP} from './types';
import { action } from 'typesafe-actions';
import {Dispatch} from 'redux';
const _timer = (time: number) => new Promise((resolve, reject) => setTimeout(resolve, time));

export const addGroup = (group: any[]) => action(ADD_GROUP, group);

export const fetchGroup = () => async (dispatch: Dispatch) => {
  await _timer(2000);
  const group = [{
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      }, {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      }];
  dispatch(addGroup(group));
};
