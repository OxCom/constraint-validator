import { NotEqualTo } from '../../src/validator';

const assert = require('assert');

describe('Constraints/NotEqualTo', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            try {
                new NotEqualTo();
            } catch (e) {
                assert.strictEqual(e.message, 'No "value" option is configured.');
            }
        });

        it('configuration with value', function () {
            new NotEqualTo({value: 10});
        });
    });

    describe('#validate()', function () {
        it('is valid', function () {
            let object = new NotEqualTo({value: 33});

            [17, '17', -33, 0, 1, 'now', false, true, new Date()]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.ok(typeof e === 'undefined', e);
                });

            object = new NotEqualTo({value: 1});

            [0, false, undefined, function () {
            }]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('is not valid', function () {
            let object = new NotEqualTo({value: 33});

            [33, '33']
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.strictEqual(e.message, 'This value should not be equal to 33.');
                });

            object = new NotEqualTo({value: 1});

            [1, '1', true]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.strictEqual(e.message, 'This value should not be equal to 1.');
                });
        });

        it('is valid - strict', function () {
            [
                {value: 11, compare: 33},
                {value: 11.9999, compare: 10.9999},
                {value: '11', compare: '17'},
                {value: new Date('2019-05-21'), compare: new Date('2019-05-22')},
                {value: true, compare: false},
            ].forEach((pair) => {
                const object = new NotEqualTo({value: pair.value, strict: true});
                const e = object.validate(pair.compare);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('is not valid - strict', function () {
            let object = new NotEqualTo({value: 10, strict: true});
            let e = object.validate('11');

            assert.strictEqual(e.message, 'This values has different types. Given type is string; Expected type is number.');

            object = new NotEqualTo({value: 10, strict: true});
            e = object.validate('10.9999');

            assert.strictEqual(e.message, 'This values has different types. Given type is string; Expected type is number.');

            object = new NotEqualTo({value: '11', strict: true});
            e = object.validate(11);

            assert.strictEqual(e.message, 'This values has different types. Given type is number; Expected type is string.');

            object = new NotEqualTo({value: 10, strict: true});
            e = object.validate(new Date());

            assert.strictEqual(e.message, 'This values has different types. Given type is Date object; Expected type is number.');

            object = new NotEqualTo({value: new Date(), strict: true});
            e = object.validate(10);

            assert.strictEqual(e.message, 'This values has different types. Given type is number; Expected type is Date object.');

            object = new NotEqualTo({value: new Date(), strict: true});
            e = object.validate('now');

            assert.strictEqual(e.message, 'This values has different types. Given type is string; Expected type is Date object.');

            object = new NotEqualTo({value: 'now', strict: true});
            e = object.validate(new Date());

            assert.strictEqual(e.message, 'This values has different types. Given type is Date object; Expected type is string.');
        });
    });
});
