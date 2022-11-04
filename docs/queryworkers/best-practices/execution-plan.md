---
sidebar_position: 2
title: Execution Plan
---
Proper [indexing](../../collections/indexing/) is key to query performance. [C8QL](../../c8ql/) provides an [Execution Plan](../running-queries#execution-plan) for all valid queries to show optimization rules and indexes being used.  Click the "Execution Plan" button,  below the query editor,  to view the plan. 

The "Indexes used" section of the execution plan shows which indexes are utilized by the query. If there are no indexes used or there are no fields matching the `FILTER` attributes create a new index with those attributes.

<!-- ![Untitled](Best%20practices%20for%20writing%20queries%204b2237e142c64476a89ae11d5c0a0109/Untitled.png) -->

The image below shows the execution plan before indexing. You can see the primary index, which is created with the collection, is the only index being utilized.

<!-- ![Untitled](Best%20practices%20for%20writing%20queries%204b2237e142c64476a89ae11d5c0a0109/Untitled%201.png) -->

After reviewing the "Indexes used" section we have created a [persistent index](../../collections/indexing/#persistent-index) on the `type` attribute being used in the `FILTER` expression. The new index, we have named `car_type_idx`, is now being utilized in the execution plan. Based on your needs, select the attribute(s) and the correct type of index.

<!-- ![Untitled](Best%20practices%20for%20writing%20queries%204b2237e142c64476a89ae11d5c0a0109/Untitled%202.png) -->
