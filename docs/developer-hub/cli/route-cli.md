---
title: Route Commands
---

# Route (gdnsl route)

Route command group.

```bash
gdnsl route [flags]
```

**Options:**

```bash
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -h, --help                Help for route.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```

## gdnsl route list

List available routes.

```bash
gdnsl route list NAME [flags]
```

**Examples:**

```bash
  # List all routes
  gdnsl route list

  # List route 'web' in namespace 'dev'
  gdnsl route list web -n dev

  # List all routes in yaml format
  gdnsl route list -o yaml

```

**Options:**

```bash
  -r, --regions               List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -h, --help                  Help to list revisions.
      --no-headers            When using the default output format, don't print headers (default: print headers).
  -o, --output string         Output format. One of: json|yaml
```

**Options inherited:**

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
      --log-http              Log http traffic.
```

## gdnsl route describe

Describe available route.

```bash
gdnsl route describe NAME [flags]
```

**Options:**

```bash
  -r, --regions              List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -h, --help                 help to describe a route.
  -o, --output string        Output format. One of: json|yaml
```

**Options inherited:**

```bash
      --config string        gdnsl config file (default is ./gdnsl.yaml)
      --log-http             Log http traffic.
```
