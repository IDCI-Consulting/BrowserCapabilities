BrowserCapabilities
===================

This app is used to detect web browser available features. You only need to launch the index.html file with a browser.

To add features to test, edit the index.html file at line 57:

```js
var bc = new BrowserCapabilities([
    ...
    {'name': 'feature_name_goes_here'},
]);
```

Modernizr is used to test features. A complete list of testable features can be found at https://github.com/Modernizr/Modernizr/tree/master/feature-detects.

Example
-------

For example, to detect if a browser enable the geolocation and the 'background-size: cover' css property:

```js
var bc = new BrowserCapabilities([
    {'name': 'geolocation'},
    {'name': 'bgsizecover'}
]);
```
