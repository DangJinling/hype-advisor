//routerGuard.js
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import { connect } from 'react-redux';
import letter_logo from './components/hypeAdvisor/images/letter_logo.png';
import './components/hypeAdvisor/main.scss';
import './components/hypeAdvisor/chart.css';
import $ from 'jquery';
import './components/hypeAdvisor/js/jquery.scrolly.min.js';
import './components/hypeAdvisor/js/jquery.dropotron.min.js';
import './components/hypeAdvisor/js/jquery.scrollex.min.js';
import browser from './components/hypeAdvisor/js/browser.min.js';
import breakpoints from './components/hypeAdvisor/js/breakpoints.min.js';
import './components/hypeAdvisor/js/util.js';
import './components/hypeAdvisor/font-awesome.min.css';
import './components/hypeAdvisor/noscript.css';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import './components/hypeAdvisor/js/jquery.dataTables.js';

const mapStateToProps = state => (state)
const mapDispatchToProps = dispatch => ({ ...dispatch })

class RouterGuard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchor: "",
        }
    }
    componentWillMount() {
        let { history: { replace }, location } = this.props
        // if (authorization) replace('./login')
        if (
            location.pathname === '/story' || 
            location.pathname === '/service'||
            location.pathname === '/industry' ||
            location.pathname === '/why' ||
            location.pathname === '/form'
           ) replace('./')
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

    doSignOut = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('is_superuser');
        this.props.history.push({ pathname: '/login' });
    }

    render() {
        let { component, loginBtn, signBtn } = this.props
        const LoadableComponent = Loadable({
            loader: () => import(`./components/hypeAdvisor/${component}`),
            loading: () => ( <div/>)
        })
        const username = localStorage.getItem('username');
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
                                        <li><a href="#story" path="/" id="storyMenu" className="scrolly">Our Story</a></li>
                                        <li><a href="#service" path="/" id="serviceMenu" className="scrolly">Our Service</a></li>
                                        <li><a href="#industry" path="/" id="industryMenu" className="scrolly">The Industry</a></li>
                                        <li><a href="#why" path="/" id="whyMenu" className="scrolly">Why Us</a></li>
                                    </ul>
                                </li>
                                <li><a href="#form" token="form" className="scrolly">Contact</a></li>
                                { username && loginBtn && signBtn && <li><Link to='/welcome'>UserManagement</Link></li> }
                                <li style={{display: !loginBtn && 'none'}}>{ username ? username: <Link to='/login'>LogIn</Link>}</li>
                                <li style={{display: !signBtn && 'none'}}>{ username ? <Button onClick={this.doSignOut} className="button primary">Sign Out</Button> : <Link to='/register' className="button primary">Sign Up</Link>}</li>
                            </ul>
                        </nav>
                    </header>
                    <LoadableComponent {...this.props} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RouterGuard))
