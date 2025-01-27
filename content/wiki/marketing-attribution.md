+++
date = '2025-01-27T11:52:12Z'
title = 'Marketing Attribution'
hideReply = true
tags = ['marketing', 'acronyms', 'media', 'programmatic', 'channels', 'ooh', 'paid', 'social', 'search', 'mmm', 'attribution']
+++

**Multi-touch attribution** is the act of determining the value of each
customer touchpoint that lead to a conversion. The goal is to figure out
which marketing channels or campaigns should be credited with the
conversion, with the ultimate intention of allocating future spend to
acquire new customers more effectively.

With multi-touch attribution, you take a conversion event, like a
customer signing up for a free trial, and look at the role each
touchpoint played in creating that sign-up.

These analyses are performed to determine which ad is responsible for
purchase, and decide what is performing well and what not, and aid the
use of programmatics and re-targeted ads. It is used on user-level data.

You have to take into account the cost of each touchpoints and the
weight you give its stage of the customer journey.

Then, you compare that relationship to the value of the conversion it
contributes to, like its revenue.

## Last-click Attribution

It is the default model for digital marketing. It easy to understand,
but has flaws: it can misplace credit for purchase.

-   Ex.1: A user clicks on ad, and immediately purchases -> the ad
    deserves 100% credit
-   Ex.2: A user clicks on ad, visits a blog, then purchases -> blog
    gets 100% credit of purchase.
-   Ex.3: A user visits blog, then user clicks on ad -> ad gets 100%
    credit, even though the blog contributed to the purchase.

Use last click when

-   just getting started with attribution
-   mostly rely on paid ads for new customers
-   product has short purchase cycle

Not use last click:

-   Spending more then 50K/month on ads
-   established brand with lots of organic traffic
-   product has a long purchase cycle

## Time-Decay and conversion lags

An ad clicked right before a purchase is worth more than an ad clicked a
month ago. Time decay attribution:

-   Gives more credit for
    [touches](/wiki/marketing-acronyms) (interactions
    with brand) that happened recently
-   Gives less credit for touches that happened longer ago
-   Shares credit more evenly than last click

The way you assign credit based on the amount of time since the touch is
using a *half-life* model (*exponential decay*): to assign the credit,
you define a half-life time $h$: after every $h$, the new touch will get
half of the credit that the previous touch did

$$\text{new touch} = \text{touch} + a \cdot \text{old touch}$$

where, if $h$ is the time decay, then

$$a = \sqrt[h]{\frac{1}{2}}$$

You should use time decay if:

-   first step up from last click
-   using multiple marketing channels
-   product has longer purchase cycle

## Linear attribution

-   Shares credit **evenly** across all touches
-   Easy to calculate
-   Makes no value judgement about touches

Use it when

-   using lots of smaller channel (little data, helps niche channel to
    emerge)
-   product has complex purchase cycle
-   don't have strong opinion on relative value

## First-click attribution

-   Only gives credit to first touch
-   Easy to understand
-   Second most popular option for digital marketing

This is basically the opposite of last-click: for example, say a user
read a blog, and after some time an ad reminds them of the product the
blog was about, and the user make a purchase. The ad deserves some
credit but not 100%, most credit should go to the blog. When to use it:

-   First step up from last click
-   Using top-of-funnel marketing channels (social media)
-   product has a longer purchase cycle (to give credit to ad that
    introduced user to the business)

Many people claim that this should be the default model rather than
last-click, as it is just as simple and often more accurate.

## Position based models

-   The most flexible model
-   allows manual weighting of value
-   requires custom analysis

In position based models you assign weights of importance to the
touchpoints of the customer\'s journey based on the positions of the
touchpoints in said journey.

Ex. User reads blog, signs up for email list, click on email the leads
them to website, but don\'t buy straight away. Then they see ad few days
later, click on the ad and purchase. Under last-click, ad gets all the
credit, but that\'s not the full story. Under position based, you decide
how the credit is assigned.

When to use it:

-   in need of more sophisticated model
-   using multiple marketing channels
-   Spending more than 100K/month on ads

## Data driven models

Most sophisticated and robust models available.

-   work in the background automatically
-   limits human bias in model
-   sometimes leads to unusual results

Data driven models determine credit share based on the uplift that the
channels drive, figured out algorithmically using machine learning.

When to use it:

-   Don\'t have a strong opinion on relative value (leave it to the AI)
-   have a complex marketing channel mix
-   Spending more than 100K/month on ads

## Click-and-View windows

Click based models are well trusted because it is unlikely to give too
much credit to a channel or ad.

However, even when we don\'t click on the ad, it may still have an
impact on whether that person buys later on.

To properly attribute value to view-through, we use a
**Click-through Window**: a window of time in
which a user clicks on an ad, and any sales or conversions which happen
within that window (typically 7-30 days after the click), are credited
to that ad.

A **View-through Window** is the same thing,
with the difference that the user only *sees* the ad but doesn\'t click.
The window in this case is typically 1 day.

There are measurement differences between platforms. Click-and-View
windows are main reason why ad reports don\'t match analytics reports:
ad platforms ignore the impact of organic channels, and analytics like
Google Analytics doesn\'t know about ad views.

- Avoid overly generous view-through windows
- choose appropriate click windows for product life cycle
- validate incrementally using a deprivation test (switch it off and
  on and compare differences)

## How to do multi-touch attribution 

It is not the easiest thing to set up, because customer journeys are
very complex. The overall steps are:

1.  **Collect**: to collect data on who is visiting the
    site, how they got there and whether they convert, we have different
    options to use in tandem:
    -   *Javascript*, with calls to:
        -   `page` \-- records when a customer views the page;
        -   `track` \-- records what the customer does on the page;
        -   `identify` \-- ties the behaviour to other traits you know
            about them;
        -   `inbound` \-- identifies where the customer comes from.
    -   [UTMs](/wiki/marketing-acronyms): snippets at the
        end of URLs that provide data about where the customer comes
        from, with information about source, campaign and creative type.
    -   *APIs*: integrations you have with your CRM and others that have
        proprietary ways of identifying your customers.
2.  **Combine**: then you need to make sense of the data
    combining it in one place (like GCP)
3.  **Visualize**; you need a way to query and report the
    data to turn into graphs and charts you can understand.
