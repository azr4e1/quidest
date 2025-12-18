+++
toc = true
hideReply = true
title = "Unix domain sockets in Golang snippet"
author = "Lorenzo Drumond"
date = "2024-03-12T00:59:36"
tags = ["snippet",  "golang",  "unix_domain_socket"]
+++


Example of how to use UDS to create a simple echo server:
```golang
package main
import (...)

func main() {
    // Create a Unix domain socket and listen for incoming connections.
    socket, err := net.Listen("unix", "/tmp/echo.sock")
    if err != nil {
        log.Fatal(err)
    }

    // Cleanup the sockfile.
    c := make(chan os.Signal, 1)
    signal.Notify(c, os.Interrupt, syscall.SIGTERM)
    go func() {
        <-c
        os.Remove("/tmp/echo.sock")
        os.Exit(1)
    }()

    for {
        // Accept an incoming connection.
        conn, err := socket.Accept()
        if err != nil {
            log.Fatal(err)
        }

        // Handle the connection in a separate goroutine.
        go func(conn net.Conn) {
            defer conn.Close()
            // Create a buffer for incoming data.
            buf := make([]byte, 4096)

            // Read data from the connection.
            n, err := conn.Read(buf)
            if err != nil {
                log.Fatal(err)
            }

            // Echo the data back to the connection.
            _, err = conn.Write(buf[:n])
            if err != nil {
                log.Fatal(err)
            }
        }(conn)
    }
}
```

## References
- https://dev.to/douglasmakey/understanding-unix-domain-sockets-in-golang-32n8
