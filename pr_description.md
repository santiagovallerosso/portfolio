# 🧪 Add tests for determineActiveSection

## 🎯 What
Added missing unit tests for the `determineActiveSection` utility function in `script.test.js` to ensure the scroll-to-active section calculations logic is reliable and heavily covered. Also dynamically extracts the newly tested function avoiding module export crashes identically to existing code style.

## 📊 Coverage
The new tests cover the following scenarios:
* Function behavior when the `offsets` object is null.
* Function behavior when the `offsets` object is empty.
* Standard happy path ensuring the correct active section is returned based on typical `scrollY` locations using the predefined dynamic offset threshold (100px).
* Ensuring null is appropriately returned when the `scrollY` hasn't breached the threshold of any registered offset values.

## ✨ Result
Improved unit test suite stability and increased test coverage regarding layout manipulation components. All tests seamlessly execute and pass within the native Jest integration via `npm run test`.
