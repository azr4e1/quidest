+++
date = '2024-12-21T17:41:53Z'
hideReply = true
title = 'Why Machine Learning Works'
tags = ['feature_vector', 'machine_learning', 'supervised', 'unsupervised', 'labelled', 'policy', 'reinforcement', 'decision_boundary', 'svm', 'statistical_model', 'training', 'the_hundred_page_machine_learning_book']
+++

Machine Learning works by trying to generalize the distribution of the training data. Let's take the **Support Vector Machine** algorithm for example. Given feature vectors and labels (positive, negative), **SVM** will draw a line that best separates these two groups in a multidimensional space. In machine learning, the boundary separating the examples of different classes is called the _decision boundary_.

If the examples used for training were selected randomly, independently of one another, and following the same procedure, then, statistically, it is more likely that the new negative example will be located on the plot somewhere not too far from other negative examples. The same concerns the new positive example: it will likely come from the surroundings of other positive examples. In such a case, our decision boundary will still, with high probability, separate well new positive and negative examples from one another. For other, less likely situations, our model will make errors, but because such situations are less likely, the number of errors will likely be smaller than the number of correct predictions.
