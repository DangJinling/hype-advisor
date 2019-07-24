// const d3 = window.d3.min;
import * as d3 from './d3.min.js';
var myData = "date,Stock x1 ,Stock x2,Shoe x1\n20181219,160.89,321.78,388.00\n20181224,146.83,293.66,353.00\n20181226,157.17,314.34,369.00\n20190102,157.92,315.84,379.00\n20190103,142.19,284.38,382.00\n20190104,148.26,296.52,380.00\n20190129,154.68,309.36,410.00\n20190205,174.18,348.36,431.00\n20190308,172.91,345.82,515.00\n20190321,195.09,390.18,595.00\n20190326,186.79,393.58,613.00\n20190411,198.95,397.90,698.00\n20190416,199.25,399.50,688.00\n20190421,204.53,409.06,730.00\n20190423,207.48,414.96,684.00\n20190430,204.61,409.22,685.00\n20190501,200.67,401.34,700.00\n20190502,209.15,418.30,705.00\n20190503,211.75,423.50,700.00\n";

// var myData = `date\tNew York\tSan Francisco\tAustin\n
// 20111001\t63.4\t62.7\t72.2\n
// 20111002\t58.0\t59.9\t67.7\n
// 20111003\t53.3\t59.1\t69.4\n
// 20111004\t55.7\t58.8\t68.0\n
// 20111005\t64.2\t58.7\t72.4\n
// 20111006\t58.8\t57.0\t77.0\n
// 20111007\t57.9\t56.7\t82.3\n
// 20111008\t61.8\t56.8\t78.9\n
// 20111009\t59.3\t56.7\t68.8\n
// 20111010\t71.2\t60.1\t68.7\n
// 20111011\t68.7\t61.1\t70.3\n
// 20111012\t61.8\t61.5\t75.3\n
// 20111013\t63.0\t64.3\t76.6\n
// 20111014\t66.9\t67.1\t66.6\n
// 20111015\t61.7\t64.6\t68.0\n
// 20111016\t61.8\t61.6\t70.6\n
// 20111017\t62.8\t61.1\t71.1\n
// 20111018\t60.8\t59.2\t70.0\n
// 20111019\t62.1\t58.9\t61.6\n
// 20111020\t65.1\t57.2\t57.4\n
// 20111021\t55.6\t56.4\t64.3\n
// 20111022\t54.4\t60.7\t72.4\n`;

var margin = {
    top: 10,
    right: 70,
    bottom: 20,
    left: 40
},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();


// eslint-disable-next-line no-undef
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// eslint-disable-next-line no-undef
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// eslint-disable-next-line no-undef
var line = d3.svg.line()
    .interpolate("basis")
    .x(function (d) {
        return x(d.date);
    })
    .y(function (d) {
        return y(d.price);
    });

// eslint-disable-next-line no-undef
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("fill", "white")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// eslint-disable-next-line no-undef
var data = d3.csv.parse(myData)

data.forEach(d => {
    console.log(d)
})

// eslint-disable-next-line no-undef
color.domain(d3.keys(data[0]).filter(function (key) {

    return key !== "date";
}));

data.forEach(function (d) {
    d.date = parseDate(d.date);
});

// console.log(data)

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

// eslint-disable-next-line no-undef
x.domain(d3.extent(data, function (d) {
    return d.date;
}));

y.domain([
    // eslint-disable-next-line no-undef
    d3.min(cities, function (c) {
        // eslint-disable-next-line no-undef
        return d3.min(c.values, function (v) {
            return v.price;
        });
    }),
    // eslint-disable-next-line no-undef
    d3.max(cities, function (c) {
        // eslint-disable-next-line no-undef
        return d3.max(c.values, function (v) {
            return v.price;
        });
    })
]);

var legend = svg.selectAll('g')
    .data(cities)
    .enter()
    .append('g')
    .attr('class', 'legend')

legend.append('rect')
    .attr('x', width - 20)
    .attr('y', function (d, i) {
        return i * 20;
    })
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', function (d) {
        return color(d.name);
    });

legend.append('text')
    .attr('x', width - 8)
    .attr('y', function (d, i) {
        return (i * 20) + 9;
    }).attr('fill', 'white')
    .text(function (d) {
        return d.name;
    });

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .style("fill", "white")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .style("fill", "white")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Price (USD): AAPL Stock vs. Off-White Air Force 1 (Volt)");

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
        // eslint-disable-next-line no-undef
        d3.select(".mouse-line")
            .style("opacity", "0");
        // eslint-disable-next-line no-undef
        d3.selectAll(".mouse-per-line circle")
            .style("opacity", "0");
        // eslint-disable-next-line no-undef
        d3.selectAll(".mouse-per-line text")
            .style("opacity", "0");

    })
    .on('mouseover', function () { // on mouse in show line, circles and text
        // eslint-disable-next-line no-undef
        d3.select(".mouse-line")
            .style("opacity", "1");
        // eslint-disable-next-line no-undef
        d3.selectAll(".mouse-per-line circle")
            .style("opacity", "1");
        // eslint-disable-next-line no-undef
        d3.selectAll(".mouse-per-line text")
            .style("opacity", "1");
    })
    .on('mousemove', function () { // mouse moving over canvas
        // eslint-disable-next-line no-undef
        var mouse = d3.mouse(this);
        // eslint-disable-next-line no-undef
        d3.select(".mouse-line")
            .attr("d", function () {
                var d = "M" + mouse[0] + "," + height;
                d += " " + mouse[0] + "," + 0;
                return d;
            });

        // eslint-disable-next-line no-undef
        d3.selectAll(".mouse-per-line")
            .attr("transform", function (d, i) {
                console.log(width / mouse[0])
                var xDate = x.invert(mouse[0]),
                    // eslint-disable-next-line no-undef
                    bisect = d3.bisector(function (d) {
                        return d.date;
                    }).right;
                // eslint-disable-next-line no-undef
                idx = bisect(d.values, xDate);

                var beginning = 0,
                    end = lines[i].getTotalLength(),
                    target = null;

                while (true) {
                    target = Math.floor((beginning + end) / 2);
                    // eslint-disable-next-line no-undef
                    pos = lines[i].getPointAtLength(target);
                    // eslint-disable-next-line no-undef
                    if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                        break;
                    }
                    // eslint-disable-next-line no-undef
                    if (pos.x > mouse[0]) end = target;
                    // eslint-disable-next-line no-undef
                    else if (pos.x < mouse[0]) beginning = target;
                    else break; //position found
                }

                // eslint-disable-next-line no-undef
                d3.select(this).select('text')
                    // eslint-disable-next-line no-undef
                    .text(y.invert(pos.y).toFixed(2));


                // eslint-disable-next-line no-undef
                return "translate(" + mouse[0] + "," + pos.y + ")";
            });
    });