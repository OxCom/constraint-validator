import { Luhn } from '../../src/validator';

const assert = require('assert');

describe('Luhn', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new Luhn();
        });
    });

    describe('#validate()', function () {
        it('Valid', function () {
            const object = new Luhn();

            [
                '', null, undefined,
                '42424242424242424242',
                '378282246310005',
                '371449635398431',
                '378734493671000',
                '5610591081018250',
                '30569309025904',
                '38520000023237',
                '6011111111111117',
                '6011000990139424',
                '3530111333300000',
                '3566002020360505',
                '5555555555554444',
                '3530-1113-3330-0000',
                '3566002020360505',
                '3566 0020 2036 0505',
                '5555555555554444',
                '5105105105105100',
                '4111111111111111',
                '4012888888881881',
                '4222222222222',
                '5019717010103742',
                '6331101999990016',
            ].forEach((code) => {
                const e = object.validate(code);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('Invalid', function () {
            const object = new Luhn();

            [
                'foobar', 1, 100, 804, '804',
                0,
                '0',
                '0000000000',
                '00',
                '1234567812345678',
                '4222222222222222',
                '0000000000000000',
                '42-22222222222222'
            ]
                .forEach((code) => {
                    const e = object.validate(code);

                    assert.strictEqual(e.message, 'Invalid card number.');
                });
        });
    });
});
