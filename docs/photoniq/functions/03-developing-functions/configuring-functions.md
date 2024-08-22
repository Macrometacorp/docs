---
sidebar_position: 5
title: Configuring Functions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `photoniq.toml` file allows you to configure settings such as CORS, logs, and environment variables for your functions, enabling function-specific customizations.

Here is an example of the default `photoniq.toml` file:


```toml title='photoniq.toml'

name = "testRustfunction"
version = "0.0.1"
description = "Description for function testRustfunction"
lang = "rust"
#execute_url_suffix = "optional_url_suffix_to_execute_function"

[cors_settings]
allowed_methods = ["GET","POST"]
allowed_hosts = ["macrometa.com"]
allow_http = true

[log_settings]
enabled = true
level = "INFO"

[env_vars]
MESSAGE = "Hello 👋! This message comes from an environment variable"
```

The table below describes the settings in the the `photonIQ.toml`:

| Field                          | Description                                                                |
|--------------------------------|----------------------------------------------------------------------------|
| `name`                         | The name of the function.                                                  |
| `version`                      | The version of the function.                                               |
| `description`                  | A brief description of the function.                                       |
| `lang`                         | The programming language used to write the function.                       |
| `execute_url_suffix`           | An optional URL suffix used to execute the function.                       |
| **`[cors_settings]`**          | **Configuration settings for Cross-Origin Resource Sharing (CORS).**       |
| `cors_settings.allowed_methods`| HTTP methods allowed for CORS.                                             |
| `cors_settings.allowed_hosts`  | Hosts allowed to access the function.                                      |
| `cors_settings.allow_http`     | Boolean indicating if HTTP is allowed.                                     |
| **`[log_settings]`**           | **Configuration settings for logging.**                                    |
| `log_settings.enabled`         | Boolean indicating if logging is enabled.                                  |
| `log_settings.level`           | The log level (e.g., INFO, DEBUG).                                         |
| **`[env_vars]`**               | **Environment variables used by the function.**                            |
| `env_vars.MESSAGE`             | An environment variable containing a message.                              |

