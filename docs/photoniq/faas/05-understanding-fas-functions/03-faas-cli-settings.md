---
sidebar_position: 11
title: Configuring FaaS
---

Creating a functions file also creates a settings file called photoniq.toml. This file allows you to configure fields like cors and log settings for your functions, thus allowing function-specific customizations. 

Here is an example of this `photonIQ.toml` file:
```toml
name = "testFunction"
version = "0.0.1"
description = "Description for function testFunction"
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

Here is a table explaining all the fields:

| Field                         | Description                                                                |
|-------------------------------|----------------------------------------------------------------------------|
| `name`                        | The name of the function.                                                  |
| `version`                     | The version of the function.                                               |
| `description`                 | A brief description of the function.                                       |
| `lang`                        | The programming language used to write the function.                       |
| `execute_url_suffix`          | An optional URL suffix used to execute the function.                       |
| **`cors_settings`**           | **Configuration settings for Cross-Origin Resource Sharing (CORS).**       |
| `cors_settings.allowed_methods` | HTTP methods allowed for CORS.                                            |
| `cors_settings.allowed_hosts`  | Hosts allowed to access the function.                                       |
| `cors_settings.allow_http`     | Boolean indicating if HTTP is allowed.                                      |
| **`log_settings`**            | **Configuration settings for logging.**                                    |
| `log_settings.enabled`        | Boolean indicating if logging is enabled.                                  |
| `log_settings.level`          | The log level (e.g., INFO, DEBUG).                                         |
| **`env_vars`**                | **Environment variables used by the function.**                            |
| `env_vars.MESSAGE`            | An environment variable containing a message.                              |