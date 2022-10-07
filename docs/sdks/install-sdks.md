---
sidebar_position: 10
title: Install SDKs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to install Macrometa SDKs.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
With Yarn or NPM

yarn add jsc8
(or)
npm install jsc8

If you want to use the SDK outside of the current directory, you can also install it globally using the `--global` flag:

npm install --global jsc8

From source,

git clone https://github.com/macrometacorp/jsc8.git
cd jsC8
npm install
npm run dist
```

</TabItem>
<TabItem value="py" label="Python">

```py
pyC8 requires Python 3.5+. Python 3.6 or higher is recommended

To install pyC8, run

$ pip3 install pyC8

or, if you prefer to use conda:

conda install -c conda-forge pyC8

or pipenv:

pipenv install --pre pyC8

Once the installation process is finished, you can begin developing applications in Python.
```

</TabItem>
</Tabs>
