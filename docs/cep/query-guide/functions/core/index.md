---
title: Core
---

Macrometa core functions are described in the table below.

| Function | Description |
|----------|-------------|
| and	     | Returns the results of AND operation for all the events.|
| avg	     | Calculates the average for all the events.|
| cast	     | Converts the first parameter according to the cast.to parameter.|
| coalesce	     | Returns the value of the first input parameter that is not null, and all input parameters have to be on the same type.|
| convert	     | Converts the first input parameter according to the `convertedTo` parameter.|
| count	     | Returns the count of all the events.|
| createSet	     | Includes the given input parameter in a java.util.HashSet and returns the set.|
| currentTimeMillis	     | Returns the current timestamp of stream processor application in milliseconds.|
| default	     | Checks if the `attribute` parameter is null and if so returns the value of the `default` parameter.|
| distinctCount	     | This returns the count of distinct occurrences for a given arg.|
| eventTimestamp	     | Returns the timestamp of the processed event.|
| frequency	     | Counts the number of occurrences of different values of a given attribute.|
| ifThenElse	     | Evaluates the `condition` parameter and returns value of the `if.expression`.|
| instanceOfBoolean	     | Checks whether the parameter is an instance of Boolean or not.|
| instanceOfDouble	     | Checks whether the parameter is an instance of Double or not.|
| instanceOfFloat	     | Checks if the parameter is an instance of Float or not.|
| instanceOfInteger	     | Checks whether the parameter is an instance of Integer or not.|
| instanceOfLong	     | Checks whether the parameter is an instance of Long or not.|
| instanceOfString	     | Checks whether the parameter is an instance of String or not.|
| log	     | Logs the message on the given priority with or without the processed event.|
| max	     | Returns the maximum value for all the events.|
| maxForever	     | This is the attribute aggregator to store the maximum value for a given attribute.|
| maximum	     | Returns the maximum value of the input parameters.|
| min	     | Returns the minimum value for all the events.|
| minForever	     | This is the attribute aggregator to store the minimum value for a given attribute throughout the lifetime of the query regardless of any windows.|
| minimum	     | Returns the minimum value of the input parameters.|
| or	     | Returns the results of OR operation for all the events.|
| pol2Cart	(sizeOfSet - Stream)     | The pol2Cart function calculating the cartesian coordinates x & y for the given theta.|
| sizeOfSet	     | Returns the size of an object of type java.util.Set.|
| stdDev	     | Returns the calculated standard deviation for all the events.|
| sum	     | Returns the sum for all the events.|
| unionSet	     | Union multiple sets.|
| uuid	     | Generates a UUID (Universally Unique Identifier).|
