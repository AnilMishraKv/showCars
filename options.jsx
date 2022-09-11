import React, { Component } from "react";
class Options extends Component {
    handleChange = (e) => {
        const { currentTarget: input } = e;
        let options = { ...this.props.options };
        options[input.name] = input.value;
        console.log("optionsCB", options);
        this.props.onOptionChange(options);
    };

    showRadios = (arr, value, name, label) => (
        <React.Fragment>
            <label className="form-check-label font-weight-bold text-center">{label}</label>
            {arr.map((opt, index) => (
                <div className="form-check" key={index}>
                    <input
                        className="form-check-input "
                        type="radio"
                        name={name}
                        value={opt}
                        checked={value === opt}
                        onChange={this.handleChange}
                    />
                    <label className="form-check-label">{opt}</label>
                </div>
            ))}
        </React.Fragment>
    )

    render() {
        let { fuel = "", type = "", sort = "", transmission = "", make = "", color = "", model = "", manuFyear = "" } = this.props.options;
        let { fuels, types, sortArr, transmissions, makers, colors, models, manufecturedYear } = this.props;
        return (
            <div className="row m-2">
                <div className="col-12 bg-light border">
                    {this.showRadios(fuels, fuel, "fuel", "Fuel")}
                </div>
                <div className="col-12 bg-light border mt-3">
                    {this.showRadios(types, type, "type", "Type")}
                </div>
                <div className="col-12 bg-light border mt-3">
                    {this.showRadios(sortArr, sort, "sort", "Sort")}
                </div>
                <div className="col-12 bg-light border mt-3">
                    {this.showRadios(transmissions, transmission, "transmission", "Transmission")}
                </div>
                <div className="col-12 bg-light border mt-3">
                    {this.showRadios(makers, make, "make", "Maker")}
                </div>
                <div className="col-12 bg-light border mt-3">
                    {this.showRadios(colors, color, "color", "Color")}
                </div>
                <div className="col-12 bg-light border mt-3">
                    {this.showRadios(models, model, "model", "Model")}
                </div>
                <div className="col-12 bg-light border mt-3">
                    {this.showRadios(manufecturedYear, manuFyear, "manuFyear", "Manufecture Btw Years :")}
                </div>
            </div>
        )
    }
}
export default Options;