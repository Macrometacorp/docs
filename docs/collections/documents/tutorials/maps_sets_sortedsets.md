---
sidebar_position: 5
title: Maps, Sets, SortedSets
---

# Maps, Sets & SortedSets

The other day I came across a question about how to model popuplar Redis datatypes using Macrometa GDN. Macrometa GDN is a geo-replicated multi-model realtime database. So modelling Redis basic datatypes in Macrometa can be done easily. 

By modelling these data types in GDN, developers can use ( i.e., `read-write`) these data types globally from regions closest to their Apps & APIs with very low latency. The GDN will take care of doing the necessary geo-replication and convergence.

The popular data types in Redis are

* `Strings` - Strings are the most basic kind of Redis value.
* `Lists` - Redis Lists are simply lists of strings, sorted by insertion order.
* `Sets` - Redis Sets are an unordered collection of Strings.
* `Hashes` - Redis Hashes are maps between string fields and string values. Basically a map. 
* `SortedSets` - Redis Sorted Sets are, similarly to Redis Sets, non repeating collections of Strings. The difference is that every member of a Sorted Set is associated with score, that is used in order to take the sorted set ordered, from the smallest to the greatest score. While members are unique, scores may be repeated.

All of the above can be represented in Macrometa GDN.

## Hashes (Maps)

In GDN, data is stored in collections (tables) as json documents. Each json document is essentially a Map of `key:value` pairs.

For example, following is a simple C8QL statement that **inserts** data for a user in `users` collection. The user document is basically a `map` with following fields `_key`, `name`, `surname`, `alive`, `age` and `traits`.

```js
    INSERT {
        "_key": "Ned Stark",
        "name": "Ned",
        "surname": "Stark",
        "alive": true,
        "age": 41,
        "traits": ["A","H","C","N","P"]
    } INTO users
```

You can **retrieve** a `map` (i.e., data for a given user), using following C8QL statement:

```js
    RETURN DOCUMENT("users", "Ned Stark")
```

You can **get all** maps based on a `condition` using following C8QL statements:

```js
    // Filter by user name
    FOR user IN users
        FILTER user.name == "Ned"
        RETURN user

    // Filter by user age.
    FOR user IN users
        FILTER user.age < 13
        RETURN user
```

You can **get** specific keys of a map following C8QL statement:

```js
    FOR user IN users
        FILTER user.name == "Ned"
        RETURN { name: user.name, age: user.age }
```

You can **update** a specific `key` in the `map` (i.e., attribute of a given user) using following C8QL statement:

```js
    UPDATE "Ned Stark" WITH { alive: false } IN users
```

You **remove** a `map`, usng following C8QL statement:

```js
    REMOVE "Ned Stark" IN users
```

:::note
Please see [C8QL Tutorial](../../../c8ql/c8ql-tutorial.md) and [C8QL Examples](../../../c8ql/examples.md) for more examples on how you can use C8QL.
:::

## Sets

Sets are basically an unordered collection of unique Strings. Sets can be easily modelled in Macrometa GDN as a collection of documents.

For example, following C8QL statement creates a `set` of user names.

```js
    INSERT { "_key": "Ned Stark"} INTO users
    INSERT { "_key": "Bruce Wayne"} INTO users
    INSERT { "_key": "Clark Kent"} INTO users
```

:::note
In above example, we used `_key` attribute for saving the user name. Using the `_key` attribute is normally beneficial because it is the collection’s primary key. It is always present and automatically unique, so exactly what we need for maintaining a set. Note that there are some restrictions for what can be stored inside the `_key` attribute, but as long as values are only ASCII letters or digits, there is nothing to worry about. Inserting into the collection will also automatically populate the indexes.
:::

You can **remove** a entry in the set using following C8QL statement:

```js
    REMOVE "Ned Stark" IN users
```

You can **get** contents of a set using following C8QL statement:

```js
    FOR user IN users
        RETURN user
```

You can get **count** (i.e., size) of a set using following C8QL statement:

```js
    RETURN LENGTH(users)
```

## Lists

Lists are similar to sets except the values are not unique. Lists can be easily modelled in Macrometa GDN as a collection of documents like `Sets`. Use a different field instead of `_key` field. Create an index on that field with `unique=false`.

## SortedSets

Sorted Sets are, similarly to Sets, non repeating collections of Strings. The difference is that every member of a Sorted Set is associated with score, that is used in order to take the sorted set ordered, from the smallest to the greatest score. While members are unique, `scores` may be repeated.

SortedSets can be easily modelled in Macrometa GDN as a collection of documents. Collections are a general-purpose storage mechanism and they are not limited to storing just scores.

We also need a mechanism for keeping `scores` sorted. By default, no specific sort order is maintained for data in a collection. To have the collection entries sorted by `score` values, we have to create a `(sorted) persistent index` on some attribute.

For example, let's assume we created a collection called `highscores` and a `(sorted) persistent index` on attribute called `score`.

Run the following C8QL queries to insert the data:

```js
INSERT { _key: "bruce", score: 50 } IN highscores
INSERT { _key: "clark", score: 20 } IN highscores
INSERT { _key: "john", score: 35 } IN highscores
INSERT { _key: "jane", score: 75 } IN highscores
INSERT { _key: "robin", score: 60 } IN highscores
```

:::note
In above example, we used `_key` attribute for saving the user name. Using the `_key` attribute is normally beneficial because it is the collection’s primary key. It is always present and automatically unique, so exactly what we need for maintaining a set. Note that there are some restrictions for what can be stored inside the `_key` attribute, but as long as values are only ASCII letters or digits, there is nothing to worry about. Inserting into the collection will also automatically populate the indexes.
:::

As we have some initial documents, we can now query the `lowest` and `highest` scores. This will also be efficient as the queries will use the `sorted index` on score:

```js
    FOR h IN highscores
    SORT h.score ASC
    LIMIT 3
    RETURN { user: h._key, score: h.score }
 
    FOR h IN highscores
    SORT h.score DESC
    LIMIT 3
    RETURN { user: h._key, score: h.score }
```

To store a highscore for a user without knowing in advance whether a value has already been stored before for this user, one can use `UPSERT`. The `UPSERT` will either insert a new highscore entry, or update an existing one if already present:

```js
    UPSERT { _key: "william" }
    INSERT { _key: "william", score: 80 }
    UPDATE { score: OLD.score + 80 } IN highscores
    RETURN { user: NEW._key, score: NEW.score }
```

If there is already an entry with a key `william`, its scores will be increased by 80. If such entry does not exist, it will be created. In both cases, the new score will be returned.

Finally, removing an entry from a highscore list is a straight-forward remove operation:

```js
    REMOVE { _key: "robin" } IN highscores
```

## Advanced

Let's build on this simple example and create slightly more advanced `highscore` list use cases. 

* multi-game highscore lists
* joining data
* maintaining a “last updated” date

### Multi-game highscore lists

We’ll start with generalizing the single-game highscore list into a multi-game highscore list.

In Redis, one would create multiple sorted sets for handling the highscore lists of multiple games. Multiple Redis sorted sets are stored under different keys, so they are isolated from each other.

Though Redis provides a few commands to aggregate data from multiple sorted sets (`ZUNIONSTORE` and `ZINTERSTORE`) into a new sorted set, other cross-set operations are not supported. This is not a problem if the client application does not have to perform cross-set queries or cleanup tasks.

In GDN, multi-game highscore lists can be implemented in two variants i.e.,

* Store all highscores in the same collection or 
* Store using multiple collections (e.g. one per game).

Storing highscores for different games in separate collections has the advantage that they’re really isolated. It is easy to get rid of a specific highscore list by simply dropping its collection. It is also easy to get right query-wise.

All that needs to be changed to turn the above examples into a multi-game highscore list solution is to change the hard-coded collection name highscores and make it a bind parameter, so the right collection name can be injected by the client application easily.

On the downside, the `multi-collection` solution will make cross-game operations difficult. Additionally, having one collection per game may get out of hand when there are many, many highscore lists to maintain. In case there are many but small highscore lists to maintain, it might be better to put them into a single collection and add a game attribute to tell the individual lists apart in it.

Let’s focus on this and put all highscores of all games into a single collection.

The first adjustment that needs to be made is that we cannot use `_key` for user ids anymore. This is because user ids may repeat now (a user may be contained in more than one list). 

So we need to change the design and make the combination of `game` and `user` a new unique key i.e. , create following 2 indexes -

```bash
persistent index --> unique: true, fields: [ "user", "game" ] 
sorted persistent index --> fields: [ "game", "score" ] 
```
 
We can use the unique hash index on `user` and `game` to ensure there is at most one entry for per user per game. It also allows use to find out quickly whether we already have an entry for that particular combination of game and user. Because we are not using `_key` we could now also switch to numeric ids if we preferred that.

The other index on `game` and `score` is sorted. It can be used to quickly retrieve the leaderboard for a given game. As it is primarily sorted by game, it can also be used to enumerate all entries for a given game.

The following Shell command populates the multi-game highscores collection with 55,000 highscores:

```bash
for (var game = 0; game < 10; ++game) {
  for (var user = 0; user < (game + 1) * 1000; ++user) {
    db.highscores.save({
      game: game,
      user: String(user),
      score: (game + user) % 997  /* arbitrary score */
    });
  }
}
```

The game ids used above are between `0` and `9`, though any other game ids would work, too. User ids are stringified numbers.

We can now find out the leaderboard for `game 2` with the following adjusted C8QL query. The query will use the (sorted) persistent index:

```js
    FOR h IN highscores
    FILTER h.game == 2
    SORT h.score DESC
    LIMIT 3
    RETURN { user: h.user, score: h.score }
```

Removing all scores for a specific game is also efficient due to the the same index:

```js
    FOR h IN highscores
    FILTER h.game == 5
    REMOVE h IN highscores
```

:::note
When storing all highscores in the same collection, we could also run cross-game queries if we wanted to. All that needs to be done for this is adjusting the `FILTER` conditions in the queries.
:::

Inserting or updating a user score can be achieved using an `UPSERT`. Here’s a query to increase the score of user "1571" in `game 2` by a value of `5`:

```js
    UPSERT { game: 2, user: "1571" }
    INSERT { game: 2, user: "1571", score: 5 }
    UPDATE { score: OLD.score + 5 } IN highscores
    RETURN { user: NEW._key, score: NEW.score }
 ```

The same index on `[ "user", "game" ]` is used in the following query that will delete the highscore of a given user in a specific game:

```js
    FOR h IN highscores
    FILTER h.game == 6
    FILTER h.user == '3894'
    REMOVE h IN highscores
```

### Joining data

Querying the leaderboard for a specific game was easy. However, so far we have only queried user ids and associated scores in games. In reality, we probably want to display some more user information in a leaderboard, for example their screen names.

In Redis, no extra information can be stored in sorted sets. So extra user information must be stored under separate keys. There is no concept of `joins` in Redis. The scores contained in the sorted set need to be queried by the client application, and extra user information have to be queried by the client application separately.

In GDN, we could store the screen names in the `highscores` collection along with the `highscores` so we can easily query them with the leaderboard query. While this would work, it will create lots of redundant data if the screen names are also used and stored elsewhere.

So let’s pick the option that stores `highscores` and `screen names` in separate places, and brings them together only when needed in a leaderboard query.

Let’s store screen names in a collection named `users`. The following Shell commands will create the collection and set up 100K users with dummy screen names:

```bash
    db._create("users");
    for (var i = 0; i < 100000; ++i) {
    db.users.insert({
        _key: String(i),
        name: "test user #" + i
    });
    }
```

We can now query the highscores plus the screen name in one go:

```js
    FOR h IN highscores
    FILTER h.game == 2
    SORT h.score DESC
    LIMIT 3
    FOR u IN users
        FILTER h.user == u._key
        RETURN { user: h.user, name: u.name, score: h.score }
```

### Maintaining a “last updated” date

Finally, let’s try to keep track of when a highscore was last updated. There are a few use cases for this, for example displaying the date and time of when a highscore was achieved or for removing older highscores.

In Redis, the sorted set values are just the numeric scores, so we cannot store anything else (such as a date) inside the sorted sets. We would really need to store the update date for each highscore entry outside the sorted set, either under a separate key, or using a Redis hash. However, this is complex to manage and keep consistent so we won’t do it.

Let’s switch to GDN now. Here we work with arbitrarily structured documents. That means we can store any other attributes along with a highscore. We can store the timestamp of when a highscore was last set or updated in an attribute named date:

```js
    LET now = DATE_NOW()
    UPSERT { game: 2, user: "1571" }
    INSERT { game: 2, user: "1571", score: 10, date: now }
    UPDATE { score: OLD.score + 10, date: now } IN highscores
    RETURN { user: NEW._key, score: NEW.score }
```

The date attribute can now be used for display purposes already.

We can also use the date attribute for identifying the oldest entries in the highscore list in case we want the list to be periodically cleaned up.

Obviously we will be indexing date for this, but we need to decide whether we want to use the same expiration periods for all games, or if we want to use game-specific expirations. If the expiration date is the same for all games, then we can `index` just date i.e.,

```bash
persistent index ---> fields: [ "date" ]
```

If we want to remove entries older than roughly 2 days, regardless of the associated game, we can use TTL (time to live) index.

```bash
ttl index ---> fields: [ "date" ]
```
 
If we instead want to find (and remove) the oldest entries for individual games, we need to create the index on game and date:

```bash
persistent index ---> fields: [ "game", "date" ] 
```

This index allows to efficiently get rid of the oldest entries per game:

```js
    LET compare = DATE_NOW() - 2 * 86400 * 1000
    FOR h IN highscores
    FILTER h.game == 2
    FILTER h.date < compare
    LIMIT 1000
    REMOVE h IN highscores
```

:::note
REMOVE was limited to the oldest 1000 entries. This was done to make the query return fast. The removal query can be repeated while there are still entries to remove.
:::    