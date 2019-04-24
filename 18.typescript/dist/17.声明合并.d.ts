interface InfoInter {
    name: string;
    sayName?(name: string): string;
}
interface InfoInter {
    age: number;
}
declare let info: InfoInter;
declare namespace Rich {
    const age = 28;
}
declare class Rich {
    constructor();
}
