function BrowserViewport() {}

BrowserViewport.getInfos = function() {
    return [
        { "icon-class": "fa fa-arrows-h", "name": "Largeur du viewport", "value": document.documentElement.clientWidth },
        { "icon-class": "fa fa-arrows-v", "name": "Hauteur du viewport", "value": document.documentElement.clientHeight },
        { "icon-class": "fa fa-arrows-h", "name": "Largeur du viewport visuel", "value": window.innerWidth },
        { "icon-class": "fa fa-arrows-v", "name": "Hauteur du viewport visuel", "value": window.innerHeight }
    ]
}

BrowserViewport.getResultsAsHtmlTable = function() {

    var infos = BrowserViewport.getInfos();

    var createTable = function(infos) {
        var table = document.createElement('table');
        var thead = document.createElement('thead');
        var row = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td1_text = document.createTextNode("Viewport");
        var td2_text = document.createTextNode("Valeur");
        td1.appendChild(td1_text);
        td1.setAttribute('colspan', '2');
        td2.appendChild(td2_text);
        row.appendChild(td1);
        row.appendChild(td2);
        thead.appendChild(row);
        table.appendChild(thead);
        var tbody = document.createElement('tbody');
        table.setAttribute('class', 'table');
        for (i = 0; i < infos.length; i++) {
            var row = addRowToTable(infos[i]);
            tbody.appendChild(row);
        }

        table.appendChild(tbody);

        return table;
    }

    var addRowToTable = function(result) {
        var row = document.createElement('tr');
        var td0 = document.createElement('td');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td1_text = document.createTextNode(result['name']);
        var td2_text = document.createTextNode(result['value']);
        var i = document.createElement('i');
        i.setAttribute('class', result['icon-class']);
        td0.appendChild(i);
        td1.appendChild(td1_text);
        td2.appendChild(td2_text);
        row.appendChild(td0);
        row.appendChild(td1);
        row.appendChild(td2);

        return row;
    }

    return createTable(infos);
}
