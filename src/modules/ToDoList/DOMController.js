/* eslint-disable no-underscore-dangle */

const DOMController = () => {

  const _taskDisplayEl = document.getElementById('display-task-items');
  const _taskSettingsDisplayEl = document.getElementById('task-settings-display');
  /* Private */
  const getTaskDisplay = () => _taskDisplayEl;
  const getTaskSettingsDisplay = () => _taskSettingsDisplayEl;


  /* Public */
  const display = () => {

  };

  const generateTask = (taskTitle, taskDesc) => {
    console.log('generateTask run:');

    // Main task container
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    // Project/category color bar
    const taskItemProjectColor = document.createElement('div');
    taskItemProjectColor.classList.add('task-item-project-color');
    taskContainer.appendChild(taskItemProjectColor);

    taskItemProjectColor.addEventListener('click', () => {
      console.log('>>> OPEN TASK');
    });

    // Task item title and description details container
    const taskItemTaskDetails = document.createElement('div');
    taskItemTaskDetails.classList.add('task-item-task-details');
    taskContainer.appendChild(taskItemTaskDetails);
    taskItemTaskDetails.addEventListener('click', () => {
      console.log('>>> OPEN TASK');
    });

    // Task item title
    const taskItemTaskDetailsTitle = document.createElement('div');
    taskItemTaskDetailsTitle.classList.add('task-item-task-details-title');
    taskItemTaskDetailsTitle.textContent = taskTitle;
    taskItemTaskDetails.appendChild(taskItemTaskDetailsTitle);

    // Task item description
    const taskItemTaskDetailsDesc = document.createElement('div');
    taskItemTaskDetailsDesc.classList.add('task-item-task-details-desc');
    taskItemTaskDetailsDesc.textContent = taskDesc;
    taskItemTaskDetails.appendChild(taskItemTaskDetailsDesc);

    // Task item priority stars ***
    const taskItemTaskPriority = document.createElement('div');
    taskItemTaskPriority.classList.add('task-item-task-priority');
    taskContainer.appendChild(taskItemTaskPriority);
    taskItemTaskPriority.addEventListener('click', () => { console.log('>>> OPEN TASK'); });
    for (let i = 0; i < 3; i += 1) {
      const imgTaskItemTaskPriority = document.createElement('img');
      imgTaskItemTaskPriority.classList.add('img-task-item-task-priority');
      imgTaskItemTaskPriority.setAttribute('src', '../src/assets/images/Five-pointed_star.svg');
      taskItemTaskPriority.appendChild(imgTaskItemTaskPriority);
    }

    // Task item completed status
    const taskItemTaskCompleted = document.createElement('div');
    taskItemTaskCompleted.classList.add('task-item-task-completed');
    taskContainer.appendChild(taskItemTaskCompleted);
    taskItemTaskCompleted.addEventListener('click', () => { console.log('>>> COMPLETE TASK'); });
    const imgTaskItemTaskCompleted = document.createElement('img');
    imgTaskItemTaskCompleted.classList.add('img-task-item-task-completed');
    imgTaskItemTaskCompleted.setAttribute('src', '../src/assets/images/Flat_tick_icon.svg');
    taskItemTaskCompleted.appendChild(imgTaskItemTaskCompleted);

    return taskContainer;
  };

  const generateTaskSettings = () => {

  };

  const displayTasks = (projects) => {
    const taskDisplay = getTaskDisplay();
    console.log('displayTasks run:');
    const tasks = projects[0].getTasks();
    console.log(tasks);
    for (let i = 0; i < tasks.length; i += 1) {
      const title = tasks[i].getTitle();
      const desc = tasks[i].getDescription();

      taskDisplay.appendChild(generateTask(title, desc));
      // console.log(tasks[i].getTitle());
    }
  };

  const getTaskFromSettings = () => {
    const tempTask = {};
    tempTask.project = document.getElementById('settings-input-project').value;
    tempTask.title = document.getElementById('settings-input-title').value;
    tempTask.desc = document.getElementById('settings-input-desc').value;
    tempTask.dateCreate = document.getElementById('settings-input-date-create').value;
    tempTask.dateDue = document.getElementById('settings-input-date-due').value;
    tempTask.priority = document.getElementById('settings-input-priority').value;
    tempTask.notes = document.getElementById('settings-input-notes').value;
    return tempTask;
  };

  const createNewTaskFromSettings = () => {
    console.log('createNewTaskFromSettings');

    const tempTask = getTaskFromSettings();

    const taskSettingsDisplay = getTaskSettingsDisplay();
    taskSettingsDisplay.classList.add('hide-disable');
  };


  const createEvents = () => {
    console.log('createEvents() run:');
    const createNewTask = document.getElementById('settings-submit-new-task');
    createNewTask.addEventListener('click', () => {
      createNewTaskFromSettings();
    });
  };

  const init = () => {
    createEvents();
  };

  init();

  return Object.freeze({
    display,
    displayTasks,
  });
};

export default DOMController;
