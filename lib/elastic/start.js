function es_start(){

    var ElasticSearch = require('elasticsearch');
    var client = new ElasticSearch.Client({
      host: 'localhost:9200',
      log: 'trace'
    });

    client.ping({requestTimeout: 1000},
      function (error) {
        if (error) {
          console.trace('elasticsearch cluster is down!');
        } else {
          console.log('All is well');
        }
      }
    );

    var actionlist = require("./import").requests;

    // client.bulk({body: actionlist },
    // function (error, response) {
    //     if (error){
    //       console.log("search error: "+error)
    //     }
    //     else {
    //       console.log("--- Response ---");
    //       console.log(response);

    //       });
    //     }
    // });



    client.deleteByQuery({
      index: 'structures',
      q: '*'
    }, function (error, response) {
      if (error){
        console.log("search error: "+error);
      } else {
        console.log("--- Response ---");
        console.log(response);
      }});


}

exports.init = es_start;
