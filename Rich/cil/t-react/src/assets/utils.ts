export const Timer = (time: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  };
