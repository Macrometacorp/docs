# Executive Dashboard

## Overview:

The Executive dashboard contains a collection of metrics to display the overall health and operational status of an instance of the Global Data Network. More detailed dashboards for C8DB service and Prometheus Node System Health metrics are available.

<!-- [Grafana link](https://telemetry-paas.mm.macrometa.io/d/exodashboard/executive-dashboard?orgId=1) -->

### Global Hosts
    
- **Definition** The total number of host systems in the cluster.
    
- **Usage** Displays the number of virtual machines or physical servers that are currently running and contributing to the cluster.
    
- **Threshold** N/A

- **Example Metric**
![Screenshot from 2023-03-23 15-16-24.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_15-16-24.png)
    
### Top 5 memory usage
    
- **Definition** The top 5 servers with the highest memory utilization.
    
- **Usage** Monitor the server memory footprint with the highest usage.
    
- **Threshold** TBD

- **Example Metric**
![Screenshot from 2023-03-23 15-17-22.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_15-17-22.png)
    
### Top 5 Read/ Write request
    
- **Definition** The top 5 servers based on the total number of combined read and write requests per second.
    
- **Usage** Monitor the volume of read and write requests for the servers with the highest request rate. 
    
- **Threshold** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 15-23-35.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_15-23-35.png)
    
### Top 5 DB HTTP Request Latency 90th.
    
- **Definition** The 90th percentile of the latency for read and write requests, measured in milliseconds.
    
- **Usage** Displays the amount of time it took to complete the slowest 10% of read and write requests.
    
- **Threshold** Not set yet

- **Example Metric**    
![Screenshot from 2023-03-23 15-46-42.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_15-46-42.png)

<!-- ### Availability SLA
    
- **Definition** Service Level Agreement
    
- **Usage** Show the API availability over time.
    
- **Threshold** 99.99%

- **Example Metric**    
![Screenshot from 2023-03-23 15-34-28.png](/../static/img/telemetry-dashboards/executive-imgs//Screenshot_from_2023-03-23_15-34-28.png) -->
    
### Server error rate 5xx
    
- **Definition** The rate at which 5xx errors occur on the server.
    
- **Usage** Displays the percentage of requests that result in 5xx errors, which indicate server-side issues. A value of 100% means that there were no 5xx errors.
    
- **Threshold** 99.99

- **Example Metric**    
![Screenshot from 2023-03-23 16-40-04.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_16-40-04.png)
    
### Client errors rate 4xx
    
- **Definition** The rate of 4xx errors that occur on the client side.
    
- **Usage** Displays the percentage of requests that result in 4xx errors, which indicate client-side issues such as incorrect requests or unauthorized access. A value of 100% means that there were no 4xx errors.
    
- **Threshold** 99.99%

- **Example Metric**    
![Screenshot from 2023-03-23 17-13-47.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_17-13-47.png)
    
### 5xx
    
- **Definition** 5xx HTTP response code
    
- **Usage** Display the 5xx HTTP response code of the application.
    
- **Threshold** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 19-07-23.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_19-07-23.png)
    
### 4xx
    
- **Definition** 4xx HTTP response code
    
- **Usage** Show the 4xx HTTP response code of the application
    
- **Threshold** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 19-08-08.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_19-08-08.png)
    
### 3xx
    
- **Definition** 3xx HTTP response code
    
- **Usage** Show the 3xx HTTP response code of the application
    
- **Threshold** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 19-11-23.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_19-11-23.png)
    
### 2xx
    
- **Definition** 2xx HTTP response code
    
- **Usage** Show the 2xx HTTP response code of the application
    
- **Threshold** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 19-38-38.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_19-38-38.png)
    
### 1xx
    
- **Definition** 1xx HTTP response code
    
- **Usage** Show the 1xx HTTP response code of the application
    
- **Threshold** TBD
    
- **Example Metric**
![Screenshot from 2023-03-23 19-22-53.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_19-22-53.png)
    
### Memory used
    
- **Definition** The amount of memory that is currently being used by the server.
    
- **Usage** Displays the current memory utilization of the server.
    
- **Threshold** 80% memory utilization

- **Example Metric**    
![Screenshot from 2023-03-23 19-50-05.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_19-50-05.png)
    
### CPU Usage/Sec
    
- **Definition** The amount of CPU resources being used by the application on the server.
    
- **Usage** Displays the current CPU utilization of the server, measured in seconds..
    
- **Threshold** 95% CPU utilization

- **Example Metric**    
![Screenshot from 2023-03-23 19-55-57.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_19-55-57.png)
    
### DB Total requests per second
    
- **Definition** The sum of read and write requests processed by the database over HTTP.
    
- **Usage** Displays the total number of HTTP requests received and sent by the database per second.
    
- **Threshold** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 20-54-02.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_20-54-02.png)
    
### Read / Write requests per second
    
- **Definition** The total number of read and write requests processed by the system over a specific time period.
    
- **Usage** Displays the number of read and write requests processed by each node per second.
    
- **Threshold** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 21-28-51.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_21-28-51.png)
    
### DB HTTP Request Latency
    
- **Definition** The duration of time it takes to complete a single HTTP request to the database.
    
- **Usage** Displays the latency of database requests.
    
- **Threshold** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 21-34-24.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_21-34-24.png)
    
### DB Data Ingress/Egress
    
- **Definition** The amount of incoming and outgoing data traffic processed by the database, per node.
    
- **Usage** Displays the volume of data being transferred into and out of the database.
    
- **Threshold** TBD
    
- **Example Metric**
![Screenshot from 2023-03-23 21-48-28.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_21-48-28.png)
    
### Disk IOPS ### Read & Write
    
- **Definition** The number of disk input/output operations, including both read and write operations, per second.
    
- **Usage** Displays the number of disk read and write operations that are performed per second.
    
- **Threshold** TBD
    
- **Example Metric**
![Screenshot from 2023-03-23 22-30-50.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_22-30-50.png)
    
### DB HTTP Request Latency -90th
    
- **Definition** The 90th percentile of the latency for HTTP database requests, representing the slowest 10% of requests.
    
- **Usage** Displays the 90th percentile of the latency for HTTP requests to the database.

- **Threshold** TBD
    
- **Example Metric**
![Screenshot from 2023-03-23 22-32-09.png](/../static/img/telemetry-dashboards/executive-imgs/Screenshot_from_2023-03-23_22-32-09.png)