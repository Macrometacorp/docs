# build-swagger.sh

The API Reference at `/docs/api` is rendered from our platform swagger file, with additional attributes included to improve the final presentation of the reference. This script is intended to streamline the process of publishing new versions of this file.

## Setup

This script requires the [jq](https://stedolan.github.io/jq/) command line JSON processor.

```ssh
brew install jq
```

## Create source file

Copy the latest official swagger file to `./lib/swagger/revisions` as `spec-YYYYMMDD.json`.

```ssh
./lib/swagger/revisions
└── spec-20221201.json
```

## Produce target file

Run the following script to produce a target swagger file that contains the additional fields required for our API Reference.

```ssh
# build-swagger.sh source.json target.json
./lib/swagger/build-swagger.sh ./lib/swagger/revisions/spec-20221201.json ./static/swagger/spec.json
```

## Validate target file

Once your final swagger file has been created, validate it at [editor.swagger.io](https://editor.swagger.io/). Verify that all the expected resources are presented correctly.