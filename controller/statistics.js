const { Pet } = require("../models"); // Đảm bảo rằng mô hình Pet đã được nhập

// Hàm thống kê
exports.getStatistics = async (req, res) => {
  try {
    const totalPets = await Pet.count(); // Tổng số thú cưng
    const soldPets = await Pet.count({ where: { status: 1 } }); // Thú cưng đã bán
    const pendingPets = await Pet.count({ where: { checkAdmin: 1 } }); // Thú cưng đang chờ duyệt
    const unapprovedPets = await Pet.count({ where: { checkAdmin: 0 } }); // Thú cưng chưa duyệt

    // Trả về thống kê
    res.json({
      totalPets,
      soldPets,
      pendingPets,
      unapprovedPets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra khi lấy thống kê" });
  }
};
