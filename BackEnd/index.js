const express = require("express");
const app = express();
const cors = require("cors");

const port = 3002;

app.use(express.json());
app.use(cors());

const hotelRoutes = require("./routes/hotels");
const roomRoutes = require("./routes/rooms");
const roomType = require("./routes/roomType");
const booking = require("./routes/booking");

app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/roomtype", roomType);
app.use("/api/booking", booking);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
