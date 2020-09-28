import { Json } from '../../src/validator';

const assert = require('assert');

describe('Constraints/Json', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new Json();
        });
    });

    describe('#validate()', function () {
        it('is valid', function () {
            let object = new Json();

            [
                JSON.stringify(1),
                JSON.stringify([1, '1']),
                JSON.stringify('hello'),
                JSON.stringify(0),
                '"1"',
                '"world"',
                '0', 0, 123, null,
            ]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('is not valid', function () {
            let object = new Json();

            ['qwe', '', parseInt('a'), undefined]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.strictEqual(e.message, 'This value should be valid JSON.');
                });
        });
    });
});
