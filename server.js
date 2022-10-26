const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const randomstring = require("randomstring");
const qrcode = require("qrcode");

const { validateAuth } = require("./auth");

const ShortUrl = require("./models/shortUrl");
const helper = require("./helper");

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

// Temp fix for qr place holder
app.use(express.static("public"));

// Cookie Same Site
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // trust first proxy
  // sessionConfig.cookie.secure = true; // serve secure cookies
}

//flash message middleware
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// Set template engine
app.set("view engine", "ejs");

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
  res.render("welcome");
});

// create shorturl
app.post("/shortUrls", async (req, res) => {
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
      short: req.body.vanityUrl || randomstring.generate(7),
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

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 3000);
