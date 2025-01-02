+++
toc = true
hideReply = true
title = "AI design patterns"
author = "Lorenzo Drumond"
date = "2024-02-07T10:39:13"
tags = ["training",  "design",  "proxy",  "adversarial",  "language",  "testing",  "ML",  "query",  "security",  "patterns",  "machine_learning",  "firewall",  "user",  "analysis",  "AI",  "analytics",  "router",  "evaluation",  "artificial",  "theory",  "intelligence",  "malicious",  "production",  "LLM",  "model"]
+++


Designing AI applications that are scalable is difficult and in its early stages. Some design patterns have emerged for efficient handling of resources and scalability.

## AI Query Router

```
                 ┌─────────┐
                 │ Query   │
                 └────┬────┘
                      │
                 ┌────┴────┐
                 │  Router │
                 └────┬────┘
                      │
              ┌───────┴───────┐
              │               │
┌─────────────┴─────┐   ┌─────┴──────────────┐
│ Recognized Query: │   │ Not Recognized:    │
│  Small Language   │   │  Large Language    │
│     Model         │   │     Model          │
└───────────────────┘   └────────────────────┘
```

A user inputs a query, which is sent to the _router_. The router is a classifier that categorizes the input.

- If the query is recognized, it is sent to the small language model, faster and cheaper.
- If it is not, a LLM handles it.

## AI Training Design Pattern

```
┌────────┐    ┌──────────┐
│ Model  │    │   Data   │
└────┬───┘    └─────┬────┘
     │              │
     └───────┬──────┘
             │
             ▼
       ┌───────────┐
  ┌───►│ Training  │
  │    └─────┬─────┘
  │          │
  │          ▼
  │    ┌───────────┐
  │    │ Evaluation│
  │    └─────┬─────┘
  │          │
  │          ▼
  │  ┌───────────────┐
  │  │               │
  └──┤  Adversarial  │
     │     Mode      │
     └───────────────┘
```

Models are trained with data (which can be real-world and synthetic or made by another machine), then they are sent for evaluation.

The evaluation is a topic of much debate today because we lack a gold standard of model greatness. The challenge with evaluating these models is the inputs can vary enormously. Two users are unlikely to ask the same question in the same way.

The outputs can also be quite variable, a result of the non-determinism and chaotic nature of these algorithms.

Adversarial models will be used to test and evaluate AI. Adversarial models can suggest billions of tests to stress the model. They can be trained to have strengths different to the target model. Just as great teammates and competitors improve our performance, adversarial models play will play that role for AI.

## AI Security Design Pattern

```
              ┌─────────┐
              │  User   │
              └───────┬─┘
                ▲     │
Cleaned Answer  │     │ Query
                │     ▼
              ┌─┴───────┐
              │  Proxy  │
              └───────┬─┘
                ▲     │
        Answer  │     │ Cleaned Query
                │     ▼
            ┌───┴─────────┐
            │             │
            │  Firewall   │
            └─────────┬───┘
                ▲     │
        Answer  │     │ Sanitized Query
                │     ▼
              ┌─┴───────┐
              │  Model  │
              └─────────┘
```


The core security around LLMs has two components. A user component, here it’s called a proxy, and a firewall, which wraps the model.

The proxy intercepts a user query both on the way out and on the way in. The proxy eliminates personally identifiable information (PII) and intellectual property (IP), logs the queries, and optimizes costs.

The firewall protects the model and the infrastructure it uses. We have a minimal understanding of how humans can manipulate models to reveal their underlying training data, their underlying function, and the orchestration for malicious acts today. But we know these powerful models are vulnerable.

Other security layers will exist within the stack, but in terms of the query path, these are the most important.


## AI Deployment and Evaluation Design Pattern

```
           ┌───────────────────┐
           │                   │
           │ ┌───────────┐     │
           │ │Developer  │EDR  │
           │ └───────────┘     │
           │                   │
           └────────┬──────────┘
                    │
                    │ Code
                    ▼
               ┌────────┐
               │ Repo   │
               └────┬───┘
                    │
                    │
                    ▼
               ┌────────┐
       ┌───────┤  CICD  │ ───────┐
       │       └────────┘        │
       ▼                         ▼
┌───────────────┐       ┌───────────────┐
│ Model and Data│       │               │
│  Signature    │       │   LLM Testing │      ┌────────────┐
│   Validation  │       │    Harness    │ ◄─── │ Analytics  │
│               │       │               │      └────────────┘
└───────┬───────┘       └────────┬──────┘
        │                        │
        │                        │
        │                        │
        │     ┌────────────┐     │
        │     │            │     │
        └────►│ Production │◄────┘
              │            │
              └────────────┘
```

The developer’s machine is secured with endpoint detection and response, or EDR, to ensure that the data being used to train models and the underlying models are not poisoned.

The developer’s code is sent to a CICD system. The CICD system checks the model and the data are correct using signatures (Sig Verification). Today, most softwares’ signatures are verified. But not AI models.

Also, the large language model will be subjected to a testing harness (a series of tests) to ensure that it performs as expected. Real user queries from live traffic will inform the harness.

Once those tests pass, the model is pushed to production.

## References
- https://tomtunguz.com/ai-design-patterns/
