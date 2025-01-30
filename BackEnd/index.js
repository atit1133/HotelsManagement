const express = require("express");
const app = express();

const port = 3002;

app.use(express.json());

const hotelRoutes = require("./routes/hotels");
const roomRoutes = require("./routes/rooms");
const roomType = require("./routes/roomType");

app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/roomtype", roomType);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
