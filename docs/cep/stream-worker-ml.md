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

## Example 1: Real-time Energy Consumption Prediction

```sql
CREATE STREAM TrainingStream (temperature double, time_of_day double, day_of_week double, recent_consumption double, energy_consumption double);
CREATE STREAM PredictionStream (temperature double, time_of_day double, day_of_week double, recent_consumption double);

CREATE SINK STREAM EnergyConsumptionPredictions (prediction double, confidence double, temperature double, time_of_day double, day_of_week double, recent_consumption double);

@info(name = 'trainEnergyModel')
INSERT INTO OutputStream1
SELECT *
FROM TrainingStream#streamingml:updateBayesianRegression('energyModel', energy_consumption, temperature, time_of_day, day_of_week, recent_consumption);

@info(name = 'predictEnergyConsumption')
INSERT INTO EnergyConsumptionPredictions
SELECT prediction, confidence, temperature, time_of_day, day_of_week, recent_consumption
FROM PredictionStream#streamingml:bayesianRegression('energyModel', temperature, time_of_day, day_of_week, recent_consumption);
```

In this example, two input streams are created: `TrainingStream` for model training and `PredictionStream` for making predictions. The `TrainingStream` contains temperature, time of day, day of the week, recent consumption patterns, and actual energy consumption, while the `PredictionStream` contains the same features but without actual energy consumption.

A sink stream, `EnergyConsumptionPredictions`, is defined to store the predicted energy consumption, prediction confidence, and the original features from the `PredictionStream`.

The `trainEnergyModel` query processes events from the `TrainingStream`, updating the Bayesian linear regression model 'energyModel' using the input features and the actual energy consumption.

The `predictEnergyConsumption` query processes events from the `PredictionStream`, using the trained 'energyModel' to predict energy consumption based on the input features. The predictions, along with their confidences and original features, are inserted into the `EnergyConsumptionPredictions` sink stream.

## Example 2: Real-time Ad Performance Prediction

```sql
CREATE STREAM TrainingStream2 (ad_placement double, ad_format double, time_of_day double, user_demographics double, click_through_rate double);
CREATE STREAM PredictionStream2 (ad_placement double, ad_format double, time_of_day double, user_demographics double);

CREATE SINK STREAM AdPerformancePredictions (prediction double, confidence double, ad_placement double, ad_format double, time_of_day double, user_demographics double);

@info(name = 'trainAdPerformanceModel')
INSERT INTO OutputStream3
SELECT *
FROM TrainingStream2#streamingml:updateBayesianRegression('adPerformanceModel', click_through_rate, ad_placement, ad_format, time_of_day, user_demographics);

@info(name = 'predictAdPerformance')
INSERT INTO AdPerformancePredictions
SELECT prediction, confidence, ad_placement, ad_format, time_of_day, user_demographics
FROM PredictionStream2#streamingml:bayesianRegression('adPerformanceModel', ad_placement, ad_format, time_of_day, user_demographics);
```

In this example, two input streams are created: `TrainingStream2` for model training and `PredictionStream2` for making predictions. The `TrainingStream2` contains ad placement, ad format, time of day, user demographics, and actual click-through rate, while the `PredictionStream2` contains the same features but without actual click-through rate.

A sink stream, `AdPerformancePredictions`, is defined to store the predicted click-through rates, prediction confidence, and the original features from the `PredictionStream2`.

The `trainAdPerformanceModel` query processes events from the `TrainingStream2`, updating the Bayesian linear regression model 'adPerformanceModel' using the input features and the actual click-through rate.

The `predictAdPerformance` query processes events from the `PredictionStream2`, using the trained 'adPerformanceModel' to predict click-through rates based on the input features. The predictions, along with their confidences and original features, are inserted into the `AdPerformancePredictions` sink stream.

