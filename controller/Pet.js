var Pet = require("../models").Pet;
var ImagePet = require("../models").ImagePet;
require("dotenv").config();
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
  Pet.create(req.body, { include: ["imgpet"] })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findall = (req, res) => {
  var page = req.query.page;
  var status = req.query.status;
  page = parseInt(page);
  let soLuongBoQua = (page - 1) * PAGE_SIZE;
  if (page || status) {
    if (page && !status) {
      Pet.findAndCountAll({
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
    } else if (status && !page) {
      Pet.findAndCountAll({
        where: { status: status },
        order: [["id", "DESC"]],
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else {
      Pet.findAndCountAll({
        where: { status: status },
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
    }
  } else {
    Pet.findAndCountAll({ order: [["id", "DESC"]] })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};
exports.findone = (req, res) => {
  Pet.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.delete = (req, res) => {
  Pet.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.update = (req, res) => {
  Pet.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};