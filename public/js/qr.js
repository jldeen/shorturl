/*
There are two const calls here due to how the the rendering works with the svg / QRCodeStyling script. This is a temp quick hack to fix a bug. 

If there were only one, when generateQRCode() is called, the width and height is changed to a smaller resolution (for preview purpose). This affects the download function. If the downloadQRCode function is called _after_ the preview function is called, the download function changes the preview svg image size to 2000 X 2000, which becomes visible for the user. TODO: Adjust CSS for qr div to hide when download button is clicked.
*/

const qrCodePreview = new QRCodeStyling({
  width: 250,
  height: 250,
  margin: 10,
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

const qrCodeDownload = new QRCodeStyling({
  width: 2000,
  height: 2000,
  margin: 10,
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

// const config = require("../../middleware/config");

function generateQRCode(url, siteUrl) {
  qrCodePreview.update({
    data: url,
    image: `${siteUrl}/assets/images/brand_logo.png`,
  });

  qrCodePreview.append(document.getElementById("qr"));
}

function downloadQRCode(url, name, siteUrl) {
  qrCodeDownload.update({
    data: url,
    image: `${siteUrl}/assets/images/brand_logo.png`,
    width: 2000,
    height: 2000,
  });

  qrCodeDownload.download({ name: name, extension: "png" });
}
