async function signConnect() {
  let response = await fetch("http://plony.hopto.org:70/authorize", {
    headers: { "Authorization": "Bearer " + document.cookie.replace("token=", "") },
    method: "GET",
  });
  let result = await response.json();
  if (result.ok) {
    loggedIn();
  } else {
    //loggedOff();
  }
}
signConnect();
const logOffDiv = document.getElementById("logOffDiv");
function loggedIn() {
  loggedDiv = document.getElementById("logged");
  loggedDiv.innerHTML = ` <a
  id="logOff "
  class="btn btn-sm btn-outline-secondary mx-2"
  href="#"
  >Выйти</a
>
<a
  class="btn btn-sm btn-outline-secondary mx-2"
  href="/pages/login.html"
  style="display:none;"
  >Войти</a
>
<a
  class="btn btn-sm btn-outline-secondary mx-2"
  href="/pages/login.html"
  style="display:none;"
  >Зарегистрироваться</a
> `;
}
logOffDiv.addEventListener("click", () => {
  setCookie("token", "", {
    "max-age": -1,
  });
  location.reload();
});
//function loggedOff() {}
function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    // при необходимости добавьте другие значения по умолчанию
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}
