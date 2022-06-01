const express = require("express");
const routes = express.Router();
const cattle = require("./cattle")


routes.use("/cattle", cattle);

module.exports= routes