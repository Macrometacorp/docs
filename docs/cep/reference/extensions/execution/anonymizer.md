---
sidebar_position: XX
title: Anonymizer
---

The anonymizer extension provides a function for anonymizing various data types. This function returns a fake value for anonymizing which matches the original data. For example, an email would be replaced with a fake email.

## Features

Macrometa supports the following data types:

### Address

    ADDRESS_BUILDINGNUMBER
    ADDRESS_CITY
    ADDRESS_COUNTRY
    ADDRESS_COUNTRYCODE
    ADDRESS_FULLADDRESS
    ADDRESS_LATITUDE
    ADDRESS_LONGITUDE
    ADDRESS_STATE
    ADDRESS_STATEABBR
    ADDRESS_STREETADDRESS
    ADDRESS_STREETADDRESSNUMBER
    ADDRESS_STREETNAME
    ADDRESS_TIMEZONE
    ADDRESS_ZIPCODE
    ADDRESS_ZIPCODEBYSTATE

### Name

    NAME_FULLNAME
    NAME_FIRSTNAME
    NAME_LASTNAME
    NAME_TITLE
    NAME_USERNAME

### ID

    ID_SSN

### Credit Card

    CREDITCARD_CREDITCARDTYPE
    CREDITCARD_CREDITCARDNUMBER
    CREDITCARD_CREDITCARDEXPIRY

### Company

    COMPANY_DEPARTMENT
    COMPANY_PRODUCTNAME
    COMPANY_PRICE
    COMPANY_PROMOTIONCODE
    COMPANY_NAME
    COMPANY_INDUSTRY
    COMPANY_URL
    COMPANY_BIC
    COMPANY_IBAN

### Demographic

    DEMOGRAPHIC_RACE
    DEMOGRAPHIC_SEX
    DEMOGRAPHIC_MARITALSTATUS
    DEMOGRAPHIC_DEMONYM

### Education

    EDUCATOR_CAMPUS
    EDUCATOR_COURSE
    EDUCATOR_SECONDARYSCHOOLS
    EDUCATOR_UNIVERSITY

### Internet

    INTERNET_DOMAINNAME
    INTERNET_DOMAINSUFFIX
    INTERNET_DOMAINWORD
    INTERNET_EMAILADDRESS
    INTERNET_IPV4ADDRESS
    INTERNET_IPV4CIDR
    INTERNET_IPV6ADDRESS
    INTERNET_IPV6CIDR
    INTERNET_MACADDRESS
    INTERNET_PASSWORD
    INTERNET_SLUG
    INTERNET_URL
    INTERNET_UUID

### Job

    JOB_FIELD
    JOB_POSITION
    JOB_SENIORITY
    JOB_TITLE

    // Medical
    MEDICAL_DISEASENAME
    MEDICAL_HOSPITALNAME
    MEDICAL_MEDICINENAME
    MEDICAL_SYMPTOMS

    // PhoneNumber
    PHONENUMBER_CELLPHONE
    PHONENUMBER_PHONENUMBER

    // Text
    TEXT_CHARACTER
    TEXT_FIXEDSTRING
    TEXT_PARAGRAPH
    TEXT_SENTENCE
    TEXT_WORD



Syntax:

	pii:fake(STRING input.string, String fake.function, BOOL invalidate.cache)

	<invalidation flag> - true, a different fake data will be generated at each call; 
						  false, once generated the fake data is cached is used for the next calls
					  
					  
QUERY PARAMETERS


| Name             | Description                                 | Default Value | Possible Data Types | Optional | Dynamic |
|------------------|---------------------------------------------|---------------|---------------------|----------|---------|
| input.string     | The input name to create a fake one         |               | STRING              | No       | Yes     |
| fake.function    | The key to be added                         |               | STRING              | No       | Yes     |
| invalidate.cache | An optional clean up the cache              | false         | BOOL                | Yes      | Yes     |


EXAMPLE 1:

```js
CREATE SOURCE patient_local WITH (type='database', collection='patient_local', replication.type="local", map.type='json') (full_name string, ssn string, email string, phone string);

CREATE TABLE patient_public(full_name string, ssn string, email string, phone string);

INSERT INTO patient_public
SELECT pii:fake(full_name, "ADDRESS_CITY", true)         as full_name,
       pii:fake(ssn, "ID_SSN", false)                    as ssn,
       pii:fake(email, "INTERNET_EMAILADDRESS", false)   as email,
       pii:fake(phone, "PHONENUMBER_PHONENUMBER", false) as phone
FROM patient_local;
```

    1. Insert following data into `patient_local` C8DB Collection
        {"full_name": "John Doe", "ssn": "123-123-123", "email": "John.Doe@macrometa.com", "phone": "123-123-12345"}

    2. Following document would be shown on the `patient_public` collection
        {"full_name": "fake name", "ssn": "fake ssn", "email": "fake email", "phone": "fake phone number"}

