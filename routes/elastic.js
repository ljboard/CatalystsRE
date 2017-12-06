const ElasticSearch = require('elasticsearch');
const es_client = new ElasticSearch.Client({host: 'localhost:9200', log: 'trace'});
const getAllRecords = { index: 'structures', q: '*:*'};

exports.init = function(app) {
  app.get("/import", importHandler);
  app.get("/db/", queryHandler);
};

// Route Handlers
// --------------

function importHandler(req, res){
  require('../lib/elastic/mongoDump').init(req, res);
}

function generateQuery(req){
  let query = getAllRecords;
  req = req;
  return query;
}

function queryHandler(req, res){
  if(req.query && req.query.length){
    sendQuery(req, res, getAllRecords);
  }else{
    sendQuery(req, res, generateQuery(req));
  }
}

function sendQuery(req, res, query=getAllRecords) {
  es_client.search(query).then(successCallback, errorCallback);
}

function successCallback(response){
    let hits = response.hits.hits;
    response.render('results', {hits: hits});
    console.log(hits);
}

function errorCallback(err) {
    console.trace(err.message);
}
