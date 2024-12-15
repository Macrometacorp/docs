---
sidebar_position: 3
title: Getting Started with ObjectStore
sidebar_label: Getting started
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide will walk you through the steps needed to access and interact with PhotonIQ ObjectStore. Macrometa deploys ObjectStore for you and provides with the following prerequisites:

- ObjectStore server URL  
- API key

## Accessing PhotonIQ ObjectStore

PhotonIQ ObjectStore offers two primary methods for interacting with the service: the **API** and **CLI**. The following sections outline each method, allowing you to select the one that best aligns with your requirements.

<Tabs groupId="methods">

<TabItem value="API" label="API">

The [ObjectStore API](../../../docs/apiObjectstore#) provides a programmatic way to interact with ObjectStore by sending HTTP requests. Ideal for developers and those looking to automate workflows, the API enables flexible operations like data uploads, bucket management, and geo-replication. Macrometa will provide a link to the [API Reference](../../../docs/apiObjectstore#) when ObjectStore is deployed, detailing available endpoints and usage instructions.
</TabItem>

<TabItem value="CLI" label="CLI">

The ObjectStore CLI offers an easy way to manage your data and perform operations directly from the command line. This method is convenient for administrators and users who prefer command-line interfaces for routine management tasks. Follow these steps to set up and start using the **photoniq-os** CLI tool.

1. Extract the contents to your device. Download the [ZIP archive](https://drive.google.com/drive/folders/1W0O1u0RI2Ne2oqUD0HpwjQ7BV2VyT3jc) for the photoniq-os CLI tool and extract its contents to your device.

2. Open a terminal and create a hidden directory named .photoniq-os in your home directory:

```bash
cd ~
mkdir ~/.photoniq-os
```

3. In the `.photoniq-os` directory, create a `cli.json` file:

```bash
nano ~/.photoniq-os/cli.json
```

4. Paste the following configuration, replacing `XXXXXXXXXXXXXXXXXXXXXXX` with your API key, then save and close:

```json
{
  "cluster": {
    "url": "http://aisdev2-eu-central.eng.macrometa.io:9000",
    "api_key": "XXXXXXXXXXXXXXXXXXXXXXX"
  }
}
```

5. Navigate to the directory where you extracted the photoniq-os CLI tool and run:

```bash
./photoniq-os bucket ls
```

If correctly set up, this command will display a list of available buckets in your ObjectStore cluster. Once installed, you can use the **photoniq-os** CLI tool to manage your ObjectStore environment by running commands directly from the terminal.
</TabItem>
</Tabs>

Now that you have the API and CLI ready, the next sections will provide a deeper look into managing buckets, objects, jobs, and more within ObjectStore.

