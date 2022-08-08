---
title: Stream Commands
---

# Streams (gdnsl streams)

## gdnsl streams publish

Publish message to a stream.

```bash
 gdnsl streams publish <stream-name> [flags] <message-string>
```

**Examples:**

```bash

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

## gdnsl streams create

Create a stream.

```bash
  gdnsl streams create <stream-name> [flags]
```

**Examples:**

```bash

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

## gdnsl streams delete

Delete a stream.

```bash
gdnsl streams delete <stream-name> [flags]
```

**Examples:**

```bash

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

## gdnsl streams list

List streams.

```bash
gdnsl streams list [flags]
```

**Examples:**

```bash

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

## gdnsl streams describe

Describe a stream.

```bash
 gdnsl streams describe <stream-name> [flags]
```

**Examples:**

```bash

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

## gdnsl streams expire

Expire messages on the stream for all subscriptions.

```bash
gdnsl streams expire <stream-name> [flags] <second-value-number>
```

**Examples:**

```bash

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

## gdnsl streams backlog

Delete backlog for all stream.

```bash
gdnsl streams backlog [flags]
```

Delete backlog for a subscription.

```bash
gdnsl streams backlog [flags]
```

**Examples:**

```bash

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

## gdnsl streams subscription

Delete subscription either on all streams or an a particular stream.

```bash
gdnsl streams subscription NAME [flags]
```

**Examples:**

```bash

  # Delete the given subscription on all streams
  gdnsl streams subscription mysubscription --delete 

  # Delete subscription on a specific stream
  gdnsl streams subscription mysubscription --stream stream1

```

**Options:**

```bash
  -h, --help              Help for deleting subscriptions.
      --global            Is stream global or not.
      --subscription      Subscription for a particular stream.
      --fabric            Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string     gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl streams ttl

Get or set message TTL (time-to-live) in seconds for streams.

```bash
gdnsl streams ttl [flags]
```

**Examples:**

```bash

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
