---
title: updateBayesianRegression (Stream Processor)
---

This function builds or updates a linear Bayesian regression model using an improved version of stochastic variational inference. Bayesian regression models allow you to quantify the uncertainty in the model's predictions, providing a more comprehensive understanding of the data.

## Syntax

```sql
streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <INT> model.samples, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <STRING> model.optimizer, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <DOUBLE> learning.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <INT> model.samples, <STRING> model.optimizer, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <INT> model.samples, <DOUBLE> learning.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <STRING> model.optimizer, <DOUBLE> learning.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <INT> model.samples, <STRING> model.optimizer, <DOUBLE> learning.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
```

## Query Parameters

| Name      | Description     | Default Value | Possible Data Types   | Optional | Dynamic |
|-----------|--------------|---------------|-----------------------|----------|---------|
| model.name   | The name of the model to be built.  |        | STRING| No       | No  |
| model.target    | The target attribute (dependant variable) of the input stream.  |         | INT DOUBLE LONG FLOAT | No       | Yes     |
| model.samples   | Number of samples used to construct the gradients.    | 1   | INT   | Yes      | No      |
| model.optimizer | The type of optimization used   | ADAM  | STRING| Yes      | No      |
| learning.rate   | The learning rate of the updater| 0.05  | DOUBLE| Yes      | No      |
| model.feature   | Features of the model that need to be attributes of the stream. |               | DOUBLE FLOAT INT LONG | No       | Yes     |

## Extra Return Attributes

| Name | Description        | Possible Types |
|------|--------------------|----------------|
| loss | Loss of the model. | DOUBLE         |

## Example 1

```sql
CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 double);

INSERT ALL EVENTS INTO OutputStream
FROM StreamA#streamingml:updateBayesianRegression('model1', attribute_4, attribute_0, attribute_1, attribute_2, attribute_3);
```

This query builds or updates a Bayesian Linear regression model named `model1` using `attribute_0`, `attribute_1`, `attribute_2`, and `attribute_3` as features, and `attribute_4` as the label. Updated weights of the model are emitted to the OutputStream stream.

## Example 2

```sql
CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 double);

INSERT ALL EVENTS INTO OutputStream
FROM StreamA#streamingml:updateBayesianRegression('model1', attribute_4, 2, 'NADAM', 0.01, attribute_0, attribute_1, attribute_2, attribute_3);
```

This query builds or updates a Bayesian Linear regression model named `model1` with a `0.01` learning rate using `attribute_0`, `attribute_1`, `attribute_2`, and `attribute_3` as features, and `attribute_4` as the label. This model draws two samples during Monte Carlo integration and uses the NADAM optimizer. Updated weights of the model are emitted to the OutputStream stream.

## Example 3

```sql
CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 double, attribute_5 double);

INSERT ALL EVENTS INTO OutputStream
FROM StreamA#streamingml:updateBayesianRegression('model1', attribute_5, 3, 'RMSPROP', 0.01, attribute_0, attribute_1, attribute_2, attribute_3, attribute_4);
```

This query builds or updates a Bayesian Linear regression model named `model1` with a `0.01` learning rate, using `attribute_0`, `attribute_1`, `attribute_2`, `attribute_3`, and `attribute_4` as features, and `attribute_5` as the label. The model uses the RMSPROP optimizer, draws three samples during Monte Carlo integration, and emits the updated weights of the model to the OutputStream stream.
