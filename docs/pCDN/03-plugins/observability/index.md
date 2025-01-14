---
title: Observability
---

An API gateway acts as the control centre for directing and controlling all forms of incoming traffic upstream. Continuous observation and monitoring this centre provides valuable insight into the health and performance of your APIs. pCDN achieves this by combining the following:

- **Prometheus:** Use Prometheus to collect, aggregate, and expose metrics from the different components.
- **Alert management:** Set up alerts for critical events or exceeded thresholds and integrating these alerting systems with notification systems like email and slack.
- **Metrics:** Evaluate cache metrics like cache hit rates misses, responses, and errors and network metrics like latency and bandwidth usage to evaluate the health and performance of your APIs
- **Reporting:** Visualize health and metrics reports with dashboards to improve understanding of logs and metrics.  Automate reporting for generating periodic reports that inform on trends overtime.

pCDN employs the `hhtp-logger` and `prometheus` plugin for observability. 

- `http-logger`: This plugin collects log data and pushes them to HTTP servers or monitoring tools as JSON objects.
- `prometheus`: This plugin exports metrics collected via logs into Prometheus format. 