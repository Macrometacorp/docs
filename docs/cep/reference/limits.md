---
sidebar_position: 13
---

# Limits

You can add stream worker limits to protect your tenants from service downtime caused by abnormal race conditions and CPU usage in stream worker code. These limits are disabled by default.

The following limits are available for stream workers:

* `maxPublishedWorkers`: If the specified number of stream workers is exceeded, this limit prevents further stream workers from publishing. This limit only applies at the time of publishing.
* `maxMemoryMBPerWorker`: Restricts memory usage per stream worker by MB. Uses `c8cep_app_memory` metrics.
* `maxWorkersMemoryMB`: Restricts memory usage for all stream workers in the tenant by MB. Uses `c8cep_app_memory_tenant` metrics.
* `maxWorkersCpuSecondsPerMinute`: Restricts CPU usage for all stream workers in the tenant by number of seconds. Uses `c8cep_app_cpu_tenant_total` metrics.
* `maxWorkersThroughputInMBPerMinute`: Restricts incoming throughput by MB. Uses `c8cep_app_throughput_in_tenant_total` metrics.
* `maxWorkersThroughputOutMBPerMinute`: Restricts outgoing throughput by MB. Uses `c8cep_app_throughput_out_tenant_total` metrics.

If any set limits are breached, the stream worker is immediately unpublished.

To set or change stream worker limits:

1. Log into an administrator account in the `_system` GeoFabric.
2. Click **TENANTS** and select the **Platform Limits** tab to access the limit options.
3. In the **Limits** drop-down box, select **CEP**.
4. Update the values and click **Update Limits** to confirm changes.