import { Locale } from '../../src/validator';

const assert = require('assert');

describe('Constraints/Locale', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new Locale();
        });
    });

    describe('#validate()', function () {
        it('Valid', function () {
            const object = new Locale();

            ['en-US', 'ru', 'ru_RU', '', null, undefined,].forEach((code) => {
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
