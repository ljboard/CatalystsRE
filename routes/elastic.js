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
  app.get("/db", queryHandler);
  app.get("/", queryHandler);

  // Route Handlers
  // --------------

  function importHandler(req, res) {
    require("../lib/elastic/import").init(elasticClient);
    res.send("");
  }

  function queryHandler(req, res) {
    let query = generateQuery(req);
    sendQuery(req, res, query);
  }

  function generateQuery(req) {
    if(req.query){
      // console.log(req.query);
      let query = {
        index: 'structures',
        body: {
          "query": {
            "bool": {
              "must": buildFilters(req)
            }
          },
          size: 100
        }
      };
      return query;
    }
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
    let results = [];
    for (let i = 0; i < data.length; i++) {
      results.push(data[i]["_source"]);
    }
    return results;
  }

  function buildFilters(req){
    let filters = [];
    if (req.query.mpid){
      filters.push({ "match": { "mpid":  req.query.mpid }});
    }
    if (req.query.nextnearestcoordination){
      filters.push({ "match": { "nextnearestcoordination":  req.query.nextnearestcoordination }});
    }
    if (req.query.coordination){
      filters.push({ "match": { "coordination":  req.query.coordination }});
    }
    if (req.query.formula){
      console.log(req.query.formula);
      filters.push({ "match": { "formula":  req.query.formula }});
    }
    if (req.query.catalog){
      filters.push({ "match": { "catalog?":  req.query.catalog }});
    }
    if (req.query.top){
      filters.push({ "match": { "top":  req.query.top }});
    }
    if (req.query.energyLow && req.query.energyHigh){
      filters.push( {"range" : {
        "energy" : {
            "gt" : req.query.energyLow,
            "lt" : req.query.energyHigh
        }
      }});
    }
    if (req.query.energyLow && req.query.energyHigh){
      filters.push( {"range" : {
        "shift" : {
            "gt" : req.query.shiftLow,
            "lt" : req.query.shiftHigh
        }
      }});
    }
    return filters;
}
};
