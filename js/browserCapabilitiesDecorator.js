/* BrowserCapabilitiesHtmlTableDecorator */

function BrowserCapabilitiesHtmlTableDecorator(browserCapabilities) {
    this.browser = browserCapabilities;
}

BrowserCapabilitiesHtmlTableDecorator.prototype.getResults = function() {

    var createTable = function(results) {
        var table = document.createElement('table');
        var thead = document.createElement('thead');
        var row = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td1_text = document.createTextNode("Feature");
        var td2_text = document.createTextNode("Check");
        td1.appendChild(td1_text);
        td2.appendChild(td2_text);
        row.appendChild(td1);
        row.appendChild(td2);
        thead.appendChild(row);
        table.appendChild(thead);
        var tbody = document.createElement('tbody');
        table.setAttribute('class', 'table');
        for (i = 0; i < results.length; i++) {
            var row = addRowToTable(results[i]);
            tbody.appendChild(row);
        }

        table.appendChild(tbody);

        return table;
    }

    var addRowToTable = function(result) {
        var row = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td1_text = document.createTextNode(result['feature']);
        var td2_content = document.createElement('i');
        if (result['checked']) {
            td2_content.setAttribute('class', 'fa fa-check');
        } else {
            td2_content.setAttribute('class', 'fa fa-times');
        }
        
        
        td1.appendChild(td1_text);
        td2.appendChild(td2_content);
        row.appendChild(td1);
        row.appendChild(td2);

        return row;
    }

    results = this.browser.getResults();

    return createTable(results);
}

/* BrowserCapabilitiesHtmlListDecorator */

function BrowserCapabilitiesHtmlListDecorator(browserCapabilities) {
    this.browser = browserCapabilities;
}

BrowserCapabilitiesHtmlListDecorator.prototype.getResults = function() {

    var createList = function(results) {
        var ul = document.createElement('ul');
        for (i = 0; i < results.length; i++) {
            var li = addElementToList(results[i]);
            ul.appendChild(li);
        }
        ul.setAttribute('data-role', 'listview');
        ul.setAttribute('data-inset', 'true');
        ul.setAttribute('data-filter', 'true');

        return ul;
    }

    var addElementToList = function(result) {
        var li = document.createElement('li');
        var i = document.createElement('i');
        if (result['checked']) {
            i.setAttribute('class', 'fa fa-check');
        } else {
            i.setAttribute('class', 'fa fa-times');
        }
        var text =  document.createTextNode(result['feature']+' ');
        li.appendChild(text);
        li.appendChild(i);

        return li;
    }

    results = this.browser.getResults();

    return createList(results);
}



