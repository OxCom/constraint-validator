import { Country } from '../../dist/validator';

const assert = require('assert');

describe('Country', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new Country();
        });

        it('invalid mode in configuration', function () {
            try {
                new Country({mode: 'test'});
            } catch (e) {
                assert.strictEqual(e.message, 'Invalid validation mode provided: test');
            }
        });
    });

    describe('Static properties', function() {
        it('Expose constant "MODE_ALPHA2"', function () {
            assert.strictEqual('alpha2', Country.MODE_ALPHA2);
        });

        it('Expose constant "MODE_ALPHA3"', function () {
            assert.strictEqual('alpha3', Country.MODE_ALPHA3);
        });

        it('Expose constant "MODE_NUMERIC"', function () {
            assert.strictEqual('numeric', Country.MODE_NUMERIC);
        });
    });

    describe('#validate()', function () {
        it('alpha2 mode - valid (not a code)', function () {
            const objectA2 = new Country({mode: 'alpha2'});
            const objectA3 = new Country({mode: 'alpha3'});
            const objectNum = new Country({mode: 'numeric'});

            [null, undefined, parseInt('a'), ''].forEach((code) => {
                [objectA2, objectA3, objectNum].forEach((object) => {
                    const e = object.validate(code);

                    assert.ok(typeof e === 'undefined', e);
                });
            });
        });

        it('alpha2 mode - valid', function () {
            const object = new Country();

            ['RU',  'GB', 'DE', 'UA', 'ru', 'gb', 'de', 'ua'].forEach((code) => {
                const e = object.validate(code);

                assert.ok(typeof e === 'undefined', e);
            });
        });


        it('alpha2 mode - invalid', function () {
            const object = new Country();

            ['ZT', 'zt', '000', 'Z', 'ZTT', 'EN', 'en', 'RUS', 'rus', 'USA', 'usa', 1, 100, 804, '804']
                .forEach((code) => {
                    const e = object.validate(code);

                    assert.strictEqual(e.message, 'This value is not a valid country.');
                });
        });

        it('alpha3 mode - valid', function () {
            const object = new Country({mode: 'alpha3'});

            ['RUS', 'GBR', 'DEU', 'UKR', 'rus', 'gbr', 'deu', 'ukr'].forEach((code) => {
                const e = object.validate(code);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('alpha3 mode - invalid', function () {
            const object = new Country({mode: 'alpha3'});

            ['ZT', 'tz', 'TZR', 'tzr', 'RU', 'ru', 1, 100, 804, '804'].forEach((code) => {
                const e = object.validate(code);

                assert.strictEqual(e.message, 'This value is not a valid country.');
            });
        });

        it('numeric mode - valid', function () {
            const object = new Country({mode: 'numeric'});

            ['643', '826', '276', '804', '028', 643, 826, 276, 804, 28].forEach((code) => {
                const e = object.validate(code);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('numeric mode - invalid', function () {
            const object = new Country({mode: 'numeric'});

            // 'O28', 'O90', '36O' - has character 'O' instead of zero
            [
                '333', 1234, 1,
                'O28', 'O90', '36O',
                'RUS', 'GBR', 'DEU', 'UKR', 'rus', 'gbr', 'deu', 'ukr',
                'RU',  'GB', 'DE', 'UA', 'ru', 'gb', 'de', 'ua'
            ].forEach((code) => {
                const e = object.validate(code);

                assert.strictEqual(e.message, 'This value is not a valid country.');
            });
        });
    });
});
