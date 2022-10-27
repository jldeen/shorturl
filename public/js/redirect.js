window.addEventListener("load", function () {
  const el = document.getElementById("date");
  if (el) {
    el.click();
  }
});

history.replaceState(
  null,
  null,
  location.href.replace(/[\?&]code=[^&]+/, "").replace(/^&/, "?")
);
