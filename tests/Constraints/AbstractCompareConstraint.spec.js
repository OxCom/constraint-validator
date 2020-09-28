import { AbstractCompareConstraint } from '../../src/validator';
import { isArray, isObject }         from '../../src/Utils/functions';
import ViolationBuilder              from '../../src/Utils/ViolationBuilder';

const assert = require('assert');

describe('Constraints/AbstractCompareConstraint', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            try {
                new AbstractCompareConstraint();
            } catch (e) {
                assert.strictEqual(e.message, 'No "value" option is configured.');
            }
        });

        it('value configuration provided', function () {
            new AbstractCompareConstraint({value: 3});
        });
    });

    describe('#getDefaultOptions()', function () {
        it('default object has "message_strict" and "strict"', function () {
            const object = new AbstractCompareConstraint({value: 3});
            const options = object.getDefaultOptions();

            assert.ok(isObject(options));
            assert.ok(Object.keys(options).length === 2 && options.constructor === Object);
            assert.ok(typeof options.strict === 'boolean');
            assert.ok(typeof options.message_strict === 'string');
        });
    });

    describe('#getRequiredOptions()', function () {
        it('default array has "value" and "strict"', function () {
            const object = new AbstractCompareConstraint({value: 3});
            const options = object.getRequiredOptions();

            assert.ok(isArray(options));
            assert.strictEqual(options.length, 2);
            assert.ok(options.includes('value'));
            assert.ok(options.includes('strict'));
        });
    });

    describe('#compare()', function () {
        it('default trigger error', function () {
            const object = new AbstractCompareConstraint({value: 3});

            try {
                object.compare(3, 5);
            } catch (e) {
                assert.strictEqual(e.message, 'The compare() method was not implemented');
            }
        });
    });

    describe('#validate()', function () {
        it('default trigger error', function () {
            const object = new AbstractCompareConstraint({value: 3});

            try {
                object.validate(3);
            } catch (e) {
                assert.strictEqual(e.message, 'The compare() method was not implemented');
            }
        });
    });

    describe('#getViolationBuilder()', function () {
        it('should return builder', function () {
            const object = new AbstractCompareConstraint({value: 3});
            const builder = object.getViolationBuilder();

            assert.ok(builder instanceof ViolationBuilder);
        });
    });
});
