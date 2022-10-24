async function copyUrl() {
  try {
    await navigator.clipboard.writeText("https://jessicadeen.com");
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

module.exports = {
  copyUrl: copyUrl,
};
