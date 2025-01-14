---
title: cmToin (Function)
---

This converts the input given in centimeters into inches.

## Syntax

    <DOUBLE> unitconversion:cmToin(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1 | The value that needs to be converted from centimeters into inches. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:cmToin(100) AS inches;
```

This query converts the centimeters value `100` into inches using the `unitconversion:cmToin()` function. The output is `39.37008`.

## Example 2

```sql
CREATE STREAM LengthInputStream (lengthInCm double);
CREATE STREAM LengthOutputStream (lengthInInches double);

@info(name = 'convertCmToInchesQuery')
INSERT INTO LengthOutputStream
SELECT unitconversion:cmToin(lengthInCm) AS lengthInInches
FROM LengthInputStream;
```

The `convertCmToInchesQuery` processes events from the `LengthInputStream`, which contains a length value in centimeters (`lengthInCm`). It uses the `unitconversion:cmToin(lengthInCm)` function to convert the centimeters value into inches. The query outputs the converted value as the `lengthInInches` attribute for each event to the `LengthOutputStream`.
