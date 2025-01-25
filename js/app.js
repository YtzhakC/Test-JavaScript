let tasks = [];
let currentUser = null;
const API_URL = 'http://localhost:3000/users';

function handleAuth(action) {
    if (action === 'login') {
        location.href = 'login.html';
        updateAuthButtons();
        fetchTasks();
    } else if (action === 'register') {
        location.href = 'registro.html';
    } else if (action === 'logout') {
        localStorage.removeItem('user');
        currentUser = null;
        updateAuthButtons();
        tasks = [];
        renderTasks();
    }
}

function updateAuthButtons() {
    const authButtons = document.getElementById('auth-buttons');
    if (currentUser) {
        authButtons.innerHTML = '<button class="boton" onclick="handleAuth(\'logout\')">Cerrar sesión</button>';
    } else {
        authButtons.innerHTML = `
            <button class="boton" onclick="handleAuth('login')">Iniciar Sesión</button>
            <button class="boton" onclick="handleAuth('register')">Registro</button>
        `;
    }
}

async function fetchTasks() {
    const storedUser = localStorage.getItem('user');
    currentUser = JSON.parse(storedUser);
    if (currentUser) {
        try {
            const response = await fetch(`${API_URL}/${currentUser.id}`);
            const data = await response.json();
            tasks = data.tasks || [];
            renderTasks();
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }
}

async function saveTasks() {
    const storedUser = localStorage.getItem('user');
    currentUser = JSON.parse(storedUser);
    
    if (currentUser) {
        try {
            await fetch(`${API_URL}/${currentUser.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tasks }),
            });
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }
}

let startDateValue = document.getElementById('start-date').value
document.getElementById('start-date').addEventListener('change', function() {
    startDateValue = document.getElementById('start-date').value
    document.getElementById('end-date').min = startDateValue
});

document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const status = document.getElementById('task-status').value;
    const imageFile = document.getElementById('task-image').files[0];

    if (title && description && startDate && endDate) {
        const reader = new FileReader();
        reader.onloadend = function() {
            const task = {
                id: Date.now().toString(),
                title,
                description,
                startDate,
                endDate,
                status,
                image: reader.result
            };
            tasks.push(task);
            saveTasks();
            renderTasks();
            document.getElementById('task-form').reset();
        }
        if (imageFile) {
            reader.readAsDataURL(imageFile);
        } else {
            reader.onloadend();
        }
    }
});

function renderTasks() {
    document.querySelectorAll('.task-list').forEach(list => list.innerHTML = '');
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.setAttribute('draggable', 'true');
        taskElement.setAttribute('ondragstart', 'drag(event)');
        taskElement.setAttribute('data-id', task.id);
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            ${task.image ? `<img src="${task.image}" alt="${task.title}">` : ''}
            <p>Inicio: ${task.startDate}</p>
            <p>Fin: ${task.endDate}</p>
            <div class="task-actions">
                <button class="boton" onclick="editTask('${task.id}')">Editar</button>
                <button class="boton" onclick="deleteTask('${task.id}')">Eliminar</button>
            </div>
        `;
        document.querySelector(`#${task.status} .task-list`).appendChild(taskElement);
    });
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData('text', event.target.getAttribute('data-id'));
}

function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text');
    const newStatus = event.target.closest('.column').id;
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = newStatus;
        saveTasks();
        renderTasks();
    }
}

function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-desc').value = task.description;
        document.getElementById('start-date').value = task.startDate;
        document.getElementById('end-date').value = task.endDate;
        document.getElementById('task-status').value = task.status;
        tasks = tasks.filter(t => t.id !== taskId);
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks();
}

window.addEventListener('load', () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        currentUser = JSON.parse(storedUser); 
        updateAuthButtons();
        fetchTasks();
    }
});
