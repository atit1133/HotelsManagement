const express = require("express");
const app = express();

const port = 3002;

app.use(express.json());

const hotelRoutes = require("./routes/hotels");

app.use("/api/hotels", hotelRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
