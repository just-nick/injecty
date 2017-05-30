import 'reflect-metadata';

var injectableClasses: Array<Function> = [];
var injectedClasses: Array<Function> = [];
var classInstances: Array<Function> = [];

export function Injectable() {
    return function (target: Function) {
        injectableClasses.push(target);
    }
}

export function Inject() {
    return function (target: Function) {
        // Needs a decrator to set the param types.
        //injectedClasses.push(target);
    }
}

export class Injector {
    public static get(target: typeof Function) {
        var match: Function;
        for (let instance of classInstances) {
            if (instance instanceof target) {
                //console.log('Use existing', target.name);
                return instance;
            }
        }

        // The first arg represents the "this" scope so is null since this is a new class
        let args: Array<any> = [null];
        let paramtypes: Array<typeof Function> = Reflect.getMetadata('design:paramtypes', target) || [];

        for (let paramtype of paramtypes) {
            let inject = injectableClasses.indexOf(paramtype);
            if (inject === -1) {
                console.error('Not Injectable!', paramtype.name);
                args.push(null);
            }
            else {
                let param = Injector.get(paramtype);
                args.push(param);
            }
        }

        let instance = new (Function.prototype.bind.apply(target, args));
        classInstances.push(instance);
        //console.log('New', target.name);
        return instance;
    }
}