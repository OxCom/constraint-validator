# Timezone
Validates that a value is a valid timezone identifier (e.g. Europe/Moscow). 
Timezone list can be found [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). For more details visit
[MomentJS Timezone Documentation](https://momentjs.com/timezone/docs/).

## Options

##### message
type: `string` default: `This value is not a valid timzone.`  
This message is shown if the underlying data is not a valid timezone identifier.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value
