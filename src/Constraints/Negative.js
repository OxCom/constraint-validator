import LessThan from './LessThan';

const MESSAGE_INVALID = 'This value should be negative.';

export default class Negative extends LessThan {
    /**
     * @param {{value: null, message_strict: string, strict: boolean, locale_string: string, locale_options: object}} options
     */
    constructor(options = {}) {
        options.strict = true;
        options.value  = 0;

        super(options);
    }

    /**
     * @return {{message: string, message_strict: string}}
     */
    getDefaultOptions() {
        return {
            ...super.getDefaultOptions(),
            ...{'message': MESSAGE_INVALID},
        };
    }
}
