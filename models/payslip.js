var mongoose = require('mongoose');

var paySlipSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true
  },
  payDate : {
    type: Date,
    required: true
  },
  payMonth : {
    type: String,
    required: true
  },
  payFrequency : {
    type: String,
    required: false,
    default: "Monthly"
  },
  annualIncome: {
    type: String,
    required: false
  },
  grossIncome: {
    type: String,
    required: false
  },
  incomeTax: {
    type: String,
    required: false
  },
  netIncome: {
    type: String,
    required: true
  },
  superAmount: {
    type: String,
    required: false
  },
  pay: {
    type: String,
    required: false
  }
}, { collection: 'PaySlips' });

module.exports = mongoose.model('PaySlips', paySlipSchema);
