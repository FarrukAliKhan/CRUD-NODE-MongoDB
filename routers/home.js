const express = require("express");
const Router = express.Router();
const Club = require("../models/club");

Router.get("/", (err, res) => {
  res.render("index");
});

// Adding The new DATA
    Router.post("/add", (req, res) => {
       const name = req.body.name;
        const email = req.body.email;
        const club = new Club({ name, email });
        club.save(err=>{
          if(err){console.log("There is Error in Adding value")}
          else{res.redirect('/')}
        });
      });

// Find/dispaly DATA /show
Router.get("/show", (req, res) => {
  Club.find((err, docs) => {
    if (err) throw err;

    res.render("show", {
      students: docs,
    });
  });
});


// update DATA
// first get data by Unique ID coimg from show.ejs



Router.get("/edit/:id", (req, res) => {


  Club.findOneAndUpdate({ _id: req.params.id }, req.body, (err, docs) => {
    if (err) {
      console.log("cant updated");
    } else {
      res.render("edit", { studentdata: docs });
    }
  });
});
//Second store/add updated data again
Router.post("/edit/:id", (req, res) => {
  Club.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, docs) => {
    if (err) {
      console.log("error in updat");
    } else {
      res.redirect("/show");
    }
  });
});

// UPDATION END

//  Delete DATA 
Router.get("/delete/:id", (req, res) => {
  Club.findByIdAndDelete({ _id: req.params.id }, req.body, (err, docs) => {
    if (err) {
      console.log("error in Deletion");
    } else {
      res.redirect("/show");
    }
  });
});
 


module.exports = Router;
