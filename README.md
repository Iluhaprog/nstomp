# nstomp
This module is designed to test a websocket connection using the **stomp** protocol;
***nstomp*** allows you to listen to destinations, send messages to them, sending headers when connecting, listening and sending messages is also supported.

#### To install enter
```bash
npm install nstomp --global
```

#### Options

| Option                              | Description                                        |
|-------------------------------------|----------------------------------------------------|
| -v, --version                       |  output the version number                         |
| -u, --url <url...>                  |  url where need connect, headers by needed                           |
| -d, --destination <destination...>  |  destination for subscription or message sending, headers by needed  |
| -m, --message  <message>             |  message to send                               |
| -c, --config <path>                 |  path to config file with options |
| -sj, --sock-js                      |  enable connection with SockJS.                    |
| -l, --logs                          |  show logs of libraries used in nstomp.            |
| -h, --help                          |  display help for command                          |

#### Options for config file

| Option             | Description                                      | Require | Type   |
|--------------------|--------------------------------------------------|---------|--------|
| url                |  url where need connect                          | ✅   | string |
| connectionHeaders  |  headers for connection                          | ❎    | object |
| destination        |  destination for subscription or message sending | ❎    | string |
| destinationHeaders |  headers for destination                         | ❎    | object |
| message            |  message to send                                 | ❎    | string *or* number *or* object |
| withSockJS         |  enable connection with SockJS.                  | ❎    | boolean |
| logs               |  show logs of libraries used in nstomp.          | ❎    | boolean |

### Plans to add:
- sending files
# Usage example:
## 1. Listening
we need to connect to **ws://localhost:3001/stomp**, which requires the **headers**:
```json
{
  "header1": 12,
  "header2": "value2"
}
```
and start listening to the destination **/get**

```bash
nstomp -u http://localhost:3001/stomp '{"header1": 12, "header2": "value2"}' -d /get
```

1. Connect to: **-u** *http://localhost:3001/stomp*
2. Setup connection headers: *'{"header1": 12, "header2": "value2"}'*
3. Setup destination: **-d** */get*

### Config file example:
```json
{
    "url": "http://localhost:3001/stomp",
    "connectionHeaders": {
      "header1": 12,
      "header2": "value2"
    },
    "destination": "/get",
}
```

## 2. Send message
We need send message to destination **/msg** with headers:
```json
{
    "header1": 12,
    "header2": "value2",
}
```
Command example:
```bash
nstomp -u http://localhost:3001/stomp -d /msg '{"header1": 12, "header2": "value2"}' -m '{"message": "hello world", "exp": 123445 }'
```

1. Connect to: **-u** *http://localhost:3001/stomp*
2. Setup destination: **-d** */msg*
3. Headers to send: *'{"header1": 12, "header2": "value2"}'*
4. Message to send  ***[message can be any string]*** : **-m** *'{"message": "hello world", "exp": 123445 }'*

### Config file example:
```json
{
    "url": "http://localhost:3001/stomp",
    "destination": "/msg",
    "destinationHeaders": {
      "header1": 12,
      "header2": "value2"
    },
    "message": {
      "message": "hello world", 
      "exp": 123445
    }
}
```
#### In all examples, of course, there should be your endpoints, addressees, headers and messages
