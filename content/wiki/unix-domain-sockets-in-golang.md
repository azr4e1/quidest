+++
toc = true
hideReply = true
title = "Unix Domain Sockets in Golang"
author = "Lorenzo Drumond"
date = "2024-03-12T00:13:48"
tags = ["computer_science",  "programming",  "linux",  "inter_process_communication",  "socket",  "golang",  "unix"]
+++



A socket is a communication endpoint that allows a program to send and receive data over a network.

There are two main types of sockets in Golang: Unix Domain Sockets (`AF_UNIX`) and network sockets (`AF_INET|AF_INET6`).

UDS, or local sockets, are used for communication between processes on the same machine. They use a file-based intereface and can be accessed using the file system path, just like regular files. The data is transmitted between processes using the file system as the communication channel.

The processes communicate by reading and writing to the same socket file, which is managed by the kernel. The kernel is responsible for handling the communication details, such as synchronization, buffering and error handling, and ensures that the data is delivered reliably and in the correct order.

In Golang, UDS are created using the `net.Dial` client or `net.Listen` server functions, with the `unix` network type:

```golang
socket, err := net.Listen("unix", "/tmp/mysocket.sock")
if err != nil {
  panic(err)
}
```

Network sockets, on the other hand, are used for communication between processes on different machines. They use network protocols, such as TCP and UDP. Network sockets are more versatile than UDS, as they can be used to communicate with processes on any machine that is connected to the network. They are commonly used for client-server communication, such as web servers and client applications.

- Opening a UDS is significantly faster than a network socket.
- Reading from UDS is significantly faster than reading from a network socket.


## References
- https://dev.to/douglasmakey/understanding-unix-domain-sockets-in-golang-32n8
- [network-sockets](/wiki/network-sockets/)
- [unix-domain-sockets](/wiki/unix-domain-sockets/)

Next -> [network-sockets-in-golang](/wiki/network-sockets-in-golang/)
