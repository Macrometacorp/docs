---
title: Billing Commands
---

# Billing (gdnsl billing )

Get commands related to billing.

```bash
gdnsl billing [flags]
```

**Examples:**

```bash
  # Help for billing command group
  gdnsl billing -h
```

**Options:**

```bash
  -h, --help            Help for billing.
```

**Options inherited:**

```bash
      --config string   gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl billing usage

Get billing usage of the tenant in specific date range.

```bash
gdnsl billing usage describe [flags]
```

**Examples:**

```bash
  # Describe a billing usage starting from 1st day of the current month to till date
  gdnsl billing usage

  # Describe a billing usage starting from 1st day of the current month to till date for the specified region
  gdnsl billing usage --region 'prashant-ap-west'

  # Describe a billing usage starting from the specified date to till date
  gdnsl billing usage --start-date '2021-10-10'

  # Describe a billing usage starting from the specified date to till the specified date
  gdnsl billing usage --start-date '2021-05-01' --end-date '2021-10-30'
```

**Options:**

```bash
  -h, --help               Help to get account details.
      --region string      Name of the region.
      --start-date string  Start date in 'YYYY-MM-DD' format. Example: 2020-12-01. (default is 1st day of the current month)
      --end-date string    End date in 'YYYY-MM-DD' format. Example: 2020-12-31. (default is today's date)
```

**Options inherited:**

```bash
      --config string      gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl billing account

Get details of a billing account.

```bash
gdnsl billing account
```

**Examples:**

```bash
  # Describe a billing account
  gdnsl billing account
```

**Options:**

```bash
  -h, --help                Help to get account details
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl billing invoice

Get details of invoice of the tenant for the specified year and month. ( default is current month)

```bash
gdnsl billing invoice  [flags]
```

**Examples:**

```bash
  # Describe billing invoices for the current month
  gdnsl billing invoice 

  # Describe billing invoice for the year 2021 and 11th month
  gdnsl billing invoice  --year 2021 --month 11

  # Describe billing invoice for the current year and 11th month
  gdnsl billing invoice  --month 11

  # Describe billing invoice for the year 2021 and current month
  gdnsl billing invoice  --year 2021

  # List billing invoices
  gdnsl billing invoice --list

  # Describe billing invoices for the previous 4 months
  gdnsl billing invoice --list --limit 4

```

**Options:**

```bash
  -h, --help                  Help to get list of invoices.
      --current boolean       Get invoice of the tenant for the current month. ( default is true)
      --month number          Month in 'DD' format. Valid values:[1..12] ( default is current month)
      --year number           Year in 'YYYY' format. Example:2021 ( default is current year)
      --list                  List invoices for previous months. Default: 3
      --limit number          Number of previous months. ( default is 3)
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl billing payment

Command for billing payments.

```bash
gdnsl billing payment [flags]
```

**Examples:**

```bash
  # Get payment details of the previous months. (default is 3 months)
  gdnsl billing payment

  # Describe billing payment for the previous 4 months
  gdnsl billing payment --limit 4

```

**Options:**

```bash
  -h, --help                Help to get payment details.
      --limit number        Number of previous months.
      --method string       Payment method.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl billing plan

Get details of a billing plan. Default is `METERED`.

```bash
gdnsl billing plan [flags]
```

**Examples:**

```bash

  # Describe billing plan
  gdnsl billing plan --name ENTERPRISE

  # List all billing plans
  gdnsl billing plan --list
```

**Options:**

```bash
  -h, --help   Help to get a plan details
      --list   List all billing plans.
      --name string Name of the billing plan.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl billing contact

Update contact details.

```bash
gdnsl billing contact <tenant-name> [flags]
```

**Examples:**

```bash

  # Update billing contact
  gdnsl billing contact demo_mm.com --update 
    --firstname Demo 
    --lastname Gdn 
    --email demo@mm.com 
    --phone 123445657 
    --line1 l1 --line2 l2 
    --city Pune 
    --state Maharashtra 
    --country India 
    --zipcode 111222

  # Describe billing contact
  gdnsl billing contact demo_mm.com --describe 

```

**Options:**

```bash
  -h, --help                Help to update billing contact details.
      --describe            Describe contact info.
      --update              Update.
      --city string         City.
      --country string      Name of the country.
      --email string        Email address.
      --firstname string    First name.
      --lastname string     Last name.
      --line1 string        Address Line 1.
      --line2 string        Address Line 2.
      --phone string        Phone number.
      --state string        State.
      --zipcode string      Zip code.
```

**Options inherited:**

```bash
      --config string       gdnsl config file. (default is ./gdnsl.yaml)
```
