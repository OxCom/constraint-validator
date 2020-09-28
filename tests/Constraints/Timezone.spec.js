import { Timezone } from '../../src/validator';

const assert = require('assert');

describe('Constraints/Timezone', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new Timezone();
        });
    });

    describe('#validate()', function () {
        const object = new Timezone();

        it('Valid: empty values should be considered as valid', function() {
            ['', null, undefined,].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });

        });

        it('Valid: America/Los_Angeles', function () {
            const e = object.validate('America/Los_Angeles');

            assert.ok(typeof e === 'undefined', e);
        });

        it('Valid: America/New_York', function () {
            const e = object.validate('America/New_York');

            assert.ok(typeof e === 'undefined', e);
        });

        it('Valid: Europe/Berlin', function () {
            const e = object.validate('Europe/Berlin');

            assert.ok(typeof e === 'undefined', e);
        });

        it('Valid: Europe/Moscow', function () {
            const e = object.validate('Europe/Moscow');

            assert.ok(typeof e === 'undefined', e);
        });

        it('Invalid: Asia/Moscow', function () {
            const e = object.validate('Asia/Moscow');

            assert.strictEqual(e.message, 'This value is not a valid timezone.');
        });

        it('Invalid: 123', function () {
            const e = object.validate(123);

            assert.strictEqual(e.message, 'This value is not a valid timezone.');
        });

        it('Invalid: "123"', function () {
            const e = object.validate('123');

            assert.strictEqual(e.message, 'This value is not a valid timezone.');
        });

        it('Invalid: Moscow', function () {
            const e = object.validate('Moscow');

            assert.strictEqual(e.message, 'This value is not a valid timezone.');
        });
    });
});
