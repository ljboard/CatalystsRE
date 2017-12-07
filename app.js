// Express
// -------

const express = require('express');
const morgan = require('morgan');
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));

// ElasticSearch
// -------------

const elasticsearch = require('elasticsearch');
const elasticClient = new elasticsearch.Client({ host: 'localhost:9200', log: 'error'});

// Routes
// ------

require('./routes/elastic').init(app);

// Start Application
// -----------------

app.listen(3005, function() {
    require('./lib/elastic/default').init(app, elasticClient, function(app, data){ require('./routes/graph.js').init(app, data);});
    require("./lib/elastic/start").init(elasticClient);
    console.log('App listening on port 3000');
});
