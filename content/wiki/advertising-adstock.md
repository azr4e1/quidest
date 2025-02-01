+++
date = '2025-01-27T11:37:12Z'
title = 'Advertising Adstock'
hideReply = true
tags = ['marketing', 'acronyms', 'media', 'programmatic', 'channels', 'ooh', 'paid', 'social', 'search']
+++

Advertising adstock is the memory effect of advertising carried over
from start of advertising; e.g., if a company advertises at a certain
level in week 1, week 2 will have a portion of week 1 level, and so on.
Adstock is a percentage term that measures the decaying effect of
advertising throughout the weeks.

The idea behind this is that marketing exposures build awareness in
consumer's minds. That awareness doesn't disappear right after the
consumers see the ad but rather remains in their memory. Memory decays
over the weeks and hence the decay portion of adstock.

There are two dimensions to advertising adstock:

-   decay or lagged effect.
-   saturation or diminishing returns effect.

## Advertising Lag: decay effect

Exposure to ads build awareness in the consumer market, resulting in
sales. Each new exposure increases awareness to a new level. The decay
level of adstock eventually reduces awareness to its base level, until
this decay is reduced by new exposure. This decay is expressed in terms
of \'half-life\' of the ad. A *two-week half-life* means that it takes
two weeks for the awareness of an ad to decay to half its present level.

The formula for advertising adstock is

$$A_t = T_t + \lambda A_{t-1}, \qquad t = 1, \dots, n$$

where $A_t$ is the adstock at time $t$, $T_t$ is the value of the
advertising variable at time $t$, and $\lambda$ is the *decay* or lag
weight parameter.

## Advertising Saturation: Diminishing Returns effect

Increasing the amount of advertising increases the percent of the
audience reached by the advertising, hence increases demand, but a
linear increase in the advertising exposure doesn't have a similar
linear effect on the demand. Each incremental amount of ad causes a
progressively lesser effect on demand increase. This is
**advertising saturation**. Saturation only
occurs above a threshold level that can be determined by Adstock
Analysis.

Adstock can be transformed to an appropriate nonlinear form like the
logistic or Negative Exponential Distribution, depending upon the type
of diminishing returns or *saturation* effect the response function is
believed to follow.

A little example in R

```R
# Program Name: Adstock Transformation
# Written By  : Gabriel Mohanna
# Date Created: Feb 23, 2014
# Narrative   : A simple advertising adstock transformation.

# Define Adstock Rate
adstock_rate = 0.50

# Create Data
advertising = c(117.913, 120.112, 125.828, 115.354, 177.090, 141.647, 137.892,   0.000,   0.000,   0.000,   0.000,  0.000,   0.000,   0.000,   0.000,   0.000,   0.000, 158.511, 109.385,  91.084,  79.253, 102.706,  78.494, 135.114, 114.549,  87.337, 107.829, 125.020,  82.956,  60.813,  83.149,   0.000,   0.000,  0.000,   0.000,   0.000,   0.000, 129.515, 105.486, 111.494, 107.099,   0.000,   0.000,   0.000,  0.000,   0.000,   0.000,   0.000,   0.000,   0.000,   0.000,   0.000)

# Calculate Advertising Adstock
# Credit: http://stackoverflow.com/questions/14372880/simple-examples-of-filter-function-recursive-option-specifically
adstocked_advertising = filter(x=advertising, filter=adstock_rate, method="recursive")

# Alternative Method Using Loops Proposed by Linh Tran
adstocked_advertising = numeric(length(advertising))
adstocked_advertising[1] = advertising[1]
for(i in 2:length(advertising)){
    adstocked_advertising[i] = advertising[i] + adstock_rate * adstocked_advertising[i-1]
}

# Graph Data
plot(seq(1,length(advertising)), advertising, type="h", 
     xlab="Time (Usually in Weeks)", ylab="Advertising", 
     ylim=c(0, max(c(advertising, adstocked_advertising))), 
     frame.plot=FALSE)
lines(adstocked_advertising)
```
