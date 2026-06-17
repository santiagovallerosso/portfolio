# 🔒 [Security Fix] DOM XSS via unescaped videoId

🎯 **What:**
The vulnerability resided in `script.js` on lines 433 and 473, where the user-provided `videoId` (retrieved via `trigger.getAttribute()`) was directly injected into the `src` attribute of the YouTube iframe player without any encoding or escaping.

⚠️ **Risk:**
A malicious actor could craft or manipulate the `data-youtube-id` or corresponding attributes to include arbitrary HTML parameters or script payloads. When the application concatenated this unescaped `videoId`, it created a severe risk of Cross-Site Scripting (DOM XSS). This vulnerability could result in unauthorized execution of malicious scripts within the user's browser, potentially leading to session hijacking, data theft, or website defacement.

🛡️ **Solution:**
I modified the string concatenations/template literals in `script.js` to wrap the `videoId` with `encodeURIComponent(videoId)`. This guarantees that any potentially malicious payload or special character is URL-encoded before being set in the iframe's `src` attribute, ensuring that it is treated strictly as data and neutralizing any chance of script injection.
I also took advantage of the fix to clean up and restore functionality to the Jest test suite, repairing conflicting `module.exports`, fixing redeclaration issues, and making sure that all edge cases execute correctly and safely without breaking any original logic on the Vanilla JS codebase.
🔒 Fix ReDoS Vulnerability in Email Validation

🎯 **What:** The previous email validation regex `^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$` was vulnerable to Regular Expression Denial of Service (ReDoS).

⚠️ **Risk:** A malicious user could submit a specifically crafted string of characters for the email input that causes catastrophic backtracking in the regex engine. This could lock up the browser/server resources and crash the service due to long evaluation times.

🛡️ **Solution:** Replaced the vulnerable regex with the standard, robust HTML5 email regex pattern: `/^[a-zA-Z0-9.!#$%&\'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;`. This standard regex avoids overlapping sequences that cause backtracking while adhering to specifications. Duplicate buggy function removed and tests updated to properly check behavior.
