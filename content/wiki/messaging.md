+++
date = '2025-11-07T09:48:43Z'
title = 'Messaging'
hideReply = true
tags = ["message", "RabbitMQ", "Kafka", "Redis", "Pub/Sub", "publish", "subscribe", "broker"]
+++

# Message Broker

A message broker is middleware that routes messages between applications. It decouples producers (who send messages) from consumers (who receive them) so they don't need to know about each other or be online simultaneously.
The broker receives messages, queues them, and delivers them to the right recipients based on routing rules. Examples: RabbitMQ, Apache Kafka, AWS SQS.
Main benefit: Systems can communicate asynchronously without direct connections. If a consumer crashes, messages wait in the queue until it recovers.

# Pub/Sub Messaging

Publish/Subscribe is a messaging pattern where:

- Publishers send messages to topics/channels (not directly to recipients)
- Subscribers listen to topics they care about
- When a message is published, all current subscribers to that topic receive it

Key difference from traditional queues: One message goes to multiple subscribers, not just one. It's a broadcast model.
Example: A "user-signup" topic might have subscribers for sending welcome emails, updating analytics, and triggering onboarding workflows. The signup service publishes once; all three subscribers get the message.
