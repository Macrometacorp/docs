DFP Note - All hidden material is for custom analyzers. Can unhide and edit when the feature becomes available.

---
sidebar_position: 50
title: Analyzer Features
---

An analyzer's _features_ determine the available term matching capabilities.

We support the following features for search views:

- `frequency`: How often a term is seen. Required for `PHRASE()`.
- `norm`:  The [normalization constant](https://en.wikipedia.org/wiki/Normalizing_constant) of the term.
- `position`: Position of the term in an increasing sequence. Required for `PHRASE()`. If used, `frequency` is also required.

Feature availability depends on the following:

- The type of analyzer being used.
- The query filtering and sorting functions required by the result.

For example, a `text` analyzer uses `frequency`, `norm`, and `position`, and the `PHRASE()` C8QL function requires `frequency` and `position`.