/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import letter_logo from './images/letter_logo.png';
import new_logo_no_border from './images/new_logo_no_border.png';
import service from './images/service.png';
// import './main.scss';
import './chart.css';
import $ from 'jquery';
import './js/jquery.scrolly.min.js';
import './js/jquery.dropotron.min.js';
import './js/jquery.scrollex.min.js';
import browser from './js/browser.min.js';
import breakpoints from './js/breakpoints.min.js';
import d3 from './js/d3.min.js';
import './js/util.js';
import './font-awesome.min.css';
import './noscript.css';
import { addSubscribedUser } from '../../actions/subscribedUsers';
// import { trackRecord, marketComparison } from './js/buttons.js';
import { Link, Redirect } from 'react-router-dom';
import { industry_chart_scale } from '../hypeAdvisor/js/industry_chart';
import { stock1_scale } from '../hypeAdvisor/js/stock1';
import { stock2_scale } from '../hypeAdvisor/js/stock2';
import { stock3_scale } from '../hypeAdvisor/js/stock3';
import { stock4_scale } from '../hypeAdvisor/js/stock4';
import './js/jquery.dataTables.js';
import { nothing, text1, text2 } from './js/Button';

let current = 0;
export default class Scrollex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            anchor: "",
        }
    }

    componentWillMount(){
        // this.props.history.push({ pathname: '/' });
    }

    componentDidMount() {
        this.loadChart();
        this.ifHasAnchorJustScorll();
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
        const res = addSubscribedUser(member);
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
    }


    trackRecord = () => {
        var x = document.getElementById("button_text");
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
        $('#flips_table').DataTable({
            "paging": false,
            "info": false,
            "searching": false,
            "order": [[10, "desc"]],
            columnDefs: [{
                orderable: false,
                targets: [2, 3, 4, 5, 7]
            }]
        });
        $('.dataTables_length').addClass('bs-select');
    }

    ifHasAnchorJustScorll = () => {
        let anchor = this.props.location && this.props.location.pathname ? this.props.location.pathname.substring(1) : this.state.anchor;
        // let anchor = this.props.location && this.props.location.state ? this.props.location.state.data : this.state.anchor;
        console.log("anchor ", anchor);
        // 对应id的话, 滚动到相应位置
        if (!!anchor) {
            let anchorElement = document.getElementById(anchor);
            if (anchorElement) {
                // window.scrollTo(0, anchorElement.offsetTop);
                anchorElement.scrollIntoView(
                    {behavior: 'smooth'}
                );
            }
        }
        // 没有的话，滚动到头部
        else {
            document.body.scrollTop = document.documentElement.scrollTop = 10;
        }
    }

    render() {
        const { name, email } = this.state;
        return (
            <div>
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
                            <p>Generate passive income with streetwear investment</p>
                        </header>
                        <div className="box alt">
                            <div className="row gtr-50 gtr-uniform">
                                <div className="col-12"><span className="image fit"><img src={service} alt="" /></span></div>
                            </div>
                        </div>
                        <p align="left">
                            We are a <b>niche hedge fund</b> that operates specifically in the streetwear market. Using our experience, connections, and data analysis, we buy items that we predict to be <b>bullish</b>: they increase in resell value over time. If you invest with us, we will put your capital into the market to buy and hold streetwear items. We will update you periodically with your portfolio, which displays your investments, their current values, and the reasoning behind the investment.
                        <br />
                            <br />
                            For each round, we will release <b>a limited amount of investment slots</b>, with a minimum investment amount of $100. We use each pool of investment money to create a diverse and balanced portfolio. Each client then owns a percentage of each item, which translates to a percentage of the total value.
                        <br />
                            <br />
                            When your six-month investing time frame is completed, we will sell the items, collect a management and performance fee, and wire the earnings <b>directly to your bank account</b>.
                        </p>
                    </div>
                </section>
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
            </div>
        )
    }
}
