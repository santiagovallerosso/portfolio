🔒 Fix ReDoS Vulnerability in Email Validation

🎯 **What:** The previous email validation regex `^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$` was vulnerable to Regular Expression Denial of Service (ReDoS).

⚠️ **Risk:** A malicious user could submit a specifically crafted string of characters for the email input that causes catastrophic backtracking in the regex engine. This could lock up the browser/server resources and crash the service due to long evaluation times.

🛡️ **Solution:** Replaced the vulnerable regex with the standard, robust HTML5 email regex pattern: `/^[a-zA-Z0-9.!#$%&\'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;`. This standard regex avoids overlapping sequences that cause backtracking while adhering to specifications. Duplicate buggy function removed and tests updated to properly check behavior.
