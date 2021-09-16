module.exports = (app) => {
  var Pet = require("../controller/Pet");
  var router = require("express").Router();

  router.post("/", Pet.create);
  router.get("/", Pet.findall);
  router.get("/:id", Pet.findone);
  router.delete("/:id", Pet.delete);
  router.patch("/:id", Pet.update);
  app.use("/pets", router);
};
