+++
date = '2025-01-27T11:59:50Z'
title = 'Online Analytics'
hideReply = true
tags = ['marketing', 'acronyms', 'media', 'programmatic', 'channels', 'ooh', 'paid', 'social', 'search', 'mmm', 'attribution', 'google', 'ga4', 'cookie', 'tracking_pixel']
+++

Every action on the web is tracked.

The data is captured through

-   Cookies
-   Tracking Pixels

A **cookie** is a small file that a website stores on your
computer. It contains some information about your activity. The server
will store their own files and match your cookie to the record on
server. This allows to know if the user is returning, how much time
between visits, and what ads they clicked.

Ad platform like Google and Facebook use cookies to identify users as
they browse around the web. As you browse, the publishers will see list
of websites you interacted with and serve you ads you are more likely to
engage with. This is the base of [Programmatic Advertising](/wiki/programmatic-advertising.md).

Alongside cookies, we have the **tracking pixel**. It
stores information on the webserver, not on your computer. It is a 1x1
transparent image for tracking, often used to see if users convert after
seeing a particular ad. The server stores a small file, `pixel.gif`, and
every time it is asked for that file, it is going to log that requests:
instead of asking just for `pixel.gif`, we add custom variables to the
request, like `pixel.gif?ID=123&ORDER=ABC`.

The server will be successful in delivering the image, but it does keep
a log of that unique URL, and can use the variables to match a
transaction back to a particular user or advertising event.
