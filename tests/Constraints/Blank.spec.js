import { Blank } from '../../dist/validator';

const assert = require('assert');

describe('Blank', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new Blank();
        });
    });

    describe('#validate()', function () {
        it('is valid', function () {
            let object = new Blank();

            ['', null, parseInt('a'), undefined, function () {}]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('is not valid', function () {
            let object = new Blank();

            ['qwe', 123, 0, '0']
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.strictEqual(e.message, 'This value should be blank.');
                });
        });
    });
});
