---
title: updateBayesianRegression (Stream Processor)
---

This extension builds/updates a linear Bayesian regression model. This
extension uses an improved version of stochastic variational inference.

## Syntax

    streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <INT> model.samples, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <STRING> model.optimizer, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <DOUBLE> learning.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <INT> model.samples, <STRING> model.optimizer, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <INT> model.samples, <DOUBLE> learning.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <STRING> model.optimizer, <DOUBLE> learning.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <INT> model.samples, <STRING> model.optimizer, <DOUBLE> learning.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)

## Query Parameters

| Name            | Description     | Default Value | Possible Data Types   | Optional | Dynamic |
|-----------------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| model.name      | The name of the model to be built.              |               | STRING| No       | No      |
| model.target    | The target attribute (dependant variable) of the input stream.  |               | INT DOUBLE LONG FLOAT | No       | Yes     |
| model.samples   | Number of samples used to construct the gradients.              | 1             | INT   | Yes      | No      |
| model.optimizer | The type of optimization used   | ADAM          | STRING| Yes      | No      |
| learning.rate   | The learning rate of the updater| 0.05          | DOUBLE| Yes      | No      |
| model.feature   | Features of the model that need to be attributes of the stream. |               | DOUBLE FLOAT INT LONG | No       | Yes     |

## Extra Return Attributes

| Name | Description        | Possible Types |
|------|--------------------|----------------|
| loss | Loss of the model. | DOUBLE         |

## Example 1

    CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 double );

    insert all events into outputStream
    from StreamA#streamingml:updateBayesianRegression('model1', attribute_4, attribute_0, attribute_1, attribute_2, attribute_3);

This query builds/updates a Bayesian Linear regression model named
`model1` using `attribute_0`, `attribute_1`, `attribute_2`, and
`attribute_3` as features, and `attribute_4` as the label. Updated
weights of the model are emitted to the OutputStream stream.

## Example 2

    CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 double );

    insert all events into outputStream
    from StreamA#streamingml:updateBayesianRegression('model1', attribute_4, 2, 'NADAM', 0.01, attribute_0, attribute_1, attribute_2, attribute_3);

This query builds/updates a Bayesian Linear regression model named
`model1` with a `0.01` learning rate using `attribute_0`, `attribute_1`,
`attribute_2`, and `attribute_3` as features, and `attribute_4` as the
label. Updated weights of the model are emitted to the OutputStream
stream. This model draws two samples during monte-carlo integration and
uses NADAM optimizer.
