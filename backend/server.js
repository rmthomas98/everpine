const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT_ORIGIN }));

const apiV1Router = require("./routes/v1");
app.use("/v1", apiV1Router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
