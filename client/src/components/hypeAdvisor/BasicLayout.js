import React, { Component } from 'react';
import letter_logo from './images/letter_logo.png';
import service from './images/service.png';
import './main.scss';
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
import './js/jquery.dataTables.js'

class BasicLayout extends Component {
    constructor(props){
        super(props);
        this.state = {
            anchor: "",
        }
    }

    componentDidMount() {
        this.loadPage();
    }

    loadPage = () => {
        var that = this;
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


        // $(".scrolly").each(function (index) {
        //     var $this = $(this);
        //     $(this).on('click', function () {
        //         var token = $this.attr("token");
        //         console.log("====");
        //         that.setState({ anchor: token})
        //     })
        // })

        // Nav.

        // Title Bar.
        $(
            '<div id="titleBar">' +
            '<a href="#navPanel" class="toggle"></a>' +
            '<span class="title">' + $('#logo').html() + '</span>' +
            '</div>'
        ).appendTo($body);

        // Panel.
        $('<div id="navPanel">' +
            '<nav>' +
            $('#nav').navList() +
            '</nav>' +
            '</div>')
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

        // $("#navPanel").find('a').each(function (index) {
        //     var $this = $(this);
        //     $(this).on('click', function () {
        //         var id = $this.attr("id");
        //         var menu = "#";
        //         menu = id.substring(0, id.length - 4);
        //         if (id.indexOf("/") >= 0) {
        //             that.props.history.push({ pathname: menu, state: { data: "menu" } });
        //             $("#titleBar").empty();
        //             $("#titleBar").remove();
        //             $("#navPanel").remove();
        //         } else if (id.indexOf("Menu") > 0) {
        //             that.props.history.push({ pathname: '/', state: { data: "menu" } });
        //             that.onClickAnchor(menu);
        //         }
        //         $body.removeClass("navPanel-visible");
        //     })
        // })

        // Parallax.
        // Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
        if (browser.name === 'ie'
            || browser.mobile) {
            $.fn._parallax = function () {
                return $(this);
            };
        } else {
            $.fn._parallax = function () {
                $(this).each(function () {
                    var $this = $(this), on, off;
                    on = function () {
                        $this.css('background-position', 'center 0px');
                        $window.on('scroll._parallax', function () {
                            var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);
                            $this.css('background-position', 'center ' + (pos * -0.15) + 'px');
                        });
                    };

                    off = function () {
                        $this.css('background-position', '');
                        $window.off('scroll._parallax');
                    };

                    breakpoints.on('<=medium', off);
                    breakpoints.on('>medium', on);
                });
                console.log("=========");
                return $(this);
            };

            $window.on('load resize', function () {
                $window.trigger('scroll');
            });
        }

        // Spotlights.
        var $spotlights = $('.spotlight');
        $spotlights._parallax().each(function () {
            var $this = $(this), on, off;
            on = function () {
                var top, bottom, mode;
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
        $wrappers.each(function () {
            var $this = $(this), on, off;
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
        $banner._parallax();
    }



    onClickAnchor = (value) => {
        console.log(value);
        this.setState({
            anchor: value,
        })
       
    }

    render() {
        console.log("&&&&&&&&&&&&&&&");
        const { children } = this.props
        return (
            <div class='mainContainer'>
                <div id="page-wrapper">
                    {/* <!-- Header --> */}
                    <header id="header">
                        <h1 id="logo">
                            <a href="#" >
                                <img src={letter_logo} alt="" id="logoImg" />
                            </a>
                        </h1>
                        <nav id="nav">
                            <ul>
                                <li>
                                    <a href="#">About</a>
                                    <ul>
                                        <li><a href="#story" token="story" id="storyMenu" className="scrolly">Our Story</a></li>
                                        <li><a href="#service" token="service" id="serviceMenu" className="scrolly">Our Service</a></li>
                                        <li><a href="#industry" token="industry" id="industryMenu" className="scrolly">The Industry</a></li>
                                        <li><a href="#why" token="why" id="whyMenu" className="scrolly">Why Us</a></li>
                                    </ul>
                                </li>
                                <li><a href="#form" token="form" className="scrolly">Contact</a></li>
                                <li><Link to='/login'>Log In</Link></li>
                                <li><Link to='/register' className="button primary">Sign Up</Link></li>
                            </ul>
                        </nav>
                    </header>
                    {children}
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
            </div>
        )
    }
}

export default BasicLayout
