+++
toc = true
hideReply = true
title = "Markov Chains"
author = "Lorenzo Drumond"
date = "2024-08-20T14:06:37"
tags = ["statistics",  "search",  "math",  "machine_learning",  "programming",  "markov",  "chains"]
+++



A Markov Chain is a mathematical model that describes a system that transitions
from one state to another, within a finite or countable set of possible states,
in a random manner. The key feature of a Markov Chain is that the probability
of transitioning to a future state depends only on the current state and not on
the sequence of events that preceded it. This property is known as the *Markov
Property* or memorylessness.

## Formal Definition

A Markov Chain is defined by

1. A set of states $S = (s_1, s_2, ..., s_n)$
2. Transition probabilities: the probability of moving from state $s_i$ to $s_j$ is $P_{ij}$, so that:

$$
P_{ij} = P(X_{t+1} = s_j | X_t = s_i)
$$

where $X$ is the state at time $t$.

This creates a transition matrix $P$, which is a square matrix of size nxn (n number of states) with each element $P_{ij}$ representing the transition probability from $s_i$ to s_j.

3. Initial state distribution $p_0$: this is a vector that describes the initial probabilities of the system being in each state:

$$
p_0 = (p0_1, p0_2, ..., p0_n)
$$

where $p0_i = P(X_0 = s_i)$

## Markov Property

The probability of moving to next state $s_{t+1}$ depends only on the current state $s_t$ and not on the history of past states:

$$
P(X_{t+1} = s_{t+1} | X_t = s_t, X_{t-1} = s_{t-1}, ..., X_0 = s_0) = P(X_{t+1} = s_{t+1} | X_t = s_t)
$$

## Types of Markov Chains

- Discrete-time Markov Chain: The system evolves in discrete time steps, and the transitions happen at these steps.
- Continuous-time Markov Chain: The system evolves continuously over time, and transitions can happen at any moment.

## Stationary Distribution

A Markov Chain can reach a stationary distribution p where, once the system reaches this distribution, the probability of being in any particular state remains constant over time. This occurs when:

$$
p \cdot P = p
$$

where $p$ is the stationary distribution vector and $P$ is the transition matrix.

## References

- chatGPT

Next -> [markov-chains-in-machine-learning](/wiki/markov-chains-in-machine-learning/)
