GRAPH = document.getElementById('graph');
var scripts = document.getElementsByTagName('script');
var lastScript = scripts[scripts.length-1];
var scriptName = lastScript;
var data = JSON.parse(scriptName.getAttribute('data-input_var'));

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
  console.log("data", data[0])
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