---
sidebar_position: 130
title: Machine Learning with Stream Workers
---

# Real-time Machine Learning with Macrometa Stream Workers

Macrometa's stream workers offer powerful real-time machine learning capabilities that can be applied to a wide range of use cases. This documentation provides examples with code blocks that showcase the machine learning process. The goal is to help you better understand the application of these functions in real-world scenarios.

For more technical information about Macrometa's machine learning functions, refer to [Streaming ML](query-guide/functions/streaming-ml/index.md).

## Importance of Real-time Machine Learning

Real-time machine learning is crucial for businesses that need to analyze and react to data as it is generated. By processing and learning from data in real-time, you can gain actionable insights faster, make better decisions, and improve the efficiency of your operations. Some of the benefits of real-time machine learning include:

- **Faster decision-making**: Real-time machine learning allows you to make data-driven decisions quickly, giving you a competitive advantage in fast-paced industries.
- **Enhanced customer experience**: By analyzing customer interactions and behavior in real-time, you can provide personalized experiences and recommendations, leading to higher customer satisfaction and loyalty.
- **Improved operational efficiency**: Real-time machine learning can help you identify inefficiencies, optimize resource allocation, and reduce costs.
- **Proactive anomaly detection**: Detecting anomalies in real-time enables you to address potential issues before they escalate, minimizing the impact on your business.

## Example 1: Bayesian Regression for Real-time Energy Consumption Prediction

```sql
CREATE STREAM TrainingStream (temperature double, time_of_day double, day_of_week double, recent_consumption double, energy_consumption double);
CREATE STREAM PredictionStream (temperature double, time_of_day double, day_of_week double, recent_consumption double);

CREATE SINK STREAM EnergyConsumptionPredictions (prediction double, confidence double, temperature double, time_of_day double, day_of_week double, recent_consumption double);
CREATE SINK STREAM ModelUpdateStatus (status string);

@info(name = 'trainEnergyModel')
INSERT INTO ModelUpdateStatus
SELECT *
FROM TrainingStream#streamingml:updateBayesianRegression('energyModel', energy_consumption, temperature, time_of_day, day_of_week, recent_consumption);

@info(name = 'predictEnergyConsumption')
INSERT INTO EnergyConsumptionPredictions
SELECT prediction, confidence, temperature, time_of_day, day_of_week, recent_consumption
FROM PredictionStream#streamingml:bayesianRegression('energyModel', temperature, time_of_day, day_of_week, recent_consumption);
```

In this example, two input streams are created: `TrainingStream` for model training and `PredictionStream` for making predictions. The `TrainingStream` contains temperature, time of day, day of the week, recent consumption patterns, and actual energy consumption, while the `PredictionStream` contains the same features but without actual energy consumption.

Two sink streams are defined: `EnergyConsumptionPredictions` to store the predicted energy consumption, prediction confidence, and the original features from the `PredictionStream`, and `ModelUpdateStatus` to store the status of model updates.

The `trainEnergyModel` query processes events from the `TrainingStream`, updating the Bayesian linear regression model 'energyModel' using the input features and the actual energy consumption. The status of the model updates is inserted into the `ModelUpdateStatus` sink stream.

The `predictEnergyConsumption` query processes events from the `PredictionStream`, using the trained 'energyModel' to predict energy consumption based on the input features. The predictions, along with their confidences and original features, are inserted into the `EnergyConsumptionPredictions` sink stream.

## Example 2: Bayesian Regression for Real-time Ad Performance Prediction

```sql
CREATE STREAM TrainingStream2 (ad_placement double, ad_format double, time_of_day double, user_demographics double, click_through_rate double);
CREATE STREAM PredictionStream2 (ad_placement double, ad_format double, time_of_day double, user_demographics double);

CREATE SINK STREAM AdPerformancePredictions (prediction double, confidence double, ad_placement double, ad_format double, time_of_day double, user_demographics double);
CREATE SINK STREAM ModelUpdateStatus2 (status string);

@info(name = 'trainAdPerformanceModel')
INSERT INTO ModelUpdateStatus2
SELECT *
FROM TrainingStream2#streamingml:updateBayesianRegression('adPerformanceModel', click_through_rate, ad_placement, ad_format, time_of_day, user_demographics);

@info(name = 'predictAdPerformance')
INSERT INTO AdPerformancePredictions
SELECT prediction, confidence, ad_placement, ad_format, time_of_day, user_demographics
FROM PredictionStream2#streamingml:bayesianRegression('adPerformanceModel', ad_placement, ad_format, time_of_day, user_demographics);
```

In this example, two input streams are created: `TrainingStream2` for model training and `PredictionStream2` for making predictions. The `TrainingStream2` contains ad placement, ad format, time of day, user demographics, and actual click-through rate, while the `PredictionStream2` contains the same features but without actual click-through rate.

Two sink streams are defined: `AdPerformancePredictions` to store the predicted click-through rates, prediction confidence, and the original features from the `PredictionStream2`, and `ModelUpdateStatus2` to store the status of model updates.

The `trainAdPerformanceModel` query processes events from the `TrainingStream2`, updating the Bayesian linear regression model 'adPerformanceModel' using the input features and the actual click-through rate. The status of the model updates is inserted into the `ModelUpdateStatus2` sink stream.

The `predictAdPerformance` query processes events from the `PredictionStream2`, using the trained 'adPerformanceModel' to predict click-through rates based on the input features. The predictions, along with their confidences and original features, are inserted into the `AdPerformancePredictions` sink stream.

## Example 3: Perceptron Classifier for Real-time Credit Card Fraud Detection

```sql
CREATE STREAM TransactionStream (transactionAmount double, transactionTimeOfDay double, distanceToLastTransaction double, isFraud bool);
CREATE STREAM PredictionStream (transactionAmount double, transactionTimeOfDay double, distanceToLastTransaction double);

CREATE SINK STREAM FraudPredictions (prediction bool, confidence double, transactionAmount double, transactionTimeOfDay double, distanceToLastTransaction double);
CREATE SINK STREAM ModelUpdateStatus (status string);

@info(name = 'trainFraudDetectionModel')
INSERT INTO ModelUpdateStatus
SELECT *
FROM TransactionStream#streamingml:updatePerceptronClassifier('fraudDetectionModel', isFraud, transactionAmount, transactionTimeOfDay, distanceToLastTransaction);

@info(name = 'predictFraud')
INSERT INTO FraudPredictions
SELECT prediction, confidence, transactionAmount, transactionTimeOfDay, distanceToLastTransaction
FROM PredictionStream#streamingml:perceptronClassifier('fraudDetectionModel', transactionAmount, transactionTimeOfDay, distanceToLastTransaction);
```

In this example, two input streams are created: `TransactionStream` for model training and `PredictionStream` for making predictions. The `TransactionStream` contains transaction amount, transaction time of day, distance to the last transaction, and a boolean indicating whether the transaction is fraudulent or not. The `PredictionStream` contains the same features but without the fraud information.

Two sink streams are defined: `FraudPredictions` to store the predicted fraud labels, prediction confidence, and the original features from the `PredictionStream`, and `ModelUpdateStatus` to store the status of model updates.

The `trainFraudDetectionModel` query processes events from the `TransactionStream`, updating the Perceptron model 'fraudDetectionModel' using the input features and the actual fraud labels. The status of the model updates is inserted into the `ModelUpdateStatus` sink stream.

The `predictFraud` query processes events from the `PredictionStream`, using the trained 'fraudDetectionModel' to predict whether a transaction is fraudulent based on the input features. The predictions, along with their confidences and original features, are inserted into the `FraudPredictions` sink stream.

## Example 4: Perceptron Classifier for Manufacturing Quality Control

```sql
CREATE STREAM SensorDataStream (temperature double, pressure double, vibration double, isDefective bool);
CREATE STREAM QualityCheckStream (temperature double, pressure double, vibration double);

CREATE SINK STREAM QualityControlPredictions (prediction bool, confidence double, temperature double, pressure double, vibration double);
CREATE SINK STREAM ModelUpdateStatus (status string);

@info(name = 'trainQualityControlModel')
INSERT INTO ModelUpdateStatus
SELECT *
FROM SensorDataStream#streamingml:updatePerceptronClassifier('qualityControlModel', isDefective, temperature, pressure, vibration);

@info(name = 'predictQualityControl')
INSERT INTO QualityControlPredictions
SELECT prediction, confidence, temperature, pressure, vibration
FROM QualityCheckStream#streamingml:perceptronClassifier('qualityControlModel', temperature, pressure, vibration);
```

In this example, two input streams are created: `SensorDataStream` for model training and `QualityCheckStream` for making predictions. The `SensorDataStream` contains temperature, pressure, vibration, and a boolean indicating whether a manufactured item is defective or not. The `QualityCheckStream` contains the same features but without the defect information.

Two sink streams are defined: `QualityControlPredictions` to store the predicted defect labels, prediction confidence, and the original features from the `QualityCheckStream`, and `ModelUpdateStatus` to store the status of model updates.

The `trainQualityControlModel` query processes events from the `SensorDataStream`, updating the Perceptron model 'qualityControlModel' using the input features and the actual defect labels. The status of the model updates is inserted into the `ModelUpdateStatus` sink stream.

The `predictQualityControl` query processes events from the `QualityCheckStream`, using the trained 'qualityControlModel' to predict whether a manufactured item is defective based on the input features. The predictions, along with their confidences and original features, are inserted into the `QualityControlPredictions` sink stream.

## Example 5: K-Means Incremental Clustering for Real-time Customer Segmentation

```sql
CREATE STREAM CustomerDataStream (age double, annualIncome double, spendingScore double);
CREATE SINK STREAM CustomerSegmentation (closestCentroidCoordinate1 double, closestCentroidCoordinate2 double, closestCentroidCoordinate3 double, age double, annualIncome double, spendingScore double);

@info(name = 'kMeansIncrementalCustomerSegmentation')
INSERT INTO CustomerSegmentation
SELECT closestCentroidCoordinate1, closestCentroidCoordinate2, closestCentroidCoordinate3, age, annualIncome, spendingScore
FROM CustomerDataStream#streamingml:kMeansIncremental(4, 0.05, age, annualIncome, spendingScore);
```

In this example, the input stream `CustomerDataStream` contains customer data, including age, annual income, and spending score. The K-Means Incremental clustering algorithm is used to segment customers into four clusters based on their age, annual income, and spending score. The decay rate is set to 0.05. The output stream `CustomerSegmentation` contains the coordinates of the closest centroid, as well as the original data points.

## Example 6: K-Means MiniBatch Clustering for Real-time Credit Risk Analysis

```sql
CREATE STREAM CreditDataStream (creditScore double, income double, loanAmount double);
CREATE SINK STREAM CreditRiskAnalysis (closestCentroidCoordinate1 double, closestCentroidCoordinate2 double, closestCentroidCoordinate3 double, creditScore double, income double, loanAmount double);

@info(name = 'kMeansMiniBatchCreditRiskAnalysis')
INSERT INTO CreditRiskAnalysis
SELECT closestCentroidCoordinate1, closestCentroidCoordinate2, closestCentroidCoordinate3, creditScore, income, loanAmount
FROM CreditDataStream#streamingml:kMeansMiniBatch(3, 0.1, 100, 50, creditScore, income, loanAmount);
```

In this example, the input stream `CreditDataStream` contains credit data, including credit score, income, and loan amount. The K-Means MiniBatch clustering algorithm is used to segment credit applicants into three risk groups based on their credit score, income, and loan amount. The decay rate is set to 0.1, maximum iterations to 100, and number of events to retrain to 50. The output stream `CreditRiskAnalysis` contains the coordinates of the closest centroid, as well as the original data points.
