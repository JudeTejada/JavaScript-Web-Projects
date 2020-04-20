const btnSubmit = document.querySelector("#btn-submit");
const modal = document.querySelector(".overlay");
const input = document.querySelector("#email");

const runModal = () => {
  if (!input.value) {
    const errMessage = document.querySelector(".error-message");
    errMessage.classList.remove("hide");
    setTimeout(() => errMessage.classList.add("hide"), 1500);
    return;
  }
  modal.classList.remove("hide");
  setTimeout(submitForm, 3500);
};
const submitForm = () => {
  document.querySelector(".popup-1").classList.add("hide");
  document.querySelector(".popup-2").classList.remove("hide");
  setTimeout(removeForm, 3100);
};

const removeForm = () => {
  modal.classList.add("hide");
  document.querySelector(".popup-1").classList.remove("hide");
  document.querySelector(".popup-2").classList.add("hide");
};
btnSubmit.addEventListener("click", runModal);
