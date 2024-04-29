const taskText = document.getElementById('inputText');
const taskDate = document.getElementById('inputDate');

const tasks = document.getElementById('tasks');

const defaultText = document.getElementById('default');

const addTask = () => {
    if (taskText.value === '' || taskDate.value === "") {
        alert("Task details or date not specified");
    }
    else if (localStorage.getItem(taskText.value)) {
        alert("Task already exists...");
        console.log("Task already exists...");
    }
    else {
        if (!tasks.hasChildNodes()) {
            defaultText.classList.add('default-hide');
        }

        let li = document.createElement("li");
        tasks.appendChild(li);

        let task = document.createElement("span");
        task.setAttribute('id', 'task');
        task.innerHTML = taskText.value;
        console.log("Task added");
        li.appendChild(task);

        let date = document.createElement("span");
        date.setAttribute('id', 'date');
        date.innerHTML = taskDate.value;
        li.appendChild(date);

        let cross = document.createElement("span");
        cross.setAttribute('id', 'cross');
        cross.innerHTML = "\u00d7";
        li.appendChild(cross);

        let key = taskText.value;
        let value = tasks.lastChild.outerHTML;
        saveIndividualData(key, value);
    }

    taskText.value = "";
    taskDate.value = "";
    saveData();
}

tasks.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.id === "cross") {
        let val = e.target.parentElement.querySelector('#task').innerHTML;
        e.target.parentElement.remove();
        localStorage.removeItem(val);
        console.log("Task removed");

        if (!tasks.hasChildNodes()) {
            defaultText.classList.remove('default-hide');
        }
    }
    saveData();
}
    , false);

// function saveData(keyData, valueData) {
//     localStorage.setItem(keyData, valueData);
// }

function saveData() {
    localStorage.setItem("data", tasks.innerHTML);
}

function showTask() {
    tasks.innerHTML = localStorage.getItem("data");
}

showTask();

// const theme = document.querySelector(".theme");

// function showTheme() {
//     theme.classList.toggle('hidden-theme');
// }

function saveIndividualData(key, value) {
    localStorage.setItem(key, value);
}

function showIndividual(key) {
    localStorage.getItem(key);
}

function refresh() {
    if (tasks.hasChildNodes()) {
        defaultText.classList.add('default-hide');
    }
}

refresh();

function searchTask() {
    if (taskText.value === '') {
        alert("Enter task first to obtain its details...");
    }
    else if (localStorage.getItem(taskText.value)) {
        tasks.innerHTML = localStorage.getItem(taskText.value);
        console.log("Task searched");
    }
    else {
        console.log("Task not available");
        alert("Task not available...");
        goBack();
    }
}

function goBack() {
    tasks.innerHTML = localStorage.getItem("data");
    taskText.value = "";
    taskDate.value = "";
}