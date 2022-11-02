const CognitoExpress = require("cognito-express");

const config = require("../middleware/config");
require("dotenv").config();

// Setup CognitoExpress
const cognitoExpress = new CognitoExpress({
  region: process.env.AWS_DEFAULT_REGION,
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "access",
  tokenExpiration: 3600,
});

exports.fetchToken = async (grantCode) => {
  const token_url = config.cognitoLoginUrl + "/oauth2/token";

  const authorization = btoa(
    config.cognitoClientId + ":" + process.env.COGNITO_CLIENT_SECRET
  );
  const options = {
    method: "post",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authorization}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: config.cognitoClientId,
      redirect_uri: config.siteUrl,
      code: grantCode,
    }),
  };

  const tokens = await fetch(token_url, options)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.error(err));
  return tokens;
};

exports.validateToken = async (access_token, res, next) => {
  cognitoExpress.validate(access_token, function (err, response) {
    //If API is not authenticated, redirect to login again
    if (err) {
      res.clearCookie("token");
      res.clearCookie("user");
      return res.render("welcome", {
        origin: config.siteUrl,
        cognitoLoginUrl: config.cognitoLoginUrl,
        cognitoClientId: config.cognitoClientId,
      });
    }

    //Else API has been authenticated. Proceed.
    next();
  });
};
