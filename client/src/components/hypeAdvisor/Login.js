import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { login } from '../../actions/auth';
import { Welcome } from './Welcome';
import letter_logo from './images/letter_logo.png';

import $ from 'jquery';
// import './js/jquery.scrolly.min.js';
import './js/jquery.dropotron.min.js';
import './js/jquery.scrollex.min.js';
import browser from './js/browser.min.js';
import breakpoints from './js/breakpoints.min.js';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

export class Login extends Component {
    state = {
        username: '',
        password: '',
        loginSuccess: false,
        user: null,
    }

    componentDidMount() {
        this.loadPage();
    }

    onSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state;
        const body = JSON.stringify({ username, password });
        const response = login(body);
        console.log(response);
        response.then(result => {
            if (result.statusText === 'OK') {
                this.setState({ loginSuccess: true, user: result.data.user });
            }
        })
    }

    loadPage = () => {
        const that = this;
       
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
        ).appendTo($body);

        // Panel.
        $(
            '<div id="navPanel">' +
            '<nav>' +
            $('#nav').navList() +
            '</nav>' +
            '</div>'
        ).appendTo($body)
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

        $("#navPanel").find('a').each(function(index){
            var $this = $(this);
            $(this).on('click',function(){
                var id = $this.attr("id");
                var menu = "#";
                menu = id.substring(0,id.length-4);
                const path = `/${menu}`;
                if(id.indexOf("/") >= 0 ){
                    // that.setState({  RedirectStatus: true, RedirectPath: menu});
                    that.props.history.push({ pathname: menu});
                }else if(id.indexOf("Menu") > 0 ){
                    that.props.history.push({ pathname: '/', state: { data: menu } });
                    // that.setState({  RedirectStatus: true, RedirectPath: "/"});
                }
                $("#titleBar").empty();
                $("#titleBar").remove();
                $("#navPanel").remove();
                $body.removeClass("navPanel-visible");
            })
        })

        // Parallax.
        // Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
        // if (browser.name === 'ie'|| browser.mobile) {
        //     $.fn._parallax = function () {
        //         return $(this);
        //     };
        // }
        // else {
        //     $.fn._parallax = function () {
        //         $(this).each(function () {
        //             var $this = $(this),on, off;
        //             on = function () {
        //                 $this.css('background-position', 'center 0px');
        //                 $window.on('scroll._parallax', function () {
        //                         var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);
        //                         $this.css('background-position', 'center ' + (pos * -0.15) + 'px');
        //                     });
        //             };

        //             off = function () {
        //                 $this.css('background-position', '');
        //                 $window.off('scroll._parallax');
        //             };
        //             breakpoints.on('<=medium', off);
        //             breakpoints.on('>medium', on);
        //         });
        //         return $(this);
        //     };
        //     $window
        //         .on('load resize', function () {
        //             $window.trigger('scroll');
        //         });
        // }
        // Spotlights.
        // var $spotlights = $('.spotlight');
        // $spotlights._parallax().each(function () {
        //         var $this = $(this),on, off;
        //         on = function () {
        //             var top, bottom, mode;
        //             // Use main <img>'s src as this spotlight's background.
        //             // $this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');
        //             // Side-specific scrollex tweaks.
        //             if ($this.hasClass('top')) {
        //                 mode = 'top';
        //                 top = '-20%';
        //                 bottom = 0;
        //             }
        //             else if ($this.hasClass('bottom')) {
        //                 mode = 'bottom-only';
        //                 top = 0;
        //                 bottom = '20%';
        //             }
        //             else {
        //                 mode = 'middle';
        //                 top = 0;
        //                 bottom = 0;
        //             }

        //             // Add scrollex.
        //             $this.scrollex({
        //                 mode: mode,
        //                 top: top,
        //                 bottom: bottom,
        //                 initialize: function (t) { $this.addClass('inactive'); },
        //                 terminate: function (t) { $this.removeClass('inactive'); },
        //                 enter: function (t) { $this.removeClass('inactive'); },
        //                 // Uncomment the line below to "rewind" when this spotlight scrolls out of view.
        //                 //leave:	function(t) { $this.addClass('inactive'); },
        //             });
        //         };
        //         off = function () {
        //             // Clear spotlight's background.
        //             $this.css('background-image', '');
        //             // Remove scrollex.
        //             $this.unscrollex();
        //         };
        //         breakpoints.on('<=medium', off);
        //         breakpoints.on('>medium', on);
        //     });
        // // Wrappers.
        // var $wrappers = $('.wrapper');
        // $wrappers.each(function () {

        //         var $this = $(this),on, off;
        //         on = function () {
        //             $this.scrollex({
        //                 top: 250,
        //                 bottom: 0,
        //                 initialize: function (t) { $this.addClass('inactive'); },
        //                 terminate: function (t) { $this.removeClass('inactive'); },
        //                 enter: function (t) { $this.removeClass('inactive'); },
        //                 // Uncomment the line below to "rewind" when this wrapper scrolls out of view.
        //                 //leave:	function(t) { $this.addClass('inactive'); },
        //             });
        //         };
        //         off = function () {
        //             $this.unscrollex();
        //         };
        //         breakpoints.on('<=medium', off);
        //         breakpoints.on('>medium', on);
        //     });
        // // Banner.
        // var $banner = $('#banner');
        // $banner._parallax();
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    renderLoginPage = () => {
        const { username, password } = this.state;
        return (
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
                                    <li><a href="#story" className="scrolly">Our Story</a></li>
                                    <li><a href="#service" className="scrolly">Our Service</a></li>
                                    <li><a href="#industry" className="scrolly">The Industry</a></li>
                                    <li><a href="#why" className="scrolly">Why Us</a></li>
                                </ul>
                            </li>
                            <li><Link to='/register' className="button primary">Sign Up</Link></li>
                        </ul>
                    </nav>
                </header>
                < div className='col-md-6 m-auto' style={{ width: '50%', margin: '0 auto', paddingTop: 60 }
                }>
                    <div className='card card-body mt-5'>
                        <h2 className='text-center' style={{ textAlign: 'center' }}>Login</h2>
                        <form onSubmit={this.onSubmit}>
                            <div className='form-group'>
                                <label>Email</label>
                                <input
                                    type='email'
                                    className='form-control'
                                    name='username'
                                    onChange={this.onChange}
                                    value={username}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Password</label>
                                <input
                                    type='password'
                                    className='form-control'
                                    name='password'
                                    onChange={this.onChange}
                                    value={password}
                                />
                            </div>
                            <div className='form-group' style={{ marginTop: 10 }}>
                                <button type='submit' className="button primary" id="LoginSubmit">
                                    Login
                                </button>
                            </div>
                            <p>
                                Don't have an account? <Link to='/register'>Regiser</Link>
                            </p>
                        </form>
                    </div>
                </div >
                {/* <div style={{position:'absolute',bottom:0, marginLeft: -350, left:'50%'}}> */}
                    <footer style={{textAlign:'center'}}>
                        <ul className="icons" style={{marginBottom:20}}>
                            <li><a href="http://instagram.com/thehypeadvisor" className="icon alt fa-instagram"><span className="label">Instagram</span></a></li>
                            <li><a href="mailto:team@thehypeadvisor.com" className="icon alt fa-envelope"><span className="label">Email</span></a></li>
                        </ul>
                        <ul className="copyright">
                            <li>&copy; The Hype Advisor.</li><li>Built by: <a href="http://m1ch43lw4ng.com">Michael Wang</a></li><li>Last Updated: June 22nd, 2019</li>
                        </ul>
                    </footer>
                {/* </div> */}
            </div>
        )
    }

    render() {
        const { loginSuccess, user } = this.state;
        return (
            loginSuccess ?
                <Welcome user={user} /> :
                this.renderLoginPage()
        )
    }
}

export default Login
