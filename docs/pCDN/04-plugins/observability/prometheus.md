---
title: prometheus  
---


The `prometheus` Plugin enables you to export metrics from Stargate in [Prometheus exposition format](https://prometheus.io/docs/instrumenting/exposition_formats/#exposition-formats), providing insights into your API Gateway's performance and health.



## Attributes

| Name        | Type    | Required | Default | Description                                                                 |
|-------------|---------|----------|---------|-----------------------------------------------------------------------------|
| `prefer_name` | boolean | False    | false   | Displays Route/Service names instead of IDs in Prometheus metrics when set to `true`. |

---

### Configuring the Export URI

The export URI for metrics can be customized in the `plugin_attr` section of your `conf/config.yaml` file.

| Name       | Type   | Default                          | Description                              |
|------------|--------|----------------------------------|------------------------------------------|
| `export_uri` | string | `/api/stargate/v1/metrics`      | URI for exporting Prometheus metrics.    |

**Example Configuration**:  

```yaml
plugin_attr:
  prometheus:
    export_uri: /api/stargate/v1/metrics
```



### Configuring `metrics` and `default_buckets`

- **Custom Labels**: You can add extra labels to HTTP-related metrics like `http_status`, `http_latency`, and `bandwidth`. Labels must correspond to Stargate variables.  

**Example Configuration**:  

```yaml
plugin_attr:
  prometheus:
    metrics:
      http_status:
        extra_labels:
          - upstream_addr: $upstream_addr
          - upstream_status: $upstream_status
```

- **Custom Latency Buckets**: Modify the default latency buckets for `http_latency` metrics.

**Example Configuration**:  

```yaml
plugin_attr:
  prometheus:
    default_buckets:
      - 10
      - 50
      - 100
      - 200
      - 500
```



## Metrics Endpoint

By default, metrics are exposed at `/api/stargate/v1/metrics`. You can configure the export address and port in the `conf/config.yaml` file:

```yaml
plugin_attr:
  prometheus:
    export_addr:
      ip: 127.0.0.1
      port: 9092
```

To expose metrics on the data plane port (default: `9080`), disable the Prometheus export server:

```yaml
plugin_attr:
  prometheus:
    enable_export_server: false
```



## Enable Plugin

Enable the `prometheus` Plugin on a specific Route:

```bash
curl http://127.0.0.1:9180/api/stargate/v1/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/hello",
    "plugins": {
        "prometheus":{}
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:80": 1
        }
    }
}'
```

:::note  
If `prefer_name` is enabled, ensure Route/Service names are unique to avoid confusion in metrics.  
:::



## Fetching Metrics

To fetch metrics, use the configured URI (default: `/api/stargate/v1/metrics`):

```bash
curl -i http://127.0.0.1:9092/api/stargate/v1/metrics
```

Add this address to your Prometheus scrape configuration:

```yaml
scrape_configs:
  - job_name: "stargate"
    scrape_interval: 15s
    metrics_path: "/api/stargate/v1/metrics"
    static_configs:
      - targets: ["127.0.0.1:9092"]
```


## Metrics Overview

### Available Metrics

1. **HTTP Metrics**:
   - Status codes (`http_status`)
   - Bandwidth (`bandwidth`)
   - Latency (`http_latency`)

2. **System Metrics**:
   - Nginx connections (active, reading, writing)
   - Upstream health check status
   - etcd reachability
   - Shared dict capacity and usage
   - Stargate node information


## Using Grafana for Visualization

You can visualize Prometheus metrics in Grafana using the prebuilt dashboard available [here](https://grafana.com/grafana/dashboards/11719).  


## Enable Metrics for TCP/UDP

To enable Prometheus metrics for TCP/UDP, ensure the `prometheus` Plugin is listed under `stream_plugins` in your configuration file:

```yaml
stream_plugins:
  - prometheus
```

Then configure the Plugin on a stream route:

```bash
curl http://127.0.0.1:9180/api/stargate/v1/stream_routes/1 -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "plugins": {
        "prometheus":{}
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:80": 1
        }
    }
}'
```


## Delete Plugin

To remove the `prometheus` Plugin, delete its configuration:

```bash
curl http://127.0.0.1:9180/api/stargate/v1/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/hello",
    "plugins": {},
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:80": 1
        }
    }
}'
```

