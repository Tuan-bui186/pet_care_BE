var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send(
    "<h1>Chào tất cả các bạn đến với api dịch vụ thú cưng của tôi!</h1>"
  );
});
require("./routes/Tag")(app);
require("./routes/TagNew")(app);
require("./routes/New")(app);
require("./routes/User")(app);
require("./routes/Role")(app);
app.use(function (err, req, res, next) {
  res.status(500).send(err);
});

app.listen(process.env.PORT || 555, () => {
  console.log(
    `Chào mừng bạn đến với Backend http://localhost:${process.env.PORT}`
  );
});
