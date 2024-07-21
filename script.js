document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        // Get tasks from Local Storage
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            // Parse JSON to an array
            const taskArray = JSON.parse(tasks);
            // Create list items for each task
            taskArray.forEach(task => {
                createTaskElement(task);
            });
        }
    }

    // Save tasks to Local Storage
    function saveTasks() {
        // Get all list items
        const tasks = Array.from(taskList.children).map(item => item.textContent.replace('Remove', '').trim());
        // Convert to JSON and save to Local Storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a new task element and append it to the task list
    function createTaskElement(taskText) {
        // Create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            // Remove the list item from the DOM
            taskList.removeChild(listItem);
            // Update Local Storage
            saveTasks();
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);
    }

    // Add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        createTaskElement(taskText);
        // Save tasks to Local Storage
        saveTasks();
        // Clear the input field
        taskInput.value = "";
    }

    // Attach event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Attach event listener to the input field to handle 'Enter' key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});