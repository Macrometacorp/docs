---
sidebar_position: 10
title: Install SDKs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Follow these steps to learn how to install and update Macrometa SDKs.

## Install SDKs

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

To install the SDK in a notebook:

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

You can install the pyC8 SDK with pip:

```py
pip install pyC8
```

To install the SDK in a notebook:

```py
!pip install pyC8
```

</TabItem>
</Tabs>

## Check Installed SDK Version

To check which version of the SDK is currently installed, run the following command in your terminal:

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
npm view jsc8 version
```

</TabItem>
<TabItem value="py" label="Python">

```py
pip show pyC8
```

</TabItem>
</Tabs>

## Update SDKs

Run the following command in your terminal to update the SDK.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
npm update jsC8
```

</TabItem>
<TabItem value="py" label="Python">

```py
pip install --upgrade pyC8
```

</TabItem>
</Tabs>

## Reference

You can follow the following links for further reference regarding the SDK's:
- jsC8: [https://github.com/macrometacorp/jsC8](https://github.com/macrometacorp/jsC8)
- pyC8: [https://github.com/Macrometacorp/pyC8](https://github.com/Macrometacorp/pyC8)
