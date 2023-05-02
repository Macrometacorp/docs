---
sidebar_position: 130
title: Machine Learning with Stream Workers
---

# Real-time Machine Learning with Macrometa Stream Workers

Macrometa's stream workers offer powerful real-time machine learning capabilities that can be applied to a wide range of use cases. This documentation provides examples with code blocks that showcase the machine learning process. The goal is to help you better understand the application of these functions in real-world scenarios.

## Importance of Real-time Machine Learning

Real-time machine learning is crucial for businesses that need to analyze and react to data as it is generated. By processing and learning from data in real-time, you can gain actionable insights faster, make better decisions, and improve the efficiency of your operations. Some of the benefits of real-time machine learning include:

- **Faster decision-making**: Real-time machine learning allows you to make data-driven decisions quickly, giving you a competitive advantage in fast-paced industries.
- **Enhanced customer experience**: By analyzing customer interactions and behavior in real-time, you can provide personalized experiences and recommendations, leading to higher customer satisfaction and loyalty.
- **Improved operational efficiency**: Real-time machine learning can help you identify inefficiencies, optimize resource allocation, and reduce costs.
- **Proactive anomaly detection**: Detecting anomalies in real-time enables you to address potential issues before they escalate, minimizing the impact on your business.

### Bayesian Regression Example

### Update Bayesian Regression

### Perceptron Classifier Example: Anomaly Detection in Transaction Data

This example demonstrates how to use the `streamingml:perceptronClassifier` function to detect anomalies in transaction data. The goal is to identify unusual purchase patterns that might indicate fraudulent activity or other issues.

```sql
CREATE STREAM TransactionsStream (timestamp long, customerId string, transactionCount int, purchaseAmount double);

CREATE SINK STREAM AnomalyDetectionStream (timestamp long, customerId string, transactionCount int, purchaseAmount double, isAnomaly bool);

@info(name = 'detectAnomalies')
INSERT INTO AnomalyDetectionStream
SELECT timestamp, customerId, transactionCount, purchaseAmount,
       streamingml:perceptronClassifier('anomalyDetector', transactionCount, purchaseAmount) AS isAnomaly
FROM TransactionsStream;
```

Error!

Error: Error on 'TvuYzg4miSQuxtWmhzqJf8g:root:_system:new' @ Line: 11. Position: 92, near 'streamingml:perceptronClassifier('anomalyDetector', transactionCount, purchaseAmount)'. 'perceptronClassifier' is neither a function extension nor an aggregated attribute extension

For more information about this function, refer to the [perceptronClassifier](query-guide/functions/streaming-ml/perceptronclassifier) documentation.

### Update Perceptron Classifier Example

