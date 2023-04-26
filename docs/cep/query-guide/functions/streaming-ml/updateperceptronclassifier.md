---
title: updatePerceptronClassifier (Stream Processor)
---

This extension builds/updates a linear binary classification Perceptron model.

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

    CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 string );

    insert all events into outputStream
    from StreamA#streamingml:updatePerceptronClassifier('model1', attribute_4, 0.01, attribute_0, attribute_1, attribute_2, attribute_3);

This query builds/updates a Perceptron model named `model1` with a
`0.01` learning rate using `attribute_0`, `attribute_1`, `attribute_2`,
and `attribute_3` as features, and `attribute_4` as the label. Updated
weights of the model are emitted to the OutputStream stream.

## Example 2

    CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double,attribute_3 double, attribute_4 string );

    insert all events into outputStream
    from StreamA#streamingml:updatePerceptronClassifier('model1', attribute_4, attribute_0, attribute_1, attribute_2, attribute_3);

This query builds/updates a Perceptron model named `model1` with a
default `0.1` learning rate using `attribute_0`, `attribute_1`,
`attribute_2`, and `attribute_3` as features, and `attribute_4` as the
label. The updated weights of the model are appended to the outputStream.
