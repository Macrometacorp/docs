---
sidebar_position: 10
---

# Streaming ML

This extension provides streaming machine learning (clustering, classification and regression) on event streams.

## Features

* **[bayesianRegression (StreamProcessor)](#bayesianregression)**

    This extension predicts using a Bayesian linear regression
    model.Bayesian linear regression allows determining the uncertainty
    of each prediction by estimating the full-predictive distribution

* **[kMeansIncremental (StreamProcessor)](#kmeansincremental)**

    Performs K-Means clustering on a streaming data set. Data points can
    be of any dimension and the dimensionality is calculated from number
    of parameters. All data points to be processed by a query should be
    of the same dimensionality. The Euclidean distance is taken as the
    distance metric. The algorithm resembles Sequential K-Means
    Clustering at
    https://www.cs.princeton.edu/courses/archive/fall08/cos436/Duda/C/sk_means.htm

* **[kMeansMiniBatch (StreamProcessor)](#kmeansminibatch)**

    Performs K-Means clustering on a streaming data set. Data points can
    be of any dimension and the dimensionality is calculated from number
    of parameters. All data points to be processed in a single query
    should be of the same dimensionality. The Euclidean distance is
    taken as the distance metric. The algorithm resembles mini-batch
    K-Means. (refer Web-Scale K-Means Clustering by D.Sculley, Google,
    Inc.).

* **[perceptronClassifier (StreamProcessor)](#perceptronclassifier)**

    This extension predicts using a linear binary classification
    Perceptron model.

* **[updateBayesianRegression (StreamProcessor)](#updatebayesianregression)**

    This extension builds/updates a linear Bayesian regression model.
    This extension uses an improved version of stochastic variational
    inference.

* **[updatePerceptronClassifier (StreamProcessor)](#updateperceptronclassifier)**

    This extension builds/updates a linear binary classification
    Perceptron model.

## bayesianRegression

This extension predicts using a Bayesian linear regression
model.Bayesian linear regression allows determining the uncertainty of
each prediction by estimating the full-predictive distribution

Syntax

    streamingml:bayesianRegression(<STRING> model.name, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:bayesianRegression(<STRING> model.name, <INT> prediction.samples, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)

QUERY PARAMETERS

| Name               | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|--------------------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| model.name         | The name of the model to be used                                   |               | STRING                | No       | No      |
| prediction.samples | The number of samples to be drawn to estimate the prediction       | 1000          | INT                   | Yes      | No      |
| model.feature      | The features of the model that need to be attributes of the stream |               | DOUBLE FLOAT INT LONG | No       | Yes     |

Extra Return Attributes

| Name       | Description                                                      | Possible Types |
|------------|------------------------------------------------------------------|----------------|
| prediction | The predicted value (double)                                     | DOUBLE         |
| confidence | Inverse of the standard deviation of the predictive distribution | DOUBLE         |

EXAMPLE 1

    define stream StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double);

    from StreamA#streamingml:bayesianRegression('model1', attribute_0, attribute_1, attribute_2, attribute_3)
    insert all events into OutputStream;

This query uses a Bayesian regression model named `model1` to predict
the label of the feature vector represented by `attribute_0`,
`attribute_1`, `attribute_2`, and `attribute_3`. The predicted value is
emitted to the `OutputStream` streamalong with the prediction confidence
(std of predictive distribution) and the feature vector. As a result,
the OutputStream stream is defined as follows: (attribute_0 double,
attribute_1 double, attribute_2 double, attribute_3 double,
prediction double, confidence double).

## kMeansIncremental

Performs K-Means clustering on a streaming data set. Data points can be
of any dimension and the dimensionality is calculated from number of
parameters. All data points to be processed by a query should be of the
same dimensionality. The Euclidean distance is taken as the distance
metric. The algorithm resembles Sequential K-Means Clustering at
https://www.cs.princeton.edu/courses/archive/fall08/cos436/Duda/C/sk_means.htm

Syntax

    streamingml:kMeansIncremental(<INT> no.of.clusters, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:kMeansIncremental(<INT> no.of.clusters, <DOUBLE> decay.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)

QUERY PARAMETERS

| Name           | Description                                                                                                                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| no.of.clusters | The assumed number of natural clusters in the data set.                                                                                                         |               | INT                   | No       | No      |
| decay.rate     | this is the decay rate of old data compared to new data. Value of this will be in [0,1]. 0 means only old data used and1 will mean that only new data is used | 0.01          | DOUBLE                | Yes      | No      |
| model.feature  | This is a variable length argument. Depending on the dimensionality of data points we will receive coordinates as features along each axis.                     |               | DOUBLE FLOAT INT LONG | No       | Yes     |

Extra Return Attributes

| Name                               | Description                                                                                                                                                                                                                                                                                                                                                                             | Possible Types |
|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| euclideanDistanceToClosestCentroid | Represents the Euclidean distance between the current data point and the closest centroid.                                                                                                                                                                                                                                                                                              | DOUBLE         |
| closestCentroidCoordinate          | This is a variable length attribute. Depending on the dimensionality(D) we will return closestCentroidCoordinate1, closestCentroidCoordinate2,... closestCentroidCoordinateD which are the d dimensional coordinates of the closest centroid from the model to the current event. This is the prediction result and this represents the cluster to which the current event belongs to. | DOUBLE         |

EXAMPLE 1

    define stream InputStream (x double, y double);
    @info(name = 'query1')
    select closestCentroidCoordinate1, closestCentroidCoordinate2, x, y    
    from InputStream#streamingml:kMeansIncremental(2, 0.2, x, y)
    insert into OutputStream;

This is an example where user provides the decay rate. First two events
will be used to initiate the model since the required number of clusters
is specified as 2. After the first event itself prediction would start.

EXAMPLE 2

    define stream InputStream (x double, y double);
    @info(name = 'query1')
    select closestCentroidCoordinate1, closestCentroidCoordinate2, x, y    
    from InputStream#streamingml:kMeansIncremental(2, x, y)
    insert into OutputStream;

This is an example where user doesnt give the decay rate so the default
value will be used

## kMeansMiniBatch

Performs K-Means clustering on a streaming data set. Data points can be
of any dimension and the dimensionality is calculated from number of
parameters. All data points to be processed in a single query should be
of the same dimensionality. The Euclidean distance is taken as the
distance metric. The algorithm resembles mini-batch K-Means. (refer
Web-Scale K-Means Clustering by D.Sculley, Google, Inc.).

Syntax

    streamingml:kMeansMiniBatch(<INT> no.of.clusters, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:kMeansMiniBatch(<INT> no.of.clusters, <DOUBLE> decay.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:kMeansMiniBatch(<INT> no.of.clusters, <INT> maximum.iterations, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:kMeansMiniBatch(<INT> no.of.clusters, <INT> no.of.events.to.retrain, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:kMeansMiniBatch(<INT> no.of.clusters, <DOUBLE> decay.rate, <INT> maximum.iterations, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:kMeansMiniBatch(<INT> no.of.clusters, <DOUBLE> decay.rate, <INT> no.of.events.to.retrain, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:kMeansMiniBatch(<INT> no.of.clusters, <INT> maximum.iterations, <INT> no.of.events.to.retrain, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:kMeansMiniBatch(<INT> no.of.clusters, <DOUBLE> decay.rate, <INT> maximum.iterations, <INT> no.of.events.to.retrain, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)

QUERY PARAMETERS

| Name                    | Description                                                                                                                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| no.of.clusters          | The assumed number of natural clusters in the data set.                                                                                                         |               | INT                   | No       | No      |
| decay.rate              | this is the decay rate of old data compared to new data. Value of this will be in [0,1]. 0 means only old data used and1 will mean that only new data is used | 0.01          | DOUBLE                | Yes      | No      |
| maximum.iterations      | Number of iterations, the process iterates until the number of maximum iterations is reached or the centroids do not change                                     | 50            | INT                   | Yes      | No      |
| no.of.events.to.retrain | number of events to recalculate cluster centers.                                                                                                                | 20            | INT                   | Yes      | No      |
| model.feature           | This is a variable length argument. Depending on the dimensionality of data points we will receive coordinates as features along each axis.                     |               | DOUBLE FLOAT INT LONG | No       | Yes     |

Extra Return Attributes

| Name                               | Description                                                                                                                                                                                                                                                                                                                                              | Possible Types |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| euclideanDistanceToClosestCentroid | Represents the Euclidean distance between the current data point and the closest centroid.                                                                                                                                                                                                                                                               | DOUBLE         |
| closestCentroidCoordinate          | This is a variable length attribute. Depending on the dimensionality(d) we will return closestCentroidCoordinate1 to closestCentroidCoordinated which are the d dimensional coordinates of the closest centroid from the model to the current event. This is the prediction result and this represents the cluster towhich the current event belongs to. | DOUBLE         |

EXAMPLE 1

    define stream InputStream (x double, y double);
    @info(name = 'query1')
    select closestCentroidCoordinate1, closestCentroidCoordinate2, x, y    
    from InputStream#streamingml:kMeansMiniBatch(2, 0.2, 10, 20, x, y)
    insert into OutputStream;

This is an example where user gives all three hyper parameters. first 20
events will be consumed to build the model and from the 21st event
prediction would start

EXAMPLE 2

    define stream InputStream (x double, y double);
    @info(name = 'query1')
    select closestCentroidCoordinate1, closestCentroidCoordinate2, x, y    
    from InputStream#streamingml:kMeansMiniBatch(2, x, y)
    insert into OutputStream;

This is an example where user has not specified hyper params. So default
values will be used.

## perceptronClassifier

This extension predicts using a linear binary classification Perceptron
model.

Syntax

    streamingml:perceptronClassifier(<STRING> model.name, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:perceptronClassifier(<STRING> model.name, <DOUBLE> model.bias, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:perceptronClassifier(<STRING> model.name, <DOUBLE> model.threshold, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:perceptronClassifier(<STRING> model.name, <DOUBLE> model.bias, <DOUBLE> model.threshold, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)

QUERY PARAMETERS

| Name            | Description                                                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|-----------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| model.name      | The name of the model to be used.                                                               |               | STRING                | No       | No      |
| model.bias      | The bias of the Perceptron algorithm.                                                           | 0.0           | DOUBLE                | Yes      | No      |
| model.threshold | The threshold that separates the two classes. The value specified must be between zero and one. | 0.5           | DOUBLE                | Yes      | No      |
| model.feature   | The features of the model that need to be attributes of the stream.                             |               | DOUBLE FLOAT INT LONG | No       | Yes     |

Extra Return Attributes

| Name            | Description                        | Possible Types |
|-----------------|------------------------------------|----------------|
| prediction      | The predicted value (`true/false`) | BOOL           |
| confidenceLevel | The probability of the prediction  | DOUBLE         |

EXAMPLE 1

    define stream StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double);

    from StreamA#streamingml:perceptronClassifier('model1',0.0,0.5, attribute_0, attribute_1, attribute_2, attribute_3)
    insert all events into OutputStream;

This query uses a Perceptron model named `model1` with a `0.0` bias and
a `0.5` threshold learning rate to predict the label of the feature
vector represented by `attribute_0`, `attribute_1`, `attribute_2`, and
`attribute_3`. The predicted label (`true/false`) is emitted to the
`OutputStream` streamalong with the prediction confidence
level(probability) and the feature vector. As a result, the OutputStream
stream is defined as follows: (attribute_0 double, attribute_1 double,
attribute_2 double, attribute_3 double, prediction bool,
confidenceLevel double).

EXAMPLE 2

    define stream StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double);

    from StreamA#streamingml:perceptronClassifier('model1',0.0, attribute_0, attribute_1, attribute_2, attribute_3)
    insert all events into OutputStream;

This query uses a Perceptron model named `model1` with a `0.0` bias to
predict the label of the feature vector represented by `attribute_0`,
`attribute_1`, `attribute_2`, and `attribute_3`. The
prediction(`true/false`) is emitted to the `OutputStream`stream along
with the prediction confidence level(probability) and the feature. As a
result, the OutputStream stream is defined as follows: (attribute_0
double, attribute_1 double, attribute_2 double, attribute_3 double,
prediction bool, confidenceLevel double).

EXAMPLE 3

    define stream StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double);

    from StreamA#streamingml:perceptronClassifier(`model1`, attribute_0, attribute_1, attribute_2)
    insert all events into OutputStream;

This query uses a Perceptron model named `model1` with a default 0.0
bias to predict the label of the feature vector represented by
`attribute_0`, `attribute_1`, and `attribute_2`. The predicted
probability is emitted to the OutputStream stream along with the feature
vector. As a result, the OutputStream is defined as follows:
(attribute_0 double, attribute_1 double, attribute_2 double,
attribute_3 double, prediction bool, confidenceLevel double).

## updateBayesianRegression

This extension builds/updates a linear Bayesian regression model. This
extension uses an improved version of stochastic variational inference.

Syntax

    streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <INT> model.samples, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <STRING> model.optimizer, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <DOUBLE> learning.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <INT> model.samples, <STRING> model.optimizer, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <INT> model.samples, <DOUBLE> learning.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <STRING> model.optimizer, <DOUBLE> learning.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:updateBayesianRegression(<STRING> model.name, <INT|DOUBLE|LONG|FLOAT> model.target, <INT> model.samples, <STRING> model.optimizer, <DOUBLE> learning.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)

QUERY PARAMETERS

| Name            | Description                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|-----------------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| model.name      | The name of the model to be built.                              |               | STRING                | No       | No      |
| model.target    | The target attribute (dependant variable) of the input stream.  |               | INT DOUBLE LONG FLOAT | No       | Yes     |
| model.samples   | Number of samples used to construct the gradients.              | 1             | INT                   | Yes      | No      |
| model.optimizer | The type of optimization used                                   | ADAM          | STRING                | Yes      | No      |
| learning.rate   | The learning rate of the updater                                | 0.05          | DOUBLE                | Yes      | No      |
| model.feature   | Features of the model that need to be attributes of the stream. |               | DOUBLE FLOAT INT LONG | No       | Yes     |

Extra Return Attributes

| Name | Description        | Possible Types |
|------|--------------------|----------------|
| loss | loss of the model. | DOUBLE         |

EXAMPLE 1

    define stream StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 double );

    from StreamA#streamingml:updateBayesianRegression('model1', attribute_4, attribute_0, attribute_1, attribute_2, attribute_3)
    insert all events into outputStream;

This query builds/updates a Bayesian Linear regression model named
`model1` using `attribute_0`, `attribute_1`, `attribute_2`, and
`attribute_3` as features, and `attribute_4` as the label. Updated
weights of the model are emitted to the OutputStream stream.

EXAMPLE 2

    define stream StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 double );

    from StreamA#streamingml:updateBayesianRegression('model1', attribute_4, 2, 'NADAM', 0.01, attribute_0, attribute_1, attribute_2, attribute_3)
    insert all events into outputStream;

This query builds/updates a Bayesian Linear regression model named
`model1` with a `0.01` learning rate using `attribute_0`, `attribute_1`,
`attribute_2`, and `attribute_3` as features, and `attribute_4` as the
label. Updated weights of the model are emitted to the OutputStream
stream. This model draws two samples during monte-carlo integration and
uses NADAM optimizer.

## updatePerceptronClassifier

This extension builds/updates a linear binary classification Perceptron
model.

Syntax

    streamingml:updatePerceptronClassifier(<STRING> model.name, <BOOL|STRING> model.label, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)
    streamingml:updatePerceptronClassifier(<STRING> model.name, <BOOL|STRING> model.label, <DOUBLE> learning.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)

QUERY PARAMETERS

| Name          | Description                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|---------------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| model.name    | The name of the model to be built/updated.                      |               | STRING                | No       | No      |
| model.label   | The attribute of the label or the class of the dataset.         |               | BOOL STRING           | No       | Yes     |
| learning.rate | The learning rate of the Perceptron algorithm.                  | 0.1           | DOUBLE                | Yes      | No      |
| model.feature | Features of the model that need to be attributes of the stream. |               | DOUBLE FLOAT INT LONG | No       | Yes     |

Extra Return Attributes

| Name          | Description                                  | Possible Types |
|---------------|----------------------------------------------|----------------|
| featureWeight | Weight of the `feature.name` of the model. | DOUBLE         |

EXAMPLE 1

    define stream StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 string );

    from StreamA#streamingml:updatePerceptronClassifier('model1', attribute_4, 0.01, attribute_0, attribute_1, attribute_2, attribute_3)
    insert all events into outputStream;

This query builds/updates a Perceptron model named `model1` with a
`0.01` learning rate using `attribute_0`, `attribute_1`, `attribute_2`,
and `attribute_3` as features, and `attribute_4` as the label. Updated
weights of the model are emitted to the OutputStream stream.

EXAMPLE 2

    define stream StreamA (attribute_0 double, attribute_1 double, attribute_2 double,attribute_3 double, attribute_4 string );

     from StreamA#streamingml:updatePerceptronClassifier('model1', attribute_4, attribute_0, attribute_1, attribute_2, attribute_3)
    insert all events into outputStream;

This query builds/updates a Perceptron model named `model1` with a
default `0.1` learning rate using `attribute_0`, `attribute_1`,
`attribute_2`, and `attribute_3` as features, and `attribute_4` as the
label. The updated weights of the model are appended to the
outputStream.
