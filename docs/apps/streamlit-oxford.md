---
sidebar_position: 12
---

# Global Cities Explorer

This is application gives a snapshot of Oxford's Global Cities Forecasts Service, providing an insight into global cities GDP, population, employment and household income. The Global Cities Forecasts and other data services can be found on the [Global Data Workstation](https://www.oxfordeconomics.com/global-data-workstation-2.0).

## Demo URL

http://oxford-economics.demo.macrometa.io:8502

## Build and Run

```py
Python Version 3.8.5

$ pip3 install -r requirements.txt
$ streamlit run gdn_app.py

OR (to change port number)
$ streamlit run --server.port 4005 gdn_app.py

OR (to run in background)
$ nohup streamlit run --server.port 4005 gdn_app.py &
```

The console will display the localhost URL & Port number to connect.
