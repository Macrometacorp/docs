---
title: crosses (Stream Processor)
---

Determines if the specified object or location crosses a geographic location specified by `geo.json.geometry.fence`.

## Syntax

```sql
<BOOL> geo:crosses(<STRING> id, <DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
<BOOL> geo:crosses(<STRING> id, <STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)
```

## Query Parameters

| Name              | Description              | Possible Data Types | Optional | Dynamic |
|-------------------|--------------------------|-------------------|----------|---------|
| id 	     | Location ID.         | STRING       | No       | No     |
| longitude 	     | Longitude of the geo location.         | DOUBLE       | Yes       | No     |
| latitude | Latitude of the geo location.                  | DOUBLE              | Yes      | No     |
| geo.json.geometry     | String that contains geometry type and coordinates for a GeoJSON geometry. | STRING        | Yes      | No     |
| geo.json.geometry.fence     | String that contains geometry type and coordinates for a GeoJSON geometry fence. | STRING    | No      | No     |

## Example 1

```sql
CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double);
CREATE SINK STREAM OutputStream (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, prediction double, confidence double);

@info(name = 'basicBayesianRegressionQuery')
FROM StreamA#streamingml:bayesianRegression('model1', attribute_0, attribute_1, attribute_2, attribute_3)
INSERT ALL EVENTS INTO OutputStream;
```

The `basicBayesianRegressionQuery` uses a Bayesian linear regression model named `model1` to predict the label of the feature vector represented by `attribute_0`, `attribute_1`, `attribute_2`, and `attribute_3`. The predicted value and the prediction confidence (inverse of the standard deviation of the predictive distribution) are emitted to the `OutputStream` stream, along with the feature vector. As a result, the `OutputStream` stream is defined as follows: `(attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, prediction double, confidence double)`.

## Example 2

```sql
CREATE STREAM StreamB (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 double);
CREATE STREAM DetailedOutputStream (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 double, prediction double, confidence double);

@info(name = 'advancedBayesianRegressionQuery')
FROM StreamB#streamingml:bayesianRegression('model2', 500, attribute_0, attribute_1, attribute_2, attribute_3, attribute_4)
INSERT ALL EVENTS INTO DetailedOutputStream;
```

The `advancedBayesianRegressionQuery` uses a Bayesian linear regression model named `model2` with 500 prediction samples to predict the label of the feature vector represented by `attribute_0`, `attribute_1`, `attribute_2`, `attribute_3`, and `attribute_4`. The predicted value and the prediction confidence (inverse of the standard deviation of the predictive distribution) are emitted to the `DetailedOutputStream` stream, along with the feature vector. As a result, the `DetailedOutputStream` stream is defined as follows: `(attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 double, prediction double, confidence double)`.
