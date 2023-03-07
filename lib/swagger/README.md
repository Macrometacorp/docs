# build-swagger.sh

The API Reference at `/docs/api` is rendered from our platform swagger file, with additional attributes included to improve the final presentation of the reference. This script is intended to streamline the process of publishing new versions of this file.

## Setup

This script requires the [jq](https://stedolan.github.io/jq/) command line JSON processor.

```ssh
brew install jq
```

## Create Source File

Copy the latest official swagger file to `./lib/swagger/revisions` as `spec-VERSION-YYYYMMDD.json`.

```ssh
./lib/swagger/revisions
|── spec-0.17.10-20220823.json
|── spec-0.17.11-20221019.json
└── spec-0.17.12-20221214.json
```

## Produce Target File

Run the following script to produce a target Swagger file that contains the additional fields required for our API Reference.

```ssh
# build-swagger.sh source.json target.json
./lib/swagger/build-swagger.sh ./lib/swagger/revisions/spec-20221201.json ./static/swagger/spec.json
```

## Validate Target File

Once the target Swagger file has been created, validate it at [editor.swagger.io](https://editor.swagger.io/). Verify that all the expected resources are presented correctly.

**Important:** You will see the following error, which is expected. Any other errors should be resolved before committing.

```
Structural error at 
should NOT have additional properties
additionalProperty: servers
```