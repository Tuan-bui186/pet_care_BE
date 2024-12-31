// routes/statisticsRouter.js
module.exports = (app) => {
  var StatisticsController = require("../controller/statistics");
  var router = require("express").Router();

  router.get("/", StatisticsController.getStatistics);

  app.use("/statistics", router);
};
