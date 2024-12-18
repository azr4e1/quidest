+++
title = "Analysis of a Linear Mixed Model"
author = "Lorenzo Drumond"
date = "2023-12-05T16:14:35"
tags = ["designing_running_and_analyzing_experiments",  "week9",  "experiment",  "generalized",  "regression",  "nested_effects",  "linear_model",  "coursera",  "random_effects",  "rlang",  "fixed_effects",  "within_subjects",  "design",  "theory",  "test",  "mixed",  "statistics"]
+++


# Analysis of a Linear Mixed Model

The following data is used to run an example analysis of a linear mixed model,
where the random effect is Subject, and Trial is nested in Keyboard and Posture.

`mbltxttrials.csv`
| Subject | Keyboard | Posture | Posture_Order | Trial | WPM   | Error_Rate |
|---------|----------|---------|---------------|-------|-------|------------|
|       1 |   iPhone |     Sit |             1 |      1| 21.05 |        0.01|
|       1 |   iPhone |     Sit |             1 |      2| 15.95 |        0.02|
|       1 |   iPhone |     Sit |             1 |      3| 21.51 |        0.01|
|       1 |   iPhone |     Sit |             1 |      4| 24.37 |        0.00|
|       1 |   iPhone |     Sit |             1 |      5| 22.58 |        0.05|

```R
## Linear Mixed Model (LMM) on WPM

# read in data file of smartphone text entry by 24 people, but now
# it has every single trial performed, not averaged over trials.
mbltxttrials = read.csv("mbltxttrials.csv")
View(mbltxttrials)
mbltxttrials$Subject = factor(mbltxttrials$Subject) # convert to nominal factor
mbltxttrials$Keyboard = factor(mbltxttrials$Keyboard) # Rv4
mbltxttrials$Posture = factor(mbltxttrials$Posture) # Rv4
mbltxttrials$Posture_Order = factor(mbltxttrials$Posture_Order) # convert to nominal factor
mbltxttrials$Trial = factor(mbltxttrials$Trial) # convert to nominal factor
summary(mbltxttrials)

# explore the WPM data
library(plyr)
ddply(mbltxttrials, ~ Keyboard * Posture, function(data) summary(data$WPM))
ddply(mbltxttrials, ~ Keyboard * Posture, summarise, WPM.mean=mean(WPM), WPM.sd=sd(WPM))

# histograms for two factors
hist(mbltxttrials[mbltxttrials$Keyboard == "iPhone" & mbltxttrials$Posture == "Sit",]$WPM)
hist(mbltxttrials[mbltxttrials$Keyboard == "iPhone" & mbltxttrials$Posture == "Stand",]$WPM)
hist(mbltxttrials[mbltxttrials$Keyboard == "iPhone" & mbltxttrials$Posture == "Walk",]$WPM)
hist(mbltxttrials[mbltxttrials$Keyboard == "Galaxy" & mbltxttrials$Posture == "Sit",]$WPM)
hist(mbltxttrials[mbltxttrials$Keyboard == "Galaxy" & mbltxttrials$Posture == "Stand",]$WPM)
hist(mbltxttrials[mbltxttrials$Keyboard == "Galaxy" & mbltxttrials$Posture == "Walk",]$WPM)
boxplot(WPM ~ Keyboard * Posture, data=mbltxttrials, xlab="Keyboard.Posture", ylab="WPM") # boxplots
with(mbltxttrials, interaction.plot(Posture, Keyboard, WPM, ylim=c(0, max(mbltxttrials$WPM)))) # interaction?

# libraries for LMMs we'll use on WPM
library(lme4) # for lmer
library(lmerTest)
library(car) # for Anova

# set sum-to-zero contrasts for the Anova calls
contrasts(mbltxttrials$Keyboard) <- "contr.sum"
contrasts(mbltxttrials$Posture) <- "contr.sum"
contrasts(mbltxttrials$Posture_Order) <- "contr.sum"
contrasts(mbltxttrials$Trial) <- "contr.sum"

# LMM order effect test
# Keyboard, Posture_Order, Keyboard:Posture_Order
# and Trial are all fixed effects. Trial is nested
# within Keyboard, Posture_Order. Subject is a
# random effect.
m = lmer(WPM ~ (Keyboard * Posture_Order)/Trial + (1|Subject), data=mbltxttrials)
Anova(m, type=3, test.statistic="F")

# main LMM test on WPM
# Keyboard, Posture, Keyboard:Posture and Trial are
# all fixed effects. Trial is nested within
# Keyboard, Posture. Subject is a random effect.
m = lmer(WPM ~ (Keyboard * Posture)/Trial  + (1|Subject), data=mbltxttrials)
Anova(m, type=3, test.statistic="F")

# we should consider Trial to be a random effect and we obtain
# almost exactly the same results, but takes longer to run.
# NOTE: the syntax in the Coursera video was incorrect for this
# and has been corrected here.
#m = lmer(WPM ~ (Keyboard * Posture)/(1|Trial) + (1|Subject), data=mbltxttrials)  # incorrect in video
m = lmer(WPM ~ Keyboard * Posture + (1|Keyboard:Posture:Trial) + (1|Subject), data=mbltxttrials) # new, correct
Anova(m, type=3, test.statistic="F")

# perform post hoc pairwise comparisons
library(multcomp) # for glht
library(emmeans) # for emm
summary(glht(m, emm(pairwise ~ Keyboard * Posture)), test=adjusted(type="holm"))
with(mbltxttrials, interaction.plot(Posture, Keyboard, WPM, ylim=c(0, max(mbltxttrials$WPM)))) # for convenience
```

# References
- [one-way-repeated-measures-anova](/wiki/one-way-repeated-measures-anova/)
- [anova-assumptions](/wiki/anova-assumptions/)
- [example-analysis-of-an-ab-test](/wiki/example-analysis-of-an-ab-test/)
- [factorial-anova](/wiki/factorial-anova/)
- [one-way-anova](/wiki/one-way-anova/)
- [analysis-of-a-generalized-linear-mixed-model](/wiki/analysis-of-a-generalized-linear-mixed-model/)
