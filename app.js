const fs = require("fs");

const command = process.argv[2];
const task = process.argv[3];

let tasks = [];

if (fs.existsSync("tasks.json")) {
  tasks = JSON.parse(fs.readFileSync("tasks.json"));
}

if (command === "add") {

  tasks.push({
    id: tasks.length + 1,
    task: task,
    completed: false
  });

  fs.writeFileSync(
    "tasks.json",
    JSON.stringify(tasks, null, 2)
  );

  console.log("Task Added");
}
if (command === "list") {

  tasks.forEach(t => {
    console.log(
      `${t.id}. ${t.task}`
    );
  });

}