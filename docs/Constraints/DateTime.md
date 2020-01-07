# DateTime
Validates that a value is a valid "DateTime", meaning a string follows a specific format.

## Options

##### format
type: `string` default: `yyyy-MM-dd` Current validation format.  
This option allows to validate a custom date format. See [documentation](https://moment.github.io/luxon/docs/manual/parsing.html) for formatting options.

##### message
type: `string` default: `This value is not a valid datetime.`  
This message is shown if the underlying data is not a valid datetime.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value
| {{ format }} | The current validation format
