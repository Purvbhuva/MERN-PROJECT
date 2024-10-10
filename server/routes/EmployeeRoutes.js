const express = require("express");
const router = express.Router();
const Employee = require("../models/EmployeeModel");

//---------------get All----------------

const getAllRecords = async (req, res) => {
  const Employees = await Employee.find({}).sort({ EmployeeID: 1 });
  res.send(Employees);
};

//---------------get One----------------
const getByID = async (req, res) => {
  const EmployeeID = req.params.id;
  const Selected_Employee = await Employee.findOne({ EmployeeID: EmployeeID });
  res.send(
    Selected_Employee ? Selected_Employee : { Error: "Employee Not Found" },
  );
};

//---------------add New Employee----------------
const addEmployee = async (req, res) => {
  const Data = req.body;
  const last = await Employee.find().sort({ EmployeeID: -1 }).limit(1);
  if (last.length > 0) {
    Data.EmployeeID = last[0].EmployeeID + 1;
  } else {
    Data.EmployeeID = 1;
  }
  const New_Employee = await Employee.create(Data);
  res.send(New_Employee);
};

//---------------update Employee----------------
const updateEmployee = async (req, res) => {
  const EmployeeID = req.params.id;
  const New_Employee_Data = req.body;
  const update = {
    Name: New_Employee_Data.Name,
    Description: New_Employee_Data.Description,
    Position: New_Employee_Data.Position,
    Salary: New_Employee_Data.Salary,
  };
  const response = await Employee.updateOne({ EmployeeID: EmployeeID }, update);
  res.send(response);
};

//---------------delete Employee----------------
const removeEmployee = async (req, res) => {
  const EmployeeID = req.params.id;
  const Acknowledgement = await Employee.deleteOne({ EmployeeID: EmployeeID });
  res.send(Acknowledgement);
};
router.get("/", getAllRecords);
router.get("/:id", getByID);
router.post("/", addEmployee);
router.delete("/:id", removeEmployee);
router.put("/:id", updateEmployee);

module.exports = router;
