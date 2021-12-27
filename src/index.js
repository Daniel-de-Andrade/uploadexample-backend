require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const cors = require("cors");

app.use(cors());

/**
 * Database setup
 */

//  mongoose.connect("mongodb://daniel:19870622@localhost:27017/admin", {
//   useNewUrlParser: true,
// });

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

// Permite ao express lidar com requisições com o corpo de mensagem no formato json.
app.use(express.json());
// Permite ao express lidar com requisições no padrão urlencoded. Facilita o envio de arquivos.
app.use(express.urlencoded({ extended: true }));
// Lib de log.
app.use(morgan("dev"));

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(require("./routes"));

app.listen(5000);
