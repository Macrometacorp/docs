---
sidebar_position: 1
title: PhotonIQ ObjectStore
---

PhotonIQ ObjectStore is a remote object storage solution designed to efficiently manage large volumes of unstructured data while delivering scalable, reliable performance. From handling extensive datasets, media assets, or critical backups, ObjectStore provides the adaptability required to meet diverse storage needs.

ObjectStore offers robust management features that allow you to optimize your storage usage, organize your data effectively, and configure granular access controls. This ensures that you can align your storage strategy with your specific business objectives, organizational structure, and regulatory requirements.

## Key features of PhotonIQ ObjectStore

### Flexible backend providers

PhotonIQ ObjectStore offers  support for multiple backend providers, giving users the flexibility to choose storage solutions that best fit their needs:

- **PhotonIQ (PTQ)**: Our in-house storage solution provides high-speed access and minimal latency, making it ideal for fast data retrieval and  storage operations. PTQ ensures immediate data availability and is optimized for environments where performance is critical. It is highly recommended.
- **Amazon Web Services (AWS)**: PhotonIQ ObjectStore supports integration with AWS S3 storage, enabling access to objects stored in existing AWS S3 buckets directly through ObjectStore. This feature is especially useful for customers transitioning from AWS S3 to PhotonIQ ObjectStore, as it allows them to access and manage their legacy AWS data without migration disruptions

### Tenant isolation

ObjectStore guarantees robust data isolation for multiple tenants or user groups. This feature enables organizations to store and manage their data securely within a shared environment, free from risks of unauthorized access or data breaches. Each tenant's data is securely compartmentalized, ensuring security and integrity in multi-tenant deployments.

### Global replication

For enterprises prioritizing high availability and fault tolerance, ObjectStore includes global replication, offering two modes tailored for different needs:

- **On-Demand Caching**: In this mode, objects are replicated from the source region to a cache in the region where they are first accessed, helping to reduce latency. Objects are only replicated upon the first access unless configured by an admin to pre-populate the cache.
- **Regular Replication**: Here, objects are automatically replicated to all regions upon creation, updates, or removal. This ensures that data is immediately accessible across all locations.

Both models are optimized for low latency, with on-demand caching minimizing storage costs and regular replication ensuring data availability across all regions. This feature ensures data remains accessible even in the event of a system failure or outage, guaranteeing data durability and minimizing the risk of data loss.

### Enhanced security with audit logs

Security and compliance are key priorities for PhotonIQ ObjectStore. Detailed audit logs track all data access and manipulation activities, allowing organizations to maintain transparency and control over how their data is being used. These logs ensure compliance with regulatory requirements and provide a clear record for security reviews.

In the next section, we will cover [**How ObjectStore Works**](how-objectstore-works.md), offering insights into its core functionality and operational workflow.
