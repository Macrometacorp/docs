---
title: Revision Commands
---

# Revision (gdnsl revision)

Get commands related to revisions.

```bash
gdnsl revision [flags]
```

**Options:**

```bash
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -h, --help                Help for revision.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```

## gdnsl revision list

List revisions for a given service.

```bash
gdnsl revision list [name] [flags]
```

**Examples:**

```bash

  # List all revisions
  gdnsl revision list

  # List revisions for a service 'svc1' in namespace 'myapp'
  gdnsl revision list -s svc1 -n myapp

  # List all revisions in JSON output format
  gdnsl revision list -o json
  
  # List revision 'web'
  gdnsl revision list web

```

**Options:**

```bash
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -h, --help                Help to list revisions.
      --no-headers          When using the default output format, don't print headers (default: print headers).
  -o, --output string       Output format. One of: json|yaml
  -s, --service string      Service name.
```

**Options inherited:**

```bash
      --config string        gdnsl config file (default is ./gdnsl.yaml)
      --log-http             Log http traffic.
```

## gdnsl revision describe

Describe revisions.

```bash
gdnsl revision describe NAME [flags]
```

**Options:**

```bash
  -r, --regions                       List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
      --allow-missing-template-keys   If true, ignore any errors in templates when a field or map key is missing in the template. 
                                      Only applies to golang and jsonpath output formats. (default true)
  -h, --help                          Help to describe a revision.
  -o, --output string                 Output format. One of: json|yaml
  -v, --verbose                       More output.
```

**Options inherited:**

```bash
      --config string                 gdnsl config file (default is ./gdnsl.yaml)
      --log-http                      Log http traffic.
```

## gdnsl revision delete

Delete a revision.

```bash
gdnsl revision delete NAME [flags]
```

**Examples:**

```bash
  # Delete a revision 'svc1-abcde' in default namespace
  gdnsl revision delete svc1-abcde

```

**Options:**

```bash
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -h, --help                Help to delete a revision.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            log http traffic
```
