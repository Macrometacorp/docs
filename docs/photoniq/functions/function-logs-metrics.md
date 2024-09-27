---
sidebar_position: 7
title: Functions Logs and Metrics
sidebar_label: Log and Metrics
---

## Logs

Logs are a key resource for monitoring, debugging, and optimizing your functions. They provide insights into function execution, errors, and performance, allowing you to maintain and improve your application’s reliability.

You can access logs through the CLI using:

```bash
faas remote logs <function-name> <function-version>
```

For more granular control, the [Retrieve Function Log API](https://www.macrometa.com/docs/apiFaas#/operations/handle_mm_logs) allows you to filter logs by time period, log level, region, and other parameters, giving you flexibility to focus on the data that matters most.

### Log levels

The `log_settings.level` setting in the `photoniq.toml` file defines the granularity of the logs that will be displayed. The following log levels are available, in order of priority from the most restrictive to the most permissive:

- ERROR
- WARN
- INFO
- DEBUG
- TRACE

The log level you select determines what messages will be shown. If you set the log level to `INFO`, only messages with levels `INFO`, `WARN`, and `ERROR` will be displayed. Messages with `DEBUG` or `TRACE` will be ignored, even if they exist in the code.


## Usage metrics

Monitoring usage metrics is vital for tracking performance and resource utilization of your functions. This data helps you to understand how your functions are performing, to optimize their efficiency, and to troubleshoot potential bottlenecks.

Metrics are currently available for Rust and JS functions via the [Usage Metrics API](https://www.macrometa.com/docs/apiFaas#/operations/handle_mm_metrics), providing detailed statistics such as:

- **`bytes_downloaded`**: The amount of data downloaded by the function.
- **`bytes_uploaded`**: The amount of data uploaded.
- **`errors_count`**: The total number of errors encountered during execution.
- **`requests_count`**: The number of requests the function has processed.

Metrics can be viewed for individual functions or aggregated across all functions. This visibility helps in capacity planning, detecting trends, and improving overall function performance.