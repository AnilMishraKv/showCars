import React, { Component } from "react";
import http from "./httpService";
class AddCars extends Component {
    state = {
        car: { id: "", price: "", year: "", kms: "", model: "", color: "" },
        models: ["Swift Dzire VXi", "Etios SMi", "City AXi", "Swift DXi", "Etios VXi", "City ZXi"],
        colors: ["Silver Grey", "Metallic Blue", "Black", "White", "Red"],
        edit: false,
    };

    async componentDidMount() {
        this.fetchData();
    };

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) this.fetchData();
    }

    async fetchData() {
        const { id } = this.props.match.params;
        if (id) {
            let response = await http.get(`/cars/${id}`);
            let { data } = response;
            this.setState({ car: data, edit: true });
        }
        else {
            let car = { id: "", price: "", year: "", kms: "", model: "", color: "" };
            this.setState({ car: car, edit: false });
        }
    }

    handleChange = (e) => {
        const { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.car[input.name] = input.value;
        // console.log(s1.car);
        this.setState(s1);
    };

    async postData(url, obj) {
        let response = await http.post(url, obj);
        // console.log(response);
        this.props.history.push("/cars");
    }

    async putData(url, obj) {
        let response = await http.put(url, obj);
        // console.log(response);
        this.props.history.push("/cars");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { car, edit } = this.state;
        edit ? this.putData(`/cars/${car.id}`, car) : this.postData("/cars", car);
    };

    render() {
        const { id, price, year, kms, model, color } = this.state.car;
        const { models, colors } = this.state;
        return (
            <div className="container">
                <h2 className="text-center">Cars Details</h2>
                <div className="form-group">
                    <h6>Cars ID</h6>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        name="id"
                        placeholder="Enter the ID"
                        value={id}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <h6>Price</h6>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        placeholder="Enter the Price"
                        value={price}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <h6>Mileage in kms</h6>
                    <input
                        type="number"
                        className="form-control"
                        id="kms"
                        name="kms"
                        // placeholder="Enter the ID"
                        value={kms}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <h6>Year of Manufacture</h6>
                    <input
                        type="number"
                        className="form-control"
                        id="year"
                        name="year"
                        placeholder="Enter the Year"
                        value={year}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <h6>Model</h6>
                            <select className="form-control" name="model" value={model} onChange={this.handleChange} >
                                <option disabled value="">
                                    Select the Model
                                </option>
                                {models.map((c1, index) => (
                                    <option key={index}>{c1}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <h6>Color</h6>
                            <select className="form-control" name="color" value={color} onChange={this.handleChange} >
                                <option disabled value="">
                                    Select the Color
                                </option>
                                {colors.map((c1, index) => (
                                    <option key={index}>{c1}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <h4 className="text-center mt-3"><button className="btn btn-primary m-2" onClick={this.handleSubmit}>Submit</button></h4>
            </div>
        )
    }
}



export default AddCars;