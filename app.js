const express                 = require("express");
const app                     = express();
const passport                = require("passport");

const sessionMiddleware       = require("./middleware/session");
const initPassport            = require("./init/passport");
const initSocket              = require("./init/socket");
const initRoutes              = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(sessionMiddleware);

initPassport(app, passport);
initSocket(app, "chat");
initRoutes(app, passport);