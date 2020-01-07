# Ip
Validates that a value is a valid IP address. By default, this will validate the value as IPv4, 
but a number of different options exist to validate as IPv6 and many other combinations.

## Options

##### message
type: `string` default: `This is not a valid IP address.`  
This message is shown if the string is not a valid IP address.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value |

##### trim
type: `boolean` default: `true`  
Trim provided value.

##### version
type: `string` default: `4`
This determines exactly how the IP address is validated and can take one of a variety of different values:

###### All ranges:

| Version | Description |
|---|---|
| 4 | Validates for IPv4 addresses |
| 6 | Validates for IPv6 addresses |
| all | Validates all IP formats |

###### No private ranges:

| Version | Description |
|---|---|
| 4_no_priv | Validates for IPv4 but without private IP ranges |
| 6_no_priv | Validates for IPv6 but without private IP ranges |
| all_no_priv | Validates for all IP formats but without private IP ranges |

###### No reserved ranges:

| Version | Description |
|---|---|
| 4_no_res | VValidates for IPv4 but without reserved IP ranges |
| 6_no_res | Validates for IPv6 but without reserved IP ranges |
| all_no_res | Validates for all IP formats but without reserved IP ranges |

###### Only public ranges:

| Version | Description |
|---|---|
| 4_public | Validates for IPv4 but without private and reserved ranges |
| 6_public | Validates for IPv6 but without private and reserved ranges |
| all_public | Validates for all IP formats but without private and reserved ranges |
