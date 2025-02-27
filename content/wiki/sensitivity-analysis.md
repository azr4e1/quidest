+++
date = '2025-02-04T09:45:05Z'
title = 'Sensitivity Analysis'
hideReply = true
tags = ['analytics', 'data', 'variation', 'statistics', 'math', 'machine learning']
+++

Sensitivity analysis shows how different values of an independent variable affect a dependent variable under a given set of assumptions. Companies use sensitivity analysis to identify opportunities, mitigate risk, and communicate decisions to upper management.

- Sensitivity analysis shows how different values of an independent variable affect a dependent variable under a given set of assumptions
- This model is called "what-if" or simulation analysis
- Sensitivity analysis helps predict share prices of publicly traded companies or how interest rates affect bond prices

## Mathematical Formulation

The object of study for sensitivity analysis is a function $f$, called _mathematical model_ of _programming code_, viewed as a black box, with the _p_-dimensional input $X = (X_1, \dots, X_p)$ and output $Y$:

$$
Y = f(X)
$$

The variability in input parameters $X_i, i=1,\dots,p$ have an impact on $Y$.

sensitivity analysis aims to measure and quantify the impact of each input $X_i$ or a group of inputs on the variability of the output $Y$ (by calculating the corresponding sensitivity indices).

## Practical Application

In practice, it is the process of passing different inputs to a model to see how the outputs change. It differs from Monte Carlo Simulation in that no probability distributions are assigned to the inputs, and typically larger ranges of the inputs are chosen.

Sensitivity Analysis does not derive any expected outcome or a probability distribution of outcomes, instead returning a range of possible output values associated with each set of inputs.

For the model given by

$$
y = f(X), \\ \quad X = [x_1, x_2, \dots, x_n]
$$

where:

- $y$: model output
- $X$: model input matrix
- $x_i$: value of $i$th variable

Follow the following steps:

1. Choose a set of values for each $x_i$,
2. Take the cartesian product of these values as $[X_1, X_2, \dots, X_m]$
3. For each $X_i$, calculate $y_i = f(X_i)$
4. Store the values of $X_i$ mapped to $y_i$
5. Visualize $y_i$ versus $X_i$

One Python package to deal with sensitivity analysis with ease is `sensitivity`:

```python
from sensitivity import SensitivityAnalyzer

def my_model(x_1, x_2):
    return x_1 ** x_2

sensitivity_dict = {
    'x_1': [10, 20, 30],
    'x_2': [1, 2, 3]
}

sa = SensitivityAnalyzer(sensitivity_dict, my_model)
plot = sa.plot()
styled_df = sa.styled_dfs()
```

## References

- https://www.investopedia.com/terms/s/sensitivityanalysis.asp
- https://en.wikipedia.org/wiki/Sensitivity_analysis#:~:text=Sensitivity%20analysis%20is%20the%20study,of%20uncertainty%20in%20its%20inputs
- https://nickderobertis.github.io/sensitivity/auto_examples/sensitivity_analysis.html
