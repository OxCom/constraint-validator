import { Ip } from '../../dist/validator';

const assert = require('assert');

describe('Ip', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new Ip();
        });

        it('invalid mode in configuration', function () {
            try {
                new Ip({version: 'test'});
            } catch (e) {
                assert.strictEqual(e.message, 'Invalid validation version provided: test');
            }
        });
    });

    describe('Static properties', function() {
        it('Expose constant "MODE_ALL"', function () {
            assert.strictEqual('all', Ip.MODE_ALL);
        });

        it('Expose constant "MODE_V4"', function () {
            assert.strictEqual('4', Ip.MODE_V4);
        });

        it('Expose constant "MODE_V6"', function () {
            assert.strictEqual('6', Ip.MODE_V6);
        });

        it('Expose constant "MODE_V4_NO_PRIV"', function () {
            assert.strictEqual('4_no_priv', Ip.MODE_V4_NO_PRIV);
        });

        it('Expose constant "MODE_V6_NO_PRIV"', function () {
            assert.strictEqual('6_no_priv', Ip.MODE_V6_NO_PRIV);
        });

        it('Expose constant "MODE_ALL_NO_PRIV"', function () {
            assert.strictEqual('all_no_priv', Ip.MODE_ALL_NO_PRIV);
        });

        it('Expose constant "MODE_V4_NO_RES"', function () {
            assert.strictEqual('4_no_res', Ip.MODE_V4_NO_RES);
        });

        it('Expose constant "MODE_V6_NO_RES"', function () {
            assert.strictEqual('6_no_res', Ip.MODE_V6_NO_RES);
        });

        it('Expose constant "MODE_ALL_NO_RES"', function () {
            assert.strictEqual('all_no_res', Ip.MODE_ALL_NO_RES);
        });

        it('Expose constant "MODE_V4_PUB"', function () {
            assert.strictEqual('4_pub', Ip.MODE_V4_PUB);
        });

        it('Expose constant "MODE_V6_PUB"', function () {
            assert.strictEqual('6_pub', Ip.MODE_V6_PUB);
        });

        it('Expose constant "MODE_ALL_PUB"', function () {
            assert.strictEqual('all_pub', Ip.MODE_ALL_PUB);
        });
    });

    describe('#validate()', function () {
        it('MODE_ALL - valid', function () {
            const object = new Ip({version: Ip.MODE_ALL});

            [
                '10.12.12.3',
                '10.11.33.42',
                '172.16.33.42',
                '172.16.1.176',
                '192.168.11.96',
                '192.168.33.42',
                '1.1.1.1',
                '8.8.8.8',
                '240.1.2.3',
                '185.186.141.142',
                '172.217.18.174',
                '178.248.237.68',
                '5.255.255.80',
                '77.88.55.77',
                '255.255.255.255',
                '2001:db8::3210',
                '2001:db8:F53A::1',
                '::ffff:192.168.1.1',
                '1200:0000:AB00:1234:0000:2552:7777:1313',
                '2001:cdba:0000:0000:0000:0000:3257:9652',
                '21DA:D3:0:2F3B:2AA:FF:FE28:9C5A',
                '2001:cdba:0:0:0:0:3257:9652',
                '::2001:cdba:3257:9652',
                'fd03:6951:5337:667c:77:15:55:48',
                'fc00::69',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('MODE_ALL - invalid', function () {
            const object = new Ip({version: Ip.MODE_ALL});

            [
                '300.12.12.3',
                '8.8.8',
                '185.186.141.wtf',
                '11.0.0.0/8',
                '::ffff:300.168.1.1',
                '::ffff:300.168.1.1:0',
                'fe80::wtf',
                'fe80::%',
                '::ffff:222.1.41.9000',
                '200001::1',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This is not a valid IP address.');
            });
        });

        it('MODE_V4 - valid', function () {
            const object = new Ip({version: Ip.MODE_V4});

            [
                '10.12.12.3',
                '10.11.33.42',
                '172.16.33.42',
                '172.16.1.176',
                '192.168.11.96',
                '192.168.33.42',
                '1.1.1.1',
                '8.8.8.8',
                '240.1.2.3',
                '185.186.141.142',
                '172.217.18.174',
                '178.248.237.68',
                '5.255.255.80',
                '77.88.55.77',
                '255.255.255.255',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('MODE_V4 - invalid', function () {
            const object = new Ip({version: Ip.MODE_V4});

            [
                '300.12.12.3',
                '8.8.8',
                '185.186.141.wtf',
                '11.0.0.0/8',
                '2001:db8:F53A::1',
                '::ffff:192.168.1.1',
                '1200:0000:AB00:1234:0000:2552:7777:1313',
                '2001:cdba:0000:0000:0000:0000:3257:9652',
                '21DA:D3:0:2F3B:2AA:FF:FE28:9C5A',
                '2001:cdba:0:0:0:0:3257:9652',
                '::2001:cdba:3257:9652',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This is not a valid IP address.');
            });
        });

        it('MODE_V6 - valid', function () {
            const object = new Ip({version: Ip.MODE_V6});

            [
                '2001:db8::3210',
                '2001:db8:F53A::1',
                '::ffff:192.168.1.1',
                '1200:0000:AB00:1234:0000:2552:7777:1313',
                '2001:cdba:0000:0000:0000:0000:3257:9652',
                '21DA:D3:0:2F3B:2AA:FF:FE28:9C5A',
                '2001:cdba:0:0:0:0:3257:9652',
                '::2001:cdba:3257:9652',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('MODE_V6 - invalid', function () {
            const object = new Ip({version: Ip.MODE_V6});

            [
                '10.12.12.3',
                '10.11.33.42',
                '172.16.33.42',
                '172.16.1.176',
                '192.168.11.96',
                '192.168.33.42',
                '1.1.1.1',
                '8.8.8.8',
                '185.186.141.142',
                '172.217.18.174',
                '178.248.237.68',
                '5.255.255.80',
                '77.88.55.77',
                '255.255.255.255',
                '::ffff:300.168.1.1',
                '::ffff:300.168.1.1:0',
                'fe80::wtf',
                'fe80::%',
                '::ffff:222.1.41.9000',
                '200001::1',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This is not a valid IP address.');
            });
        });

        it('MODE_V4_NO_PRIV - valid', function () {
            const object = new Ip({version: Ip.MODE_V4_NO_PRIV});

            [
                '1.1.1.1',
                '8.8.8.8',
                '185.186.141.142',
                '172.217.18.174',
                '178.248.237.68',
                '5.255.255.80',
                '77.88.55.77',
                '255.255.255.255',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('MODE_V4_NO_PRIV - invalid', function () {
            const object = new Ip({version: Ip.MODE_V4_NO_PRIV});

            [
                '10.12.12.3',
                '10.11.33.42',
                '172.16.33.42',
                '172.16.1.176',
                '192.168.11.96',
                '192.168.33.42',
                '2001:db8:F53A::1',
                '::ffff:192.168.1.1',
                '1200:0000:AB00:1234:0000:2552:7777:1313',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This is not a valid IP address.');
            });
        });

        it('MODE_V6_NO_PRIV - valid', function () {
            const object = new Ip({version: Ip.MODE_V6_NO_PRIV});

            [
                '2001:db8:F53A::1',
                '::ffff:192.168.1.1',
                '1200:0000:AB00:1234:0000:2552:7777:1313',
                '2001:cdba:0000:0000:0000:0000:3257:9652',
                '21DA:D3:0:2F3B:2AA:FF:FE28:9C5A',
                '2001:cdba:0:0:0:0:3257:9652',
                '::2001:cdba:3257:9652',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('MODE_V6_NO_PRIV - invalid', function () {
            const object = new Ip({version: Ip.MODE_V6_NO_PRIV});

            [
                '10.12.12.3',
                '10.11.33.42',
                '172.16.33.42',
                '172.16.1.176',
                '192.168.11.96',
                '192.168.33.42',
                '1.1.1.1',
                '8.8.8.8',
                '185.186.141.142',
                '172.217.18.174',
                '178.248.237.68',
                '5.255.255.80',
                '77.88.55.77',
                '255.255.255.255',
                'fd03:6951:5337:667c:77:15:55:48',
                'fc00::69',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This is not a valid IP address.');
            });
        });

        it('MODE_ALL_NO_PRIV - valid', function () {
            const object = new Ip({version: Ip.MODE_ALL_NO_PRIV});

            [
                '1.1.1.1',
                '8.8.8.8',
                '185.186.141.142',
                '172.217.18.174',
                '178.248.237.68',
                '5.255.255.80',
                '77.88.55.77',
                '255.255.255.255',
                '2001:db8:F53A::1',
                '::ffff:192.168.1.1',
                '1200:0000:AB00:1234:0000:2552:7777:1313',
                '2001:cdba:0000:0000:0000:0000:3257:9652',
                '21DA:D3:0:2F3B:2AA:FF:FE28:9C5A',
                '2001:cdba:0:0:0:0:3257:9652',
                '::2001:cdba:3257:9652',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('MODE_ALL_NO_PRIV - invalid', function () {
            const object = new Ip({version: Ip.MODE_V4_NO_PRIV});

            [
                '10.12.12.3',
                '10.11.33.42',
                '172.16.33.42',
                '172.16.1.176',
                '192.168.11.96',
                '192.168.33.42',
                'fd03:6951:5337:667c:77:15:55:48',
                'fc00::69',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This is not a valid IP address.');
            });
        });

        it('MODE_V4_NO_RES - valid', function () {
            const object = new Ip({version: Ip.MODE_V4_NO_RES});

            [
                '10.12.12.3',
                '10.11.33.42',
                '172.16.33.42',
                '172.16.1.176',
                '192.168.11.96',
                '192.168.33.42',
                '1.1.1.1',
                '8.8.8.8',
                '185.186.141.142',
                '172.217.18.174',
                '178.248.237.68',
                '5.255.255.80',
                '77.88.55.77',
                '255.255.255.255',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('MODE_V4_NO_RES - invalid', function () {
            const object = new Ip({version: Ip.MODE_V4_NO_RES});

            [
                '240.1.2.3',
                '1200:0000:AB00:1234:0000:2552:7777:1313',
                '2001:cdba:0000:0000:0000:0000:3257:9652',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This is not a valid IP address.');
            });
        });

        it('MODE_V6_NO_RES - valid', function () {
            const object = new Ip({version: Ip.MODE_V6_NO_RES});

            [
                '2001:470:8:66::1',
                '::ffff:192.168.1.1',
                '1200:0000:AB00:1234:0000:2552:7777:1313',
                '2001:cdba:0000:0000:0000:0000:3257:9652',
                '21DA:D3:0:2F3B:2AA:FF:FE28:9C5A',
                '2001:cdba:0:0:0:0:3257:9652',
                '::2001:cdba:3257:9652',
                'fd03:6951:5337:667c:77:15:55:48',
                'fc00::69',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('MODE_V6_NO_RES - invalid', function () {
            const object = new Ip({version: Ip.MODE_V6_NO_RES});

            [
                '10.12.12.3',
                '10.11.33.42',
                '172.16.33.42',
                '172.16.1.176',
                '192.168.11.96',
                '192.168.33.42',
                '1.1.1.1',
                '8.8.8.8',
                '240.1.2.3',
                '185.186.141.142',
                '172.217.18.174',
                '178.248.237.68',
                '5.255.255.80',
                '77.88.55.77',
                '255.255.255.255',
                '2001:db8::3210',
                '2001:db8:F53A::1',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This is not a valid IP address.');
            });
        });

        it('MODE_ALL_NO_RES - valid', function () {
            const object = new Ip({version: Ip.MODE_ALL_NO_RES});

            [
                '10.12.12.3',
                '10.11.33.42',
                '172.16.33.42',
                '172.16.1.176',
                '192.168.11.96',
                '192.168.33.42',
                '1.1.1.1',
                '8.8.8.8',
                '185.186.141.142',
                '172.217.18.174',
                '178.248.237.68',
                '5.255.255.80',
                '77.88.55.77',
                '255.255.255.255',
                '2001:470:8:66::1',
                '::ffff:192.168.1.1',
                '1200:0000:AB00:1234:0000:2552:7777:1313',
                '2001:cdba:0000:0000:0000:0000:3257:9652',
                '21DA:D3:0:2F3B:2AA:FF:FE28:9C5A',
                '2001:cdba:0:0:0:0:3257:9652',
                '::2001:cdba:3257:9652',
                'fd03:6951:5337:667c:77:15:55:48',
                'fc00::69',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('MODE_ALL_NO_RES - invalid', function () {
            const object = new Ip({version: Ip.MODE_ALL_NO_RES});

            [
                '240.1.2.3',
                '2001:db8::3210',
                '2001:db8:F53A::1',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This is not a valid IP address.');
            });
        });

        it('MODE_V4_PUB - valid', function () {
            const object = new Ip({version: Ip.MODE_V4_PUB});

            [
                '1.1.1.1',
                '8.8.8.8',
                '185.186.141.142',
                '172.217.18.174',
                '178.248.237.68',
                '5.255.255.80',
                '77.88.55.77',
                '255.255.255.255',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('MODE_V4_PUB - invalid', function () {
            const object = new Ip({version: Ip.MODE_V4_PUB});

            [
                '10.12.12.3',
                '10.11.33.42',
                '172.16.33.42',
                '172.16.1.176',
                '192.168.11.96',
                '192.168.33.42',
                '240.1.2.3',
                '2001:db8::3210',
                '2001:db8:F53A::1',
                '::ffff:192.168.1.1',
                '1200:0000:AB00:1234:0000:2552:7777:1313',
                '2001:cdba:0000:0000:0000:0000:3257:9652',
                '21DA:D3:0:2F3B:2AA:FF:FE28:9C5A',
                '2001:cdba:0:0:0:0:3257:9652',
                '::2001:cdba:3257:9652',
                'fd03:6951:5337:667c:77:15:55:48',
                'fc00::69',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This is not a valid IP address.');
            });
        });

        it('MODE_V6_PUB - valid', function () {
            const object = new Ip({version: Ip.MODE_V6_PUB});

            [
                '::ffff:192.168.1.1',
                '1200:0000:AB00:1234:0000:2552:7777:1313',
                '2001:cdba:0000:0000:0000:0000:3257:9652',
                '21DA:D3:0:2F3B:2AA:FF:FE28:9C5A',
                '2001:cdba:0:0:0:0:3257:9652',
                '::2001:cdba:3257:9652',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('MODE_V6_PUB - invalid', function () {
            const object = new Ip({version: Ip.MODE_V6_PUB});

            [
                '10.12.12.3',
                '10.11.33.42',
                '172.16.33.42',
                '172.16.1.176',
                '192.168.11.96',
                '192.168.33.42',
                '1.1.1.1',
                '8.8.8.8',
                '240.1.2.3',
                '185.186.141.142',
                '172.217.18.174',
                '178.248.237.68',
                '5.255.255.80',
                '77.88.55.77',
                '255.255.255.255',
                '2001:db8::3210',
                '2001:db8:F53A::1',
                'fd03:6951:5337:667c:77:15:55:48',
                'fc00::69',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This is not a valid IP address.');
            });
        });

        it('MODE_ALL_PUB - valid', function () {
            const object = new Ip({version: Ip.MODE_ALL_PUB});

            [
                '1.1.1.1',
                '8.8.8.8',
                '185.186.141.142',
                '172.217.18.174',
                '178.248.237.68',
                '5.255.255.80',
                '77.88.55.77',
                '255.255.255.255',
                '::ffff:192.168.1.1',
                '1200:0000:AB00:1234:0000:2552:7777:1313',
                '2001:cdba:0000:0000:0000:0000:3257:9652',
                '21DA:D3:0:2F3B:2AA:FF:FE28:9C5A',
                '2001:cdba:0:0:0:0:3257:9652',
                '::2001:cdba:3257:9652',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('MODE_ALL_PUB - invalid', function () {
            const object = new Ip({version: Ip.MODE_ALL_PUB});

            [
                '10.12.12.3',
                '10.11.33.42',
                '172.16.33.42',
                '172.16.1.176',
                '192.168.11.96',
                '192.168.33.42',
                '240.1.2.3',
                '2001:db8::3210',
                '2001:db8:F53A::1',
                'fd03:6951:5337:667c:77:15:55:48',
                'fc00::69',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This is not a valid IP address.');
            });
        });
    });

    describe('Symfony', function() {
        it('NULL - valid', function () {
            const object = new Ip({version: Ip.MODE_ALL});

            const e = object.validate(null);

            assert.ok(typeof e === 'undefined', e);
        });

        it('Empty - valid', function () {
            const object = new Ip({version: Ip.MODE_ALL});

            const e = object.validate('');

            assert.ok(typeof e === 'undefined', e);
        });

        it('Valid IPv4', function () {
            const object = new Ip({version: Ip.MODE_V4});

            [
                '0.0.0.0',
                '10.0.0.0',
                '123.45.67.178',
                '172.16.0.0',
                '192.168.1.0',
                '224.0.0.1',
                '255.255.255.255',
                '127.0.0.0',
                '\x200.0.0.0',
                '\x09\x0910.0.0.0',
                '123.45.67.178\x0A',
                '172.16.0.0\x0D\x0D',
                '\x00192.168.1.0\x00',
                '\x0B\x0B224.0.0.1\x0B\x0B',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('Valid IPv6', function () {
            const object = new Ip({version: Ip.MODE_V6});

            [
                '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
                '2001:0DB8:85A3:0000:0000:8A2E:0370:7334',
                '2001:0Db8:85a3:0000:0000:8A2e:0370:7334',
                'fdfe:dcba:9876:ffff:fdc6:c46b:bb8f:7d4c',
                'fdc6:c46b:bb8f:7d4c:fdc6:c46b:bb8f:7d4c',
                'fdc6:c46b:bb8f:7d4c:0000:8a2e:0370:7334',
                'fe80:0000:0000:0000:0202:b3ff:fe1e:8329',
                'fe80:0:0:0:202:b3ff:fe1e:8329',
                'fe80::202:b3ff:fe1e:8329',
                '0:0:0:0:0:0:0:0',
                '::',
                '0::',
                '::0',
                '0::0',
                '2001:0db8:85a3:0000:0000:8a2e:0.0.0.0',
                // next IPs are not valid
                // '::0.0.0.0',
                // '::255.255.255.255',
                // '::123.45.67.178',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('Invalid IPv4', function () {
            const object = new Ip({version: Ip.MODE_V4});

            [
                '0',
                '0.0',
                '0.0.0',
                '256.0.0.0',
                '0.256.0.0',
                '0.0.256.0',
                '0.0.0.256',
                '-1.0.0.0',
                'foobar',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This is not a valid IP address.');
            });
        });
    });
});
