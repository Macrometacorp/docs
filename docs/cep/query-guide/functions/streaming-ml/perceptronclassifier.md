---
title: perceptronClassifier (Stream Processor)
---

This extension predicts using a linear binary classification Perceptron model.

## Syntax

    streamingml:perceptronClassifier(<STRING> model.name, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:perceptronClassifier(<STRING> model.name, <DOUBLE> model.bias, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:perceptronClassifier(<STRING> model.name, <DOUBLE> model.threshold, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:perceptronClassifier(<STRING> model.name, <DOUBLE> model.bias, <DOUBLE> model.threshold, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)

## Query Parameters

| Name            | Description     | Default Value | Possible Data Types   | Optional | Dynamic |
|------------|--------------------------------------------------------|---------------|-----------------------|----------|---------|
| model.name      | The name of the model to be used.               |               | STRING| No       | No      |
| model.bias      | The bias of the Perceptron algorithm.           | 0.0           | DOUBLE| Yes      | No      |
| model.threshold | The threshold that separates the two classes. The value specified must be between zero and one. | 0.5           | DOUBLE| Yes      | No      |
| model.feature   | The features of the model that need to be attributes of the stream.             |               | DOUBLE FLOAT INT LONG | No       | Yes     |

## Extra Return Attributes

| Name            | Description        | Possible Types |
|-----------------|------------------------------------|----------------|
| prediction      | The predicted value (`true/false`). | BOOL           |
| confidenceLevel | The probability of the prediction.  | DOUBLE         |

## Example 1

    CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double);

    insert all events into OutputStream
    from StreamA#streamingml:perceptronClassifier('model1',0.0,0.5, attribute_0, attribute_1, attribute_2, attribute_3);

This query uses a Perceptron model named `model1` with a `0.0` bias and
a `0.5` threshold learning rate to predict the label of the feature
vector represented by `attribute_0`, `attribute_1`, `attribute_2`, and
`attribute_3`. The predicted label (`true/false`) is emitted to the
`OutputStream` streamalong with the prediction confidence
level(probability) and the feature vector. As a result, the OutputStream
stream is defined as follows: (attribute_0 double, attribute_1 double,
attribute_2 double, attribute_3 double, prediction bool,
confidenceLevel double).

## Example 2

    CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double);

    insert all events into OutputStream
    from StreamA#streamingml:perceptronClassifier('model1',0.0, attribute_0, attribute_1, attribute_2, attribute_3);

This query uses a Perceptron model named `model1` with a `0.0` bias to
predict the label of the feature vector represented by `attribute_0`,
`attribute_1`, `attribute_2`, and `attribute_3`. The
prediction(`true/false`) is emitted to the `OutputStream`stream along
with the prediction confidence level(probability) and the feature. As a
result, the OutputStream stream is defined as follows: (attribute_0
double, attribute_1 double, attribute_2 double, attribute_3 double,
prediction bool, confidenceLevel double).

## Example 3

    CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double);

    insert all events into OutputStream
    from StreamA#streamingml:perceptronClassifier(`model1`, attribute_0, attribute_1, attribute_2);

This query uses a Perceptron model named `model1` with a default 0.0
bias to predict the label of the feature vector represented by
`attribute_0`, `attribute_1`, and `attribute_2`. The predicted
probability is emitted to the OutputStream stream along with the feature
vector. As a result, the OutputStream is defined as follows:
(attribute_0 double, attribute_1 double, attribute_2 double,
attribute_3 double, prediction bool, confidenceLevel double).
