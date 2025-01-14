---
sidebar_position: 40
title: Limitations
---

## Limitations

Our platform has limitation on certan commands. Commands that are mentioned below return different result in some edge cases.

- [**SETRANGE**](#setrange)

### SETRANGE

SETRANGE returns different value than redis server when offset of the command is greater than the length of string value.

First we set string value that has key `foo`.

```js
[
  "SET",
  "foo",
  "Macrometa GDN"
]
```

When we use **SETRANGE** on that same key with index that is greater than 13 the result will be different that redis server.

```js
[
  "SETRANGE",
  "foo_21",
  18,
  "Global Data Network"
]
```

Response of Macrometa platform:

```js
{
  "code": 200,
  "result": 32
}
```

Response from Redis server:
`(integer) 37`