interface ConfigFn<T> {
    (value: T): T;
}
declare function getData<T>(value: T): T;
declare var myGetData: ConfigFn<string>;
