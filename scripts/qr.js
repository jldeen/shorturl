const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  margin: 10,
  image: "http://localhost:3000/assets/images/brand_logo.png",
  type: "svg",
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

function generateQR(url, name) {
  qrCode.update({
    data: url,
  });
  qrCode.download({ name: name, extension: "svg" });
}
