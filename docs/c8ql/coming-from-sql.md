---
sidebar_position: 4
---

# Coming from SQL

If you worked with a relational database management system (RDBMS) such as MySQL, MariaDB or PostgreSQL, you will be familiar with its query language, a dialect of SQL (Structured Query Language).

C8's query language is called C8QL. There are some similarities between both languages despite the different data models of the database systems. The most notable difference is probably the concept of `loops` in C8QL, which makes it feel more like a programming language. The loops suits the schema-less model more natural and makes the query language very powerful while remaining easy to read and write.

The C8 Query Language (C8QL) is similar to the Structured Query Language (SQL) in its purpose. Both support reading and modifying collection data, however C8QL does not support data definition operations, such as creating and dropping databases, collections and indexes.

Though some of the keywords overlap, C8QL syntax differs from SQL. For instance, the SQL `WHERE` and C8QL `FILTER` clauses are equivalent in that they both define conditions for returning results. But, SQL uses predefined sequence to determine where the WHERE clause must occur in the statement. In C8QL, clauses execute from left to right, so the position of a FILTER clause in the query determines its precedence.

Despite few differences, anyone with an SQL background should have no difficulty in learning C8QL.


## Terminology

Below is a table with the terms of both systems.

| **SQL**        | **C8QL**      |
| ---       | ---        |
| database  | database   |
| table	    | collection |
| row	    | document   |
| column	| attribute  |
| table joins |	collection joins|
| primary key | primary key (`_key` attribute)|
| index       | index |

## INSERT

The INSERT keyword adds new documents to a collection.  It uses the following syntax:

```js
INSERT document
    INTO collection options
```

### Inserting a single row / document:

SQL:

```sql
INSERT INTO users (name, gender)
    VALUES ("John Doe", "m");
```

C8QL:

 ```js
 INSERT { name: "John Doe", gender: "m" }
    INTO users
 ```

### Inserting multiple rows / documents:

SQL:

```sql
INSERT INTO users (name, gender)
    VALUES ("John Doe", "m"), 
           ("Jane Smith", "f");
```

C8QL:

 ```js
 FOR user IN [ 
     { name: "John Doe", gender: "m" },
     { name: "Jane Smith", gender: "f"}
    ]
    INSERT user INTO users
 ```

### Inserting rows / documents from a table / collection:

SQL:

```sql
INSERT INTO backup (uid, name, gender)
    SELECT uid, name, gender
    FROM users
    WHERE active = 1;
```

C8QL:

 ```js
 FOR user IN users
    FILTER user.active == 1
    INSERT user INTO backup
 ```

### Generating test rows / documents

SQL:

```
Use scripts or stored procedures or populate from an existing table.
```

C8QL:

```js
 FOR i IN 1..1000
    INSERT {
        name: CONCAT("test", i),
        gender: (i % 2 == 0 ? "f" : "m")
    }
    INTO users
```

## UPDATE

The UPDATE keyword partially modifies documents in a collection. There are two syntaxes available for this operation:

```js
UPDATE document IN collection options

UPDATE keyExpression WITH document IN collection options
```

### Updating a single row / document:

SQL:

```sql
UPDATE users 
  SET name = "John Smith"
  WHERE id = 1;
```

C8QL:

```js
UPDATE { _key: "1" }
  WITH { name: "John Smith" }
  IN users
```

### Adding a new column / attribute with a default value

SQL:

```sql
ALTER TABLE users 
  ADD COLUMN numberOfLogins 
  INTEGER NOT NULL default 0;
```

C8QL:

```js
FOR user IN users
  UPDATE user 
    WITH { numberOfLogins: 0 } IN users
```

### Adding a new column / attribute with a calculated value

SQL:

```sql
ALTER TABLE users 
  ADD COLUMN numberOfLogins INTEGER 
             NOT NULL default 0;
UPDATE users 
  SET numberOfLogins = (
    SELECT COUNT(*) FROM logins 
    WHERE user = users.id
  ) 
  WHERE active = 1;
```

C8QL:

```js
FOR user IN users
  FILTER user.active == 1
    UPDATE user 
      WITH { 
        numberOfLogins: LENGTH(
          FOR login IN logins 
            FILTER login.user == user._key 
            COLLECT WITH COUNT INTO numLogins 
            RETURN numLogins 
        )
      } IN users
```

### Adding optional columns / attributes

SQL: 

```sql
ALTER TABLE users 
  ADD COLUMN isImportantUser 
             INTEGER default NULL,
  ADD COLUMN dateBecameImportant 
             INTEGER default NULL;
 
UPDATE users 
  SET isImportantUser = 1, 
      dateBecameImportant = UNIX_TIMESTAMP()
  WHERE isImportantUser IS NULL AND (
    SELECT COUNT(*) FROM logins 
      WHERE user = user.id
  ) > 50;
```

:::warning
Not directly possible, must set column to default value (e.g. NULL) for rows that do not qualify.
:::
C8QL:

```js
LET date = DATE_NOW()
  FOR user IN users
    FILTER user.isImportantUser == null
    LET numberOfLogins = (
      FOR login IN logins 
        FILTER login.user == user._key
        COLLECT WITH COUNT INTO numLogins
        RETURN numLogins
      )
    FILTER numberOfLogins > 50
    UPDATE user 
      WITH { 
        isImportantUser: 1, 
        dateBecameImportant: date 
      } 
      IN users
```

### Removing a column / attribute:

SQL:

```sql
ALTER TABLE users
  DROP COLUMN numberOfLogins;
```

C8QL:

```js
FOR user IN users
  UPDATE user WITH { numberOfLogins: null } 
    IN users 
  OPTIONS { keepNull: false }
```

### Removing a column / attribute only for some rows / documents

SQL: *

```sql
UPDATE users 
  SET isImportantUser = NULL, 
    dateBecameImportant = NULL
  WHERE isImportantUser = 1 AND active = 0;
```

:::warning
Not directly possible, must set column to default value (e.g. NULL) for rows that qualify.
:::
C8QL:

```js
FOR user IN users
  FILTER user.isImportantUser == 1 AND 
         user.active == 0
    UPDATE user 
      WITH { 
        isImportantUser: null, 
        dateBecameImportant: null 
      } 
      IN users 
    OPTIONS { keepNull: false }
```

## REPLACE

The REPLACE keyword completely modifies documents in a collection. There are two syntaxes available for this operation:

```js
    REPLACE document IN collection options

    REPLACE keyExpression WITH document IN collection options
```

### Replacing a single row / document:

SQL:

```sql
REPLACE INTO users (name, gender) 
  VALUES ("Jane Smith", "f")
  WHERE id = 1;
```

C8QL:

```js
REPLACE { _key: "1" }
  WITH {
    name: "Jane Smith",
    gender: "f"
  }
  IN users
```

### Replacing multiple rows / documents in a table:

SQL:

```sql
REPLACE INTO users (name, gender)
  SELECT name, gender FROM backup
```

C8QL:

```js
FOR user IN backup
  REPLACE user 
    WITH { 
      name: backup.name, 
      gender: backup.gender 
    }
    IN users
```

## DELETE / REMOVE

SQL uses DELETE statements to remove rows from a table. In C8QL, the REMOVE keyword allows you to remove documents from a collection.

### Deleting a single row / document:

SQL:

```sql
DELETE FROM users
  WHERE id = 1;
```

C8QL:

```js
REMOVE { _key:"1" } 
  IN users
```

### Deleting multiple rows / documents

SQL:

```sql
DELETE FROM users
  WHERE active = 1;
```

C8QL:

```js
FOR user IN users
  FILTER user.active == 1
  REMOVE user IN users
```

## QUERIES

When you want to retrieve rows from a table in SQL, you query the database with a `SELECT` statement. In C8QL, you query documents from a collection using the `FOR` and `RETURN` keywords.

Here, `FOR` iterates over documents in a collection. `RETURN` determines what the query returns to the client.

### Selecting all rows / documents from a table / collection, with all columns / attributes:

SQL:

```sql
SELECT * 
  FROM users;
```

C8QL:

```js
FOR user IN users
  RETURN user
```

### Filtering rows / documents from a table / collection, with projection:

SQL:

```sql
SELECT CONCAT(firstName, " ", lastName) 
  AS name, gender FROM users
  WHERE active = 1;
```

C8QL:
```js
FOR user IN users
  FILTER user.active == 1
  RETURN {
    name: CONCAT(user.firstName, " ",
                 user.lastName),
    gender: user.gender
  }
```

### Sorting rows / documents from a table / collection:

SQL:

```sql
SELECT * FROM users
  WHERE active = 1
  ORDER BY name, gender;
```

C8QL:

```js
FOR user IN users
  FILTER user.active == 1
  SORT user.name, user.gender
  RETURN user
```

## AGGREGATION

There are a series of functions and clauses in both SQL and C8QL to group or further refine the result-set to get the information you need. For instance, counting documents, finding the smallest or largest value, and so on.

### Counting rows / documents in a table / collection:

Both SQL and C8QL can count the rows or documents in the result-set and tell you how many it finds. C8QL manages counts using the `WITH` keyword to count the documents into a return variable.

SQL:

```sql
SELECT gender, COUNT(*) AS number FROM users
  WHERE active = 1
  GROUP BY gender;
```

C8QL:

```js
FOR user IN users
  FILTER user.active == 1
  COLLECT gender = user.gender 
    WITH COUNT INTO number
  RETURN { 
    gender: gender, 
    number: number 
  }
```

### Grouping rows / documents in a table / collection:

In SQL, the `GROUP BY` clauses collects the result-set according to the given column. C8QL replaces this with the `COLLECT` keyword.

SQL:

```sql
SELECT YEAR(dateRegister) AS year, 
       MONTH(dateRegister) AS month, 
       COUNT(*) AS number 
  FROM users
  WHERE active = 1
  GROUP BY year, month
  HAVING number > 20;
```

C8QL:

```js
FOR user IN users
  FILTER user.active == 1
  COLLECT
    year = DATE_YEAR(user.dateRegistered), 
    month = DATE_MONTH(user.dateRegistered) 
    WITH COUNT INTO number
    FILTER number > 20
    RETURN { 
      year: year, 
      month: month, 
      number: number 
    }
```

### Minimum, maximum calculation of rows / documents in a table / collection:

Both SQL and C8QL use functions to find the minimum and maximum values for a given field. In C8QL, it’s handled with the `COLLECT` keyword.

SQL:

```sql
SELECT MIN(dateRegistered) AS minDate, 
  MAX(dateRegistered) AS maxDate 
  FROM users
    WHERE active = 1;
```

C8QL:

```js
FOR user IN users
  FILTER user.active == 1
  COLLECT AGGREGATE
    minDate = MIN(user.dateRegistered),
    maxDate = MAX(user.dateRegistered)
  RETURN { minDate, maxDate }
```

### Building horizontal lists:

SQL: 

```sql
SELECT gender, GROUP_CONCAT(id) AS userIds 
  FROM users
    WHERE active = 1
    GROUP BY gender;
```

:::warning
Not really applicable – use either a concatenated string column or a special datatype (non-portable).
:::
C8QL:

```js
FOR user IN users
  FILTER user.active == 1
  COLLECT gender = user.gender 
    INTO usersByGender
  RETURN { 
    gender: gender, 
    userIds: usersByGender[*].user._key
  }
```

## JOINS

Similar to joins in relational databases, C8 has its own implementation of `JOINS`. Coming from an SQL background, you may find the C8QL syntax very different from your expectations.

### Inner join:

SQL:

```sql
SELECT * FROM users
  INNER JOIN friends 
  ON (friends.user = users.id);
```

C8QL:

An inner join can be expressed easily in C8QL by nesting FOR loops and using FILTER statements:

```js
FOR user IN users 
  FOR friend IN friends
    FILTER friend.user == user._key
    RETURN MERGE(user, friend)
```

:::warning
In C8QL the preferred way is to `return` the document parts from the different collections in individual sub-attributes to avoid attribute name conflicts.
:::
Example:

```js
FOR user IN users 
  FOR friend IN friends
    FILTER friend.user == user._key
    RETURN { user: user, friend: friend }
```

It is also possible to return the matching documents in a horizontal list:

```js
FOR user IN users 
  RETURN { 
    user: user, 
    friends: (
      FOR friend IN friends
        FILTER friend.user == user._key
        RETURN friend
    )
  }
```

### Outer join

SQL:

```sql
SELECT * FROM users
  LEFT JOIN friends 
    ON (friends.user = users.id);
```

C8QL:
Outer joins are not directly supported in C8QL, but can be implemented using subqueries:

```js
FOR user IN users 
  LET friends = (
    FOR friend IN friends
      FILTER friend.user == user._key
      RETURN friend
  )
  FOR friendToJoin IN (
    LENGTH(friends) > 0 ? friends :
      [ { /* no match exists */ } ]
    )
    RETURN { 
      user: user,
      friend: friend
    }
```

In the main, C8QL is a declarative language. Queries express what results you want but not how you want to get there. C8QL aims to be human-readable, therefore uses keywords from the English language.

It also aims to be client independent, meaning that the language and syntax are the same for all clients, no matter what programming language the clients use. Additionally, it supports complex query patterns and the various data models C8 offers.

C8QL also supports several aggregation and string functions. For more information, see [C8QL Functions](coming-from-sql.md)

## How do browse vectors translate into document queries?

In traditional SQL you may either fetch all columns of a table row by row, using `SELECT * FROM table`, or select a subset of the columns. The list of table columns to fetch is commonly called *column list* or *browse vector*:

```sql
SELECT columnA, columnB, columnZ FROM table
```

Since documents aren't two-dimensional, and neither do you want to be limited to returning two-dimensional lists, the requirements for a query language are higher.

C8QL is thus a little bit more complex than plain SQL at first, but offers much more flexibility in the long run. It lets you handle arbitrarily structured documents in convenient ways, mostly leaned on the syntax used in JavaScript.

## Composing the documents to be returned

The C8QL `RETURN` statement returns one item per document it is handed. You can return the whole document, or just parts of it. 

Given that _oneDocument_ is a document (retrieved like `LET oneDocument = DOCUMENT("myusers/3456789")` for instance), it can be returned as-is like this:

```js
RETURN oneDocument
```
The above statement returns a document like:

```json
[
    {
        "_id": "myusers/3456789",
        "_key": "3456789"
        "_rev": "14253647",
        "firstName": "John",
        "lastName": "Doe",
        "address": {
            "city": "Gotham",
            "street": "Road To Nowhere 1"
        },
        "hobbies": [
            { name: "swimming", howFavorite: 10 },
            { name: "biking", howFavorite: 6 },
            { name: "programming", howFavorite: 4 }
        ]
    }
]
```

To return the hobbies sub-structure only:

```js
RETURN oneDocument.hobbies
```

```json
[
    [
        { name: "swimming", howFavorite: 10 },
        { name: "biking", howFavorite: 6 },
        { name: "programming", howFavorite: 4 }
    ]
]
```

To return the hobbies and the address:

```js
RETURN {
    hobbies: oneDocument.hobbies,
    address: oneDocument.address
}
```

```json
[
    {
        hobbies: [
            { name: "swimming", howFavorite: 10 },
            { name: "biking", howFavorite: 6 },
            { name: "programming", howFavorite: 4 }
        ],
        address: {
            "city": "Gotham",
            "street": "Road To Nowhere 1"
        }
    }
]
```

To return the first hobby only:

```js
RETURN oneDocument.hobbies[0].name
```

```json
[
    "swimming"
]
```

To return a list of all hobby strings:

```js
RETURN { hobbies: oneDocument.hobbies[*].name }
```

```json
[
    { hobbies: ["swimming", "biking", "porgramming"] }
]
```

More complex [array](functions/array.md) and [object manipulations](functions/document.md) can be done using C8QL functions and [operators](operators.md).
