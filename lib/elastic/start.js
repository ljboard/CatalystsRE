exports.init = elasticStart;

function elasticStart(elasticClient){
  elasticClient.ping({requestTimeout: 1000}, function(error) {
    if(error) { console.log('Elasticsearch cluster is down!');
    } else { console.log('All is well'); }
  });
}
