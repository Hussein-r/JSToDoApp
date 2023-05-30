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
    let taskName = document.querySelector("#task").value;
    let taskPriority = document.querySelector("#priority").value;
    if (validateTask(taskName, taskPriority)) {
      if (document.querySelector("#btn").innerHTML === "Update") {
        const task = tasks.find(
          (element) => element.id == document.querySelector("#id").value
        );
        task.task = taskName;
        task.priority = taskPriority;
        document.querySelector("#btn").innerHTML = "Add";
        ctrlLayout();
      } else {
        const task = new Task(tasks.length + 1, taskName, taskPriority);
        task.addTask();
        ctrlLayout();
      }
    } else {
      alert("Enter Valid Task name and priority");
    }
  });
  ctrlLayout();
});

const loadTasks = function () {
  let tasksTable = "";
  tasks
    .sort((t1, t2) => priority[t1.priority] - priority[t2.priority])
    .forEach((task) => {
      tasksTable += `<tr><td>${task.id}</td><td>${task.task}</td><td>${task.priority}</td><td><button class="editbtn" onclick="editTask(${task.id})">Edit</button></td><td><button class="delbtn" onclick="removeTask(${task.id})">Remove</button></td></tr>`;
    });
  document.querySelector("tbody").innerHTML = tasksTable;
};

const ctrlLayout = function () {
  if (tasks.length === 0) {
    document.querySelector("#notasks").style.setProperty("display", "block");
    document.querySelector("table").classList += "hidden";
  } else {
    document.querySelector("#notasks").style.setProperty("display", "none");
    document.querySelector("table").classList = "";
    loadTasks();
  }
};

const removeTask = function (id) {
  const task = tasks.find((element) => element.id == id);
  task.removeTask();
  ctrlLayout();
};

const editTask = function (id) {
  const task = tasks.find((element) => element.id == id);
  document.querySelector("#btn").innerHTML = "Update";
  document.querySelector("#id").value = id;
  document.querySelector("#task").value = task.task;
  document.querySelector("#priority").value = task.priority;
};

const validateTask = function (taskName, taskPriority) {
  return taskName && ["low", "medium", "high"].includes(taskPriority);
};
