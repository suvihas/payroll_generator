function calculateIncomeTax(annual_salary) {
  if (annual_salary <= 18200) {
    return 0;
  } else if (annual_salary >= 18201 && annual_salary <= 37000) {
    return ((((annual_salary - 18200) * 0.19) / 12).toFixed(0));
  } else if (annual_salary >= 37001 && annual_salary <= 80000) {
    return (((3572 + (annual_salary - 37000) * 0.325) / 12).toFixed(0));
  } else if (annual_salary >= 80001 && annual_salary <= 180000) {
    return (((17547 + (annual_salary - 80000) * 0.37) / 12).toFixed(0));
  } else if (annual_salary >= 180001) {
    return (((54547 + (annual_salary - 180000) * 0.45) / 12).toFixed(0));
  }
}


function generatePaySlip() {

  //get form values from query string
  var empDetails = (function(url) {
    if (url == "") return {};
    var result = {};
    for (var i = 0; i < url.length; ++i) {
      var temp = url[i].split('=', 2);
      if (temp.length == 1)
        result[temp[0]] = "";
      else
        result[temp[0]] = decodeURIComponent(temp[1].replace(/\+/g, " "));
    }
    return result;
  })(window.location.search.substr(1).split('&'));

  var fullName = empDetails["fname"] + " " + empDetails["lname"];
  document.getElementById("fullName").value = fullName;
  document.getElementById("empName").innerHTML = fullName;

  var date = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var month = months[date.getMonth()]; //TODO - generate based on date

  document.getElementById("month").value = month;
  document.getElementById("date").value = Date();

  var annual_salary = Number(empDetails["salary"]);
  document.getElementById("annualIncome").value = annual_salary;

  var incomeTax = calculateIncomeTax(annual_salary);

  var super_rate = Number(empDetails["superrate"]);

  var gross = (annual_salary / 12).toFixed(0);
  document.getElementById("gross").value = gross;

  var netIncome = gross - incomeTax;
  var superAmount = (gross * super_rate / 100).toFixed(0);
  var pay = netIncome - superAmount;

  document.getElementById("incomeTax").value = incomeTax;
  document.getElementById("netIncome").value = netIncome;
  document.getElementById("superAmount").value = superAmount;
  document.getElementById("pay").value = pay;

}