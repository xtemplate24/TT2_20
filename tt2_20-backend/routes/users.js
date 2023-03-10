var express = require("express");
var router = express.Router();
const conn = require("../db/db_conn");

/* GET users listing. */

//CREATE API
router.post("/signup", (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  let firstname = req.body.firstName;
  let lastname = req.body.lastName;
  let age = req.body.age;

  const values = [username, password, firstname, lastname, age];

  conn.query(
    "SELECT * FROM user WHERE EmployeeID = ?",
    [username],
    function (err, data) {
      if (data.length == 0) {
        conn.query(
          "INSERT INTO user (EmployeeID, Password, FirstName, LastName, Age) VALUES(?)",
          [values],
          function (err, data) {
            res.status(201).json({
              status: "user created",
            });
          }
        );
      } else {
        res.status(401).json({
          status: "username exists",
        });
      }
    }
  );
});

//Login API
router.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log(username, password);
  conn.query(
    "SELECT * FROM user WHERE EmployeeID = ?",
    [username],
    function (err, data) {
      if (err) return next(new AppError(err, 500));
      if (
        username == data[0]["EmployeeID"] &&
        password == data[0]["Password"]
      ) {
        res.status(201).json({
          status: "success",
          data_length: data?.length,
          data: data,
        });
      } else {
        res.status(401).json({
          status: "incorrect username or password",
        });
      }
    }
  );
});

router.get("/getPoliciesById", (req, res) => {
  let username = req.body.eid;
  conn.query(
    "SELECT DISTINCT InsuranceType from insurancepolicies where employeeid = ?",
    [username],
    function (err, data) {
      if (err) return next(new AppError(err, 500));
      console.log(data)
        let list_of_policy_types = []
        for (i in data){
          console.log(data[i]["InsuranceType"])
          list_of_policy_types.push(data[i]["InsuranceType"])
        }

        res.status(200).json({
          status: "success",
          
          data: list_of_policy_types,
        });
     
    }
  );
});

module.exports = router;
