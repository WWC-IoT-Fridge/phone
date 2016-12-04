function myEventHandler() {
    "use strict";

    var ua = navigator.userAgent;
    var str;

    if (window.Cordova && dev.isDeviceReady.c_cordova_ready__) {
        str = "It worked! Cordova device ready detected at " + dev.isDeviceReady.c_cordova_ready__ + " milliseconds!";
    } else if (window.intel && intel.xdk && dev.isDeviceReady.d_xdk_ready______) {
        str = "It worked! Intel XDK device ready detected at " + dev.isDeviceReady.d_xdk_ready______ + " milliseconds!";
    } else {
        str = "Bad device ready, or none available because we're running in a browser.";
    }

    console.log(str);
}

function scan() {
    "use strict";
    var fName = "scan():";
    console.log(fName, "entry");
    try {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                //this is our url and token which will be concatenated with the UPC code to retrieve product data
                //we should probably store the token somewhere secret in the future
                const url = `http://www.searchupc.com//handlers/upcsearch.ashx?request_type=3&access_token=3D0B8DB1-8BBA-409A-85B5-9EE3E866FC1D&upc=${result.text}`;
                $.get(url, function(data) { 
                    var parse = JSON.parse(data);
                    alert('Product added to inventory: ' + parse["0"]["productname"]);
                    console.log('Product added to inventory: ', parse["0"]["productname"]);
                });
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
            );
    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}


