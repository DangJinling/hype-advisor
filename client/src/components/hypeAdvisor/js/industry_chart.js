var myData0 = "date,Yeezy v2 Cream (Size 6),Travis Scott Jordan 4 (Size 12),Serena OW AM97 (Size 10)\n20190117,292.00,408.00,900.00\n20190122,294.00,416.00,900.00\n20190127,305.00,429.00,915.00\n20190201,298.00,435.00,890.00\n20190206,294.00,426.00,915.00\n20190206,294.00,426.00,915.00\n20190211,293.00,434.00,915.00\n20190216,299.00,475.00,950.00\n20190221,311.00,462.00,950.00\n20190226,354.00,483.00,950.00\n20190301,364.00,450.00,950.00\n20190305,358.00,473.00,950.00\n20190310,355.00,476.00,910.00\n20190315,358.00,500.00,999.00\n20190320,365.00,487.00,999.00\n20190325,377.00,495.00,999.00\n20190330,383.00,474.00,999.00\n20190404,377.00,488.00,1000.00\n20190409,375.00,515.00,907.00\n20190414,377.00,520.00,1080.00\n20190419,358.00,485.00,1080.00\n20190424,355.00,481.00,1080.00\n20190429,351.00,513.00,1035.00\n20190504,360.00,503.00,1121.00\n20190509,367.00,516.00,1113.00\n20190514,368.00,528.00,1141.00\n20190519,367.00,544.00,1063.00\n20190524,375.00,504.00,1095.00\n20190529,391.00,520.00,1134.00\n20190603,376.00,529.00,1134.00\n20190608,393.00,541.00,1134.00\n20190613,394.00,526.00,1150.00\n20190618,395.00,505.00,1150.00\n20190623,388.00,540.00,1150.00\n20190628,400.00,547.00,1150.00\n20190703,415.00,559.00,1200.00\n20190708,419.00,537.00,1200.00\n20190713,408.00,549.00,1200.0\n20190718,418.00,553.00,1200.00";
var default_width0 = 600;
var default_height0 = 620;
var default_ratio0 = default_width0 / default_height0;

var margin0 = {
        top: 40,
        right: 30,
        bottom: 70,
        left: 30
    },
    width0 = default_width0 - margin0.left - margin0.right,
    height0 = default_height0 - margin0.top - margin0.bottom;

function scale() {
  if (window.innerWidth > 1300) {
    current_width0 = window.innerWidth * 0.42;
    current_height0 = window.innerWidth * 0.42;
  } else if (window.innerWidth > 600) {
    current_width0 = window.innerWidth * 0.46;
    current_height0 = window.innerWidth * 0.46;
  } else {
    current_width0 = window.innerWidth * 0.9;
    current_height0 = window.innerWidth * 0.9;
  }

  current_ratio0 = current_width0 / current_height0;

  if ( current_ratio0 > default_ratio0 ){
    h = current_height0;
    w = h * default_ratio0;
  } else {
    w = current_width0;
    h = w / default_ratio0;
  }

  width0 = w - margin0.left - margin0.right;
  height0 = h - margin0.top - margin0.bottom;

};

scale();

var parseDate = d3.time.format("%Y%m%d").parse;

var x0 = d3.time.scale()
    .range([0, width0]);

var y0 = d3.scale.linear()
    .range([height0, 0]);

var color0 = d3.scale.ordinal().range(['#1C5E15', '#2E8223', '#42A733']);

var xAxis0 = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis0 = d3.svg.axis()
    .scale(y0)
    .orient("left");

var line0 = d3.svg.line()
    .interpolate("basis")
    .x(function(d) {
        return x0(d.date);
    })
    .y(function(d) {
        return y0(d.price);
    });

var svg0 = d3.select("#industry_chart").append("svg")
    .attr("width", width0 + margin0.left + margin0.right)
    .attr("height", height0 + margin0.top + margin0.bottom)
    .style("fill", "white")
    .append("g")
    .attr("transform", "translate(" + margin0.left + "," + margin0.top + ")");

var data0 = d3.csv.parse(myData0)

color0.domain(d3.keys(data0[0]).filter(function(key) {

    return key !== "date";
}));

data0.forEach(function(d) {
    d.date = parseDate(d.date);
});

var cities0 = color0.domain().map(function(name) {
    return {
        name: name,
        values: data0.map(function(d) {
            return {
                date: d.date,
                price: +d[name]
            };
        })
    };
});

x0.domain(d3.extent(data0, function(d) {
    return d.date;
}));

y0.domain([
    d3.min(cities0, function(c) {
        return d3.min(c.values, function(v) {
            return v.price;
        });
    }),
    d3.max(cities0, function(c) {
        return d3.max(c.values, function(v) {
            return v.price;
        });
    })
]);

var legend0 = svg0.selectAll('g')
    .data(cities0)
    .enter()
    .append('g')
    .attr('class', 'legend0')


legend0.append('rect')
    .attr('x', width0 - 110)
    .attr('y', function(d, i) {
        return i * 20;
    })
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', function(d) {
        return color0(d.name);
    });

legend0.append('text')
    .attr('x', width0 - 95)
    .attr('y', function(d, i) {
        return (i * 20) + 9;
    }).attr('fill', 'white')
    .text(function(d) {
        return d.name;
    });

svg0.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height0 + ")")
    .style("fill", "white")
    .call(xAxis0);

svg0.append("g")
    .attr("class", "y axis")
    .call(yAxis0)

svg0.append("text")
    .attr("x", (width0 / 2))             
    .attr("y", 0 - (margin0.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", width0 / 30) 
    .text("Price (USD) over Time: Streetwear (Sneakers)");

svg0.append("text")
    .attr("x", (width0 / 2))             
    .attr("y", height0 + 60)
    .attr("text-anchor", "middle")  
    .style("font-size", width0 / 30) 
    .text("Yeezy: 33.93% Return on Investment (ROI), AJ4: 19.42%, AM97: 22.67%");

var city0 = svg0.selectAll(".city0")
    .data(cities0)
    .enter().append("g")
    .attr("class", "city0");

city0.append("path")
    .attr("class", "line0")
    .attr("d", function(d) {
        return line0(d.values);
    })
    .style("stroke", function(d) {
        return color0(d.name);
    });

city0.append("text")
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

var mouseG0 = svg0.append("g")
    .attr("class", "mouse-over-effects");

mouseG0.append("path") // this is the black vertical line0 to follow mouse
    .attr("class", "mouse-line0")
    .style("stroke", "white")
    .style("stroke-width0", "1px")
    .style("opacity", "0");

var line0s = document.getElementsByClassName('line0');

var mousePerline0 = mouseG0.selectAll('.mouse-per-line0')
    .data(cities0)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line0");

mousePerline0.append("circle")
    .attr("r", 5)
    .style("stroke", function(d) {
        return color0(d.name);
    })
    .style("fill", "none")
    .style("stroke-width0", "1px")
    .style("opacity", "0");

mousePerline0.append("text")
    .attr("transform", "translate(10,3)")
    .attr('fill', 'white');

mouseG0.append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width0) // can't catch mouse events on a g element
    .attr('height', height0)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function() { // on mouse out hide line0, circles and text
        d3.select(".mouse-line0")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line0 circle")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line0 text")
            .style("opacity", "0");

    })
    .on('mouseover', function() { // on mouse in show line0, circles and text
        d3.select(".mouse-line0")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line0 circle")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line0 text")
            .style("opacity", "1");
    })
    .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line0")
            .attr("d", function() {
                var d = "M" + mouse[0] + "," + height0;
                d += " " + mouse[0] + "," + 0;
                return d;
            });

        d3.selectAll(".mouse-per-line0")
            .attr("transform", function(d, i) {
                console.log(width0 / mouse[0])
                var xDate = x0.invert(mouse[0]),
                    bisect = d3.bisector(function(d) {
                        return d.date;
                    }).right;
                idx = bisect(d.values, xDate);

                var beginning = 0,
                    end = line0s[i].getTotalLength(),
                    target = null;

                while (true) {
                    target = Math.floor((beginning + end) / 2);
                    pos = line0s[i].getPointAtLength(target);
                    if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                        break;
                    }
                    if (pos.x > mouse[0]) end = target;
                    else if (pos.x < mouse[0]) beginning = target;
                    else break; //position found
                }

                d3.select(this).select('text')
                    .text(y0.invert(pos.y).toFixed(2));


                return "translate(" + mouse[0] + "," + pos.y + ")";
            });
    });