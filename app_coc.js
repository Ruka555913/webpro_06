"use strict";
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));

app.listen(8080, () => console.log("Server running on port 8080"));

let coc = [
  {
    id: 1,
    name: "エレーナ・クレセント",
    job: "狂信者",
    str: 10, con: 13, pow: 17, dex: 11,
    app: 13, siz: 13, int: 10, edu: 10,
    memo: "とある出来事により魔導書「The Book of Eibon」の写しを手に入れ、邪神ヨグ＝ソトースを信仰するようになった人物"
  }
];

let nextId = 2;

app.get("/coc", (req, res) => {
  res.render("coc_list", { data: coc });
});

app.get("/coc/create", (req, res) => {
  res.render("coc_create");
});

app.post("/coc", (req, res) => {
  const newData = {
    id: nextId++,
    name: req.body.name,
    job: req.body.job,
    str: req.body.str, con: req.body.con,
    pow: req.body.pow, dex: req.body.dex,
    app: req.body.app, siz: req.body.siz,
    int: req.body.int, edu: req.body.edu,
    memo: req.body.memo
  };
  coc.push(newData);
  res.redirect("/coc");
});

app.get("/coc/edit/:id", (req, res) => {
  const id = req.params.id;
  const target = coc.find((item) => item.id == id);
  if (target) {
    res.render("coc_edit", { data: target });
  } else {
    res.send("Data not found");
  }
});

app.post("/coc/update/:id", (req, res) => {
  const id = req.params.id;
  const index = coc.findIndex((item) => item.id == id);
  
  if (index !== -1) {
    coc[index].name = req.body.name;
    coc[index].job = req.body.job;
    coc[index].str = req.body.str; coc[index].con = req.body.con;
    coc[index].pow = req.body.pow; coc[index].dex = req.body.dex;
    coc[index].app = req.body.app; coc[index].siz = req.body.siz;
    coc[index].int = req.body.int; coc[index].edu = req.body.edu;
    coc[index].memo = req.body.memo;
  }
  res.redirect("/coc");
});

app.get("/coc/delete/:id", (req, res) => {
  const id = req.params.id;
  coc = coc.filter((item) => item.id != id);
  res.redirect("/coc");
});

app.get("/coc/:id", (req, res) => {
  const id = req.params.id;
  const target = coc.find((item) => item.id == id);
  
  if (target) {
    res.render("coc_detail", { data: target });
  } else {
    res.send("Data not found");
  }
});