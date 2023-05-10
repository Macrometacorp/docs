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

## Example 1: Perceptron Classifier for Real-time Credit Card Fraud Detection

```sql
CREATE STREAM TransactionStream (transactionAmount double, transactionTimeOfDay double, distanceToLastTransaction double, isFraud bool);
CREATE STREAM PredictionStream (transactionAmount double, transactionTimeOfDay double, distanceToLastTransaction double);

CREATE SINK STREAM FraudPredictions (prediction bool, confidenceLevel double, transactionAmount double, transactionTimeOfDay double, distanceToLastTransaction double);
CREATE SINK STREAM ModelUpdateStatus (transactionAmount double, transactionTimeOfDay double, distanceToLastTransaction double, isFraud bool);

@info(name = 'trainFraudDetectionModel')
INSERT INTO ModelUpdateStatus
SELECT transactionAmount, transactionTimeOfDay, distanceToLastTransaction, isFraud
FROM TransactionStream#streamingml:updatePerceptronClassifier('fraudDetectionModel', isFraud, transactionAmount, transactionTimeOfDay, distanceToLastTransaction);

@info(name = 'predictFraud')
INSERT INTO FraudPredictions
SELECT prediction, confidenceLevel, transactionAmount, transactionTimeOfDay, distanceToLastTransaction
FROM PredictionStream#streamingml:perceptronClassifier('fraudDetectionModel', transactionAmount, transactionTimeOfDay, distanceToLastTransaction);
```



## Example 2: Perceptron Classifier for Manufacturing Quality Control

```sql
CREATE STREAM SensorDataStream (temperature double, pressure double, vibration double, isDefective bool);
CREATE STREAM QualityCheckStream (temperature double, pressure double, vibration double);

CREATE SINK STREAM QualityControlPredictions (prediction bool, temperature double, pressure double, vibration double);
CREATE SINK STREAM ModelUpdateStatus (status string);

@info(name = 'trainQualityControlModel')
INSERT INTO ModelUpdateStatus
SELECT 'Model updated' as status
FROM SensorDataStream#streamingml:updatePerceptronClassifier('qualityControlModel', isDefective, temperature, pressure, vibration);

@info(name = 'predictQualityControl')
INSERT INTO QualityControlPredictions
SELECT prediction, temperature, pressure, vibration
FROM QualityCheckStream#streamingml:perceptronClassifier('qualityControlModel', temperature, pressure, vibration);
```

In this example, two input streams are created: `SensorDataStream` for model training and `QualityCheckStream` for making predictions. The `SensorDataStream` contains temperature, pressure, vibration, and a boolean indicating whether a manufactured item is defective or not. The `QualityCheckStream` contains the same features but without the defect information.

Two sink streams are defined: `QualityControlPredictions` to store the predicted defect labels and the original features from the `QualityCheckStream`, and `ModelUpdateStatus` to store the status of model updates.

The `trainQualityControlModel` query processes events from the `SensorDataStream`, updating the Perceptron model 'qualityControlModel' using the input features and the actual defect labels. The status of the model updates is inserted into the `ModelUpdateStatus` sink stream.

The `predictQualityControl` query processes events from the `QualityCheckStream`, using the trained 'qualityControlModel' to predict whether a manufactured item is defective based on the input features. The predictions, along with the original features, are inserted into the `QualityControlPredictions` sink stream.

## Example 3: K-Means Incremental Clustering for Real-time Customer Segmentation

```sql
CREATE STREAM CustomerDataStream (age double, annualIncome double, spendingScore double);
CREATE SINK STREAM CustomerSegmentation (closestCentroidCoordinate1 double, closestCentroidCoordinate2 double, closestCentroidCoordinate3 double, age double, annualIncome double, spendingScore double);

@info(name = 'kMeansIncrementalCustomerSegmentation')
INSERT INTO CustomerSegmentation
SELECT closestCentroidCoordinate1, closestCentroidCoordinate2, closestCentroidCoordinate3, age, annualIncome, spendingScore
FROM CustomerDataStream#streamingml:kMeansIncremental(4, 0.05, age, annualIncome, spendingScore);
```

In this example, the input stream `CustomerDataStream` contains customer data, including age, annual income, and spending score. The K-Means Incremental clustering algorithm is used to segment customers into four clusters based on their age, annual income, and spending score. The decay rate is set to 0.05. The output stream `CustomerSegmentation` contains the coordinates of the closest centroid, as well as the original data points.

## Example 4: K-Means MiniBatch Clustering for Real-time Credit Risk Analysis

```sql
CREATE STREAM CreditDataStream (creditScore double, income double, loanAmount double);
CREATE SINK STREAM CreditRiskAnalysis (closestCentroidCoordinate1 double, closestCentroidCoordinate2 double, closestCentroidCoordinate3 double, creditScore double, income double, loanAmount double);

@info(name = 'kMeansMiniBatchCreditRiskAnalysis')
INSERT INTO CreditRiskAnalysis
SELECT closestCentroidCoordinate1, closestCentroidCoordinate2, closestCentroidCoordinate3, creditScore, income, loanAmount
FROM CreditDataStream#streamingml:kMeansMiniBatch(3, 0.1, 100, 50, creditScore, income, loanAmount);
```

In this example, the input stream `CreditDataStream` contains credit data, including credit score, income, and loan amount. The K-Means MiniBatch clustering algorithm is used to segment credit applicants into three risk groups based on their credit score, income, and loan amount. The decay rate is set to 0.1, maximum iterations to 100, and number of events to retrain to 50. The output stream `CreditRiskAnalysis` contains the coordinates of the closest centroid, as well as the original data points.
