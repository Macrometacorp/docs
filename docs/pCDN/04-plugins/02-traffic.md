---
title: Traffic handling
---

These pCDN plugins control API traffic and include:

- `limit-conn`: Limits the number of concurrent requests to the service.
- `limit-count`: This limits the number of requests to the service within a fixed time window. Once the time_window is exceeded, it resets the count.
- `limit-req`: This uses the leaky bucket algorithm to limit the number of requests made to the API service.
- `traffic-split`: This plugin dynamically splits and directs traffic to the various upstream services.