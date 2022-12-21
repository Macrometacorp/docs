---
title: getRate
---

This provides the sentiment value for a given string as per the AFINN word list.

## Syntax

    <INT> sentiment:getRate(<String> text)

## Query Parameters

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|---------------------------------------------|---------------|---------------------|----------|---------|
| text 	   | The input text for which the sentiment value should be derived.   |          | STRING       | No       | No     |

## Example 1

    sentiment:getRate("George is a good person")

This returns the sentiment value for the given input string by referring to the AFINN word list. In this scenario, the output is 3.
