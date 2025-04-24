$(document).ready(function() {
    // Función para cargar tareas desde el localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        $('#task-list').empty();
        tasks.forEach((task, index) => {
            const taskElement = createTaskElement(task, index);
            $('#task-list').append(taskElement);
        });
    }

    // Función para crear un elemento de tarea
    function createTaskElement(task, index) {
        const taskElement = $('<li></li>');
        if (task.completed) {
            taskElement.addClass('completed');
        }

        taskElement.html(`
            <span>${task.text}</span>
            <button class="complete-btn" data-index="${index}">Completar</button>
            <button class="delete-btn" data-index="${index}">Eliminar</button>
        `);

        return taskElement;
    }

    // Función para guardar las tareas en el localStorage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Añadir tarea
    $('#add-task-btn').click(function() {
        const taskText = $('#task-input').val();
        if (taskText) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push({ text: taskText, completed: false });
            saveTasks(tasks);
            loadTasks();
            $('#task-input').val('');
        }
    });

    // Marcar tarea como completada
    $(document).on('click', '.complete-btn', function() {
        const index = $(this).data('index');
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
        loadTasks();
    });

    // Eliminar tarea
    $(document).on('click', '.delete-btn', function() {
        const index = $(this).data('index');
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1);
        saveTasks(tasks);
        loadTasks();
    });

    // Cargar tareas al inicio
    loadTasks();
});