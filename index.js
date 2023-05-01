/* Your Code Here */
function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeDataList) {
  return employeeDataList.map((employeeData) =>
    createEmployeeRecord.call(this, employeeData)
  );
}

function createTimeInEvent(dateStamp) {
  const [date, time] = dateStamp.split(" ");

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(time),
    date: date,
  });
  return this;
}

function createTimeOutEvent(dateStamp) {
  const [date, time] = dateStamp.split(" ");

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(time),
    date: date,
  });
  return this;
}

function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find((e) => e.date === date);
  const timeOut = this.timeOutEvents.find((e) => e.date === date);

  const hoursWorked = (timeOut.hour - timeIn.hour) / 100; // need to address this logic to separate hours/mins
  return hoursWorked;
}

function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

function calculatePayroll(employeeRecords) {
  const totalWages = employeeRecords.reduce((total, employeeRecord) => {
    return total + allWagesFor(employeeRecord);
  }, 0);

  return totalWages;
}

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function findEmployeeByFirstName(srcArray, firstName) {
  const employee = srcArray.find((e) => e.firstName === firstName);
  return employee;
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((totalWages, emp) => {
    return totalWages + allWagesFor.call(emp);
  }, 0);
}
