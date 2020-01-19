# CardScheme
This constraint ensures that a credit card number is valid for a given credit card company. It can be used to validate the number before trying to initiate a payment through a payment gateway.

## Options

##### message
type: `string` default: `Unsupported card type or invalid card number.`  
The message shown when the value does not pass the CardScheme check.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value

##### schemes
type: `string|array`  
This option is required and represents the name of the number scheme used to validate the credit card number, it can either be a string or an array. Valid values are:
- ```AMEX```
- ```CHINA_UNIONPAY```
- ```DINERS```
- ```DISCOVER```
- ```INSTAPAYMENT```
- ```JCB```
- ```LASER```
- ```MAESTRO```
- ```MASTERCARD```
- ```MIR```
- ```UATP```
- ```VISA```

##### trim
type: `boolean` default: `true` 
Trim provided value.  
