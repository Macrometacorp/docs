# Getting Started

Macrometa Serverless Client (`gdnsl`) enables developers to:

1. Deploy serverless microservices and functions
2. Scriptable to allow users to create different Serverless workflows via Github
3. Use consistent verbs, nouns, and flags for various commands.

## Pre-Requistes

1. Download ```gdnsl``` binary for your system from [here](https://tbd)

2. Make the binary executable:

    ```sh
    $ chmod +x <path-to-binary>
    ```

3. Copy the binary to `/usr/bin/` directory

4. To use `gdnsl`  set config in `$HOME/.gdnsl/` and kubeconfig at `$HOME/.kube/`

## Using GDNSL

```bash
$ gdnsl --help
Manage your c8 serverless building blocks:
* Serving: Manage your services and release new software to them.
Usage:
  gdnsl [command]
Available Commands:
  completion  Output shell completion code
  help        Help about any command
  worker      Worker command group
  service     Service command group
  revision    Revision command group
  route       Route command group
  registry    registry command group
  version     Prints the client version
Flags:
      --config string       gdnsl config file (default is ./gdnsl.yaml)
  -h, --help                help for gdnsl
Use "gdnsl [command] --help" for more information about a command.
```

## Deploy a Microservice

### From Public docker repository

Use following command to deploy a service from public repository

```bash
$ gdnsl service create myservice --image=<url-to-your-image>
```

**Notes:**

* For minimum number of replicas use flag `--min-scale int`
* For maximum number of replicas use flag `--max-scale int`
* Example:

    ```bash
    $ gdnsl service create myservice --image=gcr.io/knative-samples/helloworld-go --min-scale 1 --max-scale 5 -n <namespace-name>
    ```


### From Private docker repository

* To use private docker repository, we'll first have to create entry into registry with details for repository.

* To do that use below command:

	```bash
	$ gdnsl registry create <registery-name> \ 
	> --registry-url=<your-docker-registery-url> \
	> --username=<your-username> \
	> --password=<your-password> \
    > --service-account-name <your-service-account> \
	> -n <your-namespace>
	```

	It will create a **secret** of your registry in the **default namespace** and add it to the **default service account**

**Notes:**

* To specify **namespace** use `-n <your-namespace` flag to above command.
* To specify **service account** use ```--service-account-name <your-service-account>``` flag to above command.
[ Note: make sure service account exists in given namespace]
* Once registry is created, you can use private images from that registry to deploy service using same command:

    ```bash
    $ gdnsl service create myservice --image=<url-to-your-image>
    ```


## Validate Service Deployment

* To list services use following command

	```bash
	$ gdnsl service list
	NAME        URL                                    LATEST          AGE    CONDITIONS   READY     REASON
	myservice   http://myservice.default.macrometa.io                   56m    0 OK / 3     False     RevisionMissin
	g : Configuration "myservice" does not have any ready Revision.
	mysvc       http://mysvc.default.macrometa.io                      4d5h   0 OK / 3     False     RevisionMissin
	g : Configuration "mysvc" does not have any ready Revision.
	prsvc       http://prsvc.default.macrometa.io       prsvc-wkpxz-1   4d1h   1 OK / 3     Unknown   IngressNotConf
	igured : Ingress has not yet been reconciled
	```

## Access the Service

Once service is deployed and revision is ready, you can access it using **URL** provided in `list` service command.

	Eg: http://myservice.default.macrometa.io


## Delete the Service

* To delete the service use following command:

	```bash
    $ gdnsl service delete <your-service-name>
    ```