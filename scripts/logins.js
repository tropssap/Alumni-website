async function signupConnect() {
  let response = await fetch("http://plony.hopto.org:70/authorize", {
    headers: {
      Accept: "application/json", 
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(document.cookie),
  });
  let result = await response.json();
  if (result.ok) {
    loggedIn();
  } else {
    //loggedOff();
  }
}

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
