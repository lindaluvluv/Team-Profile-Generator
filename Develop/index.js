const fs = require("fs");
const path = require("path");
const readline = require("readline");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const generateHtml = require("./src/generateHtml")
function readUserInput(question, endMessage = "") {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    process.stdout.write(question);
    rl.on("line", function (line) {
      resolve(line);
      rl.close();
    });
    rl.on("close", function () {
      if (endMessage) console.log(endMessage);
    });
  });
}

let team = [];

async function start() {
  console.log("Please enter team manager's information");
  let name = await readUserInput("Name: ");
  let id = await readUserInput("Employee ID: ");
  let email = await readUserInput("Email: ");
  let officeNumber = await readUserInput("Office Number: ");
  team.push(new Manager(name, id, email, officeNumber));
  while (true) {
    let option = await readUserInput(
      `Plaese choose a option:\n1. Add an engineer\n2. Add an intern\n3.Finish building\nYour Option: `
    );
    option = String(option).trim();
    if (option === "1") {
      name = await readUserInput("Name: ");
      id = await readUserInput("Employee ID: ");
      email = await readUserInput("Email: ");
      let github = await readUserInput("Github Username: ");
      team.push(new Engineer(name, id, email, github))
    } else if (option === "2") {
      name = await readUserInput("Name: ");
      id = await readUserInput("Employee ID: ");
      email = await readUserInput("Email: ");
      let school = await readUserInput("School: ");
      team.push(new Intern(name, id, email, school))
    } else if (option === "3") {
      break;
    } else {
    }
  }
  const html = generateHtml(team);
  fs.writeFileSync(path.resolve(__dirname, "./dist/output.html"), html)
  console.log("Bye")
}
start();
