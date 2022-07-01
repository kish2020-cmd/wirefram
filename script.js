var taskManager;
const todaysDate = new Date();
const day = todaysDate.getDate();
// const thisMonth = todaysDate.getMonth()+1;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const thisMonth = months[todaysDate.getMonth()];
const thisYear = todaysDate.getFullYear();

document.getElementById('dateDisplay').innerText= `Today is ${day}  ${thisMonth}  ${thisYear}.`;

//Name validation

const taskInput = document.getElementById('taskname');
//const nameValue = document.getElementById('taskname').value;
const validateName = () => {
    
    if(taskInput.value.length === 0) {
        taskInput.style.border = '1px solid red';
    } else if (taskInput.value.length < 8) {
        document.getElementById('taskNameErr').style.display = 'block';
        taskInput.style.border = '1px solid red';
    } else {
        document.getElementById('taskNameErr').style.display = 'none';
        taskInput.style.border = '1px solid #ced4da';
    }
}
taskInput.addEventListener('blur', validateName);

//Description validation
const descriptionInput = document.getElementById('taskdescription');
const validateDescription = () => {
    if(descriptionInput.value.length === 0) {
        descriptionInput.style.border = '1px solid red';
    } else if (descriptionInput.value.length > 15) {
        document.getElementById('taskDescriptionErr').style.display = 'block';
        descriptionInput.style.border = '1px solid red';
    } else {
        document.getElementById('taskDescriptionErr').style.display = 'none';
        descriptionInput.style.border = '1px solid #CED4DA';
    }
}
descriptionInput.addEventListener('blur', validateDescription);

//Date validation
const taskDate = document.querySelector('#taskdate');
const dateValidation = () => {
  if (taskDate.value === '') {
    taskDate.style.border = '1px solid red'
    return
  }
  let inputDate = new Date(taskDate.value)
  let currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0);
  if (inputDate < currentDate) {
    document.getElementById('dateErr').style.display = 'block';
    taskDate.style.border = '1px solid red'
  } else {
    document.getElementById('dateErr').style.display = 'none';
    taskDate.style.border = '1px solid #ced4da'
  }

}
taskDate.onblur = () => {
  dateValidation()
}
// Submit button validation

const taskSubmit = document.getElementById('task-submit');
const error = document.getElementById('submitErr');

error.style.display = 'block';
error.style.visibility = 'hidden';
var isObjCreated = false;
const validateSubmit = () => {
    if (taskInput.value === '' && descriptionInput.value === '' && taskDate.value === '') {
        taskInput.style.border = '1px solid red';
        descriptionInput.style.border = '1px solid red';
        taskDate.style.border = '1px solid red';
        error.style.visibility = 'visible';
        return false;
   } else if (descriptionInput.value === '' && taskDate.value === ''){
    descriptionInput.style.border = '1px solid red';
        taskDate.style.border = '1px solid red';
        error.style.visibility = 'visible';
      
   } else if (taskInput.value === '' && descriptionInput.value === ''){
        taskInput.style.border = '1px solid red';
        descriptionInput.style.border = '1px solid red';
        error.style.visibility = 'visible';
       
   } else if (taskInput.value === '' && taskDate.value === ''){
        taskInput.style.border = '1px solid red';
        error.style.visibility = 'visible';
   } else if (descriptionInput.value === '') {
    descriptionInput.style.border = '1px solid red';
        error.style.visibility = 'visible';
   } else if (taskInput.value === '') {
        taskInput.style.border = '1px solid red';
        error.style.visibility = 'visible';
   } else if (taskDate.value === '') {
        taskDate.style.border = '1px solid red';
        error.style.visibility = 'visible';
   }

   addObjects();

}
  

   const createTaskHtml = (name, description, assignedTo, dueDate, status) => `
<li class="list-group-item" >
    <div class="d-flex w-100 mt-2 justify-content-between align-items-center">
        <h5>${name}</h5>
        <span class="badge badge-danger">${status}</span>
    </div>
    <div class="d-flex w-100 mb-3 justify-content-between">
        <small>Assigned To: ${assignedTo}</small>
        <small>Due: ${dueDate}</small>
    </div>
    <p>${description}</p>
</li>
`;
const createTaskHtmlNew = (name, description, assignedTo, dueDate, status) => `
<div class="container" style="width: max-content; ">
  <div class="row">
    <div class="col">
      Name
    </div>
    <div class="col">
    ${name}
    </div>    
  </div>
  <div class="row">
  <div class="col">
  status
  </div>
  <div class="col">
  ${status}
  </div>    
</div>
<div class="row">
<div class="col">
assignedTo
</div>
<div class="col">
${assignedTo}
</div>    
</div>
<div class="row">
<div class="col">
dueDate
</div>
<div class="col">
${dueDate}
</div>    
</div>
<div class="row">
<div class="col">
description
</div>
<div class="col">
${description}
</div>    
</div>

</div>
<hr>
`;

class TaskManager {
constructor(currentId = 0) {
     this.tasks = [];
    this.currentId = currentId;
}

addTask(name, description, assignedTo, dueDate,status) {
    const task = {
        id: this.currentId++,
        name: name,
        description: description,
        assignedTo: assignedTo,
        dueDate: dueDate,
        status: status
    };

    this.tasks.push(task);
    
}

// Create the render method
render() {
    
    // Create an array to store the tasks' HTML
    const tasksHtmlList = [];

    // Loop over our tasks and create the html, storing it in the array
    for (let i = 0; i < this.tasks.length; i++) {
        // Get the current task in the loop
        const task = this.tasks[i];
        console.log(i+"-----id------- "+task.id);
        // Format the date
        const date = new Date(task.dueDate);
        const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

        // Create the task html
        const taskHtml = createTaskHtmlNew(task.name, task.description, task.assignedTo, formattedDate, task.status);

        // Push it to the tasksHtmlList array
        tasksHtmlList.push(taskHtml);
       
        
    }

    // Create the tasksHtml by joining each item in the tasksHtmlList
    // with a new line in between each item.
    const tasksHtml = tasksHtmlList.join('\n');

    // Set the inner html of the tasksList on the page
    const tasksList = document.querySelector('#tasksList');
    tasksList.innerHTML = tasksHtml;

}
}  //end of class

const addObjects = () => {
 

if(!isObjCreated){
      taskManager = new TaskManager(0);
   
    isObjCreated = true;
}else  {
    console.log("taskManager exists--"+taskManager);
}

const newTaskForm = document.querySelector('#newTaskForm');



//event.preventDefault();

const newTaskNameInput = document.querySelector('#taskname');
const newTaskDescription = document.querySelector('#taskdescription');
const newTaskAssignedTo = document.querySelector('#assignee');
const newTaskDueDate = document.querySelector('#taskdate');
const newTaskStatus = document.querySelector('#status');
 

/*
    Validation code here
*/

const name = newTaskNameInput.value;
const description = newTaskDescription.value;
const assignedTo = newTaskAssignedTo.value;
const dueDate = newTaskDueDate.value;
const status = newTaskStatus.value;


taskManager.addTask(name, description, assignedTo, dueDate,status);

// Render the tasks
taskManager.render();

newTaskNameInput.value = '';
newTaskDescription.value = '';
newTaskAssignedTo.value = '';
newTaskDueDate.value = '';
newTaskStatus.value = '';

}

