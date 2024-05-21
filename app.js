const express = require("express");
const app = express();
const Database = require("./DbConnaction/DataBase");
require("dotenv").config();
Database();
const cors = require("cors");
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Routes = require("./routes/Route");
app.use(Routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
