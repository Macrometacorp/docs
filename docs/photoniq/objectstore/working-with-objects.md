---
sidebar_position: 5
title: Working with Objects
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In ObjectStore, objects are individual data files, such as documents, images, or videos, stored within a bucket. Each object is uniquely identifiable within its bucket, enabling organized data management and efficient retrieval.

### Object constraints

1. **Object Size**: Maximum size for an object is 2GB.
2. **Object Naming Rules**:
   - Names must be under 1024 bytes.
   - Invalid URL characters are not allowed.
   - Allowed characters include alphanumeric characters, hyphens (`-`), underscores (`_`), and periods (`.`).

## List All Objects in a Bucket

<Tabs groupId="methods-list">

<TabItem value="API" label="API">

To list all objects in a bucket, use the following API request:

```bash
curl -X 'GET' \
  'https://{server_url}/api/os/v1/objects/{provider}/{bucket_name}' \
  -H 'accept: */*' \
  -H 'Authorization: apikey {your_api_key}'
```

Replace `{provider}` with the storage provider (e.g., ptq) and `{bucket_name}` with the name of the bucket. The response returns a JSON array of objects in the specified bucket.

</TabItem>

<TabItem value="CLI" label="CLI">
To list all objects in a bucket using the CLI, run:

```bash
./photoniq-os bucket ls {provider}://{bucket_name}
./photoniq-os object ls {provider}://{bucket_name}
```

Replace `{provider}` and `{bucket_name}` with the appropriate values. This command outputs a list of all objects in the specified bucket.

</TabItem>
</Tabs>



## Create an Object

<Tabs groupId="methods-list">

<TabItem value="API" label="API">
To create an object in a bucket using the API, use the following endpoint:

```bash
curl -X 'POST' \
  'https://{server_url}/api/os/v1/objects/{provider}/{bucket_name}/{object_name}' \
  -H 'accept: */*' \
  -H 'Authorization: apikey {your_api_key}' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@{file_path};type={file_type}'
```

Replace `{provider}` with the storage provider (e.g., `ptq`), `{bucket_name}` with the name of the bucket, and `{object_name}` with the desired name for the new object. Upload the file you want to store in the request body as `file`.

</TabItem>

<TabItem value="CLI" label="CLI">
To add an object to a bucket using the CLI, use the `put` command:

```bash
./photoniq-os object put {file_path} {provider}://{bucket_name}
```

Replace `{file_path}` with the path to the file you want to upload, `{provider}` with the provider name, and `{bucket_name}` with the target bucket name. This command uploads the specified file as an object to the given bucket.

</TabItem>
</Tabs>


## Retrieve an Object from a Bucket


<Tabs groupId="methods-list">

<TabItem value="API" label="API">

To retrieve an object from a bucket using the API, use the following Get Object request:

```bash
curl -X 'GET' \
  'https://{server_url}/api/os/v1/objects/{provider}/{bucket_name}/{object_name}' \
  -H 'accept: */*' \
  -H 'Authorization: apikey {your_api_key}'
```

Replace `{provider}` with the storage provider (e.g., `ptq`), `{bucket_name}` with the name of the bucket, and `{object_name}` with the name of the object you want to retrieve. The response will contain the data file of the specified object.

</TabItem>

<TabItem value="CLI" label="CLI">
To retrieve an object using the CLI, use the `get` command:

```bash
./photoniq-os object get {provider}://{bucket_name}/{object_name}
```

Replace `{provider}`, `{bucket_name}`, and `{object_name}` with the appropriate values. This command fetches the specified object and saves it to the current directory with the same name as the object.
</TabItem>
</Tabs>

## Delete an Object from a Bucket

When an object is no longer needed, you can remove it from your bucket.

<Tabs groupId="methods-list">

<TabItem value="API" label="API">
To delete an object from a bucket via the API, use the following Delete Object endpoint:

```bash
curl -X 'DELETE' \
  'https://{server_url}/api/os/v1/objects/{provider}/{bucket_name}/{object_name}' \
  -H 'accept: */*' \
  -H 'Authorization: apikey {your_api_key}'
```

Replace `{provider}` with the storage provider (e.g., `ptq`), `{bucket_name}` with the name of the bucket, and `{object_name}` with the name of the object to delete.

</TabItem>

<TabItem value="CLI" label="CLI">
To delete an object using the CLI, run the `rm` command:

```bash
./photoniq-os object rm {provider}://{bucket_name}/{object_name}
```

Replace `{provider}`, `{bucket_name}`, and `{object_name}` with the appropriate values. This command removes the specified object from the bucket.

</TabItem>
</Tabs>