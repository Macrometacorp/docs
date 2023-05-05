---
sidebar_position: 110
title: Real-time Data Anonymization
---

# Data Anonymization with Stream Workers

The anonymizer function is an extension in Macrometa's Stream Workers that allows you to replace sensitive data with fake data that resembles the original. This function can be used to obfuscate various data types, such as names, addresses, phone numbers, email addresses, and more. By using this function, you can ensure the privacy and protection of sensitive data while still retaining its structure and format.

For more technical information, refer to the [anonymizer](query-guide/functions/anonymizer/) documentation.

## Why Anonymize Data?

Anonymizing sensitive data is essential for complying with data protection regulations and safeguarding user privacy. The anonymizer function is useful in the following situations:

1. Protecting personally identifiable information (PII) in healthcare or financial records
2. Anonymizing user data in application logs and analytics
3. Ensuring privacy in user-generated content or feedback
4. Complying with data protection laws and regulations, such as GDPR
5. Enhancing security and reducing the risk of data breaches

## Stream Worker Examples

These examples demonstrate different levels of complexity, showcasing how to anonymize data and perform additional data processing tasks in various industries. By understanding and implementing anonymization in your data processing workflows, you can protect sensitive information while still gaining valuable insights.

### Example 1: Anonymizing Customer Names in a Data Stream

```sql
CREATE STREAM CustomerDataStream (fullName string, age int, city string);
CREATE SINK STREAM AnonymizedNamesStream (fullName string, age int, city string);

@info(name = 'anonymizeCustomerNames')
INSERT INTO AnonymizedNamesStream
SELECT pii:fake(fullName, "NAME_FULLNAME", false) as fullName,
       age,
       city
FROM CustomerDataStream;
```

In this example, a `CustomerDataStream` is created to store customer data with attributes fullName, age, and city. An `AnonymizedNamesStream` sink stream is created to store the anonymized customer data with the same attributes: fullName, age, and city.

The `anonymizeCustomerNames` query processes events from the `CustomerDataStream`. It anonymizes the fullName attribute using the `pii:fake` function, replacing the original names with fake full names. The anonymized fullName, age, and city are then inserted into the `AnonymizedNamesStream` sink stream. This process maintains the age and city data while providing privacy for customer names.

### Example 2: Anonymizing Patient Records and Categorizing by Age Range

```sql
CREATE STREAM PatientRecordsStream (fullName string, ssn string, age int, city string);
CREATE SINK STREAM AnonymizedRecordsStream (fullName string, ssn string, ageRange string, city string);

CREATE TABLE AgeRangeTable (minAge int, maxAge int, _key string);
CREATE TRIGGER StartTrigger WITH ( expression = 'start' );

-- Inserting age range reference records into AgeRangeTable when the stream worker is started
INSERT INTO AgeRangeTable
SELECT 0 as minAge, 17 as maxAge, '0-17' as _key
FROM StartTrigger;
INSERT INTO AgeRangeTable
SELECT 18 as minAge, 34 as maxAge, '18-34' as _key
FROM StartTrigger;
INSERT INTO AgeRangeTable
SELECT 35 as minAge, 64 as maxAge, '35-64' as _key
FROM StartTrigger;
INSERT INTO AgeRangeTable
SELECT 65 as minAge, 200 as maxAge, '65+' as _key
FROM StartTrigger;

-- Anonymize patient data and get age range from AgeRangeTable
@info(name = 'anonymizePatientData')
INSERT INTO AnonymizedRecordsStream
SELECT pii:fake(fullName, "NAME_FULLNAME", false) as fullName,
       pii:fake(ssn, "ID_SSN", false) as ssn,
       ar._key as ageRange,
       city
FROM PatientRecordsStream as pr
JOIN AgeRangeTable as ar ON pr.age >= ar.minAge AND pr.age <= ar.maxAge;
```

In this example, a `PatientRecordsStream` is created to store patient records with attributes fullName, ssn, age, and city. An `AnonymizedRecordsStream` sink stream is created to store the anonymized records with attributes fullName, ssn, ageRange, and city.

An `AgeRangeTable` is created to store age ranges and their corresponding labels. A trigger named `StartTrigger` is created with the expression 'start' to execute the associated queries when the Siddhi application starts.

Four `INSERT INTO AgeRangeTable` queries are defined to populate the `AgeRangeTable` with age ranges and their corresponding labels when the Siddhi application starts.

The `anonymizePatientData` query processes events from the `PatientRecordsStream`. It anonymizes the fullName and ssn attributes using the `pii:fake` function. The query then joins the `PatientRecordsStream` with the `AgeRangeTable` to determine the age range for each patient based on their age. The anonymized fullName, ssn, age range, and city are then inserted into the `AnonymizedRecordsStream` sink stream.

### Example 3: Anonymizing IoT Device Data and Generating Device Statistics Alerts

```sql
CREATE STREAM IoTDeviceDataStream (fullName string, address string, email string, deviceID string, eventType string, value double);
CREATE SINK STREAM AnonymizedIoTDataStream (fullName string, address string, email string, deviceID string, eventType string, value double, _key string);
CREATE TABLE DeviceStatisticsTable (_key string, deviceID string, totalEvents long, minValue double, maxValue double, avgValue double);
CREATE SINK STREAM DeviceStatisticsAlertsStream (deviceID string, eventType string, minValue double, maxValue double, avgValue double);

@info(name = 'anonymizeIoTData')
INSERT INTO AnonymizedIoTDataStream
SELECT pii:fake(fullName, "NAME_FULLNAME", false) as fullName,
       pii:fake(address, "ADDRESS_FULLADDRESS", false) as address,
       pii:fake(email, "INTERNET_EMAILADDRESS", false) as email,
       pii:fake(deviceID, "INTERNET_UUID", false) as deviceID,
       eventType,
       value,
       str:concat(pii:fake(deviceID, "INTERNET_UUID", false), time:currentDate()) AS _key
FROM IoTDeviceDataStream;

@info(name = 'updateDeviceStatistics')
UPDATE DeviceStatisticsTable
SET DeviceStatisticsTable.totalEvents = totalEvents, DeviceStatisticsTable.minValue = minValue, DeviceStatisticsTable.maxValue = maxValue, DeviceStatisticsTable.avgValue = avgValue
ON DeviceStatisticsTable._key == _key
SELECT _key,
       deviceID,
       count(value) as totalEvents,
       min(value) as minValue,
       max(value) as maxValue,
       avg(value) as avgValue
FROM AnonymizedIoTDataStream WINDOW SLIDING_TIME(1 day)
GROUP BY deviceID;

@info(name = 'insertDeviceStatistics')
INSERT INTO DeviceStatisticsTable
SELECT _key,
       deviceID,
       count(value) as totalEvents,
       min(value) as minValue,
       max(value) as maxValue,
       avg(value) as avgValue
FROM AnonymizedIoTDataStream WINDOW SLIDING_TIME(1 day)
GROUP BY deviceID;

@info(name = 'sendDeviceStatisticsAlerts')
INSERT INTO DeviceStatisticsAlertsStream
SELECT e.deviceID, i.eventType, e.minValue, e.maxValue, e.avgValue
FROM AnonymizedIoTDataStream as i JOIN DeviceStatisticsTable as e
ON i._key == e._key
WHERE e.minValue < 10 OR e.maxValue > 100;
```

In this example, an `IoTDeviceDataStream` is created to store IoT device data with attributes: fullName, address, email, deviceID, eventType, and value. An `AnonymizedIoTDataStream` sink stream is created to store the anonymized IoT device data with the same attributes and an additional _key attribute. A `DeviceStatisticsTable` is created to store device statistics, and a `DeviceStatisticsAlertsStream` sink stream is created to store alerts based on the device statistics.

The `anonymizeIoTData` query processes events from the `IoTDeviceDataStream` and anonymizes the fullName, address, email, and deviceID attributes using the `pii:fake` function. The anonymized data, eventType, value, and a concatenated _key are then inserted into the `AnonymizedIoTDataStream` sink stream.

The `updateDeviceStatistics` query updates the `DeviceStatisticsTable` with new statistics calculated from the `AnonymizedIoTDataStream` within a sliding window of 1 day. The statistics include totalEvents, minValue, maxValue, and avgValue.

The `insertDeviceStatistics` query inserts new records into the `DeviceStatisticsTable` with statistics calculated from the `AnonymizedIoTDataStream` within a sliding window of 1 day.

The `sendDeviceStatisticsAlerts` query joins the `AnonymizedIoTDataStream` and `DeviceStatisticsTable` on the _key attribute, and when the minValue is less than 10 or maxValue is greater than 100, it inserts the deviceID, eventType, minValue, maxValue, and avgValue into the `DeviceStatisticsAlertsStream` sink stream. This generates alerts based on the device statistics.
