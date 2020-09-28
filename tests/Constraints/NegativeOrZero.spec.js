import { NegativeOrZero } from '../../src/validator';

const assert = require('assert');

describe('Constraints/NegativeOrZero', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new NegativeOrZero();
        });

        it('configuration with value', function () {
            new NegativeOrZero({value: 10});
        });
    });

    describe('#validate()', function () {
        it('is valid - number', function () {
            const object = new NegativeOrZero({value: -17});

            [-11, -11, -11.0, -10.1, -10.0000001, 0, 0.0]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('is not valid - number', function () {
            const object = new NegativeOrZero({value: -17});

            [1, 9, 9.99999999, 0.0000001]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.strictEqual(e.message, 'This value should be negative or zero.');
                });
        });

        it('is not valid - not number', function () {
            let object = new NegativeOrZero({value: 10, strict: false});
            let e = object.validate('-11');

            assert.strictEqual(e.message, 'This values has different types. Given type is string; Expected type is number.');

            object = new NegativeOrZero({value: 10, strict: true});
            e = object.validate('-10.9999');

            assert.strictEqual(e.message, 'This values has different types. Given type is string; Expected type is number.');

            object = new NegativeOrZero({value: '11', strict: true});
            e = object.validate('11');

            assert.strictEqual(e.message, 'This values has different types. Given type is string; Expected type is number.');

            object = new NegativeOrZero({value: 10, strict: true});
            e = object.validate(new Date());

            assert.strictEqual(e.message, 'This values has different types. Given type is Date object; Expected type is number.');

            object = new NegativeOrZero({value: new Date(), strict: true});
            e = object.validate(false);

            assert.strictEqual(e.message, 'This values has different types. Given type is boolean; Expected type is number.');

            object = new NegativeOrZero({value: 'now', strict: true});
            e = object.validate(true);

            assert.strictEqual(e.message, 'This values has different types. Given type is boolean; Expected type is number.');

            object = new NegativeOrZero({value: 1, strict: true});
            e = object.validate(undefined);

            assert.strictEqual(e.message, 'This values has different types. Given type is undefined; Expected type is number.');

            object = new NegativeOrZero({value: 1, strict: true});
            e = object.validate({});

            assert.strictEqual(e.message, 'This values has different types. Given type is object; Expected type is number.');

            object = new NegativeOrZero({value: 1, strict: true});
            e = object.validate(function () {});

            assert.strictEqual(e.message, 'This values has different types. Given type is function; Expected type is number.');
        });
    });
});
