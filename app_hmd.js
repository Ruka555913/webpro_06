"use strict";
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));

app.listen(8080, () => console.log("Server running on port 8080"));

let hmd = [
  {
    id: 1,
    name: "Meta Quest 3",
    maker: "Meta",
    price: 74800,
    resolution: "2064x2208 (片目)",
    memo: "カラーパススルー対応,パンケーキレンズ搭載,最もポピュラーなHMD"
  }
];

let nextId = 2;

app.get("/hmd", (req, res) => {
  res.render("hmd_list", { data: hmd });
});

app.get("/hmd/create", (req, res) => {
  res.render("hmd_create");
});

app.post("/hmd", (req, res) => {
  const newData = {
    id: nextId++,
    name: req.body.name,
    maker: req.body.maker,
    price: req.body.price,
    resolution: req.body.resolution,
    memo: req.body.memo
  };
  hmd.push(newData);
  res.redirect("/hmd");
});

app.get("/hmd/edit/:id", (req, res) => {
  const id = req.params.id;
  const target = hmd.find((item) => item.id == id);
  if (target) {
    res.render("hmd_edit", { data: target });
  } else {
    res.send("Data not found");
  }
});

app.post("/hmd/update/:id", (req, res) => {
  const id = req.params.id;
  const index = hmd.findIndex((item) => item.id == id);
  
  if (index !== -1) {
    hmd[index].name = req.body.name;
    hmd[index].maker = req.body.maker;
    hmd[index].price = req.body.price;
    hmd[index].resolution = req.body.resolution;
    hmd[index].memo = req.body.memo;
  }
  res.redirect("/hmd");
});

app.get("/hmd/delete/:id", (req, res) => {
  const id = req.params.id;
  hmd = hmd.filter((item) => item.id != id);
  res.redirect("/hmd");
});

app.get("/hmd/:id", (req, res) => {
  const id = req.params.id;
  const target = hmd.find((item) => item.id == id);
  
  if (target) {
    res.render("hmd_detail", { data: target });
  } else {
    res.send("Data not found");
  }
});