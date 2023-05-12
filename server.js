const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes/blogRoutes")
const dbConnect = require("./config/database");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1",routes);

dbConnect();

app.listen(port,()=>{
  console.log(`server started on port ${port}`);
})
