
function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        addTaskToDOM(task.name, task.completed);
    });
}

function addTaskToDOM(taskName, isCompleted) {
    var li = document.createElement("li");
    var t = document.createTextNode(taskName);
    li.appendChild(t);
    
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    
    if (isCompleted) {
        li.classList.add('checked'); 
    }

    document.getElementById("myUL").appendChild(li);
    
    
    span.onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        removeTaskFromStorage(taskName);
    }

   
    li.onclick = function() {
        li.classList.toggle('checked');
        updateTaskInStorage(taskName, li.classList.contains('checked'));
    }
}

function removeTaskFromStorage(taskName) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(function(task) {
        return task.name !== taskName;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function updateTaskInStorage(taskName, isCompleted) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        if (task.name === taskName) {
            task.completed = isCompleted;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function newElement() {
    var inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        addTaskToDOM(inputValue, false);
        saveTaskToStorage(inputValue);
    }
    document.getElementById("myInput").value = "";
}


function saveTaskToStorage(taskName) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ name: taskName, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function filterTasks(filter) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    document.getElementById("myUL").innerHTML = ""; 

    tasks.forEach(function(task) {
        if (filter === "all" || (filter === "completed" && task.completed) || (filter === "active" && !task.completed)) {
            addTaskToDOM(task.name, task.completed);
        }
    });
}


window.onload = loadTasks;


document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        newElement(); 
    } else if (event.key === '1') {
        filterTasks('all'); 
    } else if (event.key === '2') {
        filterTasks('completed'); 
    } else if (event.key === '3') {
        filterTasks('active'); 
    }
});