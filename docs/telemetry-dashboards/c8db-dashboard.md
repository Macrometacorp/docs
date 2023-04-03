---
sidebar_position: 10
title: C8DB Dashboard
slug: c8db-dashboard
---

# C8DB Dashboard

## Overview:

The C8DB Dashboard is a Grafana Telemetry dashboard that displays metrics for Macrometa's C8DB service on a GDN instance. Metrics are based on selected Federation, Cluster, Tenant, GeoFabric, and Time Range. It monitors various parameters, such as region, user, and collection counts, storage sizes, requests per second, and replication rates. This dashboard helps users understand their database performance and identify potential issues by providing real-time insights into various aspects of the Macrometa GDN.

<!-- [Grafana Link](https://telemetry-paas.mm.macrometa.io/d/KTYBfHDWz/c8db?orgId=1&refresh=10s) -->

**Macrometa GDN Hierarchy Structure -** 

- Federation

    -  Cluster (Regions)

        - Tenant (Admin)

            -  Users (Child of tenant)

                - GeoFabric (Child of Admin/User)

**Please note that all metrics are displayed based on the currently selected Federation, Cluster, Tenant, GeoFabric, and Time Range.**

### Federation

- **Definition -** A Grafana variable containing the names of each federation instance in Prometheus. The names correspond to the names assigned during GDN creation. 

- **Usage -** Specify the federation metrics currently viewed on the C8DB dashboard.

- **Threshold -** N/A
    
### Cluster
    
- **Definition -** A Grafana variable containing the regions in the selected federation instance. 

- **Usage -** Specify the region metrics currently viewed on the C8DB dashboard. This is most frequently used to select a specific node within a federation. Regions can contain more than one node.

- **Threshold -** N/A
    
### Tenant
    
- **Definition -** A Grafana variable containing the tenants in the selected cluster of the federation instance. 

- **Usage -** Specify the tenant metrics currently viewed on the C8DB dashboard.

- **Threshold -** N/A
    
### Geofabric
    
- **Definition -** A Grafana variable containing the GeoFabrics in the selected tenant.

- **Usage -** Specify the tenant geofabric metrics currently viewed on the C8DB dashboard.

- **Threshold -** N/A
    
### Region Count
    
- **Definition -** The total number of regions also known as points of presence (PoPs).

- **Usage -** To verify all regions in the federation are online and sending telemetry data.

- **Threshold -** N/A

- **Example Metric**    
![Screenshot from 2023-03-23 15-13-14.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_15-13-14.png)

### Geofabric Count

- **Definition -** The number of geofabrics within the selected tenant.

- **Usage -** To track the total number of geofabrics.

- **Threshold -** N/A

- **Example Metric**
![Screenshot from 2023-03-23 15-12-43.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_15-12-43.png)

### User Count

- **Definition -** The number of user accounts within the selected tenant.

- **Usage -** To display the total number of user accounts created under the selected tenant

- **Threshold -** N/A

- **Example Metric**
![Screenshot from 2023-03-23 15-12-10.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_15-12-10.png)

### Collection Count

- **Definition -** The number of collections of all types.

- **Usage -** To display the total number of collections created.

- **Threshold -** N/A

- **Example Metric**
![Screenshot from 2023-03-23 15-11-35.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_15-11-35.png)

### Edge Collection Count

- **Definition -** The number of edge collections.

- **Usage -** To display the total number of edge collections created.

- **Threshold -** N/A

- **Example Metric**
![Screenshot from 2023-03-23 15-11-07.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_15-11-07.png)

### Index Count

- **Definition -** The number of indexes created across all collections.

- **Usage -** To display the total number of indexes, including the primary _key index added during collection creation.

- **Threshold -** N/A

- **Example Metric**
![Screenshot from 2023-03-23 15-10-36.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_15-10-36.png)

### Document Count

- **Definition -** The number of documents stored in the database across all collections.

- **Usage -** To display the total number of documents across all collections.

- **Threshold -** N/A
    
- **Example Metric**
![Screenshot from 2023-03-23 15-09-47.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_15-09-47.png)
    
### RestQL Count
    
- **Definition -** The number of query workers (RestQL) saved on the selected tenant.

- **Usage -** To display the total number of query workers available on the selected tenant.

- **Threshold -** N/A

- **Example Metric**    
![Screenshot from 2023-03-23 15-09-15.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_15-09-15.png)
    
### Streams Count
    
- **Definition -** The number of streams enabled. 

- **Usage -** To display the total number of streams that have been created on the selected tenant and region.

- **Threshold -** N/A

- **Example Metric**    
![Screenshot from 2023-03-23 15-08-32.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_15-08-32.png)
    
### DB Storage Size
    
- **Definition -** The amount of database storage in use measured in KiB, MiB, or GiB.

- **Usage -** View the mean, last, max, and min database storage displayed in KiB, MiB, or GiB. 

- **Threshold -** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 15-07-01.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_15-07-01.png)
    
### Index Storage Size
    
- **Definition -** The amount of index storage in use measured in KiB, MiB, or GiB.

- **Usage -** View the mean, last, max, and min index storage displayed in KiB, MiB, or GiB. 

- **Threshold -** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 15-06-33.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_15-06-33.png)
    
### Streams Storage Size
    
- **Definition -** The amount of stream storage in use measured in KiB, MiB, or GiB.

- **Usage -** View the mean, last, max, and min stream storage displayed in KiB, MiB, or GiB. ****

- **Threshold -** TBD

- **Example Metric**
![Screenshot from 2023-03-23 15-06-03.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_15-06-03.png)
    
### Requests per second
    
- **Definition -** The sum of READ and WRITE requests per second by geofabric.

- **Usage -** View the mean, last, max, and min requests per second, tracking READ and WRITE requests separately.

- **Threshold -** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 14-54-05.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_14-54-05.png)
    
### HTTP Read/Write Requests Count
    
- **Definition -** The count of READ and WRITE requests by region.

- **Usage -** View the mean, last, max, and min request counts tracking individual READS and WRITE by region.

- **Threshold -**  TBD

- **Example Metric**    
![Screenshot from 2023-03-23 14-53-29.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_14-53-29.png)
    
### HTTP Requests Count
    
- **Definition -** The count of GET requests and Total requests by region.

- **Usage -** View the GET requests and Total requests by region. 

- **Threshold -** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 14-52-31.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_14-52-31.png)
    
### Transfer size per second
    
- **Definition -** The amount of data transferred per second separated by requests and responses requests measured in KiB. 

- **Usage -** View the min, max, avg, and last amounts of data measured in  KiB.

- **Threshold -** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 14-51-17.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_14-51-17.png)
    
### Transfer size
    
- **Definition -** The sum of data transferred by HTTP requests and responses measured in KB, MB, or GB.

- **Usage -** View the min, max, avg, and current size of data transferred by HTTP requests and responses.

- **Threshold -** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 14-50-36.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_14-50-36.png)
    
### Storage read latency per second (Distribution)
    
- **Definition -** Time it take to read data in KB per second

- **Usage -** View the read latency to see read bottleneck issue if value is too high

- **Threshold -** TBD
    
- **Example Metric**
![Screenshot from 2023-03-23 14-46-55.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_14-46-55.png)
    
### Storage write latency per second (Distribution)
    
- **Definition -** Time it take to write data in Kb per second

- **Usage -** View the write latency to see write bottleneck issue if value is too high

- **Threshold -** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 14-38-34.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_14-38-34.png)
    
### HTTP request size per second (Distribution)
    
- **Definition -** Data size of request in Kb per second

- **Usage -** View of the data request query load per second

- **Threshold -** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 14-36-40.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_14-36-40.png)
    
### HTTP response size per second (Distribution)
    
- **Definition -** Data size of response in Kb per second

- **Usage -** View of the data size response in Kb per second 

- **Threshold -** TBD
    
- **Example Metric**
![Screenshot from 2023-03-23 14-35-15.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_14-35-15.png)
    
### Database Replication Backlog
    
- **Definition -** The amount of document a specific region need to replicate locally.

- **Usage -** Show how far being a specific node is in respect to it peers node.

- **Threshold -** TBD
    
- **Example Metric**
![Screenshot from 2023-03-23 14-34-09.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_14-34-09.png)
    
### Database Replication Throughput In
    
- **Definition -** The amount of document coming in to the nodes from other node in a federation

- **Usage -** Show the load of data being copied to the nodes from other nodes in the federation

- **Threshold -** TBD
    
- **Example Metric**
![Screenshot from 2023-03-23 14-08-36.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_14-08-36.png)
    
### Database Replication Throughput Out
    
- **Definition -** The amount of document going out from the node to other node in the federation

- **Usage -** Show the load of data being copied out of the node to other node in the federation

- **Threshold -** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 14-31-18.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_14-31-18.png)
    
### Database Replication Rate In
    
- **Definition -** The speed in which document are being copied in a node within a federation

- **Usage -** Show the speed in which document are being copied

- **Threshold -** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 14-08-02.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_14-08-02.png)
    
### Database Replication Rate Out
    
- **Definition -** Speed in which document are being send to another node within a federation

- **Usage -** Show the speed in which documents are being sent to other nodes to be copied

- **Threshold -** TBD

- **Example Metric**    
![Screenshot from 2023-03-23 14-07-21.png](/../static/img/telemetry-dashboards/c8db-imgs/Screenshot_from_2023-03-23_14-07-21.png)