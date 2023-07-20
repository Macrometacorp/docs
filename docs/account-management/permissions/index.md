---
sidebar_position: 10
title: Permissions
---

This section explains permissions for users and API keys, and how to change them.

Each GeoFabric has the following global permission levels for users and API keys:

- **Administrate -** Full read and write access to all files in the GeoFabric.
- **Access -** Read access to all files in the GeoFabric. No write access.
- **No Access -** No access to any files in the GeoFabric.
- **Use Default -** Uses default settings as specified on the bottom row.

Click the name of the GeoFabric to expand it and view permissions for specific features. Each GDN feature has the following permission levels:

- **Read/Write -** Full access to the feature and related files.
- **Read Only -** Read access to the feature and related files. No write access.
- **No Access -** No access to the feature and related files.
- **Use Default -** Uses default settings as specified on the bottom row.

You can configure permissions at a more granular level by assigning permissions at the following levels:

- Fabric
- Collections
- Streams
- Query Workers

Each level of permissions has its own default. You can change default permissions for all levels except fabric, which permanently defaults to **No Access**. You must individually assign **Access** or **Administrate** fabric permissions to users or API keys.

When you set permissions to the fabric or collection level, the lower levels (stream and query worker) inherit the highest level of access. For example, if you set database permissions to **Access** and collection permissions to **Administrate**, then stream permissions automatically inherit the **Administrate** access level because the collection-level permission is higher than the database-level permission.
