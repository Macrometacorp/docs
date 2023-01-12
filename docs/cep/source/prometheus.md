---
title: prometheus (Source)
---

This source consumes Prometheus metrics that are exported from a
specified URL as Stream App events by sending HTTP requests to the URL.
Based on the source configuration, it analyzes metrics from the text
response and sends them as Stream App events through key-value mapping.The
user can retrieve metrics of the `including`, `counter`, `gauge`,
`histogram`, and `summary` types. The source retrieves the metrics
from a text response of the target. Therefore, it is you need to use
`string` as the attribute type for the attributes that correspond with
the Prometheus metric labels. Further, the Prometheus metric value is
passed through the event as `value`. This requires you to include an
attribute named `value` in the stream definition. The supported types
for the `value` attribute are `INT`, `LONG`, `FLOAT`, and
`DOUBLE`.

Syntax

    CREATE SOURCE <NAME> WITH (type="prometheus", map.type="<STRING>", target.url="<STRING>", scrape.interval="<INT>", scrape.timeout="<INT>", scheme="<STRING>", metric.name="<STRING>", metric.type="<STRING>", username="<STRING>", password="<STRING>", client.truststore.file="<STRING>", client.truststore.password="<STRING>", headers="<STRING>", job="<STRING>", instance="<STRING>", grouping.key="<STRING>")

## Query Parameters

| Name                       | Description                                                                                                                                                                                                                                                                                                                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| target.url                 | This property specifies the target URL to which the Prometheus metrics are exported in the `TEXT` format.                                                                                                                                                                                                                                                      |               | STRING              | No       | No      |
| scrape.interval            | This property specifies the time interval in seconds within which the source should send an HTTP request to the specified target URL.                                                                                                                                                                                                                            | 60            | INT                 | Yes      | No      |
| scrape.timeout             | This property is the time duration in seconds for a scrape request to get timed-out if the server at the URL does not respond.                                                                                                                                                                                                                                   | 10            | INT                 | Yes      | No      |
| scheme                     | This property specifies the scheme of the target URL.  The supported schemes are `HTTP` and `HTTPS`.                                                                                                                                                                                                                                                         | HTTP          | STRING              | Yes      | No      |
| metric.name                | This property specifies the name of the metrics that are to be fetched. The metric name must match the regex format, i.e., `\[a-zA-Z\_:\]\[a-zA-Z0-9\_:\]\* `.                                                                                                                                                                                                 | Stream name   | STRING              | Yes      | No      |
| metric.type                | This property specifies the type of the Prometheus metric that is required to be fetched.  The supported metric types are `counter`, `gauge`, `histogram`, and `summary`.                                                                                                                                                                              |               | STRING              | No       | No      |
| username                   | This property specifies the username that needs to be added in the authorization header of the HTTP request if basic authentication is enabled at the target. It is required to specify both the username and the password to enable basic authentication. If you do not provide a value for one or both of these parameters, an error is logged in the console. |               | STRING              | Yes      | No      |
| password                   | This property specifies the password that needs to be added in the authorization header of the HTTP request if basic authentication is enabled at the target. It is required to specify both the username and the password to enable basic authentication. If you do not provide a value for one or both of these parameters, an error is logged in the console. |               | STRING              | Yes      | No      |
| client.truststore.file     | The file path to the location of the truststore to which the client needs to send HTTPS requests via the `HTTPS` protocol.                                                                                                                                                                                                                                     |               | STRING              | Yes      | No      |
| client.truststore.password | The password for the client-truststore. This is required to send HTTPS requests. A custom password can be specified if required.                                                                                                                                                                                                                                 |               | STRING              | Yes      | No      |
| headers                    | Headers that need to be included as HTTP request headers in the request. The format of the supported input is as follows, "`header1:value1`,`header2:value2`"                                                                                                                                                                                              |               | STRING              | Yes      | No      |
| job                        | This property defines the job name of the exported Prometheus metrics that needs to be fetched.                                                                                                                                                                                                                                                                  |               | STRING              | Yes      | No      |
| instance                   | This property defines the instance of the exported Prometheus metrics that needs to be fetched.                                                                                                                                                                                                                                                                  |               | STRING              | Yes      | No      |
| grouping.key               | This parameter specifies the grouping key of the required metrics in key-value pairs. The grouping key is used if the metrics are exported by Prometheus `pushGateway` in order to distinguish those metrics from already existing metrics.  The expected format of the grouping key is as follows: "`key1:value1`,`key2:value2`"                        |               | STRING              | Yes      | No      |

## System Parameters

| Name               | Description                                                                                                                                                                                                                                                                                                                          | Default Value                                            | Possible Parameters                    |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|----------------------------------------|
| scrapeInterval     | The default time interval in seconds for the Prometheus source to send HTTP requests to the target URL.                                                                                                                                                                                                                              | 60                                                       | Any integer value                      |
| scrapeTimeout      | The default time duration (in seconds) for an HTTP request to time-out if the server at the URL does not respond.                                                                                                                                                                                                                    | 10                                                       | Any integer value                      |
| scheme             | The scheme of the target for the Prometheus source to send HTTP requests. The supported schemes are `HTTP` and `HTTPS`.                                                                                                                                                                                                          | HTTP                                                     | HTTP or HTTPS                          |
| username           | The username that needs to be added in the authorization header of the HTTP request if basic authentication is enabled at the target. It is required to specify both the username and password to enable basic authentication. If you do not specify a value for one or both of these parameters, an error is logged in the console. |                                                          | Any string                             |
| password           | The password that needs to be added in the authorization header of the HTTP request if basic authentication is enabled at the target. It is required to specify both the username and password to enable basic authentication. If you do not specify a value for one or both of these parameters, an error is logged in the console. |                                                          | Any string                             |
| trustStoreFile     | The default file path to the location of truststore that the client needs to access in order to send HTTPS requests through `HTTPS` protocol.                                                                                                                                                                                      | \${carbon.home}/resources/security/client-truststore.jks | Any valid path for the truststore file |
| trustStorePassword | The default password for the client-truststore that the client needs to access in order to send HTTPS requests through `HTTPS` protocol.                                                                                                                                                                                           | gdncarbon                                               | Any string                             |
| headers            | The headers that need to be included as HTTP request headers in the scrape request. The format of the supported input is as follows, "`header1:value1`,`header2:value2`"                                                                                                                                                       |                                                          | Any valid http headers                 |
| job                | The default job name of the exported Prometheus metrics that needs to be fetched.                                                                                                                                                                                                                                                    |                                                          | Any valid job name                     |
| instance           | The default instance of the exported Prometheus metrics that needs to be fetched.                                                                                                                                                                                                                                                    |                                                          | Any valid instance name                |
| groupingKey        | The default grouping key of the required Prometheus metrics in key-value pairs. The grouping key is used if the metrics are exported by the Prometheus pushGateway in order to distinguish these metrics from already existing metrics. The expected format of the grouping key is as follows: "`key1:value1`,`key2:value2`"   |                                                          | Any valid grouping key pairs           |

## Example 1

    CREATE SOURCE FooStream1 WITH (type= 'prometheus', target.url= 'http://localhost:9080/metrics', metric.type= 'counter', metric.name= 'sweet_production_counter', map.type='keyvalue') (metric_name string, metric_type string, help string, subtype string, name string, quantity string, value double);

In this example, the Prometheus source sends an HTTP request to the `target.url` and analyzes the response. From the analyzed response, the source retrieves the Prometheus counter metrics with the `sweet_production_counter` nameand converts the filtered metrics into Stream App events using the key-value mapper. The generated maps have keys and values as follows:   

```
metric_name -> sweet_production_counter   
metric_type -> counter   
help -> help_string_of_metric   
subtype -> null   
name -> value_of_label_name   
quantity -> value_of_label_quantity
value -> value_of_metric
```

## Example 2

    CREATE SOURCE FooStream2 WITH (type='prometheus', target.url= 'http://localhost:9080/metrics', metric.type='summary', metric.name='sweet_production_summary', map.type='keyvalue') (metric_name string, metric_type string, help string, subtype string, name string, quantity string, quantile string, value double);

In this example, the Prometheus source sends an HTTP request to the `target.url` and analyzes the response. From the analysed response, the source retrieves the Prometheus summary metrics with the `sweet_production_summary` nameand converts the filtered metrics into Stream App events using the key-value mapper. The generated maps have keys and values as follows:   

```
metric_name -> sweet_production_summary   
metric_type -> summary   
help -> help_string_of_metric   
subtype -> `sum`/`count`/`null`   
name -> value_of_label_name
quantity -> value_of_label_quantity   
quantile -> value of the quantile   
value -> value_of_metric
```

## Example 3

    CREATE SOURCE FooStream3 WITH (type= 'prometheus', target.url= 'http://localhost:9080/metrics', metric.type= 'histogram', metric.name= 'sweet_production_histogram', map.type='keyvalue') (metric_name string, metric_type string, help string, subtype string, name string, quantity string, le string, value double);

In this example, the prometheus source sends an HTTP request to the `target.url` and analyzes the response. From the analyzed response, the source retrieves the Prometheus histogram metrics with the `sweet_production_histogram` name and converts the filtered metrics into Stream App events using the key-value mapper. The generated maps have keys and values as follows:   

```
metric_name -> sweet_production_histogram   
metric_type -> histogram   
help -> <help_string_of_metric>   
subtype -> <`sum`/`count`/`bucket`>   
name -> <value_of_label_name>
quantity -> <value_of_label_quantity>   
le -> <value of the bucket>   
value -> <value_of_metric>
