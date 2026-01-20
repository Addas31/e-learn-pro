function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("dark", document.body.classList.contains("dark-mode"));
}

if (localStorage.getItem("dark") === "true") {
  document.body.classList.add("dark-mode");
}
