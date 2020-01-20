# Isbn
This constraint validates that an [International Standard Book Number (ISBN)](https://en.wikipedia.org/wiki/International_Standard_Book_Number) is either a valid ISBN-10 or a valid ISBN-13.

## Options

##### message
type: `string` default: `This value is neither a valid ISBN-10 nor a valid ISBN-13.`  
The message that will be shown if the ```mode``` option is null and the given value d
oes not pass any of the ISBN checks.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value

##### message_isbn10
type: `string` default: `This value is not a valid ISBN-10.`  
The message that will be shown if the ```mode``` option is ```isbn10``` and the given value does 
not pass the ISBN-10 check.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value

##### message_isbn13
type: `string` default: `This value is not a valid ISBN-13.`  
The message that will be shown if the ```mode``` option is ```isbn13``` and the given value does 
not pass the ISBN-10 check.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value


##### mode
type: `string|null` default: `null` 
The type of ISBN to validate against. Value ```null``` force to accept any kind of ISBN.

Available modes are:
- ```null```
- ```isbn10```
- ```isbn13```

##### trim
type: `boolean` default: `true`  
Trim provided value.  
