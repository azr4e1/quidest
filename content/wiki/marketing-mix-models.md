+++
date = '2025-01-27T11:48:44Z'
title = 'Marketing Mix Models'
hideReply = true
tags = ['marketing', 'acronyms', 'media', 'programmatic', 'channels', 'ooh', 'paid', 'social', 'search', 'mmm', 'attribution']
+++

Marketing Mix Modelling (MMM) or Media Mix Modelling is an analytical
approach which uses statistical techniques to quantify the impact of
various marketing tactics (Market Mix) to optimise and forecast
promotional tactics with respect to sales revenue or profit.

MMM helps figure out an optimal spend allocation. It is the process of
quantifying the impact of each marketing vehicle in terms of ROI and
effectiveness.

In MMM, the volume of sales is modelled as the dependant variable, while
the independent variables represent elements (drives marketing) of the
marketing process.

The objective is to evaluate past marketing performance ( _2-5 years of
historical data, monthly or weekly_ ) to measure how media channels
drive sales to determine *true* marketing ROI and optimal mix of media
activity.

## Trend Analysis: before and after

We look at the difference of revenue between before a marketing event
(like newspaper ad) and after the marketing event to determine if it
drove a change in revenue, and analyse what that change is.

Before and after analysis is the first and best method to try when you
are attributing activities.

## Linear regression with single variable

In order to know how a variable affects sales, linear regression is a
good starting point. You can build a regression model directly into
Excel or LibreOffice. In Excel, you can use the `LINEST` function
(linear estimator).

## Variables with positive and negative correlations 

*Correlation isn\'t causation*. However if a variable is not correlated
to another variable, it probably won\'t affect much the second either.

To calculate correlation between two columns in Excel, we can use the
`CORREL` function.

To show how many variables are correlated to each other, we can create a
correlation matrix. Remember how correlation between r.v.s $X$ and $Y$
is defined:

$$\text{cov}(X, Y) = E[(X - E[X])(Y - E[Y])]\\ \text{cor}(X, Y) = \frac{\text{cov}(X, Y)}{\sigma(X)\sigma(Y)}$$

so, if we have a vertical vector $X = (X_1, \dots, X_n)^t$, then the
covariance matrix is:

$$\text{cov}(X) = (X - E[X]) \cdot (X - E[X])^t$$

and the correlation matrix follows naturally.

## Multivariate Regression

In order to accurately attribute the impact of each channel on sales,
you need to account for multiple variables and their interaction with
each other.

`LINEST` function in Excel can do that too.

To calculate the contribution to the revenue of the media channels after
we have built our multivariate regression model, we just multiply the
respective column (e.g.: social ads) by the respective coefficient
determined by the linear regression; that is the contribution to the
revenue of that particular channel. It is basically how much the channel
made in revenue according to our model. The percentage is of course
that, divided by the total *predicted* revenue, which is just the sum of
all the contributions, plus the baseline (the intercept).

It\'s important to visualise the error of the model, in order to
determine if there is some pattern: that may mean that we are missing
something important that the model doesn\'t capture.

Diminishing Return and Adstock {#Diminishing Return and Adstock}
------------------------------

Not all variables have a linear relationship with sales: for example,
brand marketing tends to have a [lagged impact](/wiki/advertising-adstock) long past when the ad ran.

Also, what we often see is a [diminishing return](/wiki/diminishing-return) effect on the incremental dollar spent
