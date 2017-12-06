const express = require('express');
const morgan = require('morgan');
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));

// require('./routes/structure').init(app);
require('./routes/elastic').init(app);
require('./routes/graph').init(app);

app.listen(3005, function() {
    require('./lib/elastic/start').init();
    console.log('App listening on port 3000');
});
