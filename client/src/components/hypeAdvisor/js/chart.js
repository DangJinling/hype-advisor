var myData = "date,1x AAPL Stock,2x AAPL Stock,1x OW AF1 (Volt)\n20181219,160.89,321.78,388.00\n20181224,146.83,293.66,353.00\n20181226,157.17,314.34,369.00\n20190102,157.92,315.84,379.00\n20190103,142.19,284.38,382.00\n20190104,148.26,296.52,380.00\n20190129,154.68,309.36,410.00\n20190205,174.18,348.36,431.00\n20190308,172.91,345.82,515.00\n20190321,195.09,390.18,595.00\n20190326,186.79,393.58,613.00\n20190411,198.95,397.90,698.00\n20190416,199.25,399.50,688.00\n20190421,204.53,409.06,730.00\n20190423,207.48,414.96,684.00\n20190430,204.61,409.22,685.00\n20190501,200.67,401.34,700.00\n20190502,209.15,418.30,705.00\n20190503,211.75,423.50,700.00";
var default_width = 600;
var default_height = 260;
var default_ratio = default_width / default_height;

var margin = {
    top: 60,
    right: 80,
    bottom: 30,
    left: 30
},
    width = default_width - margin.left - margin.right,
    height = default_height - margin.top - margin.bottom;

function scale() {
    current_width = Math.min(600, window.innerWidth * 0.9);
    current_height = 260;

    current_ratio = current_width / current_height;

    if (current_ratio > default_ratio) {
        h = current_height;
        w = h * default_ratio;
    } else {
        w = current_width;
        h = w / default_ratio;
    }

    width = w - margin.left - margin.right;
    height = h - margin.top - margin.bottom;

};

scale();

var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal().range(['#ffffff', '#ffffff', '#d13b3c']);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function (d) {
        return x(d.date);
    })
    .y(function (d) {
        return y(d.price);
    });

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("fill", "white")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data = d3.csv.parse(myData)

color.domain(d3.keys(data[0]).filter(function (key) {

    return key !== "date";
}));

data.forEach(function (d) {
    d.date = parseDate(d.date);
});

var cities = color.domain().map(function (name) {
    return {
        name: name,
        values: data.map(function (d) {
            return {
                date: d.date,
                price: +d[name]
            };
        })
    };
});

x.domain(d3.extent(data, function (d) {
    return d.date;
}));

y.domain([
    d3.min(cities, function (c) {
        return d3.min(c.values, function (v) {
            return v.price;
        });
    }),
    d3.max(cities, function (c) {
        return d3.max(c.values, function (v) {
            return v.price;
        });
    })
]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .style("fill", "white")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)

svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", width / 27)
    .text("Price (USD) over Time: Apple Stock vs. Off-White Air Force 1 Volt");

var city = svg.selectAll(".city")
    .data(cities)
    .enter().append("g")
    .attr("class", "city");

city.append("path")
    .attr("class", "line")
    .attr("d", function (d) {
        return line(d.values);
    })
    .style("stroke", function (d) {
        return color(d.name);
    });

city.append("text")
    .datum(function (d) {
        return {
            name: d.name,
            value: d.values[d.values.length - 1]
        };
    }).attr('fill', 'white')
    .attr("transform", function (d) {
        console.log(d.value.date)
        return "translate(" + x(d.value.date) + "," + y(d.value.price) + ")";
    })
    .attr("x", 3)
    .attr("dy", ".35em").attr('fill', 'white')
    .text(function (d) {
        return d.name;
    }).attr('fill', 'white');

var mouseG = svg.append("g")
    .attr("class", "mouse-over-effects");

mouseG.append("path") // this is the black vertical line to follow mouse
    .attr("class", "mouse-line")
    .style("stroke", "white")
    .style("stroke-width", "1px")
    .style("opacity", "0");

var lines = document.getElementsByClassName('line');

var mousePerLine = mouseG.selectAll('.mouse-per-line')
    .data(cities)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line");

mousePerLine.append("circle")
    .attr("r", 5)
    .style("stroke", function (d) {
        return color(d.name);
    })
    .style("fill", "none")
    .style("stroke-width", "1px")
    .style("opacity", "0");

mousePerLine.append("text")
    .attr("transform", "translate(10,3)")
    .attr('fill', 'white');

mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width) // can't catch mouse events on a g element
    .attr('height', height)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function () { // on mouse out hide line, circles and text
        d3.select(".mouse-line")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
            .style("opacity", "0");

    })
    .on('mouseover', function () { // on mouse in show line, circles and text
        d3.select(".mouse-line")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line circle")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line text")
            .style("opacity", "1");
    })
    .on('mousemove', function () { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line")
            .attr("d", function () {
                var d = "M" + mouse[0] + "," + height;
                d += " " + mouse[0] + "," + 0;
                return d;
            });

        d3.selectAll(".mouse-per-line")
            .attr("transform", function (d, i) {
                console.log(width / mouse[0])
                var xDate = x.invert(mouse[0]),
                    bisect = d3.bisector(function (d) {
                        return d.date;
                    }).right;
                idx = bisect(d.values, xDate);

                var beginning = 0,
                    end = lines[i].getTotalLength(),
                    target = null;

                while (true) {
                    target = Math.floor((beginning + end) / 2);
                    pos = lines[i].getPointAtLength(target);
                    if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                        break;
                    }
                    if (pos.x > mouse[0]) end = target;
                    else if (pos.x < mouse[0]) beginning = target;
                    else break; //position found
                }

                d3.select(this).select('text')
                    .text(y.invert(pos.y).toFixed(2));


                return "translate(" + mouse[0] + "," + pos.y + ")";
            });
    });