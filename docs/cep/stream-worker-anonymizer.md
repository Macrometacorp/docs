---
sidebar_position: 110
title: Real-time Data Anonymization
---

# Data Anonymization with Stream Workers

The anonymizer function is an extension in Macrometa's Stream Workers that allows you to replace sensitive data with fake data that resembles the original. This function can be used to obfuscate various data types, such as names, addresses, phone numbers, email addresses, and more. By using this function, you can ensure the privacy and protection of sensitive data while still retaining its structure and format.

For more technical information, refer to the [anonymizer](query-guide/functions/anonymizer/anonymizer) documentation.

## Why Anonymize Data?

Anonymizing sensitive data is essential for complying with data protection regulations and safeguarding user privacy. The anonymizer function is useful in the following situations:

1. Protecting personally identifiable information (PII) in healthcare or financial records
2. Anonymizing user data in application logs and analytics
3. Ensuring privacy in user-generated content or feedback
4. Complying with data protection laws and regulations, such as GDPR
5. Enhancing security and reducing the risk of data breaches

## Stream Worker Examples

These examples demonstrate different levels of complexity, showcasing how to anonymize data and perform additional data processing tasks in various industries. By understanding and implementing anonymization in your data processing workflows, you can protect sensitive information while still gaining valuable insights.

### Example 1

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

The `anonymizeCustomerNames` query processes customer data from the `CustomerDataStream` and replaces the full name with fake, anonymized data using the `pii:fake()` function. The query outputs the anonymized full name, along with age and city, to the `AnonymizedNamesStream`.

### Example 2

```sql
CREATE STREAM PatientRecordsStream (fullName string, ssn string, age int, city string);

CREATE SINK STREAM AnonymizedRecordsStream (fullName string, ssn string, ageRange string, city string);

CREATE TABLE AgeRangeTable (minAge int PRIMARY KEY, maxAge int, ageRange string);

INSERT INTO AgeRangeTable (minAge, maxAge, ageRange)
VALUES (0, 17, '0-17'),
       (18, 34, '18-34'),
       (35, 64, '35-64'),
       (65, 200, '65+');

@info(name = 'anonymizePatientData')
INSERT INTO AnonymizedRecordsStream
SELECT pii:fake(fullName, "NAME_FULLNAME", false) as fullName,
       pii:fake(ssn, "ID_SSN", false) as ssn,
       ar.ageRange,
       city
FROM PatientRecordsStream as pr
JOIN AgeRangeTable as ar ON pr.age BETWEEN ar.minAge AND ar.maxAge;
```

The `anonymizePatientData` query processes patient records from the `PatientRecordsStream`, anonymizes the full name and SSN using the `pii:fake()` function, and maps age to age ranges using a join with the `AgeRangeTable`. The query outputs the anonymized data to the `AnonymizedRecordsStream`.

### Example 3

```sql
CREATE STREAM IoTDeviceDataStream (fullName string, address string, email string, deviceID string, eventType string, value double);

CREATE SINK STREAM AnonymizedIoTDataStream (fullName string, address string, email string, deviceID string, eventType string, value double);

CREATE TABLE DeviceStatisticsTable (deviceID string PRIMARY KEY, totalEvents int, minValue double, maxValue double, avgValue double);

@info(name = 'anonymizeIoTData')
INSERT INTO AnonymizedIoTDataStream
SELECT pii:fake(fullName, "NAME_FULLNAME", false) as fullName,
       pii:fake(address, "ADDRESS_FULLADDRESS", false) as address,
       pii:fake(email, "INTERNET_EMAILADDRESS", false) as email,
       pii:fake(deviceID, "INTERNET_UUID", false) as deviceID,
       eventType,
       value
FROM IoTDeviceDataStream;

@info(name = 'updateDeviceStatistics')
INSERT INTO DeviceStatisticsTable
SELECT deviceID,
       count(*) as totalEvents,
       min(value) as minValue,
       max(value) as maxValue,
       avg(value) as avgValue
FROM AnonymizedIoTDataStream#window.time(1 min)
GROUP BY deviceID;

@info(name = 'deviceStatisticsAlert')
SELECT deviceID, eventType, minValue, maxValue, avgValue
FROM DeviceStatisticsTable
WHERE minValue < 10 OR maxValue > 100;

CREATE SINK STREAM DeviceStatisticsAlertsStream (deviceID string, eventType string, minValue double, maxValue double, avgValue double);

@info(name = 'sendDeviceStatisticsAlerts')
INSERT INTO DeviceStatisticsAlertsStream
SELECT deviceID, eventType, minValue, maxValue, avgValue
FROM DeviceStatisticsTable
WHERE minValue < 10 OR maxValue > 100;
```

The `anonymizeIoTData` query processes IoT device data from the `IoTDeviceDataStream` and anonymizes the full name, address, email, and deviceID using the `pii:fake()` function. The query outputs the anonymized data to the `AnonymizedIoTDataStream`.

The `updateDeviceStatistics` query calculates statistics for each device based on the anonymized IoT data. It groups the data by deviceID and updates the `DeviceStatisticsTable` with the total number of events, minimum value, maximum value, and average value for each device.

The `deviceStatisticsAlert` query selects records from the `DeviceStatisticsTable` where the minimum value is less than 10 or the maximum value is greater than 100, indicating a potential issue with the device.

The `sendDeviceStatisticsAlerts` query inserts the selected records from the `deviceStatisticsAlert` query into the `DeviceStatisticsAlertsStream` for further processing or notification.
