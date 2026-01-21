+++
date = '2026-01-21T16:51:48Z'
title = 'Websockets'
hideReply = true
tags = ['socket','web', 'http', 'websocket', 'communication', 'TCP/IP', 'network']
+++

HTTP and WebSocket are both ways for computers to talk to each other, but they work in different ways. HTTP is used for simple requests, like when you load a webpage, where the computer sends a request and the server replies, then the connection is closed. WebSocket keeps the connection open, allowing for real-time, two-way communication, making it great for things like live chats or online games where constant updates are needed.

# How does it work?

It starts with normal HTTP connection and then upgrades to WebSocket protocol.

1. Connection Start – Client sends an HTTP request with `Upgrade: websocket` header to the server.
2. Handshake – Server responds with `101 Switching Protocols` to confirm the upgrade
3. Persistent TCP Link – The connection switches from HTTP to WebSocket protocol, staying open.
4. Full-Duplex Communication – Both client and server can send messages anytime without requests.
5. Data Frames – Messages are split into frames (text or binary) and sent over the connection.
6. Low Overhead – No repeated HTTP headers; only message data is exchanged.
7. Keep-Alive – Connection remains active until either side closes it.
8. Close Handshake – One side sends a close frame; the other replies, then the TCP link ends.
