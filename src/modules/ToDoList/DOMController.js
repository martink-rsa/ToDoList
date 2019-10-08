/* eslint-disable no-underscore-dangle */
import * as Hammer from 'hammerjs';
import Projects from './Projects';
import ProjectsInterface from './ProjectsInterface';
import projectInterface from '../../../dist/testing/COIProject';

window.Hammer = Hammer.default;

const DOMController = (projectsInterfaceIn) => {
  /* Private */
  const _taskDisplayEl = document.getElementById('display-task-items');
  const _taskSettingsDisplayEl = document.getElementById('task-settings-display');
  const _projectsInterface = projectsInterfaceIn;
  let _currentProjectDisplayed = 1;

  /* Public */
  const getTaskDisplay = () => _taskDisplayEl;
  const getTaskSettingsDisplay = () => _taskSettingsDisplayEl;
  const getProjectsInterface = () => _projectsInterface;

  const getCurrentProjectDisplayed = () => _currentProjectDisplayed;
  const setCurrentProjectDisplayed = (newCurrentProject) => {
    _currentProjectDisplayed = newCurrentProject;
  };

  const showTaskDeleteConfirmation = (index, task) => {
    const taskOptionsConfirmContainer = task.getElementsByClassName('task-item-options-confirm-container');
    taskOptionsConfirmContainer[0].classList.remove('hide-disable');
  };

  const hideTaskDeleteConfirmation = (index, task) => {
    const taskOptionsConfirmContainer = task.getElementsByClassName('task-item-options-confirm-container');
    taskOptionsConfirmContainer[0].classList.add('hide-disable');
  };

  const deleteTask = (currentIndex, projectIndex, taskIndex) => {
    const taskElements = document.getElementsByClassName('task-container');
    taskElements[currentIndex].classList.remove('show-opacity');
    setTimeout(() => {
      getProjectsInterface().deleteTask(projectIndex, taskIndex);
      displayTasks();
    }, 800);
  };

  const setActiveProject = (index) => {
    let adjustedIndex = index;
    console.log('Index: ' + index);
    if (adjustedIndex === -1) {
      adjustedIndex = 0;
    } else {
      adjustedIndex += 1;
    }
    const projectElements = document.getElementsByClassName('mobile-menu-project-container');
    for (let i = 0; i < projectElements.length; i += 1) {
      projectElements[i].classList.remove('mobile-menu-project-active');
    }
    projectElements[adjustedIndex].classList.add('mobile-menu-project-active');
  };

  const generateMobileProjectsAllItem = (projectsDisplay) => {
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('mobile-menu-project-container');
    projectContainer.classList.add('mobile-menu-project-active');
    projectContainer.addEventListener('click', () => {
      setActiveProject(-1);
      setCurrentProjectDisplayed(-1);
      displayTasks();
    });

    const projectColorContainer = document.createElement('div');
    projectColorContainer.classList.add('mobile-menu-project-color-container');
    projectContainer.appendChild(projectColorContainer);
/* 
    const projectColor = document.createElement('div');
    projectColor.classList.add('mobile-menu-project-color');
    projectColorContainer.appendChild(projectColor); */

    const projectTextContainer = document.createElement('div');
    projectTextContainer.classList.add('mobile-menu-project-text-container');

    const projectTitleContainer = document.createElement('div');
    projectTitleContainer.classList.add('mobile-menu-project-title-container');

    const projectTitle = document.createElement('div');
    projectTitle.textContent = 'Show All';
    projectTitle.classList.add('mobile-menu-project-title');
    projectTitleContainer.appendChild(projectTitle);

    const projectDescContainer = document.createElement('div');
    projectDescContainer.classList.add('mobile-menu-project-desc-container');

    const projectDesc = document.createElement('div');
    projectDesc.textContent = '';
    projectDesc.classList.add('mobile-menu-project-desc');
    projectDescContainer.appendChild(projectDesc);

    projectTextContainer.appendChild(projectTitleContainer);
    projectTextContainer.appendChild(projectDescContainer);

    projectContainer.appendChild(projectTextContainer);

    const projectControlsContainer = document.createElement('div');
    projectControlsContainer.classList.add('mobile-menu-project-controls-container');

    const projectControls = document.createElement('div');
    projectControls.classList.add('mobile-menu-project-controls');
    projectControlsContainer.appendChild(projectControls);

    projectContainer.appendChild(projectControlsContainer);
    projectsDisplay.appendChild(projectContainer);
  };

  const generateProjects = () => {
    getProjectsInterface().getProjects();
    const projects = getProjectsInterface().getProjects().getProjectsList();
    const projectsDisplay = document.getElementById('mobile-projects-display');

    // Generating 'All'
    generateMobileProjectsAllItem(projectsDisplay);

    // Generating projects
    for (let i = 0; i < projects.length; i += 1) {
      const projectContainer = document.createElement('div');
      projectContainer.classList.add('mobile-menu-project-container');
      projectContainer.addEventListener('click', () => {
        setActiveProject(i);
        setCurrentProjectDisplayed(i);
        displayTasks();
      });

      const projectColorContainer = document.createElement('div');
      projectColorContainer.classList.add('mobile-menu-project-color-container');
      projectContainer.appendChild(projectColorContainer);

      const projectColor = document.createElement('div');
      projectColor.classList.add('mobile-menu-project-color');
      projectColorContainer.appendChild(projectColor);
      projectColor.style.background = projects[i].getColor();

      const projectColorOverlay = document.createElement('div');
      projectColorOverlay.classList.add('mobile-menu-project-color-overlay');
      projectColorContainer.appendChild(projectColorOverlay);

      const projectTextContainer = document.createElement('div');
      projectTextContainer.classList.add('mobile-menu-project-text-container');

      const projectTitleContainer = document.createElement('div');
      projectTitleContainer.classList.add('mobile-menu-project-title-container');

      const projectTitle = document.createElement('div');
      projectTitle.textContent = projects[i].getTitle();
      projectTitle.classList.add('mobile-menu-project-title');
      projectTitleContainer.appendChild(projectTitle);

      const projectDescContainer = document.createElement('div');
      projectDescContainer.classList.add('mobile-menu-project-desc-container');

      const projectDesc = document.createElement('div');
      projectDesc.textContent = projects[i].getDescription();
      projectDesc.classList.add('mobile-menu-project-desc');
      projectDescContainer.appendChild(projectDesc);

      projectTextContainer.appendChild(projectTitleContainer);
      projectTextContainer.appendChild(projectDescContainer);

      projectContainer.appendChild(projectTextContainer);

      const projectControlsContainer = document.createElement('div');
      projectControlsContainer.classList.add('mobile-menu-project-controls-container');

      const projectControls = document.createElement('div');
      projectControls.classList.add('mobile-menu-project-controls');
      projectControlsContainer.appendChild(projectControls);

      const projectControlsEditButton = document.createElement('button');
      projectControlsEditButton.classList.add('btn-mobile-menu-project-edit');
      projectControls.appendChild(projectControlsEditButton);

      const projectControlsEditButtonImage = document.createElement('img');
      projectControlsEditButtonImage.classList.add('img-mobile-menu-project-edit');
      projectControlsEditButtonImage.setAttribute('src', '../src/assets/images/edit-button.svg')
      projectControlsEditButtonImage.setAttribute('alt', 'Edit Project')
      projectControlsEditButton.appendChild(projectControlsEditButtonImage);

      projectContainer.appendChild(projectControlsContainer);
      projectsDisplay.appendChild(projectContainer);

    }
    console.log('generateProjects run:');

  };

  const generateTask = (currentIndex, projectIndex, taskIndex, taskTitle, taskDesc, taskColor) => {
    console.log('generateTask run:');

    // Main task container
    const taskContainer = document.createElement('div');
    taskContainer.setAttribute('data-project-index', projectIndex);
    taskContainer.setAttribute('data-task-index', taskIndex);
    taskContainer.classList.add('task-container');
    // taskContainer.classList.add('bg4');
    taskContainer.style.backgroundColor = 'rgba(255, 255, 255)';
    // taskContainer.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='${taskColor}' fill-opacity='0.045'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E")`;
    taskContainer.classList.add('box-shadow-1');
    taskContainer.classList.add('show-opacity');

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
    taskItemOptionsDeleteContainer.style.backgroundColor = 'rgba(255, 255, 255)';
    taskItemOptionsDeleteContainer.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='${taskColor}' fill-opacity='0.2'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E")`;
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
      deleteTask(currentIndex, projectIndex, taskIndex);
    });
    taskItemOptionsConfirmIconYes.appendChild(imgConfirmDeleteYes);

    taskContainer.appendChild(taskItemOptionsOverlayContainer);
    return taskContainer;
  };

  const generateTaskSettings = () => {

  };

  const addTaskSwipeGesture = (el) => {
    const swipeAction = new Hammer(el);
    swipeAction.on('swipe', (ev) => {
      toggleTaskOptions(el);
    });
  };

  const taskSwipeController = () => {
    const tasks = document.getElementsByClassName('task-container');
    for (let i = 0; i < tasks.length; i += 1) {
      addTaskSwipeGesture(tasks[i]);
    }
  };

  const addMobileTaskMenuSwipeGesture = (el) => {
    const swipeAction = new Hammer(el);
    swipeAction.on('swipe', (ev) => {
      let test = ev.target.classList;
      console.log(ev.target.hasAttribute('data-task-index'));
      console.log(test);
      console.log(ev.target.classList[1]);
      console.log(ev);
      console.log('swipe');
      toggleMobileMenu('toggle');
    });
  };

  const mobileMenuSwipeController = () => {
    const tasksDisplay = document.getElementById('mobile-projects-display');
    const mobileMenu = document.getElementById('task-mobile-menu');
    addMobileTaskMenuSwipeGesture(tasksDisplay);
    addMobileTaskMenuSwipeGesture(mobileMenu);
  };

  const clearTasksDisplay = () => {
    const taskDisplay = getTaskDisplay();
    taskDisplay.innerHTML = '';
  };

  const displayTasks = () => {
    const taskDisplay = getTaskDisplay();
    const projectsInterface = getProjectsInterface();
    const projects = projectsInterface.getProjects();
    const projectsList = projects.getProjectsList();
    const currentProjectDisplayed = getCurrentProjectDisplayed();
    let currentIndex = 0;
    clearTasksDisplay();
    if (currentProjectDisplayed === -1) {
      for (let i = 0; i < projectsList.length; i += 1) {
        const tasks = projectsList[i].getTasks();
        for (let j = 0; j < tasks.length; j += 1) {
          const title = tasks[j].getTitle();
          const desc = tasks[j].getDescription();
          const color = projectsList[i].getColor();
          taskDisplay.appendChild(generateTask(currentIndex, i, j, title, desc, color));
          currentIndex += 1;
        }
      }
    } else {
      const tasks = projectsList[currentProjectDisplayed].getTasks();
      for (let j = 0; j < tasks.length; j += 1) {
        const title = tasks[j].getTitle();
        const desc = tasks[j].getDescription();
        const color = projectsList[currentProjectDisplayed].getColor();
        taskDisplay.appendChild(generateTask(currentIndex, currentProjectDisplayed, j, title, desc, color));
        currentIndex += 1;
      }
    }
    console.log({ currentIndex });
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
    toggleTaskSettings('hide');
  };

  const toggleTaskSettings = (state) => {
    const taskSettingsMainContainer = document.getElementById('task-settings-display');
    const overlayAddTaskContainer = document.getElementsByClassName('overlay-add-task-container');
    if (state === 'show') {
      taskSettingsMainContainer.classList.add('show');
      overlayAddTaskContainer[0].classList.remove('show');
    } else if (state === 'hide') {
      taskSettingsMainContainer.classList.remove('show');
      overlayAddTaskContainer[0].classList.add('show');
    }
  };

  const toggleTaskOptions = (el) => {
    const overlay = el.getElementsByClassName('task-item-options-overlay');
    overlay[0].classList.toggle('animate-task-item-options-overlay');
  };

  const toggleMobileMenu = (state) => {
    console.log('showMobileMenu():');
    const taskMobileMenu = document.getElementById('task-mobile-menu');
    const taskMobileOverlay = document.getElementsByClassName('task-mobile-overlay');
    if (state === 'show') {
      taskMobileMenu.classList.add('mobile-menu-show');
      taskMobileOverlay[0].classList.add('show-opacity');
    } else if (state === 'hide') {
      taskMobileMenu.classList.remove('mobile-menu-show');
      taskMobileOverlay[0].classList.remove('show-opacity');
    } else if (state === 'toggle') {
      taskMobileMenu.classList.toggle('mobile-menu-show');
      taskMobileOverlay[0].classList.toggle('show-opacity');
    }
  };

  const createEvents = () => {
    console.log('createEvents() run:');
    const taskTopbarMenuCog = document.getElementById('task-topbar-menu-cog');
    const taskMobileMenuCog = document.getElementById('task-mobile-menu-cog');
    const taskMobileMenuArrow = document.getElementsByClassName('task-mobile-menu-arrow');
    taskTopbarMenuCog.addEventListener('click', () => {
      toggleMobileMenu('show');
    });
    taskMobileMenuCog.addEventListener('click', () => {
      toggleMobileMenu('hide');
    });
    
    // Submit new task from task window
    const createNewTaskSubmit = document.getElementById('settings-submit-new-task');
    createNewTaskSubmit.addEventListener('click', () => { createNewTaskFromSettings(); });
    // Button to show new task window (Circle with +, bottom right corner)
    const newTaskButton = document.getElementById('add-new-task');
    newTaskButton.addEventListener('click', () => { toggleTaskSettings('show'); });
    // Long button on side of mobile menu
    taskMobileMenuArrow[0].addEventListener('click', () => {
      toggleMobileMenu('toggle');
    });

    mobileMenuSwipeController();
    // TEMP MENU SHOW FOR DESIGN PURPOSES:
    toggleMobileMenu('show');
  };

  const init = () => {
    createEvents();
    generateProjects();
    /* Turn off settings screen while working, remove when done */
    // const taskSettingsDisplay = getTaskSettingsDisplay();
    // taskSettingsDisplay.classList.add('hide-disable');
  };

  init();

  return Object.freeze({
    displayTasks,
  });
};

export default DOMController;
