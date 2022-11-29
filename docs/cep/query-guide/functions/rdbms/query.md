---
title: query (Stream Processor)
---

This function performs SQL retrieval queries on data sources.

Syntax

    rdbms:query(<STRING> datasource.name, <STRING> attribute.definition.list, <STRING> query)
    rdbms:query(<STRING> datasource.name, <STRING> attribute.definition.list, <STRING> query, <STRING|BOOL|INT|DOUBLE|FLOAT|LONG> parameter)
    rdbms:query(<STRING> datasource.name, <STRING> attribute.definition.list, <STRING> query, <STRING|BOOL|INT|DOUBLE|FLOAT|LONG> parameter, <STRING|BOOL|INT|DOUBLE|FLOAT|LONG> ...)

## Query Parameters

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Default Value | Possible Data Types               | Optional | Dynamic |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| datasource.name           | The name of the datasource for which the query should be performed. |               | STRING                            | No       | No      |
| attribute.definition.list | This is provided as a comma-separated list in the `<AttributeName AttributeType>` format. The SQL query is expected to return the attributes in the given order. e.g., If one attribute is defined here, the SQL query should return one column result set. If more than one column is returned, then the first column is processed. The  data types supported are `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, and `BOOL`. Mapping of the  data type to the database data type can be done as follows, \* Datatype\* -\> \*Datasource Datatype\* `STRING` -\> `CHAR`,`VARCHAR`,`LONGVARCHAR` `INT` -\> `INTEGER` `LONG` -\> `BIGINT` `DOUBLE`-\> `DOUBLE` `FLOAT` -\> `REAL` `BOOL` -\> `BIT` |               | STRING                            | No       | No      |
| query                     | The select query(formatted according to the relevant database type) that needs to be performed |               | STRING                            | No       | Yes     |
| parameter                 | If the second parameter is a parametrised SQL query, then stream processor attributes can be passed to set the values of the parameters |               | STRING BOOL INT DOUBLE FLOAT LONG | Yes      | Yes     |

Extra Return Attributes

| Name          | Description                    | Possible Types                    |
|---------------|---------------------------------------------------------------------------------------------|-----------------------------------|
| attributeName | The return attributes will be the ones defined in the parameter`attribute.definition.list`. | STRING INT LONG DOUBLE FLOAT BOOL |

## Example 1

    insert into recordStream
    select creditcardno, country, transaction, amount
    from TriggerStream#rdbms:query('SAMPLE_DB', 'creditcardno string, country string, transaction string, amount int', 'select * from Transactions_Table');

Events inserted into recordStream includes all records matched for the
query i.e an event will be generated for each record retrieved from the
datasource. The event will include as additional attributes, the
attributes defined in the `attribute.definition.list`(creditcardno,
country, transaction, amount).

## Example 2

    insert into recordStream
    select creditcardno, country, transaction, amount
    from TriggerStream#rdbms:query('SAMPLE_DB', 'creditcardno string, country string,transaction string, amount int', 'select * from where country=?', countrySearchWord);

Events inserted into recordStream includes all records matched for the
query i.e an event will be generated for each record retrieved from the
datasource. The event will include as additional attributes, the
attributes defined in the `attribute.definition.list`(creditcardno,
country, transaction, amount). countrySearchWord value from the event
will be set in the query when querying the datasource.
