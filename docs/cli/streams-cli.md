---
title: Manage Streams with GDN CLI
---

Before subscribing, receiving and publishing messages to streams with the GDN CLI commands, you need to [install the GDN CLI](index.md)

## Publish to a Stream (gdnsl streams)

Tp publish a message to gdn streams, you use the `gdnsl streams publish` command.

```bash
 gdnsl streams publish <stream-name> [flags] <message-string>

# Examples

  #Publish message to a stream of type global  
  gdnsl streams publish testStream --message "This is global stream"  --global

  #Publish message to a stream of type local
  gdnsl streams publish testStream --message "This is local stream" 

```

**Options:**
```bash
    -h, --help              Help to publish message to a stream.
	--global                Is stream global or not.
	--message               Message to be published to the stream.
	--fabric                Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```

## Create a Stream

Use the `gdnsl streams create` command to create a stream.

```bash
  gdnsl streams create <stream-name> [flags]

# Examples

  # Create a new stream name testStream of type global.
  gdnsl streams create testStream --global

  # Create a new stream name testStream of type local.
  gdnsl streams create testStream

```

**Options:**

```bash
  -h, --help                  Help for streams create.
      --global                Is stream global or not.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```

## Delete a Stream

Use the `gdnsl streams delete` to delete a stream

```bash
gdnsl streams delete <stream-name> [flags]

# Examples

  # Delete a stream of type global
  gdnsl streams delete testStream --global

  # Delete a stream of type local
  gdnsl streams delete testStream

```

**Options:**

```bash
    -h, --help                    Help for deleting a stream.
    --global                  Is stream global or not.
    --fabric                  Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```

## Get a list of streams

The `gdnsl streams list` retrieves a list of all the streams.

```bash
gdnsl streams list [flags]

# Examples

  # list streams 
  gdnsl streams list 

  # list streams's ttl
  gdnsl streams list --ttl

```

**Options:**

```bash
	-h, --help              		Help to list streams.
	--fabric            		Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```

## Get details about a Stream

The `gdnsl streams describe` retrieves the details about a specific stream.

```bash
 gdnsl streams describe <stream-name> [flags]

#Examples

  # Get  stream's backlog  for stream type global
  gdnsl streams describe testStream --backlog --global

  # Get  stream's backlog  for stream type local
  gdnsl streams describe testStream --backlog

  # Get  stream's stats  for stream type global
  gdnsl streams describe testStream --stats --global

  # Get  stream's stats  for stream type local
  gdnsl streams describe testStream --stats

  # Get  stream's subscription  for stream type global
  gdnsl streams describe testStream --subscription --global

  # Get  stream's subscription  for stream type local
  gdnsl streams describe testStream --subscription 

```

**Options:**

```bash
      -h, --help              Help to describe a stream.
          --subscription      Subscription for a particular stream.
          --backlog           Backlog for a particular stream.
          --stats             Stats for a particular stream.
          --global            Global stream. ( default is local )
          --fabric            Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```

## Expire messages on a Stream

Use the `gdnsl streams expire` command to expire messages on the stream for all subscriptions.

```bash
gdnsl streams expire <stream-name> [flags] <second-value-number>

#Examples

  # Expire messages on the stream for all subscriptions for stream type global
  gdnsl streams expire testStream --seconds 9600 --global

  # Expire messages on the stream for all subscriptions for stream type local
  gdnsl streams expire testStream --seconds 9600 

```

**Options:**

```bash
      -h, --help              Help for expiration time for messages on stream for all subscriptions.
          --global            Is stream global or not.
          --seconds           Value for expiring a stream message.
          --fabric            Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```

## Delete streams backlog

The `gdnsl streams backlog` deletes backlog for all streams or for a subscription.

```bash
gdnsl streams backlog [flags]

# Examples

  # Clear backlog for all streams
  gdnsl streams backlog --delete

  # Clear subscription’s backlog	
  gdnsl streams backlog --delete --subscription MyTopic

```

**Options:**

```bash
      -h, --help              Help for deleting backlog.
      --subscription          Subscription for a particular stream.
      --delete                Delete backlog for streams. Default is all if subscription is not specified.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```

## Delete subscription on a stream(s)

Use the `gdnsl streams subscription` to delete subscription either on all streams or an a particular stream.

```bash
gdnsl streams subscription NAME [flags]

# Examples

  # Delete the given subscription on all streams
  gdnsl streams subscription mysubscription --delete 

  # Delete subscription on a specific stream
  gdnsl streams subscription mysubscription --stream stream1

```

**Options:**

```bash
  -h, --help            Help for deleting subscriptions
  --delete              Delete the given subscription on all streams
  --fabric=<value>      Name of the fabric. Default will be "_system"
  --global              Is stream global or not.
  --stream=<value>      Name of the streams.
```

**Options inherited:**

```bash
-c, --config=<value>     gdnsl config file (default is ./gdnsl.yaml)
```

## Set TTL for a stream

Use the `gdnsl streams ttl` to get or set message TTL (time-to-live) in seconds for streams.

```bash
gdnsl streams ttl [flags]

# Examples

  # Get streams TTL
  gdnsl streams ttl 

  # Set message TTL for 3600 seconds on all streams
  gdnsl streams ttl --seconds 3600

```

**Options:**

```bash
	-h, --help              Help for getting streams ttl.
			--seconds           Message TTL in seconds.
			--fabric            Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```
