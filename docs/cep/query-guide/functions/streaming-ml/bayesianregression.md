---
title: bayesianRegression (Stream Processor)
---

This function predicts using a Bayesian linear regression
model. Bayesian linear regression allows determining the uncertainty of
each prediction by estimating the full-predictive distribution

## Syntax

```sql
streamingml:bayesianRegression(<STRING> model.name, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
streamingml:bayesianRegression(<STRING> model.name, <INT> prediction.samples, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
```

## Query Parameters

| Name | Description   | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------|---------------|-----------------------|----------|---------|
| model.name    | The name of the model to be used.   |               | STRING| No       | No      |
| prediction.samples | The number of samples to be drawn to estimate the prediction.    | 1000          | INT   | Yes    | No      |
| model.feature  | The features of the model that need to be attributes of the stream. |               | DOUBLE FLOAT INT LONG | No       | Yes     |

## Extra Return Attributes

| Name       | Description      | Possible Types |
|------------|------------------|----------------|
| prediction | The predicted value (double).     | DOUBLE         |
| confidence | Inverse of the standard deviation of the predictive distribution. | DOUBLE         |

## Example 1

    CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double);

    from StreamA#streamingml:bayesianRegression('model1', attribute_0, attribute_1, attribute_2, attribute_3)
    insert all events into OutputStream;

This query uses a Bayesian regression model named `model1` to predict
the label of the feature vector represented by `attribute_0`,
`attribute_1`, `attribute_2`, and `attribute_3`. The predicted value is
emitted to the `OutputStream` streamalong with the prediction confidence
(std of predictive distribution) and the feature vector. As a result,
the OutputStream stream is defined as follows: (attribute_0 double,
attribute_1 double, attribute_2 double, attribute_3 double,
prediction double, confidence double).
