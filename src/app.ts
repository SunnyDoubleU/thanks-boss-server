import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

const PORT = 8080;
const app = express();
app.use(cors({ credentials: true, origin: [] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./route/index"));
app.use("/api", require("./route/user"));

app.listen(PORT, () => {
  console.log(`Thanks Boss Server listening at ${PORT}`);
});

mongoose
  .connect(`mongodb://localhost/thanksBoss1`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

module.exports = app;