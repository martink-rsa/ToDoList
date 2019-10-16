/* eslint-disable no-underscore-dangle */
import * as Hammer from 'hammerjs';
import Task from './Task';
import Utility from './Utility';
import Project from './Project';
import CheckListController from './CheckListController';

window.Hammer = Hammer.default;

const DOMController = (projectsInterfaceIn) => {
  /* Private */
  const _taskDisplayEl = document.getElementById('display-task-items');
  const _taskSettingsDisplayEl = document.getElementById('task-settings-display');
  const _projectsInterface = projectsInterfaceIn;
  const _checkListController = CheckListController();
  const _uti = Utility();

  let _currentProjectDisplayed = -1;
  let _currentProjectSettings = -1;
  let _projectSettingsWindowState = '';
  let _currentTask = -1;
  let _taskSettingsWindowState = '';
  let _taskSettingsInitialProject = -1;

  /* Public */
  const getTaskDisplay = () => _taskDisplayEl;
  const getTaskSettingsDisplay = () => _taskSettingsDisplayEl;
  const getProjectsInterface = () => _projectsInterface;

  const getCheckListController = () => _checkListController;

  const getCurrentProjectDisplayed = () => _currentProjectDisplayed;
  const setCurrentProjectDisplayed = (newCurrentProject) => {
    _currentProjectDisplayed = newCurrentProject;
  };

  const getCurrentProjectSettings = () => _currentProjectSettings;
  const setCurrentProjectSettings = (newCurrentProjectSettings) => {
    _currentProjectSettings = newCurrentProjectSettings;
  };

  const getProjectSettingsWindowState = () => _projectSettingsWindowState;
  const setProjectSettingsWindowState = (newProjectSettingsWindowState) => {
    _projectSettingsWindowState = newProjectSettingsWindowState;
  };

  const getCurrentTask = () => _currentTask;
  const setCurrentTask = (newCurrentTask) => {
    _currentTask = newCurrentTask;
  };

  const getTaskSettingsWindowState = () => _taskSettingsWindowState;
  const setTaskSettingsWindowState = (newState) => {
    _taskSettingsWindowState = newState;
  };

  const getTaskSettingsInitialProject = () => _taskSettingsInitialProject;
  const setTaskSettingsInitialProject = (newInitialProject) => {
    _taskSettingsInitialProject = newInitialProject;
  }

  const uti = () => _uti;

  const showTaskDeleteConfirmation = (index, task) => {
    
    const taskOptionsConfirmContainer = task.getElementsByClassName('task-item-options-confirm-container');
    const taskOptionsOverlay = task.getElementsByClassName('task-item-options-overlay');
    const taskOptionsConfirm = task.getElementsByClassName('task-item-options-confirm-container');
    taskOptionsOverlay[0].classList.add('animate-task-item-options-flip');
    taskOptionsConfirm[0].classList.add('animate-task-item-options-flip');
  };

  const hideTaskDeleteConfirmation = (index, task) => {
    const taskOptionsConfirmContainer = task.getElementsByClassName('task-item-options-confirm-container');
    const taskOptionsOverlay = task.getElementsByClassName('task-item-options-overlay');
    const taskOptionsConfirm = task.getElementsByClassName('task-item-options-confirm-container');
    taskOptionsOverlay[0].classList.remove('animate-task-item-options-flip');
    taskOptionsConfirm[0].classList.remove('animate-task-item-options-flip');
    
  };

  const deleteTask = (currentIndex, projectIndex, taskIndex) => {
    let statusMessage;
    const taskElements = document.getElementsByClassName('task-container');
    taskElements[currentIndex].classList.remove('show-opacity');
    taskElements[currentIndex].classList.add('animate-task-shrink');
    setTimeout(() => {
      getProjectsInterface().deleteTask(projectIndex, taskIndex);
      displayTasks();
      statusMessage = 'Task has been deleted.';
      displayStatusMessage('info', statusMessage);
    }, 800);
  };

  const displayStatusMessage = (type, message) => {
    const statusContainer = document.getElementById('status-container');
    const statusMessage = document.getElementById('status-message');
    if (type === 'info') {
      statusContainer.classList.add('status-info');
    } else if (type === 'notice') {
      statusContainer.classList.add('status-notice');
    } else if (type === 'warning') {
      statusContainer.classList.add('status-warning');
    } else if (type === 'error') {
      statusContainer.classList.add('status-error');
    }
    statusMessage.textContent = message;
    statusContainer.classList.add('show');
    setTimeout(() => {
      statusContainer.classList.remove('show');
    }, 2200);
  };

  const setActiveProject = (index) => {
    let adjustedIndex = index;
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

  const toggleProjectSettings = (state) => {
    const projectSettingsDisplay = document.getElementById('project-settings');
    console.log('toggleProjectSettings: ' + state);
    if (state === 'show') {
      projectSettingsDisplay.classList.add('show');
      projectSettingsDisplay.classList.add('enable');
    } else if (state === 'hide') {
      projectSettingsDisplay.classList.remove('show');
      projectSettingsDisplay.classList.remove('enable');
    }
  };

  const showNewProjectWindow = () => {
    setProjectSettingsWindowState('new');
    toggleProjectSettings('show');
    const projectTitle = document.getElementById('project-settings-input-title');
    const projectDesc = document.getElementById('project-settings-input-desc');
    const projectColor = document.getElementById('project-settings-input-color');
    const tempColorR = uti().generateRandNum(0, 255);
    const tempColorG = uti().generateRandNum(0, 255);
    const tempColorB = uti().generateRandNum(0, 255);
    const tempColor = `rgb(${tempColorR}, ${tempColorG}, ${tempColorB})`;
    projectTitle.value = 'New Project Title';
    projectDesc.value = 'New Project Description';
    projectColor.value = uti().convertRGBToHex(tempColor);
  };

  const showEditProjectWindow = (index) => {
    console.log('editProjectSettings()');
    setProjectSettingsWindowState('edit');
    const projects = getProjectsInterface().getProjects().getProjectsList();
    const color = projects[index].getColor();
    const projectTitle = document.getElementById('project-settings-input-title');
    const projectDesc = document.getElementById('project-settings-input-desc');
    const projectColor = document.getElementById('project-settings-input-color');
    setCurrentProjectSettings(index);
    projectTitle.value = projects[index].getTitle();
    projectDesc.value = projects[index].getDescription();
    if (Array.isArray(color)) {
      projectColor.value = uti().convertRGBToHex(projects[index].getColor()[0]);
    } else {
      projectColor.value = uti().convertRGBToHex(projects[index].getColor());
    }
    toggleProjectSettings('show');
  };

  const saveProjectSettings = () => {
    const state = getProjectSettingsWindowState();
    const projectsDisplay = document.getElementById('mobile-projects-display');
    const currentProject = getProjectsInterface().getProjects().getProjectsList()[getCurrentProjectSettings()];
    const projectTitle = document.getElementById('project-settings-input-title');
    const projectDesc = document.getElementById('project-settings-input-desc');
    const projectColor = document.getElementById('project-settings-input-color');
    let statusMessage;
    if (state === 'new') {
      const newProject = Project(
        projectTitle.value,
        projectDesc.value,
        uti().convertHexToRGB(projectColor.value),
      );
      getProjectsInterface().getProjects().addProject(newProject);
      statusMessage = `Project '${projectTitle.value}' saved.`;
    } else if (state === 'edit') {
      currentProject.setTitle(projectTitle.value);
      currentProject.setDescription(projectDesc.value);
      currentProject.setColor(uti().convertHexToRGB(projectColor.value));
      statusMessage = `Project '${currentProject.getTitle()}' saved.`;
    }
    generateProjects(projectsDisplay);
    displayTasks();
    displayStatusMessage('info', statusMessage);
    toggleProjectSettings('hide');
  };

  const cancelProjectSettings = () => {
    toggleProjectSettings('hide');
  };

  const generateMobileProjectsAllItem = (projectsDisplay) => {
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('mobile-menu-project-container');
    projectContainer.classList.add('mobile-menu-project-active');
    projectContainer.addEventListener('click', (ev) => {
      if (ev.target.classList[0] !== 'img-mobile-menu-project-edit' && ev.target.classList[0] !== 'btn-mobile-menu-project-edit' && ev.target.classList[0] !== 'btn-mobile-menu-project-new') {
        setActiveProject(-1);
        setCurrentProjectDisplayed(-1);
        displayTasks();
      }
    });

    const projectColorContainer = document.createElement('div');
    projectColorContainer.classList.add('mobile-menu-project-color-container');
    projectContainer.appendChild(projectColorContainer);

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

    const projectControlsEditButton = document.createElement('button');
    projectControlsEditButton.classList.add('btn-mobile-menu-project-new');
    projectControlsEditButton.addEventListener('click', () => {
      showNewProjectWindow();
    });
    projectControls.appendChild(projectControlsEditButton);

    const projectControlsEditButtonImage = document.createElement('img');
    projectControlsEditButtonImage.classList.add('img-mobile-menu-project-edit');
    projectControlsEditButtonImage.setAttribute('src', './assets/images/Add_button.svg');
    projectControlsEditButtonImage.setAttribute('alt', 'Edit Project');
    projectControlsEditButton.appendChild(projectControlsEditButtonImage);
    
    projectContainer.appendChild(projectControlsContainer);
    projectsDisplay.appendChild(projectContainer);
  };

  const generateProjects = () => {
    getProjectsInterface().getProjects();
    const projects = getProjectsInterface().getProjects().getProjectsList();
    const projectsDisplay = document.getElementById('mobile-projects-display');

    projectsDisplay.textContent = '';

    // Generating 'All'
    generateMobileProjectsAllItem(projectsDisplay);

    // Generating projects
    for (let i = 0; i < projects.length; i += 1) {
      const projectContainer = document.createElement('div');
      projectContainer.classList.add('mobile-menu-project-container');
      projectContainer.addEventListener('click', (ev) => {
        if (ev.target.classList[0] !== 'img-mobile-menu-project-edit' && ev.target.classList[0] !== 'btn-mobile-menu-project-edit' && ev.target.classList[0] !== 'btn-mobile-menu-project-new') {
          setActiveProject(i);
          setCurrentProjectDisplayed(i);
          displayTasks();
        }
      });

      const projectColorContainer = document.createElement('div');
      projectColorContainer.classList.add('mobile-menu-project-color-container');
      projectContainer.appendChild(projectColorContainer);

      const projectColor = document.createElement('div');
      projectColor.classList.add('mobile-menu-project-color');
      projectColorContainer.appendChild(projectColor);
      console.log('GENERATED COLOUR CHECK');
      console.log(projects[i].getColor());
      projectColor.style.background = projects[i].getColor();

      // Gradient overlay for project color. Not currently being used
/*       const projectColorOverlay = document.createElement('div');
      projectColorOverlay.classList.add('mobile-menu-project-color-overlay');
      projectColorContainer.appendChild(projectColorOverlay); */

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
      projectControlsEditButton.addEventListener('click', () => {
        showEditProjectWindow(i);
      });
      projectControls.appendChild(projectControlsEditButton);

      const projectControlsEditButtonImage = document.createElement('img');
      projectControlsEditButtonImage.classList.add('img-mobile-menu-project-edit');
      projectControlsEditButtonImage.setAttribute('src', './assets/images/edit-button.svg');
      projectControlsEditButtonImage.setAttribute('alt', 'Edit Project');
      projectControlsEditButton.appendChild(projectControlsEditButtonImage);

      projectContainer.appendChild(projectControlsContainer);
      projectsDisplay.appendChild(projectContainer);
    }
    console.log('generateProjects run:');
  };

  const toggleItemCompletedStatus = (completed, taskContainer, projectIndex, taskIndex) => {
    const task = getProjectsInterface().getProjects().getProjectsList()[projectIndex].getTasks()[taskIndex];
    console.log({ taskIndex });
    if (String(completed) === 'false') {
      task.setCompleted('true');
    } else if (String(completed) === 'true') {
      task.setCompleted('false');
    }
    displayTasks();
  };

  const generateTask = (currentIndex, projectIndex, taskIndex, taskTitle, taskDesc, taskColor, taskPriority, taskCompleted) => {
    console.log('generateTask run:');
    // Main task container
    const taskContainer = document.createElement('div');
    taskContainer.setAttribute('data-project-index', projectIndex);
    taskContainer.setAttribute('data-task-index', taskIndex);
    taskContainer.classList.add('task-container');
    taskContainer.style.backgroundColor = 'rgba(255, 255, 255)';
    taskContainer.classList.add('box-shadow-1');
    taskContainer.classList.add('show-opacity');

    taskContainer.addEventListener('click', (ev) => {
      const ignoredClasses = ['task-item-options-delete-container', 'task-item-options-confirm-icon', 'img-delete-task', 'img-confirm-delete', 'task-item-options-confirm-container', 'task-item-task-completed', 'img-task-item-task-completed', 'task-item-overlay-container', 'task-item-options-overlay-container', 'task-item-options-confirm-container'];
      // const acceptedClasses = ['task-container', 'task-item-options-overlay-container'];
      console.log(ev.target);
      if (!ignoredClasses.includes(ev.target.classList[0])) {
        setTaskSettingsWindowValues('edit', projectIndex, taskIndex);
        toggleTaskSettings('show');
        console.log('CLICK TASK');
      }
    });

    // Project/category color bar
    const taskItemProjectColor = document.createElement('div');
    taskItemProjectColor.classList.add('task-item-project-color');
    taskItemProjectColor.style.background = taskColor;
    taskContainer.appendChild(taskItemProjectColor);

    // Project/category color bar darkness overlay
    const taskItemProjectColorOverlay = document.createElement('div');
    taskItemProjectColorOverlay.classList.add('task-item-project-color-overlay');
    taskItemProjectColor.appendChild(taskItemProjectColorOverlay);

    // Task item title and description details container
    const taskItemTaskDetails = document.createElement('div');
    taskItemTaskDetails.classList.add('task-item-task-details');
    taskContainer.appendChild(taskItemTaskDetails);

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
      if (i < taskPriority && taskPriority !== 0) {
        imgTaskItemTaskPriority.setAttribute('src', './assets/images/Five-pointed_star_fill.svg');
      } else {
        imgTaskItemTaskPriority.setAttribute('src', './assets/images/Five-pointed_star.svg');
      }
      taskItemTaskPriority.appendChild(imgTaskItemTaskPriority);
    }

    // Task item completed status
    const taskItemTaskCompleted = document.createElement('div');
    taskItemTaskCompleted.classList.add('task-item-task-completed');
    taskContainer.appendChild(taskItemTaskCompleted);
    taskItemTaskCompleted.addEventListener('click', () => {
      console.log('>>> COMPLETE TASK');
      toggleItemCompletedStatus(taskCompleted, taskContainer, projectIndex, taskIndex);
    });

    // Task Item completed status image
    const imgTaskItemTaskCompleted = document.createElement('img');
    imgTaskItemTaskCompleted.classList.add('img-task-item-task-completed');
    if (String(taskCompleted) === 'false') {
      imgTaskItemTaskCompleted.setAttribute('src', './assets/images/Flat_tick_icon_completed.svg');
    } else if (String(taskCompleted) === 'true') {
      imgTaskItemTaskCompleted.setAttribute('src', './assets/images/Flat_tick_icon.svg');
    }
    taskItemTaskCompleted.appendChild(imgTaskItemTaskCompleted);

    // Task options overlay container
    const taskItemOptionsOverlayContainer = document.createElement('div');
    taskItemOptionsOverlayContainer.classList.add('task-item-options-overlay-container');
    taskItemOptionsOverlayContainer.classList.add('disable');

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
    imgDeleteTask.setAttribute('src', './assets/images/Rubbish_bin.svg');
    imgDeleteTask.setAttribute('alt', 'Delete Task');
    imgDeleteTask.addEventListener('click', () => {
      showTaskDeleteConfirmation(taskIndex, taskContainer);
      // imgDeleteTask.classList.add('animate-task-item-options-flip');
    });
    taskItemOptionsDeleteIcon.appendChild(imgDeleteTask);

    // Task options confirmation icons container
    const taskItemOptionsConfirmContainer = document.createElement('div');
    taskItemOptionsConfirmContainer.classList.add('task-item-options-confirm-container');
    // taskItemOptionsConfirmContainer.classList.add('hide-disable');
    taskItemOptionsOverlay.appendChild(taskItemOptionsConfirmContainer);

    // Task options confirm icon: No
    const taskItemOptionsConfirmIconNo = document.createElement('div');
    taskItemOptionsConfirmIconNo.classList.add('task-item-options-confirm-icon');
    taskItemOptionsConfirmContainer.appendChild(taskItemOptionsConfirmIconNo);

    // Task options confirm icon img: No
    const imgConfirmDeleteNo = document.createElement('img');
    imgConfirmDeleteNo.classList.add('img-confirm-delete');
    imgConfirmDeleteNo.setAttribute('src', './assets/images/cross.svg');
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
    imgConfirmDeleteYes.setAttribute('src', './assets/images/tick.svg');
    imgConfirmDeleteYes.setAttribute('alt', 'Confirm Delete');
    imgConfirmDeleteYes.addEventListener('click', () => {
      deleteTask(currentIndex, projectIndex, taskIndex);
    });
    taskItemOptionsConfirmIconYes.appendChild(imgConfirmDeleteYes);

    taskContainer.appendChild(taskItemOptionsOverlayContainer);
    return taskContainer;
  };

  const addTaskSwipeGesture = (el) => {
    const swipeAction = new Hammer(el);
    swipeAction.on('swipeleft', () => {
      toggleTaskOptions(el, 'hide');
    });
    swipeAction.on('swiperight', () => {
      toggleTaskOptions(el, 'show');
    });
  };

  const taskSwipeController = () => {
    const tasks = document.getElementsByClassName('task-container');
    for (let i = 0; i < tasks.length; i += 1) {
      addTaskSwipeGesture(tasks[i]);
    }
  };

  const addMobileTaskMenuSwipeGesture = (el) => {
    // const ignoredClasses = ['task-container', 'task-item-options-overlay-container', 'task-item-options-delete-container', 'task-item-task-completed', 'project-settings-wrapper', 'project-settings-container', 'task-settings-wrapper', 'task-settings-main-container'];
    const acceptedClasses = ['task-topbar-container', 'tasks-container', 'mobile-projects-display-container'];
    const swipeAction = new Hammer(el);
    swipeAction.on('swipeleft', (ev) => {
      const elementClass = ev.target.classList[0];
      if (acceptedClasses.includes(elementClass)) {
        toggleMobileMenu('hide');
      }
    });
    swipeAction.on('swiperight', (ev) => {
      const elementClass = ev.target.classList[0];
      if (acceptedClasses.includes(elementClass)) {
        toggleMobileMenu('show');
      }
    });
  };

  const mobileMenuSwipeController = () => {
    const tasksDisplay = document.getElementsByClassName('window-wrapper');
    addMobileTaskMenuSwipeGesture(tasksDisplay[0]);
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
          const priority = tasks[j].getPriority();
          const completed = tasks[j].getCompleted();
          taskDisplay.appendChild(generateTask(currentIndex, i, j, title, desc, color, priority, completed));
          currentIndex += 1;
        }
      }
    } else {
      const tasks = projectsList[currentProjectDisplayed].getTasks();
      for (let j = 0; j < tasks.length; j += 1) {
        const title = tasks[j].getTitle();
        const desc = tasks[j].getDescription();
        const color = projectsList[currentProjectDisplayed].getColor();
        const priority = tasks[j].getPriority();
        const completed = tasks[j].getCompleted();
        taskDisplay.appendChild(generateTask(currentIndex, currentProjectDisplayed, j, title, desc, color, priority, completed));
        currentIndex += 1;
      }
    }
    taskSwipeController();
  };

  const getTaskFromSettings = () => {
    const tempTask = {};
    const tempChecklist = [];
    const checklistContainer = document.getElementById('task-checklist-display');
    tempTask.project = document.getElementById('settings-input-project').value;
    tempTask.title = document.getElementById('settings-input-title').value;
    tempTask.desc = document.getElementById('settings-input-desc').value;
    tempTask.dueDate = document.getElementById('settings-input-date-due').value;
    tempTask.priority = document.getElementById('settings-input-priority').value;
    tempTask.notes = document.getElementById('settings-input-notes').value;
    for (let i = 0; i < checklistContainer.childElementCount; i += 1) {
      const checklistTitle = checklistContainer.children[i].getElementsByClassName('task-settings-checklist-item')[0].textContent;
      const checklistCompleted = String(checklistContainer.children[i].getElementsByClassName('input-task-settings-checklist-checkbox')[0].checked);
      tempChecklist.push({ checklistTitle, checklistCompleted });
    }
    tempTask.checklist = tempChecklist;
    return tempTask;
  };

  const setTaskFromSettings = () => {
    const tempTask = getTaskFromSettings();
    const projects = getProjectsInterface().getProjects();
    let statusMessage;
    if (getTaskSettingsWindowState() === 'new') {
      const newTask = Task(
        tempTask.title,
        tempTask.desc,
        tempTask.dueDate,
        tempTask.priority,
        tempTask.notes,
        tempTask.checklist,
        false,
      );
      projects.getProjectsList()[tempTask.project].addTask(newTask);
      statusMessage = `'${tempTask.title}' has been added to Tasks.`;
      displayStatusMessage('info', statusMessage);
    } else if (getTaskSettingsWindowState() === 'edit') {
      console.log('getTaskSettingsInitialProject');
      const project = projects.getProjectsList()[tempTask.project];
      const initialProject = projects.getProjectsList()[getTaskSettingsInitialProject()];
      getCurrentTask().setTitle(tempTask.title);
      getCurrentTask().setDescription(tempTask.desc);
      getCurrentTask().setDueDate(tempTask.dueDate);
      getCurrentTask().setPriority(tempTask.priority);
      getCurrentTask().setNotes(tempTask.notes);
      getCurrentTask().setChecklist(tempTask.checklist);
      if (getTaskSettingsInitialProject() !== Number(tempTask.project)) {
        const taskIndex = projects.getProjectsList()[getTaskSettingsInitialProject()].getTasks().indexOf(getCurrentTask());
        initialProject.removeTask(taskIndex);
        project.addTask(getCurrentTask());
      }
      statusMessage = `'${getCurrentTask().getTitle()}' has been saved.`;
      displayStatusMessage('info', statusMessage);
    }
    toggleTaskSettings('hide');
    displayTasks();
  };

  const setTaskSettingsWindowValues = (state, projectIndex, taskIndex) => {
    // States are 'new' and 'edit'
    const projectsList = getProjectsInterface().getProjects().getProjectsList();
    const projectsSelectInput = document.getElementById('settings-input-project');
    const windowHeader = document.getElementById('task-settings-header');
    const taskTitle = document.getElementById('settings-input-title');
    const taskDesc = document.getElementById('settings-input-desc');
    const taskDueDate = document.getElementById('settings-input-date-due');
    const taskPriority = document.getElementById('settings-input-priority');
    const taskNotes = document.getElementById('settings-input-notes');
    const checkListContainer = document.getElementById('task-checklist-display');
    const btnSubmitTask = document.getElementById('settings-submit-new-task');
    const today = new Date();
    const currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    // Set Projects Select Input
    projectsSelectInput.textContent = '';
    console.log('-------------------------------------');
    console.log(projectsList);
    console.log(projectsList.length);
    for (let i = 0; i < projectsList.length; i += 1) {
      console.log('Project index: ' + i);
      console.log(projectsList[i].getTitle());
      const optionTag = document.createElement('option');
      optionTag.setAttribute('value', i);
      optionTag.textContent = projectsList[i].getTitle();
      projectsSelectInput.appendChild(optionTag);
      console.log(optionTag);
    }
    if (state === 'new') {
      setTaskSettingsWindowState('new');
      windowHeader.textContent = 'New Task';
      taskTitle.value = '';
      taskDesc.value = '';
      taskDueDate.value = currentDate;
      taskPriority.selectedIndex = '0';
      taskNotes.value = '';
      checkListContainer.textContent = '';
      btnSubmitTask.textContent = 'Add Task';
    } else if (state === 'edit') {
      const currentTask = projectsList[projectIndex].getTasks()[taskIndex];
      setTaskSettingsInitialProject(projectIndex);
      setTaskSettingsWindowState('edit');
      setCurrentTask(currentTask);
      projectsSelectInput.selectedIndex = projectIndex;
      windowHeader.textContent = 'Edit Task';
      taskTitle.value = currentTask.getTitle();
      taskDesc.value = currentTask.getDescription();
      taskDueDate.value = currentTask.getDueDate();
      taskPriority.selectedIndex = currentTask.getPriority();
      taskNotes.value = currentTask.getNotes();
      checkListContainer.textContent = '';
      btnSubmitTask.textContent = 'Save Task';
      getCheckListController().populateCheckList(currentTask);
    }
    // Date
    // const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  };

  const toggleTaskSettings = (state) => {
    const taskSettingsWrapper = document.getElementById('task-settings-main-wrapper');
    const taskSettingsMainContainer = document.getElementById('task-settings-display');
    const overlayAddTaskContainer = document.getElementsByClassName('overlay-add-task-container');
    if (state === 'show') {
      shiftMobileMenuBar('hide');
      taskSettingsWrapper.classList.add('show-opacity');
      taskSettingsWrapper.classList.add('enable');
      taskSettingsMainContainer.classList.add('task-settings-show');
      taskSettingsMainContainer.classList.add('show');
      overlayAddTaskContainer[0].classList.remove('show');
    } else if (state === 'hide') {
      shiftMobileMenuBar('show');
      taskSettingsMainContainer.classList.remove('task-settings-show');
      overlayAddTaskContainer[0].classList.add('show');
      setTimeout(() => {
        taskSettingsWrapper.classList.remove('show-opacity');
      }, 400);
      setTimeout(() => {
        taskSettingsMainContainer.classList.remove('show');
        taskSettingsWrapper.classList.remove('enable');
      }, 1000);
    }
  };

  const toggleTaskOptions = (el, state) => {
    const overlayContainer = el.getElementsByClassName('task-item-options-overlay-container');
    const overlay = el.getElementsByClassName('task-item-options-overlay');
    if (state === 'show') {
      overlayContainer[0].classList.remove('disable');
      overlayContainer[0].classList.add('animate-background-opacity');
      overlay[0].classList.add('animate-task-item-options-overlay');
    } else if (state === 'hide') {
      overlayContainer[0].classList.add('disable');
      overlayContainer[0].classList.remove('animate-background-opacity');
      overlay[0].classList.remove('animate-task-item-options-overlay');
    }
  };

  const toggleMobileMenu = (state) => {
    console.log('showMobileMenu():');
    const taskMobileMenu = document.getElementById('task-mobile-menu');
    const taskMobileOverlay = document.getElementsByClassName('task-mobile-overlay');
    const imgTaskMobileMenuArrow = document.getElementById('mobile-menu-arrow');

    if (state === 'show') {
      taskMobileMenu.classList.add('mobile-menu-show');
      taskMobileOverlay[0].classList.add('show-opacity');
      imgTaskMobileMenuArrow.style.transform = 'rotate(90deg)';
    } else if (state === 'hide') {
      taskMobileMenu.classList.remove('mobile-menu-show');
      taskMobileOverlay[0].classList.remove('show-opacity');
      imgTaskMobileMenuArrow.style.transform = 'rotate(-90deg)';
    } else if (state === 'toggle') {
      taskMobileMenu.classList.toggle('mobile-menu-show');
      taskMobileOverlay[0].classList.toggle('show-opacity');
    }
  };

  const shiftMobileMenuBar = (state) => {
    const taskMobileMenu = document.getElementById('task-mobile-menu');
    const taskMobileOverlay = document.getElementsByClassName('task-mobile-overlay');
    if (state === 'hide') {
      // taskMobileMenu.style.transform = 'translateX(calc(-100% - 20px))';
      taskMobileMenu.classList.add('mobile-menu-shift');
    } else if (state === 'show') {
      taskMobileMenu.classList.remove('mobile-menu-shift');
    }
  };

  const createEvents = () => {
    console.log('createEvents() run:');
    const taskMobileMenuArrow = document.getElementsByClassName('task-mobile-menu-arrow');
    // Submit new task from task window
    const createNewTaskSubmit = document.getElementById('settings-submit-new-task');
    createNewTaskSubmit.addEventListener('click', () => {
      const taskTitle = document.getElementById('settings-input-title');
      if (taskTitle.value) {
        setTaskFromSettings();
      }
    });
    // Button to show new task window (Circle with +, bottom right corner)
    const newTaskButton = document.getElementById('add-new-task');
    newTaskButton.addEventListener('click', () => { 
      setTaskSettingsWindowValues('new');
      toggleTaskSettings('show');
    });
    // Long button on side of mobile menu
    taskMobileMenuArrow[0].addEventListener('click', () => {
      toggleMobileMenu('toggle');
    });
    // TEMPORARY PLACEMENT: CHECKLIST + PLUS BUTTON
    const btnCreateNewChecklistItem = document.getElementById('add-task-checklist-item');
    btnCreateNewChecklistItem.addEventListener('click', () => {
      console.log('addCheckListItem()');
      getCheckListController().addCheckListItemElement();
    });

    // Submit new/edit project
    const btnProjectSettingsSubmit = document.getElementById('settings-submit-new-project');
    btnProjectSettingsSubmit.addEventListener('click', () => {
      saveProjectSettings();
    });

    const btnProjectSettingsCancel = document.getElementById('settings-cancel-new-project');
    btnProjectSettingsCancel.addEventListener('click', () => {
      cancelProjectSettings();
    });

    // Set mobile swipe events
    mobileMenuSwipeController();
  };

  const init = () => {
    createEvents();
    generateProjects();
  };

  init();

  return Object.freeze({
    displayTasks,
  });
};

export default DOMController;
