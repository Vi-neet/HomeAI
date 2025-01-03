require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const itemRoutes = require("./routes/items");
const userRoutes = require("./routes/user");
const app = express();
const cors = require("cors");
app.use(express.static('dist'))
app.use(cors());
//express app
//Middleware
// app.use(cors({
//     origin:`${process.env.FRONTEND_URL}`
// }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin",'*');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//Routes
app.use("/api/items", itemRoutes);
app.use("/api/user", userRoutes);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
