import { Bic } from '../../src/validator';

const assert = require('assert');

describe('Bic', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new Bic();
        });
    });

    describe('#validate()', function () {
        it('is valid - empty', function () {
            let object = new Bic();

            ['', null, parseInt('a'), undefined]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('is valid: no IBAN', function () {
            let object = new Bic();

            [
                'ASPKAT2LXXX',
                'ASPKAT2L',
                'DSBACNBXSHA',
                'UNCRIT2B912',
                'DABADKKK',
                'RZOOAT2L303',
            ]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('is not valid: no IBAN', function () {
            let object = new Bic();

            [
                [], function() {}, {},
                'DEUTD',
                'ASPKAT2LXX',
                'ASPKAT2LX',
                'ASPKAT2LXXX1',
                'DABADKK',
                '1SBACNBXSHA',
                'RZ00AT2L303',
                'D2BACNBXSHA',
                'DS3ACNBXSHA',
                'DSB4CNBXSHA',
                'DEUT12HH',
                'DSBAC6BXSHA',
                'DSBA5NBXSHA',
                'DSBAAABXSHA',
                'THISSVAL1D]',
                'DEUTDEF]',
                'DeutAT2LXXX',
                'DEUTAT2lxxx',
            ]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.strictEqual(e.message, 'This is not a valid Business Identifier Code (BIC).');
                });
        });

        it('is valid: with IBAN', function () {
            let object = new Bic({iban_path: 'my_awesome_iban'});

            [
                {bic:'BNPAGFGX', iban: ''},
                {bic:'BNPAGFGX', iban: 'FR14 2004 1010 0505 0001 3M02 606'},
                {bic:'BNPAPFGX', iban: 'FR14 2004 1010 0505 0001 3M02 606'},
                {bic:'BNPATFGX', iban: 'FR14 2004 1010 0505 0001 3M02 606'},
                {bic:'BNPAGPGX', iban: 'FR14 2004 1010 0505 0001 3M02 606'},
                {bic:'BNPAMQGX', iban: 'FR14 2004 1010 0505 0001 3M02 606'},
                {bic:'BNPAYTGX', iban: 'FR14 2004 1010 0505 0001 3M02 606'},
                {bic:'BNPANCGX', iban: 'FR14 2004 1010 0505 0001 3M02 606'},
                {bic:'BNPAREGX', iban: 'FR14 2004 1010 0505 0001 3M02 606'},
                {bic:'BNPAPMGX', iban: 'FR14 2004 1010 0505 0001 3M02 606'},
                {bic:'BNPAWFGX', iban: 'FR14 2004 1010 0505 0001 3M02 606'},

                // GB related special cases
                {bic:'BARCJESA', iban: 'GB12 CPBK 0892 9965 0449 911'},
                {bic:'BARCIMSA', iban: 'GB12 CPBK 0892 9965 0449 911'},
                {bic:'BARCGGSA', iban: 'GB12 CPBK 0892 9965 0449 911'},
                {bic:'BARCVGSA', iban: 'GB12 CPBK 0892 9965 0449 911'},
            ]
                .forEach((pair) => {
                    const e = object.validate(pair.bic, {form: {data: {my_awesome_iban: pair.iban}}});

                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('is invalid: with IBAN', function () {
            let object = new Bic({iban_path: 'my_awesome_iban'});

            const options = {form: {data: {my_awesome_iban: 'FR14 2004 1010 0505 0001 3M02 606'}}};
            const e = object.validate('UNCRIT2B912', options);

            assert.strictEqual(e.message, 'This Business Identifier Code (BIC) is not associated with IBAN FR14 2004 1010 0505 0001 3M02 606.');
        });
    });
});
