import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as session from "express-session";

const MongoStore = require("connect-mongo")(session);
const PORT = 8080;
const app = express();

app.use(cors({ credentials: true, origin: [] }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./route/index"));
app.use("/api", require("./route/user"));
app.use("/api", require("./route/event"));
app.use("/api", require("./route/transaction"));

app.use(
  session({
    key: "user_sid",
    secret: "basic-auth-secret",
    resave: true,
    saveUninitialized: true, // option when youre setting up the cookie for the session for the first time, whether it will automatically save or not
    cookie: { maxAge: 24 * 60 * 60 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
  })
);

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
