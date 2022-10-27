const express = require("express");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const randomString = require("randomstring");
const { validateAuth } = require("./middleware/auth");
const ShortUrl = require("./models/shortUrl");

const QRCodeCanvas = require("@loskir/styled-qr-code-node"); // TODO work on tomorrow

// const qrCode = require("./models/qrcode");
const helper = require("./middleware/helper");

// allow .env
require("dotenv").config();

// Connect to DB
mongoose.connect(
  process.env.MONGODB || "mongodb://mongodb:27017/urlShortener",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Initialize app
const app = express();

// App Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    cookie: {
      maxAge: 60000,
      sameSite: "strict",
    },
    resave: true,
    saveUninitialized: true,
  })
);

//flash message middleware
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// Set template engine
app.set("view engine", "ejs");

// Temp fix for qr place holder
app.use(express.static("public"));

// Cookie Same Site
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sessionConfig.cookie.secure = true; // serve secure cookies
}

// Routes
app.get("/", [validateAuth], async (req, res) => {
  const shortUrls = await ShortUrl.find();
  const origin = req.protocol + "://" + req.headers.host;

  res.render("index", {
    shortUrls: shortUrls,
    origin: origin,
    helper: helper,
  });
});

app.get("/logout", [validateAuth], async (req, res) => {
  res.clearCookie("token");
  console.log("signed out");
  res.redirect("/");
});

// create shorturl
app.post("/shortUrls", [validateAuth], async (req, res) => {
  const dbQuery = await ShortUrl.findOne({ short: req.body.vanityUrl });
  if (dbQuery) {
    // display error message if short url already exists
    req.session.message = {
      type: "danger",
      intro: `The vanity url "${dbQuery.short}" has already been taken.`,
      message: "Please try a different name.",
    };
  } else {
    await ShortUrl.create({
      full: req.body.fullUrl,
      short: req.body.vanityUrl || randomString.generate(7),
      // email: res.locals.user,
    });
    // Confirm short url created successfully
    req.session.message = {
      type: "success",
      intro: "Success!",
      message: "Short URL successfully created.",
    };
  }
  res.redirect("/");
});

// // generate qr
// app.post("/qr", [validateAuth], async (req, res) => {
//   const dbQuery = await ShortUrl.findOne({ short: req.body.vanityUrl });
//   const url = dbQuery.short;
//   console.log(url);
// });

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 3000);
