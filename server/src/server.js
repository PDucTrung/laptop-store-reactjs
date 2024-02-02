const path = require("path");
const express = require("express");
const { urlencoded, json } = require("express");
const db = require("./config/db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

require("dotenv").config();
//import routes
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const categoryRouter = require("./routes/categories");
const uploadRouter = require("./routes/upload");
const paymentRouter = require("./routes/payment");
const paymentsCheckoutRouter = require("./routes/paymentsCheckout");
const sliderRouter = require("./routes/slider");
const sendmailerRouter = require("./routes/sendmails");
const CommentrRouter = require("./routes/comment");

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));
app.use(json());

//routes
app.use("/api", productsRouter);
app.use("/user", usersRouter);
app.use("/api", categoryRouter);
app.use("/api", uploadRouter);
app.use("/api", paymentRouter);
app.use("/api", paymentsCheckoutRouter);
app.use("/api", sliderRouter);
app.use("/api", sendmailerRouter);
app.use("/api", CommentrRouter);

//db connect
db.connect();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
