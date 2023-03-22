const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoDB = require("./config/mongoDB");

const { errorHandler } = require("./middleware/errorMiddleware");

//connect to MongoDB
mongoDB();

const app = express();

//allow Cross-Origin Ressource Sharing
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  next();
});

/*
OR, instead, use the following 
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);


*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));
//Routing system
app.use("/api/auth", require("./routes/authentication"));
app.use("/api/sauces", require("./routes/sauces"));
//Error Handling Middleware
app.use(errorHandler);

module.exports = app;
