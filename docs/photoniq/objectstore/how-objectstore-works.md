---
sidebar_position: 2
title: How ObjectStore works
---

PhotonIQ ObjectStore is a scalable storage solution that lets you securely store, organize, and access data. At its core, ObjectStore enables users to manage data as discrete objects within containers known as buckets, each serving as a dedicated space for 
 data. This section details the main components of ObjectStore and how they work together to provide a flexible, high-performance storage environment tailored to various data management needs.

### Buckets

In ObjectStore, a bucket acts as a container for objects, much like a top-level directory in a file system but designed with enhanced cloud storage capabilities. When you start using ObjectStore, your first step is to create a bucket. This involves choosing a unique name and selecting a storage provider, such as PTQ or AWS. Once created, buckets support various operations, including copying, renaming, and setting specific properties to customize storage behavior.

### Objects

Objects represent the actual data you want to store. They are the individual units of data stored within a bucket, representing files such as documents, images, or videos. When files are uploaded, they are stored as objects in the specified bucket. More than just files, objects include metadata describing attributes like size, last access time, version, checksum, and, if applicable, their source bucket. PhotonIQ ObjectStore provides customization options for configuring buckets to replicate data across multiple regions, increasing both availability and redundancy to suit specific use cases.

### Jobs

Long-running tasks in ObjectStore, such as copying a bucket, are managed asynchronously as jobs. When a user initiates a job, ObjectStore generates a job ID and returns it immediately, allowing users to continue without waiting for the task to complete. Users can then check the job status using the job ID to confirm successful task completion.


In the next section, we’ll guide you through [**Getting Started with ObjectStore**](getting-started.md), covering the essential steps to set up and begin using ObjectStore effectively.
