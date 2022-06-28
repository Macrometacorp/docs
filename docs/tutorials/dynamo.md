---
sidebar_position: 17
title: Dynamo Mode
---

Dynamo tables are always created globally and written to the `_system` GeoFabric regardless of which GeoFabric received the API call.

For more information about Dynamo Mode, refer to the [Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/dynamodb-api.pdf#API_Operations_Amazon_DynamoDB) documentation.

## Prerequisites

1. Create an API Key
    * Login to your tenant account on https://gdn.paas.macrometa.io
    * Create an API key via REST API. Make a copy of the key.

    :::note
        Following api key is created under `demo@macrometa.io/_system` on https://gdn.paas.macrometa.io with `rw` permissions.
        
            demo.demok1.1a1aad0f4b000ca4d2d3bdb505298cbb9467b65526b0f79364e61e5f00000000
        
    :::

2. Download & Install AWS Console CLI
    * URL: https://aws.amazon.com/cli/
    * Mac OS: https://awscli.amazonaws.com/AWSCLIV2.pkg

    :::note
        $ aws --version

        aws-cli/2.0.34 Python/3.7.4 Darwin/19.5.0 botocore/2.0.0dev38
    :::

3. Configure cli using `aws configure` command.

    ```bash
        (base) ~/demos$ aws configure
        AWS Access Key ID [****************0000]: apikey demo.demok1.1a1aad0f4b000ca4d2d3bdb505298cbb9467b65526b0f79364e61e5f00000000
        AWS Secret Access Key [****************0000]: 
        Default region name [us-west-1]: 
        Default output format [None]: 
    ```

    :::note
        1. For API Keys, put `apikey` as prefix. See above example.
        2. For JWT Tokens, put `bearer` as prefix.
    :::

## Operations

This section provides calls you can use for general management operations using Dynamo Mode.

### Create global table

```bash
    aws dynamodb create-table \
        --table-name Music \
        --attribute-definitions \
            AttributeName=Artist,AttributeType=S \
            AttributeName=SongTitle,AttributeType=S \
        --key-schema \
            AttributeName=Artist,KeyType=HASH \
            AttributeName=SongTitle,KeyType=RANGE \
        --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
        --endpoint-url https://api-gdn.paas.macrometa.io/_api/dynamo
```

### List global tables

```bash
    aws dynamodb list-global-tables --endpoint-url https://api-gdn.paas.macrometa.io/_api/dynamo
```

### Put items

```bash
    aws dynamodb put-item \
        --table-name Music \
        --item '{"Artist": {"S": "Obscure Indie Band"}, "SongTitle": {"S": "Call Me Today"}}' \
        --condition-expression "attribute_not_exists(Artist)" \
        --return-values ALL_NEW \
        --endpoint-url https://api-gdn.paas.macrometa.io/_api/dynamo
```

```bash
    aws dynamodb put-item \
        --table-name Music \
        --item '{"Artist": {"S": "Luke Combs"}, "SongTitle": {"S": "Tequila"}}' \
        --condition-expression "attribute_not_exists(Artist)" \
        --return-values ALL_NEW \
        --endpoint-url https://api-gdn.paas.macrometa.io/_api/dynamo
```

### Batch get item

```bash
    aws dynamodb batch-get-item \
        --request-items '{"Music": {"Keys": [{"Artist": {"S": "Obscure Indie Band"},"SongTitle": {"S": "Call Me Today"}},{"Artist": {"S": "Luke Combs"},"SongTitle": {"S": 
"Tequila"}}],"ProjectionExpression":"Artist"}}' \
        --return-consumed-capacity TOTAL \
        --endpoint-url https://api-gdn.paas.macrometa.io/_api/dynamo
```

### Batch write item

```bash
   aws dynamodb batch-write-item \
     --request-items '{"Music": [{"PutRequest": {"Item": {"Artist": {"S": "TestName1"},"SongTitle": {"S": "The Best1"}}}},{"PutRequest": {"Item": {"Artist": {"S": 
"TestName2"},"SongTitle": {"S": "The Best2"}}}}]}' \
     --return-consumed-capacity INDEXES \
     --return-item-collection-metrics SIZE \
     --endpoint-url https://api-gdn.paas.macrometa.io/_api/dynamo
```

### Scan

This section provides calls you can use to view all data or broadly filtered data in Dynamo Mode.

#### Retrieve All Items

```bash
    aws dynamodb scan \
        --table-name Music \
        --endpoint-url https://api-gdn.paas.macrometa.io/_api/dynamo
```

#### Count All Items

```bash
    aws dynamodb scan \
        --table-name Music \
        --select "COUNT" \
        --endpoint-url https://api-gdn.paas.macrometa.io/_api/dynamo
```

#### Filter Items

```bash
    aws dynamodb scan \
       --table-name Music \
       --filter-expression "Artist = :a" \
       --projection-expression "#ST, #AT" \
       --expression-attribute-names '{"#ST": "SongTitle","#AT":"Artist"}' \
       --expression-attribute-values '{":a": {"S": "TestName1"}}' \
       --endpoint-url https://api-gdn.paas.macrometa.io/_api/dynamo
```

### Query items

This section provides calls you can use for querying specific items in Dynamo Mode.

#### Query By Artist Name

```bash
    aws dynamodb query \
        --table-name Music \
        --key-condition-expression "Artist == :name" \
        --expression-attribute-values  '{":name":{"S":"Luke Combs"}}' \
        --endpoint-url https://api-gdn.paas.macrometa.io/_api/dynamo
```

#### Query By complex conditions

```bash
    aws dynamodb query \
      --table-name Music \
      --key-condition-expression "Artist = :n1 AND begins_with(SongTitle, :n2)" \
      --expression-attribute-values  '{":n1": {"S": "Luke Combs"}, ":n2": {"S": "Tequila"}}' \
      --endpoint-url https://api-gdn.paas.macrometa.io/_api/dynamo

```

```bash
    aws dynamodb query \
      --table-name Music \
      --key-condition-expression "Artist = :n1 AND begins_with(SongTitle, :n2)" \
      --filter-expression "#a = :n1 and  #b = :n2" \
      --expression-attribute-names '{"#a": "Artist", "#b": "SongTitle"}' \
      --expression-attribute-values  '{":n1":{"S":"Luke Combs"}, ":n2":{"S":"Tequila"}}' \
      --endpoint-url https://api-gdn.paas.macrometa.io/_api/dynamo
      
```

### Update item

```bash
    aws dynamodb update-item \
        --table-name Music \
        --key '{"Artist": {"S": "Luke Combs"}, "SongTitle": {"S": "Tequila"}}' \
        --update-expression "SET Year = :y, SongTitle = :t" \
        --expression-attribute-values  '{":y":{"N":"2020"}, ":t":{"S":"Happy Day"}}' \
        --return-values ALL_NEW \
        --endpoint-url https://api-gdn.paas.macrometa.io/_api/dynamo
```

### Delete item

```bash
    aws dynamodb delete-item \
        --table-name Music \
        --key '{"Artist": {"S": "Luke Combs"}, "SongTitle": {"S": "Happy Day"}}' \
        --return-values ALL_OLD \
        --endpoint-url https://api-gdn.paas.macrometa.io/_api/dynamo
```

### Delete table

```bash
    aws dynamodb delete-table \
        --table-name Music \
        --endpoint-url https://api-gdn.paas.macrometa.io/_api/dynamo
```
