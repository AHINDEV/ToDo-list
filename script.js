 // Task Management Logic
 let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
 function saveTasks() {
     localStorage.setItem('tasks', JSON.stringify(tasks));
 }

 function addTask(text) {
     const task = {
         id: Date.now(),
         text,
         completed: false
     };
     tasks.push(task);
     renderTasks();
 }

 function toggleComplete(id) {
     tasks = tasks.map(task => {
         if(task.id === id) task.completed = !task.completed;
         return task;
     });
     saveTasks();
     renderTasks();
 }

 function deleteTask(id) {
     tasks = tasks.filter(task => task.id !== id);
     saveTasks();
     renderTasks();
 }

 function editTask(id, newText) {
     tasks = tasks.map(task => {
         if(task.id === id) task.text = newText;
         return task;
     });
     saveTasks();
     renderTasks();
 }

 // Rendering Functions
 function renderTasks() {
     const taskList = document.getElementById('taskList');
     taskList.innerHTML = '';
     
     tasks.forEach(task => {
         const taskItem = document.createElement('li');
         taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
         
         taskItem.innerHTML = `
             <span class="emoji">${task.completed ? '✅' : '⏳'}</span>
             <span class="flex-grow-1">${task.text}</span>
             <button class="btn btn-sm complete-btn text-white" onclick="toggleComplete(${task.id})">
                 <i class="fas fa-check"></i>
             </button>
             <button class="btn btn-sm edit-btn text-white" onclick="editTaskPrompt(${task.id})">
                 <i class="fas fa-edit"></i>
             </button>
             <button class="btn btn-sm delete-btn text-white" onclick="deleteTask(${task.id})">
                 <i class="fas fa-trash"></i>
             </button>
         `;
         
         taskList.appendChild(taskItem);
     });
 }

 // Event Listeners
 document.getElementById('addBtn').addEventListener('click', () => {
     const input = document.getElementById('taskInput');
     if(input.value.trim()) {
         addTask(input.value.trim());
         input.value = '';
     }
 });

 function editTaskPrompt(id) {
     const task = tasks.find(task => task.id === id);
     const newText = prompt('Edit task:', task.text);
     if(newText !== null) editTask(id, newText.trim());
 }

 // Initial Render
 renderTasks();