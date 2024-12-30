+++
toc = true
hideReply = true
title = "Elm Architecture"
author = "Lorenzo Drumond"
date = "2024-03-22T00:22:13"
tags = ["computer_science",  "paradigm",  "architecture",  "programming",  "games",  "programs",  "model",  "development",  "update",  "view",  "web",  "webapp",  "coding",  "pattern",  "elm"]
+++


The Elm Architecture is a pattern for architecting interactive programs, like webapps and games.

## Basic Pattern

Elm programs always look something like:

```
      ┌───────────Html────────┐
      │                       │
      │                       │
      │                       ∨
 ┌──────────┐            ┌──────────┐
 │ Elm      │            │ Client   │
 │          │            │          │
 └──────────┘            └──────────┘
      ∧                       │
      │                       │
      └────────────Msg────────┘

```

The Elm program produces HTML to show on screen, and then the computer sends back messages of what is going on - "They clicked a button"

An Elm program always breaks into three parts:

1. Model - the state of the application
2. View - a way to turn your state into HTML
3. Update - a way to update your state based on messages

These three concepts are the core of __The Elm Architecture__

Elm starts by rendering the initial value on screen. From there you enter into this loop:

1. Wait for user input
2. Send a message to Update
3. Produce a new Model
4. Call View to get new HTML
5. Show the new HTML on screen
6. Repeat

## References
- https://guide.elm-lang.org/architecture/
