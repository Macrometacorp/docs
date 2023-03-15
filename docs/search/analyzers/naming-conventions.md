---
sidebar_position: 20
title: Naming Conventions
---

Analyzers uses name conventions similar to collections. Each name can use the following:

- Letters of the English alphabet (upper or lower case).
- Numbers (`0` through `9`).
- Underscore (`_`) or dash (`-`).

The first character must be a letter. Analyzer names are case sensitive. The maximum name length is 64 bytes. Empty spaces and non-ASCII characters are invalid.

Custom Analyzers are named differently depending on whether they're global or specific to a database.

## Global Analyzers

You can store custom Analyzers in the `_system` database so they can be referenced in queries against any other database. For example, `_system::globalAnalyzer` where `globalAnalyzer` is the name of the custom Analyzer you want to be globally accessible.

## Database Analyzers

Each database has an `_analyzers` collection for storing custom Analyzers. All Analyzers in a collection are prefixed by the database name and two colons. For example, `myDatabase::myAnalyzer` where `myDatabase` is your database name and `myAnalyzer` is your Analyzer name. [Built-in Analyzers](#built-in-analyzers) are not stored in these collections because they are globally available.