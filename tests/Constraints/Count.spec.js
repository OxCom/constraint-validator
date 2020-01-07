import { Count } from '../../dist/validator';

const assert = require('assert');

describe('Count', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            try {
                new Count();
                assert.fail('Expected of configuration error.');
            } catch (e) {
                assert.strictEqual(e.message, 'No "min" option is configured.');
            }
        });

        it('min option provided', function () {
            const min = 5;
            const object = new Count({
                min: min,
            });

            assert.strictEqual(object.options.min, min);
        });

        it('max option provided', function () {
            const max = 5;
            const object = new Count({
                max: max,
            });

            assert.strictEqual(object.options.max, max);
        });

        it('max and min options provided', function () {
            const min = 5;
            const max = 7;
            const object = new Count({
                min: min,
                max: max,
            });

            assert.strictEqual(object.options.min, min);
            assert.strictEqual(object.options.max, max);
        });

        it('min message option provided', function () {
            const min = 5;
            const minMessage = 'Hello {{ limit }}';
            const maxMessage = 'This collection should contain {{ limit }} elements or less.';

            const object = new Count({
                min: min,
                message_min: minMessage,
            });

            assert.strictEqual(object.options.min, min);
            assert.strictEqual(object.options.message_min, minMessage);
            assert.strictEqual(object.options.message_max, maxMessage);
        });

        it('Custom message with value', function () {
            const min = 5;
            const max = 7;

            const object = new Count({
                min: min,
                max: max,
                message_min: 'MIN {{ limit }} and {{ value }}.',
                message_max: 'MAX {{ limit }} and {{ value }}.',
            });

            let e = object.validate([1, 2, 3, 4]);
            assert.strictEqual(e.message, `MIN ${min} and [1,2,3,4].`);

            e = object.validate([1, 2, 3, 4, 5, 6, 7, 8]);
            assert.strictEqual(e.message, `MAX ${max} and [1,2,3,4,5,6,7,8].`);
        });
    });

    describe('#validate()', function () {
        it('min: 5; value: []', function () {
            const min = 5;
            const object = new Count({
                min: min,
            });

            const e = object.validate([]);
            assert.strictEqual(e.message, `This collection should contain ${min} elements or more.`);
        });

        it('min: 5; value: [1, 2, 3, 4]', function () {
            const min = 5;
            const object = new Count({
                min: min,
            });

            const e = object.validate([1, 2, 3, 4]);
            assert.strictEqual(e.message, `This collection should contain ${min} elements or more.`);
        });

        it('min: 5; value: [1, 2, 3, 4, 5]', function () {
            const object = new Count({
                min: 5,
            });

            const e = object.validate([1, 2, 3, 4, 5]);
            assert.ok(typeof e === 'undefined', e);
        });

        it('min: 5; value: [1, 2, 3, 4, 5, 6]', function () {
            const min = 5;
            const object = new Count({
                min: min,
            });

            const e = object.validate([1, 2, 3, 4, 5, 6]);
            assert.ok(typeof e === 'undefined', e);
        });

        it('max: 5; value: []', function () {
            const max = 5;
            const object = new Count({
                max: max,
            });

            const e = object.validate([]);
            assert.ok(typeof e === 'undefined', e);
        });

        it('max: 5; value: [1, 2, 3, 4]', function () {
            const max = 5;
            const object = new Count({
                max: max,
            });

            const e = object.validate([1, 2, 3, 4]);
            assert.ok(typeof e === 'undefined', e);
        });

        it('max: 5; value: [1, 2, 3, 4, 5]', function () {
            const max = 5;
            const object = new Count({
                max: max,
            });

            const e = object.validate([1, 2, 3, 4, 5]);
            assert.ok(typeof e === 'undefined', e);
        });

        it('max: 5; value: [1, 2, 3, 4, 5, 6]', function () {
            const max = 5;
            const object = new Count({
                max: max,
            });

            const e = object.validate([1, 2, 3, 4, 5, 6]);
            assert.strictEqual(e.message, `This collection should contain ${max} elements or less.`);
        });

        it('min: 5; max: 5; value: []', function () {
            const min = 5;
            const max = 5;
            const object = new Count({
                min: min,
                max: max,
            });

            const e = object.validate([]);
            assert.strictEqual(e.message, `This collection should contain exactly ${max} elements.`);
        });

        it('min: 5; max: 5; value: [1, 2, 3, 4]', function () {
            const min = 5;
            const max = 5;
            const object = new Count({
                min: min,
                max: max,
            });

            const e = object.validate([1, 2, 3, 4]);
            assert.strictEqual(e.message, `This collection should contain exactly ${max} elements.`);
        });

        it('min: 5; max: 5; value: [1, 2, 3, 4, 5]', function () {
            const min = 5;
            const max = 5;
            const object = new Count({
                min: min,
                max: max,
            });

            const e = object.validate([1, 2, 3, 4, 5]);
            assert.ok(typeof e === 'undefined', e);
        });

        it('min: 5; max: 5; value: [1, 2, 3, 4, 5, 6]', function () {
            const min = 5;
            const max = 5;
            const object = new Count({
                min: min,
                max: max,
            });

            const e = object.validate([1, 2, 3, 4, 5, 6]);
            assert.strictEqual(e.message, `This collection should contain exactly ${max} elements.`);
        });

        it('min: 5; max: 7; value: []', function () {
            const min = 5;
            const max = 7;
            const object = new Count({
                min: min,
                max: max,
            });

            const e = object.validate([]);
            assert.strictEqual(e.message, `This collection should contain ${min} elements or more.`);
        });

        it('min: 5; max: 7; value: [1, 2, 3, 4]', function () {
            const min = 5;
            const max = 7;
            const object = new Count({
                min: min,
                max: max,
            });

            const e = object.validate([1, 2, 3, 4]);
            assert.strictEqual(e.message, `This collection should contain ${min} elements or more.`);
        });

        it('min: 5; max: 13; value: [1, 2, 3, 4, 5, 6]', function () {
            const min = 5;
            const max = 13;
            const object = new Count({
                min: min,
                max: max,
            });

            const e = object.validate([1, 2, 3, 4, 5, 6]);
            assert.ok(typeof e === 'undefined', e);
        });

        it('min: 5; max: 13; value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]', function () {
            const min = 5;
            const max = 13;
            const object = new Count({
                min: min,
                max: max,
            });

            const e = object.validate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
            assert.strictEqual(e.message, `This collection should contain ${max} elements or less.`);
        });

        it('not countable values should have errors', function () {
            const min = 5;
            const max = 13;
            const object = new Count({
                min: min,
                max: max,
            });

            [undefined, 1, {}, '', null, true, false, function () {
            }, parseInt('a'), object]
                .forEach(function (value) {
                    const e = object.validate(value);
                    assert.strictEqual(e.message, `Provided value should be countable, "${typeof value}" given.`);
                });
        });

        it('ES5+ objects - valid', function () {
            const min = 2;
            const max = 10;
            const object = new Count({
                min: min,
                max: max,
            });

            let myMap = new Map();
            myMap.set(0, 'zero');
            myMap.set(1, 'one');

            let mySet = new Set();

            mySet.add(1);
            mySet.add(5);

            let buffer = new ArrayBuffer(max);
            let myDataView = new DataView(buffer);
            myDataView.setInt32(0, 0x1234ABCA);
            myDataView.setInt32(1, 0x1234ABCD);

            const list = [
                (new Int8Array(max)).fill(33, 0, max),
                (new Uint8Array(max)).fill(33, 0, max),
                (new Int16Array(max)).fill(33, 0, max),
                (new Uint16Array(max)).fill(33, 0, max),
                (new Float64Array(max)).fill(33.3, 0, max),
                // (new BigInt64Array(max)).fill(BigInt(9007199254740991), 0, max),
                myMap,
                mySet,
                buffer,
            ];

            list.forEach(function (value) {
                const e = object.validate(value);
                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('ES5+ objects - invalid', function () {
            const min = 2;
            const max = 10;
            const overMax = max + 5;
            const object = new Count({
                min: min,
                max: max,
            });

            let myMap = new Map();
            for (let i = 0; i < overMax; i++) {
                myMap.set(i, 'data-' + i);
            }

            let mySet = new Set();
            for (let i = 0; i < overMax; i++) {
                mySet.add(i);
            }

            let buffer = new ArrayBuffer(overMax);
            let myDataView = new DataView(buffer);
            myDataView.setInt32(0, 0x1234ABCA);
            myDataView.setInt32(1, 0x1234ABCD);

            const list = [
                (new Int8Array(overMax)).fill(33, 0, max),
                (new Uint8Array(overMax)).fill(33, 0, max),
                (new Int16Array(overMax)).fill(33, 0, max),
                (new Uint16Array(overMax)).fill(33, 0, max),
                (new Float64Array(overMax)).fill(33.3, 0, max),
                // (new BigInt64Array(overMax)).fill(BigInt(9007199254740991), 0, max),
                myMap,
                mySet,
                buffer,
            ];

            list.forEach(function (value) {
                const e = object.validate(value);
                assert.strictEqual(e.message, `This collection should contain ${max} elements or less.`);
            });
        });
    });
});
