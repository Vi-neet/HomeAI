require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const itemRoutes = require("./routes/items");
const cors = require('cors');

//express app
const app = express();
//Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//Routes
app.use("/api/items", itemRoutes);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));

// Remove this redundant app.listen call
// app.listen(process.env.PORT, () => {
//   console.log(`Listening on port ${process.env.PORT}`);
// });
