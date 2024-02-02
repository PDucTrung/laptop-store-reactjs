const User = require("../app/models/users");
const authAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (user.role === 0)
      res.status(400).json({ mgs: "Tài khoản không có quyền truy cập." });

    next();
  } catch (error) {
    res.status(500).json({ mgs: error.message });
  }
};

module.exports = authAdmin;
