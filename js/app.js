const user = localStorage.getItem("user");
const certCourse = localStorage.getItem("certCourse");

if (!user || !certCourse) window.location.href = "dashboard.html";

const courseNames = {
  web: "Web Development",
  python: "Python Programming",
  ui: "UI/UX Design"
};

const certID = "ELP-" + Math.floor(100000 + Math.random() * 900000);
const today = new Date().toDateString();

document.getElementById("certName").innerText = user;
document.getElementById("certCourse").innerText = courseNames[certCourse];
document.getElementById("certDate").innerText = "Issued on: " + today;

const cert = document.getElementById("certificate");
const idTag = document.createElement("p");
idTag.innerText = "Certificate ID: " + certID;
idTag.style.marginTop = "15px";
cert.appendChild(idTag);

function downloadCertificate() {
  window.print();
}
