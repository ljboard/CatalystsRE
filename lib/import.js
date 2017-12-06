var xhr = new XMLHttpRequest();
var bulkURL = "http://localhost:9200/_bulk";
// var requests = require("./500docs.js").docs;

console.log(JSON.stringify(requests));

// send post request
xhr.open("POST", bulkURL, true);
xhr.setRequestHeader('Content-Type', 'application/x-ndjson');
xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
xhr.send(requests);
