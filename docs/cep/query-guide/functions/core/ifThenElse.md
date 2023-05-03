---
title: ifThenElse (Function)
---

Evaluates the `condition` parameter and returns value of the `if.expression` parameter if the condition is true, or returns value of the `else.expression` parameter if the condition is false. Here both `if.expression` and `else.expression` should be of the same type.

## Syntax

```sql
<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> ifThenElse(<BOOL> condition, <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> if.expression, <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> else.expression)
```

## Query Parameters

| Name            | Description     | Default Value | Possible Data Types           | Optional | Dynamic |
|------------|----------------------|---------------|------------------------------|----------|---------|
| condition    | This specifies the if then else condition value.   |            | BOOL      | No       | Yes     |
| if.expression   | This specifies the value to be returned if the value of the condition parameter is true.  |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |
| else.expression | This specifies the value to be returned if the value of the condition parameter is false. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

## Example 1

```sql
@info(name = 'query1')
INSERT INTO outputStream
SELECT sensorValue, ifThenElse(sensorValue > 35, 'High', 'Low') AS status
FROM sensorEventStream;
```

This query, named 'query1', selects records from the `sensorEventStream` collection and calculates a new field called `status`. The `ifThenElse` function is used to determine the value of `status` based on the `sensorValue`: if the `sensorValue` is greater than 35, the `status` will be 'High', otherwise it will be 'Low'. The resulting data, including the `sensorValue` and the calculated `status`, is then inserted into the `outputStream`.

Essentially, this query processes records in the `sensorEventStream` and creates new records in the `outputStream` with the `sensorValue` and `status` fields, where `status` is determined based on the `sensorValue`.

## Example 2

```sql
@info(name = 'query1')
INSERT INTO outputStream
SELECT sensorValue, ifThenElse(voltage < 5, 0, 1) AS status
FROM sensorEventStream;
```

This query, named 'query1', selects records from the `sensorEventStream` and calculates a new field called `status`. The `ifThenElse` function is used to determine the value of `status` based on the `voltage`: if the `voltage` is less than 5, then the status will be 0, otherwise it will be 1. The resulting data, including the `sensorValue` and the calculated `status`, is then inserted into the `outputStream`.

Essentially, this query processes records in the `sensorEventStream` and creates new records in the `outputStream` with the `sensorValue` and `status` fields, where `status` is determined based on the voltage.

## Example 3

```sql
@info(name = 'query1')
INSERT INTO outputStream
SELECT userName, ifThenElse(password == 'admin', TRUE, FALSE) AS passwordState
FROM userEventStream;
```

This query, named 'query1', selects records from the `userEventStream` and calculates a new field called `passwordState`. The `ifThenElse` function is used to determine the value of `passwordState` based on the `password`: if the `password` is equal to 'admin', then the `passwordState` will be TRUE, otherwise it will be FALSE. The resulting data, including the `userName` and the calculated `passwordState`, is then inserted into the `outputStream`.

Essentially, this query processes records in the `userEventStream` and creates new records in the `outputStream` with the `userName` and `passwordState` fields, where `passwordState` is determined based on the password.
