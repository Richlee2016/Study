interface Animal {
    eat(): void;
}
interface Person extends Animal {
    work(): void;
}
declare class Programmer {
    name: string;
    constructor(name: string);
    coding(code: string): void;
}
