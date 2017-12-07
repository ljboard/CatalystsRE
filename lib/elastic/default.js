exports.init = elasticDefault;

function elasticDefault(app, elasticClient, callback) {
    elasticClient.search({
        index: 'structures',
        q: '*:*',
        size: 100
    }, function (error, data) {
        if (error) {
            console.log(error);
        } else {
            callback(app, resultsArray(data));
        }
    });
}

function resultsArray(data){
    data = data.hits.hits;
    console.log(data.length);
    let results = [];
    for(let i=0; i < data.length; i++){
        results.push(data[i]["_source"]);
    }
    return results;
}
