---
sidebar_position: 1
title: Correlating Data
---

Stream workers can correlate data in order to detect patterns and trends in streaming data. Correlating can be done using patterns and sequences.

## Patterns

Patterns identify events that match the pattern condition irrespective of the order in which they arrive.

For more information about detecting patterns with queries, refer to [Patterns](../../query-guide/patterns/).

## Sequences

Sequences find patterns that happen in consecutive order, because they require all the matching events to arrive consecutively to match the sequence condition. Sequences are useful for finding trends.

For more information about detecting sequences with queries, refer to [Sequences](../../query-guide/sequences/).
