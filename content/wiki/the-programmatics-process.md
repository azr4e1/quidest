+++
date = '2025-01-27T12:12:17Z'
title = 'The Programmatics Process'
hideReply = true
tags = ['marketing', 'acronyms', 'media', 'programmatic', 'channels', 'ooh', 'paid', 'social', 'search', 'mmm', 'attribution', 'google', 'ga4', 'cookie', 'tracking_pixel', 'coursera', 'coursera']
+++

How to track millions of people and know what content they are viewing.
Currently it\'s done through cookies, but there are alternatives.

Tracking starts with HTTP: devices exchanges information with the host.
If there is an ad on the page, same process applies, but the request is
routed through an ad server. Your devices trades info with ad server,
which has cookies from your request. Each page visited with ads is able
to track your browsing throughout the day, the ads you are seeing and
how you react to them.

On business websites, which don\'t show ads, they have agreements with
ad tech companies, which require them to place small image 1x1 pixel on
the page. Doing so, the business can now retarget anonymous visitors to
their website, and ad tech companies can access anonymous browsing data
to add to their database.

This file is referred to web tracker, beacon or cookie. When you
download that page, the information is passed to a data management
platform (DMP).

## How Publishers rely on Programmatic Advertising 

Ads provide revenue: they drive your access to many services.

Programmatic have allowed many content based services to monetise their
content.

In the past publishers relied on ad contracts, and the rate would be
based on the amount of visitors they had on a monthly basis.

Publishers with extensive reach could have better rates. Many also had
to maintain their own method of serving ads, and reporting performance
data.

This was changed by programmatics. More transparency in prices and
performance. Publishers don\'t have to maintain the system, just report
the available space in ad inventory.

The ad spaces are filled programmatically, relevant and targeting on
specific user, and publishers get paid on the ad impressions they serve.

Small publishers are able to get into the game, as ad impressions have
different value depending on the user requesting the page.

## Reach the right audience at the right time 

Google is an advertiser. On Google settings, you can see how it sees you
and segments you based on your interests, from demographics to segments
based on browsing history.

Advertisers look at the ideal segmentation factors that fit their
audience. When you are shown an ad, there be millions of advertisers
competing to put the ad in front of you.

The advertiser is bidding on the audience with most affinity with the
product, and that shows activity and buying intent.

Trackers that advertisers put on your browser enables them to target
only the users that match the tracker. Also, tech has enabled connection
of multiple devices. Advertisers are able to find the connection between
the devices where you are logged into your Google/Facebook account, and
associate the devices with their targeting.

## The Data Management Platform

This is the brain of the programmatic system. It is a database that
constantly updates data from ad servers and trackers.

The data is also processed into segments and user interests, valuable
for advertisers.

The browsing data is translated into content categories, so that
advertisers can show relevant ads.

Interests can be segmented further by regions where people lives, based
on device fingerprint.

DMP is like a menu, where advertisers order the interest, behaviors,
locations and demographics of the audience they want to reach.

## How Programmatic serves and Ad 

All of this produces personalized ad for the viewer in less than 200
milliseconds. How does this all happen?

You load a page of a publisher. It contains ad spaces. This all go
through the same process. The publisher sends request to ad server to
fill the ad space, along with relevant data as first party and from
**DMP**. The ad server looks if there is a campaign fitting the
user\'s profile.

If there is Programmatic Direct relationship between publisher and
advertisers with a private exchange, those advertisers are used.
Otherwise the request is sent out to other networks, **SSP** or
third-party traders. It is also sent to the ad exchange, which sends the
user\'s info to multiple platforms, **DSP**, etc. The ad is
processed by each bidder according to the user\'s data. If it matches
the campaign target of a bidder, the appropriate creative is selected,
and the bid request is sent to the ad exchange. A process determines the
winning bid: Real-time bidding ( **RTB** ). Their price is based
on **CPM**. The winner pays an amount above the next highest
bidder. The ad server sends the winning ad along with URL and prices to
publisher\'s ad server, which is then served to the user.
