import { EqualTo } from '../../dist/validator';

const assert = require('assert');

describe('EqualTo', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            try {
                new EqualTo();
            } catch (e) {
                assert.strictEqual(e.message, 'No "value" option is configured.');
            }
        });

        it('configuration with value', function () {
            new EqualTo({value: 10});
        });
    });

    describe('#validate()', function () {
        it('is valid - number', function () {
            const object = new EqualTo({value: 17});

            [17, '17']
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('is valid - Date', function () {
            const object = new EqualTo({value: new Date('2019-05-22')});

            [new Date('2019-05-22'), '2019-05-22']
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('is not valid - Number', function () {
            const object = new EqualTo({value: 33});

            [-1, 9, 9.99999999, '7', false, true, new Date('2019-05-22')]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.strictEqual(e.message, 'This value should be equal to 33.');
                });
        });

        it('is not valid - Date', function () {
            const now = new Date('1978-12-05');
            const object = new EqualTo({value: now});

            [new Date('2019-05-22'), '2019-05-22', 'now']
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.strictEqual(e.message, 'This value should be equal to 12/5/1978.');
                });
        });

        it('is valid - strict', function () {
            [
                {value: 11, compare: 11},
                {value: 11.9999, compare: 11.9999},
                {value: '11', compare: '11'},
                {value: new Date('2019-05-22'), compare: new Date('2019-05-22')},
            ].forEach((pair) => {
                const object = new EqualTo({value: pair.value, strict: true});
                const e = object.validate(pair.compare);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('is not valid - strict', function () {
            let object = new EqualTo({value: 10, strict: true});
            let e = object.validate('11');

            assert.strictEqual(e.message, 'This values has different types. Given type is string; Expected type is number.');

            object = new EqualTo({value: 10, strict: true});
            e = object.validate('10.9999');

            assert.strictEqual(e.message, 'This values has different types. Given type is string; Expected type is number.');

            object = new EqualTo({value: '11', strict: true});
            e = object.validate(11);

            assert.strictEqual(e.message, 'This values has different types. Given type is number; Expected type is string.');

            object = new EqualTo({value: 10, strict: true});
            e = object.validate(new Date());

            assert.strictEqual(e.message, 'This values has different types. Given type is Date object; Expected type is number.');

            object = new EqualTo({value: new Date(), strict: true});
            e = object.validate(10);

            assert.strictEqual(e.message, 'This values has different types. Given type is number; Expected type is Date object.');

            object = new EqualTo({value: new Date(), strict: true});
            e = object.validate('now');

            assert.strictEqual(e.message, 'This values has different types. Given type is string; Expected type is Date object.');

            object = new EqualTo({value: 'now', strict: true});
            e = object.validate(new Date());

            assert.strictEqual(e.message, 'This values has different types. Given type is Date object; Expected type is string.');
        });
    });
});
