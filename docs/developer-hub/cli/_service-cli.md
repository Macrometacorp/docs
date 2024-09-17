---
title: Service Commands
---

# Service (gdnsl service)

Service command group.

```bash
gdnsl service [flags]
```

**Options:**

```bash
  -h, --help                Help for service.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```

## gdnsl service create

Create a service.

```bash
gdnsl service create NAME --image IMAGE [flags]
```

**Examples:**

```bash

  # Create a service 'mysvc' using image at dev.local/ns/image:latest
  gdnsl service create mysvc --image dev.local/ns/image:latest

  # Create a service with multiple environment variables
  gdnsl service create mysvc --env KEY1=VALUE1 --env KEY2=VALUE2 --image dev.local/ns/image:latest

  # Create or replace a service 's1' with image dev.local/ns/image:v2 using --force flag
  # if service 's1' doesn't exist, it's just a normal create operation
  gdnsl service create --force s1 --image dev.local/ns/image:v2

  # Create or replace environment variables of service 's1' using --force flag
  gdnsl service create --force s1 --env KEY1=NEW_VALUE1 --env NEW_KEY2=NEW_VALUE2 --image dev.local/ns/image:v1

  # Create service 'mysvc' with port 80
  gdnsl service create mysvc --port 80 --image dev.local/ns/image:latest

  # Create or replace default resources of a service 's1' using --force flag
  # (earlier configured resource requests and limits will be replaced with default)
  # (earlier configured environment variables will be cleared too if any)
  gdnsl service create --force s1 --image dev.local/ns/image:v1

  # Create a service with annotation
  gdnsl service create s1 --image dev.local/ns/image:v3 --annotation sidecar.istio.io/inject=false

```

**Options:**

```bash
  -r, --regions                  List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
      --annotation stringArray   Service annotation to set. name=value; you may provide this flag any number of times to set multiple annotations.
                                 To unset, specify the annotation name followed by a "-" (e.g., name-).
      --async                    Create service and don't wait for it to become ready.
      --concurrency-limit int    Hard Limit of concurrent requests to be processed by a single replica.
      --concurrency-target int   Recommendation for when to scale up based on the concurrent number of incoming request. Defaults to --concurrency-limit when given.
  -e, --env stringArray          Environment variable to set. NAME=value; you may provide this flag any number of times to set multiple environment variables. 
                                 To unset, specify the environment variable name followed by a "-" (e.g., NAME-).
      --env-from stringArray     Add environment variables from a ConfigMap (prefix cm: or config-map:) or a Secret (prefix secret:). 
                                 Example: --env-from cm:myconfigmap or --env-from secret:mysecret. You can use this flag multiple times. To unset a ConfigMap/Secret reference, append "-" to the name, e.g. --env-from cm:myconfigmap-.

      --force                    Create service forcefully, replaces existing service if any.
  -h, --help                     Help to create a service.
      --image string             Image to run.
  -l, --label stringArray        Service label to set. name=value; you may provide this flag any number of times to set multiple labels. 
                                 To unset, specify the label name followed by a "-" (e.g., name-).
      --limits-cpu string        The limits on the requested CPU (e.g., 1000m).
      --limits-memory string     The limits on the requested memory (e.g., 1024Mi).
      --lock-to-digest           keep the running image for the service constant when not explicitly specifying the image.
                                 (--no-lock-to-digest pulls the image tag afresh with each new revision) (default true)
      --max-scale int            Maximal number of replicas.
      --min-scale int            Minimal number of replicas.
      --mount stringArray        Mount a ConfigMap (prefix cm: or config-map:), a Secret (prefix secret: or sc:), or an existing Volume (without any prefix) on the specified directory. Example: --mount /mydir=cm:myconfigmap, --mount /mydir=secret:mysecret, or --mount /mydir=myvolume. When a configmap or a secret is specified, a corresponding volume is automatically generated. You can use this flag multiple times. For unmounting a directory, append "-", e.g. --mount /mydir-, which also removes any auto-generated volume.

      --no-lock-to-digest        Do not keep the running image for the service constant when not explicitly specifying the image. 
                                 (--no-lock-to-digest pulls the image tag afresh with each new revision)
  -p, --port int32               The port where application listens on.
      --requests-cpu string      The requested CPU (e.g., 250m).
      --requests-memory string   The requested memory (e.g., 64Mi).
      --revision-name string     The revision name to set. Must start with the service name and a dash as a prefix. Empty revision name will result in the server generating a name for the revision. Accepts golang templates, allowing {{.Service}} for the service name, {{.Generation}} for the generation, and {{.Random [n]}} for n random consonants. (default "{{.Service}}-{{.Random 5}}-{{.Generation}}")

      --service-account string   Service account name to set. Empty service account name will result to clear the service account.
      --volume stringArray       Add a volume from a ConfigMap (prefix cm: or config-map:) or a Secret (prefix secret: or sc:). 
                                 Example: --volume myvolume=cm:myconfigmap or --volume myvolume=secret:mysecret. You can use this flag multiple times. To unset a ConfigMap/Secret reference, append "-" to the name, e.g. --volume myvolume-.
      --wait-timeout int         Seconds to wait before giving up on waiting for service to be ready. (default 600)
```

**Options inherited:**

```bash
      --config string           gdnsl config file (default is ./gdnsl.yaml)
      --log-http                Log http traffic.
```

## gdnsl service list

List available services.

```bash
gdnsl service list [name] [flags]
```

**Examples:**

```bash
  # List all services
  gdnsl service list

  # List all services in JSON output format
  gdnsl service list -o json

  # List service 'web'
  gdnsl service list web

```

**Options:**

```bash
  -r, --regions              List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -h, --help                 Help for list.
      --no-headers           When using the default output format, don't print headers (default: print headers).
  -o, --output string        Output format. One of: json|yaml|.
```

**Options inherited:**

```bash
      --config string        gdnsl config file (default is ./gdnsl.yaml)
      --log-http             Log http traffic.
```

## gdnsl service describe

Show details for a given service.

```bash
gdnsl service describe NAME [flags]
```

**Options:**

```bash
  -r, --regions                       List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
      --allow-missing-template-keys   If true, ignore any errors in templates when a field or map key is missing in the template.
                                      Only applies to golang and jsonpath output formats. (default true)
  -h, --help                          Help to describe a serice.
  -o, --output string                 Output format. One of: json|yaml
  -v, --verbose                       More output.
```

**Options inherited:**

```
      --config string                 gdnsl config file (default is ./gdnsl.yaml)
      --log-http                      Log http traffic.
```

## gdnsl service update

Update a service.

```bash
gdnsl service update NAME [flags]
```

**Examples:**

```bash

  # Updates a service 'svc' with new environment variables
  gdnsl service update svc --env KEY1=VALUE1 --env KEY2=VALUE2

  # Update a service 'svc' with new port
  gdnsl service update svc --port 80

  # Updates a service 'svc' with new requests and limits parameters
  gdnsl service update svc --requests-cpu 500m --limits-memory 1024Mi

  # Assign tag 'latest' and 'stable' to revisions 'echo-v2' and 'echo-v1' respectively
  gdnsl service update svc --tag echo-v2=latest --tag echo-v1=stable
  OR
  gdnsl service update svc --tag echo-v2=latest,echo-v1=stable

  # Update tag from 'testing' to 'staging' for latest ready revision of service
  gdnsl service update svc --untag testing --tag @latest=staging

  # Add tag 'test' to echo-v3 revision with 10% traffic and rest to latest ready revision of service
  gdnsl service update svc --tag echo-v3=test --traffic test=10,@latest=90

```

**Options:**

```bash
  -r, --regions                  List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
      --annotation stringArray   Service annotation to set. name=value; you may provide this flag any number of times to set multiple annotations. 
                                 To unset, specify the annotation name followed by a "-" (e.g., name-).
      --async                    Update service and don't wait for it to become ready.
      --concurrency-limit int    Hard Limit of concurrent requests to be processed by a single replica.
      --concurrency-target int   Recommendation for when to scale up based on the concurrent number of incoming request. Defaults to --concurrency-limit when given.
  -e, --env stringArray          Environment variable to set. NAME=value; you may provide this flag any number of times to set multiple environment variables. 
                                 To unset, specify the environment variable name followed by a "-" (e.g., NAME-).
      --env-from stringArray     Add environment variables from a ConfigMap (prefix cm: or config-map:) or a Secret (prefix secret:). 
                                 Example: --env-from cm:myconfigmap or --env-from secret:mysecret. You can use this flag multiple times. 
                                 To unset a ConfigMap/Secret reference, append "-" to the name, e.g. --env-from cm:myconfigmap-.

  -h, --help                     Help to update a service.
      --image string             Image to run.
  -l, --label stringArray        Service label to set. name=value; you may provide this flag any number of times to set multiple labels. 
                                 To unset, specify the label name followed by a "-" (e.g., name-).
      --limits-cpu string        The limits on the requested CPU (e.g., 1000m).
      --limits-memory string     The limits on the requested memory (e.g., 1024Mi).
      --lock-to-digest           keep the running image for the service constant when not explicitly specifying the image. 
                                 (--no-lock-to-digest pulls the image tag afresh with each new revision) (default true)
      --max-scale int            Maximal number of replicas.
      --min-scale int            Minimal number of replicas.
      --mount stringArray        Mount a ConfigMap (prefix cm: or config-map:), a Secret (prefix secret: or sc:), or an existing Volume (without any prefix) on the specified directory. Example: --mount /mydir=cm:myconfigmap, --mount /mydir=secret:mysecret, or --mount /mydir=myvolume. When a configmap or a secret is specified, a corresponding volume is automatically generated. You can use this flag multiple times. For unmounting a directory, append "-", e.g. --mount /mydir-, which also removes any auto-generated volume.

      --no-lock-to-digest        Do not keep the running image for the service constant when not explicitly specifying the image. 
                                 (--no-lock-to-digest pulls the image tag afresh with each new revision)
  -p, --port int32               The port where application listens on.
      --requests-cpu string      The requested CPU (e.g., 250m).
      --requests-memory string   The requested memory (e.g., 64Mi).
      --revision-name string     The revision name to set. Must start with the service name and a dash as a prefix. Empty revision name will result in the server generating a name for the revision. Accepts golang templates, allowing {{.Service}} for the service name, {{.Generation}} for the generation, and {{.Random [n]}} for n random consonants. (default "{{.Service}}-{{.Random 5}}-{{.Generation}}")

      --service-account string   Service account name to set. Empty service account name will result to clear the service account.
      --tag strings              Set tag (format: --tag revisionRef=tagName) where revisionRef can be a revision or '@latest' string representing 
                                 latest ready revision. This flag can be specified multiple times.
      --traffic strings          Set traffic distribution (format: --traffic revisionRef=percent) where revisionRef can be a revision or a tag or '@latest' string representing latest ready revision. This flag can be given multiple times with percent summing up to 100%.
      --untag strings            Untag revision (format: --untag tagName). This flag can be specified multiple times.
      --volume stringArray       Add a volume from a ConfigMap (prefix cm: or config-map:) or a Secret (prefix secret: or sc:). Example: --volume myvolume=cm:myconfigmap or --volume myvolume=secret:mysecret. You can use this flag multiple times. To unset a ConfigMap/Secret reference, append "-" to the name, e.g. --volume myvolume-.

      --wait-timeout int         Seconds to wait before giving up on waiting for service to be ready. (default 600)
```

**Options inherited:**

```bash
      --config string            gdnsl config file (default is ./gdnsl.yaml)
      --log-http                 Log http traffic.
```

## gdnsl service delete

Delete a service.

```bash
gdnsl service delete NAME [flags]
```

**Examples:**

```bash
  # Delete a service 'svc1' in tenant namespace
  gdnsl service delete svc1

```

**Options:**

```bash
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -h, --help                Help to delete a service.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            log http traffic
```
