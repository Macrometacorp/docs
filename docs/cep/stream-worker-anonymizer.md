---
sidebar_position: 110
title: Data Anonymization with Stream Workers
---

# Data Anonymization with Stream Workers

Macrometa's Stream Workers offer a powerful way to process and protect sensitive data in real-time. One of the functions available is the anonymizer function, which is useful for various industries, including healthcare, financial services, e-commerce and retail, IoT, and 5G telecom and wireless. This article will provide an overview of the anonymizer function, explain why and when to use it, and demonstrate its value through three Stream Worker examples.

## What is the anonymizer function?

The anonymizer function is an extension in Macrometa's Stream Workers that allows you to replace sensitive data with fake data that resembles the original. This function can be used to obfuscate various data types, such as names, addresses, phone numbers, email addresses, and more. By using this function, you can ensure the privacy and protection of sensitive data while still retaining its structure and format.

## Why and when to use the anonymizer function?

Anonymizing sensitive data is essential for complying with data protection regulations and safeguarding user privacy. The anonymizer function is useful in the following situations:

1. Protecting personally identifiable information (PII) in healthcare or financial records
2. Anonymizing user data in application logs and analytics
3. Ensuring privacy in user-generated content or feedback
4. Complying with data protection laws and regulations, such as GDPR
5. Enhancing security and reducing the risk of data breaches

## Stream Worker Examples

### Example 1: Simple anonymization of patient records (healthcare industry)

This example demonstrates how to use the anonymizer function to protect sensitive patient information in a healthcare database.

```sql
CREATE STREAM PatientRecordsStream (fullName string, ssn string, email string, phone string);

CREATE STREAM AnonymizedRecordsStream (fullName string, ssn string, email string, phone string);

@info(name = 'anonymizePatientData')
INSERT INTO AnonymizedRecordsStream
SELECT pii:fake(fullName, "NAME_FULLNAME", false)        as fullName,
       pii:fake(ssn, "ID_SSN", false)                    as ssn,
       pii:fake(email, "INTERNET_EMAILADDRESS", false)   as email,
       pii:fake(phone, "PHONENUMBER_PHONENUMBER", false) as phone
FROM PatientRecordsStream;
```

### Example 2: Anonymization of customer data in e-commerce transactions (e-commerce and retail industry)

This example shows how to anonymize customer data in e-commerce transactions, including names, addresses, and payment information.

```sql
CREATE STREAM TransactionDataStream (fullName string, address string, email string, creditCardNumber string);

CREATE STREAM AnonymizedTransactionStream (fullName string, address string, email string, creditCardNumber string);

@info(name = 'anonymizeTransactionData')
INSERT INTO AnonymizedTransactionStream
SELECT pii:fake(fullName, "NAME_FULLNAME", false)                 as fullName,
       pii:fake(address, "ADDRESS_FULLADDRESS", false)            as address,
       pii:fake(email, "INTERNET_EMAILADDRESS", false)            as email,
       pii:fake(creditCardNumber, "CREDITCARD_CREDITCARDNUMBER", false) as creditCardNumber
FROM TransactionDataStream;
```

### Example 3: Anonymization of user data in IoT devices (IoT industry)

This example demonstrates how to anonymize user data collected by IoT devices, such as names, addresses, and device identifiers.

```sql
CREATE STREAM IoTDeviceDataStream (fullName string, address string, email string, deviceID string);

CREATE STREAM AnonymizedIoTDataStream (fullName string, address string, email string, deviceID string