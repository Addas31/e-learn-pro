let isLogin = true;

function toggleForm() {
  isLogin = !isLogin;
  document.getElementById("formTitle").innerText = isLogin ? "Login" : "Sign Up";
}

function handleAuth() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "" || password === "") {
    alert("Please fill all fields!");
    return;
  }

  localStorage.setItem("user", username);
  window.location.href = "pages/dashboard.html";
}
