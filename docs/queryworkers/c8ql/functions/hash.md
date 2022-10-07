---
title: Hash Functions
---

This topic describes C8QL hash functions.

## HASH()

`HASH(value) → hashNumber`

Calculate a hash value for _value_.

- **value** (any): an element of arbitrary type
- returns **hashNumber** (number): a hash value of _value_

_value_ is not required to be a string, but can have any data type. The calculated hash value will take the data type of _value_ into account, so for example the number _1_ and the string _"1"_ will have different hash values. For arrays the hash values will be equal if the arrays contain exactly the same values (including value types) in the same order. For objects the same hash values will be created if the objects have exactly the same attribute names and values (including value types). The order in which attributes appear inside objects is not important for hashing.

The hash value returned by this function is a number. The hash algorithm is not guaranteed to remain the same in future versions of GDN. The hash values should therefore be used only for temporary calculations, e.g. to compare if two documents are the same, or for grouping values in queries.

## String-based hashing

See the following string functions:

- [CRC32()](string.md#crc32)
- [FNV64()](string.md#fnv64)
- [MD5()](string.md#md5)
- [SHA1()](string.md#sha1)
- [SHA512()](string.md#sha512)
