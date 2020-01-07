import LocaleDetector from '../../src/Utils/LocaleDetector';

const assert = require('assert');

describe('LocaleDetector', function() {
    describe('#constructor()', function() {
        it('empty constructor', function() {
            new LocaleDetector();
        });

        describe('Static properties', function() {
            it('Expose constant "TYPE_ARRAY"', function () {
                assert.strictEqual('en-US', LocaleDetector.DEFAULT_LOCALE);
            });
        });
    });

    describe('#canonicalize()', function() {
        it('Default locale', function() {
            assert.strictEqual(LocaleDetector.canonicalize(''), LocaleDetector.DEFAULT_LOCALE);
            assert.strictEqual(LocaleDetector.canonicalize('.'), LocaleDetector.DEFAULT_LOCALE);
            assert.strictEqual(LocaleDetector.canonicalize('.utf8'), LocaleDetector.DEFAULT_LOCALE);
            assert.strictEqual(LocaleDetector.canonicalize(undefined), LocaleDetector.DEFAULT_LOCALE);
            assert.strictEqual(LocaleDetector.canonicalize(null), LocaleDetector.DEFAULT_LOCALE);
            assert.strictEqual(LocaleDetector.canonicalize(false), LocaleDetector.DEFAULT_LOCALE);
        });

        it('Locale: en => en', function() {
            assert.strictEqual(LocaleDetector.canonicalize('en'), 'en');
        });

        it('Locale: FR-fr => fr_FR', function() {
            assert.strictEqual(LocaleDetector.canonicalize('FR-fr'), 'fr_FR');
        });

        it('Locale: FR-fr.utf8 => fr_FR', function() {
            assert.strictEqual(LocaleDetector.canonicalize('FR-fr.utf8'), 'fr_FR');
        });

        it('Locale: UZ-lATN => uz_Latn', function() {
            assert.strictEqual(LocaleDetector.canonicalize('UZ-lATN'), 'uz_Latn');
        });

        it('Locale: UZ-cYRL-uz => uz_Cyrl_UZ', function() {
            assert.strictEqual(LocaleDetector.canonicalize('UZ-cYRL-uz'), 'uz_Cyrl_UZ');
        });

        it('Locale: rus => rus', function() {
            assert.strictEqual(LocaleDetector.canonicalize('UZ-cYRL-uz'), 'uz_Cyrl_UZ');
        });
    });
});
