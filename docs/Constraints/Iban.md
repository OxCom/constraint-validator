# Iban
This constraint is used to ensure that a bank account number has the proper format of an 
[International Bank Account Number (IBAN)](https://en.wikipedia.org/wiki/International_Bank_Account_Number). 
IBAN is an internationally agreed means of identifying bank accounts across national borders with a reduced risk of propagating transcription errors.

## Options

##### message
type: `string` default: `This is not a valid International Bank Account Number (IBAN).`  
The default message supplied when the value does not pass the IBAN check.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value

##### trim
type: `boolean` default: `true`  
Trim provided value.
