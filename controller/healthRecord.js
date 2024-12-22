const { HealthRecord, Appointment, Animal } = require("../models");

// Thêm hồ sơ sức khỏe
exports.addHealthRecord = async (req, res) => {
  const { appointmentId, diagnosis, prescription, feedingPlan } = req.body;

  try {
    // Kiểm tra lịch khám
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Lịch khám không tồn tại" });
    }

    // Kiểm tra thú cưng liên quan
    const pet = await Animal.findByPk(appointment.petId);
    if (!pet) {
      return res.status(404).json({ message: "Thú cưng không tồn tại" });
    }

    // Tạo hồ sơ sức khỏe
    const healthRecord = await HealthRecord.create({
      appointmentId,
      petId: pet.id,
      visitDate: appointment.appointmentDate,
      diagnosis,
      prescription,
      feedingPlan,
    });

    res.status(201).json({
      message: "Thêm hồ sơ sức khỏe thành công",
      healthRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi thêm hồ sơ sức khỏe", error });
  }
};

// Lấy tất cả hồ sơ sức khỏe
exports.getAllHealthRecords = async (req, res) => {
  try {
    const healthRecords = await HealthRecord.findAll({
      include: [
        { model: Appointment, as: "appointment" },
        { model: Animal, as: "pet" },
      ],
    });

    if (healthRecords.length === 0) {
      return res.status(404).json({ message: "Không có hồ sơ sức khỏe nào" });
    }

    res.status(200).json(healthRecords);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Lỗi khi lấy tất cả hồ sơ sức khỏe", error });
  }
};

// Lấy danh sách hồ sơ sức khỏe theo lịch khám
exports.getHealthRecordsByAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const healthRecords = await HealthRecord.findAll({
      where: { appointmentId },
      include: [
        { model: Appointment, as: "appointment" },
        { model: Animal, as: "pet" },
      ],
    });

    if (healthRecords.length === 0) {
      return res.status(404).json({ message: "Không có hồ sơ sức khỏe nào" });
    }

    res.status(200).json(healthRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy hồ sơ sức khỏe", error });
  }
};

// Cập nhật hồ sơ sức khỏe
exports.updateHealthRecord = async (req, res) => {
  const { healthRecordId } = req.params;
  const { diagnosis, prescription, feedingPlan } = req.body;

  try {
    const healthRecord = await HealthRecord.findByPk(healthRecordId);
    if (!healthRecord) {
      return res.status(404).json({ message: "Hồ sơ sức khỏe không tồn tại" });
    }

    healthRecord.diagnosis = diagnosis || healthRecord.diagnosis;
    healthRecord.prescription = prescription || healthRecord.prescription;
    healthRecord.feedingPlan = feedingPlan || healthRecord.feedingPlan;

    await healthRecord.save();

    res.status(200).json({
      message: "Cập nhật hồ sơ sức khỏe thành công",
      healthRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi cập nhật hồ sơ sức khỏe", error });
  }
};

// Xóa hồ sơ sức khỏe
exports.deleteHealthRecord = async (req, res) => {
  const { healthRecordId } = req.params;

  try {
    const healthRecord = await HealthRecord.findByPk(healthRecordId);
    if (!healthRecord) {
      return res.status(404).json({ message: "Hồ sơ sức khỏe không tồn tại" });
    }

    await healthRecord.destroy();

    res.status(200).json({ message: "Xóa hồ sơ sức khỏe thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi xóa hồ sơ sức khỏe", error });
  }
};
