var Structure = require('../models/structure');
var Graph = require('../models/graph');
var ElasticSearch = require('elasticsearch');
var es_client = new ElasticSearch.Client({host: 'localhost:9200', log: 'trace'});

exports.init = function(app) {
    app.get("/db/:query?/", queryHandler);
    app.get("/db/import/:mongoPath", mongoDump);
};

// Route Handlers
// --------------

function queryHandler(req, res){
  if(req.params.query && req.params.query.length){
    sendQuery(req, res);
  }else{
    sendQuery(req, res, true);
  }
}

function sendQuery(req, res, index=false) {
  let query = !index ? generateQuery(req) : { index: 'structures', q: '*:*'};
  es_client.search(query).then(
    function (response) {
      var hits = response.hits.hits;
      res.render('results', {hits: hits});
      console.log(hits);
    },
    function (err) {
      console.trace(err.message);
    }
  );
}

function generateQuery(req){
  let query = { index: 'structures', body: {} };
  return query;
}

function mongoDump(req, res){
  require('../lib/elastic/mongoDump').init(req, res);
}
