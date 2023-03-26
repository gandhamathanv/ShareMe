if (localStorage.getItem("shareme-username")) {
  $("#title-name").text(localStorage.getItem("shareme-username"));
} else {
  const name = prompt("Enter your username");
  $("#title-name").text(name);
  localStorage.setItem("shareme-username", name);
}
$("#change-username").click(function () {
  console.log("sdlil");
  const name = prompt("enter new username");
  localStorage.setItem("shareme-username", name);
  $("#title-name").text(name);
});
