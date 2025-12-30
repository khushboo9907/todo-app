const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Load tasks from localStorage or empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks on page
function renderTasks() {
    listContainer.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if(task.checked) li.classList.add("checked");

        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);

        // Toggle checked
        li.addEventListener("click", () => {
            task.checked = !task.checked;
            li.classList.toggle("checked");
            saveTasks();
        });

        // Delete task
        span.addEventListener("click", (e) => {
            tasks.splice(index, 1);
            renderTasks();
            saveTasks();
            e.stopPropagation(); // Prevent li click event
        });
    });
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
function addTask(){
    if(inputBox.value.trim() === ''){
        alert("You must write something!");
        return;
    }
    tasks.push({ text: inputBox.value, checked: false });
    inputBox.value = "";
    renderTasks();
    saveTasks();
}

// Add task on Enter key press
inputBox.addEventListener("keypress", function(e){
    if(e.key === "Enter"){  // Enter key pressed
        addTask();
    }
});

// Initial render
renderTasks();

