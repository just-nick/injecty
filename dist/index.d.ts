import 'reflect-metadata';
export declare function Injectable(): (target: Function) => void;
export declare function Inject(): (target: Function) => void;
export declare class Injector {
    static get(target: typeof Function): any;
}
