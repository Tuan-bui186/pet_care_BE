const { Animal, User } = require("../models");

// Tạo mới một thú cưng
exports.createAnimal = async (req, res) => {
  try {
    const { name, species, age, furColor, gender, status, ownerId } = req.body;
    const animal = await Animal.create({
      name,
      species,
      age,
      furColor,
      gender,
      status,
      ownerId,
    });
    res.status(201).json(animal);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo thú cưng", error });
  }
};

// Lấy tất cả thú cưng
exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.findAll({
      include: [
        {
          model: User,
          as: "owner",
        },
      ],
    });

    if (!animals.length) {
      return res.status(404).json({ message: "Không có thú cưng nào" });
    }

    res.status(200).json(animals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách thú cưng", error });
  }
};

// Lấy một thú cưng theo ID
exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User,
          as: "owner",
        },
      ],
    });
    if (!animal) {
      return res.status(404).json({ message: "Thú cưng không tồn tại" });
    }
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin thú cưng", error });
  }
};

// Cập nhật thông tin thú cưng
exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findOne({ where: { id: req.params.id } });
    if (!animal) {
      return res.status(404).json({ message: "Thú cưng không tồn tại" });
    }

    // Cập nhật thông tin thú cưng
    const { name, species, age, furColor, gender, status, ownerId } = req.body;
    animal.name = name || animal.name;
    animal.species = species || animal.species;
    animal.age = age || animal.age;
    animal.furColor = furColor || animal.furColor;
    animal.gender = gender || animal.gender;
    animal.status = status || animal.status;
    animal.ownerId = ownerId || animal.ownerId;

    await animal.save();
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật thú cưng", error });
  }
};

// Xóa thú cưng
exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findOne({ where: { id: req.params.id } });
    if (!animal) {
      return res.status(404).json({ message: "Thú cưng không tồn tại" });
    }
    await animal.destroy();
    res.status(200).json({ message: "Thú cưng đã bị xóa" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa thú cưng", error });
  }
};
