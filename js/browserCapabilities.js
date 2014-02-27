function BrowserCapabilities(features) {
    this.features = features;
    this.results = [];

    if (!window.Modernizr) {
        alert("Modernizr is not loaded");
    } else {
        this.runTest();
    }
}

BrowserCapabilities.prototype.runTest = function() {
    for (i = 0; i < this.features.length; i++) {
        this.results.push({
            'feature': this.features[i]['name'],
            'checked': Modernizr[this.features[i]['name']],
            'demo': this.features[i]['demo']
        });
    }
}

BrowserCapabilities.prototype.getResults = function() {
    return this.results;
}
