const elForm = document.querySelector(".form");
const elFormEmail = elForm.querySelector(".input-email");
const elFormPassword = elForm.querySelector(".input-password");
const openInputValueBtn = document.querySelector(".open-input-value-btn");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const EmailValue = elFormEmail.value.trim();
  const PasswordValue = elFormPassword.value.trim();

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email: EmailValue,
      password: PasswordValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        window.localStorage.setItem("token", data.token);
        // window.location.replace("index.html")
        window.location.pathname = "index.html";
      }
    })
    .catch((err) => console.log(err));
});

openInputValueBtn.addEventListener("mousedown", () => {
  elFormPassword.type = "text";
  openInputValueBtn.classList.add("open-input-value-btn--on");
});

openInputValueBtn.addEventListener("mouseup", () => {
  elFormPassword.type = "password";
  openInputValueBtn.classList.remove("open-input-value-btn--on");
});
