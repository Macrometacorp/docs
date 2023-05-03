---
title: updatePerceptronClassifier (Stream Processor)
---

This extension builds or updates a linear binary classification Perceptron model, which is an algorithm used for supervised learning in binary classification tasks. The Perceptron model is a simple and efficient method for solving linearly separable problems, and it is particularly useful for cases where fast, online learning is required.

## Syntax

```sql
streamingml:updatePerceptronClassifier(<STRING> model.name, <BOOL|STRING> model.label, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
streamingml:updatePerceptronClassifier(<STRING> model.name, <BOOL|STRING> model.label, <DOUBLE> learning.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
```

## Query Parameters

| Name  | Description     | Default Value | Possible Data Types   | Optional | Dynamic |
|-------|-----------------|---------------|-----------------------|----------|---------|
| model.name  | The name of the model to be built/updated.  |        | STRING| No | No |
| model.label   | The attribute of the label or the class of the dataset. |               | BOOL STRING  | No       | Yes     |
| learning.rate | The learning rate of the Perceptron algorithm.  | 0.1   | DOUBLE| Yes      | No      |
| model.feature | Features of the model that need to be attributes of the stream. |               | DOUBLE FLOAT INT LONG | No       | Yes     |

## Extra Return Attributes

| Name          | Description  | Possible Types |
|---------------|----------------------------------------------|----------------|
| featureWeight | Weight of the `feature.name` of the model. | DOUBLE         |

## Example 1

```sql
CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 string);

INSERT ALL EVENTS INTO OutputStream
FROM StreamA#streamingml:updatePerceptronClassifier('model1', attribute_4, 0.01, attribute_0, attribute_1, attribute_2, attribute_3);
```

This query, named `Query1`, builds or updates a Perceptron model named `model1` with a `0.01` learning rate, using `attribute_0`, `attribute_1`, `attribute_2`, and `attribute_3` as features, and `attribute_4` as the label. Updated weights of the model are emitted to the OutputStream stream.

## Example 2

```sql
CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 string);

INSERT ALL EVENTS INTO OutputStream
FROM StreamA#streamingml:updatePerceptronClassifier('model1', attribute_4, attribute_0, attribute_1, attribute_2, attribute_3);
```

This query, named `Query2`, builds or updates a Perceptron model named `model1` with the default `0.1` learning rate, using `attribute_0`, `attribute_1`, `attribute_2`, and `attribute_3` as features, and `attribute_4` as the label. The updated weights of the model are appended to the OutputStream stream.

## Example 3

```sql
CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 string, attribute_5 bool);

INSERT ALL EVENTS INTO OutputStream
FROM StreamA#streamingml:updatePerceptronClassifier('model2', attribute_5, 0.02, attribute_0, attribute_1, attribute_2, attribute_3, attribute_4);
```

This query, named `Query3`, builds or updates a Perceptron model named `model2` with a `0.02` learning rate, using `attribute_0`, `attribute_1`, `attribute_2`, `attribute_3`, and `attribute_4` as features, and `attribute_5` as the label. The updated weights of the model are appended to the OutputStream stream.
