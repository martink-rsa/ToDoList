/* eslint-disable no-underscore-dangle */
import * as Hammer from 'hammerjs';
import Projects from './Projects';
import ProjectsInterface from './ProjectsInterface';

window.Hammer = Hammer.default;

const DOMController = (projectsInterfaceIn) => {

  const _taskDisplayEl = document.getElementById('display-task-items');
  const _taskSettingsDisplayEl = document.getElementById('task-settings-display');

  const _projectsInterface = projectsInterfaceIn;
  /* Private */
  const getTaskDisplay = () => _taskDisplayEl;
  const getTaskSettingsDisplay = () => _taskSettingsDisplayEl;

  const getProjectsInterface = () => _projectsInterface;

  /* Public */
  const display = () => {

  };

  const showTaskDeleteConfirmation = (index, task) => {
    const taskOptionsConfirmContainer = task.getElementsByClassName('task-item-options-confirm-container');
    taskOptionsConfirmContainer[0].classList.remove('hide-disable');
  };

  const hideTaskDeleteConfirmation = (index, task) => {
    const taskOptionsConfirmContainer = task.getElementsByClassName('task-item-options-confirm-container');
    taskOptionsConfirmContainer[0].classList.add('hide-disable');
  };

  const deleteTask = (projectIndex, taskIndex) => {
    getProjectsInterface().deleteTask(projectIndex, taskIndex);
    displayTasks();
  };

  const generateTask = (projectIndex, taskIndex, taskTitle, taskDesc, taskColor) => {
    console.log('generateTask run:');

    // Main task container
    const taskContainer = document.createElement('div');
    taskContainer.setAttribute('data-project-index', projectIndex);
    taskContainer.setAttribute('data-task-index', taskIndex);
    taskContainer.classList.add('task-container');
    taskContainer.classList.add('bg4');
    taskContainer.classList.add('box-shadow-1');

    // Project/category color bar
    const taskItemProjectColor = document.createElement('div');
    taskItemProjectColor.classList.add('task-item-project-color');
    taskItemProjectColor.style.background = taskColor;
    taskContainer.appendChild(taskItemProjectColor);
    taskItemProjectColor.addEventListener('click', () => {
      console.log('>>> OPEN TASK');
    });

    // Project/category color bar darkness overlay
    const taskItemProjectColorOverlay = document.createElement('div');
    taskItemProjectColorOverlay.classList.add('task-item-project-color-overlay');
    taskItemProjectColor.appendChild(taskItemProjectColorOverlay);

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

    // Task options overlay container
    const taskItemOptionsOverlayContainer = document.createElement('div');
    taskItemOptionsOverlayContainer.classList.add('task-item-options-overlay-container');

    // Task options moving container
    const taskItemOptionsOverlay = document.createElement('div');
    taskItemOptionsOverlay.classList.add('task-item-options-overlay');
    taskItemOptionsOverlayContainer.appendChild(taskItemOptionsOverlay);

    // Task options delete container
    const taskItemOptionsDeleteContainer = document.createElement('div');
    taskItemOptionsDeleteContainer.classList.add('task-item-options-delete-container');
    taskItemOptionsOverlay.appendChild(taskItemOptionsDeleteContainer);

    // Task options delete icon (rubbish bin) container
    const taskItemOptionsDeleteIcon = document.createElement('div');
    taskItemOptionsDeleteIcon.classList.add('task-item-options-delete-icon');
    taskItemOptionsDeleteContainer.appendChild(taskItemOptionsDeleteIcon);

    // Task options delete icon (rubbish bin) image
    const imgDeleteTask = document.createElement('img');
    imgDeleteTask.classList.add('img-delete-task');
    imgDeleteTask.setAttribute('src', '../src/assets/images/Rubbish_bin.svg');
    imgDeleteTask.setAttribute('alt', 'Delete Task');
    imgDeleteTask.addEventListener('click', () => {
      showTaskDeleteConfirmation(taskIndex, taskContainer);
    });
    taskItemOptionsDeleteIcon.appendChild(imgDeleteTask);

    // Task options confirmation icons container
    const taskItemOptionsConfirmContainer = document.createElement('div');
    taskItemOptionsConfirmContainer.classList.add('task-item-options-confirm-container');
    taskItemOptionsConfirmContainer.classList.add('hide-disable');
    taskItemOptionsOverlay.appendChild(taskItemOptionsConfirmContainer);

    // Task options confirm icon: No
    const taskItemOptionsConfirmIconNo = document.createElement('div');
    taskItemOptionsConfirmIconNo.classList.add('task-item-options-confirm-icon');
    taskItemOptionsConfirmContainer.appendChild(taskItemOptionsConfirmIconNo);

    // Task options confirm icon img: No
    const imgConfirmDeleteNo = document.createElement('img');
    imgConfirmDeleteNo.classList.add('img-confirm-delete');
    imgConfirmDeleteNo.setAttribute('src', '../src/assets/images/cross.svg');
    imgConfirmDeleteNo.setAttribute('alt', 'Cancel Delete');
    imgConfirmDeleteNo.addEventListener('click', () => {
      hideTaskDeleteConfirmation(taskIndex, taskContainer);
    });
    taskItemOptionsConfirmIconNo.appendChild(imgConfirmDeleteNo);

    // Task options confirm icon: Yes
    const taskItemOptionsConfirmIconYes = document.createElement('div');
    taskItemOptionsConfirmIconYes.classList.add('task-item-options-confirm-icon');
    taskItemOptionsConfirmContainer.appendChild(taskItemOptionsConfirmIconYes);

    // Task options confirm icon img: Yes
    const imgConfirmDeleteYes = document.createElement('img');
    imgConfirmDeleteYes.classList.add('img-confirm-delete');
    imgConfirmDeleteYes.setAttribute('src', '../src/assets/images/tick.svg');
    imgConfirmDeleteYes.setAttribute('alt', 'Confirm Delete');
    imgConfirmDeleteYes.addEventListener('click', () => {
      deleteTask(projectIndex, taskIndex);
    });
    taskItemOptionsConfirmIconYes.appendChild(imgConfirmDeleteYes);

    taskContainer.appendChild(taskItemOptionsOverlayContainer);
    return taskContainer;
  };

  const generateTaskSettings = () => {

  };

  const addSwipeGesture = (el) => {
    const swipeAction = new Hammer(el);
    swipeAction.on('swipe', (ev) => {
      toggleTaskOptions(el);
    });
  };

  const taskSwipeController = () => {
    const tasks = document.getElementsByClassName('task-container');
    for (let i = 0; i < tasks.length; i += 1) {
      addSwipeGesture(tasks[i]);
    }
  };

  const displayTasks = () => {
    const taskDisplay = getTaskDisplay();
    const projectsInterface = getProjectsInterface();
    const projects = projectsInterface.getProjects();
    taskDisplay.innerHTML = '';
    const projectsList = projects.getProjectsList();
    for (let i = 0; i < projectsList.length; i += 1) {
      const tasks = projectsList[i].getTasks();
      for (let j = 0; j < tasks.length; j += 1) {
        const title = tasks[j].getTitle();
        const desc = tasks[j].getDescription();
        const color = projectsList[i].getColor();
        taskDisplay.appendChild(generateTask(i, j, title, desc, color));
      }
    }
    taskSwipeController();
  };

  const getTaskFromSettings = () => {
    const tempTask = {};
    tempTask.project = document.getElementById('settings-input-project').value;
    tempTask.title = document.getElementById('settings-input-title').value;
    tempTask.desc = document.getElementById('settings-input-desc').value;
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

  const toggleTaskOptions = (el) => {
    const overlay = el.getElementsByClassName('task-item-options-overlay');
    overlay[0].classList.toggle('animate-task-item-options-overlay');
  };

  const createEvents = () => {
    console.log('createEvents() run:');
    const createNewTaskSubmit = document.getElementById('settings-submit-new-task');
    createNewTaskSubmit.addEventListener('click', () => { createNewTaskFromSettings(); });

    const newTaskButton = document.getElementById('add-new-task');
    newTaskButton.addEventListener('click', () => { toggleTaskOptions(); });
  };

  const init = () => {
    createEvents();
    /* Turn off settings screen while working, remove when done */
    const taskSettingsDisplay = getTaskSettingsDisplay();
    taskSettingsDisplay.classList.add('hide-disable');
  };

  init();

  return Object.freeze({
    display,
    displayTasks,
  });
};

export default DOMController;
