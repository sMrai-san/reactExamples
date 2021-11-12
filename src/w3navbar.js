import React, { Component } from 'react';
import './App.css';
import DataFetchNWCustomers from './components/DataFetchNWCustomers';
import DataFetchNWLogin from './components/DataFetchNWLogin';
import DataFetchNWEmployees from './components/DataFetchNWEmployees';
import DataFetchNWProducts from './components/DataFetchNWProducts';
import DataFetchJson from './components/DataFetchJson';
import MD5pwd from './components/MD5pwd';
import Messages from './components/Messages';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'



class w3navbar extends Component {

    render() {
        //make a hamburger
        function w3nav() {


            var z = document.getElementById("nwDrop");
            var x = document.getElementById("myTopnav");
            if (x.className === "topnav") {
                x.className += " responsive";
                z.className += " responsive";
            } else {
                x.className = "topnav";
                z.className = "dropdown";
            }
        }

        //make link active onClick!
        function active () {
            var header = document.getElementById("myTopnav");
            var btns = header.getElementsByClassName("navlink");
            for (var i = 0; i < btns.length; i++) {
                btns[i].addEventListener("click", function () {
                    var current = document.getElementsByClassName("active");
                    current[0].className = current[0].className.replace(" active", "");
                    this.className += " active";
                });
            }
        }

        return (
            <Router>
                <div className="Messages">
                    <div className="topnav" id="myTopnav">
                        <Link to={'/'} className="navlink active" onClick={active} >Home</Link>
                        <div id="nwDrop" className="dropdown">
                            <button className="dropbtn">Northwind<i className="fa fa-caret-down"></i></button>
                          <div className="dropdown-content">
                            <Link to={'/components/DataFetchNWCustomers'} className="navlink" onClick={active} >Customers</Link>
                            <Link to={'/components/DataFetchNWLogin'} className="navlink" onClick={active} >Logins</Link>
                            <Link to={'/components/DataFetchNWEmployees'} className="navlink" onClick={active} >Employees</Link>
                            <Link to={'/components/DataFetchNWProducts'} className="navlink" onClick={active} >Products</Link>
                          </div>
                        </div>

                        <Link to={'/components/DataFetchJson'} className="navlink" onClick={active} >Typicode Json</Link>
                        <Link to={'/components/MD5pwd'} className="navlink" onClick={active} >MD5 Hash</Link>
                        <button className="icon" onClick={w3nav}>
                            <i className="fa fa-bars"></i>
                        </button>
                    </div>
                    <Switch>
                        <Route path='/' exact component={Messages} />
                        {/*
                          You need this to display homepage content*/}
                        <Route path='/react2020/oppilas21' component={Messages} />
                        <Route path='/components/DataFetchNWCustomers' component={DataFetchNWCustomers} />
                        <Route path='/components/DataFetchNWLogin' component={DataFetchNWLogin} />
                        <Route path='/components/DataFetchNWEmployees' component={DataFetchNWEmployees} />
                        <Route path='/components/DataFetchNWProducts' component={DataFetchNWProducts} />
                        <Route path='/components/DataFetchJson' component={DataFetchJson} />
                        <Route path='/components/MD5pwd' component={MD5pwd} />
                    </Switch>
                </div>

            </Router>
        );
    }

}

export default w3navbar;
