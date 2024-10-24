"use strict";
var _a, _b;
let input = document.querySelector(".form input[type='text']");
let submitButton = document.querySelector(".form input[type='submit']");
let tasksdiv = document.querySelector(".tasks");
let arrOfTasks = JSON.parse((_b = (_a = localStorage.getItem("tasks")) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '[]');
addTaskToPageFrom(arrOfTasks);
tasksdiv.addEventListener("click", function (e) {
    var _a, _b;
    if (e.target instanceof HTMLElement) {
        if (e.target.classList.contains("task")) {
            e.target.classList.toggle("done");
            changetaskStatus(e.target.id);
        }
        else if (e.target.classList.contains("del")) {
            deleteTaskWith((_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.id);
            (_b = e.target.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
        }
        else {
            alert("Task ID is missing.");
        }
    }
    ;
});
submitButton.onclick = () => {
    let inputText = input.value.trim();
    if (!inputText)
        return alert("Please Fill The Input");
    addTasksToArray(inputText);
    input.value = "";
};
function addTasksToArray(inputText) {
    const task = {
        text: inputText,
        id: Date.now().toString(),
        status: false
    };
    arrOfTasks.push(task);
    addTaskToPageFrom(arrOfTasks);
    addTasksToLocalstorage(arrOfTasks);
}
function addTaskToPageFrom(arrOfTasks) {
    tasksdiv.innerHTML = "";
    arrOfTasks.forEach((taskEle) => {
        let task = document.createElement("div");
        task.className = "task";
        task.id = taskEle.id;
        taskEle.status == true ? task.classList.add("done") : "";
        task.textContent = `${taskEle.text}`;
        let deleteBtn = document.createElement("span");
        deleteBtn.classList.add("del");
        deleteBtn.textContent = "Delete";
        task.append(deleteBtn);
        tasksdiv.append(task);
    });
}
function addTasksToLocalstorage(arrOfTasks) {
    localStorage.setItem("tasks", JSON.stringify(arrOfTasks));
}
function deleteTaskWith(taskId) {
    arrOfTasks = arrOfTasks.filter((task) => task.id != taskId);
    addTasksToLocalstorage(arrOfTasks);
}
function changetaskStatus(taskId) {
    arrOfTasks.forEach((e) => {
        if (e.id == taskId) {
            e.status === true ? e.status = false : e.status = true;
        }
        ;
    });
    addTasksToLocalstorage(arrOfTasks);
}
//# sourceMappingURL=indexProcedural%20.js.map