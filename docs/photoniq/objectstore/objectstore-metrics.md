---
sidebar_position: 7
title: ObjectStore Metrics
sidebar_label: ObjectStore metrics

---

ObjectStore metrics provide insights into the utilization and distribution of objects and storage across various providers and caching mechanisms. Monitoring these can help in optimizing storage costs, managing cache effectively, and ensuring efficient use of resources.

These metrics are made available through the **`/metrics`** endpoint and are formatted specifically for Prometheus, a powerful open-source monitoring and alerting toolkit.

- **os_total_buckets_count** - Total count of buckets across all providers.
- **os_total_cached_objects_count** - Total number of objects that are currently cached across all providers.
- **os_total_remote_objects_count** - Total number of objects stored remotely across all providers.
- **os_total_disk_usage** - Total bytes of disk space used by all cached objects from all providers.
- **os_aws_buckets_count** - The count of buckets specifically within the AWS provider.
- **os_aws_cached_objects_count** - The number of objects currently cached within the AWS provider.
- **os_aws_remote_objects_count** - The number of objects stored remotely within the AWS provider.
- **os_aws_disk_usage** - Amount of disk space in bytes used by cached objects from the AWS provider.
- **os_ptq_buckets_count** - The count of buckets specifically within the PhotonIQ provider.
- **os_ptq_cached_objects_count** - The number of objects currently cached within the PhotonIQ provider.
- **os_ptq_remote_objects_count** - The number of objects stored remotely within the PhotonIQ provider.
- **os_ptq_disk_usage** - Amount of disk space in bytes used by cached objects from the PhotonIQ provider.