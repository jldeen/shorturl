const CognitoExpress = require("cognito-express");
require("dotenv").config();

// Setup CognitoExpress
const cognitoExpress = new CognitoExpress({
  region: process.env.AWS_DEFAULT_REGION,
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "access",
  tokenExpiration: 3600,
});

exports.fetchToken = async (grantCode) => {
  const token_url =
    "https://s18stest.auth.us-east-1.amazoncognito.com/oauth2/token";

  const authorization = btoa(
    process.env.COGNITO_CLIENT_ID + ":" + process.env.COGNITO_CLIENT_SECRET
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
      client_id: process.env.COGNITO_CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
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
    //If API is not authenticated, redirect to login
    if (err) {
      //   return res.status(403).send(err)
      console.log(err);
      res.clearCookie("token");
      return res.render("welcome", err);
    }

    //Else API has been authenticated. Proceed.
    next();
  });
};
