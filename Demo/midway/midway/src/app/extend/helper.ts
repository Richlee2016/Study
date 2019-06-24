export default {
  timer(time: number = 300): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, time));
  }
};
