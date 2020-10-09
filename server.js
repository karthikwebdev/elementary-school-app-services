const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");

//middlewares
require("dotenv").config();
connectDB();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use('/parents',require('./routes/parents'))
app.use('/visiters',require('./routes/visiters'))

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Page Not Found",
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Running at port ${PORT}`);
});