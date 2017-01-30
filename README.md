# payroll_generator

A HR payroll system which generates payslip for an employee on entering the Annual Salary and Super rate as per the tax table from ATO. Once the payslip is generated, the pay may be processed by clicking the "Pay" button, which will make an entry into database. 

Built using NodeJS and Express in the backend and Simple HTML and JavaScript in the front end with minimalistic CSS styling.

## To run the project

```sh
$ git clone https://github.com/suvihas/payroll_generator.git # or clone your own fork
$ cd payroll_generator
$ npm install
$ npm start
(This starts the server at the backend)

Open browser and go to http://localhost:3000/ 
```
## Some points to note

- All fields are mandatory in the form
- Annual salary and Super values cannot be negative number
- Super rate can be in increments of 0.5%
