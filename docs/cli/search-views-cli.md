---
title: Search View Commands
---

# Search Views (gdnsl view)

Get commands related to search views.

```
gdnsl view [flags]
```

**Options:**

```bash
  -h, --help                  Help for views.
```

**Options inherited:**

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl view create

Create a view.

```bash
gdnsl view create <view-name> [flags]
```

**Examples:**

```bash
  # Create test view on demo collection
  gdnsl view create test --collection demo

  # Create test view on demo collection with analyzer
  gdnsl view create test --collection demo --analyzer identity

  # Create test view on demo collection with fields
  gdnsl view update test --collection demo --field "name:text_en,text_fr" --field "age:text_en"
  
  # Create test view on demo collection with store-values
  gdnsl view create test --collection demo --store-values none

  # Create test view on demo collection with track-list-positions
  gdnsl view create test --collection demo --track-list-positions

  # Create test view on demo collection with include-all-fields
  gdnsl view create test --collection demo --include-all-fields

```

**Options:**

```bash
  -h, --help                   Help to create a view.
      --analyzer string        Analyzers to be used for indexing of string values. Can be given multiple times. (default: identity).
      --field string           Field and analyzers mapping in the format <fieldName:analyzer1,analyzer2> 
                               Example: "age:text_en,text_fr". Can be given multiple times.
      --store-values string    How should the view track the attribute values, this setting allows for additional value retrieval optimizations, one of:
                               none: Do not store values by the view.
                               id: Store only information about value presence, to allow use of the EXISTS() function (default "none").
      --track-list-positions boolean  The flag determines whether or not values in a lists should be treated separate (default: false).
      --include-all-fields boolean    The flag determines whether or not to index all fields on a particular level of depth (default: false).
      --fabric                 Name of the fabric to use.
```

**Options inherited:**

```bash
  --config string              gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl view list

Get list of views.

```bash
gdnsl view list [flags]
```

**Examples:**

```bash
  # List views
  gdnsl view list

```

**Options:**

```bash
  -h, --help                  Help to get list of views.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl view describe

Describe a view.

```bash
gdnsl view describe <view-name> [flags]
```

**Examples:**

```bash
  # Describe demo view
  gdnsl view describe demo

  # Describe demo view properties
  gdnsl view describe demo --properties
```

**Options:**

```bash
  -h, --help                  Help to describe a view.
      --properties            View properties.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl view rename

Rename a view.

```bash
gdnsl view rename <old-name> <new-name> [flags]
```

**Examples:**

```bash
  # Rename test view with new name demo
  gdnsl view rename test demo
```

**Options:**

```bash
  -h, --help                  Help to rename a view.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```bash
     --config string         gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl view update

Update a view. Enable or disable view capability of a collection.

```bash
gdnsl view update <view-name> [flags]
```

**Examples:**

```bash
  # update test view on demo collection with analyzer
  gdnsl view update test --collection demo --analyzer identity

  # update test view on demo collection with fields
  gdnsl view update test --collection demo --field "name:text_en,text_fr" --field "age:text_en" 
  
  # update test view on demo collection with store-values
  gdnsl view update test --collection demo --store-values none

  # update test view on demo collection with track-list-positions
  gdnsl view update test --collection demo --track-list-positions

  # update test view on demo collection with include-all-fields
  gdnsl view update test --collection demo --include-all-fields

```

**Options:**

```
  -h, --help                          Help to describe a view.
      --analyzer string               Analyzers to be used for indexing of string values. Can be given multiple times. (default: identity).
      --field string                  Field and analyzers mapping in the format <fieldName:analyzer1,analyzer2> 
                                      Example: "age:text_en,text_fr". Can be given multiple times.
      --store-values string           How should the view track the attribute values, this setting allows for additional value retrieval optimizations, one of:
                                      none: Do not store values by the view.
                                      id: Store only information about value presence, to allow use of the EXISTS() function (default "none").
      --track-list-positions boolean  The flag determines whether or not values in a lists should be treated separate (default: false).
      --include-all-fields boolean    The flag determines whether or not to index all fields on a particular level of depth (default: false).
      --fabric                        Name of the fabric to use.
```

**Options inherited:**

```bash
  --config string                     gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl view delete

Delete a view.

```bash
gdnsl view delete <view-name> [flags]
```

**Examples:**

```bash
  # Delete demo view
  gdnsl view delete demo

```

**Options:**

```bash
  -h, --help                  Help to delete a view.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```bash
    --config string           gdnsl config file (default is ./gdnsl.yaml)
```
