---
title: MongoDB - DRAFT
---

Macrometa collection connectors allow you to extract data from or send data to an existing MongoDB collection.

## Prerequisites

- Macrometa account with admin permissions.
- Remotely accessible, running MongoDB instance.
- Source collections must not be empty.
- If you are using `LOG_BASED` replication, then make sure to set `--replSet` argument for your MongoDB.

## MongoDB Source

UI:
- Integration Name
- No Database Name or Source Collection in New Integration UI, those are defined at connection
- Port in UI, not table
- Several advanced fields in different order

Repo:

| Config keys     | Type    | Required?  | Description   |  Default       | Example       |
|-----------------|---------|------------|---------------|----------------|---------------|
| Connection Name    | String  | Yes    | Name of the connection       | None   | FromMongoDB  |
| Host | String  | Yes        | MongoDB host| None   | mongodb_host |
| Port | Integer | No        | MongoDB port| None   | 27017          |
| Username           | String  | Yes  | MongoDB user| None   | mongo      |
| Password           | String  | Yes  | MongoDB password          | None   | password   |
| Database Name      | String  | Yes  | MongoDB database name     | None   | mongo      |
| Source Collection       | String  | Yes        | Source collection name       | None   | my_collection      |
| Auth Database         | String | No         | Authentication database name        | admin | admin        |
| Enable SRV         | Boolean | No         | Uses a `mongodb+srv` protocol to connect. Disables the usage of `port` argument if set to `true`    | false     | false           |
| Replica Set | string | No       | Name of replica set   | None     | rs0    |
| Use SSL  | Boolean | No         | Can be set to true to connect using SSL   | false | false         |
| Verify Mode        | Boolean | No         | Default SSL verify mode  | false     | false             |
| Replication Method     | string | No         | Choose from LOG_BASED, FULL_TABLE | FULL_TABLE     | FULL_TABLE         |
| Direct Connection     | Boolean | No         | Specifies whether to connect directly to the specified MongoDB host as a standalone or connect to the entire replica set of which the given MongoDB host is a part | false     | false |
| SSL/TLS CA Certificate| String  | No         | Specific CA certificate in PEM string format. This is most often the case when using `self-signed` server certificate. | None     | my_ca_certificate |
| SSL/TLS Client Certificate          | String  | No         | Specific client certificate in PEM string format. If the private key for the client certificate is stored in a separate file, it should be concatenated with the certificate file. | None     | my_client_certificate |
| SSL/TLS Client Key Password         | String  | No         | If the private key contained in the certificate keyfile is encrypted, users can provide a password or passphrase to decrypt the encrypted private keys | None     | my_client_key_password |

## MongoDB Target

UI:
- Integration Name
- Port in different place in list
- Database and Target Collection set when defining connection
- 

Repo:

| Config keys    | Type    | Required?  | Description         | Default |  Example   |
|----------------|---------|------------|---------------------|---------|------------|
| Connection Name       | String  | Yes        | Name of the connection            | None   | ToMongo   |
| Host    | String  | Yes        | MongoDB host        | None   | mongodb_host            |
| Port    | Integer | No         | MongoDB port        | None   | 27017     |
| Username| String  | Yes        | MongoDB username    | None   | mongo     |
| Password| String  | Yes        | MongoDB password    | None   | password  |
| Auth Database         | String  | Yes        | MongoDB authentication database   | None   | admin     |
| Database| String  | Yes        | MongoDB database name     | None   | mongo     |
| Target Collection     | String  | Yes        | Target collection name  | None   | my_collection     |
| Hard Delete           | Boolean | No         | When `hard_delete` option is true then the documents which are deleted from the source will also be deleted from MongoDB. It is achieved by continuously checking the `_SDC_DELETED_AT` metadata attribute sent by the source connector            | False   | True           |
| Enable SRV            | Boolean | No         | Uses a `mongodb+srv` protocol to connect. Disables the usage of `port` argument if set to `True   | False     | True       |
| Replica Set           | String  | No         | Name of replica set | None     | replica  |
| Direct Connection     | Boolean | No         | Specifies whether to connect directly to the specified MongoDB host as a standalone or connect to the entire replica set of which the given MongoDB host is a part         | False | True     |
| Use SSL | Boolean | No         | Can be set to true to connect using SSL         | False    | True     |
| Verify Mode           | Boolean | No         | Default SSL verify mode           | True     | False    |
| SSL/TLS CA Certificate| String  | No         | Specific CA certificate in PEM string format. This is most often the case when using `self-signed` server certificate. | None     | my_ca_certificate |
| SSL/TLS Client Certificate          | String  | No         | Specific client certificate in PEM string format. If the private key for the client certificate is stored in a separate file, it should be concatenated with the certificate file. | None     | my_client_certificate |
| SSL/TLS Client Key Password         | String  | No         | If the private key contained in the certificate keyfile is encrypted, users can provide a password or passphrase to decrypt the encrypted private keys | None     | my_client_key_password |
| Batch Size            | Integer | No         | Maximum number of rows inserted per batch       | 1000       | 100      |
| Batch Flush Interval (Seconds)    | Integer | No     | Time between batch flush executions   | 60 | 30  |
| Batch Flush Minimum Time Gap (Seconds)     | Integer | No    | Minimum time gap between two batch flush tasks  | 60       | 30     |
