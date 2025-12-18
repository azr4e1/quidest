+++
toc = true
hideReply = true
title = "Network sockets in Golang"
author = "Lorenzo Drumond"
date = "2024-03-12T00:23:22"
tags = ["computer_science",  "programming",  "linux",  "inter_process_communication",  "socket",  "network",  "golang",  "unix"]
+++


Network sockets are used for communication between processes on different machines. They use network protocols, such as TCP and UDP. Network sockets are more versatile than Unix domain sockets, as they can be used to communicate with processes on any machine that is connected to the network. They are commonly used for client-server communication, such as web servers and client applications.

In golang, network sockets are created using the `net.Dial` or `net.Listen` functions, with a network type such as `TCP` or `UDP`.

```golang
// create a TCP socket and listen for incoming connections.
socker, err := net.Listen("tcp", ":8000")
if err != nil {
  panic(err)
}
```

## References
- [unix-domain-sockets-in-golang](/wiki/unix-domain-sockets-in-golang/)
- [file-descriptors](/wiki/file-descriptors/)
- [network-sockets](/wiki/network-sockets/)
- [network-sockets-in-golang](/wiki/network-sockets-in-golang/)
