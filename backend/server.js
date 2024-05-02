const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

const apiV1Router = require("./routes/v1");
app.use("/v1", apiV1Router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
