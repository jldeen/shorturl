const QRCodeStyling = require("qr-code-styling");
const img = require("../public/assets/images/brand_logo.svg");

exports.generateQRCode = async (url) => {
  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    margin: 10,
    type: "svg",
    data: url,
    image: img,
    dotsOptions: {
      color: "#f79225",
      type: "extra-rounded",
      gradient: {
        type: "linear",
        rotation: 120,
        colorStops: [
          {
            color: "#f79225",
            offset: 0,
          },
          {
            color: "#fbcb2e",
            offset: 1,
          },
        ],
      },
    },
    cornersSquareOptions: {
      type: "extra-rounded",
      color: "#3e3d3d",
    },
    backgroundOptions: {
      color: "#fef5e6",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 6,
    },
  });
  qrCode.append(document.getElementById("canvas"));
  qrCode.download({ name: "qr", extension: "svg" });
};
