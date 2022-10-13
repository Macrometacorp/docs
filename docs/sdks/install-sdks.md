---
sidebar_position: 10
title: Install SDKs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to install Macrometa SDKs.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

You have several options when installing this SDK.

With NPM:

```js
npm install jsc8
```

If you want to use the SDK outside of the current directory, you can also install it globally using the `--global` flag:

```js
npm install --global jsc8
```

With NPM in a notebook:

```js
!npm install jsc8 --save
```

From GitHub source:

```bash
git clone https://github.com/macrometacorp/jsc8.git
cd jsC8
npm install
npm run dist
```

</TabItem>
<TabItem value="py" label="Python">

:::note
pyC8 requires Python 3.5+. Python 3.6 or higher is recommended.
:::

You have several options when installing this SDK.

On macOS, you can use pip3:

```py
pip3 install pyC8
```

In a notebook, you might need to modify the pip3 command if you want to use it:

```py
!pip3 install pyC8
```

On Windows, you can use pip:

```py
pip install pyC8
```

Using pipenv:

```bash
pipenv install --pre pyC8
```

Using conda:

```bash
conda install -c conda-forge pyC8
```

</TabItem>
</Tabs>
