const userList = document.querySelector(".user-list");
const loginTemplate = document.querySelector(".login-template").content;
const getTokenFromLocalStorage = localStorage.getItem("token");
console.log(getTokenFromLocalStorage);

// ! agar token bo'lmasa page ga o'tkazmaydi va settimeout orqali orqaga qaytarib yuboradi
if (!getTokenFromLocalStorage) {
  window.location.pathname = "login.html";
}

// ! Token bilan kirgandan keyin qanchadir vaqtdan keyin qaytarib login ga otib yuboradi
setTimeout(() => {
  localStorage.removeItem("token");
  window.location.reload();
}, 3000000);

const userLoginFragment = document.createDocumentFragment();

async function getUserFormResIn() {
  try {
    const res = await fetch("https://reqres.in/api/users?page=1");
    const data = await res.json();
    data.data.forEach((item) => {
      userList.innerHTML = "";
      let cloneloginTemplate = loginTemplate.cloneNode(true);
      cloneloginTemplate.querySelector(
        ".user-item-title"
      ).textContent = `${item.first_name} ${item.last_name}`;
      cloneloginTemplate.querySelector(".user-item-email-text").textContent =
        item.email;
      cloneloginTemplate.querySelector(".user-item-img").src = item.avatar;
      cloneloginTemplate.querySelector(".user-item-img").alt = item.first_name;
      cloneloginTemplate.querySelector(
        ".user-item-img"
      ).href = `mailto:${item.email}`;
      userLoginFragment.appendChild(cloneloginTemplate);
    });
    userList.appendChild(userLoginFragment);
  } catch (err) {
    console.log(err);
  }
}
getUserFormResIn();
