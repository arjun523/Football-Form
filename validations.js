var fname = document.getElementById("firstname");
var lname = document.getElementById("lastname");
var pnumber = document.getElementById("phonenumber");
var emailid = document.getElementById("email");
var pin = document.getElementById("pincode");
var emailbutton = document.getElementById("emailon");
var countrycode = document.getElementById("countrycode");
var desiredpos = document.getElementsByName("desiredpositions[]");
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

fname.oninput = function () {
  //   debugger;
  var fname_value = document.getElementById("firstname").value;
  var regName = /^[a-zA-Z ]+$/;
  //   alert("hello....working");
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
  debugger;
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
  //   emailid.setAttribute("disabled", "disabled");
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
    //alert(lenChkBox)
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
    city_answer = true;
    submit_enabler();
  }
};

function submit_enabler() {
  if (
    firstname &&
    lastname &&
    phone &&
    email_answer &&
    pin_answer &&
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
