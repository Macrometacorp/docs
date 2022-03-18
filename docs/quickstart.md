---
sidebar_position: 1
---

# Quickstart

### Address Book App _Quickstart_

Let’s take **5 minutes** to create a stateful-serverless backend for a simple Address Book. It's going to run globally distributed with local read-write latencies around 50ms.

We are going to walk through 4 steps:

- Create a collection and add some data to it.
- Query that data.
- Save the query (A saved query is called a Query Worker).
- Execute the Query Worker!

First things first, if you don't already have a Macrometa account go create a [free](https://auth.paas.macrometa.io/signup) one and mosey on back.

## Step 1: Create a Collection

Let’s start by clicking the `COLLECTIONS` tab in the left nav and then `New Collection` on the right. Select the `Document` option, give it the name `addresses`, and save it.

Note: The collection `addresses` that you just created is now distributed to every location in the fabric!

![create-collection](/img/create-doc-view.png)

<!-- // live code example. Live code not to be included in V1 of docs -->
```jsx live

  function MyPlayground(props) {

    function CreateCollection(response) {
      var url = "https://api-gdn.paas.macrometa.io/_fabric/_system/_api/collection";

      var xhr = new XMLHttpRequest();
      xhr.open("POST", url);

      xhr.setRequestHeader("accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjEuNjQ0NTE2MzA2ODU4MTIzN2UrNiwiZXhwIjoxNjQ0NTU5NTA2LCJpc3MiOiJtYWNyb21ldGEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJyb290Iiwic3ViIjoianVzdGluX21hY3JvbWV0YS5jb20iLCJ0ZW5hbnQiOiJqdXN0aW5fbWFjcm9tZXRhLmNvbSJ9.10HsLXmDeHzWTvoYCa1msXmhxOPp3iISlsQlhcJux90=");

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }};

      var data = `{
        "isSystem": true,
        "name": "addresses",
        "type": 2,
        "stream": true
      }`;

      xhr.send(data);
      
      xhr.onload = (e) => {
      alert(xhr.response);
      }
    }

  return (
    <div>
      <button onClick={CreateCollection}>Click me</button>
    </div>
  );
}
```

## Step 2: Add some data to your new collection and query it


Now, click the `QUERIES` tab in the left nav to open the `C8QL` query editor. Copy and paste the query below into the editor and click `Run Query` a couple times. 

```SQL
// Query to insert addresses
FOR persons IN [ 
  { firstname: "Captain", lastname: "Nemo", email: "cpnemo@gnautilus.com" },
  { firstname: "Pierre", lastname: "Aronnax", email: "pierre@asoc.org" },
  { firstname: "Ned", lastname: "Land", email: "ned@nature.org" },
  { firstname: "Cyrus", lastname: "Smith", email: "cycy@laborrights.org" },
  { firstname: "Tom", lastname: "Ayrton", email: "tommy@water.org" },
  { firstname: "Jules", lastname: "Verne", email: "j.garcia@en-julesverne.nantesmetropole.fr" } 
  ]
  INSERT persons INTO addresses
```

Your `Query Result` will be empty brackets, but if you click on `Profile` button you can checkout what just happened along with some performance details. Your data was just written to the location you're currently logged into and replicated across all of the nodes in your fabric.

Now, let's query the data you just added to your collection. Copy the below query and replace the `INSERT` query currently in the editor with it.

```SQL
FOR docs IN addresses RETURN docs 
```

You should see the data you just saved returned.

Ok, now we are going to save this query. Saving it will turn it into a `Query Worker`.

## Step 3: Save the Query

Click the `Save Query` button and name the saved query `getAddresses`

Now, in **around 50ms**, you have a globally distributed stateful-serverless endpoint.

![dashboard](/img/dashboard.png)

## Step 4: Execute the Query Worker

Now that you've saved the query click on the `API Usage` button, and we automatically generate a Query Worker (Exactly like a serverless function, but a save query instead of a function)!

![create-query-worker](/img/query-worker.png)

## Next Steps

Nice job you totally rocked that quickstart! 

Now let's build out the _REST_ of our CRUD API. Just create a `Query Worker` for each of these queries.

**SaveContact**
```sql
INSERT {firstname:@firstName,
        lastname:@lastName,
        email:@email} 
INTO addresses
```

**ReadContact**
```sql
FOR entry 
IN addresses 
RETURN entry
```

**RemoveContact**
```sql
REMOVE @_key 
IN addresses
```

**UpdateContact**
```sql
UPDATE @_key WITH { firstname:@firstName, 
                    lastname:@lastName, 
                    email:@email} 
IN addresses
```

Sweet, so now you have a full functional API for your app. [We made a front-end for you to take your new backend for a spin](https://github.com/Macrometacorp/tutorial-addressbook-restql).

Now that you've build your app, full stack, you can dig into the docs and see all the rad things Macrometa can help you build >> **[Essentials](essentials/overview.md)** guide.