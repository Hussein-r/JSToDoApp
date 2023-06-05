export let tasks = [];
export class Task {
  id;
  task;
  priority;
  done;
  constructor(id, task, priority) {
    this.id = id;
    this.task = task;
    this.priority = priority;
    this.done = false;
  }
  addTask() {
    tasks.push(this);
  }
  removeTask() {
    tasks.splice(tasks.indexOf(this), 1);
  }
  doneMarker() {
    this.done = this.done ? false : true;
  }
}
