+++
date = '2024-12-21T19:41:53Z'
title = 'Machine Learning Data Structures'
hideReply = true
tags = ['scalar', 'machine_learning', 'data_structures', 'vector', 'matrix', 'the_hundred_page_machine_learning_book']
+++

## Scalar
A __scalar__ is a simple numerical value. Variables or constants that take scalar values are denoted by an italic letter, like $x$ or $a$.

## Vector
A __vector__ $x$ is an ordered sequences of scalars $(x_1, x_2, \dots, x_N)$, called attributes or elements. Vectors can be visualized as arrows that point to some directions as well as points in a multi-dimensional space. The _dimension_ in a vector is the j-th position in the vector.

A vector is denoted with a bold letter: $\textbf{x}$

## Matrix
A __matrix__ is a rectangular array of numbers arranged in rows and columns: e.g.:

$$
\begin{bmatrix}
1 & 4 & -13 \\
2 & 0.3 & -1 \\
4 & 7 & 99 \\
88 & 9 & 9.9
\end{bmatrix}
$$

Matrices are denoted with capital letters: $X, A$

## Set
A set is an unordered collection of unique elements.

A set of numbers can be finite (include a fixed amount of values). Or it can be infinite and include all values in some interval.

## Functions
A function is a relation that associates each element $x \in X$, the _domain_ of the function, to a single element $y \in Y$, the _codomain_ of the function.

A function usually is represented like $y = f(x)$, where $x$ is the input, or _variable_ of the function, and $y$ is the _output_ of the function.

A function $f$ has a local minimum in $c$ if for every $x$ in a neighborhood of $c$, we have $f(x) \ge f(c)$. The minimum of all local minima of a function is its _global minimum_.

A vector function is a function that returns a vector. It can have a scalar or vector argument.

A _derivative_ $f'$ of a function $f$ is a function or a value that describes how fast $f$ grows (or decreases). If the derivative is a constant value, like 5 or −3 , then the function grows (or decreases) constantly at any point $x$ of its domain. if $f'$ is a function, then $f$ can grow at different paces in different regions of its domain. If $f'$ is positive, then $f$ will grow in that point, while if $f'$ is negative $f$ will decrease. Derivative of zero means the function is flat.

The process of finding the derivative of a function is called _differentiation_.

_Gradient_ is the generalization of derivative for functions that take several inputs (or one input in the form of a vector or some other complex structure).

A gradient of a function is a vector of partial derivatives. You can look at finding a partial derivative of a function as the process of finding the derivative by focusing on one of the function’s inputs and by considering all other inputs as constant values.
