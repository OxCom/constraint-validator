import { NotNull } from '../../src/validator';

const assert = require('assert');

describe('Constraints/NotNull', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new NotNull();
        });
    });

    describe('#validate()', function () {
        it('is valid', function () {
            let object = new NotNull();

            ['qwe', 123, 0, '0', '', false, true, parseInt('a'), undefined]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('is not valid', function () {
            let object = new NotNull();

            const e = object.validate(null);

            assert.strictEqual(e.message, 'This value should not be null.');
        });
    });
});
