import {pipe} from '../../src/Utils/functions';

const assert = require('assert');

describe('Utils/pipe', function() {
    it('empty list', function() {
        const middlewares = [];
        const value = 1;
        const piped = pipe(middlewares);

        assert.equal(piped(value), value);
    });

    it('one middleware in a list', function() {
        const middlewares = [function (v) {
            return v * 3;
        }];

        const value = 7;
        const piped = pipe(middlewares);

        assert.equal(piped(value), 21);
    });

    it('multiple middleware in a list with invalid callable', function() {
        const middlewares = [
            function (v) {
                return v * 3;
            },
            'string',
            function (v) {
                return v * 2;
            }
        ];

        const value = 7;
        const piped = pipe(middlewares);

        assert.equal(piped(value), 42);
    });

    it('middleware options passed into callable', function() {
        const middlewares = [
            function (v, o) {
                return v * o.m1;
            },
            function (v, o) {
                return v * o.m2;
            }
        ];

        const value = 7;
        const piped = pipe(middlewares, {m1: 3});

        assert.equal(piped(value, {m2: 2}), 42);
    });
});
