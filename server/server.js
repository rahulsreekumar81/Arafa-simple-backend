const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const jobVacanciesRoute = require("../server/routes/getJobVacancies");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let enquiries = [];

app.post("/contact", (req, res) => {
  console.log("Endpoint triggered");
  console.log("Req body: ", req.body);
  const { fullName, email, countryCode, phoneNumber, subjectOfQuery, query } =
    req.body;

  enquiries.push({
    fullName,
    email,
    countryCode,
    phoneNumber,
    subjectOfQuery,
    query,
  });
  fs.writeFileSync("enquiries.json", JSON.stringify(enquiries));
  res.send({ message: "Form data received." });
});
try {
  enquiries = JSON.parse(fs.readFileSync("enquiries.json"));
} catch (err) {
  console.log("Something went wrong", err);
}

// Register new user
let registeredUsers = [];

app.post("/register", (req, res) => {
  console.log("Endpoint Triggered");
  console.log("Req body: ", req.body);
  const {
    fullName,
    email,
    countryCode,
    mobileNumber,
    areaCode,
    address,
    city,
    state,
    postalCode,
    country,
    experience,
    intro,
    interestedCountry,
    hearAboutUs,
    interestedJob,
    test,
  } = req.body;
  registeredUsers.push({
    fullName,
    email,
    countryCode,
    mobileNumber,
    areaCode,
    address,
    city,
    state,
    postalCode,
    country,
    experience,
    intro,
    interestedCountry,
    hearAboutUs,
    interestedJob,
    test,
  });
  fs.writeFileSync("registered-users.json", JSON.stringify(registeredUsers));
  res.send({ message: "Form data received." });
});
try {
  enquiries = JSON.parse(fs.readFileSync("registered-users.json"));
} catch (err) {
  console.log("Something went wrong", err);
}

// Job vacancies
app.use("/job-vacancies", jobVacanciesRoute);

app.listen(5000, () => console.log("server started on server 5000"));
