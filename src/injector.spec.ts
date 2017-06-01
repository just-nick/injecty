import 'reflect-metadata';
import 'mocha';
import { expect } from 'chai';
import { Injectable } from "./decorators/injectable.decorator";
import { Inject } from "./decorators/inject.decorator";
import { constants } from "./constants";
import { Injector } from "./injector";

describe('Injector', () => {
    describe('when an instance of a service consumer is requested', () => {
        it('should return an instance of the consumer', () => {
            let instance = Injector.get(Consumer);
            expect(instance).to.be.instanceof(Consumer);
            expect(instance.injectedService).to.be.instanceof(Service);
        });
        
        it('should always return the same instance of the consumer', () => {
            let instance = Injector.get(Consumer);
            let secondInstance = Injector.get(Consumer);

            expect(instance === secondInstance).to.be.true;
            expect(instance.injectedService === secondInstance.injectedService).to.be.true;
        });

        describe('and the consumers service also consumes other services', () => {
            it('should resolve the full dependency chain', () => {
                let instance = Injector.get(DeepConsumer);
                let secondInstance = Injector.get(Consumer);

                expect(instance.secondInjectedService.injectedService).to.be.instanceof(Service);
                expect(instance.secondInjectedService.injectedService === secondInstance.injectedService).to.be.true;
            })
        })
    });

    describe('when an instance of a class with an injected property is requested', () => {
        it('should get an instance of that class', () => {
            let instance = Injector.get(NoConstructorConsumer);

            expect(instance).to.be.instanceof(NoConstructorConsumer);
            expect(instance.injectedService).to.be.instanceof(Service);
        });
    });
});

@Injectable()
class Service {}

@Inject()
class Consumer {
    constructor(public injectedService: Service) { }
}

@Injectable()
class SecondService {
    constructor(public injectedService: Service) { }
}

@Inject()
class DeepConsumer {
    constructor(public secondInjectedService: SecondService) { }
}

class NoConstructorConsumer {
    @Inject()
    public injectedService: Service;

    constructor() {
        console.log('this', this);
    }
}