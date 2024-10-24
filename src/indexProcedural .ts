let input = document.querySelector(".form input[type='text']") as HTMLInputElement;
let submitButton = document.querySelector(".form input[type='submit']") as HTMLInputElement;
let tasksdiv = document.querySelector(".tasks") as HTMLDivElement;

let arrOfTasks: { text: string, id: string, status: boolean }[] = JSON.parse(localStorage.getItem("tasks")?.toString() ?? '[]');

addTaskToPageFrom(arrOfTasks);

tasksdiv.addEventListener("click", function (e) {
    if (e.target instanceof HTMLElement) {
        if (e.target.classList.contains("task")) {
            e.target.classList.toggle("done");
            changetaskStatus(e.target.id); 
        }
        
        else if (e.target.classList.contains("del")) {
            deleteTaskWith(e.target.parentElement?.id);
            e.target.parentElement?.remove();
        } else {
            alert("Task ID is missing.");
        }
    };
});

submitButton.onclick = () : void => {
    let inputText: string = input.value.trim();
    if (!inputText)
        return alert("Please Fill The Input");
    addTasksToArray(inputText);
    input.value = "";
}

function addTasksToArray(inputText : string) {
    const task  = {        
        text: inputText,
        id: Date.now().toString(),
        status: false as boolean
    }
    arrOfTasks.push(task);

    addTaskToPageFrom(arrOfTasks);

    addTasksToLocalstorage(arrOfTasks);
}

function addTaskToPageFrom(arrOfTasks) {
    tasksdiv.innerHTML = "";
    arrOfTasks.forEach((taskEle: { id: string; text: string; status: boolean }): void => {
        let task = document.createElement("div") as HTMLDivElement;
        task.className = "task";
        task.id = taskEle.id;
        taskEle.status == true ? task.classList.add("done") : "";
        task.textContent = `${taskEle.text}`;
        let deleteBtn = document.createElement("span") as HTMLSpanElement;
        deleteBtn.classList.add("del");
        deleteBtn.textContent = "Delete";
        task.append(deleteBtn);
        tasksdiv.append(task);        
    });
}

function addTasksToLocalstorage(arrOfTasks: { text: string, id: string, status: boolean }[]) {
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
        };
    });
    addTasksToLocalstorage(arrOfTasks);
}