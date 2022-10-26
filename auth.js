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
  function checkForToken() {
    const cookies = req.cookies;
    console.log(cookie);
  }

  const grant_code = req.url.split("=")[1];

  if (!grant_code) return res.redirect("welcome");

  // const token = await fetchToken(grant_code);
  const token =
    "H4sIAAAAAAAAAAHbACT/c4drmVMj8JhIVfsRuDoZ/pnFmNu3k5Pcvr4e+48slxJMgpJ1VRPdauOLLR96n0S7Y6nsoOKVGfxiGcdcjEgGeZpkjiGDTpJjIWForaLpjYfVn7zgx56Y6DnVu6jlqH56YWr0COAzBZGDscQmrnIXrtXOm9zHfkF6CDYXIM3v8tVCtEtbOrXOgDPGDEdflzFWRfMrxdrRb7NCyjY69yIZ6UvZO++gVdI42B4iSM/paHrfTZvc2tblg4GQM8Ph51FPgkfE3F2NecrcxOzBuBP8hA9Yirfz+XGuouv/5dp9/tsAAAA=.H4sIAAAAAAAAAAEgAN//uRE7Q4r//iiUv5TMtR8CvqGcrXgWofoJvXZn5r5Jykjy1050IAAAAA==.4";

  // cookie storage
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 3600),
  };

  //I'm passing in the access token in header under key accessToken
  let accessTokenFromClient = token;

  //Fail if token not present in header.
  if (!accessTokenFromClient) return res.redirect("welcome");

  cognitoExpress.validate(accessTokenFromClient, function (err, response) {
    //If API is not authenticated, Return 401 with error message.
    if (err) return res.status(401).send(err);

    //Else API has been authenticated. Proceed.
    res.locals.user = response;
    res.cookie("token", token, options);
    next();
  });
};
