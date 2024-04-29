---
sidebar_position: 120
title: Native App
---

Macrometa offers JSON-compatible virtual waiting rooms (VWRs) that seamlessly integrate with your API endpoints to manage traffic in mobile and non-browser web apps.

In web-based VWRs deployments, VWRs manage the user experience during their waiting period. However, in non-web applications, the application takes on greater responsibility for the user experience.

The non-web application queries the VWRs to determine if access to web resources is permissible based on predefined waiting room limits. The user is directed to the waiting room if these limits are exceeded. The application then periodically checks with the VWR to see if the user can exit the waiting room. Upon exit, the user proceeds to access the protected resource.

## API Request

Non-web applications use the **GET /api/vwr/v1/position/{queue_name}/{visitor_id}** REST API to check resource access.

Key parameters include:

- **queue_name**: Specifies the waiting room created in the VWR.
- **visitor_id**: The _visitor_id_ parameter is crucial in tracking the user's position and wait duration. It is not provided initially but returned with each subsequent API call, ensuring accurate tracking.

## API Response

This API returns the following JSON structure:

```json
{
  "position": 0,
  "waiting_time": 0,
  "queue_depth": 0,
  "visitor_id": 0,
  "refresh_interval": 0
}
```

The response includes:

- **position**: User's current position in the waiting room.
- **waiting_time**: Estimated time (seconds) until the user exits the waiting room.
- **queue_depth**: Total number of users in the waiting room.
- **visitor_id**: ID for the current request.
- **refresh_interval**: Time (in seconds) between successive position checks.

When the position is zero, the user has exited the waiting room and may proceed.

## Pseudo-code Example

The following pseudo-code illustrates the interaction with VWRs and how to determine when a user has exited the waiting room:

```js
// Initial request specifying the waiting room.
// This checks if the waiting room is active.
$waitingRoom = "shopping"
$result = GET("/api/vwr/v1/position/$waitingRoom")

// If the waiting room position is zero, then the waiting room is not
// enabled because there is not enough load on the system or the
// user has exited the waiting room. In either case, they can proceed.
while $result.position > 0

   // If the position > zero, the user has entered the waiting room.  We
   // now delay for "refresh_interval" seconds before we try again to see
   // if the user is still in the waiting room.
   //
   // This delay is when the application can notify the user what
   // position they are in and when they will leave the waiting room.
   // Each application has its own requirements for how this information
   // should be displayed and how to prevent the user from proceeding until
   // it is their turn.
   sleep($result.refresh_interval)

   // Determine if the user has exited the waiting room. In these
   // subsequent calls, you must also provide the "visitor_id".
   $result = GET("/api/vwr/v1/position/shopping/$result.visitor_id")

// At this point, the user has reached their turn in the waiting room and
// they can proceed with the action that the waiting room was protecting.
```

## Best Practices

- **Refresh Interval**: Consider the impact on mobile device battery life and data usage when setting this interval. Frequent updates increase both consumption metrics.
- **UI Responsiveness**: Avoid blocking the UI while updating the waiting room status. Information should be displayed efficiently, ensuring the app remains responsive. Also, while REST API calls are generally quick, avoid UI freezes during these operations. Take advantage of the platform's asynchronous network calls.