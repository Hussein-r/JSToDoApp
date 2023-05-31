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
      const task = new Task(tasks.length + 1, taskName, taskPriority);
      task.addTask();
      ctrlLayout();
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
      tasksTable += `<tr id="task${task.id}"><td>${task.id}</td><td>${task.task}</td><td>${task.priority}</td><td><button class="editbtn" onclick="editTask(${task.id})">Edit</button></td><td><button class="delbtn" onclick="removeTask(${task.id})">Remove</button></td></tr>`;
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
  document.querySelector(
    `#task${task.id}`
  ).innerHTML = `<td>${task.id}</td><td><input type="text" id="modtask" name="task" value="${task.task}"></td><td><select id="modpriority" name="priority">
  <option disabled selected value="select">Select Priority</option>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select></td><td><button class="updatebtn" onclick="updateTask(${task.id})">Update</button></td><td><button class="cancelbtn" onclick="cancel(${task.id})">Cancel</button></td>`;
};

const cancel = function (id) {
  const task = tasks.find((element) => element.id == id);
  document.querySelector(
    `#task${task.id}`
  ).innerHTML = `<td>${task.id}</td><td>${task.task}</td><td>${task.priority}</td><td><button class="editbtn" onclick="editTask(${task.id})">Edit</button></td><td><button class="delbtn" onclick="removeTask(${task.id})">Remove</button></td>`;
};

const validateTask = function (taskName, taskPriority) {
  return taskName && ["low", "medium", "high"].includes(taskPriority);
};

const updateTask = function (id) {
  const task = tasks.find((element) => element.id == id);
  let taskName = document.querySelector("#modtask").value;
  let taskPriority = document.querySelector("#modpriority").value;
  if (validateTask(taskName, taskPriority)) {
    task.task = taskName;
    task.priority = taskPriority;
    ctrlLayout();
  }
};
