import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Cars from "./cars";
import AddCars from "./addCars";
import DeleteCar from "./deleteCar";
import Navbar from "./navbar";
class MainComp extends Component {
    
    render() {
        return (
            <div className="container">
                <Navbar />
                <Switch>
                    <Route path="/cars/add" component={AddCars} />
                    <Route path="/cars/:id/delete" component={DeleteCar}/>
                    <Route path="/cars/:id/edit" component={AddCars}/>
                    <Route path="/cars" component={Cars} />
                    <Redirect from="/" to="/cars" />
                </Switch>
            </div>
        );
    }
}
export default MainComp;