import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-danger">
                <div className="navbar-collapse">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/cars">
                                Home
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/cars/add">
                                New Car
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default Navbar;