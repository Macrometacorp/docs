---
sidebar_position: 5
---

# Math

This extension provides useful mathematical functions such as power, round, random, cos, log, etc.

## Features

* **[percentile (AggregateFunction)](#percentile)**

    This functions returns the pth percentile value of a given argument.

* **[abs (Function)](#abs)**

    This function returns the absolute value of the given parameter. It
    wraps the `java.lang.Math.abs()` function.

* **[acos (Function)](#acos)**

    If `-1 <= p1 <= 1`, this function returns the arc-cosine (inverse
    cosine) value of p1.If the domain is invalid, it returns `NULL`. The
    value returned is in radian scale. This function wraps the
    `java.lang.Math.acos()` function.

* **[asin (Function)](#asin)**

    If `-1 <= p1 <= 1`, this function returns the arc-sin (inverse sine)
    value of `p1`. If the domain is invalid, it returns `NULL`. The value
    returned is in radian scale. This function wraps the
    `java.lang.Math.asin()` function.

* **[atan (Function)](#atan)**

    1. If a single `p1` is received, this function returns the
    arc-tangent (inverse tangent) value of `p1`.
    2. If `p1` is received along with an optional `p1`, it considers
    them as x and y coordinates and returns the arc-tangent (inverse
    tangent) value.
    The returned value is in radian scale. This function wraps the
    `java.lang.Math.atan()` function.

* **[bin (Function)](#bin)**

    This function returns a string representation of the p1 argument,
    that is of either `integer` or `long` data type, as an unsigned
    integer in base 2. It wraps the `java.lang.Integer.toBinaryString`
    and `java.lang.Long.toBinaryString` methods.

* **[cbrt (Function)](#cbrt)**

    This function returns the cube-root of `p1` which is in radians.
    It wraps the `java.lang.Math.cbrt()` function.

* **[ceil (Function)](#ceil)**

    This function returns the smallest double value, i.e., the closest
    to the negative infinity, that is greater than or equal to the `p1`
    argument, and is equal to a mathematical integer. It wraps the
    `java.lang.Math.ceil()` method.

* **[conv (Function)](#conv)**

    This function converts `a` from the `fromBase` base to the `toBase`
    base.

* **[copySign (Function)](#copysign)**

    This function returns a value of an input with the received
    `magnitude` and `sign` of another input. It wraps the
    `java.lang.Math.copySign()` function.

* **[cos (Function)](#cos)**

    This function returns the cosine of `p1` which is in radians. It
    wraps the `java.lang.Math.cos()` function.

* **[cosh (Function)](#cosh)**

    This function returns the hyperbolic cosine of `p1` which is in
    radians. It wraps the `java.lang.Math.cosh()` function.

* **[e (Function)](#e)**

    This function returns the `java.lang.Math.E` constant, which is the
    closest double value to e, where e is the base of the natural
    logarithms.

* **[exp (Function)](#exp)**

    This function returns the Euler's number `e` raised to the power of
    `p1`. It wraps the `java.lang.Math.exp()` function.

* **[floor (Function)](#floor)**

    This function wraps the `java.lang.Math.floor()` function and
    returns the largest value, i.e., closest to the positive infinity,
    that is less than or equal to `p1`, and is equal to a mathematical
    integer.

* **[getExponent (Function)](#getexponent)**

    This function returns the unbiased exponent that is used in the
    representation of `p1`. This function wraps the
    `java.lang.Math.getExponent()` function.

* **[hex (Function)](#hex)**

    This function wraps the
    `java.lang.Double.toHexString()` function. It returns a hexadecimal string representation of the input, `p1`.

* **[isInfinite (Function)](#isinfinite)**

    This function wraps the `java.lang.Float.isInfinite()` and
    `java.lang.Double.isInfinite()` and returns `true` if `p1` is
    infinitely large in magnitude and `false` if otherwise.

* **[isNan (Function)](#isnan)**

    This function wraps the `java.lang.Float.isNaN()` and
    `java.lang.Double.isNaN()` functions and returns `true` if `p1` is
    NaN (Not-a-Number), and returns `false` if otherwise.

* **[ln (Function)](#ln)**

    This function returns the natural logarithm (base e) of `p1`.

* **[log (Function)](#log)**

    This function returns the logarithm of the received `number` as per
    the given `base`.

* **[log10 (Function)](#log10)**

    This function returns the base 10 logarithm of `p1`.

* **[log2 (Function)](#log2)**

    This function returns the base 2 logarithm of `p1`.

* **[max (Function)](#max)**

    This function returns the greater value of `p1` and `p2`.

* **[min (Function)](#min)**

    This function returns the smaller value of `p1` and `p2`.

* **[oct (Function)](#oct)**

    This function converts the input parameter `p1` to octal.

* **[parseDouble (Function)](#parsedouble)**

    This function returns the double value of the string received.

* **[parseFloat (Function)](#parsefloat)**

    This function returns the float value of the received string.

* **[parseInt (Function)](#parseint)**

    This function returns the integer value of the received string.

* **[parseLong (Function)](#parselong)**

    This function returns the long value of the string received.

* **[pi (Function)](#pi)**

    This function returns the `java.lang.Math.PI` constant, which is the
    closest value to pi, i.e., the ratio of the circumference of a
    circle to its diameter.

* **[power (Function)](#power)**

    This function raises the given value to a given power.

* **[rand (Function)](#rand)**

    This returns a stream of pseudo-random numbers when a sequence of
    calls are sent to the `rand()`. Optionally, it is possible to define
    a seed, i.e., `rand(seed)` using which the pseudo-random numbers are
    generated. These functions internally use the `java.util.Random`
    class.

* **[round (Function)](#round)**

    This function returns the value of the input argument rounded off to
    the closest integer/long value.

* **[signum (Function)](#signum)**

    This returns +1, 0, or -1 for the given positive, zero and negative
    values respectively. This function wraps the
    `java.lang.Math.signum()` function.

* **[sin (Function)](#sin)**

    This returns the sine of the value given in radians. This function
    wraps the `java.lang.Math.sin()` function.

* **[sinh (Function)](#sinh)**

    This returns the hyperbolic sine of the value given in radians. This
    function wraps the `java.lang.Math.sinh()` function.

* **[sqrt (Function)](#sqrt)**

    This function returns the square-root of the given value. It wraps
    the `java.lang.Math.sqrt()`s function.

* **[tan (Function)](#tan)**

    This function returns the tan of the given value in radians. It
    wraps the `java.lang.Math.tan()` function.

* **[tanh (Function)](#tanh)**

    This function returns the hyperbolic tangent of the value given in
    radians. It wraps the `java.lang.Math.tanh()` function.

* **[toDegrees (Function)](#todegrees)**

    This function converts the value given in radians to degrees. It
    wraps the `java.lang.Math.toDegrees()` function.

* **[toRadians (Function)](#toradians)**

    This function converts the value given in degrees to radians. It
    wraps the `java.lang.Math.toRadians()` function.

## percentile

This functions returns the pth percentile value of a given argument.

Syntax

    <DOUBLE> math:percentile(<INT|LONG|FLOAT|DOUBLE> arg, <DOUBLE> p)

QUERY PARAMETERS

| Name | Description                                                                                                                  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value of the parameter whose percentile should be found.                                                                 |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| p    | Estimate of the percentile to be found (pth percentile) where p is any number greater than 0 or lesser than or equal to 100. |               | DOUBLE                | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (sensorId int, temperature double);
    from InValueStream
    select math:percentile(temperature, 97.0) as percentile
    insert into OutMediationStream;

This function returns the percentile value based on the argument given.
For example, `math:percentile(temperature, 97.0)` returns the 97th
percentile value of all the temperature events.

## abs

This function returns the absolute value of the given parameter. It
wraps the `java.lang.Math.abs()` function.

Syntax

    <DOUBLE> math:abs(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The parameter whose absolute value is found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:abs(inValue) as absValue
    from InValueStream
    insert into OutMediationStream;

Irrespective of whether the `inValue` in the input stream holds a
value of abs(3) or abs(-3),the function returns 3 since the absolute
value of both 3 and -3 is 3. The result directed to OutMediationStream
stream.

## acos

If `-1 <= p1 <= 1`, this function returns the arc-cosine (inverse
cosine) value of `p1`.If the domain is invalid, it returns `NULL`. The value
returned is in radian scale. This function wraps the
`java.lang.Math.acos()` function.

Syntax

    <DOUBLE> math:acos(<FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                  | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter whose arc-cosine (inverse cosine) value is found. |               | FLOAT DOUBLE        | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:acos(inValue) as acosValue    
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream is given, the function calculates
the arc-cosine value of it and returns the arc-cosine value to the
output stream, OutMediationStream. For example, `acos(0.5)` returns
`1.0471975511965979`.

## asin

If `-1 <= p1 <= 1`, this function returns the arc-sin (inverse sine)
value of `p1`. If the domain is invalid, it returns `NULL`. The value
returned is in radian scale. This function wraps the
`java.lang.Math.asin()` function.

Syntax

    <DOUBLE> math:asin(<FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                             | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter whose arc-sin (inverse sine) value is found. |               | FLOAT DOUBLE        | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:asin(inValue) as asinValue    
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream is given, the function calculates
the arc-sin value of it and returns the arc-sin value to the output
stream, OutMediationStream. For example, asin(0.5) returns
0.5235987755982989.

## atan

1. If a single `p1` is received, this function returns the arc-tangent
(inverse tangent) value of `p1`. 2. If `p1` is received along with an
optional `p1`, it considers them as x and y coordinates and returns the
arc-tangent (inverse tangent) value. The returned value is in radian
scale. This function wraps the `java.lang.Math.atan()` function.

Syntax

    <DOUBLE> math:atan(<INT|LONG|FLOAT|DOUBLE> p1)
    <DOUBLE> math:atan(<INT|LONG|FLOAT|DOUBLE> p1, <INT|LONG|FLOAT|DOUBLE> p2)

QUERY PARAMETERS

| Name | Description                                                                                                                                                                       | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose arc-tangent (inverse tangent) is found. If the optional second parameter is given this represents the x coordinate of the (x,y) coordinate pair. |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| p2   | This optional parameter represents the y coordinate of the (x,y) coordinate pair.                                                                                                 | 0D            | INT LONG FLOAT DOUBLE | Yes      | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue1 double, inValue2 double);
    select math:atan(inValue1, inValue2) as convertedValue
    from InValueStream
    insert into OutMediationStream;

If the `inValue1` in the input stream is given, the function
calculates the arc-tangent value of it and returns the arc-tangent value
to the output stream, OutMediationStream. If both the `inValue1` and
`inValue2` are given, then the function considers them to be `x` and `y`
coordinates respectively and returns the calculated arc-tangent value to
the output stream, OutMediationStream. For example, `atan(12d, 5d)`
returns `1.1760052070951352`.

## bin

This function returns a string representation of the p1 argument, that
is of either `integer` or `long` data type, as an unsigned integer
in base 2. It wraps the `java.lang.Integer.toBinaryString` and
`java.lang.Long.toBinaryString` methods.

Syntax

    <STRING> math:bin(<INT|LONG> p1)

QUERY PARAMETERS

| Name | Description                                                                                               | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value in either `integer` or `long`, that should be converted into an unsigned integer of base 2. |               | INT LONG            | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue long);
    select math:bin(inValue) as binValue
    from InValueStream    
    insert into OutMediationStream;

If the `inValue` in the input stream is given, the function converts
it into an unsigned integer in base 2 and directs the output to the
output stream, OutMediationStream. For example, bin(9) returns `1001`.

## cbrt

This function returns the cube-root of `p1` which is in radians. It
wraps the `java.lang.Math.cbrt()` function.

Syntax

    <DOUBLE> math:cbrt(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose cube-root should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:cbrt(inValue) as cbrtValue    
    from InValueStream
    insert into OutMediationStream;

If the `inValue` is given, the function calculates the cube-root value
for the same and directs the output to the output stream,
OutMediationStream. For example, cbrt(17d) returns 2.5712815906582356.

## ceil

This function returns the smallest double value, i.e., the closest to
the negative infinity, that is greater than or equal to the `p1`
argument, and is equal to a mathematical integer. It wraps the
`java.lang.Math.ceil()` method.

Syntax

    <DOUBLE> math:ceil(<FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                              | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter whose ceiling value is found. |               | FLOAT DOUBLE        | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:ceil(inValue) as ceilingValue    
    from InValueStream
    insert into OutMediationStream;

This function calculates the ceiling value of the given `inValue` and
directs the result to `OutMediationStream` output stream. For example,
ceil(423.187d) returns 424.0.

## conv

This function converts `a` from the `fromBase` base to the `toBase`
base.

Syntax

    <STRING> math:conv(<STRING> a, <INT> from.base, <INT> to.base)

QUERY PARAMETERS

| Name      | Description                                                                    | Default Value | Possible Data Types | Optional | Dynamic |
|-----------|--------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| a         | The value whose base should be changed. Input should be given as a `String`. |               | STRING              | No       | Yes     |
| from.base | The source base of the input parameter `a`.                                  |               | INT                 | No       | Yes     |
| to.base   | The target base that the input parameter `a` should be converted into.       |               | INT                 | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue string,fromBase int,toBase int);
    select math:conv(inValue,fromBase,toBase) as convertedValue
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream is given, and the base in which
it currently resides in and the base to which it should be converted to
is specified, the function converts it into a string in the target base
and directs it to the output stream, OutMediationStream. For example,
`conv("7f", 16, 10)` returns `"127"`.

## copySign

This function returns a value of an input with the received `magnitude`
and `sign` of another input. It wraps the `java.lang.Math.copySign()`
function.

Syntax

    <DOUBLE> math:copySign(<INT|LONG|FLOAT|DOUBLE> magnitude, <INT|LONG|FLOAT|DOUBLE> sign)

QUERY PARAMETERS

| Name      | Description                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|-----------|------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| magnitude | The magnitude of this parameter is used in the output attribute. |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| sign      | The sign of this parameter is used in the output attribute.      |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue1 double, inValue2 double);
    select math:copySign(inValue1,inValue2) as copysignValue    
    from InValueStream
    insert into OutMediationStream;

If two values are provided as `inValue1` and `inValue2`, the
function copies the magnitude and sign of the second argument into the
first one and directs the result to the output stream,
OutMediatonStream. For example, copySign(5.6d, -3.0d) returns -5.6.

## cos

This function returns the cosine of `p1` which is in radians. It wraps
the `java.lang.Math.cos()` function.

Syntax

    <DOUBLE> math:cos(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                                           | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose cosine value should be found.The input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:cos(inValue) as cosValue    
    from InValueStream
    insert into OutMediationStream;

If the `inValue` is given, the function calculates the cosine value
for the same and directs the output to the output stream,
OutMediationStream. For example, cos(6d) returns 0.9601702866503661.

## cosh

This function returns the hyperbolic cosine of `p1` which is in radians.
It wraps the `java.lang.Math.cosh()` function.

Syntax

    <DOUBLE> math:cosh(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                                                 | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose hyperbolic cosine should be found. The input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:cosh(inValue) as cosValue    
    from InValueStream
    insert into OutMediationStream;

If the `inValue` is given, the function calculates the hyperbolic
cosine value for the same and directs the output to the output stream,
OutMediationStream. For example, cosh (6d) returns 201.7156361224559.

## e

This function returns the `java.lang.Math.E` constant, which is the
closest double value to e, where e is the base of the natural
logarithms.

Syntax

    <DOUBLE> math:e()

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:e() as eValue
    from InValueStream    
    insert into OutMediationStream;

This function returns the constant, 2.7182818284590452354 which is the
closest double value to e and directs the output to
`OutMediationStream` output stream.

## exp

This function returns the Euler's number `e` raised to the power of
`p1`. It wraps the `java.lang.Math.exp()` function.

Syntax

    <DOUBLE> math:exp(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The power that the Euler's number e is raised to. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:exp(inValue) as expValue    
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the inputstream holds a value, this function
calculates the corresponding Euler's number `e` and directs it to the
output stream, OutMediationStream. For example, exp(10.23) returns
27722.51006805505.

## floor

This function wraps the `java.lang.Math.floor()` function and returns
the largest value, i.e., closest to the positive infinity, that is less
than or equal to `p1`, and is equal to a mathematical integer.

Syntax

    <DOUBLE> math:floor(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                   | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose floor value should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:floor(inValue) as floorValue    
    from InValueStream
    insert into OutMediationStream;

This function calculates the floor value of the given `inValue` input
and directs the output to the `OutMediationStream` output stream. For
example, (10.23) returns 10.0.

## getExponent

This function returns the unbiased exponent that is used in the
representation of `p1`. This function wraps the
`java.lang.Math.getExponent()` function.

Syntax

    <INT> math:getExponent(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                          | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of whose unbiased exponent representation should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:getExponent(inValue) as expValue    
    from InValueStream
    insert into OutMediationStream;

This function calculates the unbiased exponent of a given input,
`inValue` and directs the result to the `OutMediationStream` output
stream. For example, getExponent(60984.1) returns 15.

## hex

This function wraps the
`java.lang.Double.toHexString()` function. It returns a hexadecimal string representation of the input, `p1`.

Syntax

    <STRING> math:hex(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                         | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose hexadecimal value should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue int);
    select math:hex(inValue) as hexString    
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream is provided, the function
converts this into its corresponding hexadecimal format and directs the
output to the output stream, OutMediationStream. For example, hex(200)
returns `"c8"`.

## isInfinite

This function wraps the `java.lang.Float.isInfinite()` and
`java.lang.Double.isInfinite()` and returns `true` if `p1` is infinitely
large in magnitude and `false` if otherwise.

Syntax

    <BOOL> math:isInfinite(<FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | This is the value of the parameter that the function determines to be either infinite or finite. |               | FLOAT DOUBLE        | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue1 double,inValue2 int);
    select math:isInfinite(inValue1) as isInfinite    
    from InValueStream
    insert into OutMediationStream;

If the value given in the `inValue` in the input stream is of
infinitely large magnitude, the function returns the value, `true` and
directs the result to the output stream, `OutMediationStream`. For
example, isInfinite(`java.lang.Double.POSITIVE_INFINITY`) returns true.

## isNan

This function wraps the `java.lang.Float.isNaN()` and
`java.lang.Double.isNaN()` functions and returns `true` if `p1` is NaN
(Not-a-Number), and returns `false` if otherwise.

Syntax

    <BOOL> math:isNan(<FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                            | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter which the function determines to be either NaN or a number. |               | FLOAT DOUBLE        | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue1 double,inValue2 int);
    select math:isNan(inValue1) as isNaN    
    from InValueStream
    insert into OutMediationStream;

If the `inValue1` in the input stream has a value that is undefined,
then the function considers it as an `NaN` value and directs `True`
to the output stream, OutMediationStream. For example,
isNan(java.lang.Math.log(-12d)) returns true.

## ln

This function returns the natural logarithm (base e) of `p1`.

Syntax

    <DOUBLE> math:ln(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose natural logarithm (base e) should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:ln(inValue) as lnValue    
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream is given, the function calculates
its natural logarithm (base e) and directs the results to the output
stream, `OutMeditionStream`. For example, ln(11.453) returns
2.438251704415579.

## log

This function returns the logarithm of the received `number` as per the
given `base`.

Syntax

    <DOUBLE> math:log(<INT|LONG|FLOAT|DOUBLE> number, <INT|LONG|FLOAT|DOUBLE> base)

QUERY PARAMETERS

| Name   | Description                                              | Default Value | Possible Data Types   | Optional | Dynamic |
|--------|----------------------------------------------------------|---------------|-----------------------|----------|---------|
| number | The value of the parameter whose base should be changed. |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| base   | The base value of the ouput.                             |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (number double, base double);
    select math:log(number, base) as logValue    
    from InValueStream
    insert into OutMediationStream;

If the number and the base to which it has to be converted into is given
in the input stream, the function calculates the number to the base
specified and directs the result to the output stream,
OutMediationStream. For example, log(34, 2f) returns 5.08746284125034.

## log10

This function returns the base 10 logarithm of `p1`.

Syntax

    <DOUBLE> math:log10(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                         | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose base 10 logarithm should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:log10(inValue) as lnValue    
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream is given, the function calculates
the base 10 logarithm of the same and directs the result to the output
stream, OutMediatioStream. For example, log10(19.234) returns
1.2840696117100832.

## log2

This function returns the base 2 logarithm of `p1`.

Syntax

    <DOUBLE> math:log2(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose base 2 logarithm should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:log2(inValue) as lnValue    
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream is given, the function calculates
the base 2 logarithm of the same and returns the value to the output
stream, OutMediationStream. For example log2(91d) returns
6.507794640198696.

## max

This function returns the greater value of `p1` and `p2`.

Syntax

    <DOUBLE> math:max(<INT|LONG|FLOAT|DOUBLE> p1, <INT|LONG|FLOAT|DOUBLE> p2)

QUERY PARAMETERS

| Name | Description                                                                              | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | One of the input values to be compared in order to find the larger value of the two      |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| p2   | The input value to be compared with `p1` in order to find the larger value of the two. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue1 double,inValue2 int);
    select math:max(inValue1,inValue2) as maxValue    
    from InValueStream
    insert into OutMediationStream;

If two input values `inValue1`, and `inValue2` are given, the function
compares them and directs the larger value to the output stream,
OutMediationStream. For example, max(123.67d, 91) returns 123.67.

## min

This function returns the smaller value of `p1` and `p2`.

Syntax

    <DOUBLE> math:min(<INT|LONG|FLOAT|DOUBLE> p1, <INT|LONG|FLOAT|DOUBLE> p2)

QUERY PARAMETERS

| Name | Description                                                                            | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | One of the input values that are to be compared in order to find the smaller value.    |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| p2   | The input value that is to be compared with `p1` in order to find the smaller value. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue1 double,inValue2 int);
    select math:min(inValue1,inValue2) as minValue    
    from InValueStream
    insert into OutMediationStream;

If two input values, `inValue1` and `inValue2` are given, the
function compares them and directs the smaller value of the two to the
output stream, OutMediationStream. For example, min(123.67d, 91) returns
91.

## oct

This function converts the input parameter `p1` to octal.

Syntax

    <STRING> math:oct(<INT|LONG> p1)

QUERY PARAMETERS

| Name | Description                                                            | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter whose octal representation should be found. |               | INT LONG            | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue long);
    select math:oct(inValue) as octValue    
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream is given, this function
calculates the octal value corresponding to the same and directs it to
the output stream, OutMediationStream. For example, oct(99l) returns
\"143\".

## parseDouble

This function returns the double value of the string received.

Syntax

    <DOUBLE> math:parseDouble(<STRING> p1)

QUERY PARAMETERS

| Name | Description                                             | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that should be converted into a double value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue string);
    select math:parseDouble(inValue) as output    
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream holds a value, this function
converts it into the corresponding double value and directs it to the
output stream, OutMediationStream. For example, parseDouble(\"123\")
returns 123.0.

## parseFloat

This function returns the float value of the received string.

Syntax

    <FLOAT> math:parseFloat(<STRING> p1)

QUERY PARAMETERS

| Name | Description                                            | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that should be converted into a float value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue string);
    select math:parseFloat(inValue) as output    
    from InValueStream
    insert into OutMediationStream;

The function converts the input value given in `inValue`,into its
corresponding float value and directs the result into the output stream,
OutMediationStream. For example, parseFloat(\"123\") returns 123.0.

## parseInt

This function returns the integer value of the received string.

Syntax

    <INT> math:parseInt(<STRING> p1)

QUERY PARAMETERS

| Name | Description                                       | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that should be converted to an integer. |               | STRING              | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue string);
    select math:parseInt(inValue) as output    
    from InValueStream
    insert into OutMediationStream;

The function converts the `inValue` into its corresponding integer
value and directs the output to the output stream, OutMediationStream.
For example, parseInt("123") returns 123.

## parseLong

This function returns the long value of the string received.

Syntax

    <LONG> math:parseLong(<STRING> p1)

QUERY PARAMETERS

| Name | Description                                         | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that should be converted to a long value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue string);
    select math:parseLong(inValue) as output    
    from InValueStream
    insert into OutMediationStream;

The function converts the `inValue` to its corresponding long value
and directs the result to the output stream, OutMediationStream. For
example, parseLong("123") returns 123.

## pi

This function returns the `java.lang.Math.PI` constant, which is the
closest value to pi, i.e., the ratio of the circumference of a circle to
its diameter.

Syntax

    <DOUBLE> math:pi()

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:pi() as piValue    
    from InValueStream
    insert into OutMediationStream;

pi() always returns 3.141592653589793.

## power

This function raises the given value to a given power.

Syntax

    <DOUBLE> math:power(<INT|LONG|FLOAT|DOUBLE> value, <INT|LONG|FLOAT|DOUBLE> to.power)

QUERY PARAMETERS

| Name     | Description                                                                   | Default Value | Possible Data Types   | Optional | Dynamic |
|----------|-------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| value    | The value that should be raised to the power of `to.power` input parameter. |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| to.power | The power to which the `value` input parameter should be raised.            |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue1 double, inValue2 double);
    select math:power(inValue1,inValue2) as powerValue    
    from InValueStream
    insert into OutMediationStream;

This function raises the `inValue1` to the power of `inValue2` and
directs the output to the output stream, `OutMediationStream`. For
example, (5.6d, 3.0d) returns 175.61599999999996.

## rand

This returns a stream of pseudo-random numbers when a sequence of calls
are sent to the `rand()`. Optionally, it is possible to define a seed,
i.e., `rand(seed)` using which the pseudo-random numbers are generated.
These functions internally use the `java.util.Random` class.

Syntax

    <DOUBLE> math:rand()
    <DOUBLE> math:rand(<INT|LONG> seed)

QUERY PARAMETERS

| Name | Description                                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| seed | An optional seed value that will be used to generate the random number sequence. | defaultSeed   | INT LONG            | Yes      | Yes     |

EXAMPLE 1

    define stream InValueStream (symbol string, price long, volume long);
    select math:oct(inValue) as octValue    
    from InValueStream select symbol, math:rand() as randNumber
    insert into OutMediationStream;

In the example given above, a random double value between 0 and 1 will
be generated using math:rand().

## round

This function returns the value of the input argument rounded off to the
closest integer/long value.

Syntax

    <INT|LONG> math:round(<FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                             | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that should be rounded off to the closest integer/long value. |               | FLOAT DOUBLE        | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:round(inValue) as roundValue    
    from InValueStream
    insert into OutMediationStream;

The function rounds off `inValue1` to the closest int/long value and
directs the output to the output stream, `OutMediationStream`. For
example, round(3252.353) returns 3252.

## signum

This returns +1, 0, or -1 for the given positive, zero and negative
values respectively. This function wraps the `java.lang.Math.signum()`
function.

Syntax

    <INT> math:signum(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that should be checked to be positive, negative or zero. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:signum(inValue) as sign    
    from InValueStream
    insert into OutMediationStream;

The function evaluates the `inValue` given to be positive, negative or
zero and directs the result to the output stream,
`OutMediationStream`. For example, signum(-6.32d) returns -1.

## sin

This returns the sine of the value given in radians. This function wraps
the `java.lang.Math.sin()` function.

Syntax

    <DOUBLE> math:sin(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose sine value should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:sin(inValue) as sinValue    
    from InValueStream
    insert into OutMediationStream;

The function calculates the sine value of the given `inValue` and
directs the output to the output stream, `OutMediationStream`. For
example, sin(6d) returns -0.27941549819892586.

## sinh

This returns the hyperbolic sine of the value given in radians. This
function wraps the `java.lang.Math.sinh()` function.

Syntax

    <DOUBLE> math:sinh(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                                                 | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose hyperbolic sine value should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:sinh(inValue) as sinhValue    
    from InValueStream
    insert into OutMediationStream;

This function calculates the hyperbolic sine value of `inValue` and
directs the output to the output stream, `OutMediationStream`. For
example, sinh(6d) returns 201.71315737027922.

## sqrt

This function returns the square-root of the given value. It wraps the
`java.lang.Math.sqrt()`s function.

Syntax

    <DOUBLE> math:sqrt(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                         | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose square-root value should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:sqrt(inValue) as sqrtValue    
    from InValueStream
    insert into OutMediationStream;

The function calculates the square-root value of the `inValue` and
directs the output to the output stream, `OutMediationStream`. For
example, sqrt(4d) returns 2.

## tan

This function returns the tan of the given value in radians. It wraps
the `java.lang.Math.tan()` function.

Syntax

    <DOUBLE> math:tan(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose tan value should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:tan(inValue) as tanValue    
    from InValueStream
    insert into OutMediationStream;

This function calculates the tan value of the `inValue` given and
directs the output to the output stream, `OutMediationStream`. For
example, tan(6d) returns -0.29100619138474915.

## tanh

This function returns the hyperbolic tangent of the value given in
radians. It wraps the `java.lang.Math.tanh()` function.

Syntax

    <DOUBLE> math:tanh(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                                                    | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose hyperbolic tangent value should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:tanh(inValue) as tanhValue    
    from InValueStream
    insert into OutMediationStream;

If the `inVaue` in the input stream is given, this function calculates
the hyperbolic tangent value of the same and directs the output to
`OutMediationStream` stream. For example, tanh(6d) returns
0.9999877116507956.

## toDegrees

This function converts the value given in radians to degrees. It wraps
the `java.lang.Math.toDegrees()` function.

Syntax

    <DOUBLE> math:toDegrees(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The input value in radians that should be converted to degrees. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:toDegrees(inValue) as degreesValue    
    from InValueStream
    insert into OutMediationStream;

The function converts the `inValue` in the input stream from radians
to degrees and directs the output to `OutMediationStream` output
stream. For example, toDegrees(6d) returns 343.77467707849394.

## toRadians

This function converts the value given in degrees to radians. It wraps
the `java.lang.Math.toRadians()` function.

Syntax

    <DOUBLE> math:toRadians(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The input value in degrees that should be converted to radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:toRadians(inValue) as radiansValue    
    from InValueStream
    insert into OutMediationStream;

This function converts the input, from degrees to radians and directs
the result to `OutMediationStream` output stream. For example,
toRadians(6d) returns 0.10471975511965977.
