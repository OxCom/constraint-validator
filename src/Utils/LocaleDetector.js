import ucfirst from 'locutus/php/strings/ucfirst';

const DEFAULT_LOCALE = 'en-US';

function filterDuplicates(arr) {
    return arr.filter((el, index, self) => self.indexOf(el) === index);
}

function fixLowercaseProperties(arr) {
    return arr.map((el) => {
        if (!el || el.indexOf('-') === -1 || el.toLowerCase() !== el) {
            return el;
        }

        const splitEl = el.split('-');

        return `${splitEl[0]}-${splitEl[1].toUpperCase()}`;
    });
}

function getUserLocalesInternal(fallbackLocale) {
    let languageList = [];

    if (typeof window !== 'undefined') {
        if (window.navigator.languages) {
            languageList = languageList.concat(window.navigator.languages);
        }
        if (window.navigator.language) {
            languageList.push(window.navigator.language);
        }
        if (window.navigator.userLanguage) {
            languageList.push(window.navigator.userLanguage);
        }
        if (window.navigator.browserLanguage) {
            languageList.push(window.navigator.browserLanguage);
        }
        if (window.navigator.systemLanguage) {
            languageList.push(window.navigator.systemLanguage);
        }
    }

    languageList.push(fallbackLocale);

    return fixLowercaseProperties(filterDuplicates(languageList));
}

export default class LocaleDetector {
    /**
     * @param {String} [fallback]
     */
    constructor(fallback) {
        this.fallback = fallback ? fallback : DEFAULT_LOCALE;
    }

    getUserLocales() {
        return getUserLocalesInternal(this.fallback);
    }

    getUserLocale() {
        return this.getUserLocales()[0];
    }

    /**
     * @param {string} value
     * @return {string}
     */
    static canonicalize(value) {
        if (typeof value !== 'string' || value.length === 0 || '.' === value.charAt(0)) {
            return DEFAULT_LOCALE;
        }

        const p = /^([a-z]{2})[-_]([a-z]{2})(?:([a-z]{2})(?:[-_]([a-z]{2}))?)?(?:\..*)?$/i;
        const m = value.match(p);

        if (m === null) {
            return value;
        }

        let result = [
            m[1].toLowerCase(),
        ];

        if (typeof m[3] === 'undefined') {
            result.push(m[2].toUpperCase());
        } else {
            result.push(ucfirst(m[2].toLowerCase() + m[3].toLowerCase()));
        }

        if (typeof m[4] !== 'undefined') {
            result.push(m[4].toUpperCase());
        }

        return result.join('_');
    }

    static get DEFAULT_LOCALE() {
        return DEFAULT_LOCALE;
    }
}
