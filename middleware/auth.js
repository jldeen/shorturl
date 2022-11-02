const jwt = require("jsonwebtoken");
const { fetchToken, validateToken } = require("../middleware/tokens");
const config = require("../middleware/config");

function decodeToken(id_token) {
  const response = jwt.decode(id_token);
  return response;
}

exports.validateAuth = async (req, res, next) => {
  const access_token = req.cookies.token;
  // if cookie token exists, check to see if valid
  if (access_token) {
    validateToken(access_token, res, next);
  } else {
    const grant_code = req.url.split("=")[1];
    if (!grant_code) {
      return res.render("welcome", {
        origin: config.siteUrl,
        cognitoLoginUrl: config.cognitoLoginUrl,
        cognitoClientId: config.cognitoClientId,
      });
    }
    const tokens = await fetchToken(grant_code);
    const access_token = tokens.access_token;
    const id_token = tokens.id_token;
    const user = decodeToken(id_token).email;

    // If access token retrieved, set as cookie for future
    if (access_token) {
      res.cookie("token", access_token, {
        httpOnly: true,
      });
      res.cookie("user", user, {
        httpOnly: true,
      });
    }

    validateToken(access_token, res, next);
  }
};
