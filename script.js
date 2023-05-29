let tasks = [];
const priority = {
  low: 1,
  medium: 2,
  high: 3,
};
class Task {
  constructor(id, task, priority) {
    this.id = id;
    this.task = task;
    this.priority = priority;
  }
  addTask() {
    tasks.push(this);
  }
  removeTask() {
    tasks.splice(tasks.indexOf(this), 1);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#btn").addEventListener("click", () => {
    let task = new Task(
      tasks.length + 1,
      document.querySelector("#task").value,
      document.querySelector("#priority").value
    );
    task.addTask();
    ctrlLayout();
  });
  ctrlLayout();
});

function loadTasks() {
  let tasksTable = "";
  tasks
    .sort((t1, t2) => priority[t1.priority] - priority[t2.priority])
    .forEach((task) => {
      tasksTable += `<tr><td>${task.id}</td><td>${task.task}</td><td>${task.priority}</td><td><button class="delbtn" onclick="removeTask(${task.id})">Remove</button></td></tr>`;
    });
  document.querySelector("tbody").innerHTML = tasksTable;
}

function ctrlLayout() {
  if (tasks.length === 0) {
    document.querySelector("#notasks").style.setProperty("display", "block");
    document.querySelector("table").classList += "hidden";
  } else {
    document.querySelector("#notasks").style.setProperty("display", "none");
    document.querySelector("table").classList = "";
    loadTasks();
  }
}

function removeTask(id) {
  const task = tasks.find((element) => element.id == id);
  task.removeTask();
  ctrlLayout();
}
