---
title: pol2Cart (Stream Function)
---

The pol2Cart function calculating the cartesian coordinates x and y for the given theta, rho coordinates and adding them as new attributes to the existing events.

## Syntax

```sql
pol2Cart(<DOUBLE> theta, <DOUBLE> rho)
pol2Cart(<DOUBLE> theta, <DOUBLE> rho, <DOUBLE> z)
```

## Query Parameters

| Name  | Description            | Default Value    | Possible Data Types | Optional | Dynamic |
|-------|------------------------|------------------|---------------------|----------|---------|
| theta | The theta value of the coordinates.   |        | DOUBLE              | No       | Yes     |
| rho   | The rho value of the coordinates.     |        | DOUBLE              | No       | Yes     |
| z     | z value of the cartesian coordinates. | If z value is not given, drop the third parameter of the output. | DOUBLE              | Yes      | Yes     |

## Example 1

```sql
@info(name = 'query1')
INSERT INTO outputStream
SELECT x, y
FROM PolarStream#pol2Cart(theta, rho);
```

This query, named 'query1', processes records from the `PolarStream` and converts the polar coordinates (theta, rho) into cartesian coordinates (x, y) using the `pol2Cart(theta, rho)` function. For each record in the `PolarStream`, the function calculates the corresponding cartesian coordinates and then inserts them into the `outputStream`.

In the given example, when theta is 0.7854 and rho is 5, the query returns cartesian coordinates (4.99953024681082, 0.06853693328228748).

Essentially, this query processes records in the `PolarStream`, converts polar coordinates to cartesian coordinates, and creates new records in the `outputStream` with the calculated `x` and `y` values.

## Example 2

```sql
@info(name = 'query1')
INSERT INTO outputStream
SELECT x, y, z
FROM PolarStream#pol2Cart(theta, rho, 3.4);
```

This query, named 'query1', processes records from the `PolarStream` and converts the polar coordinates (theta, rho) into cartesian coordinates (x, y) using the `pol2Cart(theta, rho, 3.4)` function. For each record in the `PolarStream`, the function calculates the corresponding cartesian coordinates (x, y) and assigns the given z value, 3.4, as the third coordinate. The resulting cartesian coordinates (x, y, z) are then inserted into the `outputStream`.

In the given example, when theta is 0.7854, rho is 5, and z is 3.4, the query returns cartesian coordinates (4.99953024681082, 0.06853693328228748, 3.4).

Essentially, this query processes records in the `PolarStream`, converts polar coordinates to cartesian coordinates with a fixed z value, and creates new records in the `outputStream` with the calculated `x`, `y`, and given `z` values.
