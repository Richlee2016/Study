import { useState, useEffect } from 'react';
export const createCount = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  return {
    count,
    name,
    addName: () => setName(name + 1),
    add: () => setCount(count + 1),
    minus: () => setCount(count - 1),
    mount: () =>
      useEffect(() => {
        console.log('mount', 'update');
        return () => {
          console.log('unMount');
        };
      }, [count]),
    letMount: () => {
      useEffect(() => {
        console.log('第二次嗲用 effect');
      }, [name]);
    },
  };
};
