const qrCode = new QRCodeStyling({
  width: 2000,
  height: 2000,
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

function generateQRCode(url) {
  qrCode.update({
    data: url,
    width: 250,
    height: 250,
  });

  qrCode.append(document.getElementById("qr"));
}

function downloadQRCode(url, name) {
  qrCode.update({
    data: url,
  });
  qrCode.download({ name: name, extension: "png" });
}
