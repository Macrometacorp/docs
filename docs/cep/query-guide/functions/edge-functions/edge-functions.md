---
title: Edge Functions (fx)
---

The `fx` extension provides access to _edge functions_.

Edge functions allow you to run code in response to events or requests without the complex infrastructure typically associated with building and launching microservices.

## Syntax

There are three slightly different syntaxes:

### Parameterless function

It executes function only with given name.

```js
<OBJECT> fx(<STRING> name)
```

### Function with parameters set via JSON or object

```js
<OBJECT> fx(<STRING> name, <STRING|OBJECT> json)
```

#### Example 1

It executes the function with the name `fn-name` and JSON string put as the second parameter.

```js
fx('fn-name', \"{name : 'John', age : 23}\")
```

#### Example 2

It executes the function with the name `fn-name` and object as the second parameter. Extension `json:getObject(...)` was added as an example of an object that was used here.

```js
fx('fn-name', json:getObject(\"{name : [{name:'John'}], age : 23}\",'$'))
```

### Function with parameters set as pairs of arguments

```js
<OBJECT> fx(<STRING> name, <STRING> param1Name, <String|Bool|Int|Long|Double|Float> param1Value, ...)
```

#### Example

It executes the function with the name `fn-name`, every odd parameter as a parameter 'name' or 'age', and every even parameter as a value of the parameter name `John` or `23`.

```js
fx('fn-name', 'name', 'John', 'age', 23)
```

## Edge Function Stream Worker Example

An example of stream worker that uses edge function with a name `my-fn-name`:

```js
@App:name("fx-1")
@App:description("This app will execute a function every 5 seconds")
@App:qlVersion('2')

CREATE TRIGGER MyTrigger WITH ( interval = 5 sec );

CREATE SINK STREAM FxSampleStream (result object);

INSERT INTO FxSampleStream
fx('my-fn-name', 'my-param', 'my-value') as result
FROM MyTrigger;
```

For this example needs to be generated EdgeWorker with name `my-fn-name`.
The easiest way is to:

1. Generate EdgeWorker based on [Query Worker](https://www.macrometa.com/docs/queryworkers/building-queries) with the next query:

    ```sql
    FOR doc IN my-colection LIMIT 1 RETURN doc
    ```

2. [Create](https://www.macrometa.com/docs/collections/documents/create-document-store) a collection with a name `my-collection`.
3. Add one document in the collection.

The following stream `FxSampleStream` is receiving a new message every five seconds as the result of the Edge Function.

    ```js
        {"result": {<my item>}}
    ```

If the function returns output with multiple items, then the Edge Function returns an object with multiple entries in the `items` property.

    ```js
        {"result": 
            {"items": [
                {<my item 1>},
                {<my item 2>}
            ]}
        }
    ```
