exports.init = elasticImport;

function elasticImport() {
    const elasticsearch = require('elasticsearch');
    const elasticClient = new elasticsearch.Client({ host: 'localhost:9200', log: 'error'});
    const fs = require('fs');
    let actionList;

    fs.readFile('./lib/etc/data3.json', 'utf8', function (err, input_data) {
        if (err) {
            throw err;
        }
        actionList = JSON.parse(input_data);
        elasticClient.bulk({ body: actionList },
            function (error, response) {
                if (error) {
                    console.trace('Elasticsearch cluster erred on import');
                } else {
                    console.log("Finished importing");
                    console.log(response);
                }
            });
    });
}
