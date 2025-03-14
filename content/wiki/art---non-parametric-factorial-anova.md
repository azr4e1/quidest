+++
toc = true
hideReply = true
title = "ART - non-parametric factorial ANOVA"
author = "Lorenzo Drumond"
date = "2023-11-28T11:03:24"
tags = ["greenhouse_geyser",  "interactions",  "counterbalancing",  "design",  "week7",  "non_parametric",  "align",  "eta_squared",  "sphericity",  "rlang",  "ART",  "coursera",  "designing_running_and_analyzing_experiments",  "anova",  "test",  "experiment",  "statistics",  "theory"]
+++


Errors almost always do not conform to the assumptions of ANOVA [anova-assumptions](/wiki/anova-assumptions/), so they are not easy to analyse in parametric procedures.

We can use the __Aligned Rank Transform (ART)__ procedure. It operates on ranks like other non-parametric tests. In particular,
it operates on _aligned ranks_: the data is aligned before it is ranked.

Aligned means that only the effect of interest is left in the data because we subtract out values from it that remove the possibility of other effects. E.g. if we are only interested in the effect of keyboard differences in WPM, we can align the data by subtracting the estimated effect of postures on WPM.

ART uses a Linear Mixed Model in the background

```R
## Nonparametric approach to factorial ANOVA
## The Aligned Rank Transform (ART) procedure
## http://depts.washington.edu/acelab/proj/art/

library(plyr)
ddply(mbltxt, ~ Keyboard * Posture, function(data) summary(data$Error_Rate))
ddply(mbltxt, ~ Keyboard * Posture, summarise, Error_Rate.mean=mean(Error_Rate), Error_Rate.sd=sd(Error_Rate))

hist(mbltxt[mbltxt$Keyboard == "iPhone" & mbltxt$Posture == "Sit",]$Error_Rate)
hist(mbltxt[mbltxt$Keyboard == "iPhone" & mbltxt$Posture == "Stand",]$Error_Rate)
hist(mbltxt[mbltxt$Keyboard == "iPhone" & mbltxt$Posture == "Walk",]$Error_Rate)
hist(mbltxt[mbltxt$Keyboard == "Galaxy" & mbltxt$Posture == "Sit",]$Error_Rate)
hist(mbltxt[mbltxt$Keyboard == "Galaxy" & mbltxt$Posture == "Stand",]$Error_Rate)
hist(mbltxt[mbltxt$Keyboard == "Galaxy" & mbltxt$Posture == "Walk",]$Error_Rate)
boxplot(Error_Rate ~ Keyboard * Posture, data=mbltxt, xlab="Keyboard.Posture", ylab="Error_Rate") # boxplots
with(mbltxt, interaction.plot(Posture, Keyboard, Error_Rate, ylim=c(0, max(mbltxt$Error_Rate)))) # interaction?

library(ARTool) # for art, artlm
m = art(Error_Rate ~ Keyboard * Posture + (1|Subject), data=mbltxt) # uses LMM
anova(m) # report anova
shapiro.test(residuals(m)) # normality?
qqnorm(residuals(m)); qqline(residuals(m)) # seems to conform

with(mbltxt, interaction.plot(Posture, Keyboard, Error_Rate, ylim=c(0, max(mbltxt$Error_Rate)))) # for convenience
library(emmeans) # for emmeans
emmeans(artlm(m, "Keyboard"), pairwise ~ Keyboard)
emmeans(artlm(m, "Posture"), pairwise ~ Posture)
#emmeans(artlm(m, "Keyboard : Posture"), pairwise ~ Keyboard : Posture) # don't do this in ART!

library(phia)
testInteractions(artlm(m, "Keyboard:Posture"), pairwise=c("Keyboard", "Posture"), adjustment="holm")

art.con(m, ~ Keyboard * Posture, adjust="holm")
```

## References
- [anova-assumptions](/wiki/anova-assumptions/)
- [one-way-repeated-measures-anova](/wiki/one-way-repeated-measures-anova/)
- [one-way-anova](/wiki/one-way-anova/)
- [factorial-anova](/wiki/factorial-anova/)
- [introduction-to-generalized-linear-models](/wiki/introduction-to-generalized-linear-models/)
