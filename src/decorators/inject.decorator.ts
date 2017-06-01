import 'reflect-metadata';
import { constants } from '../constants';
import { InjectableClass } from "../injector";

export function Inject() {
    return function (target: any, propertyKey?: string) {
        if (propertyKey !== undefined) {
            let properties = Reflect.getMetadata(constants.properties, target);

            if (properties === undefined) {
                properties = {};
            }

            properties[propertyKey] = Reflect.getMetadata('design:type', target, propertyKey);
            Reflect.defineMetadata(constants.properties, properties, target);
        }
    }
}