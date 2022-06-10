---
sidebar_position: 2
title: Error Codes
---

This page describes error codes you might encounter while using Macrometa.

## General Errors (0-99)

| Error # | Error Name                    | Description                                                                         |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| 0       | ERROR_NO_ERROR                | No error has occurred.                                                              |
| 1       | ERROR_FAILED                  | Occurs when a general error occurred.                                               |
| 2       | ERROR_SYS_ERROR               | Occurs when operating system error occurred.                                        |
| 3       | ERROR_OUT_OF_MEMORY           | Occurs when there is a memory shortage.                                             |
| 4       | ERROR_INTERNAL                | Occurs when an internal error occurred.                                             |
| 5       | ERROR_ILLEGAL_NUMBER          | Occurs when an illegal representation of a number was given.                        |
| 6       | ERROR_NUMERIC_OVERFLOW        | Occurs when a numeric overflow occurred.                                            |
| 7       | ERROR_ILLEGAL_OPTION          | Occurs when an unknown option was supplied by the user.                             |
| 8       | ERROR_DEAD_PID                | Occurs when a PID without a living process was found.                               |
| 9       | ERROR_NOT_IMPLEMENTED         | Occurs when hitting an unimplemented feature.                                       |
| 10      | ERROR_BAD_PARAMETER           | Occurs when the parameter does not fulfill the requirements.                        |
| 11      | ERROR_FORBIDDEN               | Occurs when you are missing permission for the operation.                           |
| 12      | ERROR_OUT_OF_MEMORY_MMAP      | Occurs when there is a memory shortage.                                             |
| 13      | ERROR_CORRUPTED_CSV           | Occurs when encountering a corrupt CSV line.                                        |
| 14      | ERROR_FILE_NOT_FOUND          | Occurs when a file is not found.                                                    |
| 15      | ERROR_CANNOT_WRITE_FILE       | Occurs when a file cannot be written.                                               |
| 16      | ERROR_CANNOT_OVERWRITE_FILE   | Occurs when an attempt is made to overwrite an existing file.                       |
| 17      | ERROR_TYPE_ERROR              | Occurs when a type error is unencountered.                                          |
| 18      | ERROR_LOCK_TIMEOUT            | Occurs when there's a timeout waiting for a lock.                                   |
| 19      | ERROR_CANNOT_CREATE_DIRECTORY | Occurs when an attempt to create a directory fails.                                 |
| 20      | ERROR_CANNOT_CREATE_TEMP_FILE | Occurs when an attempt to create a temporary file fails.                            |
| 21      | ERROR_REQUEST_CANCELED        | Occurs when a request is canceled by the user.                                      |
| 22      | ERROR_DEBUG                   | Occurs intentionally during debugging.                                              |
| 25      | ERROR_IP_ADDRESS_INVALID      | Occurs when the structure of an IP address is invalid.                              |
| 27      | ERROR_FILE_EXISTS             | Occurs when a file already exists.                                                  |
| 28      | ERROR_LOCKED                  | Occurs when a resource or an operation is locked.                                   |
| 29      | ERROR_DEADLOCK                | Occurs when a deadlock is detected when accessing collections.                      |
| 30      | ERROR_SHUTTING_DOWN           | Occurs when a call cannot succeed because a server shutdown is already in progress. |
| 31      | ERROR_ONLY_ENTERPRISE         | Occurs when an enterprise-feature is requested from the Macrometa C8DB.             |
| 32      | ERROR_RESOURCE_LIMIT          | Occurs when the resources used by an operation exceed the configured maximum value. |

## HTTP Error Status Codes (400-599)

| Error # | Error Name                     | Description                                                                                                                       |
| ------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| 400     | ERROR_HTTP_BAD_PARAMETER       | Occurs when the HTTP request does not fulfill the requirements.                                                                   |
| 401     | ERROR_HTTP_UNAUTHORIZED        | Occurs when authorization is required but the user is not authorized.                                                             |
| 403     | ERROR_HTTP_FORBIDDEN           | Occurs when the operation is forbidden.                                                                                           |
| 404     | ERROR_HTTP_NOT_FOUND           | Occurs when an URI is unknown.                                                                                                    |
| 405     | ERROR_HTTP_METHOD_NOT_ALLOWED  | Occurs when an unsupported HTTP method is used for an operation.                                                                  |
| 406     | ERROR_HTTP_NOT_ACCEPTABLE      | Occurs when an unsupported HTTP content type is used for an operation or if a request is not acceptable for a leader or follower. |
| 412     | ERROR_HTTP_PRECONDITION_FAILED | Occurs when a precondition for an HTTP request is not met.                                                                        |
| 500     | ERROR_HTTP_SERVER_ERROR        | Occurs when an internal server is encountered.                                                                                    |
| 503     | ERROR_HTTP_SERVICE_UNAVAILABLE | Occurs when a service is temporarily unavailable.                                                                                 |
| 504     | ERROR_HTTP_GATEWAY_TIMEOUT     | Occurs when a service contacted by C8Db_Db does not respond in a timely manner.                                                   |

## HTTP Processing Errors (600-699)

| Error # | Error Name                      | Description                                                      |
| ------- | ------------------------------- | ---------------------------------------------------------------- |
| 600     | ERROR_HTTP_CORRUPTED_JSON       | Occurs when a string representation of a JSON object is corrupt. |
| 601     | ERROR_HTTP_SUPERFLUOUS_SUFFICES | Occurs when the URL contains superfluous suffices.               |

## Internal C8 Errors (1000-1099)

For errors that occur because of a programming error.

| Error # | Error Name                               | Description                                                                            |
| ------- | ---------------------------------------- | -------------------------------------------------------------------------------------- |
| 1000    | ERROR_C8DB_ILLEGAL_STATE                 | Internal error that Occurs when the datafile is not in the required state.             |
| 1002    | ERROR_C8DB_DATAFILE_SEALED               | Internal error that Occurs when trying to write to a datafile.                         |
| 1004    | ERROR_C8DB_READ_ONLY                     | Internal error that Occurs when trying to write to a read-only datafile or collection. |
| 1005    | ERROR_C8DB_DUPLICATE_IDENTIFIER          | Internal error that Occurs when a identifier duplicate is detected.                    |
| 1006    | ERROR_C8DB_DATAFILE_UNREADABLE           | Internal error that Occurs when a datafile is unreadable.                              |
| 1007    | ERROR_C8DB_DATAFILE_EMPTY                | Internal error that Occurs when a datafile is empty.                                   |
| 1008    | ERROR_C8DB_RECOVERY                      | Occurs when an error occurred during WAL log file recovery.                            |
| 1009    | ERROR_C8DB_DATAFILE_STATISTICS_NOT_FOUND | Occurs when a required datafile statistics object was not found.                       |

## External C8 Errors (1100-1199)

For errors that occur because of an outside event.

| Error # | Error Name                                     | Description                                                                                           |
| ------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 1100    | ERROR_C8DB_CORRUPTED_DATAFILE                  | Occurs when a corruption is detected in a datafile.                                                   |
| 1101    | ERROR_C8DB_ILLEGAL_PARAMETER_FILE              | Occurs if a parameter file is corrupted or cannot be read.                                            |
| 1102    | ERROR_C8DB_CORRUPTED_COLLECTION                | Occurs when a collection contains one or more corrupted data files.                                   |
| 1103    | ERROR_C8DB_MMAP_FAILED                         | Occurs when the system call mmap failed.                                                              |
| 1104    | ERROR_C8DB_FILESYSTEM_FULL                     | Occurs when the filesystem is full.                                                                   |
| 1105    | ERROR_C8DB_NO_JOURNAL                          | Occurs when a journal cannot be created.                                                              |
| 1106    | ERROR_C8DB_DATAFILE_ALREADY_EXISTS             | Occurs when the datafile cannot be created or renamed because a file of the same name already exists. |
| 1107    | ERROR_C8DB_DATADIR_LOCKED                      | Occurs when the database directory is locked by a different process.                                  |
| 1108    | ERROR_C8DB_COLLECTION_DIRECTORY_ALREADY_EXISTS | Occurs when the collection cannot be created because a directory of the same name already exists.     |
| 1109    | ERROR_C8DB_MSYNC_FAILED                        | Occurs when the system call msync failed.                                                             |
| 1110    | ERROR_C8DB_DATADIR_UNLOCKABLE                  | Occurs when the server cannot lock the database directory on startup.                                 |
| 1111    | ERROR_C8DB_SYNC_TIMEOUT                        | Occurs when the server waited too long for a datafile to be synced to disk.                           |

## General C8 Errors

For errors that occur when fulfilling a user request.

| Error # | Error Name                                  | Description                                                                                                                                           |
| ------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1200    | ERROR_C8DB_CONFLICT                         | Occurs when updating or deleting a document and a conflict has been detected.                                                                         |
| 1201    | ERROR_C8DB_DATADIR_INVALID                  | Occurs when a non-existing database directory was specified when starting the database.                                                               |
| 1202    | ERROR_C8DB_DOCUMENT_NOT_FOUND               | Occurs when a document with a given identifier or handle is unknown.                                                                                  |
| 1203    | ERROR_C8DB_COLLECTION_NOT_FOUND             | Occurs when a collection with the given identifier or name is unknown.                                                                                |
| 1204    | ERROR_C8DB_COLLECTION_PARAMETER_MISSING     | Occurs when the collection parameter is missing.                                                                                                      |
| 1205    | ERROR_C8DB_DOCUMENT_HANDLE_BAD              | Occurs when a document handle is corrupt.                                                                                                             |
| 1206    | ERROR_C8DB_MAXIMAL_SIZE_TOO_SMALL           | Occurs when the maximal size of the journal is too small.                                                                                             |
| 1207    | ERROR_C8DB_DUPLICATE_NAME                   | Occurs when a name duplicate is detected.                                                                                                             |
| 1208    | ERROR_C8DB_ILLEGAL_NAME                     | Occurs when an illegal name is detected.                                                                                                              |
| 1209    | ERROR_C8DB_NO_INDEX                         | Occurs when no suitable index for the query is known.                                                                                                 |
| 1210    | ERROR_C8DB_UNIQUE_CONSTRAINT_VIOLATED       | Occurs when there is a unique constraint violation.                                                                                                   |
| 1211    | ERROR_C8DB_VIEW_NOT_FOUND                   | Occurs when a view with the given identifier or name is unknown.                                                                                      |
| 1212    | ERROR_C8DB_INDEX_NOT_FOUND                  | Occurs when an index with a given identifier is unknown.                                                                                              |
| 1213    | ERROR_C8DB_CROSS_COLLECTION_REQUEST         | Occurs when a cross-collection is requested.                                                                                                          |
| 1214    | ERROR_C8DB_INDEX_HANDLE_BAD                 | Occurs when a index handle is corrupt.                                                                                                                |
| 1216    | ERROR_C8DB_DOCUMENT_TOO_LARGE               | Occurs when the document cannot fit into any datafile because of it is too large.                                                                     |
| 1217    | ERROR_C8DB_COLLECTION_NOT_UNLOADED          | Occurs when a collection should be unloaded, but has a different status.                                                                              |
| 1218    | ERROR_C8DB_COLLECTION_TYPE_INVALID          | Occurs when an invalid collection type is used in a request.                                                                                          |
| 1219    | ERROR_C8DB_VALIDATION_FAILED                | Occurs when the validation of an attribute of a structure failed.                                                                                     |
| 1220    | ERROR_C8DB_ATTRIBUTE_PARSER_FAILED          | Occurs when parsing an attribute name definition failed.                                                                                              |
| 1221    | ERROR_C8DB_DOCUMENT_KEY_BAD                 | Occurs when a document key is corrupt.                                                                                                                |
| 1222    | ERROR_C8DB_DOCUMENT_KEY_UNEXPECTED          | Occurs when a user-defined document key is supplied for collections with auto key generation.                                                         |
| 1224    | ERROR_C8DB_DATADIR_NOT_WRITABLE             | Occurs when the server's database directory is not writable for the current user.                                                                     |
| 1225    | ERROR_C8DB_OUT_OF_KEYS                      | Occurs when a key generator runs out of keys.                                                                                                         |
| 1226    | ERROR_C8DB_DOCUMENT_KEY_MISSING             | Occurs when a document key is missing.                                                                                                                |
| 1227    | ERROR_C8DB_DOCUMENT_TYPE_INVALID            | Occurs when there is an attempt to create a document with an invalid type.                                                                            |
| 1228    | ERROR_C8DB_DATABASE_NOT_FOUND               | Occurs when a non-existing database is accessed.                                                                                                      |
| 1229    | ERROR_C8DB_DATABASE_NAME_INVALID            | Occurs when an invalid database name is used.                                                                                                         |
| 1230    | ERROR_C8DB_USE_SYSTEM_DATABASE              | Occurs when an operation is requested in a database other than the system database.                                                                   |
| 1231    | ERROR_C8DB_ENDPOINT_NOT_FOUND               | Occurs when there is an attempt to delete a non-existing endpoint.                                                                                    |
| 1232    | ERROR_C8DB_INVALID_KEY_GENERATOR            | Occurs when an invalid key generator description is used.                                                                                             |
| 1233    | ERROR_C8DB_INVALID_EDGE_ATTRIBUTE           | Occurs when the _from or _to values of an edge are undefined or contain an invalid value.                                                             |
| 1234    | ERROR_C8DB_INDEX_DOCUMENT_ATTRIBUTE_MISSING | Occurs when an attempt to insert a document into an index is caused by in the document not having one or more attributes which the index is built on. |
| 1235    | ERROR_C8DB_INDEX_CREATION_FAILED            | Occurs when an attempt to create an index has failed.                                                                                                 |
| 1239    | ERROR_C8DB_DOCUMENT_REV_BAD                 | Occurs when a document revision is corrupt or is missing where needed.                                                                                |
| 1238    | ERROR_C8DB_COLLECTION_NOT_LOADED            | Occurs when a collection is accessed that is not yet loaded.                                                                                          |
| 1237    | ERROR_C8DB_COLLECTION_TYPE_MISMATCH         | Occurs when a collection has a different type from what has been expected.                                                                            |
| 1236    | ERROR_C8DB_WRITE_THROTTLE_TIMEOUT           | Occurs when the server is write-throttled and a write operation has waited too long for the server to process queued operations.                      |

## Checked C8 errors (1300-1399)

For errors that occur but are anticipated.

| Error # | Error Name                   | Description                                                                                    |
| ------- | ---------------------------- | ---------------------------------------------------------------------------------------------- |
| 1300    | ERROR_C8DB_DATAFILE_FULL     | Occurs when the datafile reaches its limit.                                                    |
| 1301    | ERROR_C8DB_EMPTY_DATADIR     | Occurs when encountering an empty server database directory.                                   |
| 1302    | ERROR_C8DB_TRY_AGAIN         | Occurs when an operation should be retried.                                                    |
| 1303    | ERROR_C8DB_BUSY              | Occurs when storage engine is busy.                                                            |
| 1304    | ERROR_C8DB_MERGE_IN_PROGRESS | Occurs when storage engine has a datafile merge in progress and cannot complete the operation. |
| 1305    | ERROR_C8DB_IO_ERROR          | Occurs when storage engine encounters an I/O error.                                            |

## C8 Replication Errors (1400-1449)

| Error # | Error Name                                      | Description                                                                                                                           |
| ------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1400    | ERROR_REPLICATION_NO_RESPONSE                   | Occurs when the replication applier does not receive any or an incomplete response from the master.                                   |
| 1401    | ERROR_REPLICATION_INVALID_RESPONSE              | Occurs when the replication applier receives an invalid response from the master.                                                     |
| 1402    | ERROR_REPLICATION_MASTER_ERROR                  | Occurs when the replication applier receives a server error from the master.                                                          |
| 1403    | ERROR_REPLICATION_MASTER_INCOMPATIBLE           | Occurs when the replication applier connects to a master that has an incompatible version.                                            |
| 1404    | ERROR_REPLICATION_MASTER_CHANGE                 | Occurs when the replication applier connects to a different master than before.                                                       |
| 1405    | ERROR_REPLICATION_LOOP                          | Occurs when the replication applier is asked to connect to itself for replication.                                                    |
| 1406    | ERROR_REPLICATION_UNEXPECTED_MARKER             | Occurs when an unexpected marker is found in the replication log stream.                                                              |
| 1407    | ERROR_REPLICATION_INVALID_APPLIER_STATE         | Occurs when an invalid replication applier state file is found.                                                                       |
| 1408    | ERROR_REPLICATION_UNEXPECTED_TRANSACTION        | Occurs when an unexpected transaction id is found.                                                                                    |
| 1410    | ERROR_REPLICATION_INVALID_APPLIER_CONFIGURATION | Occurs when the configuration for the replication applier is invalid.                                                                 |
| 1411    | ERROR_REPLICATION_RUNNING                       | Occurs when there is an attempt to perform an operation while the replication applier is running.                                     |
| 1412    | ERROR_REPLICATION_APPLIER_STOPPED               | Special error code used to indicate the replication applier was stopped by a user.                                                    |
| 1413    | ERROR_REPLICATION_NO_START_TICK                 | Occurs when the replication applier is started without a known start tick value.                                                      |
| 1414    | ERROR_REPLICATION_START_TICK_NOT_PRESENT        | Occurs when the replication applier fetches data using a start tick, but that start tick is not present on the logger server anymore. |
| 1416    | ERROR_REPLICATION_WRONG_CHECKSUM                | Occurs when a new born follower submits a wrong checksum.                                                                             |
| 1417    | ERROR_REPLICATION_SHARD_NONEMPTY                | Occurs when a shard is not empty and the follower tries a shortcut.                                                                   |

## C8 Cluster Errors (1450-1499)

| Error # | Error Name                                                   | Description                                                                                                                                                        |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1450    | ERROR_CLUSTER_NO_AGENCY                                      | Occurs when none of the agency servers can be connected to.                                                                                                        |
| 1451    | ERROR_CLUSTER_NO_COORDINATOR_HEADER                          | Occurs when a DB server in a cluster receives a HTTP request without a coordinator header.                                                                         |
| 1452    | ERROR_CLUSTER_COULD_NOT_LOCK_PLAN                            | Occurs when a coordinator in a cluster cannot lock the Plan hierarchy in the agency.                                                                               |
| 1453    | ERROR_CLUSTER_COLLECTION_ID_EXISTS                           | Occurs when a coordinator in a cluster tries to create a collection and the collection ID already exists.                                                          |
| 1454    | ERROR_CLUSTER_COULD_NOT_CREATE_COLLECTION_IN_PLAN            | Occurs when a coordinator in a cluster cannot create an entry for a new collection in the Plan hierarchy in the agency.                                            |
| 1455    | ERROR_CLUSTER_COULD_NOT_READ_CURRENT_VERSION                 | Occurs when a coordinator in a cluster cannot read the Version entry in the Current hierarchy in the agency.                                                       |
| 1456    | ERROR_CLUSTER_COULD_NOT_CREATE_COLLECTION                    | Occurs when a coordinator in a cluster notices that some DBServers report problems when creating shards for a new collection.                                      |
| 1457    | ERROR_CLUSTER_TIMEOUT                                        | Occurs when a coordinator in a cluster runs into a timeout for some cluster wide operation.                                                                        |
| 1458    | ERROR_CLUSTER_COULD_NOT_REMOVE_COLLECTION_IN_PLAN            | Occurs when a coordinator in a cluster cannot remove an entry for a collection in the Plan hierarchy in the agency.                                                |
| 1459    | ERROR_CLUSTER_COULD_NOT_REMOVE_COLLECTION_IN_CURRENT         | Occurs when a coordinator in a cluster cannot remove an entry for a collection in the Current hierarchy in the agency.                                             |
| 1460    | ERROR_CLUSTER_COULD_NOT_CREATE_DATABASE_IN_PLAN              | Occurs when a coordinator in a cluster cannot create an entry for a new database in the Plan hierarchy in the agency.                                              |
| 1461    | ERROR_CLUSTER_COULD_NOT_CREATE_DATABASE                      | Occurs when a coordinator in a cluster notices that some DBServers report problems when creating databases for a new cluster wide database.                        |
| 1462    | ERROR_CLUSTER_COULD_NOT_REMOVE_DATABASE_IN_PLAN              | Occurs when a coordinator in a cluster cannot remove an entry for a database in the Plan hierarchy in the agency.                                                  |
| 1463    | ERROR_CLUSTER_COULD_NOT_REMOVE_DATABASE_IN_CURRENT           | Occurs when a coordinator in a cluster cannot remove an entry for a database in the Current hierarchy in the agency.                                               |
| 1464    | ERROR_CLUSTER_SHARD_GONE                                     | Occurs when a coordinator in a cluster cannot determine the shard that is responsible for a given document.                                                        |
| 1465    | ERROR_CLUSTER_CONNECTION_LOST                                | Occurs when a coordinator in a cluster loses an HTTP connection to a DBserver in the cluster while transferring data.                                              |
| 1466    | ERROR_CLUSTER_MUST_NOT_SPECIFY_KEY                           | Occurs when a coordinator in a cluster finds that the _key attribute was specified in a sharded collection the uses not only _key as sharding attribute.           |
| 1467    | ERROR_CLUSTER_GOT_CONTRADICTING_ANSWERS                      | Occurs if a coordinator in a cluster gets conflicting results from different shards, which should never happen.                                                    |
| 1468    | ERROR_CLUSTER_NOT_ALL_SHARDING_ATTRIBUTES_GIVEN              | Occurs if a coordinator tries to find out which shard is responsible for a partial document, but cannot do this because not all sharding attributes are specified. |
| 1469    | ERROR_CLUSTER_MUST_NOT_CHANGE_SHARDING_ATTRIBUTES            | Occurs if there is an attempt to update the value of a shard attribute.                                                                                            |
| 1470    | ERROR_CLUSTER_UNSUPPORTED                                    | Occurs when there is an attempt to carry out an operation that is not supported in the context of a sharded collection.                                            |
| 1471    | ERROR_CLUSTER_ONLY_ON_COORDINATOR                            | Occurs if there is an attempt to run a coordinator-only operation on a different type of node.                                                                     |
| 1472    | ERROR_CLUSTER_READING_PLAN_AGENCY                            | Occurs if a coordinator or DB server cannot read the Plan in the agency.                                                                                           |
| 1473    | ERROR_CLUSTER_COULD_NOT_TRUNCATE_COLLECTION                  | Occurs if a coordinator cannot truncate all shards of a cluster collection.                                                                                        |
| 1474    | ERROR_CLUSTER_C8QL_COMMUNICATION                             | Occurs if the internal communication of the cluster for C8QL produces an error.                                                                                    |
| 1475    | ERROR_C8DB_DOCUMENT_NOT_FOUND_OR_SHARDING_ATTRIBUTES_CHANGED | Occurs when a document with a given identifier or handle is unknown, or if the sharding attributes have been changed in a REPLACE operation in the cluster.        |
| 1476    | ERROR_CLUSTER_COULD_NOT_DETERMINE_ID                         | Occurs if a cluster server at startup could not determine its own ID from the local info provided.                                                                 |
| 1477    | ERROR_CLUSTER_ONLY_ON_DBSERVER                               | Occurs if there is an attempt to run a DBserver-only operation on a different type of node.                                                                        |
| 1478    | ERROR_CLUSTER_BACKEND_UNAVAILABLE                            | Occurs if a required DB server can't be reached.                                                                                                                   |
| 1479    | ERROR_CLUSTER_UNKNOWN_CALLBACK_ENDPOINT                      | Could not find an endpoint.                                                                                                                                        |
| 1480    | ERROR_CLUSTER_AGENCY_STRUCTURE_INVALID                       | The structure in the agency is invalid.                                                                                                                            |
| 1481    | ERROR_CLUSTER_C8QL_COLLECTION_OUT_OF_SYNC                    | Occurs if a collection needed during query execution is out of sync. This currently can only happen when using satellite collections.                              |
| 1482    | ERROR_CLUSTER_COULD_NOT_CREATE_INDEX_IN_PLAN                 | Occurs when a coordinator in a cluster cannot create an entry for a new index in the Plan hierarchy in the agency.                                                 |
| 1483    | ERROR_CLUSTER_COULD_NOT_DROP_INDEX_IN_PLAN                   | Occurs when a coordinator in a cluster cannot remove an index from the Plan hierarchy in the agency.                                                               |
| 1484    | ERROR_CLUSTER_CHAIN_OF_DISTRIBUTESHARDSLIKE                  | Occurs if one tries to create a collection with a distributeShardsLike attribute which points to another collection that also has one.                             |
| 1485    | ERROR_CLUSTER_MUST_NOT_DROP_COLL_OTHER_DISTRIBUTESHARDSLIKE  | Occurs if one tries to drop a collection to which another collection points with its distributeShardsLike attribute.                                               |
| 1486    | ERROR_CLUSTER_UNKNOWN_DISTRIBUTESHARDSLIKE                   | Occurs if one tries to create a collection which points to an unknown collection in its distributeShardsLike attribute.                                            |
| 1487    | ERROR_CLUSTER_INSUFFICIENT_DBSERVERS                         | Occurs if one tries to create a collection with a replicationFactor greater than the available number of DB servers.                                               |
| 1488    | ERROR_CLUSTER_COULD_NOT_DROP_FOLLOWER                        | Occurs if a follower that ought to be dropped could not be dropped in the agency (under Current).                                                                  |
| 1489    | ERROR_CLUSTER_SHARD_LEADER_REFUSES_REPLICATION               | Occurs if a replication operation is refused by a shard leader.                                                                                                    |
| 1490    | ERROR_CLUSTER_SHARD_FOLLOWER_REFUSES_OPERATION               | Occurs if a non-replication operation is refused by a shard follower.                                                                                              |
| 1491    | ERROR_CLUSTER_SHARD_LEADER_RESIGNED                          | Occurs if a non-replication operation is refused by a former shard leader that has found out that it is no longer the leader.                                      |
| 1492    | ERROR_CLUSTER_AGENCY_COMMUNICATION_FAILED                    | Occurs if after various retries an agency operation could not be performed successfully.                                                                           |
| 1493    | ERROR_CLUSTER_DISTRIBUTE_SHARDS_LIKE_REPLICATION_FACTOR      | Occurs if intended replication factor does not match that of the prototype shard given in distributeShardsLike parameter.                                          |
| 1494    | ERROR_CLUSTER_DISTRIBUTE_SHARDS_LIKE_NUMBER_OF_SHARDS        | Occurs if intended number of shards does not match that of the prototype shard given in distributeShardsLike parameter.                                            |
| 1495    | ERROR_CLUSTER_LEADERSHIP_CHALLENGE_ONGOING                   | Occurs when servers are currently competing for leadership, and the result is still unknown.                                                                       |
| 1496    | ERROR_CLUSTER_NOT_LEADER                                     | Occurs when an operation is sent to a non-leading server.                                                                                                          |
  
## C8 Query Errors (1500-1579)

| Error # | Error Name                                    | Description                                                                                                                   |
| ------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1500    | ERROR_QUERY_KILLED                            | Occurs when a running query is killed by an explicit admin command.                                                           |
| 1501    | ERROR_QUERY_PARSE                             | Occurs when query is parsed and is found to be syntactically invalid.                                                         |
| 1502    | ERROR_QUERY_EMPTY                             | Occurs when an empty query is specified.                                                                                      |
| 1503    | ERROR_QUERY_SCRIPT                            | Occurs when a runtime error is caused by the query.                                                                           |
| 1504    | ERROR_QUERY_NUMBER_OUT_OF_RANGE               | Occurs when a number is outside the expected range.                                                                           |
| 1510    | ERROR_QUERY_VARIABLE_NAME_INVALID             | Occurs when an invalid variable name is used.                                                                                 |
| 1511    | ERROR_QUERY_VARIABLE_REDECLARED               | Occurs when a variable gets re-assigned in a query.                                                                           |
| 1512    | ERROR_QUERY_VARIABLE_NAME_UNKNOWN             | Occurs when an unknown variable is used or the variable is undefined the context it is used.                                  |
| 1521    | ERROR_QUERY_COLLECTION_LOCK_FAILED            | Occurs when a read lock on the collection cannot be acquired.                                                                 |
| 1522    | ERROR_QUERY_TOO_MANY_COLLECTIONS              | Occurs when the number of collections in a query is beyond the allowed value.                                                 |
| 1530    | ERROR_QUERY_DOCUMENT_ATTRIBUTE_REDECLARED     | Occurs when a document attribute is re-assigned.                                                                              |
| 1540    | ERROR_QUERY_FUNCTION_NAME_UNKNOWN             | Occurs when an undefined function is called.                                                                                  |
| 1541    | ERROR_QUERY_FUNCTION_ARGUMENT_NUMBER_MISMATCH | Occurs when the number of arguments used in a function call does not match the expected number of arguments for the function. |
| 1542    | ERROR_QUERY_FUNCTION_ARGUMENT_TYPE_MISMATCH   | Occurs when the type of an argument used in a function call does not match the expected argument type.                        |
| 1543    | ERROR_QUERY_INVALID_REGEX                     | Occurs when an invalid regex argument value is used in a call to a function that expects a regex.                             |
| 1550    | ERROR_QUERY_BIND_PARAMETERS_INVALID           | Occurs when the structure of bind parameters passed has an unexpected format.                                                 |
| 1551    | ERROR_QUERY_BIND_PARAMETER_MISSING            | Occurs when a bind parameter was declared in the query but the query is being executed with no value for that parameter.      |
| 1552    | ERROR_QUERY_BIND_PARAMETER_UNDECLARED         | Occurs when a value gets specified for an undeclared bind parameter.                                                          |
| 1553    | ERROR_QUERY_BIND_PARAMETER_TYPE               | Occurs when a bind parameter has an invalid value or type.                                                                    |
| 1560    | ERROR_QUERY_INVALID_LOGICAL_VALUE             | Occurs when a non-boolean value is used in a logical operation.                                                               |
| 1561    | ERROR_QUERY_INVALID_ARITHMETIC_VALUE          | Occurs when a non-numeric value is used in an arithmetic operation.                                                           |
| 1562    | ERROR_QUERY_DIVISION_BY_ZERO                  | Occurs when there is an attempt to divide by zero.                                                                            |
| 1563    | ERROR_QUERY_ARRAY_EXPECTED                    | Occurs when a non-array operand is used for an operation that expects an array argument operand.                              |
| 1569    | ERROR_QUERY_FAIL_CALLED                       | Occurs when the function FAIL() is called from inside a query.                                                                |
| 1570    | ERROR_QUERY_GEO_INDEX_MISSING                 | Occurs when a geo restriction was specified but no suitable geo index is found to resolve it.                                 |
| 1571    | ERROR_QUERY_FULLTEXT_INDEX_MISSING            | Occurs when a fulltext query is performed on a collection without a suitable fulltext index.                                  |
| 1572    | ERROR_QUERY_INVALID_DATE_VALUE                | Occurs when a value cannot be converted to a date.                                                                            |
| 1573    | ERROR_QUERY_MULTI_MODIFY                      | Occurs when an C8QL query contains more than one data-modifying operation.                                                    |
| 1574    | ERROR_QUERY_INVALID_AGGREGATE_EXPRESSION      | Occurs when an C8QL query contains an invalid aggregate expression.                                                           |
| 1575    | ERROR_QUERY_COMPILE_TIME_OPTIONS              | Occurs when an C8QL data-modification query contains options that cannot be figured out at query compile time.                |
| 1576    | ERROR_QUERY_EXCEPTION_OPTIONS                 | Occurs when an C8QL data-modification query contains an invalid options specification.                                        |
| 1577    | ERROR_QUERY_COLLECTION_USED_IN_EXPRESSION     | Occurs when a collection is used as an operand in an C8QL expression.                                                         |
| 1578    | ERROR_QUERY_DISALLOWED_DYNAMIC_CALL           | Occurs when a dynamic function call is made to a function that cannot be called dynamically.                                  |
| 1579    | ERROR_QUERY_ACCESS_AFTER_MODIFICATION         | Occurs when collection data are accessed after a data-modification operation.                                                 |

## C8QL User Function Errors (1580-1589)

| Error # | Error Name                         | Description                                                     |
| ------- | ---------------------------------- | --------------------------------------------------------------- |
| 1580    | ERROR_QUERY_FUNCTION_INVALID_NAME  | Occurs when a user function with an invalid name is registered. |
| 1581    | ERROR_QUERY_FUNCTION_INVALID_CODE  | Occurs when a user function is registered with invalid code.    |
| 1582    | ERROR_QUERY_FUNCTION_NOT_FOUND     | Occurs when a user function is accessed but not found.          |
| 1583    | ERROR_QUERY_FUNCTION_RUNTIME_ERROR | Occurs when a user function throws a runtime exception.         |

## C8QL Query Registry Errors (1590-1599)

| Error # | Error Name                | Description                                                                    |
| ------- | ------------------------- | ------------------------------------------------------------------------------ |
| 1590    | ERROR_QUERY_BAD_JSON_PLAN | Occurs when an HTTP API for a query got an invalid JSON object.                |
| 1591    | ERROR_QUERY_NOT_FOUND     | Occurs when an Id of a query is not found by the HTTP API.                     |
| 1592    | ERROR_QUERY_IN_USE        | Occurs when an Id of a query is found by the HTTP API but the query is in use. |

## C8 Cursor Errors (1600-1699)

| Error # | Error Name             | Description                                                                                      |
| ------- | ---------------------- | ------------------------------------------------------------------------------------------------ |
| 1600    | ERROR_CURSOR_NOT_FOUND | Occurs when a cursor is requested via its id but a cursor with that ID cannot be found.          |
| 1601    | ERROR_CURSOR_BUSY      | Occurs when a cursor is requested via its id but a concurrent request is still using the cursor. |

## User Management Errors (1700-1799)

| Error # | Error Name                  | Description                                                 |
| ------- | --------------------------- | ----------------------------------------------------------- |
| 1700    | ERROR_USER_INVALID_NAME     | Occurs when an invalid user name is used.                   |
| 1701    | ERROR_USER_INVALID_PASSWORD | Occurs when an invalid password is used.                    |
| 1702    | ERROR_USER_DUPLICATE        | Occurs when a user name already exists.                     |
| 1703    | ERROR_USER_NOT_FOUND        | Occurs when a user name is updated that does not exist.     |
| 1704    | ERROR_USER_CHANGE_PASSWORD  | Occurs when the user must change his password.              |
| 1705    | ERROR_USER_EXTERNAL         | Occurs when the user is authenicated by an external server. |

## Task Errors (1850-1859)

| Error # | Error Name              | Description                                                  |
| ------- | ----------------------- | ------------------------------------------------------------ |
| 1850    | ERROR_TASK_INVALID_ID   | Occurs when a task is created with an invalid ID.            |
| 1851    | ERROR_TASK_DUPLICATE_ID | Occurs when a task ID is created with a duplicate ID.        |
| 1852    | ERROR_TASK_NOT_FOUND    | Occurs when a task with the specified ID could not be found. |

## Graph and Traversal Errors (1900-1949)

| Error # | Error Name                                      | Description                                                                 |
| ------- | ----------------------------------------------- | --------------------------------------------------------------------------- |
| 1901    | ERROR_GRAPH_INVALID_GRAPH                       | Occurs when an invalid name is passed to the server.                        |
| 1902    | ERROR_GRAPH_COULD_NOT_CREATE_GRAPH              | Occurs when an invalid name, vertices, or edges are passed to the server.   |
| 1903    | ERROR_GRAPH_INVALID_VERTEX                      | Occurs when an invalid vertex ID is passed to the server.                   |
| 1904    | ERROR_GRAPH_COULD_NOT_CREATE_VERTEX             | Occurs when the vertex could not be created.                                |
| 1905    | ERROR_GRAPH_COULD_NOT_CHANGE_VERTEX             | Occurs when the vertex could not be changed.                                |
| 1906    | ERROR_GRAPH_INVALID_EDGE                        | Occurs when an invalid edge ID is passed to the server.                     |
| 1907    | ERROR_GRAPH_COULD_NOT_CREATE_EDGE               | Occurs when the edge could not be created.                                  |
| 1908    | ERROR_GRAPH_COULD_NOT_CHANGE_EDGE               | Occurs when the edge could not be changed.                                  |
| 1909    | ERROR_GRAPH_TOO_MANY_ITERATIONS                 | Occurs when too many iterations are done in a graph traversal.              |
| 1910    | ERROR_GRAPH_INVALID_FILTER_RESULT               | Occurs when an invalid filter result is returned in a graph traversal.      |
| 1920    | ERROR_GRAPH_COLLECTION_MULTI_USE                | An edge collection may only be used once in one edge definition of a graph. |
| 1921    | ERROR_GRAPH_COLLECTION_USE_IN_MULTI_GRAPHS      | Collection is already used by another graph in a different edge definition. |
| 1922    | ERROR_GRAPH_CREATE_MISSING_NAME                 | A graph name is required to create a graph.                                 |
| 1923    | ERROR_GRAPH_CREATE_MALFORMED_EDGE_DEFINITION    | The edge definition is malformed. It has to be an array of objects.         |
| 1924    | ERROR_GRAPH_NOT_FOUND                           | A graph with this name could not be found.                                  |
| 1925    | ERROR_GRAPH_DUPLICATE                           | A graph with this name already exists.                                      |
| 1926    | ERROR_GRAPH_VERTEX_COL_DOES_NOT_EXIST           | The specified vertex collection does not exist or is not part of the graph. |
| 1927    | ERROR_GRAPH_WRONG_COLLECTION_TYPE_VERTEX        | The collection is not a vertex collection.                                  |
| 1928    | ERROR_GRAPH_NOT_IN_ORPHAN_COLLECTION            | Vertex collection not in orphan collection of the graph.                    |
| 1929    | ERROR_GRAPH_COLLECTION_USED_IN_EDGE_DEF         | The collection is already used in an edge definition of the graph.          |
| 1930    | ERROR_GRAPH_EDGE_COLLECTION_NOT_USED            | The edge collection is not used in any edge definition of the graph.        |
| 1932    | ERROR_GRAPH_NO_GRAPH_COLLECTION                 | Collection _graphs does not exist.                                          |
| 1933    | ERROR_GRAPH_INVALID_EXAMPLE_ARRAY_OBJECT_STRING | Invalid example type. Has to be String, Array, or Object.                   |
| 1934    | ERROR_GRAPH_INVALID_EXAMPLE_ARRAY_OBJECT        | Invalid example type. Has to be Array or Object.                            |
| 1935    | ERROR_GRAPH_INVALID_NUMBER_OF_ARGUMENTS         | Invalid number of arguments.                                                |
| 1936    | ERROR_GRAPH_INVALID_PARAMETER                   | Invalid parameter type.                                                     |
| 1937    | ERROR_GRAPH_INVALID_ID                          | Invalid ID.                                                                 |
| 1938    | ERROR_GRAPH_COLLECTION_USED_IN_ORPHANS          | The collection is already used in the orphans of the graph.                 |
| 1939    | ERROR_GRAPH_EDGE_COL_DOES_NOT_EXIST             | The specified edge collection does not exist or is not part of the graph.   |
| 1940    | ERROR_GRAPH_EMPTY                               | The requested graph has no edge collections.                                |

## Session Errors (1950-1999)

| Error # | Error Name            | Description                                                        |
| ------- | --------------------- | ------------------------------------------------------------------ |
| 1950    | ERROR_SESSION_UNKNOWN | Occurs when an invalid/unknown session ID is passed to the server. |
| 1951    | ERROR_SESSION_EXPIRED | Occurs when a session is expired.                                  |

## Communicator Errors (2100-2199)

| Error # | Error Name                   | Description                 |
| ------- | ---------------------------- | --------------------------- |
| 2100    | COMMUNICATOR_REQUEST_ABORTED | Request was aborted.        |
| 2101    | COMMUNICATOR_DISABLED        | Communication was disabled. |

## Cluster Repair Errors (5000-5099)

| Error # | Error Name                                        | Description                                                                                                                                                                         |
| ------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 5000    | ERROR_CLUSTER_REPAIRS_FAILED                      | General error during cluster repairs                                                                                                                                                |
| 5001    | ERROR_CLUSTER_REPAIRS_NOT_ENOUGH_HEALTHY          | Occurs when, during repairDistributeShardsLike, there must be a free DB server to move a shard, but there is no candidate or none is healthy.                                       |
| 5002    | ERROR_CLUSTER_REPAIRS_REPLICATION_FACTOR_VIOLATED | Occurs on various inconsistencies regarding the replication factor.                                                                                                                 |
| 5003    | ERROR_CLUSTER_REPAIRS_NO_DBSERVERS                | Occurs if a collection that is fixed has some shard without DB servers.                                                                                                             |
| 5004    | ERROR_CLUSTER_REPAIRS_MISMATCHING_LEADERS         | Occurs if a shard in collection and its prototype in the corresponding distributeShardsLike collection have mismatching leaders (when they should already have been fixed).         |
| 5005    | ERROR_CLUSTER_REPAIRS_MISMATCHING_FOLLOWERS       | Occurs if a shard in collection and its prototype in the corresponding distributeShardsLike collection don't have the same followers (when they should already have been adjusted). |
| 5006    | ERROR_CLUSTER_REPAIRS_INCONSISTENT_ATTRIBUTES     | Occurs if a collection that is fixed does (not) have distributeShardsLike when it is expected, or does (not) have repairingDistributeShardsLike when it is expected.                |
| 5007    | ERROR_CLUSTER_REPAIRS_MISMATCHING_SHARDS          | Occurs if in a collection and its distributeShardsLike prototype collection some shard and its prototype have an unequal number of DB servers.                                      |
| 5008    | ERROR_CLUSTER_REPAIRS_JOB_FAILED                  | Occurs if a move shard job in the agency failed during cluster repairs.                                                                                                             |
| 5009    | ERROR_CLUSTER_REPAIRS_JOB_DISAPPEARED             | Occurs if a move shard job in the agency cannot be found anymore before it finished.                                                                                                |
| 5010    | ERROR_CLUSTER_REPAIRS_OPERATION_FAILED            | Occurs if an agency transaction failed during either sending or executing it.                                                                                                       |

## Agency Errors (20000-20099)

| Error # | Error Name                                    | Description                                                                      |
| ------- | --------------------------------------------- | -------------------------------------------------------------------------------- |
| 20001   | ERROR_AGENCY_INQUIRY_SYNTAX                   | Inquiry handles a list of string clientIds: [clientId, ...].                     |
| 20011   | ERROR_AGENCY_INFORM_MUST_BE_OBJECT            | The inform message in the agency must be an object.                              |
| 20012   | ERROR_AGENCY_INFORM_MUST_CONTAIN_TERM         | The inform message in the agency must contain a uint parameter 'term'.           |
| 20013   | ERROR_AGENCY_INFORM_MUST_CONTAIN_ID           | The inform message in the agency must contain a string parameter 'id'.           |
| 20014   | ERROR_AGENCY_INFORM_MUST_CONTAIN_ACTIVE       | The inform message in the agency must contain an array 'active'.                 |
| 20015   | ERROR_AGENCY_INFORM_MUST_CONTAIN_POOL         | The inform message in the agency must contain an object 'pool'.                  |
| 20016   | ERROR_AGENCY_INFORM_MUST_CONTAIN_MIN_PING     | The inform message in the agency must contain an object 'min ping'.              |
| 20017   | ERROR_AGENCY_INFORM_MUST_CONTAIN_MAX_PING     | The inform message in the agency must contain an object 'max ping'.              |
| 20018   | ERROR_AGENCY_INFORM_MUST_CONTAIN_TIMEOUT_MULT | The inform message in the agency must contain an object 'timeoutMult'.           |
| 20020   | ERROR_AGENCY_INQUIRE_CLIENT_ID_MUST_BE_STRING | Inquiry by clientId failed.                                                      |
| 20021   | ERROR_AGENCY_CANNOT_REBUILD_DBS               | Occurs if the readDB or the spearHead cannot be rebuilt from the replicated log. |

## Supervision Errors (20500-20599)

| Error # | Error Name                        | Description                  |
| ------- | --------------------------------- | ---------------------------- |
| 20501   | ERROR_SUPERVISION_GENERAL_FAILURE | General supervision failure. |

## Dispatcher Errors (21000-21099)

| Error # | Error Name                   | Description                                                |
| ------- | ---------------------------- | ---------------------------------------------------------- |
| 21001   | ERROR_DISPATCHER_IS_STOPPING | Will be returned if a shutdown is in progress.             |
| 21002   | ERROR_QUEUE_UNKNOWN          | Will be returned if a queue with this name does not exist. |
| 21003   | ERROR_QUEUE_FULL             | Will be returned if a queue with this name is full.        |