/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import letter_logo from './images/letter_logo.png';
import new_logo_no_border from './images/new_logo_no_border.png';
import service from './images/service.png';
import './main.css';
import $ from 'jquery';
// import './js/jquery.min.js';
import './js/jquery.scrolly.min.js';
import './js/jquery.dropotron.min.js';
import './js/jquery.scrollex.min.js';
import browser from './js/browser.min.js';
import breakpoints from './js/breakpoints.min.js';
import d3 from './js/d3.min.js';
import './js/util.js';
// import './js/buttons.js';
// import './js/chart.js';
// import './js/main.js';
import './font-awesome.min.css';
import './noscript.css';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { addMember } from '../../actions/members';
import { trackRecord, marketComparison } from './js/buttons.js';
import { Link } from 'react-router-dom';
// import jquery from '../hypeAdvisor/js/jquery.min.js';
// import sortable from '../hypeAdvisor/js/jquery.sortable.min.js';
import  { industry_chart_scale } from '../hypeAdvisor/js/industry_chart';
import  { stock1_scale } from '../hypeAdvisor/js/stock1';
import  { stock2_scale } from '../hypeAdvisor/js/stock2';
import  { stock3_scale } from '../hypeAdvisor/js/stock3';
import  { stock4_scale } from '../hypeAdvisor/js/stock4';

import { nothing, text1, text2 } from './js/Button';


let current = 0;
export class Scrollex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: ''
        }
    }

    componentDidMount() {
        this.loadPage();
        this.loadChart();
    }

    loadPage = () => {

        var $window = $(window),
            $body = $('body');

        // Breakpoints.
        breakpoints({
            xlarge: ['1281px', '1680px'],
            large: ['981px', '1280px'],
            medium: ['737px', '980px'],
            small: ['481px', '736px'],
            xsmall: [null, '480px']
        });

        // Play initial animations on page load.
        $window.on('load', function () {
            window.setTimeout(function () {
                $body.removeClass('is-preload');
            }, 100);
        });

        // Touch mode.
        if (browser.mobile)
            $body.addClass('is-touch');

        // Scrolly links.
        $('.scrolly').scrolly({
            speed: 2000
        });

        // Dropdowns.
        $('#nav > ul').dropotron({
            alignment: 'right',
            hideDelay: 350
        });

        // Nav.

        // Title Bar.
        $(
            '<div id="titleBar">' +
            '<a href="#navPanel" class="toggle"></a>' +
            '<span class="title">' + $('#logo').html() + '</span>' +
            '</div>'
        )
            .appendTo($body);

        // Panel.
        $(
            '<div id="navPanel">' +
            '<nav>' +
            $('#nav').navList() +
            '</nav>' +
            '</div>'
        )
            .appendTo($body)
            .panel({
                delay: 500,
                hideOnClick: true,
                hideOnSwipe: true,
                resetScroll: true,
                resetForms: true,
                side: 'left',
                target: $body,
                visibleClass: 'navPanel-visible'
            });

        // Parallax.
        // Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
        if (browser.name === 'ie'
            || browser.mobile) {

            $.fn._parallax = function () {

                return $(this);

            };

        }
        else {

            $.fn._parallax = function () {

                $(this).each(function () {

                    var $this = $(this),
                        on, off;

                    on = function () {

                        $this
                            .css('background-position', 'center 0px');

                        $window
                            .on('scroll._parallax', function () {

                                var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

                                $this.css('background-position', 'center ' + (pos * -0.15) + 'px');

                            });

                    };

                    off = function () {

                        $this
                            .css('background-position', '');

                        $window
                            .off('scroll._parallax');

                    };

                    breakpoints.on('<=medium', off);
                    breakpoints.on('>medium', on);

                });

                return $(this);

            };

            $window
                .on('load resize', function () {
                    $window.trigger('scroll');
                });

        }

        // Spotlights.
        var $spotlights = $('.spotlight');

        $spotlights
            ._parallax()
            .each(function () {

                var $this = $(this),
                    on, off;

                on = function () {

                    var top, bottom, mode;

                    // Use main <img>'s src as this spotlight's background.
                    // $this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

                    // Side-specific scrollex tweaks.
                    if ($this.hasClass('top')) {

                        mode = 'top';
                        top = '-20%';
                        bottom = 0;

                    }
                    else if ($this.hasClass('bottom')) {

                        mode = 'bottom-only';
                        top = 0;
                        bottom = '20%';

                    }
                    else {

                        mode = 'middle';
                        top = 0;
                        bottom = 0;

                    }

                    // Add scrollex.
                    $this.scrollex({
                        mode: mode,
                        top: top,
                        bottom: bottom,
                        initialize: function (t) { $this.addClass('inactive'); },
                        terminate: function (t) { $this.removeClass('inactive'); },
                        enter: function (t) { $this.removeClass('inactive'); },

                        // Uncomment the line below to "rewind" when this spotlight scrolls out of view.

                        //leave:	function(t) { $this.addClass('inactive'); },

                    });

                };

                off = function () {

                    // Clear spotlight's background.
                    $this.css('background-image', '');

                    // Remove scrollex.
                    $this.unscrollex();

                };

                breakpoints.on('<=medium', off);
                breakpoints.on('>medium', on);

            });

        // Wrappers.
        var $wrappers = $('.wrapper');

        $wrappers
            .each(function () {

                var $this = $(this),
                    on, off;

                on = function () {

                    $this.scrollex({
                        top: 250,
                        bottom: 0,
                        initialize: function (t) { $this.addClass('inactive'); },
                        terminate: function (t) { $this.removeClass('inactive'); },
                        enter: function (t) { $this.removeClass('inactive'); },

                        // Uncomment the line below to "rewind" when this wrapper scrolls out of view.

                        //leave:	function(t) { $this.addClass('inactive'); },

                    });

                };

                off = function () {
                    $this.unscrollex();
                };

                breakpoints.on('<=medium', off);
                breakpoints.on('>medium', on);

            });

        // Banner.
        var $banner = $('#banner');

        $banner
            ._parallax();

    }

    loadChart = () => {
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
            var current_width = Math.min(600, window.innerWidth * 0.9);
            var current_height = 260;

            var current_ratio = current_width / current_height;
            var h;
            var w;
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
                        var idx = bisect(d.values, xDate);

                        var beginning = 0,
                            end = lines[i].getTotalLength(),
                            target = null;
                        var pos;
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
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { name, email } = this.state;
        const member = { name, email };
        const res = addMember(member);
        console.log(res);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    marketComparison = () => {
        var x = document.getElementById("button_text");
        console.log("====");
        const temp = (
            <div>{x.innerHTML}</div>
          );
        if (current === 0) {
            current = 2;
            x.innerHTML = text2;
            this.reloadJSMarketComparison();
        } else if (current === 1) {
            current = 2;
            x.innerHTML = text2 + text1;
            x.innerHTML = text2;
            this.reloadJSMarketComparison();
        } else {
            current = 0;
            x.innerHTML = nothing;
        }
    }

    reloadJSMarketComparison = () => {
        industry_chart_scale();
        stock1_scale();
        stock2_scale();
        stock3_scale();
        stock4_scale();
        // const head = document.getElementsByTagName('head')[0];
        // const script0 = document.createElement('script');
        // script0.type = 'text/javascript';
        // script0.src = industryChart;
        // head.appendChild(script0);

        // const script1 = document.createElement('script');
        // script1.type = 'text/javascript';
        // script1.src = stock1;
        // head.appendChild(script1);


        // const script2 = document.createElement('script');
        // script2.type = 'text/javascript';
        // script2.src = stock2;
        // head.appendChild(script2);

        // const script3 = document.createElement('script');
        // script3.type = 'text/javascript';
        // script3.src = stock3;
        // head.appendChild(script3);

        // const script4 = document.createElement('script');
        // script4.type = 'text/javascript';
        // script4.src = stock4;
        // head.appendChild(script4);
        
    }


    trackRecord = () => {
        
        var x = document.getElementById("button_text");
        // var temp = document.createElement("div");
        // temp.innerHTML = x.innerHTML;
        const temp = (
            <div>{x.innerHTML}</div>
        );
        if (current === 0) {
        	current = 1;
        	x.innerHTML = text1;
        	this.reloadJSTrackRecord();
        } else if (current === 2) {
        	current = 1;
        	x.innerHTML = text1 + text2;
        	x.innerHTML = text1;
        	this.reloadJSTrackRecord();
        } else {
        	current = 0;
        	x.innerHTML = nothing;
        }
    }

    reloadJSTrackRecord = () => {
        var head = document.getElementsByTagName('head')[0];

        // const script = document.createElement('script');
        // script.type = 'text/javascript';
        // script.src = jquery;
        // head.appendChild(script);

        // const script1 = document.createElement('script');
        // script1.type = 'text/javascript';
        // script1.src = sortable;
        // head.appendChild(script1);


        
    }

    renderTrackRecord = () => {
        return (
            <div>
                <div style={{overflowX:'auto'}}>
                    <table id="flips_table" className="table"> 
                        <thead>
                            <tr>
                                <th>Name ↑↓</th>
                                <th>Quantity ↑↓</th>
                                <th>Buy Price (per item)</th>
                                <th>Buy Date</th>
                                <th>Sell Price (per item)</th>
                                <th>Sell Date</th>
                                <th>Time Held ↑↓</th>
                                <th>Fees</th>
                                <th>Gross Gain / Loss ↑↓</th>
                                <th>Net Gain / Loss ↑↓</th>
                                <th>Return on Investment (%) ↑↓</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Yeezy 350 v2 Glow</td>
                                <td>4</td>
                                <td>$470</td>
                                <td>5/25/19</td>
                                <td>$650</td>
                                <td>7/14/19</td>
                                <td>02 months</td>
                                <td>$208</td>
                                <td><font color="#11d128">$720</font></td>
                                <td><font color="#11d128">$512</font></td>
                                <td><font color="#11d128">27%</font></td>
                            </tr>
                            <tr>
                                <td>Travis Scott Air Jordan 4</td>
                                <td>5</td>
                                <td>$330</td>
                                <td>12/13/18</td>
                                <td>$528</td>
                                <td>7/14/19</td>
                                <td>07 months</td>
                                <td>$211</td>
                                <td><font color="#11d128">$990</font></td>
                                <td><font color="#11d128">$779</font></td>
                                <td><font color="#11d128">47%</font></td>
                            </tr>
                            <tr>
                                <td>Yeezy 350 v2 Cream</td>
                                <td>3</td>
                                <td>$235</td>
                                <td>1/22/19</td>
                                <td>$360</td>
                                <td>7/14/19</td>
                                <td>06 months</td>
                                <td>$86</td>
                                <td><font color="#11d128">$375</font></td>
                                <td><font color="#11d128">$289</font></td>
                                <td><font color="#11d128">41%</font></td>
                            </tr>
                            <tr>
                                <td>Air Jordan 1 Bred Toe</td>
                                <td>3</td>
                                <td>$277</td>
                                <td>2/20/18</td>
                                <td>$488</td>
                                <td>2/9/19</td>
                                <td>12 months</td>
                                <td>$117</td>
                                <td><font color="#11d128">$633</font></td>
                                <td><font color="#11d128">$516</font></td>
                                <td><font color="#11d128">62%</font></td>
                            </tr>
                            <tr>
                                <td>Union LA Air Jordan 1</td>
                                <td>2</td>
                                <td>$573</td>
                                <td>12/21/18</td>
                                <td>$1,227</td>
                                <td>3/15/19</td>
                                <td>03 months</td>
                                <td>$196</td>
                                <td><font color="#11d128">$1,308</font></td>
                                <td><font color="#11d128">$1,112</font></td>
                                <td><font color="#11d128">97%</font></td>
                            </tr>
                            <tr>
                                <td>Air Jordan 1 Not For Resale</td>
                                <td>2</td>
                                <td>$780</td>
                                <td>2/16/19</td>
                                <td>$677</td>
                                <td>3/8/19</td>
                                <td>01 months</td>
                                <td>$108</td>
                                <td><font color="#d13b3c">-$206</font></td>
                                <td><font color="#d13b3c">-$314</font></td>
                                <td><font color="#d13b3c">-20%</font></td>
                            </tr>
                            <tr>
                                <td>Off-White Air Jordan 1 Chicago</td>
                                <td>1</td>
                                <td>$1,184</td>
                                <td>12/12/18</td>
                                <td>$3,400</td>
                                <td>6/4/19</td>
                                <td>06 months</td>
                                <td>$272</td>
                                <td><font color="#11d128">$2,216</font></td>
                                <td><font color="#11d128">$1,944</font></td>
                                <td><font color="#11d128">164%</font></td>
                            </tr>
                            <tr>
                                <td>Off-White Nike Presto OG</td>
                                <td>1</td>
                                <td>$1,470</td>
                                <td>3/2/18</td>
                                <td>$2,200</td>
                                <td>4/1/19</td>
                                <td>13 months</td>
                                <td>$176</td>
                                <td><font color="#11d128">$730</font></td>
                                <td><font color="#11d128">$554</font></td>
                                <td><font color="#11d128">38%</font></td>
                            </tr>
                            <tr>
                                <td>Air Jordan 5 Trophy Room</td>
                                <td>2</td>
                                <td>$600</td>
                                <td>5/18/19</td>
                                <td>$1,200</td>
                                <td>7/14/19</td>
                                <td>02 months</td>
                                <td>$192</td>
                                <td><font color="#11d128">$1,200</font></td>
                                <td><font color="#11d128">$1,008</font></td>
                                <td><font color="#11d128">84%</font></td>
                            </tr>
                            <tr>
                                <td>Serena Williams Off White Nike Air Max 97</td>
                                <td>1</td>
                                <td>$900</td>
                                <td>1/18/19</td>
                                <td>$1,150</td>
                                <td>6/14/19</td>
                                <td>05 months</td>
                                <td>$92</td>
                                <td><font color="#11d128">$250</font></td>
                                <td><font color="#11d128">$158</font></td>
                                <td><font color="#11d128">18%</font></td>
                            </tr>
                            <tr>
                                <td>Raptor OVO Air Jordan 4</td>
                                <td>1</td>
                                <td>$375</td>
                                <td>6/13/19</td>
                                <td>$225</td>
                                <td>7/14/19</td>
                                <td>02 months</td>
                                <td>$18</td>
                                <td><font color="#d13b3c">-$150</font></td>
                                <td><font color="#d13b3c">-$168</font></td>
                                <td><font color="#d13b3c">-45%</font></td>
                            </tr>
                        </tbody>
                    </table> 
                </div>  
                <br/>
                Above is the <b>complete portfolio</b> of investments we have made as a collective<sup>4</sup>.
                The more confident we are in a certain streetwear item, the more we invest. Whether it be one month or one year investments, the majority of the items that we have held have proven to be profitable, with ROI’s ranging from 18% to 164% after transaction fees. In the bigger picture, the positives outweigh the negatives, resulting in a consistent net profit in our diverse portfolio.
                <br/>
                <br/>
                Note that we calculated our final numbers by including an average 8% fee that transactions incur. Even with fees, however, streetwear can still turn extremely large profit margins.
                <br/>
                <br/>
                <div className="asterisk"><sup>4</sup>Prior investments made by team members independently are uncharted.</div>
                <br/>
                <br/> 
            </div>
        )
    }


    render() {
        const { name, email } = this.state;
        return (
            <div id="page-wrapper">
                {/* <!-- Header --> */}
                <header id="header">
                    <h1 id="logo">
                        <a href="#" >
                            <img src={letter_logo} alt="" style={{ float: 'right', height: '40px', margin: '10px 0px' }} />
                        </a>
                    </h1>
                    <nav id="nav">
                        <ul>
                            <li>
                                <a href="#">About</a>
                                <ul>
                                    <li><a href="#story" className="scrolly">Our Story</a></li>
                                    <li><a href="#service" className="scrolly">Our Service</a></li>
                                    <li><a href="#industry" className="scrolly">The Industry</a></li>
                                    <li><a href="#why" className="scrolly">Why Us</a></li>
                                </ul>
                            </li>
                            <li><a href="#form" className="scrolly">Contact</a></li>
                            <li><Link to='/login'>Log In</Link></li>
                            <li><Link to='/register' className="button primary">Sign Up</Link></li>

                        </ul>
                    </nav>
                </header>
                {/* <!-- Banner --> */}
                <section id="banner">
                    <div className="content">
                        <header>
                            <h2>
                                Turn your passion to profit,<br /> without all of the work.<br /></h2>
                            <p>
                                Join The Hype Fund by The Hype Advisor<br />
                            </p>
                        </header>
                        <span className="image">
                            <img src={new_logo_no_border} alt="" />
                        </span>
                    </div>
                    <a href="#story" className="goto-next scrolly">Next</a>
                </section>
                {/* // <!-- Body --> */}
                <section id="story" className="spotlight style1 right">
                    {/* <span className="image fit main"><img src={travis_af1} alt="" /></span> */}
                    <div className="content">
                        <div className="col-4 col-12-medium">
                            <header>
                                <h2>Our Story</h2>
                                <p>Who is "The Hype Advisor?"</p>
                            </header>
                        </div>
                        <div className="col-4 col-12-medium">
                            <p>
                                We are a team of streetwear enthusiasts who have been passionate about the world of hype for as long as we can remember. However, streetwear is an expensive hobby: <b>We needed a way to fund our passion.</b>
                                <br />
                                <br />
                                Then, about five years ago, we discovered reselling. By buying certain items for the low, waiting for a calculated period of time, and selling them high, we were able to profit.
						</p>
                        </div>
                    </div >
                    <a href="#two" className="goto-next scrolly">Next</a>
                </section >
                <section id="two" className="spotlight style1 left">
                    {/* <span className="image fit main"><img src={bape} alt="" /></span> */}
                    <div className="content">
                        <div className="col-4 col-12-medium">
                            <header>
                                <h2>The Hype Fund</h2>
                                <p>Our expertise, now in your hands.</p>
                            </header>
                            <p>
                                Five years later, here we are. Reselling allows us to make more money than we could have ever imagined. With our knowledge navigating the streetwear market, we accurately predict and obtain the items that are going to appreciate.
							<br />
                                <br />
                                <b>We want to bring our experience to you.</b> We know that getting into reselling is very difficult, and the steep learning curve has driven many people away. Therefore, we want to offer a service that does it for you. Introducing <b><i>The Hype Fund</i></b> by <b><i>The Hype Advisor</i></b>.
						</p>
                        </div>
                    </div >
                    <a href="#service" className="goto-next scrolly">Next</a>
                </section >
                <section id="service" className="wrapper style2 special fade">
                    <div className="container">
                        <header>
                            <h2>Our Service</h2>
                            <p>A clothing and sneaker-based hedgefund with no barriers to entry.</p>
                        </header>
                        <div className="box alt">
                            <div className="row gtr-50 gtr-uniform">
                                <div className="col-12"><span className="image fit"><img src={service} alt="" /></span></div>
                            </div>
                        </div>
                        <p align="left">
                            We are a <b>niche hedge fund</b> that operates specifically in the streetwear market. Using our experience, connections, and data analysis, we buy items that we predict to be <b>bullish</b>: they increase in resell value over time. If you invest with us, we will put your capital into the market to buy and hold streetwear items. At any given time, you can log into your account<sup>1</sup> and check your portfolio, which displays your investments, their current values, and the reasoning behind the choice of each item. When your six-month investing time frame is completed, we will sell the items and transfer your money directly to your <b>PayPal account</b>.
                            <br />
                            <br />
                            During the launch of our service, we will open up a <b>limited number of slots</b> for clients. Clients can invest starting at a low minimum of $100, with the money pooled together for the investment round and utilized to buy a diverse array of streetwear items. Each client then owns a percentage of each item, which translates to a percentage of the total value. Within each pool, we will also contribute a portion of our funds, <b>embarking along the journey with you</b>.
                            <br />
                            <br />
                            At the end of the investing period, we will pay you your profit after taking a performance fee < sup > 3</sup > similar to traditional hedge funds.We will also return your original investment with a minimal management fee < sup > 3</sup > subtracted(since the acquisition of streetwear items is a tedious process).
                            <br />
                            <br />
                            To stay updated on the launch of our service and sign up for a slot when they release, <b>be sure to <a href="#form" className="scrolly">give us your contact information</a></b>.
                            <br />
                        </p >
                        <div className="asterisk">
                            <sup>1</sup>User interface and accounts on our website are still under construction. In the meantime, payments and updates will be coordinated through email and PayPal.
                        <br />
                            <sup>2</sup>We are not affiliated with StockX, but their website provides a good basis for understanding the value of different items.
                        <br />
                            <sup>3</sup>Exact fees follow closely with the 2 and 20 rule for hedgefunds.Exact percentages are announced to those on our email list, and these fees are also subject to change, in which case we will notify all potential customers via email and update on our website and contracts.
                        </div >
                    </div >
                </section >
                <section id="industry" className="wrapper style1 special fade">
                    <div className="container">
                        <header>
                            <h2>The Industry</h2>
                            <p>Taking the world by storm, one release at a time.</p>
                        </header>
                        <p align="left">
                            {/* <!-- <span className="left" id="chart_div"></span> --> */}
                            <span id="chart" className="left"></span>
                            The streetwear industry is a multi-billion industry, with the resell market itself currently valued at <b>$2 billion</b> (per <a href="https://www.businessinsider.com/most-expensive-sneakers-sold-last-year-resale-2019-4" target="_blank">Business Insider)</a>. This number is only growing at an exponential rate: it is projected to hit <b>$6 billion by 2025</b>. <b>Start investing now, you won’t regret it</b>.
						<br />
                            <br />
                            For a glimpse at <b>our track record/profits</b> or <b>the growth of the market and comparisons to the stock market</b>, click the buttons below. Be sure to move your cursor over the graphs to view the numbers!
						<br />
                            <br />
                            <a className="button" onClick={this.trackRecord}>Track Record</a>
                            <a className="button" onClick={this.marketComparison}>Market Comparisons</a>
                            <div id="button_text" align="left">
                                
                            </div>
                            Ultimately, the streetwear market is <b>more predictable, less volatile</b>, and thus has a <b>greater potential</b> for profit than other open markets. As an experienced group of resellers and investors in the streetwear market, we can leverage this potential for better returns.
					    </p>
                        <br />
                    </div>
                </section>
                <section id="why" className="wrapper style2 special fade">
                    <div className="container">
                        <header>
                            <h2>Why Believe In Us?</h2>
                            <p>No risk. Better profits.</p>
                        </header>
                        <p align="left">
                            The streetwear market is unlike any other. Not only is there a constant influx of new drops every week, but there is also a constant demand for valued items. These items we choose tend to rise in resale price quickly, but rarely drop below its original value, making them low-risk investments.
						<br />
                            <br />
                            Like in any global market, we use our knowledge, experience, and connections to buy and sell these assets, some of which are very difficult to obtain. We want to show you that streetwear is not just a passion for streetwear enthusiasts, but is also a living, breathing market where millions of dollars have the potential to be made!
						<br />
                            <br />
                            If you want to test out how we do in the market, it’s okay to start small! Our business is structured so each client can contribute, <b>with just a minimum amount of $100.</b>
                        </p >
                    </div>
                </section >
                <section id="five" className="wrapper style1 special fade-up">
                    <div className="container">
                        <header className="major">
                            <h2>5+ Years of Reselling Success</h2>
                            <p>Your funds in the hands of experts with a <b>proven track record</b>. Best part is, you get to learn ins and outs of the streetwear market with us. We promise the following and look forward to being at your service.</p>
                        </header>
                        <div className="box alt">
                            <div className="row gtr-uniform">
                                <section className="col-4 col-6-medium col-12-xsmall">
                                    <span className="icon alt major fa-shield"></span>
                                    <h3>Security</h3>
                                    <p>We keep all your data safe and secure, and you decide who does or doesn’t see your portfolio. Your information will never be shown to any third parties.</p>
                                </section>
                                <section className="col-4 col-6-medium col-12-xsmall">
                                    <span className="icon alt major fa-eye"></span>
                                    <h3>Transparency</h3>
                                    <p>We are 100% transparent with our buying and selling. We even encourage our clients to examine the transactions to enrich themselves in the culture and the intricacies of the resell world.</p>
                                </section>
                                <section className="col-4 col-6-medium col-12-xsmall">
                                    <span className="icon alt major fa-desktop"></span>
                                    <h3>Accessibility</h3>
                                    <p>Our interface is simple and easy to understand. All of the information that you need will be right at your fingertips.</p>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="form" className="wrapper style2 special fade">
                    <div className="container">
                        <header>
                            <h2>Interested In Our Service?</h2>
                            <div>
                                Leave us your information below and hit <b>Join Us</b> to join our weekly newsletter and follow our investments and the reselling culture. If you have specific interests, hit the <b>Contact Us</b> button to send us an email.
						</div>
                            <br />
                            <form onSubmit={this.onSubmit}>
                                <div className="row gtr-uniform gtr-50">
                                    <div className="col-3 col-12-xsmall">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={name}
                                            placeholder="Name (First Last)"
                                            required={true}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-6 col-12-xsmall">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={email}
                                            placeholder="Email (name@website.com)"
                                            required={true}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-3 col-12-xsmall">
                                        <ul className="actions">
                                            <li><input type="submit" value="Join Us" className="primary" /></li>
                                            <li><a href="mailto:team@thehypeadvisor.com" className="button">Contact Us</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </form>
                        </header>
                        <form method="post" action="#" className="cta">
                            <div className="row gtr-uniform gtr-50">
                            </div>
                        </form>
                    </div>
                </section>
                {/* <!-- Footer --> */}
                <footer id="footer">
                    <ul className="icons">
                        <li><a href="http://instagram.com/thehypeadvisor" className="icon alt fa-instagram"><span className="label">Instagram</span></a></li>
                        <li><a href="mailto:team@thehypeadvisor.com" className="icon alt fa-envelope"><span className="label">Email</span></a></li>
                    </ul>
                    <ul className="copyright">
                        <li>&copy; The Hype Advisor.</li><li>Built by: <a href="http://m1ch43lw4ng.com">Michael Wang</a></li><li>Last Updated: June 22nd, 2019</li>
                    </ul>
                </footer>
            </div >
        )
    }
}

export default Scrollex
