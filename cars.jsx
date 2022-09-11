import React, { Component } from "react";
import { Link } from "react-router-dom";
import Options from "./options";
import queryString from "query-string";
import http from "./httpService";
import { queryAllByText } from "@testing-library/react";
class Cars extends Component {

    state = {
        cars: [],
        fuels: ["Petrol", "Diesel"],
        types: ["Hatchback", "Sedan"],
        sortArr: ["kms", "price", "year"],
        transmissions: ["Manual", "Automatic"],
        makers: ["Maruti", "Toyota", "Honda"],
        colors: ["Silver Grey", "Metallic Blue", "Black", "White", "Red"],
        models: ["Swift Dzire VXi", "Etios SMi", "City AXi", "Swift DXi", "Etios VXi", "City ZXi"],
        manufecturedYear: ["2010-2013", "2014-2018"],
        name: { minP: "", maxP: "" },
    }

    async fetchData() {
        let queryParams = queryString.parse(this.props.location.search);
        let searchStr = this.makeSearchString(queryParams);
        // console.log(searchStr);
        let response = await http.get(`/cars?${searchStr}`);
        // console.log(response);
        let { data } = response;
        this.setState({ cars: data });
    };

    handleChange = (e) => {
        // console.log(e);
        let s1 = { ...this.state };
        s1.name[e.currentTarget.name] = e.currentTarget.value;
        // console.log(s1.name);
        let queryParams = queryString.parse(this.props.location.search);
        queryParams.minP = s1.name.minP;
        queryParams.maxP = s1.name.maxP;
        this.callURL("/cars", queryParams);
        queryParams.minP = "";
        queryParams.maxP = "";
        this.setState(s1);
    };

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) this.fetchData();
    }

    makeSearchString = (options) => {
        let { fuel, type, sort, minP, maxP, transmission, make, color, model, manuFyear } = options;
        let searchStr = "";
        searchStr = this.addToQueryString(searchStr, "fuel", fuel);
        searchStr = this.addToQueryString(searchStr, "type", type);
        searchStr = this.addToQueryString(searchStr, "sort", sort);
        searchStr = this.addToQueryString(searchStr, "minP", minP);
        searchStr = this.addToQueryString(searchStr, "maxP", maxP);
        searchStr = this.addToQueryString(searchStr, "transmission", transmission);
        searchStr = this.addToQueryString(searchStr, "make", make);
        searchStr = this.addToQueryString(searchStr, "color", color);
        searchStr = this.addToQueryString(searchStr, "model", model);
        searchStr = this.addToQueryString(searchStr, "manuFyear", manuFyear);
        return searchStr;
    };

    addToQueryString = (str, paramName, paramValue) =>
        paramValue ? str ? `${str}&${paramName}=${paramValue}` : `${paramName}=${paramValue}` : str;

    handleOtionChange = (options) => {
        // console.log(options);
        this.callURL("/cars", options);
    }

    callURL = (url, options) => {
        let searchString = this.makeSearchString(options);
        this.props.history.push({
            pathname: url,
            search: searchString,
        });
    };

    render() {
        const { cars, fuels, types, sortArr, transmissions, makers, colors, models, manufecturedYear } = this.state;
        let queryParams = queryString.parse(this.props.location.search);
        let { sort, minP, maxP } = queryParams;
        let mainCars = sort === "kms" ? cars.sort((p1, p2) => p1.kms - p2.kms)
            : sort === "price" ? cars.sort((p1, p2) => p1.price - p2.price)
                : sort === "year" ? cars.sort((p1, p2) => p1.year - p2.year)
                    : cars;
        // console.log(minP, maxP);
        return (
            <div className="row mt-2">
                <h2 className="text-center">All Cars</h2>
                <div className="col-3">
                    <Options
                        options={queryParams}
                        fuels={fuels}
                        types={types}
                        sortArr={sortArr}
                        transmissions={transmissions}
                        makers={makers}
                        colors={colors}
                        models={models}
                        manufecturedYear={manufecturedYear}
                        onOptionChange={this.handleOtionChange} />
                </div>
                <div className="col-9">
                    <div className="form-group">
                        <div className="row m-3">
                            Price Range :
                            <div className="col-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="minP" name="minP"
                                    placeholder="Min. Price"
                                    value={minP}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="col-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="maxP" name="maxP"
                                    placeholder="Max. Price"
                                    value={maxP}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {mainCars.map((c1, index) => (
                            <div className="col-3 border bg-warning text-center" key={index}>
                                <h5>{c1.model}</h5>
                                Price : {c1.price}<br />
                                Color : {c1.color}<br />
                                Mileage : {c1.kms}<br />
                                Manufectured in {c1.year}<br />
                                <div className="row">
                                    <div className="col-6">
                                        <Link to={`/cars/${c1.id}/edit`}><i className="bi bi-pencil-square"></i></Link>
                                    </div>
                                    <div className="col-6">
                                        <Link to={`/cars/${c1.id}/delete`}><i className="bi bi-trash-fill"></i></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
export default Cars;