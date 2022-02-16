function registeruser() {
  fetch("/hello", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getDetails()),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 201) {
        alert("User Created !!");
      } else {
        alert("Already Exists");
      }
    })
    .catch((err) => console.log(err));
}

function getuser(username) {
  //debugger;
  fetch(`/hello?username=${username.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.status) {
        document.getElementById("getButton").removeAttribute("disabled");
        document.getElementById("getButton").onclick = () => {
          fillDetails(data);
          document.getElementById("update").removeAttribute("disabled");
          document.getElementById("update").removeAttribute("hidden");
          document.getElementById("submit").setAttribute("hidden", "");
          document.getElementById("getButton").setAttribute("disabled", "");
        };
      } else {
        document.getElementById("getButton").setAttribute("disabled", "");
      }
    })
    .catch((err) => console.log(err));
}
let debounce_time;
username.oninput = function () {
  var regName = /^[a-zA-Z ]+$/;
  if (username.value === "") {
    document.getElementById("uname_error").innerHTML =
      "This field is mandatory to fill";
    getuser(username);
    username_answer = false;
  }
  else if (!regName.test(username.value)) {
    document.getElementById("uname_error").innerHTML =
      "Please enter the alphabets only";
    username_answer = false;
  }
  else {
    document.getElementById("uname_error").innerHTML =
      "";
    clearTimeout(debounce_time);
    debounce_time = setTimeout(() => {
      getuser(username);
    }, 1000);
    username_answer = true;
  }
};

function updateuser(username) {
  fetch(`/hello?username=${username.value}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getDetails()),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status) {
        alert("Data updated successfully!!");
      } else {
        alert("User doesn't exist!");
      }
    })
    .catch((err) => console.log(err));
}
document.getElementById("update").onclick = function () {
  updateuser(username);
};
