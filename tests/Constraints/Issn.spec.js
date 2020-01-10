import { Issn } from '../../src/validator';

const assert = require('assert');

describe('Issn', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new Issn();
        });
    });

    describe('#validate()', function () {
        it('is valid - empty', function () {
            let object = new Issn();

            [null, undefined, '', []].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('is valid - hyphen: false, case: false', function () {
            let object = new Issn();

            [
                '2162-321x',
                '2160-200x',
                '1537-453X',
                '0002-922x',
                '2162321X',
                '1550-7416',
                '1539-8560',
                '2156-5376',
                '1119-023X',
                '1684-5315',
                '1996-0786',
                '1684-5374',
                '1996-0794',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('is valid - hyphen: true, case: false', function () {
            let object = new Issn({hyphen: true});

            [
                '2162-321x',
                '2160-200x',
                '1537-453x',
                '0002-922x',
                '1550-7416',
                '1539-8560',
                '2156-5376',
                '1119-023X',
                '1684-5315',
                '1996-0786',
                '1684-5374',
                '1996-0794',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('is not valid - hyphen: true, case: false', function () {
            let object = new Issn({hyphen: true});

            [
                '2162321x',
                '2160200x',
                '1537453x',
                '0002922x',
                '15507416',
                '15398560',
                '21565376',
                '19960786',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This value is not a valid ISSN.');
            });
        });

        it('is valid - hyphen: true, case: true', function () {
            let object = new Issn({hyphen: true, case_sensitive: true});

            [
                '2162-321X',
                '2160-200X',
                '1537-453X',
                '1550-7416',
                '1539-8560',
                '2156-5376',
                '1119-023X',
                '1684-5315',
                '1996-0786',
                '1684-5374',
                '1996-0794',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('is not valid - hyphen: true, case: true', function () {
            let object = new Issn({hyphen: true, case_sensitive: true});

            [
                '2162-321x',
                '2160-200x',
                '1537453X',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This value is not a valid ISSN.');
            });
        });

        it('is valid - hyphen: false, case: true', function () {
            let object = new Issn({case_sensitive: true});

            [
                '2162-321x',
                '2160-200x',
                '2160200x',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This value is not a valid ISSN.');
            });
        });

        it('is not valid', function () {
            let object = new Issn();

            [
                '1162-321x',
                '1170-200x',
                '2547-453x',
                '1002-922x',
                '2550-7416',
                '25398560',
                '31565376',
                '2119023X',
                '26845315',
                '2996-0786',
                '2684-f37D',
                '29x6-0794',
            ]
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.strictEqual(e.message, 'This value is not a valid ISSN.');
                });
        });
    });
});
