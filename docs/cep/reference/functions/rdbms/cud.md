---
title: cud (Stream Processor)
---

This function performs SQL CUD (INSERT, UPDATE, DELETE) queries on data sources. 

Syntax

    rdbms:cud(<STRING> datasource.name, <STRING> query)
    rdbms:cud(<STRING> datasource.name, <STRING> query, <STRING|BOOL|INT|DOUBLE|FLOAT|LONG> parameter)
    rdbms:cud(<STRING> datasource.name, <STRING> query, <STRING|BOOL|INT|DOUBLE|FLOAT|LONG> parameter, <STRING|BOOL|INT|DOUBLE|FLOAT|LONG> ...)

## Query Parameters

| Name            | Description                                                                                                                                                                                                     | Default Value | Possible Data Types               | Optional | Dynamic |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| datasource.name | The name of the datasource for which the query should be performed.  |               | STRING                            | No       | No      |
| query           | The update, delete, or insert query(formatted according to the relevant database type) that needs to be performed.                                                                                              |               | STRING                            | No       | Yes     |
| parameter       | If the second parameter is a parametrised SQL query, then stream processor attributes can be passed to set the values of the parameters                                                                                   |               | STRING BOOL INT DOUBLE FLOAT LONG | Yes      | Yes     |

System Parameters

| Name                   | Description                                                                                        | Default Value | Possible Parameters |
|------------------------|----------------------------------------------------------------------------------------------------|---------------|---------------------|
| perform.CUD.operations | If this parameter is set to `true`, the RDBMS CUD function is enabled to perform CUD operations. | false         | true false          |

Extra Return Attributes

| Name       | Description                                     | Possible Types |
|------------|-------------------------------------------------|----------------|
| numRecords | The number of records manipulated by the query. | INT            |

## Example 1

    insert into  RecordStream
    select numRecords
    from TriggerStream#rdbms:cud("SAMPLE_DB", "UPDATE Customers_Table SET customerName='abc' where customerName='xyz'");

This query updates the events from the input stream named
`TriggerStream` with an additional attribute named `numRecords`, of
which the value indicates the number of records manipulated. The updated
events are inserted into an output stream named `RecordStream`.

## Example 2

    insert into  RecordStream
    select numRecords
    from TriggerStream#rdbms:cud("SAMPLE_DB", "UPDATE Customers_Table SET customerName=? where customerName=?", changedName, previousName);

This query updates the events from the input stream named `TriggerStream` with an additional attribute named `numRecords`, of which the value indicates the number of records manipulated. The updated events are inserted into an output stream named `RecordStream`. Here the values of attributes changedName and previousName in the event will be set to the query.
