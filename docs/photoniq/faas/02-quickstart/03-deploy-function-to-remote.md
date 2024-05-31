---
sidebar_position: 31
title: Deploy Function to a Remote Server
---

Creating functions on our local machine limits its usage to our local server. To make your functions globally available, PhotonIQ offers its geo-distributed GDN servers to store and serve your functions to users, ensuring availability. 

Furthermore, the [highly distributed nature of the GDN](https://www.macrometa.com/platform) means every function is georeplicated in all regions in the fabric. Thus, function processing occurs at the closest point of presence to the user, ensuring faster performance for real-time use cases. This short guide walks you through deploying your functions to a remote server.


### Prerequisites
- [Contact Macrometa personnel](https://www.macrometa.com/contact/sales) to get authentication credentials for accessing the PhotonIQ remote server. You will need:
    - API_KEY
    - URL
- A FaaS function. Follow [this guide](02-create-function.md) to create and test a function.

### Deploying and Execute Functions to Remote PhotonIQ Server

To deploy a function to a remote PhotonIQ server:
1. Enter the `faas remote deploy` command in your terminal. The `testFunction` represents our function name. 
```bash
./faas remote deploy testFunction
```
2. Once deployed, execute the remote function using the `remote execute` command:
```bash
./faas remote execute testFunction
```

### Delete Function 
To delete our function from the remote server, use the `./faas remote delete` command
```bash
./faas remote delete testFunction
```
