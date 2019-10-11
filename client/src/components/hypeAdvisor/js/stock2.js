var myData2 = "date,NVS,JNJ,ROG\n20190117,77.81,129.09,257.15\n20190122,77.54,128.80,257.00\n20190127,75.19,128.99,253.85\n20190201,76.96,134.20,263.00\n20190206,78.13,133.00,268.35\n20190211,77.36,132.00,270.15\n20190216,78.91,136.38,272.55\n20190221,79.46,135.42,277.05\n20190226,80.32,136.11,278.90\n20190301,80.24,138.35,276.95\n20190305,78.84,138.77,279.15\n20190310,79.07,138.56,271.20\n20190315,81.90,137.60,271.65\n20190320,82.07,137.29,270.85\n20190325,81.92,136.61,268.75\n20190330,84.40,139.79,274.35\n20190404,82.72,135.57,273.85\n20190409,83.41,135.57,275.00\n20190414,80.96,136.52,269.00\n20190419,76.41,137.52,263.40\n20190424,77.82,139.20,266.95\n20190429,81.13,139.84,266.50\n20190504,82.61,142.01,269.30\n20190509,80.98,138.73,260.00\n20190514,80.73,136.82,258.15\n20190519,82.01,138.42,265.95\n20190524,87.52,138.85,271.20\n20190529,85.81,131.33,264.00\n20190603,87.66,131.44,264.20\n20190608,88.06,138.55,269.40\n20190613,89.59,140.71,276.30\n20190618,91.30,140.23,278.85\n20190623,92.80,143.06,276.25\n20190628,91.31,139.28,274.65\n20190703,92.50,142.14,281.45\n20190708,90.74,140.97,276.65\n20190713,88.19,134.30,262.70\n20190718,94.26,132.07,271.20";
var default_width2 = 250;
var default_height2 = 280;
var default_ratio2 = default_width2 / default_height2;

var margin2 = {
        top: 30,
        right: 30,
        bottom: 60,
        left: 30
    },
    width2 = default_width2 - margin2.left - margin2.right,
    height2 = default_height2 - margin2.top - margin2.bottom;

function scale() {
  if (window.innerWidth > 1300) {
    current_width2 = window.innerWidth * 0.21;
    current_height2 = window.innerWidth * 0.21;
  } else if (window.innerWidth > 600) {
    current_width2 = window.innerWidth * 0.23;
    current_height2 = window.innerWidth * 0.23;
  } else {
    current_width2 = window.innerWidth * 0.45;
    current_height2 = window.innerWidth * 0.45;
  }

  current_ratio2 = current_width2 / current_height2;

  if ( current_ratio2 > default_ratio2 ){
    h = current_height2;
    w = h * default_ratio2;
  } else {
    w = current_width2;
    h = w / default_ratio2;
  }

  width2 = w - margin2.left - margin2.right;
  height2 = h - margin2.top - margin2.bottom;

};

scale();

var parseDate = d3.time.format("%Y%m%d").parse;

var x2 = d3.time.scale()
    .range([0, width2]);

var y2 = d3.scale.linear()
    .range([height2, 0]);

var color2 = d3.scale.ordinal().range(["#D9B518", "#D0B155", "#C3AD7D"])


var xAxis2 = d3.svg.axis()
    .scale(x2)
    .orient("bottom");

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("left");

var line2 = d3.svg.line()
    .interpolate("basis")
    .x(function(d) {
        return x2(d.date);
    })
    .y(function(d) {
        return y2(d.price);
    });

var svg2 = d3.select("#stock2").append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .style("fill", "white")
    .append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

var data2 = d3.csv.parse(myData2)

color2.domain(d3.keys(data2[0]).filter(function(key) {

    return key !== "date";
}));

data2.forEach(function(d) {
    d.date = parseDate(d.date);
});

var cities2 = color2.domain().map(function(name) {
    return {
        name: name,
        values: data2.map(function(d) {
            return {
                date: d.date,
                price: +d[name]
            };
        })
    };
});

x2.domain(d3.extent(data2, function(d) {
    return d.date;
}));

y2.domain([
    d3.min(cities2, function(c) {
        return d3.min(c.values, function(v) {
            return v.price;
        });
    }),
    d3.max(cities2, function(c) {
        return d3.max(c.values, function(v) {
            return v.price;
        });
    })
]);

var legend2 = svg2.selectAll('g')
    .data(cities2)
    .enter()
    .append('g')
    .attr('class', 'legend2')


legend2.append('rect')
    .attr('x', width2 - 25)
    .attr('y', function(d, i) {
        return i * 20;
    })
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', function(d) {
        return color2(d.name);
    });

legend2.append('text')
    .attr('x', width2 - 10)
    .attr('y', function(d, i) {
        return (i * 20) + 9;
    }).attr('fill', 'white')
    .text(function(d) {
        return d.name;
    });

svg2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height2 + ")")
    .style("fill", "white")
    .call(xAxis2);

svg2.append("g")
    .attr("class", "y axis")
    .call(yAxis2)

svg2.append("text")
        .attr("x", (width2 / 2))             
        .attr("y", 0 - (margin2.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", width2 / 15) 
        .text("Stock Prices (Biotech)");

svg2.append("text")
        .attr("x", (width2 / 2))             
        .attr("y", height2 + 40)
        .attr("text-anchor", "middle")  
        .style("font-size", width2 / 15) 
        .text("JNJ: 0.9%, ROG: 4.2%, NVS: 15.5%");

var city2 = svg2.selectAll(".city2")
    .data(cities2)
    .enter().append("g")
    .attr("class", "city2");

city2.append("path")
    .attr("class", "line2")
    .attr("d", function(d) {
        return line2(d.values);
    })
    .style("stroke", function(d) {
        return color2(d.name);
    });

city2.append("text")
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

var mouseG2 = svg2.append("g")
    .attr("class", "mouse-over-effects");

mouseG2.append("path") // this is the black vertical line2 to follow mouse
    .attr("class", "mouse-line2")
    .style("stroke", "white")
    .style("stroke-width2", "1px")
    .style("opacity", "0");

var line2s = document.getElementsByClassName('line2');

var mousePerline2 = mouseG2.selectAll('.mouse-per-line2')
    .data(cities2)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line2");

mousePerline2.append("circle")
    .attr("r", 5)
    .style("stroke", function(d) {
        return color2(d.name);
    })
    .style("fill", "none")
    .style("stroke-width2", "1px")
    .style("opacity", "0");

mousePerline2.append("text")
    .attr("transform", "translate(10,3)")
    .attr('fill', 'white');

mouseG2.append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width2) // can't catch mouse events on a g element
    .attr('height', height2)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function() { // on mouse out hide line2, circles and text
        d3.select(".mouse-line2")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line2 circle")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line2 text")
            .style("opacity", "0");

    })
    .on('mouseover', function() { // on mouse in show line2, circles and text
        d3.select(".mouse-line2")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line2 circle")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line2 text")
            .style("opacity", "1");
    })
    .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line2")
            .attr("d", function() {
                var d = "M" + mouse[0] + "," + height2;
                d += " " + mouse[0] + "," + 0;
                return d;
            });

        d3.selectAll(".mouse-per-line2")
            .attr("transform", function(d, i) {
                console.log(width2 / mouse[0])
                var xDate = x2.invert(mouse[0]),
                    bisect = d3.bisector(function(d) {
                        return d.date;
                    }).right;
                idx = bisect(d.values, xDate);

                var beginning = 0,
                    end = line2s[i].getTotalLength(),
                    target = null;

                while (true) {
                    target = Math.floor((beginning + end) / 2);
                    pos = line2s[i].getPointAtLength(target);
                    if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                        break;
                    }
                    if (pos.x > mouse[0]) end = target;
                    else if (pos.x < mouse[0]) beginning = target;
                    else break; //position found
                }

                d3.select(this).select('text')
                    .text(y2.invert(pos.y).toFixed(2));


                return "translate(" + mouse[0] + "," + pos.y + ")";
            });
    });