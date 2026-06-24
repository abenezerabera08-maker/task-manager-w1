const fs = require("fs");

const command = process.argv[2];
const task = process.argv[3];

let tasks = [];

if (fs.existsSync("tasks.json")) {
  tasks = JSON.parse(fs.readFileSync("tasks.json"));
}

if (command === "add") {

  const newId =
    tasks.length > 0
      ? Math.max(...tasks.map(t => t.id)) + 1
      : 1;

  tasks.push({
    id: newId,
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

if (command === "complete") {

  const id = Number(process.argv[3]);

  tasks.forEach(task => {
    if (task.id === id) {
      task.completed = true;
    }
  });

  fs.writeFileSync(
    "tasks.json",
    JSON.stringify(tasks, null, 2)
  );

  console.log("Task Completed");

}

if (command === "delete") {

  const id = Number(process.argv[3]);

  tasks = tasks.filter(
    task => task.id !== id
  );

  fs.writeFileSync(
    "tasks.json",
    JSON.stringify(tasks, null, 2)
  );

  console.log("Task Deleted");

}

if (command === "filter") {

  const status = process.argv[3];

  if (status === "completed") {

    const completedTasks = tasks.filter(
      task => task.completed
    );

    completedTasks.forEach(task => {
      console.log(
        `${task.id}. ${task.task}`
      );
    });

  } else if (status === "pending") {

    const pendingTasks = tasks.filter(
      task => !task.completed
    );

    pendingTasks.forEach(task => {
      console.log(
        `${task.id}. ${task.task}`
      );
    });

  } else {

    console.log(
      "Use: node app.js filter completed|pending"
    );

  }

}