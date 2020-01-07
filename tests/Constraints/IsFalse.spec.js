import { IsFalse } from '../../src/validator';

const assert = require('assert');

describe('IsFalse', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new IsFalse();
        });
    });

    describe('#validate()', function () {
        it('is valid', function () {
            let object = new IsFalse();

            [false, 0, '0', null]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('is not valid', function () {
            let object = new IsFalse();

            ['qwe', 123, '', parseInt('a'), undefined, true, 1, '1']
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.strictEqual(e.message, 'This value should be false.');
                });
        });
    });
});
