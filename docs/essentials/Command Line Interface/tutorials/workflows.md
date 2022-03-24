# Workflows on Services

This basic worflow shows how to do the CRUD (create, read, update, delete) operations on a service. 

Let's use a well known [simple Hello World service](https://github.com/knative/docs/tree/master/docs/serving/samples/hello-world/helloworld-go) that reads the environment variable `TARGET` and prints it as output.

* **Create a service in the `abc` namespace from an image**

```bash
$ gdnsl service create hello --image gcr.io/knative-samples/helloworld-go --env TARGET=C8 -ns abc
Creating service 'hello' in namespace 'abc':
  0.247s The Route is still working to reflect the latest desired specification.
  0.299s Configuration "hello" is waiting for a Revision to become ready.
 11.631s ...
 11.719s Ingress has not yet been reconciled.
 13.102s Ready to serve.
Service 'hello' created with latest revision 'hello-bxshg-1' and URL:
http://hello.abc.gdn1.macrometa.io
```

* **List a service**

```bash
$ gdnsl service list
NAME    URL                                LATEST          AGE     CONDITIONS   READY   REASON
hello   http://hello.abc.gdn1.macrometa.io  hello-dskww-1   2m42s   3 OK / 3     True
```

* **Curl service endpoint**

```bash
$ curl '-sS' '-H' 'Host: hello.abc.gdn1.macrometa.io' 'http://xxx.xx.xxx.xx  
 '
Hello Knative!
```

Where `http://xxx.xx.xxx.xx` is your Macrometa installation.

* **Update a service**

```bash
$ gdnsl service update hello --env TARGET=Macrometa
Updating Service 'hello' in namespace 'default':
  3.559s Traffic is not yet migrated to the latest revision.
  3.624s Ingress has not yet been reconciled.
  3.770s Ready to serve.
Service 'hello' updated with latest revision 'hello-nhbwv-2' and URL: 
http://hello.abc.gdn1.macrometa.io
```

The service's environment variable `TARGET` is now set to `Macrometa`.

* **Describe a service**

```bash
$ gdnsl service describe hello
Name:       hello
Namespace:  abc
Age:        5m
URL:        http://hello.abc.gdn1.macrometa.io
Address:    http://hello.abc.svc.cluster.local
Revisions:
  100%  @latest (hello-nhbwv-2) [2] (50s)
        Image:  gcr.io/knative-samples/helloworld-go (pinned to 5ea96b)
Conditions:
  OK TYPE                   AGE REASON
  ++ Ready                  46s
  ++ ConfigurationsReady    46s
  ++ RoutesReady            46s
```

* **Delete a service**

```bash
$ gdnsl service delete hello
Service 'hello' successfully deleted in namespace 'abc'.
```

You can then verify that the 'hello' service is deleted by trying to `list` it again.

```bash
$ gdnsl service list hello
No services found.
```