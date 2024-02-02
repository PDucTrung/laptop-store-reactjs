const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/quenmatkhau", (req, res) => {
  const { receiEmail } = req.body;

  const user = "dtcomputer1107@gmail.com";
  const pass = "dt@12345";
  const subject = "Yêu cầu đặt lại mật khẩu cho Shop";

  // create transport
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  // create mail option
  const mailOptions = {
    to: receiEmail,
    subject: subject + Date.now(),
    html: `Xin chào ${receiEmail}!

    Ai đó đã yêu cầu mật khẩu mới cho tài khoản sau trên Shop:
    
    Tên người dùng: ${receiEmail}
    
    Nếu bạn không đưa ra yêu cầu này, chỉ cần bỏ qua email này. Nếu bạn muốn tiếp tục:
    
    
    <a href="http://localhost:3000/user/resetPassword/${receiEmail}">Nhấn vào đây để đặt lại mật khẩu của bạn</a>
    
    Cảm ơn vì đã đọc`,
  };

  // perform send mail
  transport.sendMail(mailOptions, function callback(error) {
    if (error) {
      console.log(error);
      res.status(500).send({
        message: "Có lỗi xảy ra!",
      });
    } else {
      console.log("Send mail successfully!");
      res.status(200).send({
        message: "Vui lòng kiểm tra email ,thư rác!",
      });
    }
  });
});
router.post("/notifyUser", (req, res) => {
  const { userInfor, cart } = req.body;
  const email = userInfor.email;
  const name = userInfor.name;

  const user = "dtcomputer1107@gmail.com";
  const pass = "dt@12345";
  const subject = "Thông báo đặt hàng thành công!";

  // create transport
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  // create mail option
  const mailOptions = {
    to: email,
    subject: subject,
    html: `Xin chào ${name}!
    <br>  
    Chúc mừng bạn đã đặt hàng thành công tại DTComputer!
    <br>
    Chúng tôi sẽ gửi bạn hàng sớm nhất có thể.
    <br>
    Chúc bạn một ngày tốt lành.
    <br>
    Trân trọng`,
  };

  // perform send mail
  transport.sendMail(mailOptions, function callback(error) {
    if (error) {
      console.log(error);
      res.status(500).send({
        message: "Có lỗi xảy ra!",
      });
    } else {
      console.log("Send mail successfully!");
      res.status(200).send({
        message: "Đặt hàng thành công.",
      });
    }
  });
});
module.exports = router;
