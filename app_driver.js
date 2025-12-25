"use strict";
const express = require("express");
const app = express();


app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));


app.use("/public", express.static(__dirname + "/public"));


app.listen(8080, () => console.log("Server running on port 8080"));


let driver = [
  {
    id: 1,
    code: "DD",
    name: "ダイナミックドライバー",
    cost: "比較的安価",
    features: "現在最も広く普及しているユニット,一つで広い範囲の周波数の音を鳴らすことができる"
  }
];


let nextId = 2;


app.get("/driver", (req, res) => {
  res.render("driver_list", { data: driver });
});


app.get("/driver/create", (req, res) => {
  res.render("driver_create");
});


app.post("/driver", (req, res) => {
  const newData = {
    id: nextId++,
    code: req.body.code,
    name: req.body.name,
    cost: req.body.cost,
    features: req.body.features
  };
  driver.push(newData);
 
  res.redirect("/driver");
});


app.get("/driver/edit/:id", (req, res) => {
  const id = req.params.id;
  const target = driver.find((item) => item.id == id);
  if (target) {
    res.render("driver_edit", { data: target });
  } else {
    res.send("データが見つかりません");
  }
});


app.post("/driver/update/:id", (req, res) => {
  const id = req.params.id;
  const index = driver.findIndex((item) => item.id == id);
  
  if (index !== -1) {
    driver[index].code = req.body.code;
    driver[index].name = req.body.name;
    driver[index].cost = req.body.cost;
    driver[index].features = req.body.features;
  }
  res.redirect("/driver");
});


app.get("/driver/delete/:id", (req, res) => {
  const id = req.params.id;
  
  driver = driver.filter((item) => item.id != id);
  res.redirect("/driver");
});


app.get("/driver/:id", (req, res) => {
  const id = req.params.id;
  const target = driver.find((item) => item.id == id);
  
  if (target) {
    res.render("driver_detail", { data: target });
  } else {
    res.send("データが見つかりません");
  }
});