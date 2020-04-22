import AbstractConstraint from './AbstractConstraint';
import {trim}             from '../Utils/functions';
import ord                from 'locutus/php/strings/ord';
import ctype_upper        from 'locutus/php/ctype/ctype_upper';
import str_split          from 'locutus/php/strings/str_split';
import list               from '../Resources/countries';

const MESSAGE_INVALID = 'This is not a valid International Bank Account Number (IBAN).';

const rules = {
    'AD': /^AD\d{2}\d{4}\d{4}[\dA-Z]{12}$/, // Andorra
    'AE': /^AE\d{2}\d{3}\d{16}$/, // United Arab Emirates
    'AL': /^AL\d{2}\d{8}[\dA-Z]{16}$/, // Albania
    'AO': /^AO\d{2}\d{21}$/, // Angola
    'AT': /^AT\d{2}\d{5}\d{11}$/, // Austria
    'AX': /^FI\d{2}\d{6}\d{7}\d{1}$/, // Aland Islands
    'AZ': /^AZ\d{2}[A-Z]{4}[\dA-Z]{20}$/, // Azerbaijan
    'BA': /^BA\d{2}\d{3}\d{3}\d{8}\d{2}$/, // Bosnia and Herzegovina
    'BE': /^BE\d{2}\d{3}\d{7}\d{2}$/, // Belgium
    'BF': /^BF\d{2}\d{23}$/, // Burkina Faso
    'BG': /^BG\d{2}[A-Z]{4}\d{4}\d{2}[\dA-Z]{8}$/, // Bulgaria
    'BH': /^BH\d{2}[A-Z]{4}[\dA-Z]{14}$/, // Bahrain
    'BI': /^BI\d{2}\d{12}$/, // Burundi
    'BJ': /^BJ\d{2}[A-Z]{1}\d{23}$/, // Benin
    'BY': /^BY\d{2}[\dA-Z]{4}\d{4}[\dA-Z]{16}$/, // Belarus - https://bank.codes/iban/structure/belarus/
    'BL': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Saint Barthelemy
    'BR': /^BR\d{2}\d{8}\d{5}\d{10}[A-Z][\dA-Z]$/, // Brazil
    'CG': /^CG\d{2}\d{23}$/, // Congo
    'CH': /^CH\d{2}\d{5}[\dA-Z]{12}$/, // Switzerland
    'CI': /^CI\d{2}[A-Z]{1}\d{23}$/, // Ivory Coast
    'CM': /^CM\d{2}\d{23}$/, // Cameron
    'CR': /^CR\d{2}0\d{3}\d{14}$/, // Costa Rica
    'CV': /^CV\d{2}\d{21}$/, // Cape Verde
    'CY': /^CY\d{2}\d{3}\d{5}[\dA-Z]{16}$/, // Cyprus
    'CZ': /^CZ\d{2}\d{20}$/, // Czech Republic
    'DE': /^DE\d{2}\d{8}\d{10}$/, // Germany
    'DO': /^DO\d{2}[\dA-Z]{4}\d{20}$/, // Dominican Republic
    'DK': /^DK\d{2}\d{4}\d{10}$/, // Denmark
    'DZ': /^DZ\d{2}\d{20}$/, // Algeria
    'EE': /^EE\d{2}\d{2}\d{2}\d{11}\d{1}$/, // Estonia
    'ES': /^ES\d{2}\d{4}\d{4}\d{1}\d{1}\d{10}$/, // Spain (also includes Canary Islands, Ceuta and Melilla)
    'FI': /^FI\d{2}\d{6}\d{7}\d{1}$/, // Finland
    'FO': /^FO\d{2}\d{4}\d{9}\d{1}$/, // Faroe Islands
    'FR': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // France
    'GF': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // French Guyana
    'GB': /^GB\d{2}[A-Z]{4}\d{6}\d{8}$/, // United Kingdom of Great Britain and Northern Ireland
    'GE': /^GE\d{2}[A-Z]{2}\d{16}$/, // Georgia
    'GI': /^GI\d{2}[A-Z]{4}[\dA-Z]{15}$/, // Gibraltar
    'GL': /^GL\d{2}\d{4}\d{9}\d{1}$/, // Greenland
    'GP': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Guadeloupe
    'GR': /^GR\d{2}\d{3}\d{4}[\dA-Z]{16}$/, // Greece
    'GT': /^GT\d{2}[\dA-Z]{4}[\dA-Z]{20}$/, // Guatemala
    'HR': /^HR\d{2}\d{7}\d{10}$/, // Croatia
    'HU': /^HU\d{2}\d{3}\d{4}\d{1}\d{15}\d{1}$/, // Hungary
    'IE': /^IE\d{2}[A-Z]{4}\d{6}\d{8}$/, // Ireland
    'IL': /^IL\d{2}\d{3}\d{3}\d{13}$/, // Israel
    'IR': /^IR\d{2}\d{22}$/, // Iran
    'IS': /^IS\d{2}\d{4}\d{2}\d{6}\d{10}$/, // Iceland
    'IT': /^IT\d{2}[A-Z]{1}\d{5}\d{5}[\dA-Z]{12}$/, // Italy
    'JO': /^JO\d{2}[A-Z]{4}\d{4}[\dA-Z]{18}$/, // Jordan
    'KW': /^KW\d{2}[A-Z]{4}\d{22}$/, // KUWAIT
    'KZ': /^KZ\d{2}\d{3}[\dA-Z]{13}$/, // Kazakhstan
    'LB': /^LB\d{2}\d{4}[\dA-Z]{20}$/, // LEBANON
    'LI': /^LI\d{2}\d{5}[\dA-Z]{12}$/, // Liechtenstein (Principality of)
    'LT': /^LT\d{2}\d{5}\d{11}$/, // Lithuania
    'LU': /^LU\d{2}\d{3}[\dA-Z]{13}$/, // Luxembourg
    'LV': /^LV\d{2}[A-Z]{4}[\dA-Z]{13}$/, // Latvia
    'MC': /^MC\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Monaco
    'MD': /^MD\d{2}[\dA-Z]{2}[\dA-Z]{18}$/, // Moldova
    'ME': /^ME\d{2}\d{3}\d{13}\d{2}$/, // Montenegro
    'MF': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Saint Martin (French part)
    'MG': /^MG\d{2}\d{23}$/, // Madagascar
    'MK': /^MK\d{2}\d{3}[\dA-Z]{10}\d{2}$/, // Macedonia, Former Yugoslav Republic of
    'ML': /^ML\d{2}[A-Z]{1}\d{23}$/, // Mali
    'MQ': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Martinique
    'MR': /^MR13\d{5}\d{5}\d{11}\d{2}$/, // Mauritania
    'MT': /^MT\d{2}[A-Z]{4}\d{5}[\dA-Z]{18}$/, // Malta
    'MU': /^MU\d{2}[A-Z]{4}\d{2}\d{2}\d{12}\d{3}[A-Z]{3}$/, // Mauritius
    'MZ': /^MZ\d{2}\d{21}$/, // Mozambique
    'NC': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // New Caledonia
    'NL': /^NL\d{2}[A-Z]{4}\d{10}$/, // The Netherlands
    'NO': /^NO\d{2}\d{4}\d{6}\d{1}$/, // Norway
    'PF': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // French Polynesia
    'PK': /^PK\d{2}[A-Z]{4}[\dA-Z]{16}$/, // Pakistan
    'PL': /^PL\d{2}\d{8}\d{16}$/, // Poland
    'PM': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Saint Pierre et Miquelon
    'PS': /^PS\d{2}[A-Z]{4}[\dA-Z]{21}$/, // Palestine, State of
    'PT': /^PT\d{2}\d{4}\d{4}\d{11}\d{2}$/, // Portugal (plus Azores and Madeira)
    'QA': /^QA\d{2}[A-Z]{4}[\dA-Z]{21}$/, // Qatar
    'RE': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Reunion
    'RO': /^RO\d{2}[A-Z]{4}[\dA-Z]{16}$/, // Romania
    'RS': /^RS\d{2}\d{3}\d{13}\d{2}$/, // Serbia
    'SA': /^SA\d{2}\d{2}[\dA-Z]{18}$/, // Saudi Arabia
    'SE': /^SE\d{2}\d{3}\d{16}\d{1}$/, // Sweden
    'SI': /^SI\d{2}\d{5}\d{8}\d{2}$/, // Slovenia
    'SK': /^SK\d{2}\d{4}\d{6}\d{10}$/, // Slovak Republic
    'SM': /^SM\d{2}[A-Z]{1}\d{5}\d{5}[\dA-Z]{12}$/, // San Marino
    'SN': /^SN\d{2}[A-Z]{1}\d{23}$/, // Senegal
    'TF': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // French Southern Territories
    'TL': /^TL\d{2}\d{3}\d{14}\d{2}$/, // Timor-Leste
    'TN': /^TN59\d{2}\d{3}\d{13}\d{2}$/, // Tunisia
    'TR': /^TR\d{2}\d{5}[\dA-Z]{1}[\dA-Z]{16}$/, // Turkey
    'UA': /^UA\d{2}\d{6}[\dA-Z]{19}$/, // Ukraine
    'VA': /^VA\d{2}\d{3}\d{15}$/, // Vatican City State
    'VG': /^VG\d{2}[A-Z]{4}\d{16}$/, // Virgin Islands, British
    'WF': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Wallis and Futuna Islands
    'XK': /^XK\d{2}\d{4}\d{10}\d{2}$/, // Republic of Kosovo
    'YT': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Mayotte
};

/**
 * @param {string} value
 *
 * @return {boolean}
 */
function isValidAlpha2(value) {
    const result = list.find(({a2}) => a2.toUpperCase() === value.toUpperCase());

    return result !== undefined;
}

/**
 * @param {string} value
 * @return {string}
 */
function toBigInt(value) {
    let bigInt = '';

    value
        .split('')
        .forEach((char) => {
            if (ctype_upper(char)) {
                bigInt += ord(char) - 55;
            } else {
                bigInt += char;
            }
        });

    return bigInt;
}

/**
 * @param {string} value
 * @return {number}
 */
function bigModulo97(value) {
    let rest = 0;

    str_split(value, 7)
        .forEach((part) => {
            rest = parseInt((rest + '') + (part + '')) % 97;
        });

    return rest;
}

export default class Iban extends AbstractConstraint {
    /**
     * @param {{message: string}} [options]
     */
    constructor(options = {}) {
        super(options);
    }

    /**
     * @return {{message: string}}
     */
    getDefaultOptions() {
        return {
            'trim': true,
            'message': MESSAGE_INVALID,
        };
    }

    /**
     * Test provided value and return Error if occurs
     *
     * @param value
     *
     * @return {Error|undefined}
     */
    validate(value) {
        if (this.options.trim) {
            value = trim(value);
        }

        if (this.isEmptyValue(value)) {
            return;
        }

        if (typeof value !== 'string') {
            value += '';
        }

        const canonical = value.replace(/ /g, '', value.toUpperCase());
        const country   = canonical.substring(0, 2);

        if (!/^[A-Z0-9]+$/.test(canonical)
            || !isValidAlpha2(country)
            || typeof rules[country] === 'undefined'
            || !rules[country].test(canonical)
        ) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }

        const rotated  = canonical.substring(4) + canonical.substring(0, 4);
        const checkSub = toBigInt(rotated);

        if (1 !== bigModulo97(checkSub)) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }
    }
}
