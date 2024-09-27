---
sidebar_position: 4
title: Configuring Functions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Depending on the language/framework used, all PhotonIQ functions come with a `photoniq.toml` file when they are created. The `photoniq.toml` file allows you to customize the behavior of your functions by configuring settings such as CORS, logging,  metadata, resource limits, and environment variables.

The following table provides a detailed explanation of the fields available in the `photoniq.toml` file for configuring Rust, JavaScript and Next.js functions:



<Tabs groupId="languages">

<TabItem value="rust/js" label="Rust/Javascript">

```toml title='photoniq.toml'
name = "TheFunctionName"
version = "0.0.1"
description = "A description for your function"
lang = "rust"
#execute_url_suffix = "optional_url_suffix_to_execute_function"

[cors_settings]
allowed_methods = ["GET","POST"]
allowed_hosts = ["petstore.swagger.io"]
allow_http = true

[log_settings]
enabled = true
level = "INFO"

[env_vars]
MESSAGE = "Hello 👋! This message comes from an environment variable"

```

The table below describes the configuration options in the the `photoniq.toml`:

| Field                          | Description                                                                |
|--------------------------------|----------------------------------------------------------------------------|
| `name`                         | The name of the function.                                                  |
| `version`                      | The version of the function.                                               |
| `description`                  | A brief description of the function.                                       |
| `lang`                         | The programming language used for the function, in this case, `rust` or `js`.     |
| `execute_url_suffix`           | Customizes the [function execution endpoint](https://www.macrometa.com/docs/apiFaas#/operations/handle_latest_mm_execute). For example, setting `execute_url_suffix = "/my/path/suffix"` allows the function to be executed via `/my/path/suffix/myFunction` instead of the default `/api/faas/v1/execute/myFunction`, like an alias.                      |
| **`[cors_settings]`**          | **Configuration settings for Cross-Origin Resource Sharing (CORS).**       |
| `cors_settings.allowed_methods`| HTTP methods allowed for CORS.                                             |
| `cors_settings.allowed_hosts`  | Hosts allowed to access the function.                                      |
| `cors_settings.allow_http`     | Boolean indicating if HTTP is allowed.                                     |
| **`[log_settings]`**           | **Configuration settings for logging.**                                    |
| `log_settings.enabled`         | Boolean indicating if logging is enabled.  Refer to [Log levels](#log-levels)|
| **`[env_vars]`**               | **Environment variables used by the function.**                            |
| `env_vars.MESSAGE`             | An environment variable containing a message.                              |


### Log levels

The `log_settings.level` defines the granularity of the logs that will be displayed. The following log levels are available, in order of priority from the most restrictive to the most permissive:

- ERROR
- WARN
- INFO
- DEBUG
- TRACE

The log level you select determines what messages will be shown. If you set the log level to `INFO`, only messages with levels `INFO`, `WARN`, and `ERROR` will be displayed. Messages with `DEBUG` or `TRACE` will be ignored, even if they exist in the code.

</TabItem>

<TabItem value="nextjs" label="Next.js">

```toml title='photoniq.toml'

name = "{{function_name}}"
version = "0.0.1"
description = "Description for function {{function_name}}"
lang = "nextjs"

[resource_settings]
# CPU units: 1 CPU unit is equivalent to 1 physical CPU core, or 1 virtual core. 
#            You can use decimal values like "0.1" (10% of 1 core) knowing that 
#            the minimal value is "0.001". To prevent writing wrong decimal values, 
#            you can use the "m" notation for millicores, for example, "0.1" is 
#            equivalent to "100m", or even setting "2" which is equivalent to "2000m".
cpu="1000m"

# Mem units: limits for memory are measured in bytes. You can express memory as a 
#            plain integer (without suffix) or as a fixed-point number using one of 
#            these quantity suffixes: E, P, T, G, M, k. You can also use the power-of-two 
#            (MebiBytes) equivalents: Ei, Pi, Ti, Gi, Mi, Ki. For example, the following 
#            represent roughly the same value: 128974848, 129e6, 129M,  128974848000m, 123Mi
mem="200M"


```


| Field                          | Description                                                                |
|---------------------------------|----------------------------------------------------------------------------|
| `name`                         | The name of the function.                                                  |
| `version`                      | The version of the function.                                               |
| `description`                  | A brief description of the function.                                       |
| `lang`                         | The programming language used for the function, in this case, `nextjs`.     |
| **`[resource_settings]`**       | **Configuration for CPU and memory resources allocated to the function.**   |
| `resource_settings.cpu`        | The CPU allocation for the function. |
| `resource_settings.mem`        | The memory allocation for the function.|


</TabItem>
</Tabs>



