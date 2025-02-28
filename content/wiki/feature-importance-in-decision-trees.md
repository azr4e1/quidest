+++
date = '2025-02-28T10:21:47Z'
title = 'Feature Importance in Decision Trees'
hideReply = true
tags = ['machine learning', 'ML', 'machine_learning', 'programming', 'statistics', 'information gain', 'gini index', 'entropy', 'cart']
+++

In [decision trees](/wiki/decision-trees-classification), **feature importance** quantifies the contribution of each feature to the model's predictive performance. It is calculated based on the reduction in a chosen impurity measure—such as Gini impurity or entropy—for classification tasks, or variance for regression tasks—achieved by splits involving the feature across all nodes in the tree.

## Calculating feature importance

1. **Impurity Reduction**: when a node is split, the impurity decreases. This reduction is calculated as the difference between the impurity of the parent node and the weighted sum of the impurities of its children
2. **Aggregating Impurity Reductions**: For each feature, sum the impurity reductions for all nodes where the feature is used for splitting
3. **Normalization**: normalize the feature importances by dividing each feature's total impurity reduction by the sum of all features' impurity reductions.

Given a node N, let $I(N)$ denote it's impurity; if $N_L$ and $N_R$ are its children, then the impurity reduction for N is

$$
\Delta I(N) = I(N) - (\frac{|N_L|}{|N|} I(N_L) + \frac{|N_R|}{|N|} I(N_R))
$$

The importance of feature $f$, $FI(f)$, is calculated as

$$
FI(f) = \frac{1}{Z} \sum_{N \text{uses} f} \Delta I(N)
$$

where

$$
Z = \sum_f \sum_{N \text{uses} f} \Delta I(N)
$$

## Considerations

1. Features with numerous unique values (e.g., continuous variables) may appear more important because they can create more precise splits, even if they're not truly more informative.
2. To address potential biases, consider using _permutation feature importance_, which assesses the impact of feature value shuffling on model performance.
