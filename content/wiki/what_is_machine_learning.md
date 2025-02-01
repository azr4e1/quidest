+++
date = '2024-12-21T01:14:33Z'
hideReply = true
title = 'What is Machine Learning'
tags = ['feature_vector', 'machine_learning', 'supervised', 'unsupervised', 'labelled', 'policy', 'reinforcement', 'the_hundred_page_machine_learning_book']
+++

Machine Learning is a subfield of computer science that uses data (from nature, humans or other algorithms) to build algorithms that make predictions.

Machine learning can also be defined as the process of solving a practical problem by 1) gathering a dataset, and 2) algorithmically building a statistical model based on that dataset. That statistical model is assumed to be used somehow to solve the practical problem.

## Types of Learning

There are three main types of algorithms in machine learning:

### Supervised Learning

The dataset is a collection of _labelled_ examples $\{(x_i, y_i)\}_{i=0}^N$. Each element $x_i$ is called a _feature vector_.

A feature vector is a vector of elements $1, \dots, D$ where each element $x_i$ describes the input somehow. Each element is called a _feature_.

The label $y$ can be one of many classes $\{1, \dots, C\}$ or a real number, or a more complex structure like a matrix.

The goal of a supervised learning algorithm is to use the dataset to produce a model that takes a feature vector $x$ as input and outputs information that allows deducing the label for this feature vector.

### Unsupervised Learning

The dataset is a collection of unlabelled examples $\{x_i\}_{i=0}^N$. $x_i$ is a feature vector, and the goal of unsupervised learning is to create a model that takes a feature vector $x$ as input and either transforms it into another vector or into a value that can be used to solve a practical problem. For example, in clustering, the model returns the id of the cluster for each feature vector in the dataset. In dimensionality reduction, the output of the model is a feature vector that has fewer features than the input $x$; in outlier detection, the output is a real number that indicates how $x$ is different from a "typical" example in the dataset.

### Semi-supervised Learning

In semi-supervised learning, the dataset contains both labeled and unlabeled examples. Usually, the quantity of unlabeled examples is much higher than the number of labeled examples. The goal of a semi-supervised learning algorithm is the same as the goal of the supervised learning algorithm. The hope here is that using many unlabeled examples can help the learning algorithm to find (we might say “produce” or “compute”) a better model.

### Reinforcement Learning

Reinforcement learning is a subfield of machine learning where the machine “lives” in an environment and is capable of perceiving the state of that environment as a vector of features. The machine can execute actions in every state. Different actions bring different rewards and could also move the machine to another state of the environment. The goal of a reinforcement learning algorithm is to learn a policy.

A _policy_ is a function (similar to the model in supervised learning) that takes the feature vector of a state as input and outputs an optimal action to execute in that state. The action is optimal if it maximizes the expected average reward.
