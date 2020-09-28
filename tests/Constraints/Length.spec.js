import { Length } from '../../src/validator';

const assert = require('assert');

describe('Constraints/Length', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            try {
                new Length();
                assert.fail('Expected of configuration error.');
            } catch (e) {
                assert.strictEqual(e.message, 'No "min" option is configured.');
            }
        });

        it('min option provided', function () {
            const min = 5;
            const object = new Length({
                min: min,
            });

            assert.strictEqual(object.options.min, min);
        });

        it('max option provided', function () {
            const max = 5;
            const object = new Length({
                max: max,
            });

            assert.strictEqual(object.options.max, max);
        });

        it('max and min options provided', function () {
            const min = 5;
            const max = 7;
            const object = new Length({
                min: min,
                max: max,
            });

            assert.strictEqual(object.options.min, min);
            assert.strictEqual(object.options.max, max);
        });

        it('min message option provided', function () {
            const min = 5;
            const minMessage = 'Hello {{ limit }}';
            const maxMessage = 'This value is too long. It should have {{ limit }} character(s) or less.';

            const object = new Length({
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

            const object = new Length({
                min: min,
                max: max,
                message_min: 'MIN {{ limit }} and {{ value }}.',
                message_max: 'MAX {{ limit }} and {{ value }}.',
            });

            let e = object.validate('hell');
            assert.strictEqual(e.message, `MIN ${min} and hell.`);

            e = object.validate('hello_world');
            assert.strictEqual(e.message, `MAX ${max} and hello_world.`);
        });
    });

    describe('#validate()', function () {
        it('min: 5; value: ""', function () {
            const min = 5;
            const object = new Length({
                min: min,
            });

            const e = object.validate('');
            assert.strictEqual(e.message, `This value is too short. It should have ${min} character(s) or more.`);
        });

        it('min: 5; value: "hell"', function () {
            const min = 5;
            const object = new Length({
                min: min,
            });

            const e = object.validate('hell');
            assert.strictEqual(e.message, `This value is too short. It should have ${min} character(s) or more.`);
        });

        it('min: 5; value: "hello"', function () {
            const object = new Length({
                min: 5,
            });

            const e = object.validate('hello');
            assert.ok(typeof e === 'undefined', e);
        });

        it('min: 5; value: "hello_world"', function () {
            const min = 5;
            const object = new Length({
                min: min,
            });

            const e = object.validate('hello_world');
            assert.ok(typeof e === 'undefined', e);
        });

        it('max: 5; value: ""', function () {
            const max = 5;
            const object = new Length({
                max: max,
            });

            const e = object.validate('');
            assert.ok(typeof e === 'undefined', e);
        });

        it('max: 5; value: "hell"', function () {
            const max = 5;
            const object = new Length({
                max: max,
            });

            const e = object.validate('hell');
            assert.ok(typeof e === 'undefined', e);
        });

        it('max: 5; value: "hello"', function () {
            const max = 5;
            const object = new Length({
                max: max,
            });

            const e = object.validate('hello');
            assert.ok(typeof e === 'undefined', e);
        });

        it('max: 5; value: "hello_world"', function () {
            const max = 5;
            const object = new Length({
                max: max,
            });

            const e = object.validate('hello_world');
            assert.strictEqual(e.message, `This value is too long. It should have ${max} character(s) or less.`);
        });

        it('min: 5; max: 5; value: ""', function () {
            const min = 5;
            const max = 5;
            const object = new Length({
                min: min,
                max: max,
            });

            const e = object.validate('');
            assert.strictEqual(e.message, `This value should have exactly ${max} character(s).`);
        });

        it('min: 5; max: 5; value: "hell"', function () {
            const min = 5;
            const max = 5;
            const object = new Length({
                min: min,
                max: max,
            });

            const e = object.validate('hell');
            assert.strictEqual(e.message, `This value should have exactly ${max} character(s).`);
        });

        it('min: 5; max: 5; value: "hello"', function () {
            const min = 5;
            const max = 5;
            const object = new Length({
                min: min,
                max: max,
            });

            const e = object.validate('hello');
            assert.ok(typeof e === 'undefined', e);
        });

        it('min: 5; max: 5; value: "hello_world"', function () {
            const min = 5;
            const max = 5;
            const object = new Length({
                min: min,
                max: max,
            });

            const e = object.validate('hello_world');
            assert.strictEqual(e.message, `This value should have exactly ${max} character(s).`);
        });

        it('min: 5; max: 7; value: ""', function () {
            const min = 5;
            const max = 7;
            const object = new Length({
                min: min,
                max: max,
            });

            const e = object.validate('');
            assert.strictEqual(e.message, `This value is too short. It should have ${min} character(s) or more.`);
        });

        it('min: 5; max: 7; value: "hell"', function () {
            const min = 5;
            const max = 7;
            const object = new Length({
                min: min,
                max: max,
            });

            const e = object.validate('hell');
            assert.strictEqual(e.message, `This value is too short. It should have ${min} character(s) or more.`);
        });

        it('min: 5; max: 13; value: "hello_world"', function () {
            const min = 5;
            const max = 13;
            const object = new Length({
                min: min,
                max: max,
            });

            const e = object.validate('hello_world');
            assert.ok(typeof e === 'undefined', e);
        });

        it('min: 5; max: 13; value: "hello_world_long"', function () {
            const min = 5;
            const max = 13;
            const object = new Length({
                min: min,
                max: max,
            });

            const e = object.validate('hello_world_long');
            assert.strictEqual(e.message, `This value is too long. It should have ${max} character(s) or less.`);
        });

        it('not string values should be skipped', function () {
            const min = 5;
            const max = 13;
            const object = new Length({
                min: min,
                max: max,
            });

            [undefined, 1, {}, [], null, true, false, function () {
            }, parseInt('a'), object]
                .forEach(function (value) {
                    object.validate(value);
                });
        });
    });
});
