---
sidebar_position: 6
title: Working with Remote Clusters
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Remote clusters allow ObjectStore to integrate buckets from external storage locations as if they were local. By adding a remote cluster, you make its buckets accessible within ObjectStore, enabling clients to interact with them seamlessly. This setup is particularly useful for distributed applications that need unified access to data stored across multiple regions or storage systems.


## Add a Remote Cluster in ObjectStore

Adding a remote cluster allows ObjectStore to treat its buckets as local buckets, enabling clients to access and manage data from the remote storage within ObjectStore.

<Tabs groupId="methods-list">

<TabItem value="API" label="API">
To add a remote cluster via the API, use the following `POST` request:

```bash
curl -X 'POST' \
  'https://{server_url}/api/os/v1/remote-clusters' \
  -H 'accept: */*' \
  -H 'Authorization: apikey {your_api_key}' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "{cluster_name}",
  "type": "aws",
  "credentials": {
    "accessKey": "{access_key}",
    "accessKeyId": "{access_key_id}",
    "region": "{region}"
  },
  "buckets": [
    "{bucket_name_1}",
    "{bucket_name_2}"
  ]
}'
```

Replace placeholders as follows:

- `{cluster_name}`: Name of the remote cluster.
- `{access_key}` and `{access_key_id}`: Access credentials for the remote cluster.
- `{region}`: The region where the remote cluster is located.
- `{bucket_name_1}`, `{bucket_name_2}`: Names of the remote buckets to be made accessible.

</TabItem>

<TabItem value="CLI" label="CLI">
To add a remote cluster using the CLI, run the following command:

```bash
./photoniq-os remote-cluster create aws {name} {access_key_id} {access_key} {region} {bucket_name_1} [{bucket_name_2} ...]
```

Replace {name}, {access_key_id}, {access_key}, {region}, and {bucket_name_1}, {bucket_name_2}, etc., with the relevant values. Multiple bucket names can be specified to add more buckets from the remote cluster.
</TabItem>
</Tabs>


## Update Parameters of a Remote Cluster in ObjectStore

To modify the parameters of an existing remote cluster in ObjectStore, use the following methods.

<Tabs groupId="methods-list">

<TabItem value="API" label="API">
To update parameters via the API, use the followig endpoint:

```bash
curl -X 'PATCH' \
  'https://{server_url}/api/os/v1/remote-clusters/{cluster_name}' \
  -H 'accept: */*' \
  -H 'Authorization: apikey {your_api_key}' \
  -H 'Content-Type: application/json' \
  -d '{
  "type": "aws",
  "credentials": {}
}'
```

Replace `{server_url}` with your server’s URL, `{cluster_name}` with the name of the cluster you want to update, and add any required parameters in the `"credentials"` field or other fields as needed.

</TabItem>

<TabItem value="CLI" label="CLI">
To update a remote cluster using the CLI, run the following command:

```bash
./photoniq-os remote-cluster set aws {name} KEY=VALUE
```

Replace `{name}` with the cluster name and `KEY=VALUE` with the specific parameter and its new value. Use multiple `KEY=VALUE` pairs to update several parameters at once.

</TabItem>
</Tabs>



## Remove a Remote Cluster from ObjectStore

To disconnect and remove a remote cluster from ObjectStore, use the following methods.

<Tabs groupId="methods-list">

<TabItem value="API" label="API">
To remove a remote cluster via the API, send a `DELETE` request:

```bash
curl -X 'DELETE' \
  'https://{server_url}/api/os/v1/remote-clusters/{cluster_name}' \
  -H 'accept: */*' \
  -H 'Authorization: apikey {your_api_key}'
```

Replace `{server_url}` with your server’s URL and `{cluster_name}` with the name of the remote cluster you want to remove.

</TabItem>

<TabItem value="CLI" label="CLI">
To remove a remote cluster using the CLI, run the following command:

```bash
./photoniq-os remote-cluster remove {name}
```

Replace `{name}` with the name of the cluster you wish to disconnect and remove.

</TabItem>
</Tabs>


Here’s a structured **Display Remote Cluster Parameters in ObjectStore** section:

---

## Display Remote Cluster Parameters in ObjectStore

To view the configuration details and parameters of a remote cluster, use the following methods.

<Tabs groupId="methods-list">

<TabItem value="API" label="API">
To retrieve the parameters of a remote cluster via the API, send a `GET` request:

```bash
curl -X 'GET' \
  'https://{server_url}/api/os/v1/remote-clusters/{cluster_name}' \
  -H 'accept: */*' \
  -H 'Authorization: apikey {your_api_key}'
```

Replace `{server_url}` with your server’s URL and `{cluster_name}` with the name of the remote cluster you want to view.

</TabItem>

<TabItem value="CLI" label="CLI">
To display the parameters of a remote cluster using the CLI, run the following command:

```bash
./photoniq-os remote-cluster show {name}
```

Replace `{name}` with the name of the cluster whose parameters you want to display.

</TabItem>
</Tabs>
