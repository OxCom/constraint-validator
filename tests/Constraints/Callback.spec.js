import {Callback} from '../../src/validator';

const assert = require('assert');

describe('Callback', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            try {
                new Callback();
                assert.fail('Expected of configuration error.');
            } catch (e) {
                assert.strictEqual(e.message, 'No "callback" option is configured.');
            }
        });

        it('invalid configuration', function () {
            try {
                new Callback({callback: 123});
                assert.fail('Expected of configuration error.');
            } catch (e) {
                assert.strictEqual(e.message, 'Value should be type of "function", "number" given.');
            }
        });

        it('valid configuration', function () {
            new Callback({callback: () => {}});
        });
    });

    describe('#validate()', function () {
        it('is valid', function () {
            const object = new Callback({
                callback: (value, options) => true
            });

            ['', null, parseInt('a'), undefined, 'qwe', 123, 0, '0']
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('is not valid with undefined return', function () {
            const object = new Callback({
                callback: (value, options) => undefined
            });

            ['', null, parseInt('a'), undefined, 'qwe', 123, 0, '0']
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.strictEqual(e.message, 'This value is not a valid.');
                });
        });

        it('is not valid', function () {
            const object = new Callback({
                callback: (value, options) => false
            });

            ['', null, parseInt('a'), undefined, 'qwe', 123, 0, '0']
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.strictEqual(e.message, 'This value is not a valid.');
                });
        });

        it('value and options passed to callback', function () {
            ['', null, undefined, 'qwe', 123, 0, '0']
                .forEach((value) => {
                    const options = {'test': 'success'};
                    const object = new Callback({
                        callback: (v, o) => v === value && o === options
                    });

                    const e = object.validate(value, options);

                    assert.ok(typeof e === 'undefined', e);
                });
        });
    });
});
