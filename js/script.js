const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const submitButton = document.querySelector('button');
const clearButton = document.getElementById('clear');

function addTask() {
    if (inputBox.value === '') {
        alert('You must write something!');
    } else {
        let newLi = document.createElement('li');
        newLi.innerHTML = inputBox.value;
        listContainer.appendChild(newLi);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        newLi.appendChild(span);
        
        saveData(); // Save the tasks to local storage
        
        checkUI();
        inputBox.value = ''; // Clear the input box
    }
}

listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData(); // Save the updated tasks to local storage
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData(); // Save the updated tasks to local storage
    }
    checkUI();
}, false);


// Save the tasks to local storage
function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

// Load the tasks from local storage
function showData() {
    if (localStorage.getItem('data')) {
        listContainer.innerHTML = localStorage.getItem('data');
    }

    localStorage.removeItem('data');
}

function clearData() {
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }
    checkUI();
}

function checkUI() {
    inputBox.value ='';
    const items = listContainer.querySelectorAll('li');
    if (items.length === 0) {
        clearButton.style.display = 'none';
    }
    else {
        clearButton.style.display = 'block';
    }
}

showData(); // Display the saved tasks on page load

submitButton.addEventListener('click', addTask);
clearButton.addEventListener('click', clearData);
checkUI();