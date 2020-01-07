import { Locale } from '../../dist/validator';

const assert = require('assert');

describe('Locale', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new Locale();
        });
    });

    describe('#validate()', function () {
        it('Valid', function () {
            const object = new Locale();

            ['en-US', 'ru', 'ru_RU'].forEach((code) => {
                const e = object.validate(code);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('Invalid', function () {
            const object = new Locale();

            ['rus', 'eng', 'foobar', 1, 100, 804, '804']
                .forEach((code) => {
                    const e = object.validate(code);

                    assert.strictEqual(e.message, 'This value is not a valid locale.');
                });
        });
    });
});
