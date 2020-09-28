import AbstractCompareConstraint from './Constraints/AbstractCompareConstraint';
import AbstractConstraint        from './Constraints/AbstractConstraint';
import All                       from './Constraints/All';
import Length                    from './Constraints/Length';
import Email                     from './Constraints/Email';
import Blank                     from './Constraints/Blank';
import Country                   from './Constraints/Country';
import Currency                  from './Constraints/Currency';
import NotBlank                  from './Constraints/NotBlank';
import Url                       from './Constraints/Url';
import IsFalse                   from './Constraints/IsFalse';
import IsTrue                    from './Constraints/IsTrue';
import Json                      from './Constraints/Json';
import EqualTo                   from './Constraints/EqualTo';
import NotEqualTo                from './Constraints/NotEqualTo';
import GreaterThan               from './Constraints/GreaterThan';
import GreaterThanOrEqual        from './Constraints/GreaterThanOrEqual';
import LessThan                  from './Constraints/LessThan';
import LessThanOrEqual           from './Constraints/LessThanOrEqual';
import Negative                  from './Constraints/Negative';
import NegativeOrZero            from './Constraints/NegativeOrZero';
import Positive                  from './Constraints/Positive';
import PositiveOrZero            from './Constraints/PositiveOrZero';
import IsNull                    from './Constraints/IsNull';
import NotNull                   from './Constraints/NotNull';
import Type                      from './Constraints/Type';
import Collection                from './Constraints/Collection';
import Choice                    from './Constraints/Choice';
import Count                     from './Constraints/Count';
import DateTime                  from './Constraints/DateTime';
import Timezone                  from './Constraints/Timezone';
import DivisibleBy               from './Constraints/DivisibleBy';
import Ip                        from './Constraints/Ip';
import Language                  from './Constraints/Language';
import Callback                  from './Constraints/Callback';
import Regex                     from './Constraints/Regex';
import Range                     from './Constraints/Range';
import Locale                    from './Constraints/Locale';
import Isbn                      from './Constraints/Isbn';
import Issn                      from './Constraints/Issn';
import Luhn                      from './Constraints/Luhn';
import CardScheme                from './Constraints/CardScheme';
import Iban                      from './Constraints/Iban';
import Bic                       from './Constraints/Bic';
import Validator                 from './Validator/Validator';
import Form                      from './Validator/Form';

const ConstraintValidator = {
    AbstractCompareConstraint: AbstractCompareConstraint,
    AbstractConstraint: AbstractConstraint,
    All: All,
    Length: Length,
    Email: Email,
    Blank: Blank,
    NotBlank: NotBlank,
    Country: Country,
    Currency: Currency,
    Url: Url,
    IsFalse: IsFalse,
    IsTrue: IsTrue,
    IsNull: IsNull,
    NotNull: NotNull,
    Json: Json,
    EqualTo: EqualTo,
    NotEqualTo: NotEqualTo,
    GreaterThan: GreaterThan,
    GreaterThanOrEqual: GreaterThanOrEqual,
    LessThan: LessThan,
    LessThanOrEqual: LessThanOrEqual,
    Negative: Negative,
    NegativeOrZero: NegativeOrZero,
    Positive: Positive,
    PositiveOrZero: PositiveOrZero,
    Type: Type,
    Choice: Choice,
    Collection: Collection,
    Count: Count,
    DateTime: DateTime,
    Timezone: Timezone,
    DivisibleBy: DivisibleBy,
    Ip: Ip,
    Language: Language,
    Regex: Regex,
    Range: Range,
    Locale: Locale,
    Isbn: Isbn,
    Issn: Issn,
    Luhn: Luhn,
    CardScheme: CardScheme,
    Iban: Iban,
    Bic: Bic,
    Callback: Callback,
    Validator: Validator,
    Form: Form,
};

export default ConstraintValidator;
