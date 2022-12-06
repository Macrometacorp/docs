# Sentiment
This extension performs sentiment analysis using AFINN Wordlist-based approach. AFINN is a list of words rated for valence with an integer between minus five (negative) and plus five (positive).
It contains more than 3,300 words with a polarity score associated with each word.

## Features

* **[getRate (Function)](#getRate)**

    This provides the sentiment value for a given string as per the AFINN word list.
    
 
   
## getRate

This provides the sentiment value for a given string as per the AFINN word list. The sentiment value ranges from -5 to +5.

## Syntax

    <INT> sentiment:getRate(<String> text)

QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| text 	              | The input text for which the sentiment value should be derived.                                                            |               | STRING       | No       | No     |


EXAMPLE 1

    sentiment:getRate("George is a good person")

This returns the sentiment value for the given input string by referring to the AFINN word list. In this scenario, the output is 3.

EXAMPLE 2

    sentiment:getRate("bad taste")

In this scenario, the output is -3.
