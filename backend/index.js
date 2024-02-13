const express = require("express");
const mainRouter = require("./routes/index");
const cors = require("cors");
const { JWT_SECRET } = require("./config");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(port, function () {
  console.log("listening on port " + port);
});
