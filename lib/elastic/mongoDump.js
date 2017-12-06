// Includes
var MongoClient = require('mongodb').MongoClient,
    f = require('util').format,
    assert = require('assert');

function mongoDump(req, res){
    let host = 'localhost',//'coe.psc.edu',
        port = '30000',
        db = encodeURIComponent('vasp_zu_vaspsurfaces'),
        user = encodeURIComponent('admin_zu_vaspsurfaces'),
        password = encodeURIComponent('$TPAHPmj'),
        authMechanism = 'DEFAULT';

    // Connection URL
    let url = f('mongodb://%s:%s@%s:%s/%s?authMechanism=%s', user, password, host, port, db, authMechanism);

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to Mongo Server");
        getDocs(db, res);
    });
}

function getDocs(db, res) {
    let collection = db.collection('adsorption');
    collection.find({}).limit(500).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      elasticTransfer(docs, res);
    });
}

function elasticTransfer(docs, res){
    let ElasticSearch = require('elasticsearch');
    let ElasticClient = new ElasticSearch.Client({host: 'localhost:9200', log: 'trace'});
    let actionList = [];

    for(let i=0;i<docs.length;i++){
        let action = { index:  { _index: 'structures', _type: 'structure' } };
        actionList.push(action);
        actionList.push(docs[i]);
    }

    ElasticClient.bulk({ body: actionList },
        function (error, response) {
            res.render('mongo', {mongoPath: "hello", response: docs});
        });
}

exports.init = mongoDump;
