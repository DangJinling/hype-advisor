var myData3 = "date,VWAPY,TM,TSLA\n20190117,16.30,124.92,347.31\n20190122,16.17,123.60,298.92\n20190127,17.11,122.48,296.38\n20190201,17.05,122.00,312.21\n20190206,16.94,121.05,317.22\n20190211,15.86,117.15,312.84\n20190216,16.28,121.15,307.88\n20190221,16.52,121.24,291.23\n20190226,17.18,123.23,297.86\n20190301,17.49,120.34,294.79\n20190305,17.40,118.26,276.54\n20190310,16.51,119.13,290.92\n20190315,16.24,118.97,275.43\n20190320,16.51,119.67,273.60\n20190325,15.78,120.49,260.42\n20190330,15.73,118.02,279.86\n20190404,16.78,122.08,267.78\n20190409,16.58,122.06,272.31\n20190414,17.45,121.97,266.38\n20190419,17.37,125.16,273.26\n20190424,17.52,122.88,258.66\n20190429,17.46,123.81,241.47\n20190504,17.96,123.65,255.03\n20190509,17.20,119.32,241.98\n20190514,16.70,119.07,232.31\n20190519,16.13,118.11,205.36\n20190524,15.99,118.55,190.63\n20190529,15.97,119.55,189.86\n20190603,15.64,118.13,178.97\n20190608,16.05,122.39,204.50\n20190613,16.03,124.79,213.91\n20190618,16.01,125.37,224.74\n20190623,16.66,124.79,223.64\n20190628,16.81,123.99,223.46\n20190703,17.32,126.83,234.90\n20190708,17.33,126.87,230.34\n20190713,17.23,127.71,245.08\n20190718,17.05,129.81,253.54";
var default_width3 = 250;
var default_height3 = 280;
var default_ratio3 = default_width3 / default_height3;

var margin3 = {
        top: 30,
        right: 30,
        bottom: 60,
        left: 30
    },
    width3 = default_width3 - margin3.left - margin3.right,
    height3 = default_height3 - margin3.top - margin3.bottom;

function scale() {
  if (window.innerWidth > 1300) {
    current_width3 = window.innerWidth * 0.21;
    current_height3 = window.innerWidth * 0.21;
  } else if (window.innerWidth > 600) {
    current_width3 = window.innerWidth * 0.23;
    current_height3 = window.innerWidth * 0.23;
  } else {
    current_width3 = window.innerWidth * 0.45;
    current_height3 = window.innerWidth * 0.45;
  }

  current_ratio3 = current_width3 / current_height3;

  if ( current_ratio3 > default_ratio3 ){
    h = current_height3;
    w = h * default_ratio3;
  } else {
    w = current_width3;
    h = w / default_ratio3;
  }

  width3 = w - margin3.left - margin3.right;
  height3 = h - margin3.top - margin3.bottom;

};

scale();

var parseDate = d3.time.format("%Y%m%d").parse;

var x3 = d3.time.scale()
    .range([0, width3]);

var y3 = d3.scale.linear()
    .range([height3, 0]);

var color3 = d3.scale.category20b();

var xAxis3 = d3.svg.axis()
    .scale(x3)
    .orient("bottom");

var yAxis3 = d3.svg.axis()
    .scale(y3)
    .orient("left");

var line3 = d3.svg.line()
    .interpolate("basis")
    .x(function(d) {
        return x3(d.date);
    })
    .y(function(d) {
        return y3(d.price);
    });

var svg3 = d3.select("#stock3").append("svg")
    .attr("width", width3 + margin3.left + margin3.right)
    .attr("height", height3 + margin3.top + margin3.bottom)
    .style("fill", "white")
    .append("g")
    .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

var data3 = d3.csv.parse(myData3)

color3.domain(d3.keys(data3[0]).filter(function(key) {

    return key !== "date";
}));

data3.forEach(function(d) {
    d.date = parseDate(d.date);
});

var cities3 = color3.domain().map(function(name) {
    return {
        name: name,
        values: data3.map(function(d) {
            return {
                date: d.date,
                price: +d[name]
            };
        })
    };
});

x3.domain(d3.extent(data3, function(d) {
    return d.date;
}));

y3.domain([
    d3.min(cities3, function(c) {
        return d3.min(c.values, function(v) {
            return v.price;
        });
    }),
    d3.max(cities3, function(c) {
        return d3.max(c.values, function(v) {
            return v.price;
        });
    })
]);

var legend3 = svg3.selectAll('g')
    .data(cities3)
    .enter()
    .append('g')
    .attr('class', 'legend3')


legend3.append('rect')
    .attr('x', width3 - 25)
    .attr('y', function(d, i) {
        return i * 20;
    })
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', function(d) {
        return color3(d.name);
    });

legend3.append('text')
    .attr('x', width3 - 10)
    .attr('y', function(d, i) {
        return (i * 20) + 9;
    }).attr('fill', 'white')
    .text(function(d) {
        return d.name;
    });

svg3.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height3 + ")")
    .style("fill", "white")
    .call(xAxis3);

svg3.append("g")
    .attr("class", "y axis")
    .call(yAxis3)

svg3.append("text")
        .attr("x", (width3 / 2))             
        .attr("y", 0 - (margin3.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", width3 / 15) 
        .text("Stock Prices (Automotive)");

svg3.append("text")
        .attr("x", (width3 / 2))             
        .attr("y", height3 + 40)
        .attr("text-anchor", "middle")  
        .style("font-size", width3 / 15) 
        .text("TSLA: -15.68%, VYAPM: 4.7% TM: 3.2%");

var city3 = svg3.selectAll(".city3")
    .data(cities3)
    .enter().append("g")
    .attr("class", "city3");

city3.append("path")
    .attr("class", "line3")
    .attr("d", function(d) {
        return line3(d.values);
    })
    .style("stroke", function(d) {
        return color3(d.name);
    });

city3.append("text")
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

var mouseG3 = svg3.append("g")
    .attr("class", "mouse-over-effects");

mouseG3.append("path") // this is the black vertical line3 to follow mouse
    .attr("class", "mouse-line3")
    .style("stroke", "white")
    .style("stroke-width3", "1px")
    .style("opacity", "0");

var line3s = document.getElementsByClassName('line3');

var mousePerline3 = mouseG3.selectAll('.mouse-per-line3')
    .data(cities3)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line3");

mousePerline3.append("circle")
    .attr("r", 5)
    .style("stroke", function(d) {
        return color3(d.name);
    })
    .style("fill", "none")
    .style("stroke-width3", "1px")
    .style("opacity", "0");

mousePerline3.append("text")
    .attr("transform", "translate(10,3)")
    .attr('fill', 'white');

mouseG3.append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width3) // can't catch mouse events on a g element
    .attr('height', height3)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function() { // on mouse out hide line3, circles and text
        d3.select(".mouse-line3")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line3 circle")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line3 text")
            .style("opacity", "0");

    })
    .on('mouseover', function() { // on mouse in show line3, circles and text
        d3.select(".mouse-line3")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line3 circle")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line3 text")
            .style("opacity", "1");
    })
    .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line3")
            .attr("d", function() {
                var d = "M" + mouse[0] + "," + height3;
                d += " " + mouse[0] + "," + 0;
                return d;
            });

        d3.selectAll(".mouse-per-line3")
            .attr("transform", function(d, i) {
                console.log(width3 / mouse[0])
                var xDate = x3.invert(mouse[0]),
                    bisect = d3.bisector(function(d) {
                        return d.date;
                    }).right;
                idx = bisect(d.values, xDate);

                var beginning = 0,
                    end = line3s[i].getTotalLength(),
                    target = null;

                while (true) {
                    target = Math.floor((beginning + end) / 2);
                    pos = line3s[i].getPointAtLength(target);
                    if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                        break;
                    }
                    if (pos.x > mouse[0]) end = target;
                    else if (pos.x < mouse[0]) beginning = target;
                    else break; //position found
                }

                d3.select(this).select('text')
                    .text(y3.invert(pos.y).toFixed(2));


                return "translate(" + mouse[0] + "," + pos.y + ")";
            });
    });