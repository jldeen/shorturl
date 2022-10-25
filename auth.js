const CognitoExpress = require("cognito-express");

const XMLHttpRequest = require("xhr2");
const request = new XMLHttpRequest();

// Setup CognitoExpress
const cognitoExpress = new CognitoExpress({
  region: process.env.AWS_DEFAULT_REGION,
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "access",
  tokenExpiration: 3600,
});

function getToken(url, code, clientID, clientSecret) {
  var key;
  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/json");
  request.send("grant_type=authorization_code=" + code); // specify the credentials to receive the token on request
  request.onreadystatechange = function () {
    if (request.readyState == request.DONE) {
      var response = request.responseText;
      var obj = JSON.parse(response);
      key = obj.access_token; //store the value of the accesstoken

      return key;
    }
  };
}

exports.validateAuth = (req, res, next) => {
  const code = "901feafe-d7b6-49e4-9551-716a42d2ece4";
  const token_url =
    "https://s18stest.auth.us-east-1.amazoncognito.com/oauth2/token";

  const token = getToken(
    token_url,
    code,
    process.env.COGNITO_CLIENT_ID,
    process.env.COGNITO_CLIENT_SECRET
  );

  //I'm passing in the access token in header under key accessToken
  let accessTokenFromClient = token;

  //Fail if token not present in header.
  if (!accessTokenFromClient) return res.redirect("welcome");

  cognitoExpress.validate(accessTokenFromClient, function (err, response) {
    //If API is not authenticated, Return 401 with error message.
    if (err) return res.status(401).send(err);

    //Else API has been authenticated. Proceed.
    res.locals.user = response;
    next();
  });
};
