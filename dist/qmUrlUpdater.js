var _key = "tag";

var _trackIdKey = "trackId";
var _trackIdKeyDefault = "trackIdDefault";
var _trackIdKeyCa = "trackId.ca";
var _trackIdKeyDefaultCa = "trackIdDefault.ca";
var _trackIdKeyUk = "trackId.co.uk";
var _trackIdKeyDefaultUk = "trackIdDefault.co.uk";
var _trackIdKeyDe = "trackId.de";
var _trackIdKeyDefaultDe = "trackIdDefault.de";
var _trackIdKeyEs = "trackId.es";
var _trackIdKeyDefaultEs = "trackIdDefault.es";
var _trackIdKeyFr = "trackId.fr";
var _trackIdKeyDefaultFr = "trackIdDefault.fr";
var _trackIdKeyIt = "trackId.it";
var _trackIdKeyDefaultIt = "trackIdDefault.it";
var _trackIdKeyJp = "trackId.co.jp";
var _trackIdKeyDefaultJp = "trackIdDefault.co.jp";
var _trackIdKeyCn = "trackId.cn";
var _trackIdKeyDefaultCn = "trackIdDefault.cn";

// store default tracking id value
localStorage[_trackIdKeyDefault]   = "quant08-20";
localStorage[_trackIdKeyDefaultCa] = "quantimodo-20";
localStorage[_trackIdKeyDefaultUk] = "quantimodo-21";
localStorage[_trackIdKeyDefaultDe] = "quantimodo01-21";
localStorage[_trackIdKeyDefaultEs] = "quantimodo05-21";
localStorage[_trackIdKeyDefaultFr] = "quantimodo0f6-21";
localStorage[_trackIdKeyDefaultIt] = "quantimodo08-21";
localStorage[_trackIdKeyDefaultJp] = "quantimodo05-21";
localStorage[_trackIdKeyDefaultCn] = "quantimodo-20";

//function to remove tag if it exists
function removeTextAfter(url) {
    var url=url.split('?tag')[0];
    var url=url.split('&tag')[0];}


// returns the url with key-value pair added to the parameter string.
function insertParam(url, key, value) {
    if (url.indexOf('redirect.html') != -1) {}
    else {
        var url = url.split('?tag')[0];
        var delimiter = (url.indexOf('?') === -1) ? '?' : '&';
        if (url.indexOf('?tag') != -1)
        {

            var pairset = url.split('&');
            var i = pairset.length;
            var pair;

            key = escape(key);
            value = escape(value);

            while (i--) {
                pair = pairset[i].split('=');

                if (pair[0] == key) {
                    pair[1] = value;
                    pairset[i] = pair.join('=');
                    break;
                }
            }

            if (i < 0) {
                pairset[pairset.length] = [key, value].join('=');
            }


            return pairset.join('&');
        }

        else if ((url.indexOf('ref=dp_iou_view_this_order?') != -1)) {
            url = url + delimiter + [key, value].join('=');
            //console.log("indexOf('ref=dp_iou_view_this_order?') != -1 so returning " + url);
            return url;
        }
        else if ((url.indexOf('ref=sr_') != -1)) {
            url = url + delimiter + [key, value].join('=');
            //console.log("indexOf('ref=sr_') != -1 so returning " + url);
            return url;
        }
        else if ((url.indexOf('ref=') != -1)) {
            url = url + delimiter + [key, value].join('=');
            //console.log("indexOf('ref=') != -1 so returning " + url);
            return url;
        }
        else if ((url.indexOf('&tag') != -1)) {
            url = url.split('&tag')[0];
            url =  url + delimiter + [key, value].join('=');
            //console.log("indexOf('&tag') != -1 so returning " + url);
            return url;
        }
        else {
            url = url + delimiter + [key, value].join('=');
        }
        //console.log("Returning " + url);
        return url;
    }}
chrome.browserAction.onClicked.addListener(
    function(tab) {
        // Open the Amazon deals page
        chrome.tabs.create(
            {
                'url': 'http://www.amazon.com/deals',
                'selected': true
            },
            function(tab) {
                // tab opened, further processing takes place in content.js
            }
        );
    }
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // only for the top-most window (ignore frames)
        if (window == top) {
            var trackId = localStorage[_trackIdKey];

            if (!trackId) {
                trackId = localStorage[_trackIdKeyDefault];
            }
            // if the url does not already contain the tracking id
            if (details.url.search(trackId) == -1 &&
                details.url.search("ap/signin") == -1 &&
                details.url.search("ap/widget") == -1) {
                // redirect them to the url with the new tracking id parameter inserted
                return { redirectUrl: insertParam(details.url, _key, trackId) };
            }
        }
    },
    { urls: ["http://www.amazon.com/*", "https://www.amazon.com/*"] }, // only run for requests to the following urls
    ['blocking']    // blocking permission necessary in order to perform the redirect
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // only for the top-most window (ignore frames)
        if (window == top) {
            var trackId = localStorage[_trackIdKeyCa];

            if (!trackId) {
                trackId = localStorage[_trackIdKeyDefaultCa];
            }
            // if the url does not already contain the tracking id
            if (details.url.search(trackId) == -1 &&
                details.url.search("ap/signin") == -1 &&
                details.url.search("ap/widget") == -1) {
                // redirect them to the url with the new tracking id parameter inserted
                return { redirectUrl: insertParam(details.url, _key, trackId) };
            }
        }
    },
    { urls: ["http://www.amazon.ca/*", "https://www.amazon.ca/*"] }, // only run for requests to the following urls
    ['blocking']    // blocking permission necessary in order to perform the redirect
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // only for the top-most window (ignore frames)
        if (window == top) {
            var trackId = localStorage[_trackIdKeyUk];

            if (!trackId) {
                trackId = localStorage[_trackIdKeyDefaultUk];
            }
            // if the url does not already contain the tracking id
            if (details.url.search(trackId) == -1 &&
                details.url.search("ap/signin") == -1 &&
                details.url.search("ap/widget") == -1) {
                // redirect them to the url with the new tracking id parameter inserted
                return { redirectUrl: insertParam(details.url, _key, trackId) };
            }
        }
    },
    { urls: ["http://www.amazon.co.uk/*", "https://www.amazon.co.uk/*"] }, // only run for requests to the following urls
    ['blocking']    // blocking permission necessary in order to perform the redirect
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // only for the top-most window (ignore frames)
        if (window == top) {
            var trackId = localStorage[_trackIdKeyDe];

            if (!trackId) {
                trackId = localStorage[_trackIdKeyDefaultDe];
            }
            // if the url does not already contain the tracking id
            if (details.url.search(trackId) == -1 &&
                details.url.search("ap/signin") == -1 &&
                details.url.search("ap/widget") == -1) {
                // redirect them to the url with the new tracking id parameter inserted
                return { redirectUrl: insertParam(details.url, _key, trackId) };
            }
        }
    },
    { urls: ["http://www.amazon.de/*", "https://www.amazon.de/*"] }, // only run for requests to the following urls
    ['blocking']    // blocking permission necessary in order to perform the redirect
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // only for the top-most window (ignore frames)
        if (window == top) {
            var trackId = localStorage[_trackIdKeyEs];

            if (!trackId) {
                trackId = localStorage[_trackIdKeyDefaultEs];
            }
            // if the url does not already contain the tracking id
            if (details.url.search(trackId) == -1 &&
                details.url.search("ap/signin") == -1 &&
                details.url.search("ap/widget") == -1) {
                // redirect them to the url with the new tracking id parameter inserted
                return { redirectUrl: insertParam(details.url, _key, trackId) };
            }
        }
    },
    { urls: ["http://www.amazon.es/*", "https://www.amazon.es/*"] }, // only run for requests to the following urls
    ['blocking']    // blocking permission necessary in order to perform the redirect
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // only for the top-most window (ignore frames)
        if (window == top) {
            var trackId = localStorage[_trackIdKeyFr];

            if (!trackId) {
                trackId = localStorage[_trackIdKeyDefaultFr];
            }
            // if the url does not already contain the tracking id
            if (details.url.search(trackId) == -1 &&
                details.url.search("ap/signin") == -1 &&
                details.url.search("ap/widget") == -1) {
                // redirect them to the url with the new tracking id parameter inserted
                return { redirectUrl: insertParam(details.url, _key, trackId) };
            }
        }
    },
    { urls: ["http://www.amazon.fr/*", "https://www.amazon.fr/*"] }, // only run for requests to the following urls
    ['blocking']    // blocking permission necessary in order to perform the redirect
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // only for the top-most window (ignore frames)
        if (window == top) {
            var trackId = localStorage[_trackIdKeyIt];

            if (!trackId) {
                trackId = localStorage[_trackIdKeyDefaultIt];
            }
            // if the url does not already contain the tracking id
            if (details.url.search(trackId) == -1 &&
                details.url.search("ap/signin") == -1 &&
                details.url.search("ap/widget") == -1) {
                // redirect them to the url with the new tracking id parameter inserted
                return { redirectUrl: insertParam(details.url, _key, trackId) };
            }
        }
    },
    { urls: ["http://www.amazon.it/*", "https://www.amazon.it/*"] }, // only run for requests to the following urls
    ['blocking']    // blocking permission necessary in order to perform the redirect
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // only for the top-most window (ignore frames)
        if (window == top) {
            var trackId = localStorage[_trackIdKeyJp];

            if (!trackId) {
                trackId = localStorage[_trackIdKeyDefaultJp];
            }
            // if the url does not already contain the tracking id
            if (details.url.search(trackId) == -1 &&
                details.url.search("ap/signin") == -1 &&
                details.url.search("ap/widget") == -1) {
                // redirect them to the url with the new tracking id parameter inserted
                return { redirectUrl: insertParam(details.url, _key, trackId) };
            }
        }
    },
    { urls: ["http://www.amazon.co.jp/*", "https://www.amazon.co.jp/*"] }, // only run for requests to the following urls
    ['blocking']    // blocking permission necessary in order to perform the redirect
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // only for the top-most window (ignore frames)
        if (window == top) {
            var trackId = localStorage[_trackIdKeyCn];

            if (!trackId) {
                trackId = localStorage[_trackIdKeyDefaultCn];
            }
            // if the url does not already contain the tracking id
            if (details.url.search(trackId) == -1 &&
                details.url.search("ap/signin") == -1 &&
                details.url.search("ap/widget") == -1) {
                // redirect them to the url with the new tracking id parameter inserted
                return { redirectUrl: insertParam(details.url, _key, trackId) };
            }
        }
    },
    { urls: ["http://www.amazon.cn/*", "https://www.amazon.cn/*"] }, // only run for requests to the following urls
    ['blocking']    // blocking permission necessary in order to perform the redirect
);

/* Copyright(c) 2016 Philip Mulcahy. */
/* global window */
/* jshint strict: true, esversion: 6 */

var amazon_order_history_table = (function() {
    "use strict";
    var tableStyle = "border: 1px solid black;";
    var datatable = null;

    /**
     * Add a td to the row tr element, and return the td.
     */
    var addCell = function(row, value) {
        var td = row.ownerDocument.createElement("td");
        td.setAttribute("style", tableStyle);
        row.appendChild(td);
        td.textContent = value;
        return td;
    };

    /**
     * Add a td to the row tr element, and return the td.
     */
    var addElemCell = function(row, elem) {
        var td = row.ownerDocument.createElement("td");
        td.setAttribute("style", tableStyle);
        row.appendChild(td);
        td.appendChild(elem);
        return td;
    };

    /**
     * Add a td to the row tr element, and return the td.
     */
    var addLinkCell = function(row, text, href) {
        var a = row.ownerDocument.createElement("a");
        a.textContent = text;
        a.href = href;
        return addElemCell(row, a);
    };

    var cols = [
        { field_name:"order id",
            type:"func",
            func:function(order, row){
                addLinkCell(
                    row, order.id,
                    amazon_order_history_util.getOrderDetailUrl(order.id));
            },
            is_numeric:false },
        { field_name:"items",
            type:"func",
            func:function(order, row){
                addElemCell(row, order.itemsHtml(document));
            },
            is_numeric:false },
        { field_name:"to", type:"plain", property_name:"who",
            is_numeric:false },
        { field_name:"date", type:"plain", property_name:"date",
            is_numeric:false },
        { field_name:"total", type:"plain", property_name:"total",
            is_numeric:true },
        { field_name:"postage", type:"detail", property_name:"postage",
            is_numeric:true,
            help:"If there are only N/A values in this column, your login session may have partially expired, meaning you (and the extension) cannot fetch order details. Try clicking on one of the order links in the left hand column and then retrying the extension button you clicked to get here."},
        { field_name:"gift", type:"detail", property_name:"gift",
            is_numeric:true },
        { field_name:"vat", type:"detail", property_name:"vat",
            is_numeric:true,
            help:"Caution: when stuff is not supplied by Amazon, then tax is often not listed." },
        { field_name:"payments", type:"payments", property_name:"payments",
            is_numeric:false },
    ];

    function reallyDisplayOrders(orders, beautiful) {
        console.log("amazon_order_history_table.reallyDisplayOrders starting");
        var addOrderTable = function(orders) {
            var addHeader = function(row, value, help) {
                var th = row.ownerDocument.createElement("th");
                th.setAttribute("style", tableStyle);
                row.appendChild(th);
                th.textContent = value;
                if( help ) {
                    th.setAttribute("title", help);
                }
                return th;
            };

            var appendOrderRow = function(table, order) {
                var tr = document.createElement("tr");
                tr.setAttribute("style", tableStyle);
                table.appendChild(tr);
                cols.forEach(function(col_spec){
                    var elem = null;
                    switch(col_spec.type) {
                        case "plain":
                            elem = addCell(tr, order[col_spec.property_name]);
                            break;
                        case "detail":
                            elem = addCell(tr, "pending");
                            order.detail_promise.then(
                                function(detail) {
                                    elem.innerHTML = detail[col_spec.property_name];
                                    if(datatable) {
                                        datatable.rows().invalidate();
                                        datatable.draw();
                                    }
                                }
                            );
                            break;
                        case "payments":
                            elem = addCell(tr, "pending");
                            order.payments_promise.then(
                                function(payments) {
                                    var ul = document.createElement("ul");
                                    payments.forEach(function(payment){
                                        var li = document.createElement("li");
                                        ul.appendChild(li);
                                        var a = document.createElement("a");
                                        li.appendChild(a);
                                        a.textContent = payment + '; ';
                                        a.href = amazon_order_history_util.getOrderPaymentUrl(order.id);
                                    });
                                    elem.textContent = "";
                                    elem.appendChild(ul);
                                    if(datatable) {
                                        datatable.rows().invalidate();
                                        datatable.draw();
                                    }

                                }
                            );
                            break;
                        case "func":
                            col_spec.func(order, tr);
                            break;
                    }
                    if ("help" in col_spec) {
                        elem.setAttribute("title", col_spec.help);
                    }
                });
            };
            var table;
            var thead;
            var hr;
            var tfoot;
            var fr;
            var tbody;
            var isus;
            // remove any old table
            table = document.querySelector('[id="order_table"]');
            if ( table !== null ) {
                console.log("removing old table");
                table.parentNode.removeChild(table);
                console.log("removed old table");
            }
            console.log("adding table");
            table = document.createElement("table");
            console.log("added table");
            document.body.appendChild(table);
            table.setAttribute("id", "order_table");
            table.setAttribute("class", "order_reporter_table stripe compact");
            table.setAttribute("style", tableStyle);

            thead = document.createElement("thead");
            table.appendChild(thead);

            hr = document.createElement("tr");
            thead.appendChild(hr);

            tfoot = document.createElement("tfoot");
            table.appendChild(tfoot);

            fr = document.createElement("tr");
            tfoot.appendChild(fr);

            isus = amazon_order_history_util.getSite().endsWith("\.com");

            cols.forEach(function(col_spec){
                var fieldName = col_spec.field_name;
                if (isus && fieldName === "vat") {
                    col_spec.field_name = "tax";
                }
                if (isus && fieldName === "postage") {
                    col_spec.field_name = "shipping";
                }
                addHeader(hr, col_spec.field_name, col_spec.help);
                addHeader(fr, col_spec.field_name, col_spec.help);
            });

            tbody = document.createElement("tbody");
            table.appendChild(tbody);

            orders.forEach(function(order){
                appendOrderRow(tbody, order);
                console.log("Added row for " + order.id);
            });

            return table;
        };
        amazon_order_history_util.clearHeaders();
        amazon_order_history_util.clearBody();
        var table = addOrderTable(orders);
        if(beautiful) {
            $(document).ready(function() {
                datatable = $("#order_table").DataTable({
                    "bPaginate": true,
                    "lengthMenu": [ [10, 25, 50, 100, -1],
                        [10, 25, 50, 100, "All"] ],
                    "footerCallback": function(row, data, start, end, display) {
                        var api = this.api();
                        // Remove the formatting to get integer data for summation
                        var floatVal = function(i) {
                            if(typeof i === "string") {
                                return i === "N/A" ?
                                    0 : parseFloat(i.replace(/^([£$]|CAD|EUR) */, "")
                                        .replace(/,/, "."));
                            }
                            if(typeof i === "number") { return i; }
                            return 0;
                        };
                        var col_index = 0;
                        cols.forEach(function(col_spec){
                            if(col_spec.is_numeric) {
                                col_spec.sum = api
                                    .column(col_index)
                                    .data()
                                    .reduce(function(a, b) {
                                        return floatVal(a) + floatVal(b);
                                    });
                                col_spec.pageSum = api
                                    .column(col_index, { page: "current" })
                                    .data()
                                    .reduce(function(a, b) {
                                        return floatVal(a) + floatVal(b);
                                    }, 0);

                                $(api.column(col_index).footer()).html(
                                    sprintf("page sum=%s; all=%s",
                                        col_spec.pageSum.toFixed(2),
                                        col_spec.sum.toFixed(2))
                                );
                            }
                            col_index += 1;
                        });
                    }
                });
                amazon_order_history_util.removeButton("data table");
                amazon_order_history_util.addButton(
                    "plain table",
                    function() {
                        console.log("amazon_order_history_table plain table button clicked");
                        displayOrders(orders, false);
                    },
                    "background-color:cornflowerblue; color:white"
                );
            });
        } else {
            amazon_order_history_util.removeButton("plain table");
            amazon_order_history_util.addButton(
                "data table",
                function() {
                    console.log("amazon_order_history_table data table button clicked");
                    displayOrders(orders, true);
                },
                "background-color:cornflowerblue; color:white"
            );
        }

        console.log("amazon_order_history_table.reallyDisplayOrders returning");
        return table;
    }

    function displayOrders(orderPromises, beautiful) {
        console.log("amazon_order_history_table.displayOrders starting");
        return Promise.all(orderPromises).then(
            function(orders) {
                for (var i = 0; i < orders.length; i++) {
                    var order = orders[i];
                    localStorage.measurementQueue.push()

                }
                console.log("amazon_order_history_table.displayOrders then func starting");
                var return_val = reallyDisplayOrders(orders, beautiful);
                console.log("amazon_order_history_table.displayOrders then func returning");
                return return_val;
            }
        );
    }

    return {displayOrders: displayOrders};
})();

(function(window) {
    var re = {
        not_string: /[^s]/,
        number: /[dief]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fiosuxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[\+\-]/
    }

    function sprintf() {
        var key = arguments[0], cache = sprintf.cache
        if (!(cache[key] && cache.hasOwnProperty(key))) {
            cache[key] = sprintf.parse(key)
        }
        return sprintf.format.call(null, cache[key], arguments)
    }

    sprintf.format = function(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, node_type = "", arg, output = [], i, k, match, pad, pad_character, pad_length, is_positive = true, sign = ""
        for (i = 0; i < tree_length; i++) {
            node_type = get_type(parse_tree[i])
            if (node_type === "string") {
                output[output.length] = parse_tree[i]
            }
            else if (node_type === "array") {
                match = parse_tree[i] // convenience purposes only
                if (match[2]) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < match[2].length; k++) {
                        if (!arg.hasOwnProperty(match[2][k])) {
                            throw new Error(sprintf("[sprintf] property '%s' does not exist", match[2][k]))
                        }
                        arg = arg[match[2][k]]
                    }
                }
                else if (match[1]) { // positional argument (explicit)
                    arg = argv[match[1]]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (get_type(arg) == "function") {
                    arg = arg()
                }

                if (re.not_string.test(match[8]) && (get_type(arg) != "number" && isNaN(arg))) {
                    throw new TypeError(sprintf("[sprintf] expecting number but found %s", get_type(arg)))
                }

                if (re.number.test(match[8])) {
                    is_positive = arg >= 0
                }

                switch (match[8]) {
                    case "b":
                        arg = arg.toString(2)
                        break
                    case "c":
                        arg = String.fromCharCode(arg)
                        break
                    case "d":
                    case "i":
                        arg = parseInt(arg, 10)
                        break
                    case "e":
                        arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential()
                        break
                    case "f":
                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg)
                        break
                    case "o":
                        arg = arg.toString(8)
                        break
                    case "s":
                        arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case "u":
                        arg = arg >>> 0
                        break
                    case "x":
                        arg = arg.toString(16)
                        break
                    case "X":
                        arg = arg.toString(16).toUpperCase()
                        break
                }
                if (re.number.test(match[8]) && (!is_positive || match[3])) {
                    sign = is_positive ? "+" : "-"
                    arg = arg.toString().replace(re.sign, "")
                }
                else {
                    sign = ""
                }
                pad_character = match[4] ? match[4] === "0" ? "0" : match[4].charAt(1) : " "
                pad_length = match[6] - (sign + arg).length
                pad = match[6] ? (pad_length > 0 ? str_repeat(pad_character, pad_length) : "") : ""
                output[output.length] = match[5] ? sign + arg + pad : (pad_character === "0" ? sign + pad + arg : pad + sign + arg)
            }
        }
        return output.join("")
    }

    sprintf.cache = {}

    sprintf.parse = function(fmt) {
        var _fmt = fmt, match = [], parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree[parse_tree.length] = match[0]
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree[parse_tree.length] = "%"
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list[field_list.length] = field_match[1]
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== "") {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list[field_list.length] = field_match[1]
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list[field_list.length] = field_match[1]
                            }
                            else {
                                throw new SyntaxError("[sprintf] failed to parse named argument key")
                            }
                        }
                    }
                    else {
                        throw new SyntaxError("[sprintf] failed to parse named argument key")
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported")
                }
                parse_tree[parse_tree.length] = match
            }
            else {
                throw new SyntaxError("[sprintf] unexpected placeholder")
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return parse_tree
    }

    var vsprintf = function(fmt, argv, _argv) {
        _argv = (argv || []).slice(0)
        _argv.splice(0, 0, fmt)
        return sprintf.apply(null, _argv)
    }

    /**
     * helpers
     */
    function get_type(variable) {
        return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase()
    }

    function str_repeat(input, multiplier) {
        return Array(multiplier + 1).join(input)
    }

    /**
     * export to either browser or node.js
     */
    if (typeof exports !== "undefined") {
        exports.sprintf = sprintf
        exports.vsprintf = vsprintf
    }
    else {
        window.sprintf = sprintf
        window.vsprintf = vsprintf

        if (typeof define === "function" && define.amd) {
            define(function() {
                return {
                    sprintf: sprintf,
                    vsprintf: vsprintf
                }
            })
        }
    }
})(typeof window === "undefined" ? this : window);


/* Copyright(c) 2016 Philip Mulcahy. */
/* jshint strict: true, esversion: 6 */
/* global XPathResult */

var amazon_order_history_util = (function(){
    "use strict";
    function getSite() {
        var href = window.location.href;
        var stem = /https:\/\/((www|smile)\.amazon\.[^\/]+)/.exec(href)[1];
        return stem;
    }

    function getOrderDetailUrl(orderId) {
        return "https://" + getSite() + "/gp/your-account/order-details/" +
            "ref=oh_aui_or_o01_?ie=UTF8&orderID=" + orderId;
    }

    function getOrderPaymentUrl(orderId) {
        return orderId.startsWith("D") ?
            //          "https://www.amazon.co.uk/gp/digital/your-account/order-summary.html/ref=oh_aui_dor_o00_?ie=UTF8&orderID=" + orderId :
            "https://" + getSite() + "/gp/digital/your-account/order-summary.html" +
            "?ie=UTF8&orderID=" + orderId + "&print=1&" :
            "https://" + getSite() + "/gp/css/summary/print.html" +
            "/ref=oh_aui_ajax_pi?ie=UTF8&orderID=" + orderId;
    }

    function addButton(name, cb, style) {
        var existing = document.querySelector('[button_name="' + name + '"]');
        if ( existing !== null ) {
            existing.parentNode.removeChild(existing);
        }
        var a = document.createElement("button");
        if(typeof(style) === "undefined") {
            style = "background-color:orange; color:white";
        }
        a.innerText = name;
        a.setAttribute("style", style);
        a.setAttribute("class", "order_reporter_button");
        a.setAttribute("button_name", name);
        a.onclick = cb;
        document.body.insertBefore(
            a,
            document.body.firstChild
        );
    }

    function removeButton(name) {
        var elem = document.querySelector('[button_name="' + name + '"]');
        if ( elem !== null ) {
            elem.parentNode.removeChild(elem);
        }
    }

    function findSingleNodeValue(xpath, doc, elem) {
        return doc.evaluate(
            xpath,
            elem,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;
    }

    function findMultipleNodeValues(xpath, doc, elem) {
        var snapshot;
        try {
            snapshot = doc.evaluate(
                xpath,
                elem,
                null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null
            );
        } catch(err) {
            log(
                "Error: maybe you\"re not logged into " +
                "https://" + getSite() + "/gp/css/order-history " +
                err
            );
            return [];
        }
        var values = [];
        var i;
        for(i = 0; i !== snapshot.snapshotLength; i += 1) {
            values.push(snapshot.snapshotItem(i));
        }
        return values;
    }

    function clearHeaders() {
        while(document.head.firstChild) {
            document.head.removeChild(document.head.firstChild);
        }
    }

    function clearBody() {
        Array.from(document.body.children).forEach(
            function(elem) {
                if( !(
                        elem.hasAttribute("class") &&
                        elem.getAttribute("class").includes("order_reporter_")
                    )) {
                    document.body.removeChild(elem);
                }
            }
        );
    }

    return {
        addButton: addButton,
        clearBody: clearBody,
        clearHeaders: clearHeaders,
        findMultipleNodeValues: findMultipleNodeValues,
        findSingleNodeValue: findSingleNodeValue,
        getOrderDetailUrl: getOrderDetailUrl,
        getOrderPaymentUrl: getOrderPaymentUrl,
        getSite: getSite,
        removeButton: removeButton
    };
})();


/* Copyright(c) 2016 Philip Mulcahy. */
/* jshint strict: true, esversion: 6 */

// Uses code from http://eloquentjavascript.net/1st_edition/appendix2.html

var amazon_order_history_request_scheduler = (function() {
    "use strict";

    class BinaryHeap {
        constructor(scoreFunction) {
            this.content = [];
            this.scoreFunction = scoreFunction;
        }

        push(element) {
            // Add the new element to the end of the array.
            this.content.push(element);
            // Allow it to bubble up.
            this.bubbleUp(this.content.length - 1);
        }

        pop() {
            // Store the first element so we can return it later.
            var result = this.content[0];
            // Get the element at the end of the array.
            var end = this.content.pop();
            // If there are any elements left, put the end element at the
            // start, and let it sink down.
            if (this.content.length > 0) {
                this.content[0] = end;
                this.sinkDown(0);
            }
            return result;
        }

        remove(node) {
            var length = this.content.length;
            // To remove a value, we must search through the array to find
            // it.
            for (var i = 0; i < length; i++) {
                if (this.content[i] != node) continue;
                // When it is found, the process seen in 'pop' is repeated
                // to fill up the hole.
                var end = this.content.pop();
                // If the element we popped was the one we needed to remove,
                // we're done.
                if (i == length - 1) break;
                // Otherwise, we replace the removed element with the popped
                // one, and allow it to float up or sink down as appropriate.
                this.content[i] = end;
                this.bubbleUp(i);
                this.sinkDown(i);
                break;
            }
        }

        size() {
            return this.content.length;
        }

        bubbleUp(n) {
            // Fetch the element that has to be moved.
            var element = this.content[n], score = this.scoreFunction(element);
            // When at 0, an element can not go up any further.
            while (n > 0) {
                // Compute the parent element's index, and fetch it.
                var parentN = Math.floor((n + 1) / 2) - 1,
                    parent = this.content[parentN];
                // If the parent has a lesser score, things are in order and we
                // are done.
                if (score >= this.scoreFunction(parent))
                    break;

                // Otherwise, swap the parent with the current element and
                // continue.
                this.content[parentN] = element;
                this.content[n] = parent;
                n = parentN;
            }
        }

        sinkDown(n) {
            // Look up the target element and its score.
            var length = this.content.length;
            var element = this.content[n];
            var elemScore = this.scoreFunction(element);

            while(true) {
                // Compute the indices of the child elements.
                var child2N = (n + 1) * 2, child1N = child2N - 1;
                // This is used to store the new position of the element,
                // if any.
                var swap = null;
                var child1Score = null;
                // If the first child exists (is inside the array)...
                if (child1N < length) {
                    // Look it up and compute its score.
                    var child1 = this.content[child1N];
                    child1Score = this.scoreFunction(child1);
                    // If the score is less than our element's, we need to swap.
                    if (child1Score < elemScore)
                        swap = child1N;
                }
                // Do the same checks for the other child.
                if (child2N < length) {
                    var child2 = this.content[child2N];
                    var child2Score = this.scoreFunction(child2);
                    if (child2Score < (swap == null ? elemScore : child1Score))
                        swap = child2N;
                }

                // No need to swap further, we are done.
                if (swap == null) break;

                // Otherwise, swap and continue.
                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            }
        }
    }

    class RequestScheduler {
        constructor() {
            // chrome allows 6 requests per domain at the same time.
            this.CONCURRENCY = 6;  // Chrome allows 6 connections per server.
            this.queue = new BinaryHeap(function(item){ return item.priority; });
            this.running_count = 0;
            this.completed_count = 0;
            this.error_count = 0;
            this.execute = function(query, callback) {
                console.log(
                    "Executing " + query +
                    " with queue size " + this.queue.size());
                var req = new XMLHttpRequest();
                req.open("GET", query, true);
                req.onerror = function() {
                    this.running_count -= 1;
                    this.error_count += 1;
                    console.log(
                        "Unknown error fetching " + query);
                };
                req.onload = function(evt) {
                    this.running_count -= 1;
                    if ( req.status != 200 ) {
                        this.error_count += 1;
                        console.log(
                            "Got HTTP" + req.status + " fetching " + query);
                        return;
                    }
                    this.completed_count += 1;
                    console.log(
                        "Finished " + query +
                        " with queue size " + this.queue.size());
                    while (this.running_count < this.CONCURRENCY &&
                        this.queue.size() > 0
                        ) {
                        var task = this.queue.pop();
                        this.execute(task.query, task.callback);
                    }
                    callback(evt);
                }.bind(this);
                this.running_count += 1;
                req.send();
                this.updateProgress();
            };
            this.statistics = function() {
                return {
                    "queued" : this.queue.size(),
                    "running" : this.running_count,
                    "completed" : this.completed_count,
                    "errors" : this.error_count
                };
            };
            this.updateProgress = function() {
                var target = document.getElementById("order_reporter_progress");
                if (target != null) {
                    target.textContent = Object.entries(this.statistics())
                        .map(([k,v]) => {return k + ":" + v;})
                .join("; ");
                }
                setTimeout(function() { this.updateProgress(); }.bind(this), 2000);
            };
            this.updateProgress();
        }

        schedule(query, callback, priority) {
            console.log(
                "Scheduling " + query + " with " + this.queue.size());
            if (this.running_count < this.CONCURRENCY) {
                this.execute(query, callback);
            } else {
                this.queue.push({
                    "query": query,
                    "callback": callback,
                    "priority": priority
                });
            }
        }
    }

    return {
        create: function() {
            return new RequestScheduler();
        }
    };
})();


/* Copyright(c) 2016 Philip Mulcahy. */
/* global window */
/* jshint strict: true, esversion: 6 */

var amazon_order_history_inject = (function() {
    "use strict";

    var request_scheduler = amazon_order_history_request_scheduler.create();

    function getYears(){
        if(typeof(getYears.years) === "undefined") {
            var snapshot = amazon_order_history_util.findMultipleNodeValues(
                "//select[@name=\"orderFilter\"]/option[@value]",
                document,
                document);
            getYears.years = snapshot.map(
                function(elem){
                    return elem.textContent
                        .replace("nel", "")  // amazon.it
                        .trim();
                }
            ).filter(
                function(element, index, array) {
                    return(/^\d+$/).test(element);
                }
            );
        }
        return getYears.years;
    }

    function fetchAndShowOrders(years) {
        return amazon_order_history_order.getOrdersByYear(
            years, request_scheduler
        ).then(
            function(orderPromises) {
                amazon_order_history_table.displayOrders(orderPromises, true);
                return document.querySelector("[id=\"order_table\"]");
            }
        );
    }

    function addYearButtons() {
        var years = getYears();
        if(years.length > 0) {
            amazon_order_history_util.addButton(
                "All years",
                function() {
                    fetchAndShowOrders(years);
                }
            );
        }
        years.forEach(
            function(year) {
                amazon_order_history_util.addButton(
                    [year],
                    function() {
                        fetchAndShowOrders([year]);
                    }
                );
            }
        );
    }

    function addInfoPoints() {
        var progress = document.createElement("div");
        progress.setAttribute("id", "order_reporter_progress");
        progress.setAttribute("class", "order_reporter_progress");
        progress.setAttribute(
            "style", "position:absolute; top:0; right:0; color:orange; padding:0.2em; font-size:75%");
        document.body.insertBefore(
            progress,
            document.body.firstChild
        );
    }

    addYearButtons();
    addInfoPoints();
    console.log("Starting");
})();

/* Copyright(c) 2016 Philip Mulcahy. */
/* jshint strict: true, esversion: 6 */

var amazon_order_history_order = (function() {
    "use strict";

    function getField(xpath, doc, elem) {
        var valueElem = amazon_order_history_util.findSingleNodeValue(xpath, doc, elem);
        try {
            return valueElem.textContent.trim();
        } catch (_) {
            return "?";
        }
    }

    class Order {
        constructor(ordersPageElem, request_scheduler) {
            this.id = null;
            this.date = null;
            this.total = null;
            this.who = null;
            this.detail_promise = null;
            this.items = null;
            this.request_scheduler = request_scheduler;
            this.extractOrder(ordersPageElem);
        }

        extractOrder(elem) {
            var getItems = function(elem) {
                /*
                  <a class="a-link-normal" href="/gp/product/B01NAE8AW4/ref=oh_aui_d_detailpage_o01_?ie=UTF8&amp;psc=1">
                      The Rise and Fall of D.O.D.O.
                  </a>
                  or
                  <a class="a-link-normal" href="/gp/product/B06X9BZNDM/ref=oh_aui_d_detailpage_o00_?ie=UTF8&amp;psc=1">
                      Provenance
                  </a>
                  but a-link-normal is more common than this, so we need to match on gp/product
                  like this: .//div[@class="a-row"]/a[@class="a-link-normal"][contains(@href,"/gp/product/")]
                  then we get:
                      name from contained text
                      link from href attribute
                      item: not sure what we use this for - will it still work?
                */
                var itemResult = amazon_order_history_util.findMultipleNodeValues(
                    ".//div[@class=\"a-row\"]/a[@class=\"a-link-normal\"][contains(@href,\"/gp/product/\")]",
                    elem.ownerDocument,
                    elem);
                var items = {};
                itemResult.forEach(
                    function(item){
                        var name = item.innerText.replace(/[\n\r]/g, " ")
                            .replace(/  */g, " ")
                            .trim();
                        var link = item.getAttribute("href");
                        items[name] = link;
                    }
                );
                return items;
            };
            var doc = elem.ownerDocument;
            this.date = getField(".//div[contains(span,\"Order placed\")]" +
                "/../div/span[contains(@class,\"value\")]", doc, elem);
            this.total = getField(".//div[contains(span,\"Total\")]" +
                "/../div/span[contains(@class,\"value\")]", doc, elem);
            this.who = getField(".//div[contains(@class,\"recipient\")]" +
                "//span[@class=\"trigger-text\"]", doc, elem);
            if (this.who === "?") {
                this.who = "N/A";
            }
            this.id = getField(".//div[contains(@class,\"a-row\")]" +
                "[span[contains(@class,\"label\")]]" +
                "[span[contains(@class,\"value\")]]" +
                "[contains(span,\"Order #\")]" +
                "/span[contains(@class,\"value\")]", doc, elem);
            this.items = getItems(elem);
            this.detail_promise = new Promise(
                function(resolve, reject) {
                    var query = amazon_order_history_util.getOrderDetailUrl(this.id);
                    var evt_callback = function(evt) {
                        var parser = new DOMParser();
                        var doc = parser.parseFromString(
                            evt.target.responseText, "text/html"
                        );
                        var gift = function(){
                            var a = getField(
                                "//div[contains(@id,\"od-subtotals\")]//" +
                                "span[contains(text(),\"Gift\")]/" +
                                "parent::div/following-sibling::div/span",
                                doc,
                                doc.documentElement
                            );
                            var b;
                            if( a !== "?") {
                                return a.replace('-', '');
                            }
                            a = getField(
                                "//*[text()[contains(.,\"Gift Certificate\")]]",
                                doc,
                                doc.documentElement
                            );
                            if( a !== null ) {
                                b = a.match(
                                    /Gift Certificate.Card Amount: *([$£€0-9.]*)/);
                                if( b !== null ) {
                                    return b[1];
                                }
                            }
                            a = getField(
                                "//*[text()[contains(.,\"Gift Card\")]]",
                                doc,
                                doc.documentElement
                            );
                            if( a !== null ) {
                                b = a.match(
                                    /Gift Card Amount: *([$£€0-9.]*)/);
                                if( b !== null ) {
                                    return b[1];
                                }
                            }
                            return "N/A";
                        }.bind(this);
                        var postage = function() {
                            var a = getField(
                                "//div[contains(@id,\"od-subtotals\")]//" +
                                "span[contains(text(),\"Postage\")]/" +
                                "parent::div/following-sibling::div/span",
                                doc,
                                doc.documentElement
                            );
                            if (a !== "?") {
                                return a;
                            }
                            a = getField(
                                "//div[contains(@id,\"od-subtotals\")]//" +
                                "span[contains(text(),\"Shipping\")]/" +
                                "parent::div/following-sibling::div/span",
                                doc,
                                doc.documentElement
                            );
                            if (a !== "?") {
                                return a;
                            }
                            return "N/A";
                        }.bind(this);
                        var vat = function(){
                            var a = getField(
                                "//div[contains(@id,\"od-subtotals\")]//" +
                                "span[contains(text(),\"VAT\") and not(contains(.,\"Before\"))]/" +
                                "parent::div/following-sibling::div/span",
                                doc,
                                doc.documentElement
                            );
                            if( a !== "?") {
                                return a;
                            }
                            a = getField(
                                "//div[contains(@id,\"od-subtotals\")]//" +
                                "span[contains(text(),\"tax\") and not(contains(.,\"before\"))]/" +
                                "parent::div/following-sibling::div/span",
                                doc,
                                doc.documentElement
                            );
                            if( a !== "?") {
                                return a;
                            }
                            a = getField(
                                "//*[text()[contains(.,\"VAT\") and not(contains(.,\"Before\"))]]",
                                doc,
                                doc.documentElement
                            );
                            if( a !== null ) {
                                var b = a.match(
                                    /VAT: *([-$£€0-9.]*)/);
                                if( b !== null ) {
                                    return b[1];
                                }
                            }
                            a = getField(
                                "//div[contains(@class,\"a-row pmts-summary-preview-single-item-amount\")]//span[contains(text(),\"VAT\")]/parent::div/following-sibling::div/span",
                                doc,
                                doc.documentElement);
                            if( a !== null ) {
                                var c = a.match(
                                    /VAT: *([-$£€0-9.]*)/);
                                if( c !== null ) {
                                    return c[1];
                                }
                            }
                            return "N/A";
                        }.bind(this);
                        resolve({
                            postage: postage(),
                            gift: gift(),
                            vat: vat()
                        });
                    }.bind(this);
                    this.request_scheduler.schedule(
                        query,
                        evt_callback,
                        this.id
                    );
                }.bind(this)
            );
            this.payments_promise = new Promise(
                function(resolve, reject) {
                    if (this.id.startsWith("D")) {
                        resolve([ this.date + ": " + this.total]);
                    } else {
                        var query = amazon_order_history_util.getOrderPaymentUrl(this.id);
                        var evt_callback = function(evt) {
                            var parser = new DOMParser();
                            var doc = parser.parseFromString(
                                evt.target.responseText, "text/html"
                            );
                            var payments = amazon_order_history_util.findMultipleNodeValues(
                                "//b[contains(text(),\"Credit Card transactions\")]/" +
                                "../../..//td[contains(text(),\":\")]/..",
                                doc,
                                doc
                            ).map(function(row){
                                return row.textContent
                                    .replace(/[\n\r]/g, " ")
                                    .replace(/  */g, "\xa0")  //&nbsp;
                                    .trim();
                            });
                            resolve(payments);
                        }.bind(this);
                        this.request_scheduler.schedule(
                            query,
                            evt_callback,
                            this.id
                        );
                    }
                }.bind(this)
            );
        }

        /**
         * Creates an html element suitable for embedding into a table cell
         * but doesn't actually embed it.
         * @param {document} doc. DOM document needed to create elements.
         */
        itemsHtml(doc) {
            var title;
            var ul = doc.createElement("ul");
            var li;
            var a;
            for(title in this.items) {
                if(this.items.hasOwnProperty(title)) {
                    li = doc.createElement("li");
                    ul.appendChild(li);
                    a = doc.createElement("a");
                    li.appendChild(a);
                    a.textContent = title + '; ';
                    a.href = this.items[title];
                }
            }
            return ul;
        }
    }

    class YearFetcher {
        constructor(year, request_scheduler) {
            this.year = year;
            this.expected_order_count = null;
            this.order_found_callback = null;
            this.query_string_templates = {
                "www.amazon.co.uk": "https://%(site)s/gp/css/order-history" +
                "?opt=ab&digitalOrders=1" +
                "&unifiedOrders=1" +
                "&returnTo=" +
                "&orderFilter=year-%(year)s" +
                "&startIndex=%(startOrderPos)s",
                "smile.amazon.co.uk": "https://%(site)s/gp/css/order-history" +
                "?opt=ab&digitalOrders=1" +
                "&unifiedOrders=1" +
                "&returnTo=" +
                "&orderFilter=year-%(year)s" +
                "&startIndex=%(startOrderPos)s",
                "www.amazon.de": "https://%(site)s/gp/css/order-history" +
                "?opt=ab&digitalOrders=1" +
                "&unifiedOrders=1" +
                "&returnTo=" +
                "&orderFilter=year-%(year)s" +
                "&startIndex=%(startOrderPos)s" +
                "&language=en_GB",
                "www.amazon.it": "https://%(site)s/gp/css/order-history" +
                "?opt=ab&digitalOrders=1" +
                "&unifiedOrders=1" +
                "&returnTo=" +
                "&orderFilter=year-%(year)s" +
                "&startIndex=%(startOrderPos)s" +
                "&language=en_GB",
                "smile.amazon.ca": "https://%(site)s/gp/css/order-history" +
                "?opt=ab&digitalOrders=1&" +
                "&unifiedOrders=1" +
                "&returnTo=" +
                "&orderFilter=year-%(year)s" +
                "&startIndex=%(startOrderPos)s",
                "www.amazon.ca": "https://%(site)s/gp/css/order-history" +
                "?opt=ab&digitalOrders=1&" +
                "&unifiedOrders=1" +
                "&returnTo=" +
                "&orderFilter=year-%(year)s" +
                "&startIndex=%(startOrderPos)s",
                "smile.amazon.fr": "https://%(site)s/gp/css/order-history" +
                "?opt=ab&digitalOrders=1&" +
                "&unifiedOrders=1" +
                "&returnTo=" +
                "&orderFilter=year-%(year)s" +
                "&startIndex=%(startOrderPos)s",
                "smile.amazon.com": "https://%(site)s/gp/css/order-history" +
                "?opt=ab&digitalOrders=1&" +
                "&unifiedOrders=1" +
                "&returnTo=" +
                "&orderFilter=year-%(year)s" +
                "&startIndex=%(startOrderPos)s",
                "www.amazon.com": "https://%(site)s/gp/your-account/order-history" +
                "?ie=UTF8" +
                "&orderFilter=year-%(year)s" +
                "&startIndex=%(startOrderPos)s" +
                "&unifiedOrders=1"
            };
            this.orderPromises = [];
            this.sendGetOrderCount = function() {
                request_scheduler.schedule(
                    this.generateQueryString(0),
                    this.receiveGetOrderCount.bind(this),
                    "00000"
                );
            };
            this.generateQueryString = function(startOrderPos) {
                var template = this.query_string_templates[amazon_order_history_util.getSite()];
                return sprintf(
                    template,
                    {
                        site: amazon_order_history_util.getSite(),
                        year: this.year,
                        startOrderPos: startOrderPos
                    }
                );
            };
            this.receiveGetOrderCount = function(evt) {
                var iorder;
                var p = new DOMParser();
                var d = p.parseFromString(evt.target.responseText, "text/html");
                var countSpan = amazon_order_history_util.findSingleNodeValue(
                    ".//span[@class=\"num-orders\"]", d, d);
                this.expected_order_count = parseInt(
                    countSpan.textContent.split(" ")[0], 10);
                console.log(
                    "Found " + this.expected_order_count + " orders for " + this.year
                );
                this.unfetched_count = this.expected_order_count;
                if(isNaN(this.unfetched_count)) {
                    console.warn(
                        "Error: cannot find order count in " + countSpan.textContent
                    );
                    this.unfetched_count = 0;
                }
                // Request second and subsequent pages.
                for(iorder = 10; iorder < this.expected_order_count; iorder += 10) {
                    request_scheduler.schedule(
                        this.generateQueryString(iorder),
                        this.receiveOrdersPage.bind(this),
                        "2"
                    );
                }
                // We already have the first page.
                this.receiveOrdersPage(evt);
            };
            this.receiveOrdersPage = function(evt) {
                var p = new DOMParser();
                var d = p.parseFromString(evt.target.responseText, "text/html");
                var orders;
                var ordersElem;
                var elem;
                var i;
                try {
                    ordersElem = d.getElementById("ordersContainer");
                } catch(err) {
                    console.warn(
                        "Error: maybe you\"re not logged into " +
                        "https://" + amazon_order_history_util.getSite() + "/gp/css/order-history " +
                        err
                    );
                    return;
                }
                orders = amazon_order_history_util.findMultipleNodeValues(
                    ".//*[contains(concat(\" \", " +
                    "normalize-space(@class), " +
                    "\" \"), " +
                    "\" order \")]",
                    d,
                    ordersElem
                );
                function makeOrderPromise(elem) {
                    return new Promise(
                        function(resolve, reject) {
                            resolve(
                                amazon_order_history_order.create(elem, request_scheduler)
                            );
                        }
                    );
                }
                orders.forEach(
                    function(elem){
                        this.order_found_callback(
                            makeOrderPromise(elem)
                        );
                    }.bind(this)
                );
            };

            /* Promise to array of Order Promise. */
            this.ordersPromise = new Promise(
                function(resolve, reject) {
                    this.order_found_callback = function(orderPromise) {
                        this.orderPromises.push(orderPromise);
                        orderPromise.then(
                            function(order) {
                                // TODO is "Fetching" the right message for this stage?
                                console.log("amazon_order_history_order Fetching " + order.id);
                            }
                        );
                        console.log(
                            "YearFetcher orderPromises.length:" +
                            this.orderPromises.length +
                            " expected_order_count:" +
                            this.expected_order_count
                        );
                        if(this.orderPromises.length === this.expected_order_count) {
                            resolve(this.orderPromises);
                        }
                    };
                    this.sendGetOrderCount();
                }.bind(this)
            );
        }
    }

    /* Returns array of Order Promise */
    function getOrdersByYear(years, request_scheduler) {
        // At return time we may not know how many orders there are, only
        // how many years in which orders have been queried for.
        return new Promise(
            (resolve, reject) => {
            Promise.all(
            years.map(
                function(year) {
                    return new YearFetcher(year, request_scheduler).ordersPromise;
                }
            )
        ).then(
            function(arrayOfArrayOfOrderPromise) {
                // Flatten the array of arrays of Promise<Order> into
                // an array of Promise<Order>.
                var orderPromises = [].concat.apply(
                    [],
                    arrayOfArrayOfOrderPromise
                );
                resolve(orderPromises);
            }
        );
    }
    );
    }


    return {
        create: function(ordersPageElem, request_scheduler) {
            return new Order(ordersPageElem, request_scheduler);
        },
        // Return Array of Order Promise.
        getOrdersByYear: getOrdersByYear
    };
})();

/* Copyright(c) 2017 Philip Mulcahy. */
/* jshint strict: true, esversion: 6 */

var amazon_order_history_csv = (function(){
    "use strict";

    function download(table) {
        var tableToArrayOfArrays = function(table) {
            var rows = table.rows;
            var result = [];
            for(var i=0; i<rows.length; ++i) {
                var cells = rows[i].cells;
                var cell_array = [];
                for(var j=0; j<cells.length; ++j) {
                    cell_array.push(cells[j].textContent);
                }
                result.push(cell_array);
            }
            return result;
        };
        var processRow = function(row) {
            var processCell = function (cell) {
                if (cell === null) {
                    return '';
                }
                var processed = cell.replace(/"/g, '""');
                if (processed.search(/("|,|\n)/g) >= 0) {
                    processed = '"' + processed + '"';
                }
                return processed;
            };
            return row.map(processCell).join(',');
        };
        var csvFile = tableToArrayOfArrays(table).map(processRow).join('\n');
        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        var link = document.createElement("a");
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", 'amazon_order_history.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return {
        download: download
    };
})();
