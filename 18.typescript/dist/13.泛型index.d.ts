declare class MinClas<T> {
    list: T[];
    add(value: T): void;
    min(): T;
}
declare var m1: MinClas<number>;
declare var m2: MinClas<string>;
