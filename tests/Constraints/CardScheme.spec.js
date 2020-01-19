import { CardScheme } from '../../src/validator';

const assert = require('assert');

describe('CardScheme', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            try {
                new CardScheme();
            } catch (e) {
                assert.strictEqual(e.message, 'No "schemas" option is configured.');
            }
        });

        it('invalid schema in configuration: null', function () {
            try {
                new CardScheme({schemas: null});
            } catch (e) {
                assert.strictEqual(e.message, 'Value should be type of "array" or "string", "object" given.');
            }
        });

        it('invalid schema in configuration: empty string', function () {
            try {
                new CardScheme({schemas: ''});
            } catch (e) {
                assert.strictEqual(e.message, 'The schemas list contains one or more unsupported elements.');
            }
        });

        it('invalid schema in configuration: empty array', function () {
            try {
                new CardScheme({schemas: []});
            } catch (e) {
                assert.strictEqual(e.message, 'The schemas list cannot be empty.');
            }
        });

        it('invalid schema in configuration', function () {
            try {
                new CardScheme({schemas: ['qwe']});
            } catch (e) {
                assert.strictEqual(e.message, 'The schemas list contains one or more unsupported elements.');
            }
        });

        it('Schema: string MIR', function () {
            new CardScheme({schemas: 'MIR'});
        });

        it('Schema: array MIR', function () {
            new CardScheme({schemas: 'MIR'});
        });

        it('Schema: string MIR + VISA', function () {
            new CardScheme({schemas: ['MIR', 'VISA']});
        });
    });

    describe('Static properties', function () {
        it('Expose constant "SCHEMA_AMEX"', function () {
            assert.strictEqual('AMEX', CardScheme.SCHEMA_AMEX);
        });

        it('Expose constant "SCHEMA_CHINA_UNIONPAY"', function () {
            assert.strictEqual('CHINA_UNIONPAY', CardScheme.SCHEMA_CHINA_UNIONPAY);
        });

        it('Expose constant "SCHEMA_DINERS"', function () {
            assert.strictEqual('DINERS', CardScheme.SCHEMA_DINERS);
        });

        it('Expose constant "SCHEMA_DISCOVER"', function () {
            assert.strictEqual('DISCOVER', CardScheme.SCHEMA_DISCOVER);
        });

        it('Expose constant "SCHEMA_INSTAPAYMENT"', function () {
            assert.strictEqual('INSTAPAYMENT', CardScheme.SCHEMA_INSTAPAYMENT);
        });

        it('Expose constant "SCHEMA_JCB"', function () {
            assert.strictEqual('JCB', CardScheme.SCHEMA_JCB);
        });

        it('Expose constant "SCHEMA_LASER"', function () {
            assert.strictEqual('LASER', CardScheme.SCHEMA_LASER);
        });

        it('Expose constant "SCHEMA_MAESTRO"', function () {
            assert.strictEqual('MAESTRO', CardScheme.SCHEMA_MAESTRO);
        });

        it('Expose constant "SCHEMA_MASTERCARD"', function () {
            assert.strictEqual('MASTERCARD', CardScheme.SCHEMA_MASTERCARD);
        });

        it('Expose constant "SCHEMA_MIR"', function () {
            assert.strictEqual('MIR', CardScheme.SCHEMA_MIR);
        });

        it('Expose constant "SCHEMA_UATP"', function () {
            assert.strictEqual('UATP', CardScheme.SCHEMA_UATP);
        });

        it('Expose constant "SCHEMA_VISA"', function () {
            assert.strictEqual('VISA', CardScheme.SCHEMA_VISA);
        });
    });

    describe('#validate()', function () {
        it('valid: AMEX', function () {
            [
                {schemas: 'AMEX', value: ''},
                {schemas: 'AMEX', value: null},
                {schemas: 'AMEX', value: undefined},

                {schemas: ['AMEX'], value: '378282246310005'},
                {schemas: ['AMEX'], value: '371449635398431'},
                {schemas: ['AMEX'], value: '378734493671000'},
                {schemas: ['AMEX'], value: '347298508610146'},
            ].forEach((pair) => {
                const object = new CardScheme({schemas: pair.schemas});
                const e = object.validate(pair.value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('valid: CHINA_UNIONPAY', function () {
            [
                {schemas: ['CHINA_UNIONPAY'], value: '6228888888888888'},
                {schemas: ['CHINA_UNIONPAY'], value: '62288888888888888'},
                {schemas: ['CHINA_UNIONPAY'], value: '622888888888888888'},
                {schemas: ['CHINA_UNIONPAY'], value: '6228888888888888888'},
            ].forEach((pair) => {
                const object = new CardScheme({schemas: pair.schemas});
                const e = object.validate(pair.value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('valid: DINERS', function () {
            [
                {schemas: ['DINERS'], value: '30569309025904'},
                {schemas: ['DINERS'], value: '36088894118515'},
                {schemas: ['DINERS'], value: '38520000023237'},
            ].forEach((pair) => {
                const object = new CardScheme({schemas: pair.schemas});
                const e = object.validate(pair.value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('valid: DISCOVER', function () {
            [
                {schemas: ['DISCOVER'], value: '6011111111111117'},
                {schemas: ['DISCOVER'], value: '6011000990139424'},
            ].forEach((pair) => {
                const object = new CardScheme({schemas: pair.schemas});
                const e = object.validate(pair.value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('valid: INSTAPAYMENT', function () {
            [
                {schemas: ['INSTAPAYMENT'], value: '6372476031350068'},
                {schemas: ['INSTAPAYMENT'], value: '6385537775789749'},
                {schemas: ['INSTAPAYMENT'], value: '6393440808445746'},
            ].forEach((pair) => {
                const object = new CardScheme({schemas: pair.schemas});
                const e = object.validate(pair.value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('valid: JCB', function () {
            [
                {schemas: 'JCB', value: '3530111333300000'},
                {schemas: 'JCB', value: '3566002020360505'},
                {schemas: 'JCB', value: '213112345678901'},
                {schemas: 'JCB', value: '180012345678901'},
            ].forEach((pair) => {
                const object = new CardScheme({schemas: pair.schemas});
                const e = object.validate(pair.value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('valid: LASER', function () {
            [
                {schemas: 'LASER', value: '6304678107004080'},
                {schemas: 'LASER', value: '6706440607428128629'},
                {schemas: 'LASER', value: '6771656738314582216'},
            ].forEach((pair) => {
                const object = new CardScheme({schemas: pair.schemas});
                const e = object.validate(pair.value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('valid: MAESTRO', function () {
            [
                {schemas: 'MAESTRO', value: '6759744069209'},
                {schemas: 'MAESTRO', value: '5020507657408074712'},
                {schemas: 'MAESTRO', value: '5612559223580173965'},
                {schemas: 'MAESTRO', value: '6759744069209'},
                {schemas: 'MAESTRO', value: '6594371785970435599'},
            ].forEach((pair) => {
                const object = new CardScheme({schemas: pair.schemas});
                const e = object.validate(pair.value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('valid: MASTERCARD', function () {
            [
                {schemas: 'MASTERCARD', value: '5555555555554444'},
                {schemas: 'MASTERCARD', value: '5105105105105100'},
                {schemas: 'MASTERCARD', value: '2221005555554444'},
                {schemas: 'MASTERCARD', value: '2230000000000000'},
                {schemas: 'MASTERCARD', value: '2300000000000000'},
                {schemas: 'MASTERCARD', value: '2699999999999999'},
                {schemas: 'MASTERCARD', value: '2709999999999999'},
                {schemas: 'MASTERCARD', value: '2720995105105100'},
            ].forEach((pair) => {
                const object = new CardScheme({schemas: pair.schemas});
                const e = object.validate(pair.value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('valid: MIR', function () {
            [
                {schemas: 'MIR', value: '2200381427330082'},
            ].forEach((pair) => {
                const object = new CardScheme({schemas: pair.schemas});
                const e = object.validate(pair.value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('valid: UATP', function () {
            [
                {schemas: 'UATP', value: '110165309696173'},
            ].forEach((pair) => {
                const object = new CardScheme({schemas: pair.schemas});
                const e = object.validate(pair.value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('valid: VISA', function () {
            [
                {schemas: 'VISA', value: '4111111111111111'},
                {schemas: 'VISA', value: '4012888888881881'},
                {schemas: 'VISA', value: '4222222222222'},
                {schemas: 'VISA', value: '4917610000000000003'},
            ].forEach((pair) => {
                const object = new CardScheme({schemas: pair.schemas});
                const e = object.validate(pair.value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('valid: MIXED', function () {
            [
                {schemas: ['AMEX', 'VISA'], value: '4111111111111111'},
                {schemas: ['AMEX', 'VISA'], value: '378282246310005'},
                {schemas: ['JCB', 'MASTERCARD'], value: '5105105105105100'},
                {schemas: ['VISA', 'MASTERCARD'], value: '5105105105105100'},
            ].forEach((pair) => {
                const object = new CardScheme({schemas: pair.schemas});
                const e = object.validate(pair.value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('invalid', function () {
            [
                {schemas: 'VISA', value: '1'},
                {schemas: 'VISA', value: 1},
                {schemas: 'VISA', value: -30},
                {schemas: 'VISA', value: '42424242424242424242'},

                {schemas: 'DINERS', value: '31569309025904'},
                {schemas: 'DINERS', value: '37088894118515'},
                {schemas: 'DINERS', value: '3056930'},

                {schemas: 'INSTAPAYMENT', value: '6313440808445746'},

                {schemas: 'CHINA_UNIONPAY', value: '622888888888888'},
                {schemas: 'CHINA_UNIONPAY', value: '62288888888888888888'},

                {schemas: 'AMEX', value: '357298508610146'},
                {schemas: 'AMEX', value: '30569309025904'},
                {schemas: 'AMEX', value: 'invalid'},
                {schemas: 'AMEX', value: '0'},
                {schemas: 'AMEX', value: 0},
                {schemas: 'AMEX', value: '000000000000'},

                {schemas: 'DISCOVER', value: '1117'},

                {schemas: 'MASTERCARD', value: '2721001234567890'},
                {schemas: 'MASTERCARD', value: '2220991234567890'},

                {schemas: ['UATP'], value: '11016530969617'},
                {schemas: ['MIR'], value: '22003814273300821'},
            ].forEach((pair) => {
                const object = new CardScheme({schemas: pair.schemas});
                const e = object.validate(pair.value);

                assert.strictEqual(e.message, 'Unsupported card type or invalid card number.');
            });
        });
    });
});
