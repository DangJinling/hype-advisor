var myData1 = "date,MSFT,AAPL,GOOGL\n20190117,106.12,155.86,1099.12\n20190122,105.68,153.30,1078.63\n20190127,105.08,156.30,1079.86\n20190201,102.78,166.52,1118.62\n20190206,106.03,174.24,1122.89\n20190211,105.25,169.43,1102.12\n20190216,108.22,170.42,1119.63\n20190221,109.41,171.06,1104.21\n20190226,112.36,174.33,1122.01\n20190301,112.53,174.97,1148.52\n20190305,111.75,174.52,1169.19\n20190310,112.83,178.90,1179.26\n20190315,115.91,186.12,1190.30\n20190320,117.52,188.16,1226.43\n20190325,117.66,188.74,1197.38\n20190330,117.94,189.95,1185.48\n20190404,119.36,195.69,1219.45\n20190409,119.28,199.50,1208.28\n20190414,121.05,199.23,1226.53\n20190419,123.37,203.86,1241.47\n20190424,125.01,207.16,1260.05\n20190429,129.77,204.61,1296.20\n20190504,128.90,211.75,1189.55\n20190509,125.50,200.72,1167.96\n20190514,124.73,188.66,1124.86\n20190519,126.22,183.09,1144.66\n20190524,126.24,178.97,1138.61\n20190529,124.94,177.38,1119.94\n20190603,119.84,173.30,1038.74\n20190608,131.40,190.15,1068.37\n20190613,132.32,194.15,1091.01\n20190618,135.16,198.45,1105.24\n20190623,137.78,198.58,1116.70\n20190628,133.96,197.92,1082.80\n20190703,137.46,204.41,1122.99\n20190708,136.96,200.02,1116.79\n20190713,138.90,203.30,1145.34\n20190718,136.42,205.66,1147.24";
var default_width1 = 250;
var default_height1 = 280;
var default_ratio1 = default_width1 / default_height1;

var margin1 = {
        top: 30,
        right: 30,
        bottom: 60,
        left: 30
    },
    width1 = default_width1 - margin1.left - margin1.right,
    height1 = default_height1 - margin1.top - margin1.bottom;

function scale() {
  if (window.innerWidth > 1300) {
    current_width1 = window.innerWidth * 0.21;
    current_height1 = window.innerWidth * 0.21;
  } else if (window.innerWidth > 600) {
    current_width1 = window.innerWidth * 0.23;
    current_height1 = window.innerWidth * 0.23;
  } else {
    current_width1 = window.innerWidth * 0.45;
    current_height1 = window.innerWidth * 0.45;
  }

  current_ratio1 = current_width1 / current_height1;

  if ( current_ratio1 > default_ratio1 ){
    h = current_height1;
    w = h * default_ratio1;
  } else {
    w = current_width1;
    h = w / default_ratio1;
  }

  width1 = w - margin1.left - margin1.right;
  height1 = h - margin1.top - margin1.bottom;

};

scale();

var parseDate = d3.time.format("%Y%m%d").parse;

var x1 = d3.time.scale()
    .range([0, width1]);

var y1 = d3.scale.linear()
    .range([height1, 0]);

var color1 = d3.scale.category20c();


var xAxis1 = d3.svg.axis()
    .scale(x1)
    .orient("bottom");

var yAxis1 = d3.svg.axis()
    .scale(y1)
    .orient("left");

var line1 = d3.svg.line()
    .interpolate("basis")
    .x(function(d) {
        return x1(d.date);
    })
    .y(function(d) {
        return y1(d.price);
    });

var svg1 = d3.select("#stock1").append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
    .style("fill", "white")
    .append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

var data1 = d3.csv.parse(myData1)

color1.domain(d3.keys(data1[0]).filter(function(key) {

    return key !== "date";
}));

data1.forEach(function(d) {
    d.date = parseDate(d.date);
});

var cities1 = color1.domain().map(function(name) {
    return {
        name: name,
        values: data1.map(function(d) {
            return {
                date: d.date,
                price: +d[name]
            };
        })
    };
});

x1.domain(d3.extent(data1, function(d) {
    return d.date;
}));

y1.domain([
    d3.min(cities1, function(c) {
        return d3.min(c.values, function(v) {
            return v.price;
        });
    }),
    d3.max(cities1, function(c) {
        return d3.max(c.values, function(v) {
            return v.price;
        });
    })
]);

var legend1 = svg1.selectAll('g')
    .data(cities1)
    .enter()
    .append('g')
    .attr('class', 'legend1')


legend1.append('rect')
    .attr('x', width1 - 25)
    .attr('y', function(d, i) {
        return i * 20;
    })
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', function(d) {
        return color1(d.name);
    });

legend1.append('text')
    .attr('x', width1 - 10)
    .attr('y', function(d, i) {
        return (i * 20) + 9;
    }).attr('fill', 'white')
    .text(function(d) {
        return d.name;
    });

svg1.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height1 + ")")
    .style("fill", "white")
    .call(xAxis1);

svg1.append("g")
    .attr("class", "y axis")
    .call(yAxis1)

svg1.append("text")
        .attr("x", (width1 / 2))             
        .attr("y", 0 - (margin1.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", width1 / 15) 
        .text("Stock Prices (Consumer Technology)");

svg1.append("text")
        .attr("x", (width1 / 2))             
        .attr("y", height1 + 40)
        .attr("text-anchor", "middle")  
        .style("font-size", width1 / 15) 
        .text("AAPL: 29.7%, MSFT: 26.5%, GOOGLE: 3.6%");
        
var city1 = svg1.selectAll(".city1")
    .data(cities1)
    .enter().append("g")
    .attr("class", "city1");

city1.append("path")
    .attr("class", "line1")
    .attr("d", function(d) {
        return line1(d.values);
    })
    .style("stroke", function(d) {
        return color1(d.name);
    });

city1.append("text")
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

var mouseG1 = svg1.append("g")
    .attr("class", "mouse-over-effects");

mouseG1.append("path") // this is the black vertical line1 to follow mouse
    .attr("class", "mouse-line1")
    .style("stroke", "white")
    .style("stroke-width1", "1px")
    .style("opacity", "0");

var line1s = document.getElementsByClassName('line1');

var mousePerline1 = mouseG1.selectAll('.mouse-per-line1')
    .data(cities1)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line1");

mousePerline1.append("circle")
    .attr("r", 5)
    .style("stroke", function(d) {
        return color1(d.name);
    })
    .style("fill", "none")
    .style("stroke-width1", "1px")
    .style("opacity", "0");

mousePerline1.append("text")
    .attr("transform", "translate(10,3)")
    .attr('fill', 'white');

mouseG1.append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width1) // can't catch mouse events on a g element
    .attr('height', height1)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function() { // on mouse out hide line1, circles and text
        d3.select(".mouse-line1")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line1 circle")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line1 text")
            .style("opacity", "0");

    })
    .on('mouseover', function() { // on mouse in show line1, circles and text
        d3.select(".mouse-line1")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line1 circle")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line1 text")
            .style("opacity", "1");
    })
    .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line1")
            .attr("d", function() {
                var d = "M" + mouse[0] + "," + height1;
                d += " " + mouse[0] + "," + 0;
                return d;
            });

        d3.selectAll(".mouse-per-line1")
            .attr("transform", function(d, i) {
                console.log(width1 / mouse[0])
                var xDate = x1.invert(mouse[0]),
                    bisect = d3.bisector(function(d) {
                        return d.date;
                    }).right;
                idx = bisect(d.values, xDate);

                var beginning = 0,
                    end = line1s[i].getTotalLength(),
                    target = null;

                while (true) {
                    target = Math.floor((beginning + end) / 2);
                    pos = line1s[i].getPointAtLength(target);
                    if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                        break;
                    }
                    if (pos.x > mouse[0]) end = target;
                    else if (pos.x < mouse[0]) beginning = target;
                    else break; //position found
                }

                d3.select(this).select('text')
                    .text(y1.invert(pos.y).toFixed(2));


                return "translate(" + mouse[0] + "," + pos.y + ")";
            });
    });