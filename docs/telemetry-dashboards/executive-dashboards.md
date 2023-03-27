# Executive Dashboard

## Overview:

The Executive dashboard contains a collection of metrics to display the overall health and operational status of an instance of the Global Data Network. More detailed dashboards for C8DB service and Prometheus Node System Health metrics are available.

[Grafana link](https://telemetry-paas.mm.macrometa.io/d/exodashboard/executive-dashboard?orgId=1)

### Metric Template:

- Global Hosts
    
    **Definition -** The number of hosts in the cluster.
    
    **Usage -** Show how many vm or servers running
    
    **Threshold -** N/A.
    
    ![Screenshot from 2023-03-23 15-16-24.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_15-16-24.png)
    
- Top 5 memory usage
    
    **Definition -** Top server with the most memory in use
    
    **Usage -** Show the server memory footprint.
    
    **Threshold -** Not set yet
    
    ![Screenshot from 2023-03-23 15-17-22.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_15-17-22.png)
    
- Top 5 Read/ Write request
    
    **Definition -** Top read write request database request
    
    **Usage -** Show the number of read / write request per second
    
    **Threshold -** Not set yet
    
    ![Screenshot from 2023-03-23 15-23-35.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_15-23-35.png)
    
- Top 5 DB HTTP Request Latency 90th.
    
    **Definition -** top of the read write latency request in milisecond
    
    **Usage -** show the most time it took to complete a read/write request.
    
    **Threshold -** Not set yet
    
    ![Screenshot from 2023-03-23 15-46-42.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_15-46-42.png)
    
- Availability SLA
    
    **Definition -** Service Level Agreement
    
    **Usage -** Show the API availability over time.
    
    **Threshold -** 99.99%
    
    ![Screenshot from 2023-03-23 15-34-28.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_15-34-28.png)
    
- Server error rate 5xx
    
    **Definition -** 5xx error rate
    
    **Usage -** Show the 5xx errors rate of the application, 100% mean there is no 5xx errors.
    
    **Threshold -** 99.99
    
    ![Screenshot from 2023-03-23 16-40-04.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_16-40-04.png)
    
- Client errors rate 4xx
    
    **Definition -** Client 4xx error rate.
    
    **Usage -** Display the 4xx error rate of the application. A rate of 100% indicates that there are no 4xx errors.
    
    **Threshold -** 99.99%
    
    ![Screenshot from 2023-03-23 17-13-47.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_17-13-47.png)
    
- 5xx
    
    **Definition -** 5xx HTTP response code
    
    **Usage -** Display the 5xx HTTP response code of the application.
    
    **Threshold -** not set yet
    
    ![Screenshot from 2023-03-23 19-07-23.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_19-07-23.png)
    
- 4xx
    
    **Definition -** 4xx HTTP response code
    
    **Usage -** Show the 4xx HTTP response code of the application
    
    **Threshold -** not set yet
    
    ![Screenshot from 2023-03-23 19-08-08.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_19-08-08.png)
    
- 3xx
    
    **Definition -** 3xx HTTP response code
    
    **Usage -** Show the 3xx HTTP response code of the application
    
    **Threshold -** not set yet
    
    ![Screenshot from 2023-03-23 19-11-23.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_19-11-23.png)
    
- 2xx
    
    **Definition -** 2xx HTTP response code
    
    **Usage -** Show the 2xx HTTP response code of the application
    
    **Threshold -** not set yet
    
    ![Screenshot from 2023-03-23 19-38-38.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_19-38-38.png)
    
- 1xx
    
    **Definition -** 1xx HTTP response code
    
    **Usage -** Show the 1xx HTTP response code of the application
    
    **Threshold -** Not set yet
    
    ![Screenshot from 2023-03-23 19-22-53.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_19-22-53.png)
    
- Memory used
    
    **Definition -** The amount of memory used
    
    **Usage -** Show the memory used in the server.
    
    **Threshold -** 80% memory used
    
    ![Screenshot from 2023-03-23 19-50-05.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_19-50-05.png)
    
- CPU Usage/Sec
    
    **Definition -** The application's CPU usage on the server.
    
    **Usage -** Show the CPU consumption on the node.
    
    **Threshold -** 95%
    
    ![Screenshot from 2023-03-23 19-55-57.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_19-55-57.png)
    
- DB Total requests per second
    
    **Definition -** Summary of Read and Write DB Requests over HTTP
    
    **Usage -** Show the amount of HTTP traffic received and sent by the application.
    
    **Threshold -** Not set yet
    
    ![Screenshot from 2023-03-23 20-54-02.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_20-54-02.png)
    
- Read / Write requests per second
    
    **Definition -** Total number of read / write requests made over time.
    
    **Usage -** Show the count of read and write requests per node during a specific time period.
    
    **Threshold -** Not set
    
    ![Screenshot from 2023-03-23 21-28-51.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_21-28-51.png)
    
- DB HTTP Request Latency
    
    **Definition -** This is the amount of time it takes to complete an HTTP database request.
    
    **Usage -** Display database latency requests.
    
    **Threshold -** Not set yet
    
    ![Screenshot from 2023-03-23 21-34-24.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_21-34-24.png)
    
- DB Data Ingress/Egress
    
    **Definition -** Incoming/Outgoing database traffic per node.
    
    **Usage -** Display the database traffic of the application.
    
    **Threshold -** Not set
    
    ![Screenshot from 2023-03-23 21-48-28.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_21-48-28.png)
    
- Disk IOPS - Read & Write
    
    **Definition -** Read/write disk IOPS.
    
    **Usage -** Display the number of read/write operations per second.
    
    **Threshold -** Not set yet.
    
    ![Screenshot from 2023-03-23 22-30-50.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_22-30-50.png)
    
- DB HTTP Request Latency -90th
    
    **Definition -** 90th percentile database latency for HTTP requests.
    
    **Usage -** Show the 90th percentile of the HTTP database request latency.
    
    **Threshold -** Not set
    
    ![Screenshot from 2023-03-23 22-32-09.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_22-32-09.png)
    
- Metric Name
    
    **Definition -** A description of the metric.
    
    **Usage -** How the metric is used and its importance to the user.
    
    **Threshold -** The upper limit of the metric for standard operation.