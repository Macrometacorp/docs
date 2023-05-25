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

```sql
CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double);
CREATE STREAM PredictionStream (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double);

CREATE SINK STREAM OutputStream (prediction double, confidence double, attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double);

@info(name = 'predictAttributes')
INSERT INTO OutputStream
SELECT prediction, confidence, attribute_0, attribute_1, attribute_2, attribute_3
FROM PredictionStream#streamingml:bayesianRegression('model1', attribute_0, attribute_1, attribute_2, attribute_3);
```

This query uses a Bayesian regression model named `model1` to predict the label of the feature vector represented by `attribute_0`, `attribute_1`, `attribute_2`, and `attribute_3`. The `StreamA` contains the input features, and the `PredictionStream` is created with the same features.

A sink stream, `OutputStream`, is defined to store the predicted values, prediction confidence (std of predictive distribution), and the original features from the `PredictionStream`.

The `predictAttributes` query processes events from the `PredictionStream`, using the Bayesian regression model 'model1' to make predictions based on the input features. The predicted values, along with their confidences and original features, are inserted into the `OutputStream` sink stream. As a result, the OutputStream stream is defined as follows: (prediction double, confidence double, attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double).

## Example 2

```sql
CREATE STREAM HouseDataStream (square_feet double, num_bedrooms double, num_bathrooms double, age double, price double);
CREATE STREAM HousePredictionStream (square_feet double, num_bedrooms double, num_bathrooms double, age double);

CREATE SINK STREAM HousePricePredictions (prediction double, confidence double, square_feet double, num_bedrooms double, num_bathrooms double, age double);

@info(name = 'trainHousePriceModel')
INSERT INTO OutputStream2
SELECT *
FROM HouseDataStream#streamingml:updateBayesianRegression('housePriceModel', price, square_feet, num_bedrooms, num_bathrooms, age);

@info(name = 'predictHousePrices')
INSERT INTO HousePricePredictions
SELECT prediction, confidence, square_feet, num_bedrooms, num_bathrooms, age
FROM HousePredictionStream#streamingml:bayesianRegression('housePriceModel', square_feet, num_bedrooms, num_bathrooms, age);
```

In this example, two input streams are created: `HouseDataStream` for model training and `HousePredictionStream` for making predictions. The `HouseDataStream` contains the square footage, number of bedrooms, number of bathrooms, age of the house, and the actual price. The `HousePredictionStream` contains the same features but without the actual price.

A sink stream, `HousePricePredictions`, is defined to store the predicted house prices, prediction confidence, and the original features from the `HousePredictionStream`.

The `trainHousePriceModel` query processes events from the `HouseDataStream`, and builds or updates the Bayesian linear regression model 'housePriceModel' using the input features and the actual house prices.

The `predictHousePrices` query processes events from the `HousePredictionStream`, using the trained 'housePriceModel' to predict house prices based on the input features. The predictions, along with their confidences and original features, are inserted into the `HousePricePredictions` sink stream.
