"use strict";
require('reflect-metadata');
var injectableClasses = [];
var injectedClasses = [];
var classInstances = [];
function Injectable() {
    return function (target) {
        injectableClasses.push(target);
    };
}
exports.Injectable = Injectable;
function Inject() {
    return function (target) {
        // Needs a decrator to set the param types.
        //injectedClasses.push(target);
    };
}
exports.Inject = Inject;
class Injector {
    static get(target) {
        var match;
        for (let instance of classInstances) {
            if (instance instanceof target) {
                //console.log('Use existing', target.name);
                return instance;
            }
        }
        // The first arg represents the "this" scope so is null since this is a new class
        let args = [null];
        let paramtypes = Reflect.getMetadata('design:paramtypes', target) || [];
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
exports.Injector = Injector;
//# sourceMappingURL=index.js.map