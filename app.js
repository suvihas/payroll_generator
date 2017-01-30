var express = require('express');
var util = require('util');
var _ = require('lodash');
var mongoose = require('mongoose');
var Payslip = require('./models/payslip');

var bodyParser = require('body-parser');

var app = express();

//connect to db
var mongoUrl = 'mongodb://admin:Myob1234!@ds117829.mlab.com:17829/myob_payroll';
mongoose.connect(mongoUrl);


app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: false
})); // support encoded bodies

app.get('/', function(req, res) {
  res.sendFile(__dirname + "index.html");
});

app.get('/error', function(req, res) {
  res.sendFile(__dirname + "/public/error.html");
});

app.get('/success', function(req, res) {
  res.sendFile(__dirname + "/public/success.html");
});

app.post('/processPayment', function(req, res) {

  //store the generated payslip 
  var payOrder = req.body;
  payOrder.fullName = payOrder.fullName.toLowerCase();

  //check in database if there is already a record for employee in this month.
  Payslip.find({
    employeeName: payOrder.fullName,
    payMonth: payOrder.month
  }, function(err, doc) {
    if (err) {
      console.log("error: Error in reading from Mongo DB");
      //redirect user to home page
      return res.redirect('/');
    }
    if (!_.isEmpty(doc)) {
      console.log("error: Payment for this month already processed for " + payOrder.fullName);
      //redirect user to error page
      return res.redirect('/error');
    }
    //record doesn't exist - process payment (store payslip)
    var payslip = new Payslip({
      employeeName: payOrder.fullName,
      payDate: payOrder.date,
      payMonth: payOrder.month,
      annualIncome: payOrder.annualIncome,
      grossIncome: payOrder.gross,
      incomeTax: payOrder.incomeTax,
      netIncome: payOrder.netIncome,
      superAmount: payOrder.superAmount,
      pay: payOrder.pay
    });

    payslip.save(function(err, doc) {
      if (err) {
        console.log("error: 'Mongo DB Error'");
        return res.redirect('/');
      }
      console.log("Payslip stored successfully for" + payOrder.fullName);
      return res.redirect('/success');
    });
  });
});


app.listen(3000, function() {
  console.log('Express server listening on port 3000');
});