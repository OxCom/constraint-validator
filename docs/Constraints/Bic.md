# Bic
This constraint is used to ensure that a value has the proper format of a 
[Business Identifier Code (BIC)](https://en.wikipedia.org/wiki/Business_Identifier_Code). 
BIC is an internationally agreed means to uniquely identify both financial and 
non-financial institutions. You may also check that the BIC is associated with a given IBAN.

## Options

##### iban_path
type: `string` default: null  
It defines the object property whose value stores the IBAN used to check the BIC with.

For example, if you want to compare the ```bic``` property of some object with regard to 
the ```iban``` property of the same object, use ```{iban_path: 'bic'}``` in the comparison constraint of ```bic```.

##### message
type: `string` default: `This is not a valid Business Identifier Code (BIC).`  
The default message supplied when the value does not pass the BIC check.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value

##### message_iban
type: `string` default: `This Business Identifier Code (BIC) is not associated with IBAN {{ iban }}.`  
The default message supplied when the value does not pass the combined BIC/IBAN check.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value
| {{ iban }} | The current IBAN value

##### trim
type: `boolean` default: `true`  
Trim provided value.  
