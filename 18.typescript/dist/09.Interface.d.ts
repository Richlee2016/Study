interface Config {
    type: string;
    url: string;
    data?: string;
    dataType: string;
}
declare function ajax(config: Config): void;
