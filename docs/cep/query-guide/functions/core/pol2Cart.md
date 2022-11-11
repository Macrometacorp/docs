---
title: sizeOfSet (Stream Function)
---

The pol2Cart function calculating the cartesian coordinates x & y for the given theta, rho coordinates and adding them as new attributes to the existing events.

Syntax

    pol2Cart(<DOUBLE> theta, <DOUBLE> rho)
    pol2Cart(<DOUBLE> theta, <DOUBLE> rho, <DOUBLE> z)

## Query Parameters

| Name  | Description                           | Default Value                                                    | Possible Data Types | Optional | Dynamic |
|-------|---------------------------------------|------------------------------------------------------------------|---------------------|----------|---------|
| theta | The theta value of the coordinates.   |                                                                  | DOUBLE              | No       | Yes     |
| rho   | The rho value of the coordinates.     |                                                                  | DOUBLE              | No       | Yes     |
| z     | z value of the cartesian coordinates. | If z value is not given, drop the third parameter of the output. | DOUBLE              | Yes      | Yes     |

## Example 1

    insert into outputStream
    select x, y
    from PolarStream#pol2Cart(theta, rho);

This returns cartesian coordinates (4.99953024681082, 0.06853693328228748) for theta: 0.7854 and rho: 5.

## Example 2

    insert into outputStream
    select x, y, z
    from PolarStream#pol2Cart(theta, rho, 3.4);

This returns cartesian coordinates (4.99953024681082, 0.06853693328228748, 3.4)for theta: 0.7854 and rho: 5 and z: 3.4.