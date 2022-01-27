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
| -u, --url <url>                     |  url where need connect.                           |
| -d, --destination <destination>     | destination for  subscription or message sending.  |
| -sm, --send-message <message>       | message for sending                                |
| -l, --listen                        |   listen by destination.                           |
| -ch, --connection-headers <headers> |   headers for connection.                          |
| -dh, --destination-headers <headers>|  headers for destination.                          |
| -sj, --sock-js                      |  enable connection with SockJS.                    |
| --logs                              |  show logs of libraries used in nstomp.            |
| -h, --help                          |  display help for command                          |

### Plans to add:
[ ] sending files
[ ] setting options via config file

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
nstomp -u ws://localhost:3001/stomp -d /get -l -ch '{"cheader": 12, "nheader": "header"}'
```
###### Connect to: **-u** *ws://localhost:3001/stomp*
###### Setup destination: **-d** */get*
###### Enable listening: **-l**
###### Setup connection headers: **-ch** *'{"cheader": 12, "nheader": "header"}'*
###
###
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
nstomp -u ws://localhost:3001/stomp -d /msg -sm '{"reciept": 123456}' -dh '{"header1": 12, "header2": "text"}'
```
###### Connect to: **-u** *ws://localhost:3001/stomp*
###### Setup destination: **-d** */msg*
###### Message to send  ***[message can be any string]*** : **-sm** *'{"reciept": 123456}'*
###### Headers to send: **-dh** *'{"header1": 12, "header2": "text"}'*
##
##
#### ! In all examples, of course, there should be your endpoints, addressees, headers and ! messages
