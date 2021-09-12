var New = require("../models").New;
var TagNew = require("../models").TagNew;
var Tag = require("../models").Tag;
require("dotenv").config();
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
  New.create(req.body, { include: ["tagnew"] })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findall = (req, res) => {
  var page = req.query.page;
  if (page) {
    page = parseInt(page);
    let soLuongBoQua = (page - 1) * PAGE_SIZE;
    New.findAndCountAll({
      order: [["id", "DESC"]],
      offset: soLuongBoQua,
      limit: PAGE_SIZE,
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  } else {
    New.findAndCountAll({
      order: [["id", "DESC"]],
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};
exports.newsHome = (req, res) => {
  var page = req.query.page;
  if (page) {
    page = parseInt(page);
    let soLuongBoQua = (page - 1) * 8;
    New.findAndCountAll({
      order: [["id", "DESC"]],
      offset: soLuongBoQua,
      limit: 8,
      where: { status: 1 },
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  } else {
    New.findAndCountAll({
      order: [["id", "DESC"]],
      limit: 8,
      where: { status: 1 },
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};
exports.findone = (req, res) => {
  New.findOne({ where: { id: req.params.id }, include: [{ model: Tag }] })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.delete = (req, res) => {
  New.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.update = (req, res) => {
  New.update(req.body, {
    where: { id: req.params.id },
    include: {
      model: TagNew,
      as: "tagnew",
    },
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
