---
title: ifThenElse (Function)
---

Evaluates the `condition` parameter and returns value of the `if.expression` parameter if the condition is true, or returns value of the `else.expression` parameter if the condition is false. Here both `if.expression` and `else.expression` should be of the same type.

Syntax

```js
    <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> ifThenElse(<BOOL> condition, <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> if.expression, <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> else.expression)
```

## Query Parameters

| Name            | Description                                                                               | Default Value | Possible Data Types                      | Optional | Dynamic |
|-----------------|-------------------------------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| condition       | This specifies the if then else condition value.                                          |               | BOOL                                     | No       | Yes     |
| if.expression   | This specifies the value to be returned if the value of the condition parameter is true.  |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |
| else.expression | This specifies the value to be returned if the value of the condition parameter is false. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

## Example 1

```js
    @info(name = 'query1')
    insert into outputStream
    select sensorValue, ifThenElse(sensorValue>35,'High','Low') as status
    from sensorEventStream;
```

This returns High if sensorValue = 50.

## Example 2

```js
    @info(name = 'query1')
    insert into outputStream
    select sensorValue, ifThenElse(voltage < 5, 0, 1) as status
    from sensorEventStream;
```
This returns 1 if voltage= 12.

## Example 3
```js
    @info(name = 'query1')
    insert into outputStream
    select userName, ifThenElse(password == 'admin', true, false) as passwordState
    from userEventStream;
```
This returns passwordState as true if password = admin.