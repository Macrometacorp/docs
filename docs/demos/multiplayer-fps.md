# Multiplayer FPS

In this demo we are using FPS Unity game in which we are replacing the Network Layer to use Macrometa as the network layer. The fps game sent out the data to a stream which is processed/analysised by the stream workers to show various live statistics (like rtt,fps,live health,live shots fired, live grenades launched of/by the player, movement of the player in the game) on the dashboard for the end user to see. The dashboard also enables the cpability to record a live game and later replay the same whenever wanted.Also we have used ttl index for the lobbies feature in order to expire the outdated events.

### On GDN

| **Tenant** | **Fabric** | **Password** | **GUI** | **Source Code**|
|----------- |----------|-----------|--------------|-----------|
| unity_fps@macrometa.io | `_system` | `xxxxxxxxx` | [**Multiplayer FPS App**](https://macrometacorp.github.io/demo-fps-dashboard/) | |


![Multiplayer FPS](/img/multiplayer-fps.png)
