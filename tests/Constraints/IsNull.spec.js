import { IsNull } from '../../dist/validator';

const assert = require('assert');

describe('IsNull', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new IsNull();
        });
    });

    describe('#validate()', function () {
        it('is valid', function () {
            let object = new IsNull();

            const e = object.validate(null);

            assert.ok(typeof e === 'undefined', e);
        });

        it('is not valid', function () {
            let object = new IsNull();

            ['qwe', 123, 0, '0', '', false, true, parseInt('a'), undefined]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.strictEqual(e.message, 'This value should be null.');
                });
        });
    });
});
