module.exports = (app) => {
  var User = require("../controller/User");
  var router = require("express").Router();

  router.post("/", User.create);
  router.get("/", User.findall);
  router.get("/login", User.findone);
  router.delete("/:id", User.delete);
  router.patch("/:id", User.update);
  app.use("/users", router);
};
