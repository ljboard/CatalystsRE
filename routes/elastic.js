const ElasticSearch = require('elasticsearch');
const elasticClient = new ElasticSearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

const getAllRecords = {
  index: 'structures',
  q: '*:*',
  size: 100
};

exports.init = function (app) {
  app.get("/import", importHandler);
  app.get("/db/", queryHandler);

  // Route Handlers
  // --------------

  function importHandler(req, res) {
    require("./lib/elastic/import").init(elasticClient);
    res.send("");
  }

  function queryHandler(req, res) {
    let query = generateQuery(req);
    sendQuery(req, res, query);
  }

  function generateQuery(req) {
    return getAllRecords;
  }

  function sendQuery(req, res, query) {
    elasticClient.search(query, function (error, data) {
      if (error) {
        console.log(error);
      } else {
        successCallback(req, res, app, resultsArray(data));
      }
    });
  }

  function successCallback(req, res, app, data) {
    require('./reGraph.js').reGraph(req, res, app, data);
  }

  function resultsArray(data) {
    data = data.hits.hits;
    console.log(data.length);
    let results = [];
    for (let i = 0; i < data.length; i++) {
      results.push(data[i]["_source"]);
    }
    return results;
  }

};
