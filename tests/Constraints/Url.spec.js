import { Url } from '../../src/validator';

const assert = require('assert');

describe('Constraints/Url', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new Url();
        });

        it('invalid mode in configuration', function () {
            try {
                new Url({mode: 'test'});
            } catch (e) {
                assert.strictEqual(e.message, 'Invalid validation mode provided: test');
            }
        });
    });

    describe('Static properties', function() {
        it('Expose constant "MODE_REGEXP"', function () {
            assert.strictEqual('regexp', Url.MODE_REGEXP);
        });

        it('Expose constant "MODE_URL_API"', function () {
            assert.strictEqual('url_api', Url.MODE_URL_API);
        });

        it('Expose constant "MODE_HTML5"', function () {
            assert.strictEqual('html5', Url.MODE_HTML5);
        });
    });

    describe('#validate()', function () {
        it('regexp mode - invalid', function () {
            const object = new Url({
                mode: 'regexp',
                message: '{{ value }} is not valid.',
            });

            [
                'localhost',
                'local',
                'example"com',
                'example=com',
                'example&com',
                'example@com',
                'example$com',
                '//example.com/test?var=val',
                '.com',
                'smb://example.com/test?var=val',
            ].forEach((value) => {
                const e = object.validate(value);
                assert.strictEqual(e.message, `${value} is not valid.`);
            });
        });

        it('regexp mode - valid', function () {
            const object = new Url({
                mode: 'regexp',
                message: '{{ value }} is not valid.',
            });

            [
                '', null, undefined,
                'example.com',
                'example.com/',
                'example.com/test',
                'example.com/test?var=val',
                'http://example.com/test?var=val',
                'https://example.com/test?var=val',
                'ftp://example.com/test?var=val',
            ].forEach((value) => {
                const e = object.validate(value);
                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('api mode - invalid', function () {
            const object = new Url({
                mode: 'url_api',
                message: '{{ value }} is not valid.',
            });

            [
                'localhost',
                'local',
                'example"com',
                'example=com',
                'example&com',
                'example@com',
                'example$com',
                '//example.com/test?var=val',
                '.com',
                'example.com',
                'example.com/',
                'example.com/test?var=val',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, `${value} is not valid.`);
            });
        });

        it('api mode - valid', function () {
            const object = new Url({
                mode: 'url_api',
                message: '{{ value }} is not valid.',
            });

            [
                'http://example.com/test?var=val',
                'https://example.com/test?var=val',
                'smb://example.com/test?var=val',
                'ftp://example.com/test?var=val',
            ].forEach((value) => {
                const e = object.validate(value);
                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('html5 mode - invalid', function () {
            const object = new Url({
                mode: 'html5',
                message: '{{ value }} is not valid.',
            });

            [
                'localhost',
                'local',
                'example"com',
                'example=com',
                'example&com',
                'example@com',
                'example$com',
                'example.com',
                'example.com',
                'example.com/',
                'example.com/test',
                'example.com/test?var=val',
                '//example.com/test?var=val',
                '.com',
            ].forEach((value) => {
                const e = object.validate(value);
                assert.strictEqual(e.message, `${value} is not valid.`);
            });
        });

        it('html5 mode - valid', function () {
            const object = new Url({
                mode: 'html5',
                message: '{{ value }} is not valid.',
            });

            [
                'http://example.com/test?var=val',
                'https://example.com/test?var=val',
                'ftp://example.com/test?var=val',
                'smb://example.com/test?var=val',
            ].forEach((value) => {
                const e = object.validate(value);
                assert.ok(typeof e === 'undefined', e);
            });
        });
    });
});
