const express = require('express')
const app = express()
app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static('assets'));
var fs = require('fs');
var data;
fs.readFile('./data.js', 'utf8', function (err, input_data) {
  if (err) throw err;
  data = JSON.parse(input_data);
});

const info = {
    graph_title: 'Catalyst Efficiency',
    parameters: [
        {"name": "dE(O)", value: 1},
        {"name": "dE(CO)", value: 0},
        {"name": "dE(OH)", value: -1},
        {"name": "dE(H)", value: 2},
        {"name": "dE(C)", value: 5},
    ], 
    filters: {
        chem_formula: false,
        adsorbate: false,
        mpid: false,
        miller_top: false,
        coordination: false,
        next_nearest_coord: false,
        neighbor_coord: false,
        fmax: false,
    }
}

var setEquation = () => {
    const equationBase = "dEG =";
    let equation = "";
    for (var i = 0; i < info.parameters.length; i++) {
        let parameter = info.parameters[i];
        let v = parameter.value;
        if (v !== 0) {
            equation += (" ");
            if (v === 1) equation += (" + ");
            else if (v === -1) equation += (" - ");
            if (v > 1) equation += (" + " + v);
            if (v < -1) equation +=(" - " + (-1 * v));
            equation += parameter.name
        }

    }
    if (equation === "") {
        return "No Equation";
    }
    return equationBase + equation.substring(3);
}

var setParameters = query_result => {
    var parameter_name;
    var prev_value;
    var parameter_value;
    for (var i = 0; i < info.parameters.length; i++) {
        parameter_name = info.parameters[i].name;
        prev_value = query_result[parameter_name];
        parameter_value = (typeof(prev_value) === String) ? prev_value : prev_value;
        info.parameters[i].value = prev_value;
    }
}

var setFilters = query_result => {
    info.filters = Object.assign(info.filters, query_result);
}

app.get('/graph*', function(req, res){ 
    if (Object.keys(req.query).length === 0) {} 
    else if (req.query.chem_formula) {
        setFilters(req.query);        
    } else {
        setParameters(req.query);
    }
    info.equation = setEquation()
    res.render('graph', Object.assign(info, {data: data}))
}); 
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})