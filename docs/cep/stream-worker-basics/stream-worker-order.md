---
sidebar_position: 50
title: Stream Worker Order
---

Stream worker components must be listed in a certain order in order to be valid.

## 1. Metadata

Metadata includes required information like the stream worker name and optional information, such as the description.

Metadata must always be the first element in a stream worker, otherwise the stream worker is invalid.

For more information about metadata, refer to [Metadata](../metadata).

## 2. CREATE Statements



## 3. Queries


## Example

Here is an example stream worker with the parts labeled.

```sql
-- Metadata
@App:name("IntrusionDetectionSystem")
@App:description('The stream worker subscribes to collection InboundTraffic and check for suspicious inbound traffic.')
@App:qlVersion('2')

/**
The source stream InboundTraffic is proving ip hits in a server
if the same ip is hitting more than 50 times within 2 seconds, consider it as suspicious traffic
add raise an alarm if same IP matches in our SuspiciousIPTable.

Testing the stream worker:

    1. Create the collection `InboundTrafficData` of type document;
    
    2. Create a Table SuspiciousIPTable with entries for suspicious IPs 
    
    3. Run the stream app;

    4. Check the sink stream `Alarm` . The data should be available here.

*/

-- CREATE statements
CREATE SOURCE InboundTraffic WITH (type = 'database', collection = "InboundTrafficData", collection.type="doc" , replication.type="global", map.type='json') (ip string);

CREATE TABLE SuspiciousIPTable (blocked_ip string);

CREATE SINK STREAM Alarm (ip string, requestCount long , incidentTime long);

-- Query
INSERT INTO Alarm
SELECT ip, count(ip) AS requestCount, currentTimeMillis() AS incidentTime
FROM InboundTraffic WINDOW SLIDING_TIME(2 sec) AS IT
JOIN SuspiciousIPTable AS SIP
ON  IT.ip == SIP.blocked_ip
GROUP BY ip
HAVING requestCount > 50 ;
```