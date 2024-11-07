---
sidebar_position: 4
title: Working with Buckets
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Buckets are fundamental to organizing data in PhotonIQ ObjectStore. They act as top-level containers for objects, helping structure data in a way that aligns with your application’s needs. Each bucket in ObjectStore is uniquely named and follows specific guidelines to ensure compatibility and ease of access.

**Bucket structure and naming rules**
1. Buckets can not be nested inside other buckets.
2. When naming a bucket, follow these rules:
   - The name must be between 3 and 63 characters.
   - It must start and end with a lowercase letter or a number.
   - Only lowercase letters, numbers, periods (.), and dashes (-) are allowed.
   - Each label (segment between periods) must start and end with a lowercase letter or a number.
   - The name cannot contain adjacent periods or have dashes next to periods.

## Creating a Bucket

Creating a bucket is one of the first tasks to perform when working with ObjectStore. Buckets serve as containers for your objects, organizing data in a way that aligns with your application requirements and workflow.

<Tabs groupId="methods-create">

<TabItem value="API" label="API">

Use the Create bucket endpoint following this example:

```bash
curl -X 'POST' \
  'https://{server_url}/api/os/v1/buckets' \
  -H 'accept: */*' \
  -H 'Authorization: apikey {your_api_key}' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "your_bucket_name",
  "provider": "ptq"
}'
```

Replace "your_bucket_name" with the desired name for your bucket. The "provider" field must always be "ptq", as only PhotonIQ buckets can be created**.????**. A successful request will return a 201 Created status code and a JSON response with the new bucket's details.

</TabItem>

<TabItem value="CLI" label="CLI">
To create a bucket using the ObjectStore CLI, use the create command under bucket:

```bash
./photoniq-os bucket create ptq://{bucket_name}
```

Replace `{bucket_name}` with the desired name for your bucket. Upon successful creation, the CLI will output a confirmation message with the bucket's details.
</TabItem>
</Tabs>

## List all Buckets

Listing all buckets provides a snapshot of the current containers in your ObjectStore, helping you manage and monitor your storage usage.

<Tabs groupId="methods-list">

<TabItem value="API" label="API">

To retrieve a list of all buckets via the API, use the List Buckets endpoint:

```bash
curl -X 'GET' \
  'https://{server_url}/api/os/v1/buckets' \
  -H 'accept: */*' \
  -H 'Authorization: apikey {your_api_key}'
```

The response is a JSON array of buckets in your server with thier providers.

```json
{
  "code": 200,
  "error": false,
  "message": "OK",
  "result": [
    {
      "name": "abc",
      "provider": "ptq"
    },
    {
      "name": "def",
      "provider": "ptq"
    }
  ]
}
```

</TabItem>

<TabItem value="CLI" label="CLI">

To list all buckets using the CLI, use the `ls` command:

```bash
./photoniq-os bucket ls
```

This command displays all existing buckets with brief details, such as the name and creation date, directly in your terminal for easy reference and management.

</TabItem>
</Tabs>

## Delete a Bucket

If a bucket is no longer needed, you can delete it to free up resources. Note that deleting a bucket will also remove all objects within it.

<Tabs groupId="methods-delete">

<TabItem value="API" label="API">

To delete a bucket via the API, use the following `Delete Bucket` endpoint:

```bash
curl -X 'DELETE' \
  'https://{server_url}/api/os/v1/buckets/{provider}/{bucket_name}' \
  -H 'accept: */*' \
  -H 'Authorization: apikey {your_api_key}'
```

Replace `{provider}` with the storage provider (e.g., `ptq`) and `{bucket_name}` with the name of the bucket to delete.

</TabItem>

<TabItem value="CLI" label="CLI">

To delete a bucket with the CLI, use the `rm` command:

```bash
./photoniq-os bucket rm ptq://{bucket_name}
```

Replace `{bucket_name}` with the name of the bucket you wish to delete. Use caution, as this action will delete all objects contained within the bucket.

</TabItem>
</Tabs>

## Copy a Bucket

Duplicating a bucket can be useful for backup purposes or to create multiple versions of your data. This section outlines how to copy a bucket in ObjectStore.

<Tabs groupId="methods-delete">

<TabItem value="API" label="API">
To copy a bucket via the API, use the following endpoint:

```bash
curl -X 'POST' \
  'https://{server_url}/api/os/v1/buckets/copy/{source_provider}/{source_bucket}/{destination_provider}/{destination_bucket}' \
  -H 'accept: */*' \
  -H 'Authorization: apikey {your_api_key}' \
  -d ''
```

Replace `{source_provider}` and `{source_bucket}` with the provider and name of the bucket you want to copy. Replace `{destination_provider}` and `{destination_bucket}` with the provider and name of the destination bucket.

</TabItem>

<TabItem value="CLI" label="CLI">
To copy a bucket using the CLI, use the `cp` command:

```bash
./photoniq-os bucket cp {source_provider}://{source_bucket_name} {provider}://{destination_bucket_name}
```

Replace `{source_provider}` and  `{source_bucket_name}` with the provider and the name of the bucket you want to copy. Replace `{destination_provider}` and `{destination_bucket_name}` with the  provider and the name destination bucket. This command copies all objects from the source bucket to the destination bucket.
</TabItem>
</Tabs>

## Rename a Bucket

If you need to rename a bucket in ObjectStore, you can do so using either the API or CLI methods.
<Tabs groupId="methods-delete">

<TabItem value="API" label="API">

To rename a bucket via the API, use the following endpoint:

```bash
curl -X 'POST' \
  'https://{server_url}/api/os/v1/buckets/rename/{from_provider}/{from_bucket}/{to_provider}/{to_bucket}' \
  -H 'accept: */*' \
  -H 'Authorization: apikey {your_api_key}' \
  -d ''
```

Replace `{from_provider}` and `{from_bucket_name}` with the provider and name of the current bucket. Replace `{to_provider}` and `{to_bucket_name}` with the provider and new name for the bucket.

</TabItem>

<TabItem value="CLI" label="CLI">
To rename a bucket using the CLI, use the `mv` command:

```bash
./photoniq-os bucket mv ptq://{old_bucket_name} ptq://{new_bucket_name}
```

Replace `{old_bucket_name}` with the current name of the bucket, and `{new_bucket_name}` with the new name. This command renames the specified bucket to the new name.

</TabItem>
</Tabs>