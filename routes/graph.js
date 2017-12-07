exports.init = function(app) {
    const fs = require('fs');
    let data;

    fs.readFile('./lib/etc/data3.json', 'utf8', function (err, input_data) {
        if (err) {throw err;}
        data = JSON.parse(input_data);
      });

    const info = {
        graph_title: 'Catalyst Efficiency',
        parameters: [
            {"name": "dE(O)", value: 0},
            {"name": "dE(CO)", value: 1},
            {"name": "dE(OH)", value: 0},
            {"name": "dE(H)", value: 0},
            {"name": "dE(C)", value: 0},
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
    };

    const setEquation = () => {
        const equationBase = "dEG =";
        let equation = "";
        for (let i = 0; i < info.parameters.length; i++) {
            let parameter = info.parameters[i];
            let v = parameter.value;
            if (v !== 0) {
                equation += (" ");
                if (v === 1) {
                    equation += (" + ");
                } else if (v === -1) {
                    equation += (" - ");
                } else if (v > 1) {
                    equation += (" + " + v);

                } else if (v < -1) {
                    equation +=(" - " + (-1 * v));
                }
                equation += parameter.name;
            }

        }
        if (equation === "") {
            return "No Equation";
        }
        return equationBase + equation.substring(3);
    };

    const setParameters = query_result => {
        let parameter_name;
        let prev_value;
        let parameter_value;
        for (let i = 0; i < info.parameters.length; i++) {
            parameter_name = info.parameters[i].name;
            prev_value = query_result[parameter_name];
            parameter_value = (typeof(prev_value) === String) ? prev_value : prev_value;
            info.parameters[i].value = prev_value;
        }
    };

    const setFilters = query_result => {
        info.filters = Object.assign(info.filters, query_result);
    };

    function graphGenerator(req, res){
        if (Object.keys(req.query).length !== 0) {
            if (req.query.chem_formula) {
                setFilters(req.query);
            } else {
                setParameters(req.query);
            }
        }
        info.equation = setEquation();
        res.render('graph', Object.assign(info, {data: data}));
    }

    app.get('/*', graphGenerator);

};


