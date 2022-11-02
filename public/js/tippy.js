new ClipboardJS(".btn");

tippy("#copy-button", {
  trigger: "click",
  hideOnClick: false,
  onShow(instance) {
    setTimeout(() => {
      instance.hide();
    }, 2000);
  },
});
