import 'reflect-metadata';
import { constants } from "./constants";

var classInstances: Array<any> = [];

export class Injector {
    public static get<T>(target: InjectableClass<T>): T {
        var match: Function;

        // Potentially replace array with metadata attachment
        let singleton = Reflect.getMetadata(constants.instance, target);
        if (singleton) {
            return singleton;
        }

        let instance = new (Function.prototype.bind.apply(target, this.buildConstructorArgs(target)));
        this.attachInjectedProperties(instance, target);

        Reflect.defineMetadata(constants.instance, instance, target);
        return instance;
    }

    private static buildConstructorArgs(target): Array<any> {
        // The first property of the 'bind.apply arg array is the 'this' context which is null for a new class.
        let args: Array<any> = [null];

        let constructorTypes: Array<InjectableClass<any>> = Reflect.getMetadata('design:paramtypes', target) || [];

        for (let type of constructorTypes) {
            let isInjectable = Reflect.getMetadata(constants.injectable, type);
            if (isInjectable) {
                let param = Injector.get(type);
                args.push(param);
            }
            else {
                console.warn('The Type', type.name, 'can not be injected. Make sure you have marked this class as @Inject or @Injectable');
                args.push(null);
            }
        }

        return args;
    }

    private static attachInjectedProperties(instance, target) {
        let propertyTypes: Array<InjectableClass<any>> = Reflect.getMetadata(constants.properties, target.prototype);
        if (propertyTypes) {
            for (let property of Object.keys(propertyTypes)) {
                instance[property] = Injector.get(propertyTypes[property])
            }
        }
    }
}

export interface InjectableClass<T> {
    new (...x): T;
}