import React, { Component } from "react";
import http from "./httpService";
class DeleteCar extends Component {

    async componentDidMount() {
        const { id } = this.props.match.params;
        let responce = await http.deleteApi(`/cars/${id}`);
        this.props.history.push("/cars");
    }

    render() {
        return "";
    }
}
export default DeleteCar;