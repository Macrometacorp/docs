# build-openapi.sh

The API Reference at `/docs/api` is rendered from our platform swagger file, with additional attributes included to improve the final presentation of the reference. This script is intended to streamline the process of publishing new versions of this file.

## Setup

This script requires the [jq](https://stedolan.github.io/jq/) command line JSON processor.

```ssh
brew install jq
```

## Create Source File

Copy the latest official openapi file to `./lib/openapi/revisions` as `spec-VERSION-YYYYMMDD.json`.

```ssh
./lib/openapi/revisions
└── spec-0.17.15-20230607.json
```

## Produce Target File

Run the following script to produce a target OpenAPI file that contains the additional fields required for our API Reference.

```ssh
# build-openapi.sh source.json target.json
./lib/openapi/build-openapi.sh ./lib/openapi/revisions/spec-0.17.15-20230607.json ./static/openapi/spec.json
```

## Validate Target File

Once the target OpenAPI file has been created, validate it at [editor.swagger.io](https://editor.swagger.io/). Verify that all the expected resources are presented correctly.

**Important:** You will see the following error, which is expected. Any other errors should be resolved before committing.

```
Structural error at 
should NOT have additional properties
additionalProperty: servers
```
