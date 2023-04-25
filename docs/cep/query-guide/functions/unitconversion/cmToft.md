---
title: cmToft (Function)
---

This converts the input given in centimeters into feet.

## Syntax

```sql
<DOUBLE> unitconversion:cmToft(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into feet. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:cmToft(100) AS feet;
```

This query converts the centimeters value `100` into feet using the `unitconversion:cmToft()` function. The output is `3.28084`.

## Example 2

```sql
CREATE STREAM LengthInputStream (lengthInCm double);
CREATE STREAM LengthOutputStream (lengthInFt double);

@info(name = 'convertCmToFtQuery')
INSERT INTO LengthOutputStream
SELECT unitconversion:cmToft(lengthInCm) AS lengthInFt
FROM LengthInputStream;
```

The `convertCmToFtQuery` processes events from the `LengthInputStream`, which contains a length value in centimeters (`lengthInCm`). It uses the `unitconversion:cmToft(lengthInCm)` function to convert the centimeters value into feet. The query outputs the converted value as the `lengthInFt` attribute for each event to the `LengthOutputStream`.
