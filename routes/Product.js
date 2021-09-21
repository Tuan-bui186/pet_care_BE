module.exports = (app) => {
  var Product = require("../controller/Product");
  var router = require("express").Router();

  router.post("/", Product.create);
  router.get("/", Product.findall);
  router.get("/:id", Product.findone);
  router.delete("/:id", Product.delete);
  router.patch("/:id", Product.update);
  app.use("/products", router);
};
