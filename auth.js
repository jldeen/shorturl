const CognitoExpress = require("cognito-express");

// Setup CognitoExpress
const cognitoExpress = new CognitoExpress({
  region: process.env.AWS_DEFAULT_REGION,
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "access",
  tokenExpiration: 3600,
});

// Make post request to get accesstoken
const fetchToken = async (grantCode) => {
  const token_url =
    "https://s18stest.auth.us-east-1.amazoncognito.com/oauth2/token";

  const options = {
    method: "post",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic N3FnZXNvNTc5aHUyZ3Y1cWMyNTljaDBoMnI6NTY3dTNrNDhwc3I0ZzhocG81NzZ2ZGpsN3NmbXRkams4bHYxdmJlMjhobmVzbGhrMTly",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.COGNITO_CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
      code: grantCode,
    }),
  };

  const token = await fetch(token_url, options)
    .then((response) => response.json())
    .then((json) => {
      return json.access_token;
    })
    .catch((err) => console.error(err));
  return token;
};

exports.validateAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    cognitoExpress.validate(token, function (err, response) {
      //If API is not authenticated, Return 401 with error message.
      if (err) return res.status(401).send(err);

      //Else API has been authenticated. Proceed.
      res.locals.user = response;
      next();
    });
  } else {
    const grant_code = req.url.split("=")[1];
    if (!grant_code) return res.render("welcome");
    const token = await fetchToken(grant_code);

    if (token) {
      res.cookie("token", token, {
        httpOnly: true,
      });
    }
    //I'm passing in the access token in header under key accessToken
    let accessToken = token;
    //Fail if token not present in header.
    if (!accessToken) return res.render("welcome");

    cognitoExpress.validate(accessToken, function (err, response) {
      //If API is not authenticated, Return 401 with error message.
      if (err) return res.status(401).send(err);

      //Else API has been authenticated. Proceed.
      req.token = accessToken;
      res.locals.user = response;
      next();
    });
  }
};
