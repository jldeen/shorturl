const qrcode = require("qrcode");

// Converting the data into base64
qrcode.toDataURL(url, function (err, code) {
  if (err) return console.log("error occurred");

  // Printing the code
  console.log(code);
});

export default QRcode;
