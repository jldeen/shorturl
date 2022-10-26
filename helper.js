async function copyUrl() {
  try {
    await navigator.clipboard.writeText("");
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

async function signOut(res) {
  try {
    res.clearCookie("token");
    console.log("signed out");
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  copyUrl: copyUrl,
  signOut: signOut,
};
