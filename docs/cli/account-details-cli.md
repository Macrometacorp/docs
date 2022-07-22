---
title: Account Details Commands
---

# Account Details (gdnsl account)

Print account details.

```bash
  gdnsl account [flags]
```

**Examples:**

```bash

  # Return limits of the account
  gdnsl account --limits

  # Return account plan details
  gdnsl account --plan

  # Return features enabled for the account
  gdnsl account --features

  # Return list of regions available for the account
  gdnsl account --regions

  # Return local region details
  gdnsl account --local-region

  # Return all available regions of the GDN
  gdnsl account --all-regions

```

**Options:**

```bash
  -h, --help                Help for account command.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```
