import 'reflect-metadata';
import 'mocha';
import {expect} from 'chai';
import { Injectable } from "./injectable.decorator";
import { Inject } from "./inject.decorator";
import { constants } from "../constants";

describe('Injectable Decorator', () => {
    describe('when a class is tagged as injectable', () => {
        it('should add an injecty metadata tag', () => {
            let injectableState = Reflect.getMetadata(constants.injectable, InjectableDecoratorService);
            expect(injectableState).to.be.true;
        });
    });
});

@Injectable()
class InjectableDecoratorService {}

// @Inject()
// class TestConsumer {
//     constructor(private injectedService: TestService){}
// }