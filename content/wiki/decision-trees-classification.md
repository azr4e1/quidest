+++
date = '2025-02-27T15:29:21Z'
title = 'Decision Trees Classification'
tags = ['machine learning', 'ML', 'machine_learning', 'programming', 'statistics', 'information gain', 'gini index', 'entropy', 'cart']
hideReply = true
+++

![decision tree example](/images/decision-tree.png)

A decision tree is a supervised learning model used to predict the class label of instances by learning simple decision rules inferred from data features. It consists of nodes representing decisions based on feature values, leading to leaf nodes that denote class labels.

## Building a Decision Tree

The process involves recursively splitting the dataset based on feature values to maximize the homogeneity of the resulting subsets:

1. At each node, the algorithm evaluates all available features to determine the optimal split. The goal is to choose the feature that best separates the data into distinct classes. This is achieved using metrics like [Information Gain](/wiki/information-gain) or [Gini Impurity](/wiki/gini-impurity)
2. Once the best feature is selected based on the chosen metric, the dataset is partitioned into subsets. This process is recursively applied to each subset, creating branches of the tree.
3. The recursion continues until a stopping condition is met, such as:
    - All instances in a node belong to the same class.
    - No remaining features to split on.
    - The tree reaches a predefined maximum depth.


## Gini Impurity, Entropy and Information Gain

**Gini Impurity** measures the probability of incorrectly classifying a randomly chosen element if it was labeled according to the distribution of labels in the subset.

For a dataset D with C classes:

$$
G(D) = 1 - \sum_{i=1}^C p_i^2
$$

where $p_i$ is the proportion of instances belonging to class $i$ in D


**Information Gain** measures the reduction in entropy (uncertainty) after a dataset is split on a feature. **Entropy** quantifies the impurity or disorder in the data.

### Entropy

For a binary classification with classes $p$ and $n$:

$$
H(D) = -p \log_2(p) - n \log_2(n)
$$

### Information Gain

The Information Gain of a split from node $N$ to nodes $N_l$ and $N_r$ is calculated as:

$$
IG(N, N_l, N_r) = H(N) - \frac{|N_l|}{|N|} H(N_l) - \frac{|N_r|}{|N|} H(N_r)
$$

## From Scratch

```python
import pandas as pd
import numpy as np


def gini_impurity(y):
    classes = np.unique(y)
    impurity = 1.0
    for cls in classes:
        prob = np.sum(y == cls) / len(y)
        impurity -= prob ** 2
    return impurity


def information_gain(y, y_left, y_right):
    p = len(y_left) / len(y)
    return gini_impurity(y) - (p * gini_impurity(y_left) + (1 - p) * gini_impurity(y_right))


def split_dataset(X, y, feature_index, threshold):
    left_mask = X[:, feature_index] <= threshold
    right_mask = X[:, feature_index] > threshold
    return X[left_mask], y[left_mask], X[right_mask], y[right_mask]


class DecisionTree:
    def __init__(self, max_depth=None, min_samples_split=2):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.tree = None

    def fit(self, X, y):
        self.tree = self._build_tree(X, y)

    def _build_tree(self, X, y, depth=0):
        num_samples, num_features = X.shape
        if (self.max_depth is not None and depth >= self.max_depth) or num_samples < self.min_samples_split or len(np.unique(y)) == 1:
            leaf_value = self._most_common_label(y)
            return {'leaf': True, 'class': leaf_value}

        best_gain = 0
        best_split = None
        for feature_index in range(num_features):
            thresholds = np.unique(X[:, feature_index])
            for threshold in thresholds:
                X_left, y_left, X_right, y_right = split_dataset(
                    X, y, feature_index, threshold)
                if len(y_left) > 0 and len(y_right) > 0:
                    gain = information_gain(y, y_left, y_right)
                    if gain > best_gain:
                        best_gain = gain
                        best_split = {
                            'feature_index': feature_index,
                            'threshold': threshold,
                            'X_left': X_left,
                            'y_left': y_left,
                            'X_right': X_right,
                            'y_right': y_right
                        }

        if best_gain == 0:
            leaf_value = self._most_common_label(y)
            return {'leaf': True, 'class': leaf_value}

        left_subtree = self._build_tree(
            best_split['X_left'], best_split['y_left'], depth + 1)
        right_subtree = self._build_tree(
            best_split['X_right'], best_split['y_right'], depth + 1)
        return {
            'leaf': False,
            'feature_index': best_split['feature_index'],
            'threshold': best_split['threshold'],
            'left': left_subtree,
            'right': right_subtree
        }

    def _most_common_label(self, y):
        return np.bincount(y).argmax()

    def predict(self, X):
        return np.array([self._predict_sample(sample, self.tree) for sample in X])

    def _predict_sample(self, sample, tree):
        if tree['leaf']:
            return tree['class']
        feature_value = sample[tree['feature_index']]
        if feature_value <= tree['threshold']:
            return self._predict_sample(sample, tree['left'])
        else:
            return self._predict_sample(sample, tree['right'])
```
