# 🔒 [security fix] Fix DOM XSS vulnerability in YouTube embed URL

## 🎯 What
This PR fixes a DOM XSS vulnerability in `script.js` related to the YouTube video modals. The issue was that the `videoId` retrieved from HTML elements was directly concatenated into the YouTube iframe `src` URL without any sanitization or escaping.

## ⚠️ Risk
An attacker who can control the HTML attribute containing the video ID (e.g. `data-youtube-id`) could inject arbitrary parameters into the YouTube iframe URL, or even break out of the URL context completely and inject malicious attributes or JavaScript into the iframe tag itself if not properly handled upstream. Although this specific case deals with a trusted source of HTML (the developer), it violates security best practices and exposes the application to XSS vectors if these attributes are ever dynamically populated by user input or unsanitized API responses.

## 🛡️ Solution
The `videoId` variables in both video setup mechanisms inside `script.js` are now wrapped in `encodeURIComponent()`. This guarantees that any special characters are safely escaped before being interpolated into the URL, completely mitigating the risk of DOM XSS via unescaped URL parameters.

Additionally, some pre-existing testing issues in `script.js` and `script.test.js` were fixed. Specifically, conflicting implementations of `validateContactForm` were resolved and additional validation boundaries were implemented to pass the tests.
