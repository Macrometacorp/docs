---
sidebar_position: 7
title: Function Limits and Specifications
sidebar_label: Limits and Specifications
---

This guide outlines the key limits, configurations, and performance considerations for functions in PhotonIQ. These details will help you optimize your functions for various workloads.

### Memory allocation
The maximum RAM your function can use. Each function can use up to **4 GB** of RAM. This defines the maximum working memory available during execution..

### Module size
The disk size of the function’s code, which impacts load time. There is no set limit on the module's disk size. However, larger modules may take longer to load and initialize.

### Stack depth
Functions can support up to **2,000 nested calls**, depending on their size. For example:  
  `func1 → func2 → func3 … funcN` (each function calling the next).  
  
### Concurrency
The number of functions that can run at the same time depends on the available processor threads or virtual processor resources.

### Cold start
First-time function loading typically takes under 100 milliseconds for smaller modules. Larger or more complex modules may take longer. GDN caching can be employed to reduce cold start times for complex applications.
  
### Warm start
If the function is already loaded, it executes in hundreds of microseconds. 
  - Just-In-Time (JIT): WASM Functions leverage JIT compilation for improved execution speed, with a 
slight trade-off in initial startup time..
  - Ahead-Of-Time (AOT): Reduces cold start times but uses slightly more memory.

### Execution time
The maximum execution time is configurable up to **15 minutes**, with a default limit of **30 seconds** per function call. This ensures no function runs indefinitely.

### Execution speed
WASM Functions are optimized to achieve near-native execution speeds

### Package size
The default package size of the deployed function code is **5 MB**, but it can be configured without limits. However, larger packages may increase cold start times.
