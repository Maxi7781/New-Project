document.getElementById("projectForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch("/addProject", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      this.reset();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

document.getElementById("clientForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch("/addClient", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      this.reset();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
