import { observable, action, computed, autorun, when } from 'mobx';

class CounterStore {
  public unWatch: Function;
  constructor() {
    this.unWatch = this.watchNum();
    when(() => this.num === 3, () => this.add());
  }
  /** 这是注释 */
  @observable
  count: number = 0;

  @observable
  whennum: number = 0;

  @computed get num() {
    return this.count * 6;
  }

  watchNum() {
    return autorun(
      () => {
        if (this.count === 2) {
          this.add();
        }
      },
      { delay: 500 }
    );
  }

  @action
  add = () => {
    this.count++;
  };
}

export default new CounterStore();
