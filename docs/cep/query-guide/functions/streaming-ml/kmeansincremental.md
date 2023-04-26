---
title: kMeansIncremental (Stream Processor)
---

Performs K-Means clustering on a streaming data set. Data points can be
of any dimension and the dimensionality is calculated from number of
parameters. All data points to be processed by a query should be of the
same dimensionality. The Euclidean distance is taken as the distance metric. The algorithm resembles [Sequential K-Means Clustering](https://www.cs.princeton.edu/courses/archive/fall08/cos436/Duda/C/sk_means.htm).

## Syntax

```sql
streamingml:kMeansIncremental(<INT> no.of.clusters, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
streamingml:kMeansIncremental(<INT> no.of.clusters, <DOUBLE> decay.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
```

## Query Parameters

| Name  | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|-------|------------|---------------|-----------------------|----------|---------|
| no.of.clusters | The assumed number of natural clusters in the data set. |               | INT   | No       | No      |
| decay.rate     | this is the decay rate of old data compared to new data. Value of this will be in [0,1]. 0 means only old data used and1 will mean that only new data is used | 0.01          | DOUBLE| Yes      | No      |
| model.feature  | This is a variable length argument. Depending on the dimensionality of data points we will receive coordinates as features along each axis.     |               | DOUBLE FLOAT INT LONG | No       | Yes     |

## Extra Return Attributes

| Name         | Description             | Possible Types |
|--------------|-------------------------|----------------|
| euclideanDistanceToClosestCentroid | Represents the Euclidean distance between the current data point and the closest centroid.              | DOUBLE         |
| closestCentroidCoordinate          | This is a variable length attribute. Depending on the dimensionality(D) we will return closestCentroidCoordinate1, closestCentroidCoordinate2,... closestCentroidCoordinateD which are the d dimensional coordinates of the closest centroid from the model to the current event. This is the prediction result and this represents the cluster to which the current event belongs to. | DOUBLE         |

## Example 1

```sql
CREATE STREAM InputStream (x double, y double);
CREATE STREAM OutputStream (closestCentroidCoordinate1 double, closestCentroidCoordinate2 double, x double, y double);

@info(name = 'kMeansWithDecayRateQuery')
INSERT INTO OutputStream
SELECT closestCentroidCoordinate1, closestCentroidCoordinate2, x, y
FROM InputStream#streamingml:kMeansIncremental(2, 0.2, x, y);
```

In this example, the user provides the decay rate of 0.2. The first two events will be used to initiate the model since the required number of clusters is specified as 2. After the first event, predictions will start. The output stream contains the coordinates of the closest centroid, as well as the original data points.

## Example 2

```sql
CREATE STREAM InputStream2 (x double, y double);
CREATE STREAM OutputStream2 (closestCentroidCoordinate1 double, closestCentroidCoordinate2 double, x double, y double);

@info(name = 'kMeansDefaultDecayRateQuery')
INSERT INTO OutputStream2
SELECT closestCentroidCoordinate1, closestCentroidCoordinate2, x, y
FROM InputStream2#streamingml:kMeansIncremental(2, x, y);
```

In this example, the user doesn't provide the decay rate, so the default value is used. The first two events will be used to initiate the model since the required number of clusters is specified as 2. After the first event, predictions will start. The output stream contains the coordinates of the closest centroid, as well as the original data points.

## Example 3

```sql
CREATE STREAM InputStream3 (x double, y double, z double);
CREATE STREAM OutputStream3 (closestCentroidCoordinate1 double, closestCentroidCoordinate2 double, closestCentroidCoordinate3 double, x double, y double, z double);

@info(name = 'kMeans3DQuery')
INSERT INTO OutputStream3
SELECT closestCentroidCoordinate1, closestCentroidCoordinate2, closestCentroidCoordinate3, x, y, z
FROM InputStream3#streamingml:kMeansIncremental(3, x, y, z);
```

In this example, the data points have three dimensions. The required number of clusters is specified as 3. The first three events will be used to initiate the model. After the first event, predictions will start. The output stream contains the coordinates of the closest centroid, as well as the original data points.
