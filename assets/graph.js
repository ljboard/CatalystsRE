GRAPH = document.getElementById('graph');

/*************************************************************/
//                           DATA
/*************************************************************/
var data = [
    {
      "id": 38,
      "x": -0.5,
      "y": -0.98,
      "formula": "Ag",
      "adsorbate": false,
      "mpid": false,
      "millerTop": true,
      "coordination": false,
      "nextNearestCoordinate": false,
      "neighborCoordination": false,
      "fmax": false
    },
    {
      "id": 12,
      "x": -0.48,
      "y": -0.85,
      "formula": "OH",
      "adsorbate": true,
      "mpid": true,
      "millerTop": true,
      "coordination": true,
      "nextNearestCoordinate": false,
      "neighborCoordination": true,
      "fmax": true
    },
    {
      "id": 6,
      "x": -0.46,
      "y": -0.85,
      "formula": "C",
      "adsorbate": true,
      "mpid": true,
      "millerTop": true,
      "coordination": false,
      "nextNearestCoordinate": true,
      "neighborCoordination": false,
      "fmax": false
    },
    {
      "id": 23,
      "x": -0.44,
      "y": -0.68,
      "formula": "C",
      "adsorbate": false,
      "mpid": true,
      "millerTop": true,
      "coordination": true,
      "nextNearestCoordinate": false,
      "neighborCoordination": false,
      "fmax": false
    },
    {
      "id": 40,
      "x": -0.42,
      "y": -0.68,
      "formula": "Ag",
      "adsorbate": false,
      "mpid": false,
      "millerTop": true,
      "coordination": true,
      "nextNearestCoordinate": false,
      "neighborCoordination": true,
      "fmax": true
    },
    {
      "id": 37,
      "x": -0.4,
      "y": -0.53,
      "formula": "Ag",
      "adsorbate": true,
      "mpid": true,
      "millerTop": false,
      "coordination": false,
      "nextNearestCoordinate": false,
      "neighborCoordination": false,
      "fmax": false
    },
    {
      "id": 28,
      "x": -0.38,
      "y": -0.3,
      "formula": "C",
      "adsorbate": true,
      "mpid": false,
      "millerTop": true,
      "coordination": false,
      "nextNearestCoordinate": false,
      "neighborCoordination": false,
      "fmax": true
    },
    {
      "id": 42,
      "x": -0.36,
      "y": -0.3,
      "formula": "C",
      "adsorbate": false,
      "mpid": true,
      "millerTop": true,
      "coordination": false,
      "nextNearestCoordinate": true,
      "neighborCoordination": false,
      "fmax": false
    },
    {
      "id": 7,
      "x": -0.33999999999999997,
      "y": -0.24,
      "formula": "C",
      "adsorbate": false,
      "mpid": false,
      "millerTop": false,
      "coordination": false,
      "nextNearestCoordinate": true,
      "neighborCoordination": false,
      "fmax": true
    },
    {
      "id": 49,
      "x": -0.32,
      "y": -0.21,
      "formula": "Ag",
      "adsorbate": false,
      "mpid": true,
      "millerTop": true,
      "coordination": false,
      "nextNearestCoordinate": true,
      "neighborCoordination": true,
      "fmax": false
    },
    {
      "id": 46,
      "x": -0.3,
      "y": -0.15,
      "formula": "Ag",
      "adsorbate": true,
      "mpid": false,
      "millerTop": false,
      "coordination": false,
      "nextNearestCoordinate": false,
      "neighborCoordination": false,
      "fmax": true
    },
    {
      "id": 39,
      "x": -0.28,
      "y": 0.56,
      "formula": "OH",
      "adsorbate": false,
      "mpid": false,
      "millerTop": true,
      "coordination": false,
      "nextNearestCoordinate": true,
      "neighborCoordination": false,
      "fmax": true
    },
    {
      "id": 35,
      "x": -0.26,
      "y": 0.6,
      "formula": "C",
      "adsorbate": false,
      "mpid": false,
      "millerTop": true,
      "coordination": true,
      "nextNearestCoordinate": true,
      "neighborCoordination": true,
      "fmax": true
    },
    {
      "id": 43,
      "x": -0.24,
      "y": 0.6,
      "formula": "C",
      "adsorbate": true,
      "mpid": true,
      "millerTop": true,
      "coordination": false,
      "nextNearestCoordinate": true,
      "neighborCoordination": true,
      "fmax": true
    },
    {
      "id": 36,
      "x": -0.21999999999999997,
      "y": 0.66,
      "formula": "C",
      "adsorbate": true,
      "mpid": true,
      "millerTop": true,
      "coordination": true,
      "nextNearestCoordinate": true,
      "neighborCoordination": true,
      "fmax": true
    },
    {
      "id": 20,
      "x": -0.2,
      "y": 0.67,
      "formula": "Ag",
      "adsorbate": true,
      "mpid": true,
      "millerTop": true,
      "coordination": false,
      "nextNearestCoordinate": false,
      "neighborCoordination": false,
      "fmax": true
    },
    {
      "id": 4,
      "x": -0.18,
      "y": 0.8,
      "formula": "Ag",
      "adsorbate": false,
      "mpid": false,
      "millerTop": false,
      "coordination": true,
      "nextNearestCoordinate": false,
      "neighborCoordination": true,
      "fmax": false
    },
    {
      "id": 47,
      "x": -0.15999999999999998,
      "y": 0.94,
      "formula": "Ag",
      "adsorbate": true,
      "mpid": true,
      "millerTop": false,
      "coordination": true,
      "nextNearestCoordinate": true,
      "neighborCoordination": true,
      "fmax": true
    },
    {
      "id": 50,
      "x": -0.14,
      "y": 0.99,
      "formula": "C",
      "adsorbate": true,
      "mpid": true,
      "millerTop": true,
      "coordination": false,
      "nextNearestCoordinate": false,
      "neighborCoordination": false,
      "fmax": false
    },
    {
      "id": 1,
      "x": 0,
      "y": 0.93,
      "formula": "C",
      "adsorbate": false,
      "mpid": true,
      "millerTop": false,
      "coordination": false,
      "nextNearestCoordinate": false,
      "neighborCoordination": true,
      "fmax": false
    },
    {
      "id": 8,
      "x": 0.02,
      "y": 0.92,
      "formula": "OH",
      "adsorbate": true,
      "mpid": false,
      "millerTop": false,
      "coordination": false,
      "nextNearestCoordinate": true,
      "neighborCoordination": true,
      "fmax": false
    },
    {
      "id": 17,
      "x": 0.04,
      "y": 0.73,
      "formula": "C",
      "adsorbate": true,
      "mpid": false,
      "millerTop": true,
      "coordination": false,
      "nextNearestCoordinate": true,
      "neighborCoordination": true,
      "fmax": false
    },
    {
      "id": 11,
      "x": 0.06,
      "y": 0.69,
      "formula": "C",
      "adsorbate": true,
      "mpid": false,
      "millerTop": false,
      "coordination": false,
      "nextNearestCoordinate": false,
      "neighborCoordination": true,
      "fmax": true
    },
    {
      "id": 41,
      "x": 0.08,
      "y": 0.55,
      "formula": "Ag",
      "adsorbate": true,
      "mpid": false,
      "millerTop": true,
      "coordination": true,
      "nextNearestCoordinate": true,
      "neighborCoordination": false,
      "fmax": false
    },
    {
      "id": 29,
      "x": 0.1,
      "y": 0.54,
      "formula": "C",
      "adsorbate": false,
      "mpid": false,
      "millerTop": false,
      "coordination": true,
      "nextNearestCoordinate": false,
      "neighborCoordination": true,
      "fmax": false
    },
    {
      "id": 19,
      "x": 0.12,
      "y": 0.52,
      "formula": "Ag",
      "adsorbate": false,
      "mpid": true,
      "millerTop": true,
      "coordination": false,
      "nextNearestCoordinate": true,
      "neighborCoordination": false,
      "fmax": false
    },
    {
      "id": 24,
      "x": 0.14,
      "y": 0.44,
      "formula": "C",
      "adsorbate": false,
      "mpid": false,
      "millerTop": false,
      "coordination": true,
      "nextNearestCoordinate": false,
      "neighborCoordination": false,
      "fmax": true
    },
    {
      "id": 2,
      "x": 0.16,
      "y": 0.42,
      "formula": "OH",
      "adsorbate": false,
      "mpid": true,
      "millerTop": true,
      "coordination": true,
      "nextNearestCoordinate": true,
      "neighborCoordination": true,
      "fmax": true
    },
    {
      "id": 31,
      "x": 0.18,
      "y": 0.41,
      "formula": "Ag",
      "adsorbate": true,
      "mpid": true,
      "millerTop": true,
      "coordination": true,
      "nextNearestCoordinate": false,
      "neighborCoordination": false,
      "fmax": false
    },
    {
      "id": 10,
      "x": 0.2,
      "y": 0.4,
      "formula": "OH",
      "adsorbate": false,
      "mpid": false,
      "millerTop": true,
      "coordination": true,
      "nextNearestCoordinate": false,
      "neighborCoordination": true,
      "fmax": false
    },
    {
      "id": 13,
      "x": 0.22,
      "y": 0.4,
      "formula": "Ag",
      "adsorbate": false,
      "mpid": false,
      "millerTop": false,
      "coordination": false,
      "nextNearestCoordinate": false,
      "neighborCoordination": true,
      "fmax": true
    },
    {
      "id": 30,
      "x": 0.24,
      "y": 0.31,
      "formula": "C",
      "adsorbate": false,
      "mpid": false,
      "millerTop": false,
      "coordination": true,
      "nextNearestCoordinate": true,
      "neighborCoordination": false,
      "fmax": true
    },
    {
      "id": 32,
      "x": 0.26,
      "y": 0.27,
      "formula": "Ag",
      "adsorbate": false,
      "mpid": false,
      "millerTop": false,
      "coordination": true,
      "nextNearestCoordinate": false,
      "neighborCoordination": false,
      "fmax": false
    },
    {
      "id": 27,
      "x": 0.28,
      "y": 0.27,
      "formula": "OH",
      "adsorbate": true,
      "mpid": false,
      "millerTop": true,
      "coordination": true,
      "nextNearestCoordinate": true,
      "neighborCoordination": false,
      "fmax": false
    },
    {
      "id": 34,
      "x": 0.3,
      "y": 0.14,
      "formula": "C",
      "adsorbate": false,
      "mpid": false,
      "millerTop": false,
      "coordination": false,
      "nextNearestCoordinate": true,
      "neighborCoordination": true,
      "fmax": false
    },
    {
      "id": 18,
      "x": 0.32,
      "y": 0.13,
      "formula": "OH",
      "adsorbate": false,
      "mpid": true,
      "millerTop": true,
      "coordination": false,
      "nextNearestCoordinate": true,
      "neighborCoordination": false,
      "fmax": false
    },
    {
      "id": 21,
      "x": 0.34,
      "y": 0.1,
      "formula": "OH",
      "adsorbate": false,
      "mpid": false,
      "millerTop": true,
      "coordination": false,
      "nextNearestCoordinate": true,
      "neighborCoordination": true,
      "fmax": true
    },
    {
      "id": 3,
      "x": 0.36,
      "y": 0.04,
      "formula": "C",
      "adsorbate": false,
      "mpid": false,
      "millerTop": true,
      "coordination": true,
      "nextNearestCoordinate": false,
      "neighborCoordination": true,
      "fmax": true
    },
    {
      "id": 26,
      "x": 0.38,
      "y": 0.03,
      "formula": "C",
      "adsorbate": false,
      "mpid": false,
      "millerTop": true,
      "coordination": true,
      "nextNearestCoordinate": false,
      "neighborCoordination": true,
      "fmax": false
    },
    {
      "id": 45,
      "x": 0.4,
      "y": -0.06,
      "formula": "C",
      "adsorbate": false,
      "mpid": false,
      "millerTop": false,
      "coordination": true,
      "nextNearestCoordinate": false,
      "neighborCoordination": true,
      "fmax": false
    },
    {
      "id": 14,
      "x": 0.42,
      "y": -0.12,
      "formula": "C",
      "adsorbate": false,
      "mpid": false,
      "millerTop": true,
      "coordination": true,
      "nextNearestCoordinate": false,
      "neighborCoordination": false,
      "fmax": true
    },
    {
      "id": 5,
      "x": 0.44,
      "y": -0.15,
      "formula": "C",
      "adsorbate": false,
      "mpid": true,
      "millerTop": true,
      "coordination": false,
      "nextNearestCoordinate": false,
      "neighborCoordination": false,
      "fmax": false
    },
    {
      "id": 48,
      "x": 0.46,
      "y": -0.63,
      "formula": "Ag",
      "adsorbate": false,
      "mpid": true,
      "millerTop": false,
      "coordination": true,
      "nextNearestCoordinate": true,
      "neighborCoordination": false,
      "fmax": true
    },
    {
      "id": 15,
      "x": 0.48,
      "y": -0.66,
      "formula": "C",
      "adsorbate": true,
      "mpid": false,
      "millerTop": false,
      "coordination": true,
      "nextNearestCoordinate": true,
      "neighborCoordination": true,
      "fmax": false
    },
    {
      "id": 22,
      "x": 0.5,
      "y": -0.71,
      "formula": "Ag",
      "adsorbate": false,
      "mpid": false,
      "millerTop": true,
      "coordination": true,
      "nextNearestCoordinate": false,
      "neighborCoordination": true,
      "fmax": true
    },
    {
      "id": 25,
      "x": 0.52,
      "y": -0.73,
      "formula": "Ag",
      "adsorbate": true,
      "mpid": false,
      "millerTop": true,
      "coordination": false,
      "nextNearestCoordinate": true,
      "neighborCoordination": false,
      "fmax": false
    },
    {
      "id": 33,
      "x": 0.54,
      "y": -0.74,
      "formula": "OH",
      "adsorbate": false,
      "mpid": true,
      "millerTop": true,
      "coordination": false,
      "nextNearestCoordinate": true,
      "neighborCoordination": false,
      "fmax": false
    },
    {
      "id": 9,
      "x": 0.56,
      "y": -0.83,
      "formula": "OH",
      "adsorbate": false,
      "mpid": false,
      "millerTop": false,
      "coordination": true,
      "nextNearestCoordinate": true,
      "neighborCoordination": true,
      "fmax": true
    },
    {
      "id": 44,
      "x": 0.58,
      "y": -0.96,
      "formula": "C",
      "adsorbate": false,
      "mpid": true,
      "millerTop": true,
      "coordination": true,
      "nextNearestCoordinate": true,
      "neighborCoordination": true,
      "fmax": true
    },
    {
      "id": 16,
      "x": 0.6,
      "y": -0.98,
      "formula": "C",
      "adsorbate": false,
      "mpid": true,
      "millerTop": true,
      "coordination": false,
      "nextNearestCoordinate": false,
      "neighborCoordination": true,
      "fmax": true
    }
  ]//
//
//
var currentData = data;

/*************************************************************/
//                         FILTERS
/*************************************************************/
var filters = {};

var updateFormulaFilter = () => {
  var e = document.getElementById("chem_formula_select")
  if(document.getElementById("chem_formula").checked) {
    var filterChemFormula = data => { 
      return data.filter(v => v.formula === e.options[e.selectedIndex].value); 
    };
    filters["chem_formula"] = filterChemFormula;
  } else {
    filters["chem_formula"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("chem_formula_select").onchange = () => {
  updateFormulaFilter();
}

document.getElementById("chem_formula").onclick = () => {
  updateFormulaFilter();
}

document.getElementById("adsorbate").onclick = () => {
  if(document.getElementById("adsorbate").checked) {
    var filterAdsorbate = data => { return data.filter(v => v.adsorbate); };
    filters["adsorbate"] = filterAdsorbate;
  } else {
    filters["adsorbate"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("mpid").onclick = () => {
  if(document.getElementById("mpid").checked) {
    var filterMPID = data => { return data.filter(v => v.mpid); };
    filters["mpid"] = filterMPID;
  } else {
    filters["mpid"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("miller_top").onclick = () => {
  if(document.getElementById("miller_top").checked) {
    var filterMillerTop = data => { return data.filter(v => v.millerTop); };
    filters["miller_top"] = filterMillerTop;
  } else {
    filters["miller_top"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("coordination").onclick = () => {
  if(document.getElementById("coordination").checked) {
    var filterCoordination = data => { return data.filter(v => v.coordination); };
    filters["coordination"] = filterCoordination;
  } else {
    filters["coordination"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("next_nearest_coord").onclick = () => {
  if(document.getElementById("next_nearest_coord").checked) {
    var filterNextNearestCoord = data => { return data.filter(v => v.nextNearestCoordinate); };
    filters["next_nearest_coord"] = filterNextNearestCoord;
  } else {
    filters["next_nearest_coord"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("neighbor_coord").onclick = () => {
  if(document.getElementById("neighbor_coord").checked) {
    var filterNeighborCoord = data => { return data.filter(v => v.neighborCoordination); };
    filters["neighbor_coord"] = filterNeighborCoord;
  } else {
    filters["neighbor_coord"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("fmax").onclick = () => {
  if(document.getElementById("fmax").checked) {
    var filterFmax = data => { return data.filter(v => v.fmax); };
    filters["fmax"] = filterFmax;
  } else {
    filters["fmax"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

/*************************************************************/
//                     GRAPH GENERATION
/*************************************************************/
var drawGraph = () => {  
  currentData = data;
  for (var filter in filters) {
    if(filters[filter]) {
      currentData = (filters[filter])(currentData);
    }
  }
  // Data helpers to get various values 
  // TODO: change this to pass in raw data and have d3 handle the properties
  var getXValues = data => { return data.map(v => v.x); };
  var getYValues = data => { return data.map(v => v.y); };
  var getFormulas = data => { return data.map (v => v.formula); };
  var getMPID = data => { return data.map (v => v.mpid); };
  var getMillerTop = data => { return data.map (v => v.millerTop); };
  var getNextNearestCoordinate = data => { return data.map (v => v.nextNearestCoordinate); };
  var getNeighborCoordination = data => { return data.map (v => v.neighborCoordination); };
  var getCoordination = data => { return data.map (v => v.coordination); };
  var getAdsorbate = data => { return data.map (v => v.adsorbate); };
  var getFmax = data => { return data.map (v => v.fmax); };

  var x_values = getXValues(currentData);
  var y_values = getYValues(currentData);
  var formula_values = getFormulas(currentData);
  var mpid_values = getMPID(currentData);
  var mt_values = getMillerTop(currentData);
  var nnc_values = getNextNearestCoordinate(currentData);
  var coordination_values = getCoordination(currentData);
  var adsorbate_values = getAdsorbate(currentData);
  var fmax_values = getFmax(currentData);

  // Display (plotly.js with D3)
  var hoverInfo = document.getElementById('popup');
  var d3 = Plotly.d3;

  var graph_data = [ 
    { 
      x:x_values, 
      y:y_values, 
      type:'scatter', 
      formula:formula_values,
      mpid: mpid_values,
      mt: mt_values,
      nnc: nnc_values,
      coordination: coordination_values,
      adsorbate: adsorbate_values,
      fmax: fmax_values,    
      marker:{size:10},
      hoverinfo: "alsjd"
    } 
  ];
  var graph_layout = { 
      hovermode:'closest',
      margin: {t: 0},
      xaxis: {title: "Gh (eV)"},
      yaxis: {title: "Exchange Current Density (A/m^2)"}
  };

  Plotly.plot('graph', graph_data, graph_layout);
  GRAPH.on('plotly_click', function(data){
      var formula, mpid, mt, nnc, coordination, adsorbate, fmax, 
          title, image, info;
      var infotext = data.points.map(function(d, i) {
          formula = d.data.formula[d.pointNumber - 1];
          mpid = d.data.mpid[d.pointNumber - 1];
          mt = d.data.mt[d.pointNumber - 1];
          nnc = d.data.nnc[d.pointNumber - 1];
          coordination = d.data.coordination[d.pointNumber - 1];
          adsorbate = d.data.adsorbate[d.pointNumber - 1];
          fmax = d.data.fmax[d.pointNumber - 1];
          title = '<h1>' + formula + '</h1>';
          image = '<img id="molecule" src="molecule.jpg" \
            width="40px" height="40px" \
            style="margin-right: -50px" />';
          // TODO: pass values in to a pug object
          info = '<p class="popup-info"><b>x:</b> ' + d.x;
          info += '</p><p class="popup-info"><b>y:</b> ' + d.y + '</p>';
          info += '</p><p class="popup-info"><b>MPID:</b> ' + mpid + '</p>';
          info += '</p><p class="popup-info"><b>mt:</b> ' + mt + '</p>';
          info += '</p><p class="popup-info"><b>nnc:</b> ' + nnc + '</p>';
          info += '</p><p class="popup-info"><b>coordination:</b> ' + coordination + '</p>';
          info += '</p><p class="popup-info"><b>adsorbate:</b> ' + adsorbate + '</p>';
          info += '</p><p class="popup-info"><b>fmax:</b> ' + fmax + '</p>';
          return title + image + info;
      });
      
      hoverInfo.innerHTML = infotext;
      hoverInfo.classList.remove('hidden')
      console.log(hoverInfo)
  })
  .on('plotly_unhover', function(data){
      hoverInfo.innerHTML = '';
      hoverInfo.classList.add('hidden')
    });
}

drawGraph()