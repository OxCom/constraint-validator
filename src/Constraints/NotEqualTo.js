import AbstractCompareConstraint from './AbstractCompareConstraint';
import {isDateObject}            from '../Utils/functions';

const MESSAGE_NEQ = 'This value should not be equal to {{ compared_value }}.';

export default class NotEqualTo extends AbstractCompareConstraint {
    /**
     * @return {{message: string, message_strict: string}}
     */
    getDefaultOptions() {
        return {
            ...super.getDefaultOptions(),
            ...{'message': MESSAGE_NEQ},
        };
    }

    /**
     * @param value1
     * @param value2
     *
     * @return {boolean}
     */
    compare(value1, value2) {
        if (isDateObject(value1) && isDateObject(value2)) {
            return value1.getTime() !== value2.getTime();
        }

        return value1 != value2;
    }
}
