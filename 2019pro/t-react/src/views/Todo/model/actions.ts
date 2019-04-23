import {ADD, MIN} from './types';
import { action } from 'typesafe-actions';
export const add = (num: number = 1) => action(ADD, num);
export const min = () => action(MIN);
