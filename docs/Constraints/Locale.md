# Locale
Validates that a value is a valid locale.

The "value" for each locale is any of the [ICU format locale IDs](http://userguide.icu-project.org/locale). For example, 
the two letter [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code (e.g. fr), or the 
language code followed by an underscore (`_`) and the [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) 
alpha-2 country code (e.g. `fr_FR` for `French/France`).

The given locale values are _canonicalized_ before validating them to avoid issues with wrong 
uppercase/lowercase values and to remove unneeded elements (e.g. `FR-fr.utf8` will be validated 
as `fr_FR`).

## Options

##### message
type: `string` default: `This value is not a valid locale.`  
This message is shown if the string is not a valid locale.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value |

