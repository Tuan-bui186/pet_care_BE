module.exports = (app) => {
  const router = require("express").Router();
  const AppointmentController = require("../controller/appointment");

  // Thêm lịch khám
  router.post("/", AppointmentController.createAppointment);

  // Lấy danh sách lịch khám
  router.get("/", AppointmentController.getAllAppointments);

  // Lấy chi tiết lịch khám
  router.get("/:appointmentId", AppointmentController.getAppointmentDetails);

  // Cập nhật lịch khám
  router.put("/:appointmentId", AppointmentController.updateAppointment);

  // Xóa lịch khám
  router.delete("/:appointmentId", AppointmentController.deleteAppointment);

  app.use("/appointments", router);
};
