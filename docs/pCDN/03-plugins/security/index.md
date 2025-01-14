---
title: Security
---

pCDN also offers other plugins for better security and safety of your APIs and webpages. These plugins are: 

- `consumer restriction`
- `cors`
- `ip-restriction`
- `referer-restriction`
- `request validation`
- `ua restriction`
- `uri-blocker`

## `consumer-restriction`

This plugin enables you to configure different levels of access on consumers and consumer groups.

## `cors`

This plugin enables you use cors.

## `ip-restriction`

This allows access/denial to a route or service by whitelisting or blacklisting ip addresses. It controls this behaviour with these attributes:

- `whitelist`: This is an array containing a list of whitelisted ip addresses or CIDR ranges.
- `blacklist`: An array containing a list of IP addresses or CIDR ranges to blacklist.
- `message`: A string containing the returned message when an IP address is on the blacklist and denied access.


## `ua-restriction`

This plugin controls the access to a route or service based on the `User-Agent` with the following attributes:

- `allowlist`: This array contains a list of allowed `User-Agents` headers.
- `denylist`: This array contains a list of blocked `User-Agents` headers

## `uri-blocker`

This plugin uses a set of `block-rules` to intercept API consumers from accessing certain web pages, identified by their Uniform Resource Identifier (URI). 

### Using the `uri-blocker`

To use this plugin:

1. Click **Enable** from the **Security** plugin list. This opens the **Plugin Editor**
1. Toggle the **Enable** bar to enable the plugin.
1. Enter the attributes to configure the blocker rules. Some of these attributes include:
    - `block-rules`