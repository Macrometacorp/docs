---

title: consumer-restriction  

---


The `consumer-restriction` Plugin in Stargate allows you to manage access to Consumers, Routes, Services, or Consumer Groups by defining restrictions based on specific criteria. This enables fine-grained control over who can access your APIs.

## Attributes

| Attribute                  | Type          | Required | Default       | Valid values                                                 | Description                                                  |
|----------------------------|---------------|----------|---------------|--------------------------------------------------------------|--------------------------------------------------------------|
| `type`                     | string        | False    | consumer_name | ["consumer_name", "consumer_group_id", "service_id", "route_id"] | Defines the object type to restrict access on.              |
| `whitelist`                | array[string] | True     |               |                                                              | Specifies a list of objects to allow access. This has the highest priority. |
| `blacklist`                | array[string] | True     |               |                                                              | Specifies a list of objects to deny access. Overrides `whitelist`. |
| `rejected_code`            | integer       | False    | 403           | [200, ...]                                                   | HTTP status code returned when access is denied.            |
| `rejected_msg`             | string        | False    |               |                                                              | Custom message to return when access is denied.             |
| `allowed_by_methods`       | array[object] | False    |               |                                                              | A list of Consumers and the HTTP methods they are allowed to use. |
| `allowed_by_methods.user`  | string        | False    |               |                                                              | The username of a Consumer to allow access.                 |
| `allowed_by_methods.methods`| array[string]| False    |               | ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS", "CONNECT", "TRACE", "PURGE"] | Allowed HTTP methods for the Consumer.                     |

:::note  
### Type Attribute Details:
- `consumer_name`: Restrict access based on the username of a Consumer.
- `consumer_group_id`: Restrict access based on a Consumer Group's ID.
- `service_id`: Restrict a Consumer's access to specific Services. Must be used with an Authentication Plugin.
- `route_id`: Restrict a Consumer's access to specific Routes.  
:::

---

## Usage Examples

### Restricting by Consumer Name

This example demonstrates how to allow only specific Consumers to access a Route.

#### Step 1: Create Consumers
First, create Consumers `jack1` and `jack2` with `basic-auth` credentials:

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')

curl http://127.0.0.1:9180/api/stargate/v1/consumers -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "username": "jack1",
    "plugins": {
        "basic-auth": {
            "username":"jack2019",
            "password": "123456"
        }
    }
}'

curl http://127.0.0.1:9180/api/stargate/v1/consumers -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "username": "jack2",
    "plugins": {
        "basic-auth": {
            "username":"jack2020",
            "password": "123456"
        }
    }
}'
```

#### Step 2: Configure the Plugin on a Route
Enable the `consumer-restriction` Plugin to allow only `jack1` to access the Route:

```bash
curl http://127.0.0.1:9180/api/stargate/v1/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/index.html",
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    },
    "plugins": {
        "basic-auth": {},
        "consumer-restriction": {
            "whitelist": ["jack1"]
        }
    }
}'
```

#### Step 3: Test the Configuration
- A request from `jack1` succeeds:
  ```bash
  curl -u jack2019:123456 http://127.0.0.1:9080/index.html
  ```
  ```bash
  HTTP/1.1 200 OK
  ```
- A request from `jack2` is denied:
  ```bash
  curl -u jack2020:123456 http://127.0.0.1:9080/index.html -i
  ```
  ```bash
  HTTP/1.1 403 Forbidden
  {"message":"The consumer_name is forbidden."}
  ```

---

### Restricting by Allowed Methods

The following example restricts `jack1` to only use `POST` on a Route:

```bash
curl http://127.0.0.1:9180/api/stargate/v1/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/index.html",
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    },
    "plugins": {
        "basic-auth": {},
        "consumer-restriction": {
            "allowed_by_methods": [{
                "user": "jack1",
                "methods": ["POST"]
            }]
        }
    }
}'
```

---

## Deleting the Plugin

To remove the `consumer-restriction` Plugin, update the Route configuration and remove the Plugin’s configuration. Stargate reloads changes automatically without requiring a restart:

```bash
curl http://127.0.0.1:9180/api/stargate/v1/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/index.html",
    "plugins": {
        "basic-auth": {}
    }
}'
```
