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
var selectEnergy  = v => { if (v["results"]) return v["results"]["energy"]; }
var selectFormula = v => v["processed_data"]["calculation_info"]["formula"];
var selectMPID    = v => v["processed_data"]["calculation_info"]["mpid"];
var selectMiller  = v => String(v["processed_data"]["calculation_info"]["miller"][0]);
var selectTop     = v => v["processed_data"]["calculation_info"]["top"];
var selectNextnearestcoordination = v => v["processed_data"]["fp_final"]["nextnearestcoordination"];
var selectFmax    = v => String(v["results"]["fmax"]);
var selectNeighborCoord = v => {
  if (v["processed_data"]["fp_final"]["neighborcoord"]) 
    return v["processed_data"]["fp_final"]["neighborcoord"][0];
}
var selectCoordination = v =>  v["processed_data"]["fp_final"]["coordination"];
var selectAdsorbates   = v => // returns a list
  v["processed_data"]["calculation_info"]["adsorbate_names"]; 

/*************************************************************/
//                         FILTERS
/*************************************************************/
var filters = {};
var getXValues       = data => data.map(v => (selectEnergy(v) % 3));
var getFormulas      = data => data.map (v => selectFormula(v));
var getMPID          = data => data.map (v => selectMPID(v));
var getMiller        = data => data.map (v => selectMiller(v));
var getTop           = data => data.map (v => selectTop(v));
var getNextnearestcoordination = data => data.map (v => selectNextnearestcoordination(v));
var getneighborcoord = data => data.map (v => selectNeighborCoord(v));
var getCoordination  = data => data.map (v => selectCoordination(v));
var filterFmax       = data => data.map (v => selectFmax(v));

var updateFilter = (filterName, select) => {
  var input = document.getElementById(filterName + "_input")
  var text = input.value;
  if(document.getElementById(filterName).checked) {
    input.classList.remove("hidden");
    var filter = data => { return data.filter(v => {
      return select(v) === text;
    }); };
    filters[filterName] = filter;
  } else {
    input.classList.add("hidden");
    filters[filterName] = null;
  }
  Plotly.deleteTraces('graph', 0);  
  drawGraph();
}

document.getElementById("formula").onchange = () => {
  updateFilter("formula", selectFormula);
}

document.getElementById("formula_input").onkeyup = () => {
  updateFilter("formula", selectFormula);
}

document.getElementById("mpid").onclick = () => {
  updateFilter("mpid", selectMPID);
}

document.getElementById("mpid_input").onkeyup = () => {
  updateFilter("mpid", selectMPID);  
}

document.getElementById("miller").onclick = () => {
  updateFilter("miller", selectMiller);  
}

document.getElementById("miller_input").onkeyup = () => {
  updateFilter("miller", selectMiller);    
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
  updateFilter("coordination", selectCoordination);  
}

document.getElementById("coordination_input").onkeyup = () => {
  updateFilter("coordination", selectCoordination);    
}

document.getElementById("next_nearest_coord").onclick = () => {
  updateFilter("next_nearest_coord", selectNextnearestcoordination);  
}

document.getElementById("next_nearest_coord_input").onkeyup = () => {
  updateFilter("next_nearest_coord", selectNextnearestcoordination);    
}

document.getElementById("neighbor_coord").onclick = () => {
  updateFilter("neighbor_coord", selectNeighborCoord);
}

document.getElementById("neighbor_coord_input").onkeyup = () => {
  updateFilter("neighbor_coord", selectNeighborCoord);  
}

document.getElementById("fmax").onclick = () => {
  updateFilter("fmax", selectFmax);  
}

document.getElementById("fmax_input").onkeyup = () => {
  updateFilter("fmax", selectFmax);    
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
  
  var x_values =  getXValues(currentData);
  var y_values = x_values.map(v => Math.random() - (Math.abs(v)-2))
  var formula_values = getFormulas(currentData);
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
          console.log("MPID", d.data.formula)
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

drawGraph()