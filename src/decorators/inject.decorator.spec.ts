import 'reflect-metadata';
import 'mocha';
import {expect} from 'chai';
import { Injectable } from "./injectable.decorator";
import { Inject } from "./inject.decorator";
import { constants } from "../constants";

describe('Inject Decorator', () => {
    describe('when a class is tagged as inject', () => {
        xit('should prepare something', () => {
            expect(false).to.be.true;
        });
    });
});