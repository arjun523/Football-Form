var username = document.getElementById("username");
var fname = document.getElementById("firstname");
var lname = document.getElementById("lastname");
var pcode = document.getElementById("countrycode");
var pnumber = document.getElementById("phonenumber");
var agegroup = document.getElementById("agegroup");
var emailid = document.getElementById("email");
var pin = document.getElementById("pincode");
var emailbutton = document.getElementById("emailon");
var desiredteam = document.getElementsByName("desiredteam");
var desiredpos = document.getElementsByName("desiredpositions");
var country = document.getElementById("country");
var state = document.getElementById("state");
var city = document.getElementById("city");

var firstname = null;
var lastname = null;
var phone = null;
var email_answer = null;
var pin_answer = null;
var ccode_answer = null;
var desiredpos_answer = null;
var country_answer = null;
var state_answer = null;
var city_answer = null;
var username_answer = null;


var getDesiredPosition = () => {
  desiredpos = Array.from(desiredpos);
  var position = desiredpos
    .filter((pos) => pos.checked)
    .map((pos) => pos.value)
    .join(" ");
  return position ? position : null;
};
var getDesiredTeam = () => {
  desiredteam = Array.from(desiredteam);
  var dteam = desiredteam.filter((team) => team.checked);
  return dteam ? dteam[0].value : null;
};

const getDetails = () => ({
  username: username.value,
  firstname: fname.value,
  lastname: lname.value,
  pcode: pcode.value,
  phone: pnumber.value,
  email: emailid.value,
  agegroup: agegroup.value,
  desiredteam: getDesiredTeam(),
  desired_positions: getDesiredPosition(),
  address: address.value,
  pin: pin.value,
  country: country.value,
  state: state.value,
  city: city.value,
});
var findDesiredTeam = (userdata) => {
  desiredteam = Array.from(desiredteam);
  var dteam = desiredteam.find((team) => team.value === userdata.desiredteam);
  dteam.checked = true;
};
var findDesiredPosition = (userdata) => {
  desiredpos = Array.from(desiredpos);
  desiredpos.forEach((val) => {
    val.checked = false;
  });
  var arr = userdata.desired_positions.split(" ");
  arr.forEach((val) => {
    var position = desiredpos.find((pos) => pos.value === val);
    position.checked = true;
  });
};
const fillDetails = (userdata) => {
  username.value = userdata.username;
  fname.value = userdata.firstname;
  lname.value = userdata.lastname;
  pcode.value = userdata.pcode;
  pnumber.value = userdata.phone;
  emailid.value = userdata.email;
  agegroup.value = userdata.agegroup;
  desiredteam.value = findDesiredTeam(userdata);
  desiredpos.value = findDesiredPosition(userdata);
  address.value = userdata.address;
  pin.value = userdata.pin;
  country.value = userdata.country;

  fetch("https://countriesnow.space/api/v0.1/countries/states", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ country: countries.value }),
  })
    .then((response) => response.json())
    .then((data) => {
      data.data.states.forEach((state) => {
        const newoption = document.createElement("option");
        newoption.textContent = state.name;
        states.append(newoption);
      });
      state.value = userdata.state;
      fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country: countries.value, state: states.value }),
      })
        .then((response) => response.json())
        .then((data) => {
          data.data.forEach((city) => {
            const newoption = document.createElement("option");
            newoption.textContent = city;
            cities.append(newoption);
          });
          city.value = userdata.city;
        });
    });
};

fname.oninput = function () {
  var fname_value = document.getElementById("firstname").value;
  var regName = /^[a-zA-Z ]+$/;
  if (fname_value === "") {
    document.getElementById("fname_error").innerHTML =
      "This field is mandatory to fill";
    firstname = false;
  } else if (!regName.test(fname_value)) {
    document.getElementById("fname_error").innerHTML =
      "Please enter the alphabets only";
    firstname = false;
  } else {
    document.getElementById("fname_error").innerHTML = "";
    firstname = true;
    submit_enabler();
  }
};
lname.oninput = function () {
  var lname_value = document.getElementById("lastname").value;
  var regName = /^[a-zA-Z ]+$/;

  if (!regName.test(lname_value)) {
    document.getElementById("lname_error").innerHTML =
      "Please enter the alphabets only";
    lastname = false;
  } else {
    document.getElementById("lname_error").innerHTML = "";
    lastname = true;
    submit_enabler();
  }
};
pnumber.oninput = function () {
  var pnumber_value = document.getElementById("phonenumber").value;
  var regName = /^\d{10}$/;

  if (pnumber_value === "") {
    document.getElementById("pnumber_error").innerHTML =
      "This field is mandatory to fill";
    phone = false;
  }
  if (!regName.test(pnumber_value)) {
    document.getElementById("pnumber_error").innerHTML =
      "Please enter the 10 digit phone number only";
    phone = false;
  } else {
    document.getElementById("pnumber_error").innerHTML = "";
    phone = true;
    submit_enabler();
  }
};

email.oninput = function () {
  var email_value = document.getElementById("email").value;
  var atpos = email_value.indexOf("@");
  var dotpos = email_value.lastIndexOf(".");
  if (email_value === "") {
    document.getElementById("email_error").innerHTML =
      "This field is mandatory to fill";
    email_answer = false;
  } else if (
    atpos < 1 ||
    dotpos < atpos + 2 ||
    dotpos + 2 >= email_value.length
  ) {
    document.getElementById("email_error").innerHTML = "Enter a valid Email ID";
    email_answer = false;
  } else {
    document.getElementById("email_error").innerHTML = "";
    email_answer = true;
    submit_enabler();
  }
};
pin.oninput = function () {
  var pin_value = document.getElementById("pincode").value;
  var regName = /^\d{6}$/;

  if (pin_value === "") {
    document.getElementById("pin_error").innerHTML =
      "This field is mandatory to fill";
    pin_answer = false;
  }
  if (!regName.test(pin_value)) {
    document.getElementById("pin_error").innerHTML =
      "Please enter the 6 digit pin number only";
    pin_answer = false;
  } else {
    document.getElementById("pin_error").innerHTML = "";
    pin_answer = true;
    submit_enabler();
  }
};
emailbutton.onclick = function () {
  var emailon_status = document.getElementById("emailon").checked;
  if (emailon_status) {
    emailid.removeAttribute("disabled");
  } else {
    emailid.setAttribute("disabled", "");
  }
};

countrycode.onchange = function () {
  var ccode_value = document.getElementById("countrycode").value;
  if (ccode_value === "none" || ccode_value === "") {
    document.getElementById("pnumber_error").innerHTML =
      "Country Code is mandatory to fill";
    ccode_answer = false;
  } else {
    document.getElementById("pnumber_error").innerHTML = "";
    ccode_answer = true;
    submit_enabler();
  }
};

desiredpos.forEach((pos) => {
  pos.onchange = function () {
    var lenChkBox = desiredpos.length;
    let valid = 0;
    for (var i = 0; i < lenChkBox; i++) {
      if (desiredpos[i].checked === true) {
        valid = 1;
        break;
      }
    }
    if (valid === 0) {
      document.getElementById("desiredpos_error").innerHTML =
        "This field can't be left unchecked";
      desiredpos_answer = false;
    } else {
      document.getElementById("desiredpos_error").innerHTML = "";
      desiredpos_answer = true;
      submit_enabler();
    }
  };
});

document.getElementById("country").onclick = function () {
  var country_value = document.getElementById("country").value;
  if (country_value == "none") {
    document.getElementById("country_error").innerHTML =
      "This field is mandatory";
    country_answer = false;
    state.setAttribute("disabled", "disabled");
    city.setAttribute("disabled", "disabled");
  } else {
    document.getElementById("country_error").innerHTML = "";
    state.removeAttribute("disabled");
    country_answer = true;
    submit_enabler();
  }
};
document.getElementById("state").onclick = function () {
  var state_value = document.getElementById("state").value;
  if (state_value == "none") {
    document.getElementById("state_error").innerHTML =
      "This field is mandatory";
    document.getElementById("city_error").innerHTML = "This field is mandatory";
    city.setAttribute("disabled", "disabled");
    state_answer = false;
    city_answer = false;
  } else {
    city.removeAttribute("disabled");
    document.getElementById("state_error").innerHTML = "";
    document.getElementById("city_error").innerHTML = "";
    state_answer = true;
    submit_enabler();
  }
  city_answer = true;
  submit_enabler();
};

function submit_enabler() {
  if (
    username &&
    firstname &&
    lastname &&
    phone &&
    email_answer &&
    ccode_answer &&
    desiredpos_answer &&
    country_answer &&
    state_answer &&
    city_answer
  ) {
    document.getElementById("submit").removeAttribute("disabled");
  } else {
    document.getElementById("submit").setAttribute("disabled", "");
  }
}
