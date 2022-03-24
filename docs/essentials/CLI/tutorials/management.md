# Managing Services

## Service Management

Macrometa serverless (GDNSL) service is the embodiment of a serverless workload. It is generally in the form of a collection of containers running in a group of pods, in the underlying Macrometa cluster. Each GDNSL service associates with a collection of revisions which represent the evolution of that service.

With the **gdnsl** CLI a user can [`list`](../cmd/gdnsl_service_list.md), [`create`](../cmd/gdnsl_service_create.md), [`delete`](../cmd/gdnsl_service_delete.md), and [`update`](../cmd/gdnsl_service_update.md) te services. The [detail reference](../cmd/gdnsl_service.md) of each sub-command under the [`service`](../cmd/gdnsl_service.md) command shows the options and flags for this group of commands.

**Examples:**

```bash
# Create a new service from an image
$ gdnsl service create mysvc --env KEY1=VALUE1 --env KEY2=VALUE2 --image dev.local/ns/image:latest
```

You are able to also specify the requests and limits of both CPU and memory when creating a service. See [`service create`](../cmd/gdnsl_service_create.md) command reference for additional details.

```bash
# List existing services in the 'default' namespace of your cluster
$ gdnsl service list
```

You can also list services from all namespaces or a specific namespace using flags: `--all-namespaces` and `--namespace mynamespace`. See [`service list`](../cmd/gdnsl_service_list.md) command reference for additional details.


## Revision Management

A GDNSL revision is a "snapshot" of the specification of a service. For instance, when a GDNSL service is created with the environment variable `FOO=bar` a revision is added to the service. Afterwards, when the environment variable is changed to `baz` or additional variables are added, a new revision is created. When the image that the service is running is changed to a new digest, a new revision is created.

With the [`revision`](../cmd/gdnsl_revision.md) command group you can [list](../cmd/gdnsl_revision_list.md) and [describe](../cmd/gdnsl_revision_describe.md) the current revisions on a service.

**Examples:**

```bash
# Listing a service's revision
$ gdnsl revision list --service srvc
```

## Utilities

These are commands that provide some useful information to the user.

* The `gdnsl help` command displays a list of the commands with helpful information.
* The [`gdnsl version`](../cmd/gdnsl_version.md) command will display the current version of the `gdnsl` build including date and Git commit revision.
* The `gdnsl completion` command will output a BASH completion script for `gdnsl` to allow command completions with tabs.


## Common Flags

For every `gdnsl` command, you can use these common additional flags:

* `-h` or `--help` to display specific help for that command
* `--config string` which specifies the `gdnsl` config file (default is ./gdnsl.yaml)
