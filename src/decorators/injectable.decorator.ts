import 'reflect-metadata';
import { constants } from "../constants";

export function Injectable() {
    return function (target: Function) {
        Reflect.defineMetadata(constants.injectable, true, target);
    }
}