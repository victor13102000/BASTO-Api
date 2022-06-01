const express = require("express");
const cattle = express.Router();
const database = require("../database.js");
const controllersCattle = require("../controllers/Cattle");
global.config = require("../../config.json");

(async () => {
  const databaseConnection = await database.getConnection(
    global.config.database.url
  );

 cattle.post("/create", (req, res) => {
    controllersCattle.createCattle(req, res, databaseConnection);
  });
 cattle.delete("/delete", (req, res) => {
    controllersCattle.deleteCattle(req, res, databaseConnection);
  });
 cattle.put('/update',(req,res)=>{
    controllersCattle.updateCattle(req,res,databaseConnection)
  })

 cattle.get('/list', (req,res)=>{
    controllersCattle.getCattle(req,res,databaseConnection)
  })
})();

module.exports = cattle;
