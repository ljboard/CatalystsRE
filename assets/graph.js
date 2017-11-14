GRAPH = document.getElementById('graph');
var scripts = document.getElementsByTagName('script');
var lastScript = scripts[scripts.length-1];
var scriptName = lastScript;
var data = JSON.parse(scriptName.getAttribute('data-input_var'));
var currentData = data;
var colors = [];
for (var i=0; i < 500; i++) colors.push(i)

/*************************************************************/
//                         SELECTORS
/*************************************************************/
var selectEnergy = v => {
  if (v["results"]) return v["results"]["energy"];
}
var selectFormula = v => v["processed_data"]["calculation_info"]["formula"];
var selectMPID = v => v["processed_data"]["calculation_info"]["mpid"];
var selectMiller = v => v["processed_data"]["calculation_info"]["miller"][0];
var selectTop = v => v["processed_data"]["calculation_info"]["top"];
var selectNextnearestcoordination = v => v["processed_data"]["fp_final"]["nextnearestcoordination"];
var selectFmax = v => v["results"]["fmax"];
var selectNeighborCoord = v => {
  if (v["processed_data"]["fp_final"]["neighborcoord"]) 
    return v["processed_data"]["fp_final"]["neighborcoord"][0];
}
var selectCoordination = v =>  v["processed_data"]["fp_final"]["coordination"];
var selectAdsorbates = v => v["processed_data"]["calculation_info"]["adsorbate_names"]; // returns a list

/*************************************************************/
//                         FILTERS
/*************************************************************/
var filters = {};
var getXValues = data => { return data.map(v => (selectEnergy(v) % 3)); };
// var getYValues = data => { return data.map(v => v["1"]["energy"]); };
var getAdsorbates = data => { return data.map (v => selectAdsorbates(v)[0]); };
var getMPID = data => { return data.map (v => selectMPID(v)); };
var getMiller = data => { return data.map (v => selectMiller(v)); };
var getTop = data => { return data.map (v => selectTop(v)); };
var getNextnearestcoordination = data => { return data.map (v => selectNextnearestcoordination(v)); };
var getneighborcoord = data => { return data.map (v => selectNeighborCoord(v)); };
var getCoordination = data => { return data.map (v => selectCoordination(v)); };
var filterFmax = data => { return data.map (v => selectFmax(v)); };

var updateFormulaFilter = () => {
  var formula_input = document.getElementById("formula_input")
  var formula_text = formula_input.value;
  if(document.getElementById("formula").checked) {
    formula_input.classList.remove("hidden");
    var filterFormula = data => { return data.filter(v => {
      return selectFormula(v) === formula_text
    }); };
    filters["formula"] = filterFormula;
  } else {
    formula_input.classList.add("hidden");
    filters["formula"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("formula").onchange = () => {
  updateFormulaFilter();
}

document.getElementById("formula_input").onkeyup = () => {
  updateFormulaFilter();
}

document.getElementById("mpid").onclick = () => {
  var mpid_input = document.getElementById("mpid_input")
  var mpid_text = mpid_input.value;
  if(document.getElementById("mpid").checked) {
    mpid_input.classList.remove("hidden");
    var filterMPID = data => { return data.filter(v => {
      return selectMPID(v) === mpid_text
    }); };
    filters["mpid"] = filterMPID;
  } else {
    mpid_input.classList.add("hidden");
    filters["mpid"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("mpid_input").onkeyup = () => {
  var mpid_input = document.getElementById("mpid_input")
  var mpid_text = mpid_input.value;
  if(document.getElementById("mpid").checked) {
    mpid_input.classList.remove("hidden");
    var filterMPID = data => { return data.filter(v => {
      return selectMPID(v) === mpid_text
    }); };
    filters["mpid"] = filterMPID;
  } else {
    mpid_input.classList.add("hidden");
    filters["mpid"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("miller").onclick = () => {
  var mpid_input = document.getElementById("miller_input")
  var miller_text = miller_input.value;
  if(document.getElementById("miller").checked) {
    miller_input.classList.remove("hidden");
    var filterMiller = data => { return data.filter(v => {
      return selectMiller(v) === miller_text
    }); };
    filters["miller"] = filterMiller;
  } else {
    miller_input.classList.add("hidden");
    filters["miller"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("miller_input").onkeyup = () => {
  var miller_input = document.getElementById("miller_input")
  var miller_text = miller_input.value;
  if(document.getElementById("miller").checked) {
    miller_input.classList.remove("hidden");
    var filtermiller = data => { return data.filter(v => {
      return selectmiller(v) === miller_text
    }); };
    filters["miller"] = filtermiller;
  } else {
    miller_input.classList.add("hidden");
    filters["miller"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("top").onclick = () => {
  if(document.getElementById("top").checked) {
    var filterTop = data => { return data.filter(v => {
      return selectTop(v)
    }); };
    filters["top"] = filterTop;
  } else {
    filters["top"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("coordination").onclick = () => {
  var coordination_input = document.getElementById("coordination_input")
  var coordination_text = coordination_input.value;
  if(document.getElementById("coordination").checked) {
    coordination_input.classList.remove("hidden");
    var filterCoordination = data => { return data.filter(v => {
      return selectCoordination(v) === coordination_text
    }); };
    filters["coordination"] = filterCoordination;
  } else {
    coordination_input.classList.add("hidden");
    filters["coordination"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("coordination_input").onkeyup = () => {
  var coordination_input = document.getElementById("coordination_input")
  var coordination_text = coordination_input.value;
  if(document.getElementById("coordination").checked) {
    coordination_input.classList.remove("hidden");
    var filterCoordination = data => { return data.filter(v => {
      return selectCoordination(v) === coordination_text
    }); };
    filters["coordination"] = filterCoordination;
  } else {
    coordination_input.classList.add("hidden");
    filters["coordination"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}


document.getElementById("next_nearest_coord").onclick = () => {
  var next_nearest_coord_input = document.getElementById("next_nearest_coord_input")
  var next_nearest_coord_text = next_nearest_coord_input.value;
  if(document.getElementById("next_nearest_coord").checked) {
    next_nearest_coord_input.classList.remove("hidden");
    var filternext_nearest_coord = data => { return data.filter(v => {
      return selectNextnearestcoordination(v) === next_nearest_coord_text
    }); };
    filters["next_nearest_coord"] = filternext_nearest_coord;
  } else {
    next_nearest_coord_input.classList.add("hidden");
    filters["next_nearest_coord"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("next_nearest_coord_input").onkeyup = () => {
  var next_nearest_coord_input = document.getElementById("next_nearest_coord_input")
  var next_nearest_coord_text = next_nearest_coord_input.value;
  if(document.getElementById("next_nearest_coord").checked) {
    next_nearest_coord_input.classList.remove("hidden");
    var filternext_nearest_coord = data => { return data.filter(v => {
      return selectNextnearestcoordination(v) === next_nearest_coord_text
    }); };
    filters["next_nearest_coord"] = filternext_nearest_coord;
  } else {
    next_nearest_coord_input.classList.add("hidden");
    filters["next_nearest_coord"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("neighbor_coord").onclick = () => {
  var neighbor_coord_input = document.getElementById("neighbor_coord_input")
  var neighbor_coord_text = neighbor_coord_input.value;
  if(document.getElementById("neighbor_coord").checked) {
    neighbor_coord_input.classList.remove("hidden");
    var filterNeighborCoord = data => { return data.filter(v => {
      return selectNeighborCoord(v) === neighbor_coord_text
    }); };
    filters["neighbor_coord"] = filterNeighborCoord;
  } else {
    neighbor_coord_input.classList.add("hidden");
    filters["neighbor_coord"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("neighbor_coord_input").onkeyup = () => {
  var neighbor_coord_input = document.getElementById("neighbor_coord_input")
  var neighbor_coord_text = neighbor_coord_input.value;
  if(document.getElementById("neighbor_coord").checked) {
    neighbor_coord_input.classList.remove("hidden");
    var filterNeighborCoord = data => { return data.filter(v => {
      console.log("vvalue", selectNextnearestcoordination(v))
      return selectNeighborCoord(v) === neighbor_coord_text
    }); };
    filters["neighbor_coord"] = filterNeighborCoord;
  } else {
    neighbor_coord_input.classList.add("hidden");
    filters["neighbor_coord"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("fmax").onclick = () => {
  var fmax_input = document.getElementById("fmax_input")
  var fmax_text = fmax_input.value;
  if(document.getElementById("fmax").checked) {
    fmax_input.classList.remove("hidden");
    var filterNeighborCoord = data => { return data.filter(v => {
      return selectNeighborCoord(v) === fmax_text
    }); };
    filters["fmax"] = filterNeighborCoord;
  } else {
    fmax_input.classList.add("hidden");
    filters["fmax"] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("fmax_input").onkeyup = () => {
  var fmax_input = document.getElementById("fmax_input")
  var fmax_text = fmax_input.value;
  if(document.getElementById("fmax").checked) {
    fmax_input.classList.remove("hidden");
    var filterFmax = data => { return data.filter(v => {
      return String(selectFmax(v)) === fmax_text
    }); };
    filters["fmax"] = filterFmax;
  } else {
    fmax_input.classList.add("hidden");
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
  console.log("data", data.length)

  var x_values = getXValues(currentData);
  console.log(x_values)
  // var y_values = getYValues(currentData);
  var y_values = x_values.map(v => Math.random() - (Math.abs(v)-2))
  console.log(y_values)
  var formula_values = getAdsorbates(currentData);
  var miller_values = getMiller(currentData);
  var mpid_values = getMPID(currentData);
  var nnc_values = getNextnearestcoordination(currentData);
  var coordination_values = getCoordination(currentData);
  var fmax_values = filterFmax(currentData);

  // Display (plotly.js with D3)
  var hoverInfo = document.getElementById('popup');
  var d3 = Plotly.d3;

  var graph_data = [ 
    { 
      x:x_values, 
      y:y_values, 
      mode:'markers', 
      formula:formula_values,
      mpid: mpid_values,
      mt: miller_values,
      nnc: nnc_values,
      coordination: coordination_values,
      fmax: fmax_values,    
      marker:{size:10},
      color: colors
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
      var formula, mpid, mt, nnc, coordination, fmax, 
          title, image, info;
      var infotext = data.points.map(function(d, i) {
          console.log("MPID", d.data.mpid)
          console.log("index", d.pointNumber)
          formula = d.data.formula[d.pointNumber];
          mpid = d.data.mpid[d.pointNumber];
          mt = d.data.mt[d.pointNumber];
          nnc = d.data.nnc[d.pointNumber];
          coordination = d.data.coordination[d.pointNumber];
          fmax = d.data.fmax[d.pointNumber];
          title = '<h1>' + formula + '</h1>';
          image = '';//'<img id="molecule" src="molecule.jpg" \
            // width="40px" height="40px" \
            // style="margin-right: -50px" />';
          // TODO: pass values in to a pug object
          info = '<p class="popup-info"><b>x:</b> ' + d.x;
          info += '</p><p class="popup-info"><b>y:</b> ' + d.y + '</p>';
          info += '</p><p class="popup-info"><b>MPID:</b> ' + mpid + '</p>';
          info += '</p><p class="popup-info"><b>mt:</b> ' + mt + '</p>';
          info += '</p><p class="popup-info"><b>nnc:</b> ' + nnc + '</p>';
          info += '</p><p class="popup-info"><b>coordination:</b> ' + coordination + '</p>';
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
// console.log(data[0])
// data = data.map((v, i) => {v["1"]["ctime"] = i; return v;});
// data = data.sort();
// console.log(data)
drawGraph()