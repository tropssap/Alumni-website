const signinButton = document.getElementById("signinButton");
const signupButton = document.getElementById("signupButton");
const signinUsername = document.getElementById("signinUsername");
const signupUsername = document.getElementById("signupUsername");
const signupPassword = document.getElementById("signupPassword");
const signinPassword = document.getElementById("signinPassword");
const signupPassword2 = document.getElementById("signupPassword2");
const signupEmail = document.getElementById("signupEmail");

signinButton.addEventListener("click", signin);
function signin() {
  const username = signinUsername.value;
  const password = signinPassword.value;
  const user = {
    username: username,
    password: password,
  };
  signinConnect(user);
}

signupButton.addEventListener("click", signup);
function signup() {
  const username = signupUsername.value;
  if (username.length < 6) {
    alert("Длина логина должна быть больше 6 символов");
    return;
  }
  const password = signupPassword.value;
  if (password.length < 6) {
    alert("Длина пароля должна быть больше 6 символов");
    return;
  }
  const password2 = signupPassword2.value;
  const email = signupEmail.value;
  if (password === password2) {
    const user = {
      username: username,
      password: password,
      email: email,
    };
    signupConnect(user);
  } else {
    alert("Пароли не совпадают!");
  }
}
async function signupConnect(user) {
  let response = await fetch("http://plony.hopto.org/authorize/register", {
    method: "POST",
    body: JSON.stringify(user),
  });
  let result = await response.json();
  console.log(result);
}
async function signinConnect(user) {
  let response = await fetch("http://plony.hopto.org/authorize/login", {
    method: "POST",
    body: JSON.stringify(user),
  });
  let result = await response.json();
  console.log(result);
}
