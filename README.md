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
| -u, --url                  |  url where need connect, headers by needed                           |
| -d, --destination  |  destination for subscription or message sending, headers by needed  |
| -m, --message             |  message to send                               |
| -c, --config                 |  path to config file with options |
| -f, --files             | path's to files which need send |
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
| files              |  path's to files which need send                 | ❎    | string[] |
| withSockJS         |  enable connection with SockJS.                  | ❎    | boolean |
| logs               |  show logs of libraries used in nstomp.          | ❎    | boolean |

# Usage example:
## 1. Listening
we need to connect to **http://localhost:3001/stomp**, which requires the **headers**:
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

## 3. Send file
We need send flies to destination **/files** :

files: 
  1. image1.png
  2. image2.jpeg
  3. data.json

```bash
nstomp -u http://localhost:3001/stomp -d /files -f image1.png image2.jpeg data.json
```

1. Connect to: **-u** *http://localhost:3001/stomp*
2. Setup destination: **-d** */get*
3. Setup list of files to send: image1.png image2.jpeg data.json

### Config file example:
```json
{
    "url": "http://localhost:3001/stomp",
    "destination": "/files",
    "files": ["image1.png", "image2.jpeg", "data.json"]
}
```
#### In all examples, of course, there should be your endpoints, addressees, headers and messages
