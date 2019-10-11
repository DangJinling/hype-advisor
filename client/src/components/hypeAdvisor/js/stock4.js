var myData4 = "date,S&P500,NASDAQ,DJI\n20190117,2635.96,7084.46,24370.10\n20190122,2632.90,7020.36,24404.48\n20190127,2643.85,7085.69,24528.22\n20190201,2706.53,7263.87,25063.89\n20190206,2731.61,7375.28,25390.30\n20190211,2709.80,7307.91,25053.11\n20190216,2775.60,7472.41,25439.39\n20190221,2774.88,7489.07,25850.63\n20190226,2793.90,7543.30,26057.98\n20190301,2803.69,7595.35,26026.32\n20190305,2789.65,7576.36,25806.63\n20190310,2783.30,7558.06,25650.88\n20190315,2822.48,7688.53,25848.87\n20190320,2824.23,7728.97,25745.67\n20190325,2798.36,7637.54,25516.83\n20190330,2834.40,7729.32,25921.68\n20190404,2879.39,7891.78,26384.63\n20190409,2878.20,7909.28,26150.58\n20190414,2905.58,7976.01,26384.77\n20190419,2905.03,7998.06,26449.54\n20190424,2927.25,8102.02,26597.05\n20190429,2943.03,8161.85,26554.39\n20190504,2945.64,8164.00,26504.95\n20190509,2870.72,7910.59,25828.36\n20190514,2834.41,7734.49,25532.05\n20190519,2840.23,7702.38,25679.90\n20190524,2826.06,7637.01,25490.47\n20190529,2783.02,7547.31,25126.41\n20190603,2744.45,7333.02,24819.78\n20190608,2873.34,7742.10,25983.94\n20190613,2891.64,7837.13,26106.77\n20190618,2917.75,7953.88,26465.54\n20190623,2945.35,8005.70,26727.54\n20190628,2995.82,8006.24,26599.96\n20190703,2995.82,8170.23,26786.68\n20190708,2975.95,8098.38,26806.14\n20190713,3013.77,8244.14,27332.03\n20190718,2995.11,8185.21,27222.97";
var default_width4 = 250;
var default_height4 = 280;
var default_ratio4 = default_width4 / default_height4;

var margin4 = {
        top: 30,
        right: 30,
        bottom: 60,
        left: 40
    },
    width4 = default_width4 - margin4.left - margin4.right,
    height4 = default_height4 - margin4.top - margin4.bottom;

function scale() {
  if (window.innerWidth > 1300) {
    current_width4 = window.innerWidth * 0.21;
    current_height4 = window.innerWidth * 0.21;
  } else if (window.innerWidth > 600) {
    current_width4 = window.innerWidth * 0.23;
    current_height4 = window.innerWidth * 0.23;
  } else {
    current_width4 = window.innerWidth * 0.45;
    current_height4 = window.innerWidth * 0.45;
  }

  current_ratio4 = current_width4 / current_height4;

  if ( current_ratio4 > default_ratio4 ){
    h = current_height4;
    w = h * default_ratio4;
  } else {
    w = current_width4;
    h = w / default_ratio4;
  }

  width4 = w - margin4.left - margin4.right;
  height4 = h - margin4.top - margin4.bottom;

};

scale();

var parseDate = d3.time.format("%Y%m%d").parse;

var x4 = d3.time.scale()
    .range([0, width4]);

var y4 = d3.scale.linear()
    .range([height4, 0]);

var color4 = d3.scale.ordinal().range(["#C11C23", "#D54237", "#E5634F"])

var xAxis4 = d3.svg.axis()
    .scale(x4)
    .orient("bottom");

var yAxis4 = d3.svg.axis()
    .scale(y4)
    .orient("left");

var line4 = d3.svg.line()
    .interpolate("basis")
    .x(function(d) {
        return x4(d.date);
    })
    .y(function(d) {
        return y4(d.price);
    });

var svg4 = d3.select("#stock3").append("svg")
    .attr("width", width4 + margin4.left + margin4.right)
    .attr("height", height4 + margin4.top + margin4.bottom)
    .style("fill", "white")
    .append("g")
    .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");

var data4 = d3.csv.parse(myData4)

color4.domain(d3.keys(data4[0]).filter(function(key) {

    return key !== "date";
}));

data4.forEach(function(d) {
    d.date = parseDate(d.date);
});

var cities4 = color4.domain().map(function(name) {
    return {
        name: name,
        values: data4.map(function(d) {
            return {
                date: d.date,
                price: +d[name]
            };
        })
    };
});

x4.domain(d3.extent(data4, function(d) {
    return d.date;
}));

y4.domain([
    d3.min(cities4, function(c) {
        return d3.min(c.values, function(v) {
            return v.price;
        });
    }),
    d3.max(cities4, function(c) {
        return d3.max(c.values, function(v) {
            return v.price;
        });
    })
]);

var legend4 = svg4.selectAll('g')
    .data(cities4)
    .enter()
    .append('g')
    .attr('class', 'legend4')


legend4.append('rect')
    .attr('x', width4 - 25)
    .attr('y', function(d, i) {
        return i * 20;
    })
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', function(d) {
        return color4(d.name);
    });

legend4.append('text')
    .attr('x', width4 - 10)
    .attr('y', function(d, i) {
        return (i * 20) + 9;
    }).attr('fill', 'white')
    .text(function(d) {
        return d.name;
    });

svg4.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height4 + ")")
    .style("fill", "white")
    .call(xAxis4);

svg4.append("g")
    .attr("class", "y axis")
    .call(yAxis4)

svg4.append("text")
        .attr("x", (width4 / 2))             
        .attr("y", 0 - (margin4.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", width4 / 15) 
        .text("Stock Prices (Indices)");

svg4.append("text")
        .attr("x", (width4 / 2))             
        .attr("y", height4 + 40)
        .attr("text-anchor", "middle")  
        .style("font-size", width4 / 15) 
        .text("S&P: 12.5%, NASDAQ: 16.04%, DJI: 11.27%");

var city4 = svg4.selectAll(".city4")
    .data(cities4)
    .enter().append("g")
    .attr("class", "city4");

city4.append("path")
    .attr("class", "line4")
    .attr("d", function(d) {
        return line4(d.values);
    })
    .style("stroke", function(d) {
        return color4(d.name);
    });

city4.append("text")
    .datum(function(d) {
        return {
            name: d.name,
            value: d.values[d.values.length - 1]
        };
    }).attr('fill', 'white')
    .attr("transform", function(d) {
        console.log(d.value.date)
        return "translate(" + x(d.value.date) + "," + y(d.value.price) + ")";
    })
    .attr("x", 3)
    .attr("dy", ".35em").attr('fill', 'white')
    .text(function(d) {
        return d.name;
    }).attr('fill', 'white');

var mouseG4 = svg4.append("g")
    .attr("class", "mouse-over-effects");

mouseG4.append("path") // this is the black vertical line4 to follow mouse
    .attr("class", "mouse-line4")
    .style("stroke", "white")
    .style("stroke-width4", "1px")
    .style("opacity", "0");

var line4s = document.getElementsByClassName('line4');

var mousePerline4 = mouseG4.selectAll('.mouse-per-line4')
    .data(cities4)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line4");

mousePerline4.append("circle")
    .attr("r", 5)
    .style("stroke", function(d) {
        return color4(d.name);
    })
    .style("fill", "none")
    .style("stroke-width4", "1px")
    .style("opacity", "0");

mousePerline4.append("text")
    .attr("transform", "translate(10,3)")
    .attr('fill', 'white');

mouseG4.append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width4) // can't catch mouse events on a g element
    .attr('height', height4)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function() { // on mouse out hide line4, circles and text
        d3.select(".mouse-line4")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line4 circle")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line4 text")
            .style("opacity", "0");

    })
    .on('mouseover', function() { // on mouse in show line4, circles and text
        d3.select(".mouse-line4")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line4 circle")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line4 text")
            .style("opacity", "1");
    })
    .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line4")
            .attr("d", function() {
                var d = "M" + mouse[0] + "," + height4;
                d += " " + mouse[0] + "," + 0;
                return d;
            });

        d3.selectAll(".mouse-per-line4")
            .attr("transform", function(d, i) {
                console.log(width4 / mouse[0])
                var xDate = x4.invert(mouse[0]),
                    bisect = d3.bisector(function(d) {
                        return d.date;
                    }).right;
                idx = bisect(d.values, xDate);

                var beginning = 0,
                    end = line4s[i].getTotalLength(),
                    target = null;

                while (true) {
                    target = Math.floor((beginning + end) / 2);
                    pos = line4s[i].getPointAtLength(target);
                    if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                        break;
                    }
                    if (pos.x > mouse[0]) end = target;
                    else if (pos.x < mouse[0]) beginning = target;
                    else break; //position found
                }

                d3.select(this).select('text')
                    .text(y4.invert(pos.y).toFixed(2));


                return "translate(" + mouse[0] + "," + pos.y + ")";
            });
    });