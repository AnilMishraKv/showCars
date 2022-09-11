let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    next();
});
// const port = 2410;
const port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app is listening on post ${port}!`));

let carMaster = [
    {
        model: "Swift Dzire VXi", make: "Maruti", fuel: "Diesel",
        colors: ["White", "Silver Grey", "Metallic Blue", "Red"], type: "Sedan", transmission: "Manual"
    },
    {
        model: "Etios SMi", make: "Toyota", fuel: "Diesel",
        colors: ["White", "Silver Grey", "Black"], type: "Hatchback", transmission: "Manual"
    },
    {
        model: "City AXi", make: "Honda", fuel: "Petrol",
        colors: ["Silver Grey", "Metallic Blue", "Black"], type: "Sedan", transmission: "Automatic"
    },
    {
        model: "Swift DXi", make: "Maruti", fuel: "Diesel",
        colors: ["White", "Red", "Black"], type: "Hatchback", transmission: "Manual"
    },
    {
        model: "Etios VXi", make: "Toyota", fuel: "Diesel",
        colors: ["White", "Silver Grey", "Black"], type: "Sedan", transmission: "Manual"
    },
    {
        model: "City ZXi", make: "Honda", fuel: "Petrol",
        colors: ["Silver Grey", "Metallic Blue", "Red"], type: "Sedan", transmission: "Manual"
    }
];

let cars = [
    { id: "ABR12", price: 400000, year: 2015, kms: 25000, model: "Swift Dzire VXi", color: "White" },
    { id: "CBN88", price: 480000, year: 2012, kms: 75000, model: "Etios SMi", color: "Silver Grey" },
    { id: "XER34", price: 300000, year: 2013, kms: 55000, model: "City AXi", color: "Metallic Blue" },
    { id: "MPQ29", price: 400000, year: 2015, kms: 25000, model: "Swift DXi", color: "Black" },
    { id: "PYQ88", price: 480000, year: 2012, kms: 75000, model: "Etios VXi", color: "White" },
    { id: "DFI61", price: 300000, year: 2013, kms: 55000, model: "City ZXi", color: "Red" },
    { id: "JUW88", price: 400000, year: 2015, kms: 25000, model: "Swift Dzire VXi", color: "White" },
    { id: "KPW09", price: 285000, year: 2012, kms: 76321, model: "Swift Dzire VXi", color: "White" },
    { id: "NHH09", price: 725000, year: 2018, kms: 15000, model: "City ZXi", color: "Silver Grey" },
    { id: "CTT26", price: 815000, year: 2016, kms: 42500, model: "City AXi", color: "Metallic Blue" },
    { id: "VAU55", price: 345000, year: 2014, kms: 81559, model: "Swift DXi", color: "Red" },
    { id: "BTR31", price: 184000, year: 2011, kms: 120833, model: "Etios VXi", color: "Silver Grey" }
];

app.get("/svr/cars", function (req, res) {
    let fuel = req.query.fuel;
    let type = req.query.type;
    let transmission = req.query.transmission;
    let make = req.query.make;
    let data1 = cars;
    data1 = filterParam(data1, "fuel", fuel);
    data1 = filterParam(data1, "type", type);
    data1 = filterParam(data1, "transmission", transmission);
    data1 = filterParam(data1, "make", make);
    let minP = +req.query.minP;
    let maxP = +req.query.maxP;
    let model = req.query.model;
    let color = req.query.color;
    let manuFyear = req.query.manuFyear;
    // console.log(manuFyear);
    if (minP) data1 = data1.filter((d1) => d1.price >= minP);
    if (maxP) data1 = data1.filter((d1) => d1.price <= maxP);
    if (color) data1 = data1.filter((d1) => d1.color === color);
    if (model) data1 = data1.filter((d1) => d1.model === model);
    if (manuFyear)
        data1 = manuFyear === "2010-2013" ? data1.filter((d1) => d1.year >= 2010 && d1.year <= 2013)
            : data1.filter((d1) => d1.year >= 2014 && d1.year <= 2018);
    res.send(data1);
});

app.get("/svr/cars/:id", function (req, res) {
    let id = req.params.id;
    let obj = cars.find((obj1) => obj1.id === id);
    obj ? res.send(obj) : res.send("not found");
});

app.post("/svr/cars", function (req, res) {
    let body = req.body;
    // console.log(body);
    cars.push(body);
    res.send(body);
});

app.put("/svr/cars/:id", function (req, res) {
    let id = req.params.id;
    // console.log(id);
    let body = req.body;
    console.log(body);
    let index = cars.findIndex((ct) => ct.id === id);
    if (index >= 0) {
        let updatedCar = { id: id, ...body };
        cars[index] = updatedCar;
        res.send(updatedCar);
    }
    else
        res.status(404).send("No Car Found !!!");
});

app.delete("/svr/cars/:id", function (req, res) {
    let id = req.params.id;
    let index = cars.findIndex((ct) => ct.id === id);
    if (index >= 0) {
        let deleteCar = cars.splice(index, 1);
        res.send(deleteCar);
    }
    else res.status(404).send("No Car Found !!!");
});

let filterParam = (arr, name, value) => {
    if (!value) return arr;
    let valuesArr = carMaster.filter((f1) => f1[name] === value);
    let arr1 = arr.filter((a1) => valuesArr.find((val) => val.model === a1.model));
    // console.log(arr1);
    return arr1;
};

let makeData = (pageNum, size, data1) => {
    let startIndex = (pageNum - 1) * size;
    let endIndex =
        data1.length > startIndex + size - 1
            ? startIndex + size - 1
            : data1.length - 1;
    let data2 = data1.filter(
        (lt, index) => index >= startIndex && index <= endIndex
    );
    let dataFull = {
        startIndex: data1.length > 0 ? startIndex + 1 : 0,
        endIndex: data1.length > 0 ? endIndex + 1 : 0,
        numOfItems: data1.length,
        persons: data2,
    };
    return dataFull;
};