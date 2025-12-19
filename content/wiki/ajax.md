+++
toc = true
hideReply = true
title = "Ajax"
author = "Lorenzo Drumond"
date = "2024-01-18T12:56:18"
+++


Ajax stands for _Asynchronous Javascript and XML_.

It is a set of web development principles to build more responsive websites and applications. AJAX allows web pages to update content without users having to reload the page.

JavaScript creates, adds, and manages dynamic structure by monitoring which content requires real-time updates while a visitor is accessing a website.

Extensible Markup Language (XML) transports the data between the web server and the browser. Aside from XML, other formats like plain text and JSON are frequently used for exchanging data.

JavaScript and Extensible Markup Language work together under AJAX to ensure the web page content is updated asynchronously. In other words, with AJAX, site content can be updated without reloading the entire page.

| Conventional model                                                                                                                                                                                                         | AJAX model                                                                                                                                                              |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| The browser sends an HTTP request to the server.                                                                                                                                                                           | The browser creates a JavaScript call, which then creates a new XMLHttpRequest object.                                                                                  |
| The web server receives and processes the request.                                                                                                                                                                         | The new XMLHttpRequest object transfers data between the browser and the web server in an XML format.                                                                   |
| The web server sends the requested data to the browser.                                                                                                                                                                    | The XMLHttpRequest object sends a request for the updated page data to the web server. Subsequently, the latter processes the request and sends it back to the browser. |
| The browser receives the data from the server and reloads it as an HTML page. Users have to wait until it finishes loading. Therefore, the conventional model increases the load on the server and is more time-consuming. | The browser uses JavaScript to process the response and displays the updated content directly on the HTML page without reloading.                                       |


## Example
A classic example is the Google's autocomplete feature. This feature offers keyword suggestions, helping users complete their search query when typing into the search bar. The changes happen in real-time, but the web page remains the same.

## References
- https://www.hostinger.com/tutorials/what-is-ajax
