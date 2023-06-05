import { Task, tasks } from "./task.js";
const priority = {
  low: 1,
  medium: 2,
  high: 3,
};
const loadTasks = function () {
  let tasksTable = "";
  tasks
    .sort((t1, t2) => priority[t1.priority] - priority[t2.priority])
    .forEach((task) => {
      tasksTable += `<tr id="task${task.id}">
      <td><input type="checkbox" class="task" name="taskstodelete" value=${
        task.id
      }></td><td>${task.task}</td><td>${task.priority}</td>
      <td><button class="donebtn" onclick=getTask("Done",${task.id})>${
        task.done ? "Undone" : "done"
      }</button></td>
      <td><button class="editbtn" onclick=getTask("Edit",${
        task.id
      })>Edit</button></td>
      <td><button class="delbtn" onclick=getTask("Delete",${
        task.id
      })>Remove</button></td>
      
      </tr>`;
    });
  document.querySelector("tbody").innerHTML = tasksTable;
};

const ctrlLayout = function () {
  if (tasks.length === 0) {
    document.querySelector("#delSelBtn").style.setProperty("display", "none");
    document.querySelector("#notasks").style.setProperty("display", "block");
    document.querySelector("table").classList += "hidden";
  } else {
    document.querySelector("#delSelBtn").style.setProperty("display", "block");
    document.querySelector("#notasks").style.setProperty("display", "none");
    document.querySelector("table").classList = "";
    loadTasks();
  }
};

const validateTask = function (taskName, taskPriority) {
  return taskName && ["low", "medium", "high"].includes(taskPriority);
};

window.deleteSelected = function () {
  document.querySelectorAll("input[name=taskstodelete]").forEach((item) => {
    if (item.checked) {
      const task = tasks.find((element) => element.id == item.value);
      task.removeTask();
      ctrlLayout();
    }
  });
};

window.getTask = function (action, id) {
  const task = tasks.find((element) => element.id == id);
  switch (action) {
    case "Edit":
      ctrlLayout();
      document.querySelector(
        `#task${task.id}`
      ).innerHTML = `<td><input type="checkbox" class="task" name="taskstodelete" value=${
        task.id
      }></td><td><input type="text" id="modtask" name="task" value="${
        task.task
      }"></td><td><select id="modpriority" name="priority">
      <option disabled selected value="select">Select Priority</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
      </select></td>
      <td><button class="donebtn" onclick=getTask("Done",${task.id})>${
        task.done ? "Undone" : "done"
      }</button></td>
      <td><button class="updatebtn" onclick=getTask("Update",${
        task.id
      })>Update</button></td><td><button class="cancelbtn" onclick=getTask("Cancel",${
        task.id
      })>Cancel</button></td>`;
      break;
    case "Delete":
      task.removeTask();
      ctrlLayout();
      break;
    case "Done":
      task.doneMarker();
      ctrlLayout();
      break;
    case "Update":
      console.log("la2");
      let taskName = document.querySelector("#modtask").value;
      let taskPriority = document.querySelector("#modpriority").value;
      if (validateTask(taskName, taskPriority)) {
        task.task = taskName;
        task.priority = taskPriority;
        ctrlLayout();
      } else {
        alert("Enter Valid Task name and priority");
      }
      break;
    case "Cancel":
      document.querySelector(`#task${task.id}`).innerHTML = `<tr id="task${
        task.id
      }">
      <td><input type="checkbox" class="task" name="taskstodelete" value=${
        task.id
      }>
      </td><td>${task.task}</td><td>${task.priority}</td>
      <td><button class="donebtn" onclick=getTask("Done",${task.id})>${
        task.done ? "Undone" : "done"
      }</button></td>
      <td><button class="editbtn" onclick=getTask("Edit",${
        task.id
      })>Edit</button></td>
      <td><button class="delbtn" onclick=getTask("Delete",${
        task.id
      })>Remove</button></td>
      </tr>`;
      break;
  }
};
document.addEventListener("DOMContentLoaded", () => {
  ctrlLayout();
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
});
