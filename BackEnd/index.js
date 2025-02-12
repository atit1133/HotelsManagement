const express = require("express");
const app = express();
const cors = require("cors");

const port = 3002;
const host = "192.168.1.116";

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET,POST,PUT,DELETE"],
    allowedHeaders: ["Content-Type,Authorization"],
  })
);

const hotelRoutes = require("./routes/hotels");
const roomRoutes = require("./routes/rooms");
const roomType = require("./routes/roomtype");
const booking = require("./routes/booking");
const staff = require("./routes/staff");
const guest = require("./routes/guest");

app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/roomtype", roomType);
app.use("/api/booking", booking);
app.use("/api/staff", staff);
app.use("/api/guest", guest);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://${host}:${port}`);
});
