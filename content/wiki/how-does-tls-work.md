+++
toc = true
hideReply = true
title = "How does TLS work"
author = "Lorenzo Drumond"
date = "2024-03-22T00:04:27"
tags = ["protocol",  "internet",  "layer",  "encryption",  "handshake",  "computer_science",  "security",  "web",  "transport",  "tls", 'network']
+++


A TLS connection is initiated using a sequence known as the TLS handshake. When a user navigates to a website that uses TLS, the TLS handshake begins between the user's device (also known as the client device) and the web server.

During the TLS handshake, the user's device and the web server:

1. Specify which version of TLS (TLS 1.0, 1.2, 1.3, etc.) they will use
2. Decide on which cipher suites (see below) they will use
3. Authenticate the identity of the server using the server's TLS certificate
4. Generate session keys for encrypting messages between them after the handshake is complete

The TLS handshake establishes a cipher suite for each communication session. The cipher suite is a set of algorithms that specifies details such as which shared encryption keys, or session keys, will be used for that particular session. TLS is able to set the matching session keys over an unencrypted channel thanks to a technology known as public key cryptography.

The handshake also handles authentication, which usually consists of the server proving its identity to the client. This is done using public keys. Public keys are encryption keys that use one-way encryption, meaning that anyone with the public key can unscramble the data encrypted with the server's private key to ensure its authenticity, but only the original sender can encrypt data with the private key. The server's public key is part of its TLS certificate.

Once data is encrypted and authenticated, it is then signed with a message authentication code (MAC). The recipient can then verify the MAC to ensure the integrity of the data. This is kind of like the tamper-proof foil found on a bottle of aspirin; the consumer knows no one has tampered with their medicine because the foil is intact when they purchase it.

Image: https://cf-assets.www.cloudflare.com/slt3lc6tev37/3wZIhjRIjfVSmCbVqkBKzb/4a7aa34324108c725dc25fc9e7c4ea4a/tls-ssl-handshake.png

## References
- [tls-certificate](/wiki/tls-certificate/)
- [what-is-http](/wiki/what-is-http/)
- https://www.cloudflare.com/en-gb/learning/ssl/transport-layer-security-tls/

Next -> [tls-handshake](/wiki/tls-handshake/)
