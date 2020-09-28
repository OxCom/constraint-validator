import { NotBlank } from '../../src/validator';

const assert = require('assert');

describe('Constraints/NotBlank', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new NotBlank();
        });
    });

    describe('#validate()', function () {
        it('is valid - null allowed: false', function () {
            let object = new NotBlank();

            [1, true, false, 'test', {}, [], 0]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.ok(typeof e === 'undefined', e + ' Value: ' + JSON.stringify(value));
                });
        });

        it('is valid - null allowed: true', function () {
            let object = new NotBlank({allow_null: true});

            [1, true, false, 'test', {}, [], 0, null]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.ok(typeof e === 'undefined', e + ' Value: ' + JSON.stringify(value));
                });
        });

        it('is not valid - null allowed: false', function () {
            let object = new NotBlank();

            ['', null, undefined]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.strictEqual(e.message, 'This value should not be blank.');
                });
        });

        it('is not valid - null allowed: true', function () {
            let object = new NotBlank({allow_null: true});

            ['', undefined]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.strictEqual(e.message, 'This value should not be blank.');
                });
        });
    });
});
