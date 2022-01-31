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
| -V, --version                       |  output the version number                         |
| -u, --url <url...>                  |  url where need connect, headers by needed                           |
| -d, --destination <destination...>  |  destination for subscription or message sending, headers by needed  |
| -m, --message  <message>             |  message to send                               |
| -sj, --sock-js                      |  enable connection with SockJS.                    |
| -l, --logs                          |  show logs of libraries used in nstomp.            |
| -h, --help                          |  display help for command                          |

### Plans to add:
- sending files
- setting options via config file

### Usage example:
#### 1. Listening
we need to connect to **ws://localhost:3001/stomp**, which requires the **headers**:
```json
{
  "cheader": 12,
  "nheader": "header"
}
```
and start listening to the destination **/get**

```bash
nstomp -u ws://localhost:3001/stomp '{"header1": 12, "header2": "value2"}' -d /get
```

1. Connect to: **-u** *ws://localhost:3001/stomp*
2. Setup connection headers: *'{"cheader": 12, "nheader": "header"}'*
3. Setup destination: **-d** */get*

#### 2. Send message
We need send message to destination **/msg** with headers:
```json
{
    "header1": 12,
    "header2": "text",
}
```
Command example:
```bash
nstomp -u ws://localhost:3001/stomp -d /msg '{"header1": 12, "header2": "text"}' -m '{"reciept": 123456}'
```

1. Connect to: **-u** *ws://localhost:3001/stomp*
2. Setup destination: **-d** */msg*
3. Headers to send: **-dh** *'{"header1": 12, "header2": "text"}'*
4. Message to send  ***[message can be any string]*** : **-sm** *'{"reciept": 123456}'*

#### In all examples, of course, there should be your endpoints, addressees, headers and messages
