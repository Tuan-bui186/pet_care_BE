var Pet = require("../models").Pet;
const Op = require("Sequelize").Op;
var User = require("../models").User;
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
        order: [["createdAt", "DESC"]],
        offset: soLuongBoQua,
        limit: PAGE_SIZE,
        where: { checkAdmin: 2 },
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else if (status && !page) {
      Pet.findAndCountAll({
        where: { status: status, checkAdmin: 2 },
        order: [["createdAt", "DESC"]],
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else {
      Pet.findAndCountAll({
        where: { status: status, checkAdmin: 2 },
        order: [["createdAt", "DESC"]],
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
    Pet.findAndCountAll({
      order: [["createdAt", "DESC"]],
      where: { checkAdmin: 2 },
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};
exports.checkPet = (req, res) => {
  var page = req.query.page;
  page = parseInt(page);
  let soLuongBoQua = (page - 1) * PAGE_SIZE;
  if (page) {
    Pet.findAndCountAll({
      where: { checkAdmin: { [Op.ne]: [0] } },
      order: [["id", "DESC"]],
      offset: soLuongBoQua,
      limit: PAGE_SIZE,
      include: [{ model: User, attributes: ["firstName", "lastName"] }],
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  } else {
    Pet.findAndCountAll({
      where: {
        checkAdmin: { [Op.ne]: [0] },
      },
      order: [["id", "DESC"]],
      include: [User],
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
  Pet.findOne({
    where: { id: req.params.id },
    include: ["imgpet"],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.getPetUser = (req, res) => {
  console.log("hello");
  Pet.findAndCountAll({ where: { userId: req.params.id } })
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
exports.countTypePet = (req, res) => {
  Pet.findAll({
    attributes: ["type"],
  })
    .then((data) => {
      let dog = 0;
      let cat = 0;
      let other = 0;
      for (let i = 0; i < data.length; i++) {
        const element = data[i].dataValues.type;
        if (element === "chó") {
          dog += 1;
        } else if (element === "mèo") {
          cat += 1;
        } else {
          other += 1;
        }
      }
      res.json({ countDog: dog, countCat: cat, countOther: other });
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
