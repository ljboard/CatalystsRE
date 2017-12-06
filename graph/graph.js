GRAPH = document.getElementById('graph');
var scripts = document.getElementsByTagName('script');
var lastScript = scripts[scripts.length-1];
var scriptName = lastScript;
var data = JSON.parse(scriptName.getAttribute('data'));
for (var i = 0; i < data.length; i++) {
  data[i]["offset"] = Math.random();
}
var currentData = data;
var volcanoMode = true;
var minimumValue = document.getElementById("minumum").value;
var allColors = [];
for (var i = 0; i < data.length; i++) {
  allColors.push("rgb(" + Math.round(Math.random()*255) + "," + Math.round(Math.random()*255) + "," + Math.round(Math.random()*255) + ")")
}
var favoritePoints = {};
var graphRange = [-3, 3];

/*************************************************************/
//                         SELECTORS
/*************************************************************/
var selectEnergy  = v => { if (v["results"]) return v["results"]["energy"]; }
var selectX = v => selectEnergy(v) % 3;
var selectY = v => {
  if (!volcanoMode) {
    return v.offset;
  } else {
    return Math.abs(selectX(v) + v.offset/3);
  }
};
var selectFormula = v => v["atoms"]["symbol_counts"];
var selectFormulaName = v => v["processed_data"]["calculation_info"]["formula"];
var selectMPID    = v => v["processed_data"]["calculation_info"]["mpid"];
var selectMiller  = v => v["processed_data"]["calculation_info"]["miller"];
var selectTop     = v => String(v["processed_data"]["calculation_info"]["top"]);
var selectNextnearestcoordination = v => v["processed_data"]["fp_final"]["nextnearestcoordination"];
var selectFmax    = v => String(v["results"]["fmax"]);
var selectNeighborCoord = v => {
  if (v["processed_data"]["fp_final"]["neighborcoord"]) 
    return v["processed_data"]["fp_final"]["neighborcoord"];
}
var selectCoordination = v =>  v["processed_data"]["fp_final"]["coordination"];
var selectAdsorbates   = v => // returns a list
  v["processed_data"]["calculation_info"]["adsorbate_names"]; 

/*************************************************************/
//                         FILTERS
/*************************************************************/
var filters = {};
var getFormulas      = data => Array.from(new Set(data.map (v => selectFormula(v))));
var getMPID          = data => Array.from(new Set(data.map (v => selectMPID(v))));
var getMiller        = data => Array.from(new Set(data.map (v => selectMiller(v))));
var getTop           = data => Array.from(new Set(data.map (v => selectTop(v))));
var getNextnearestcoordination = data => Array.from(new Set(data.map (v => selectNextnearestcoordination(v))));
var getneighborcoord = data => Array.from(new Set(data.map (v => selectNeighborCoord(v))));
var getCoordination  = data => Array.from(new Set(data.map (v => selectCoordination(v))));
var getFmax       = data => Array.from(new Set(data.map (v => selectFmax(v))));

var updateFilter = (filterName, select) => {
  updateColorSettings()
  var input = document.getElementById(filterName + "_input")
  var text = input.value;
  if(document.getElementById(filterName).checked) {
    input.classList.remove("hidden");
    var filter = data => { return data.filter(v => {
      if (filterName === "neighbor_coord") {
        if (select(v)) return select(v).includes(text);
        else return false;
      } else if (filterName === "formula") {
        var chemicals = text.split(",").map(v => v.trim());
        var chemicalsToCheck = {};
        chemicals.forEach(c => {
          if (c.includes(">")) {
            chemicalsToCheck[c.substring(0, c.indexOf(">"))] = {
              "count": parseInt(c.substring(c.indexOf(">")+1)), 
              "check": (a, b) => a > b
            }
          } else if (c.includes("<")) {
            chemicalsToCheck[c.substring(0, c.indexOf("<"))] = {
              "count": parseInt(c.substring(c.indexOf("<")+1)), 
              "check": (a, b) => a < b
            }
          } else if (c.includes("=")) {
            chemicalsToCheck[c.substring(0, c.indexOf("="))] = {
              "count": parseInt(c.substring(c.indexOf("=")+1)), 
              "check": (a, b) => a === b
            }
          }
        })
        var existingSymbols = select(v);
        var existingSymbol;

        var chemicalToCheckInfo;
        var filterRes = true;
        Object.keys(chemicalsToCheck).forEach(chemicalToCheck => {
          chemicalToCheckInfo = chemicalsToCheck[chemicalToCheck];
          if (existingSymbols.hasOwnProperty(chemicalToCheck)) {
            if (! chemicalToCheckInfo.check(existingSymbols[chemicalToCheck], chemicalToCheckInfo.count)) {
              filterRes = false;
            }
          } else {
            if (! chemicalToCheckInfo.check(0, chemicalToCheckInfo.count)) {
              filterRes = false;
            }
          }
        })
        return filterRes;
      } else if (filterName === "top") {
        var elem = document.getElementById("top_input");
        return select(v) === (elem.options[elem.selectedIndex].value)
      } else if (filterName === "miller") {
        var miller_indices = text.split(",").map(v => Number(v.trim()));
        var selected_indices = select(v);
        for (var i = 0; i < selected_indices.length; i++) {
          if (miller_indices[i] !== selected_indices[i]) {
            return false;
          }
        }
        return true;
      } else {
        return select(v) === text;        
      }
    }); };
    filters[filterName] = filter;
  } else {
    input.classList.add("hidden");
    filters[filterName] = null;
  }
  drawGraph();
}

/*************************************************************/
//                      FILTER ACTIONS
/*************************************************************/
var setFilterEvents = () => {
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
    updateFilter("top", selectTop);
  }
    
  document.getElementById("top_input").oninput = () => {
    updateFilter("top", selectTop);
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
}

setFilterEvents();

document.getElementById("volcano").onchange = () => {
  volcanoMode = document.getElementById("volcano").checked;
  drawGraph();
}

document.getElementById("resetPoints").onclick = () => {
  favoritePoints = {};
  document.getElementById("selectedPoints").innerHTML = renderSavedPoints();
  drawGraph();
}

document.getElementById("minimum_label").innerHTML = minimumValue + " eV";

document.getElementById("minumum").oninput = () => {
  minimumValue = document.getElementById("minumum").value;
  document.getElementById("minimum_label").innerHTML = minimumValue + " eV";
  drawGraph();
}

document.getElementById("low").oninput = () => {
  value = document.getElementById("low").value;
  if (!isNaN(value)) {
    if (value > graphRange[1] - .05) {
      value = graphRange[1] - .05;
    }
    document.getElementById("low_label").innerHTML = "low: " + value + " eV";
    graphRange[0] = Number(value);
    drawGraph(); 
  }
}

document.getElementById("high").oninput = () => {
  value = document.getElementById("high").value;
  if (!isNaN(value)) {
    if (value < graphRange[0] + .05) {
      value = graphRange[0] + .05;
    }
    document.getElementById("high_label").innerHTML = "high: " + value + " eV";
    graphRange[1] = Number(value);
    drawGraph();
  }
}

/*************************************************************/
//                         COLORS
/*************************************************************/
var colorSettings = {
  filter: null,
  colors: {}
};
var colorButtons = document.getElementsByName("color")

var getColorSelection = () => {
  var selectedColor;
  
  for(var i = 0; i < colorButtons.length; i++) {
     if(colorButtons[i].checked)
         selectedColor = colorButtons[i].value;
   }
   return selectedColor;
}

var getColor = i => allColors[i]

var updateColorSettings = () => {
  colorSettings = {
    filter: null,
    colors: {}
  };

  colorSettings.filter = getColorSelection();
  var values;
  switch (colorSettings.filter) {
    case "formula": 
      values = getFormulas(currentData)
      break;
    case "mpid": 
      values = getMPID(currentData)
      break;
    case "miller": 
      values = getMiller(currentData)
      break;
    case "top":
      values = getTop(currentData);
      break;
    case "coordination":
      values = getCoordination(currentData);
      break;
    case "next_nearest_coord":
      values = getNextnearestcoordination(currentData);
      break;
    case "neighbor_coord":
      values = getneighborcoord(currentData);
      break;
    case "fmax":
      values = getFmax(currentData);
      break;
    default:
      values = [];
  }
  var c;
  for (var i = 0; i < values.length; i++) {
    c = getColor(i);
    colorSettings.colors[values[i]] = c;
  }
  drawGraph()
  
}

for (var i = 0; i < colorButtons.length; i++) {
  colorButtons[i].onclick = () => {
    updateColorSettings();
  }
}


/*************************************************************/
//                     GRAPH GENERATION
/*************************************************************/
var renderSavedPoints = () => {
  document.getElementById("resetPoints").classList.remove("hidden");
  var innerHTML = "";
  
  var ids = Object.keys(favoritePoints);
  var point;
  for (var i = 0; i < ids.length; i++) {
    point = favoritePoints[ids[i]];
    innerHTML += ("<li>" + selectFormulaName(point) + "</li>");
  }
  if (innerHTML === "") {
    innerHTML = "<p>Click on a point to add it to your list.</p>";
    document.getElementById("resetPoints").classList.add("hidden");    
  }
  return innerHTML;
}

var drawGraph = () => {
  currentData = data;
  for (var filter in filters) {
    if(filters[filter]) {
      currentData = (filters[filter])(currentData);
    }
  }

  var v;
  var selectColorFilter;
  switch(colorSettings.filter) {
    case "formula": 
      selectColorFilter = selectFormula;
      break;
    case "mpid": 
      selectColorFilter = selectMPID;
      break;
    case "miller": 
      selectColorFilter = selectMiller;
      break;
    case "top": 
      selectColorFilter = selectTop;
      break;
    case "coordination": 
      selectColorFilter = selectCoordination;
      break;
    case "next_nearest_coord": 
      selectColorFilter = selectNextnearestcoordination;
      break;
    case "neighbor_coord": 
      selectColorFilter = selectNeighborCoord;
      break;
    case "fmax": 
      selectColorFilter = selectFmax;
      break;
    default: 
      selectColorFilter = selectTop;
      break;
  }

  for (var i = 0; i < currentData.length; i++) {
    v = currentData[i];
    v["color"] = colorSettings.colors[selectColorFilter(v)];
    v["offset"] = currentData[i].offset;
  }

  /****************************************************************/
  /*                              D3                              */
  /****************************************************************/
  const width = window.innerWidth - 320;
  const height = window.innerHeight - 20;

  var xRange = [
    Math.floor(d3.min(currentData, d => selectX(d))),
    Math.ceil(d3.max(currentData, d => selectX(d)))
  ];

  document.getElementById("high").min = xRange[0];
  document.getElementById("low").min = xRange[0];      
  document.getElementById("low").value = graphRange[0];      
  
  document.getElementById("high").max = xRange[1];
  document.getElementById("low").max = xRange[1];      
  document.getElementById("high").value = graphRange[1];      
  
  xRange = graphRange;

  var yRange = [
    d3.min(currentData, d => selectY(d)),
    d3.max(currentData, d => selectY(d)) + .2
  ];
  if (!volcanoMode) yRange = [0, 1];

  var scaleX = x => {
    var scaledRange = xRange[1]-xRange[0];
    return (x - xRange[0])/scaledRange*width
  }

  var scaleY = y => {
    var scaledRange = yRange[1]-yRange[0];
    return (y - yRange[0])/scaledRange*height
  }

  document.getElementById("graph").innerHTML = "";
  var svg = d3.select('#graph')
    .append('svg')        // create an <svg> element
    .attr('width', width) // set its dimentions
    .attr('height', height)
    .attr('margin', 10);

    svg.append("rect")
    .attr("x", scaleX(minimumValue))
    .attr("y", 0)
    .attr("width", 20)
    .attr("height", "100%")
    .attr("fill", "#caee86")


  var x = d3.scale.linear()
    .domain(xRange)
    .range([0, width]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .tickSize(1);

  var y = d3.scale.linear()
    .domain(yRange)
    .range([0, height]);
  
  var yAxis = d3.svg.axis()
    .scale(y)
    .ticks(10)
    .orient("left")
    .tickSize(1);

  var popover = d3.tip()
    .attr('class', 'd3-popover')
    .offset([-10, 0])
    .html(d => {
      var image_url = "https://s3.us-east-2.amazonaws.com/catalyst-thumbnails/" + 
      d._id + + "-" + selectFormulaName(d) + "-side.png"
      var info = 
        "<h2>" + selectFormulaName(d) + "</h2>" + 
        "<img src='https://s3.us-east-2.amazonaws.com/catalyst-thumbnails/" + '597b9bea899e208675296dff' + "-CO-side.png'>" + 
        // "<img src='https://s3.us-east-2.amazonaws.com/catalyst-thumbnails/'" + 
          // d._id + + "-" + selectFormulaName(d) + ".png'>" +
        "<p><strong>MPID:</strong> " + selectMPID(d) + "</p>" + 
        "<p><strong>Miller Index:</strong> " + selectMiller(d) + "</p>" + 
        "<p><strong>Top:</strong> " + selectTop(d) + "</p>" + 
        "<p><strong>Coordination:</strong> " + selectCoordination(d) + "</p>"
      return info;
    })

  svg.call(popover);

  svg.append('g')
    .attr("transform", "translate(0,600)")  
    .attr('class', 'x-axis') 
    .call(xAxis);
  
  var xAxisHeight = document.getElementsByClassName("x-axis")[0].getBoundingClientRect().top - 
    document.getElementById("graph").getBoundingClientRect().top;

  svg.append('g')
    .attr('class', 'y-axis') 
    .call(yAxis);
  
  var datapoints = svg.append("g").selectAll('circle')
    .data(currentData)
    .enter()

  var datapointObj = datapoints.append("circle")
    .attr("cx", v => scaleX(selectX(v)))
    .attr("cy", v => {
      return scaleY(selectY(v)) + 10
    })
    .attr("r", v => {
      if (favoritePoints.hasOwnProperty(v._id)) {
        return 2;
      } else {
        return 5;
      }
    })
    .attr("fill", v => v.color)
    .attr("cursor", "pointer")
    .on("mouseover", popover.show)
    .on("mouseout", popover.hide)
    .on("click", d => {
      popover.hide();
      if (!favoritePoints.hasOwnProperty(d._id)) {
        favoritePoints[d._id] = d;
      }
      document.getElementById("selectedPoints").innerHTML = renderSavedPoints();
      document.getElementsByClassName('inner-box')[2].classList.remove('hidden');
      document.getElementsByClassName('box')[2].classList.add('opened');
      drawGraph()
    })
    
  svg.append("text")
    .attr("class", "x-axis-label")
    .attr("text-anchor", "middle") 
    .attr("x", width/2)
    .attr("y", xAxisHeight + 40) 
    .attr("font-size", 20)
    .text("Gh (eV)");

}

drawGraph()