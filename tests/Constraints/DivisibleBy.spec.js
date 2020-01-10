import { DivisibleBy } from '../../src/validator';

const assert = require('assert');

describe('DivisibleBy', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            try {
                new DivisibleBy();
            } catch (e) {
                assert.strictEqual(e.message, 'No "value" option is configured.');
            }
        });

        it('value configuration: asd', function () {
            try {
                new DivisibleBy({value: 'asd'});
            } catch (e) {
                assert.strictEqual(e.message, 'Value should be type of "number", "string" given.');
            }
        });
    });

    describe('#validate()', function () {
        it('is valid', function () {
            [
                {value: 1, by: 1},
                {value: 10, by: 2},
                {value: 10, by: 5},
                {value: 1.75, by: 1.75},
                {value: 3, by: 0.5},
                {value: '', by: 0.5},
                {value: undefined, by: 0.5},
                {value: null, by: 0.5},
            ].forEach((item) => {
                const object = new DivisibleBy({value: item.by});
                const e = object.validate(item.value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('is not valid - type', function () {
            [
                {value: 'asd', by: 0.5},
                {value: function() {}, by: 0.5},
            ].forEach((item) => {
                const object = new DivisibleBy({value: item.by});
                const e = object.validate(item.value);

                assert.strictEqual(e.message, `This values has different types. Given type is "${typeof item.value}"; Expected type is "number".`);
            });
        });



        it('is not valid', function () {
            [
                {value: 1, by: 1.3},
                {value: 10, by: 42},
                {value: 10, by: 7},
                {value: 1.75, by: 1.33},
                {value: 3, by: 0.33},
            ].forEach((item) => {
                const object = new DivisibleBy({value: item.by});
                const e = object.validate(item.value);

                assert.strictEqual(e.message, `This value should be a multiple of ${item.by}.`);
            });
        });
    });
});
