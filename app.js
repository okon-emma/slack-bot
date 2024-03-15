const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const port = process.env.PORT || 8080;

// Set up the express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(helmet());
app.use(cors());
app.use(logger("dev"));

// Routes
app.use("/", require("./routes/index"));
app.use("/weather", require("./routes/getWeather"));

app.use((req, res, next) => {
    res.status(404).send({ success: false, message: "This route does not exist" });
});

app.listen(port, console.log(`Server Started on Port ${port} -/-/-/-`));