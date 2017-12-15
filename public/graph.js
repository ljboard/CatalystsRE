// const GRAPH = document.getElementById('graph');
const scripts = document.getElementsByTagName('script');
const lastScript = scripts[scripts.length-1];

let scriptName = lastScript;
let data = JSON.parse(scriptName.getAttribute('data'));

for (let i = 0; i < data.length; i++) {
  data[i].offset = Math.random();
}

let currentData = data;
let volcanoMode = true;
let minimumValue = document.getElementById("minumum").value;
let allColors = [];

for (let i = 0; i < data.length; i++) {
  allColors.push("rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")");
}

let favoritePoints = {};
let graphRange = [-3, 3];

/*************************************************************/
//                         SELECTORS
/*************************************************************/
let selectEnergy = v => { if (v && v.energy){ return v.energy; }};
let selectX = v => selectEnergy(v) % 3;
let selectY = v => {
  if (!volcanoMode) {
    return v.offset;
  } else {
    return Math.abs(selectX(v) + v.offset/3);
  }
};
let selectMongoID = v => v.mongo_id.substring(10,34);
let selectFormula = v => v.formula;
let selectFormulaName = v => v.formula;
let selectMPID    = v => v.mpid;
let selectMiller  = v => v.miller;
let selectTop     = v => String(v.top);
let selectNextnearestcoordination = v => v.nextnearestcoordination;
let selectFmax    = () => "0"; // String(v.fmax);
let selectNeighborCoord = v => {
  if (v.neighborcoord){
    return v.neighborcoord;
  }
};
let selectCoordination = v => v.coordination;
// let selectAdsorbates = v => v.processed_data.calculation_info.adsorbate_names;

/*************************************************************/
//                         FILTERS
/*************************************************************/
let filters = {};
let getFormulas      = data => Array.from(new Set(data.map (v => selectFormula(v))));
let getMPID          = data => Array.from(new Set(data.map (v => selectMPID(v))));
let getMiller        = data => Array.from(new Set(data.map (v => selectMiller(v))));
let getTop           = data => Array.from(new Set(data.map (v => selectTop(v))));
let getNextnearestcoordination = data => Array.from(new Set(data.map (v => selectNextnearestcoordination(v))));
let getneighborcoord = data => Array.from(new Set(data.map (v => selectNeighborCoord(v))));
let getCoordination  = data => Array.from(new Set(data.map (v => selectCoordination(v))));
let getFmax       = data => Array.from(new Set(data.map (v => selectFmax(v))));

let updateFilter = (filterName, select) => {
  updateColorSettings();
  let input = document.getElementById(filterName + "_input");
  let text = input.value;
  if(document.getElementById(filterName).checked) {
    input.classList.remove("hidden");
    let filter = data => { return data.filter(v => {
      if (filterName === "neighbor_coord") {
        if (select(v)){return select(v).includes(text);}
        else {return false;}
      } else if (filterName === "formula") {
        let chemicals = text.split(",").map(v => v.trim());
        let chemicalsToCheck = {};
        chemicals.forEach(c => {
          if (c.includes(">")) {
            chemicalsToCheck[c.substring(0, c.indexOf(">"))] = {
              "count": parseInt(c.substring(c.indexOf(">")+1)),
              "check": (a, b) => a > b
            };
          } else if (c.includes("<")) {
            chemicalsToCheck[c.substring(0, c.indexOf("<"))] = {
              "count": parseInt(c.substring(c.indexOf("<")+1)),
              "check": (a, b) => a < b
            };
          } else if (c.includes("=")) {
            chemicalsToCheck[c.substring(0, c.indexOf("="))] = {
              "count": parseInt(c.substring(c.indexOf("=")+1)),
              "check": (a, b) => a === b
            };
          }
        });
        let existingSymbols = select(v);
        // let existingSymbol;

        let chemicalToCheckInfo;
        let filterRes = true;
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
        });
        return filterRes;
      } else if (filterName === "top") {
        let elem = document.getElementById("top_input");
        return select(v) === (elem.options[elem.selectedIndex].value);
      } else if (filterName === "miller") {
        let miller_indices = text.split(",").map(v => Number(v.trim()));
        let selected_indices = select(v);
        for (let i = 0; i < selected_indices.length; i++) {
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
};

/*************************************************************/
//                      FILTER ACTIONS
/*************************************************************/
let setFilterEvents = () => {
  document.getElementById("formula").onchange = () => {
    updateFilter("formula", selectFormula);
  };

  document.getElementById("formula_input").onkeyup = () => {
    updateFilter("formula", selectFormula);
  };

  document.getElementById("mpid").onclick = () => {
    updateFilter("mpid", selectMPID);
  };

  document.getElementById("mpid_input").onkeyup = () => {
    updateFilter("mpid", selectMPID);
  };

  document.getElementById("miller").onclick = () => {
    updateFilter("miller", selectMiller);
  };

  document.getElementById("miller_input").onkeyup = () => {
    updateFilter("miller", selectMiller);
  };

  document.getElementById("top").onclick = () => {
    updateFilter("top", selectTop);
  };

  document.getElementById("top_input").oninput = () => {
    updateFilter("top", selectTop);
  };

  document.getElementById("coordination").onclick = () => {
    updateFilter("coordination", selectCoordination);
  };

  document.getElementById("coordination_input").onkeyup = () => {
    updateFilter("coordination", selectCoordination);
  };

  document.getElementById("next_nearest_coord").onclick = () => {
    updateFilter("next_nearest_coord", selectNextnearestcoordination);
  };

  document.getElementById("next_nearest_coord_input").onkeyup = () => {
    updateFilter("next_nearest_coord", selectNextnearestcoordination);
  };

  document.getElementById("neighbor_coord").onclick = () => {
    updateFilter("neighbor_coord", selectNeighborCoord);
  };

  document.getElementById("neighbor_coord_input").onkeyup = () => {
    updateFilter("neighbor_coord", selectNeighborCoord);
  };
};

setFilterEvents();

document.getElementById("volcano").onchange = () => {
  volcanoMode = document.getElementById("volcano").checked;
  drawGraph();
};

document.getElementById("resetPoints").onclick = () => {
  favoritePoints = {};
  document.getElementById("selectedPoints").innerHTML = renderSavedPoints();
  drawGraph();
};

document.getElementById("minimum_label").innerHTML = minimumValue + " eV";

document.getElementById("minumum").oninput = () => {
  minimumValue = document.getElementById("minumum").value;
  document.getElementById("minimum_label").innerHTML = minimumValue + " eV";
  drawGraph();
};

document.getElementById("low").oninput = () => {
  let value = document.getElementById("low").value;
  if (!isNaN(value)) {
    if (value > graphRange[1] - 0.05) {
      value = graphRange[1] - 0.05;
    }
    document.getElementById("low_label").innerHTML = "low: " + value + " eV";
    graphRange[0] = Number(value);
    drawGraph();
  }
};

document.getElementById("high").oninput = () => {
  let value = document.getElementById("high").value;
  if (!isNaN(value)) {
    if (value < graphRange[0] + 0.05) {
      value = graphRange[0] + 0.05;
    }
    document.getElementById("high_label").innerHTML = "high: " + value + " eV";
    graphRange[1] = Number(value);
    drawGraph();
  }
};

/*************************************************************/
//                         COLORS
/*************************************************************/
let colorSettings = {
  filter: null,
  colors: {}
};
let colorButtons = document.getElementsByName("color");

let getColorSelection = () => {
  let selectedColor;

  for(let i = 0; i < colorButtons.length; i++) {
     if(colorButtons[i].checked){
         selectedColor = colorButtons[i].value;
     }
   }
   return selectedColor;
};

let getColor = i => allColors[i];

let updateColorSettings = () => {
  colorSettings = {
    filter: null,
    colors: {}
  };

  colorSettings.filter = getColorSelection();
  let values;
  switch (colorSettings.filter) {
    case "formula":
      values = getFormulas(currentData);
      break;
    case "mpid":
      values = getMPID(currentData);
      break;
    case "miller":
      values = getMiller(currentData);
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
  let c;
  for (let i = 0; i < values.length; i++) {
    c = getColor(i);
    colorSettings.colors[values[i]] = c;
  }
  drawGraph();

};

for (let i = 0; i < colorButtons.length; i++) {
  colorButtons[i].onclick = () => {
    updateColorSettings();
  };
}


/*************************************************************/
//                     GRAPH GENERATION
/*************************************************************/
let renderSavedPoints = () => {
  document.getElementById("resetPoints").classList.remove("hidden");
  let innerHTML = "";

  let ids = Object.keys(favoritePoints);
  let point;
  for (let i = 0; i < ids.length; i++) {
    point = favoritePoints[ids[i]];
    innerHTML += ("<li>" + selectFormulaName(point) + "</li>");
  }
  if (innerHTML === "") {
    innerHTML = "<p>Click on a point to add it to your list.</p>";
    document.getElementById("resetPoints").classList.add("hidden");
  }
  return innerHTML;
};

let drawGraph = () => {
  currentData = data;
  for (let filter in filters) {
    if(filters[filter]) {
      currentData = (filters[filter])(currentData);
    }
  }

  let v;
  let selectColorFilter;
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

  for (let i = 0; i < currentData.length; i++) {
    v = currentData[i];
    v.color = colorSettings.colors[selectColorFilter(v)];
    v.offset = currentData[i].offset;
  }

  /****************************************************************/
  /*                              D3                              */
  /****************************************************************/
  const width = window.innerWidth - 320;
  const height = window.innerHeight - 20;

  let xRange = [
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

  let yRange = [
    d3.min(currentData, d => selectY(d)),
    d3.max(currentData, d => selectY(d)) + 0.2
  ];
  if (!volcanoMode){ yRange = [0, 1];}

  let scaleX = x => {
    let scaledRange = xRange[1]-xRange[0];
    return (x - xRange[0])/scaledRange*width;
  };

  let scaleY = y => {
    let scaledRange = yRange[1]-yRange[0];
    return (y - yRange[0])/scaledRange*height;
  };

  document.getElementById("graph").innerHTML = "";
  let svg = d3.select('#graph')
    .append('svg')        // create an <svg> element
    .attr('width', width) // set its dimentions
    .attr('height', height)
    .attr('margin', 10);

    svg.append("rect")
    .attr("x", scaleX(minimumValue))
    .attr("y", 0)
    .attr("width", 20)
    .attr("height", "100%")
    .attr("fill", "#caee86");


  let x = d3.scale.linear()
    .domain(xRange)
    .range([0, width]);

  let xAxis = d3.svg.axis()
    .scale(x)
    .tickSize(1);

  let y = d3.scale.linear()
    .domain(yRange)
    .range([0, height]);

  let yAxis = d3.svg.axis()
    .scale(y)
    .ticks(10)
    .orient("left")
    .tickSize(1);

  let popover = d3.tip()
    .attr('class', 'd3-popover')
    .offset([-10, 0])
    .html(d => {
      let image_url = "https://s3.us-east-2.amazonaws.com/catalyst-thumbnails/" +
      d._id + "-" + selectFormulaName(d) + "-side.png";
      let info =
        "<h2>" + selectFormulaName(d) + "</h2>" +
        "<img src='https://s3.us-east-2.amazonaws.com/catalyst-thumbnails/" + selectMongoID(d) + "-CO.png'>" +
        // "<img src='https://s3.us-east-2.amazonaws.com/catalyst-thumbnails/'" +
          // d._id + + "-" + selectFormulaName(d) + ".png'>" +
        "<p><strong>MPID:</strong> " + selectMPID(d) + "</p>" +
        "<p><strong>Miller Index:</strong> " + selectMiller(d) + "</p>" +
        "<p><strong>Top:</strong> " + selectTop(d) + "</p>" +
        "<p><strong>Coordination:</strong> " + selectCoordination(d) + "</p>"
      return info;
    });

  svg.call(popover);

  svg.append('g')
    .attr("transform", "translate(0,600)")
    .attr('class', 'x-axis')
    .call(xAxis);

  let xAxisHeight = document.getElementsByClassName("x-axis")[0].getBoundingClientRect().top -
    document.getElementById("graph").getBoundingClientRect().top;

  svg.append('g')
    .attr('class', 'y-axis')
    .call(yAxis);

  let datapoints = svg.append("g").selectAll('circle')
    .data(currentData)
    .enter();

  let datapointObj = datapoints.append("circle")
    .attr("cx", v => scaleX(selectX(v)))
    .attr("cy", v => {
      return scaleY(selectY(v)) + 10;
    })
    .attr("r", v => {
      if (favoritePoints.hasOwnProperty(v.mongo_id)) {
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
      if (!favoritePoints.hasOwnProperty(d.mongo_id)) {
        favoritePoints[d.mongo_id] = d;
      }
      document.getElementById("selectedPoints").innerHTML = renderSavedPoints();
      document.getElementsByClassName('inner-box')[2].classList.remove('hidden');
      document.getElementsByClassName('box')[2].classList.add('opened');
      drawGraph();
    });

  svg.append("text")
    .attr("class", "x-axis-label")
    .attr("text-anchor", "middle")
    .attr("x", width/2)
    .attr("y", xAxisHeight + 40)
    .attr("font-size", 20)
    .text("Gh (eV)");

};

drawGraph();
