---
title: kMeansMiniBatch (Stream Processor)
---

Performs K-Means clustering on a streaming data set. Data points can be
of any dimension and the dimensionality is calculated from number of
parameters. All data points to be processed in a single query should be
of the same dimensionality. The Euclidean distance is taken as the
distance metric. The algorithm resembles mini-batch K-Means. (refer
Web-Scale K-Means Clustering by D.Sculley, Google, Inc.).

## Syntax

    streamingml:kMeansMiniBatch(<INT> no.of.clusters, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:kMeansMiniBatch(<INT> no.of.clusters, <DOUBLE> decay.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:kMeansMiniBatch(<INT> no.of.clusters, <INT> maximum.iterations, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:kMeansMiniBatch(<INT> no.of.clusters, <INT> no.of.events.to.retrain, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:kMeansMiniBatch(<INT> no.of.clusters, <DOUBLE> decay.rate, <INT> maximum.iterations, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:kMeansMiniBatch(<INT> no.of.clusters, <DOUBLE> decay.rate, <INT> no.of.events.to.retrain, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:kMeansMiniBatch(<INT> no.of.clusters, <INT> maximum.iterations, <INT> no.of.events.to.retrain, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:kMeansMiniBatch(<INT> no.of.clusters, <DOUBLE> decay.rate, <INT> maximum.iterations, <INT> no.of.events.to.retrain, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)

## Query Parameters

| Name    | Description     | Default Value | Possible Data Types   | Optional | Dynamic |
|-------------------------|---------------------------------------------------------------|---------------|-----------------------|----------|---------|
| no.of.clusters          | The assumed number of natural clusters in the data set.         |               | INT   | No       | No      |
| decay.rate              | this is the decay rate of old data compared to new data. Value of this will be in [0,1]. 0 means only old data used and1 will mean that only new data is used | 0.01          | DOUBLE| Yes      | No      |
| maximum.iterations      | Number of iterations, the process iterates until the number of maximum iterations is reached or the centroids do not change     | 50            | INT   | Yes      | No      |
| no.of.events.to.retrain | number of events to recalculate cluster centers.| 20            | INT   | Yes      | No      |
| model.feature           | This is a variable length argument. Depending on the dimensionality of data points we will receive coordinates as features along each axis.     |               | DOUBLE FLOAT INT LONG | No       | Yes     |

## Extra Return Attributes

| Name               | Description              | Possible Types |
|------------------------------------|----------------------------------------------------|----------------|
| euclideanDistanceToClosestCentroid | Represents the Euclidean distance between the current data point and the closest centroid.               | DOUBLE         |
| closestCentroidCoordinate          | This is a variable length attribute. Depending on the dimensionality(d) we will return closestCentroidCoordinate1 to closestCentroidCoordinated which are the d dimensional coordinates of the closest centroid from the model to the current event. This is the prediction result and this represents the cluster towhich the current event belongs to. | DOUBLE         |

## Example 1

    CREATE STREAM InputStream (x double, y double);
    @info(name = 'query1')
    insert into OutputStream
    select closestCentroidCoordinate1, closestCentroidCoordinate2, x, y    
    from InputStream#streamingml:kMeansMiniBatch(2, 0.2, 10, 20, x, y);

This is an example where user gives all three hyper parameters. first 20
events will be consumed to build the model and from the 21st event
prediction would start.

## Example 2

    CREATE STREAM InputStream (x double, y double);
    @info(name = 'query1')
    insert into OutputStream
    select closestCentroidCoordinate1, closestCentroidCoordinate2, x, y    
    from InputStream#streamingml:kMeansMiniBatch(2, x, y);

This is an example where user has not specified hyper parameters, so default
values are used.
