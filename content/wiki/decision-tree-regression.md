+++
date = '2025-02-27T17:34:48Z'
title = 'Decision Tree Regression'
hideReply = true
tags = ['machine learning', 'ML', 'machine_learning', 'programming', 'statistics', 'information gain', 'gini index', 'entropy', 'cart', 'regression']
+++

![decision tree example](/images/decision-tree.png)

A decision tree is a supervised learning model used to predict the class label of instances by learning simple decision rules inferred from data features. It consists of nodes representing decisions based on feature values, leading to leaf nodes that denote class labels.

## Building a Decision Tree

The process involves recursively splitting the dataset based on feature values to maximize the homogeneity of the resulting subsets:

1. In regression trees, the quality of a split is often evaluated using metrics like Mean Squared Error (MSE) or Mean Absolute Error (MAE): $MSE = \frac{1}{n} \sum_{i=1}^n (y_i - \overline{y})$
2. Once the best feature is selected based on the chosen metric, the dataset is partitioned into subsets. This process is recursively applied to each subset, creating branches of the tree.
3. The recursion continues until a stopping condition is met, such as:
    - No remaining features to split on.
    - The tree reaches a predefined maximum depth.


## From Scratch

```python
import pandas as pd
import numpy as np


def split_dataset(X, y, feature_index, threshold):
    left_mask = X[:, feature_index] <= threshold
    right_mask = X[:, feature_index] > threshold
    return X[left_mask], y[left_mask], X[right_mask], y[right_mask]


def mse(y):
    return np.mean((y - np.mean(y))**2)


def weighted_mse(y_left, y_right):
    total_len = len(y_left) + len(y_right)
    return (len(y_left)/total_len) * mse(y_left) + (len(y_right)/total_len) * mse(y_right)


class DecisionTreeRegressor:
    def __init__(self, max_depth, min_samples_split=2):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.tree = None

    def fit(self, X, y):
        self.tree = self._build_tree(X, y)

    def _build_tree(self, X, y, depth=0):
        num_samples, num_features = X.shape
        if (self.max_depth is not None and depth >= self.max_depth) or num_samples < self.min_samples_split or len(np.unique(y)) == 1:
            leaf_value = np.mean(y)
            return {'leaf': True, 'value': leaf_value}

        best_mse = float('inf')
        best_split = None
        for feat in range(num_features):
            thresholds = np.unique(X[:, feat])
            for threshold in thresholds:
                left_X, left_y, right_X, right_y = split_dataset(
                    X, y, feat, threshold)
                current_mse = weighted_mse(left_y, right_y)
                if current_mse < best_mse:
                    best_mse = current_mse
                    best_split = {
                        'feature_index': feat,
                        'threshold': threshold,
                        'X_left': left_X,
                        'y_left': left_y,
                        'X_right': right_X,
                        'y_right': right_y
                    }

        if best_mse == float('inf'):
            return {'leaf': True, 'value': np.mean(y)}

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

    def predict(self, X):
        return np.array([self._predict_sample(sample, self.tree) for sample in X])

    def _predict_sample(self, sample, tree):
        if tree['leaf']:
            return tree['value']
        feature_value = sample[tree['feature_index']]
        if feature_value <= tree['threshold']:
            return self._predict_sample(sample, tree['left'])
        else:
            return self._predict_sample(sample, tree['right'])
```

