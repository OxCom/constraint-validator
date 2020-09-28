import { AbstractConstraint } from '../../src/validator';
import { isArray, isObject }  from '../../src/Utils/functions';
import ViolationBuilder       from '../../src/Utils/ViolationBuilder';

const assert = require('assert');

describe('Constraints/AbstractConstraint', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new AbstractConstraint();
        });
    });

    describe('#getDefaultOptions()', function () {
        it('default empty object', function () {
            const object = new AbstractConstraint();
            const options = object.getDefaultOptions();

            assert.ok(isObject(options));
            assert.ok(Object.keys(options).length === 0 && options.constructor === Object);
        });
    });

    describe('#getRequiredOptions()', function () {
        it('default empty array', function () {
            const object = new AbstractConstraint();
            const options = object.getRequiredOptions();

            assert.ok(isArray(options));
            assert.strictEqual(options.length, 0);
        });
    });

    describe('#validate()', function () {
        it('default trigger error', function () {
            const object = new AbstractConstraint();

            try {
                object.validate(1);
            } catch (e) {
                assert.strictEqual(e.message, 'The validate() method was not implemented');
            }
        });
    });

    describe('#getViolationBuilder()', function () {
        it('should return builder', function () {
            const object = new AbstractConstraint();
            const builder = object.getViolationBuilder();

            assert.ok(builder instanceof ViolationBuilder);
        });
    });
});
