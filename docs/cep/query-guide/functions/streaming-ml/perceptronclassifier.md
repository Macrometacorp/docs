---
title: perceptronClassifier (Stream Processor)
---

This extension predicts using a linear binary classification Perceptron model.

## Syntax

```sql
streamingml:perceptronClassifier(<STRING> model.name, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
streamingml:perceptronClassifier(<STRING> model.name, <DOUBLE> model.bias, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
streamingml:perceptronClassifier(<STRING> model.name, <DOUBLE> model.threshold, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
streamingml:perceptronClassifier(<STRING> model.name, <DOUBLE> model.bias, <DOUBLE> model.threshold, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
```

## Query Parameters

| Name   | Description     | Default Value | Possible Data Types   | Optional | Dynamic |
|--------|------------------|---------------|-----------------------|----------|---------|
| model.name   | The name of the model to be used.    |        | STRING| No   | No  |
| model.bias| The bias of the Perceptron algorithm.   | 0.0    | DOUBLE| Yes  | No |
| model.threshold | The threshold that separates the two classes. The value specified must be between zero and one. | 0.5   | DOUBLE| Yes      | No      |
| model.feature   | The features of the model that need to be attributes of the stream.   |    | DOUBLE FLOAT INT LONG | No       | Yes     |

## Extra Return Attributes

| Name            | Description        | Possible Types |
|-----------------|------------------------------------|----------------|
| prediction      | The predicted value (`true/false`). | BOOL           |
| confidenceLevel | The probability of the prediction.  | DOUBLE         |

## Example 1

```sql
CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double);
CREATE SINK STREAM OutputStreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, prediction bool, confidenceLevel double);

@info(name = 'perceptronClassifierQuery1')
INSERT ALL EVENTS INTO OutputStreamA
SELECT attribute_0, attribute_1, attribute_2, attribute_3, prediction, confidenceLevel
FROM StreamA#streamingml:perceptronClassifier('model1', 0.0, 0.5, attribute_0, attribute_1, attribute_2, attribute_3);
```

This query uses a Perceptron model named `model1` with a `0.0` bias and a `0.5` threshold to predict the label of the feature vector represented by `attribute_0`, `attribute_1`, `attribute_2`, and `attribute_3`. The predicted label (`true/false`) and the prediction confidence level (probability) are emitted to the `OutputStreamA` stream along with the feature vector.

## Example 2

```sql
CREATE STREAM StreamB (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double);
CREATE SINK STREAM OutputStreamB (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, prediction bool, confidenceLevel double);

@info(name = 'perceptronClassifierQuery2')
INSERT ALL EVENTS INTO OutputStreamB
SELECT attribute_0, attribute_1, attribute_2, attribute_3, prediction, confidenceLevel
FROM StreamB#streamingml:perceptronClassifier('model1', 0.0, attribute_0, attribute_1, attribute_2, attribute_3);
```

This query uses a Perceptron model named `model1` with a `0.0` bias and the default threshold to predict the label of the feature vector represented by `attribute_0`, `attribute_1`, `attribute_2`, and `attribute_3`. The predicted label (`true/false`) and the prediction confidence level (probability) are emitted to the `OutputStreamB` stream along with the feature vector.

## Example 3

```sql
CREATE STREAM StreamC (attribute_0 double, attribute_1 double, attribute_2 double);
CREATE SINK STREAM OutputStreamC (attribute_0 double, attribute_1 double, attribute_2 double, prediction bool, confidenceLevel double);

@info(name = 'perceptronClassifierQuery3')
INSERT ALL EVENTS INTO OutputStreamC
SELECT attribute_0, attribute_1, attribute_2, prediction, confidenceLevel
FROM StreamC#streamingml:perceptronClassifier('model1', attribute_0, attribute_1, attribute_2);
```

This query uses a Perceptron model named `model1` with default bias and threshold to predict the label of the feature vector represented by `attribute_0`, `attribute_1`, and `attribute_2`. The predicted label (`true/false`) and the prediction confidence level (probability) are emitted to the `OutputStreamC` stream along with the feature vector.

## Example 4

```sql
CREATE STREAM StreamD (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 double);
CREATE SINK STREAM OutputStreamD (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 double, prediction bool, confidenceLevel double);

@info(name = 'perceptronClassifierQuery4')
INSERT ALL EVENTS INTO OutputStreamD
SELECT attribute_0, attribute_1, attribute_2, attribute_3, attribute_4, prediction, confidenceLevel
FROM StreamD#streamingml:perceptronClassifier('model1', 0.1, 0.4, attribute_0, attribute_1, attribute_2, attribute_3, attribute_4);
```

This query uses a Perceptron model named `model1` with a `0.1` bias and a `0.4` threshold to predict the label of the feature vector represented by `attribute_0`, `attribute_1`, `attribute_2`, `attribute_3`, and `attribute_4`. The predicted label (`true/false`) and the prediction confidence level (probability) are emitted to the `OutputStreamD` stream along with the feature vector.
