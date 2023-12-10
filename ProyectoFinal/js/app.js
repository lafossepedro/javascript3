// Datos iniciales
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Función para crear tarea
function addTask() {

  Toastify({
    text: "Nueva tarea creada",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", 
    position: "center", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){}
  }).showToast();

    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const dueDateInput = document.getElementById('dueDateInput');
  
    if (taskText !== '') {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        dueDate: dueDateInput.value, // Obtener fecha de vencimiento
      };
  
      tasks.push(newTask);
      updateTaskList();
      taskInput.value = '';
      dueDateInput.value = ''; // Limpiar campo de fecha de vencimiento
  
      // Actualizar flatpickr después de agregar la tarea
      flatpickr('.due-date-picker', { dateFormat: 'Y-m-d' });
  
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Función para marcar/desmarcar una tarea como completada
function toggleTask(taskId) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    updateTaskList();
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Función para eliminar una tarea con confirmación vía SweetAlert2
function deleteTask(taskId) {
  Swal.fire({
    title: "¿Querés eliminar esta tarea?",
    text: "No podrás recuperarla",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      tasks = tasks.filter(task => task.id !== taskId);
      updateTaskList();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
  }


// Función para actualizar la lista de tareas en el DOM
function updateTaskList() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const listItem = document.createElement('li');

    if (task.completed) {
      listItem.classList.add('completed');
    }

    listItem.innerHTML = `
    <span>${task.text}</span>
    <span class="due-date">${task.dueDate ? ' - Vence: ' + task.dueDate : ''}</span>
    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
    <button class="delete-btn" onclick="deleteTask(${task.id})">Eliminar</button>
  `;

    taskList.appendChild(listItem);
  });
}

// Agregar listeners a los botones
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addTask);

// Actualizar la lista de tareas
updateTaskList();