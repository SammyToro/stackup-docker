const express = require("express");
const connectDB = require("./db");
const routes = require("./routes");

const app = express();

connectDB();

app.use(express.json());
app.use('/',routes);

const port = 5000;

app.listen(port, () => {
    console.log("API server started on port 5000");
});