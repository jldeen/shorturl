const jwt = require("jsonwebtoken");
const { fetchToken, validateToken } = require("../middleware/tokens");

function decodeToken(id_token) {
  const response = jwt.decode(id_token);
  return response;
}

exports.validateAuth = async (req, res, next) => {
  const access_token = req.cookies.token;
  if (access_token) {
    validateToken(access_token, res, next);
  } else {
    const grant_code = req.url.split("=")[1];
    if (!grant_code) return res.render("welcome");

    const tokens = await fetchToken(grant_code);
    const access_token = tokens.access_token;
    const id_token = tokens.id_token;
    const user = decodeToken(id_token).email;
    // If access token retrieved, set as cookie for future
    if (access_token) {
      res.cookie("token", access_token, {
        httpOnly: true,
      });
    }

    //Fail if token not present in header.
    if (!access_token) return res.render("welcome");
    validateToken(access_token, res, next);
  }
};
