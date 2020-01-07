import { Language } from '../../dist/validator';

const assert = require('assert');

describe('Language', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new Language();
        });
    });

    describe('#validate()', function () {
        it('Valid', function () {
            const object = new Language();

            ['ru', 'en', 'my'].forEach((code) => {
                const e = object.validate(code);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('Invalid', function () {
            const object = new Language();

            ['rus', 'eng', 'foobar', 1, 100, 804, '804']
                .forEach((code) => {
                    const e = object.validate(code);

                    assert.strictEqual(e.message, 'This value is not a valid language.');
                });
        });
    });
});
