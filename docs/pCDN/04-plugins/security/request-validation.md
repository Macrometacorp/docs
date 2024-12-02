---

title: request-validation  
---

## Description

The `request-validation` Plugin validates incoming requests before they are forwarded to the Upstream service. This Plugin leverages [JSON Schema](https://github.com/api7/jsonschema) to enforce validation rules on headers and body content.

---

## Attributes

| Name          | Type    | Required | Default | Valid values  | Description                                       |
|---------------|---------|----------|---------|---------------|---------------------------------------------------|
| `header_schema` | object  | False    |         |               | Defines schema validation for request headers.    |
| `body_schema`   | object  | False    |         |               | Defines schema validation for the request body.   |
| `rejected_code` | integer | False    | 400     | [200,...,599] | HTTP status code to return when validation fails. |
| `rejected_msg`  | string  | False    |         |               | Custom message to return when validation fails.   |

:::note  
At least one of `header_schema` or `body_schema` must be specified.  
:::

---

## Enable Plugin

You can enable the `request-validation` Plugin on a Route as shown below.

### Step 1: Retrieve the Admin Key  
Retrieve the `admin_key` from `config.yaml` and save it as an environment variable:

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

### Step 2: Configure the Plugin  
Enable the Plugin with a sample schema for body validation:

```bash
curl http://127.0.0.1:9180/api/stargate/v1/routes/5 \
-H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/get",
    "plugins": {
        "request-validation": {
            "body_schema": {
                "type": "object",
                "required": ["required_payload"],
                "properties": {
                    "required_payload": {"type": "string"},
                    "boolean_payload": {"type": "boolean"}
                }
            },
            "rejected_msg": "Custom rejection message"
        }
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:8080": 1
        }
    }
}'
```

---

## Example Scenarios

### Enum Validation
Define a schema to validate specific string values:

```json
{
    "body_schema": {
        "type": "object",
        "required": ["enum_payload"],
        "properties": {
            "enum_payload": {
                "type": "string",
                "enum": ["value1", "value2"],
                "default": "value1"
            }
        }
    }
}
```

### Header Validation
Define a schema to validate request headers, such as enforcing `Content-Type`:

```json
{
    "header_schema": {
        "type": "object",
        "required": ["Content-Type"],
        "properties": {
            "Content-Type": {
                "type": "string",
                "pattern": "^application/json$"
            }
        }
    }
}
```

### Regular Expression Validation
Define a schema to validate string patterns:

```json
{
    "body_schema": {
        "type": "object",
        "required": ["regex_payload"],
        "properties": {
            "regex_payload": {
                "type": "string",
                "minLength": 1,
                "maxLength": 32,
                "pattern": "^[a-zA-Z0-9_]+$"
            }
        }
    }
}
```

### Array Validation
Define a schema to validate arrays with unique integer values:

```json
{
    "body_schema": {
        "type": "object",
        "required": ["array_payload"],
        "properties": {
            "array_payload": {
                "type": "array",
                "minItems": 1,
                "items": {
                    "type": "integer",
                    "minimum": 200,
                    "maximum": 599
                },
                "uniqueItems": true,
                "default": [200, 302]
            }
        }
    }
}
```

---

## Example Usage

After configuring the Plugin, valid requests are forwarded to the Upstream service, while invalid ones are rejected.  

**Valid Request Example**:

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"required_payload":"hello","boolean_payload":true}' \
  http://127.0.0.1:9080/get
```

**Invalid Request Example**:  
If `required_payload` is missing, the request is rejected with the configured status code and message:

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"boolean_payload":true}' \
  http://127.0.0.1:9080/get
```

---

## Delete Plugin

To remove the `request-validation` Plugin, delete its configuration. Stargate reloads changes automatically without requiring a restart:

```bash
curl http://127.0.0.1:9180/api/stargate/v1/routes/5 \
-H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/get",
    "plugins": {},
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:8080": 1
        }
    }
}'
```