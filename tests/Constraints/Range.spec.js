import { Range } from '../../dist/validator';

const assert = require('assert');

describe('Range', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            try {
                new Range();
                assert.fail('Expected of configuration error.');
            } catch (e) {
                assert.strictEqual(e.message, 'No "min" option is configured.');
            }
        });

        it('min - invalid', function () {
            try {
                new Range({min: false});
                assert.fail('Expected of configuration error.');
            } catch (e) {
                assert.strictEqual(e.message, 'Min limit should be type of "number" or "Date", "boolean" given.');
            }
        });

        it('max - invalid', function () {
            try {
                new Range({max: false});
                assert.fail('Expected of configuration error.');
            } catch (e) {
                assert.strictEqual(e.message, 'Max limit should be type of "number" or "Date", "boolean" given.');
            }
        });

        it('min - number; max - date', function () {
            try {
                new Range({min: 1, max: new Date()});
                assert.fail('Expected of configuration error.');
            } catch (e) {
                assert.strictEqual(e.message, 'Max limit should be type of "number", "object" given.');
            }
        });

        it('min - date; max - number', function () {
            try {
                new Range({max: 1, min: new Date()});
                assert.fail('Expected of configuration error.');
            } catch (e) {
                assert.strictEqual(e.message, 'Max limit should be type of "Date", "number" given.');
            }
        });
    });

    describe('#validate()', function () {
        it('Range: 33: - valid', function () {
            const object = new Range({min: 33});

            let e = object.validate(42);
            assert.ok(typeof e === 'undefined', e);

            e = object.validate(33);
            assert.ok(typeof e === 'undefined', e);
        });

        it('Range: 33: - invalid', function () {
            const object = new Range({min: 33});

            let e = object.validate(7);
            assert.strictEqual(e.message, 'This value should be 33 or more.');

            e = object.validate(32);
            assert.strictEqual(e.message, 'This value should be 33 or more.');
        });

        it('Range: :42 - valid', function () {
            const object = new Range({max: 42});

            let e = object.validate(42);
            assert.ok(typeof e === 'undefined', e);

            e = object.validate(33);
            assert.ok(typeof e === 'undefined', e);
        });

        it('Range: :42 - invalid', function () {
            const object = new Range({max: 42});

            let e = object.validate(47);
            assert.strictEqual(e.message, 'This value should be 42 or less.');

            e = object.validate(43);
            assert.strictEqual(e.message, 'This value should be 42 or less.');
        });

        it('Range: 33:42 - valid', function () {
            const object = new Range({min: 33, max: 42});

            let e = object.validate(42);
            assert.ok(typeof e === 'undefined', e);

            e = object.validate(33);
            assert.ok(typeof e === 'undefined', e);
        });

        it('Range: 33:42 - invalid', function () {
            const object = new Range({min: 33, max: 42});

            let e = object.validate(32);
            assert.strictEqual(e.message, 'This value should be between 33 and 42.');

            e = object.validate(7);
            assert.strictEqual(e.message, 'This value should be between 33 and 42.');

            e = object.validate(43);
            assert.strictEqual(e.message, 'This value should be between 33 and 42.');

            e = object.validate(47);
            assert.strictEqual(e.message, 'This value should be between 33 and 42.');
        });

        it('Range: 33.3:42.7 - valid', function () {
            const object = new Range({min: 33.3, max: 42.7});

            let e = object.validate(42.7);
            assert.ok(typeof e === 'undefined', e);

            e = object.validate(33.3);
            assert.ok(typeof e === 'undefined', e);
        });

        it('Range: 33.3:42.7 - invalid', function () {
            const object = new Range({min: 33.3, max: 42.7});

            let e = object.validate(33.2);
            assert.strictEqual(e.message, 'This value should be between 33.3 and 42.7.');

            e = object.validate(42.8);
            assert.strictEqual(e.message, 'This value should be between 33.3 and 42.7.');

            e = object.validate(new Date());
            assert.strictEqual(e.message, 'This value should be between 33.3 and 42.7.');
        });

        it('Range: 2019-01-01:2020-01-01', function () {
            const object = new Range({min: new Date('2019-01-01'), max: new Date('2020-01-01')});

            let e = object.validate('2019-12-01');
            assert.ok(typeof e === 'undefined', e);

            e = object.validate('now');
            assert.strictEqual(e.message, 'This value should be between 1/1/2019 and 1/1/2020.');
        });
    });
});
