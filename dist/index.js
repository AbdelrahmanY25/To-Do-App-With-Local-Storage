"use strict";
class Task {
    constructor(id, text, status = false) {
        this.id = id;
        this.text = text;
        this.status = status;
    }
    toggleStatus() {
        this.status = !this.status;
    }
}
class TaskManager {
    constructor() {
        this.tasks = [];
        this.input = document.querySelector(".form input[type='text']");
        this.submitButton = document.querySelector(".form input[type='submit']");
        this.tasksDiv = document.querySelector(".tasks");
        this.loadTasksFromLocalStorage();
        this.bindEvents();
    }
    bindEvents() {
        this.submitButton.onclick = () => this.addTask();
        this.tasksDiv.addEventListener("click", (e) => {
            var _a;
            const target = e.target;
            if (target.classList.contains("task")) {
                this.toggleTaskStatus(target.id);
            }
            else if (target.classList.contains("del")) {
                const taskId = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.id;
                if (taskId)
                    this.deleteTask(taskId);
            }
        });
    }
    loadTasksFromLocalStorage() {
        var _a;
        const savedTasks = JSON.parse((_a = localStorage.getItem("tasks")) !== null && _a !== void 0 ? _a : '[]');
        this.tasks = savedTasks.map((taskData) => new Task(taskData.id, taskData.text, taskData.status));
        this.renderTasks();
    }
    saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    renderTasks() {
        this.tasksDiv.innerHTML = "";
        this.tasks.forEach(task => this.addTaskToDOM(task));
    }
    addTaskToDOM(task) {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.id = task.id;
        if (task.status)
            taskDiv.classList.add("done");
        taskDiv.textContent = task.text;
        const deleteBtn = document.createElement("span");
        deleteBtn.classList.add("del");
        deleteBtn.textContent = "Delete";
        taskDiv.append(deleteBtn);
        this.tasksDiv.append(taskDiv);
    }
    addTask() {
        const inputText = this.input.value.trim();
        if (!inputText) {
            alert("Please Fill The Input");
            return;
        }
        const newTask = new Task(Date.now().toString(), inputText);
        this.tasks.push(newTask);
        this.renderTasks();
        this.saveTasksToLocalStorage();
        this.input.value = "";
    }
    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.renderTasks();
        this.saveTasksToLocalStorage();
    }
    toggleTaskStatus(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.toggleStatus();
            this.renderTasks();
            this.saveTasksToLocalStorage();
        }
    }
}
new TaskManager();
//# sourceMappingURL=index.js.map