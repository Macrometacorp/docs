# Naming Conventions

The following naming conventions should be followed by users when creating geo-fabrics, collections and documents in C8.

## GeoFabric Names

C8 will always start up with a default geofabric, named `_system`. Users can create additional geofabrics in C8, provided the fabric names conform to the following constraints:

* Fabric names must only consist of the letters `a` to `z` (both lower and upper case allowed), the numbers `0` to `9`. This also means that any non-ASCII database names are not allowed.
* Fabric names must always start with a letter. Fabric names starting with an underscore are considered to be system fabrics, and users should not create or delete those.
* The maximum allowed length of a fabric name is 64 bytes.
* Fabric names are case-sensitive.

## Collection Names

Users can pick names for their collections as desired, provided the following naming constraints are not violated:

* Collection names must only consist of the letters `a` to `z` (both in lower and upper case) and the numbers `0` to `9`. This also means that any non-ASCII collection names are not allowed
* User-defined collection names must always start with a letter. System collection names must start with an underscore. All collection names starting with an underscore are considered to be system collections that are for C8's internal use only. System collection names should not be used by end users for their own collections
* The maximum allowed length of a collection name is 64 bytes
* Collection names are case-sensitive

## Attribute Names

Users can pick attribute names for document attributes as desired, provided the following attribute naming constraints are not violated:

- Attribute names starting with an underscore are considered to be system attributes for C8's internal use. Such attribute names are already used by C8 for special purposes:
  - `_id` is used to contain a document's handle
  - `_key` is used to contain a document's user-defined key
  - `_rev` is used to contain the document's revision number
  - In edge collections, the
    - `_from`
    - `_to`
    attributes are used to reference other documents.

  More system attributes may be added in the future without further notice so end users should try to avoid using their own attribute names starting with underscores.

* Theoretically, attribute names can include punctuation and special characters as desired, provided the name is a valid UTF-8 string.  For maximum portability, special characters should be avoided though.  For example, attribute names may contain the dot symbol, but the dot has a special meaning in JavaScript and also in C8QL, so when using such attribute names in one of these languages, the attribute name needs to be quoted by the end user. Overall it might be better to use attribute names which don't require any quoting/escaping in all languages used. This includes languages used by the client (e.g. Ruby, PHP) if the attributes are mapped to object members there.

* Attribute names starting with an at-mark (*@*) will need to be enclosed in backticks when used in a C8QL query to tell them apart from bind variables. Therefore we do not encourage the use of attributes starting with at-marks, though they will work when used properly.

* C8 does not enforce a length limit for attribute names. However, long attribute names may use more memory in result sets etc. Therefore the use of long attribute names is discouraged.

* Attribute names are case-sensitive.

* Attributes with empty names (an empty string) are disallowed.

## Document Keys

Users can define their own keys for documents they save. The document key will be saved along with a document in the `_key` attribute. Users can pick key values as required, provided that the values conform to the following restrictions:

* The key must be a string value. Numeric keys are not allowed, but any numeric value can be put into a string and can then be used as document key.
* The key must be at least 1 byte and at most 254 bytes long. Empty keys are disallowed when specified (though it may be valid to completely omit the *_key* attribute from a document)
* It must consist of the letters a-z (lower or upper case), the digits 0-9 or any of the following punctuation characters: `_` `-` `:` `.` `@` `(` `)` `+` `,` `=` `;` `$` `!` `*` `'` `%` 
* Any other characters, especially multi-byte UTF-8 sequences, whitespace or punctuation characters cannot be used inside key values
* The key must be unique within the collection it is used

Keys are case-sensitive, i.e. `myKey` and `MyKEY` are considered to be different keys.

Specifying a document key is optional when creating new documents. If no document key is specified by the user, C8 will create the document key itself as each document is required to have a key.

There are no guarantees about the format and pattern of auto-generated document keys other than the above restrictions. Clients should therefore treat auto-generated document keys as opaque values and not rely on their format.

The current format for generated keys is a string containing numeric digits. The numeric values reflect chronological time in the sense that `_key` values generated later will contain higher numbers than `_key` values generated earlier. But the exact value that will be generated by the server is not predictable. Note that if you sort on the `_key` attribute, string comparison will be used, which means `"100"` is less than `"99"` etc.
