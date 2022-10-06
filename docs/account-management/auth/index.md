---
sidebar_position: 60
title: Authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can access your Macrometa GDN account using several methods. They are described below.

- [API keys](../api-keys/index.md)
- [User authentication](user-auth.md)
- [Token-based authentication (JWT)](jwts.md)

The methods are described below. For a more robust code example, refer to [Auth Example - Connect to GDN](connect-to-gdn.md).

## API Keys

API keys are the recommended authentication method for access by apps and APIs.

- You can apply granular permissions to API keys. For more information, refer to [Permissions](../permissions/index.md).
- You can manage API keys in multiple ways, including the web console.

For more information about API keys, refer to [API Keys](../api-keys/index.md).

## User Authentication

User authentication is the familiar email and password pair. This is the default authentication method for users signing in to Macrometa accounts.

- You can apply granular permissions to user accounts. For more information, refer to [Permissions](../permissions/index.md).
- You can manage users in multiple ways, including the web console.

For more information about user authentication, refer to [User Authentication](user-auth.md).

## Token-Based Authentication

You can authenticate with Macrometa GDN via JSON web tokens (JWTs). The JWTs in GDN expire after 12 hours unless renewed.

For more information about JWTs, refer to [JWTs](jwts.md).
