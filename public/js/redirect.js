// Redirect after code received from Cognito
history.replaceState(
  null,
  null,
  location.href.replace(/[\?&]code=[^&]+/, "").replace(/^&/, "?")
);

// Listen for qr code events
const center = document.querySelector(".center");
const message = document.querySelector(".alert");
const generateButton = center.querySelector(".preview");

if (generateButton) {
  generateButton.addEventListener("click", () => {
    center.classList.add("active");
    message.classList.add("active");
  });
}

// // Table Sorting - not used
// window.addEventListener("load", function () {
//   const el = document.getElementById("date");
//   if (el) {
//     el.click();
//   }
// });
