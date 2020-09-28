import { Currency } from '../../src/validator';

const assert = require('assert');

describe('Constraints/Currency', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new Currency();
        });
    });

    describe('#validate()', function () {
        it('Valid', function () {
            const object = new Currency();

            [
                'rub', 'RUB', 'usd', 'USD', 'eur', 'EUR',
                '', null, undefined
            ].forEach((code) => {
                const e = object.validate(code);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('Invalid', function () {
            const object = new Currency();

            [
                'rup', 'pgb', 'foobar', 1, 100, 804, '804',
                function() {}
            ]
                .forEach((code) => {
                    const e = object.validate(code);

                    assert.strictEqual(e.message, 'This value is not a valid currency.');
                });
        });
    });
});
