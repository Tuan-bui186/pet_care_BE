const { Appointment, Animal } = require("../models");

// Thêm lịch khám
exports.createAppointment = async (req, res) => {
  const { petId, appointmentDate } = req.body;

  try {
    // Kiểm tra nếu thú cưng tồn tại
    const pet = await Animal.findByPk(petId);
    if (!pet) {
      return res.status(404).json({ message: "Thú cưng không tồn tại" });
    }

    // Tạo lịch khám
    const newAppointment = await Appointment.create({
      petId,
      appointmentDate,
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi tạo lịch khám", error });
  }
};

// Lấy tất cả lịch khám
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [{ model: Animal, as: "pet" }],
    });
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách lịch khám", error });
  }
};

// Lấy chi tiết lịch khám theo ID
exports.getAppointmentDetails = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findByPk(appointmentId, {
      include: [{ model: Animal, as: "pet" }],
    });

    if (!appointment) {
      return res.status(404).json({ message: "Lịch khám không tồn tại" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy chi tiết lịch khám", error });
  }
};

// Cập nhật lịch khám
exports.updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Lịch khám không tồn tại" });
    }

    appointment.status = status || appointment.status;

    await appointment.save();
    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi cập nhật lịch khám", error });
  }
};

// Xóa lịch khám
exports.deleteAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Lịch khám không tồn tại" });
    }

    await appointment.destroy();
    res.status(200).json({ message: "Lịch khám đã được xóa" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi xóa lịch khám", error });
  }
};
