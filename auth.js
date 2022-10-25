const CognitoExpress = require("cognito-express");

// Setup CognitoExpress
const cognitoExpress = new CognitoExpress({
  region: process.env.AWS_DEFAULT_REGION,
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "access",
  tokenExpiration: 3600,
});

exports.validateAuth = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Validate
    const token = req.headers.authorization.split(" ")[1];
    cognitoExpress.validate(token, function (err, response) {
      if (err) {
        // If error, return 401 unauthorized
        res.status(401).send(err);
      } else {
        // App authenticated
        next();
      }
    });
  } else {
    // if no token, let user know
    res.redirect("welcome");
  }
};
