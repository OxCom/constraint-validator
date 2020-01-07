import { IsTrue } from '../../dist/validator';

const assert = require('assert');

describe('IsTrue', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new IsTrue();
        });
    });

    describe('#validate()', function () {
        it('is valid', function () {
            let object = new IsTrue();

            [true, 1, '1', null]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('is not valid', function () {
            let object = new IsTrue();

            ['qwe', 123, '', parseInt('a'), undefined, false, 0, '0']
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.strictEqual(e.message, 'This value should be true.');
                });
        });
    });
});
