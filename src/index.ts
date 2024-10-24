class Task {
    constructor( public id: string, public text: string, public status: boolean = false ) {}
    toggleStatus() {
        this.status = !this.status;
    }
}

class TaskManager {
    private tasks: Task[] = [];
    private input: HTMLInputElement;
    private submitButton: HTMLInputElement;
    private tasksDiv: HTMLDivElement;

    constructor() {
        this.input = document.querySelector(".form input[type='text']") as HTMLInputElement;
        this.submitButton = document.querySelector(".form input[type='submit']") as HTMLInputElement;
        this.tasksDiv = document.querySelector(".tasks") as HTMLDivElement;

        // Load tasks from local storage
        this.loadTasksFromLocalStorage();

        // Bind event listeners
        this.bindEvents();
    }

    private bindEvents(): void {
        this.submitButton.onclick = () => this.addTask();

        this.tasksDiv.addEventListener("click", (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains("task")) {
                this.toggleTaskStatus(target.id);
            } else if (target.classList.contains("del")) {
                const taskId = target.parentElement?.id;
                if (taskId) this.deleteTask(taskId);
            }
        });
    }

    private loadTasksFromLocalStorage(): void {
        const savedTasks = JSON.parse(localStorage.getItem("tasks") ?? '[]');
        this.tasks = savedTasks.map((taskData: { id: string, text: string, status: boolean }) =>
            new Task(taskData.id, taskData.text, taskData.status)
        );
        this.renderTasks();
    }

    private saveTasksToLocalStorage(): void {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    private renderTasks(): void {
        this.tasksDiv.innerHTML = "";
        this.tasks.forEach(task => this.addTaskToDOM(task));
    }

    private addTaskToDOM(task: Task): void {
        const taskDiv = document.createElement("div") as HTMLDivElement;
        taskDiv.className = "task";
        taskDiv.id = task.id;
        if (task.status) taskDiv.classList.add("done");
        taskDiv.textContent = task.text;

        const deleteBtn = document.createElement("span") as HTMLSpanElement;
        deleteBtn.classList.add("del");
        deleteBtn.textContent = "Delete";
        taskDiv.append(deleteBtn);

        this.tasksDiv.append(taskDiv);
    }

    private addTask(): void {
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

    private deleteTask(taskId: string): void {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.renderTasks();
        this.saveTasksToLocalStorage();
    }

    private toggleTaskStatus(taskId: string): void {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.toggleStatus();
            this.renderTasks();
            this.saveTasksToLocalStorage();
        }
    }
}

new TaskManager();