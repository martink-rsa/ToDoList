/* eslint-disable no-underscore-dangle */
import * as Hammer from 'hammerjs';
import Task from './Task';
import Utility from './Utility';
import Project from './Project';
import CheckListController from './CheckListController';
import Demo from './demo/Demo';

window.Hammer = Hammer.default;

const DOMController = (projectsInterfaceIn) => {
  /* Private */
  const _taskDisplayEl = document.getElementById('display-task-items');
  const _projectsInterface = projectsInterfaceIn;
  const _checkListController = CheckListController();
  const _demo = Demo();
  const _uti = Utility();

  let _currentProjectDisplayed = -1;
  let _currentProjectSettings = -1;
  let _projectSettingsWindowState = '';
  let _currentTask = -1;
  let _taskSettingsWindowState = '';
  let _taskSettingsInitialProject = -1;

  /* Public */
  const getTaskDisplay = () => _taskDisplayEl;
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
  };

  const demo = () => _demo;

  const uti = () => _uti;

  const setDisplayMode = function setDisplayMode(state) {
    if (state === 'day') {
      document.documentElement.style.setProperty('--color-container-1-transparent', 'rgba(248, 248, 248, 0.8)');
      document.documentElement.style.setProperty('--color-container-1', 'rgb(252, 252, 252)');
      document.documentElement.style.setProperty('--color-container-2', 'rgb(255, 255, 255)');
      document.documentElement.style.setProperty('--color-border-controls-1', 'rgba(0, 0, 0, 0.123)');
      document.documentElement.style.setProperty('--color-border-controls-2', 'rgba(0, 0, 0, 0.123)');
      document.documentElement.style.setProperty('--font-color-main', 'rgb(34, 34, 34)');
      document.documentElement.style.setProperty('--font-color-lighten', 'rgba(34, 34, 34, 0.596)');
      document.documentElement.style.setProperty('--bg-1-filters', 'grayscale(80%) brightness(80%)');

    } else if (state === 'night') {
      document.documentElement.style.setProperty('--color-container-1-transparent', 'rgba(34, 34, 34, .8)');
      document.documentElement.style.setProperty('--color-container-1', 'rgb(34, 34, 34)');
      document.documentElement.style.setProperty('--color-container-2', 'rgb(60, 60, 60)');
      document.documentElement.style.setProperty('--color-border-controls-1', 'rgb(222, 222, 222, 0.1)');
      document.documentElement.style.setProperty('--color-border-controls-2', 'rgba(0, 0, 0, 0.123)');
      document.documentElement.style.setProperty('--font-color-main', 'rgb(222, 222, 222)');
      document.documentElement.style.setProperty('--font-color-lighten', 'rgb(222, 222, 222, 0.596)');
      document.documentElement.style.setProperty('--bg-1-filters', 'grayscale(80%) brightness(10%)');

    }
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

  const toggleTodoSettingsWindow = function toggleTodoSettingsWindow(state) {
    const todoSettingsWrapper = document.getElementById('todo-settings-window');
    const todoSettingsMainContainer = document.getElementById('todo-settings-main-container');
    if (state === 'show') {
      shiftMobileMenuBar('hide');
      todoSettingsWrapper.classList.add('show-opacity');
      todoSettingsWrapper.classList.add('enable');
      todoSettingsMainContainer.classList.add('settings-show');
      todoSettingsMainContainer.classList.add('show');
    } else if (state === 'hide') {
      shiftMobileMenuBar('show');
      todoSettingsMainContainer.classList.remove('settings-show');
      setTimeout(() => {
        todoSettingsWrapper.classList.remove('show-opacity');
      }, 400);
      setTimeout(() => {
        todoSettingsMainContainer.classList.remove('show');
        todoSettingsWrapper.classList.remove('enable');
      }, 1000);
    }
  };

  const showTaskDeleteConfirmation = (index, task) => {
    const taskOptionsOverlay = task.getElementsByClassName('task-item-options-overlay');
    const taskOptionsConfirm = task.getElementsByClassName('task-item-options-confirm-container');
    taskOptionsOverlay[0].classList.add('animate-task-item-options-flip');
    taskOptionsConfirm[0].classList.add('animate-task-item-options-flip');
    // Container disablers for click events
  };

  const hideTaskDeleteConfirmation = (index, task) => {
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
    if (state === 'show') {
      projectSettingsDisplay.classList.add('show');
      projectSettingsDisplay.classList.add('enable');
    } else if (state === 'hide') {
      projectSettingsDisplay.classList.remove('show');
      projectSettingsDisplay.classList.remove('enable');
    }
  };

  const showNewProjectWindow = () => {
    const windowTitle = document.getElementsByClassName('project-settings-window-title-container');
    const projectTitle = document.getElementById('project-settings-input-title');
    const projectDesc = document.getElementById('project-settings-input-desc');
    const projectColor = document.getElementById('project-settings-input-color');
    const tempColorR = uti().generateRandNum(0, 255);
    const tempColorG = uti().generateRandNum(0, 255);
    const tempColorB = uti().generateRandNum(0, 255);
    const tempColor = `rgb(${tempColorR}, ${tempColorG}, ${tempColorB})`;
    setProjectSettingsWindowState('new');
    windowTitle[0].textContent = 'New Project';
    projectTitle.value = 'New Project Title';
    projectDesc.value = 'New Project Description';
    projectColor.value = uti().convertRGBToHex(tempColor);
    toggleProjectSettings('show');
  };

  const showEditProjectWindow = (index) => {
    const projects = getProjectsInterface().getProjects().getProjectsList();
    const color = projects[index].getColor();
    const windowTitle = document.getElementsByClassName('project-settings-window-title-container');
    const projectTitle = document.getElementById('project-settings-input-title');
    const projectDesc = document.getElementById('project-settings-input-desc');
    const projectColor = document.getElementById('project-settings-input-color');
    setProjectSettingsWindowState('edit');
    setCurrentProjectSettings(index);
    windowTitle[0].textContent = 'Edit Project';
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
    generateProjects();
    displayTasks();
    displayStatusMessage('info', statusMessage);
    toggleProjectSettings('hide');
  };

  const cancelProjectSettings = function cancelProjectSettings() {
    toggleProjectSettings('hide');
  };

  const getNumTasks = (projectIndex) => {
    const projects = getProjectsInterface().getProjects().getProjectsList();
    let totalTasks = 0;
    if (projectIndex === 'all') {
      for (let i = 0; i < projects.length; i += 1) {
        totalTasks += projects[i].getTasks().length;
      }
      return totalTasks;
    }
    return projects[projectIndex].getTasks().length;
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

    const projectTitleNumTasks = document.createElement('div');
    projectTitleNumTasks.textContent = `(${getNumTasks('all')})`;
    projectTitleNumTasks.classList.add('mobile-menu-project-title-num-tasks');
    projectTitleContainer.appendChild(projectTitleNumTasks);

    // Project description which was removed as it
    //    did not look good at the time.
    // The related CSS is set to display:none
    /*
    const projectDescContainer = document.createElement('div');
    projectDescContainer.classList.add('mobile-menu-project-desc-container');

    const projectDesc = document.createElement('div');
    projectDesc.textContent = '';
    projectDesc.classList.add('mobile-menu-project-desc');
    projectDescContainer.appendChild(projectDesc);
    projectTextContainer.appendChild(projectDescContainer);
    */

    projectTextContainer.appendChild(projectTitleContainer);
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
      projectColor.style.background = projects[i].getColor();

      // Gradient overlay for project color. Not currently being used
      /* const projectColorOverlay = document.createElement('div');
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

      const projectTitleNumTasks = document.createElement('div');
      projectTitleNumTasks.textContent = `(${getNumTasks(i)})`;
      projectTitleNumTasks.classList.add('mobile-menu-project-title-num-tasks');
      projectTitleContainer.appendChild(projectTitleNumTasks);

      projectTextContainer.appendChild(projectTitleContainer);


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
  };

  const toggleItemCompletedStatus = (completed, taskContainer, projectIndex, taskIndex) => {
    const task = getProjectsInterface().getProjects().getProjectsList()[projectIndex].getTasks()[taskIndex];
    if (String(completed) === 'false') {
      displayStatusMessage('info', `Task '${task.getTitle()}' has been completed.`);
      task.setCompleted('true');
    } else if (String(completed) === 'true') {
      displayStatusMessage('info', `Task '${task.getTitle()}' has been set to incomplete.`);
      task.setCompleted('false');
    }
    displayTasks();
  };

  const generateTask = (currentIndex, projectIndex, taskIndex, taskTitle, taskDesc, taskColor, taskPriority, taskCompleted) => {
    // Main task container
    const taskContainer = document.createElement('div');
    taskContainer.setAttribute('data-project-index', projectIndex);
    taskContainer.setAttribute('data-task-index', taskIndex);
    taskContainer.classList.add('task-container');
    taskContainer.classList.add('box-shadow-2');
    taskContainer.classList.add('show-opacity');

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

    // Task SVG Animation Overlay container
    const taskItemOptionsSVGOverlayContainer = document.createElement('div');
    taskItemOptionsSVGOverlayContainer.classList.add('task-item-options-svg-overlay-container');
    taskItemOptionsOverlay.appendChild(taskItemOptionsSVGOverlayContainer);

    // Task SVG Animation Overlay
    const taskItemOptionsSVGOverlay = document.createElement('div');
    taskItemOptionsSVGOverlay.classList.add('task-item-options-svg-overlay');
    taskItemOptionsSVGOverlay.style.backgroundColor = 'var(--color-container-2)';
    taskItemOptionsSVGOverlay.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg stroke-width='0.5' stroke='rgb(50, 50, 50)' fill='${taskColor}' fill-opacity='0.2'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E")`;
    taskItemOptionsSVGOverlayContainer.appendChild(taskItemOptionsSVGOverlay);

    // Task options delete container
    const taskItemOptionsDeleteContainer = document.createElement('div');
    taskItemOptionsDeleteContainer.classList.add('task-item-options-delete-container');
    taskItemOptionsOverlay.appendChild(taskItemOptionsDeleteContainer);

    // Task options circle underlay
    const taskItemOptionsDeleteCircleUnderlay = document.createElement('div');
    taskItemOptionsDeleteCircleUnderlay.classList.add('task-item-options-delete-circle-underlay');
    taskItemOptionsDeleteContainer.appendChild(taskItemOptionsDeleteCircleUnderlay);

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

    // Task options confirm button: No
    const btnTaskItemOptionsConfirmNo = document.createElement('button');
    btnTaskItemOptionsConfirmNo.classList.add('btn');
    btnTaskItemOptionsConfirmNo.classList.add('btn-task-confirm');
    btnTaskItemOptionsConfirmNo.addEventListener('click', () => {
      hideTaskDeleteConfirmation(taskIndex, taskContainer);
    });
    taskItemOptionsConfirmIconNo.appendChild(btnTaskItemOptionsConfirmNo);

    // Task options confirm icon img: No
    const imgConfirmDeleteNo = document.createElement('img');
    imgConfirmDeleteNo.classList.add('img-confirm-delete');
    imgConfirmDeleteNo.setAttribute('src', './assets/images/cross.svg');
    imgConfirmDeleteNo.setAttribute('alt', 'Cancel Delete');
    btnTaskItemOptionsConfirmNo.appendChild(imgConfirmDeleteNo);

    // Task options confirm icon: Yes
    const taskItemOptionsConfirmIconYes = document.createElement('div');
    taskItemOptionsConfirmIconYes.classList.add('task-item-options-confirm-icon');
    taskItemOptionsConfirmContainer.appendChild(taskItemOptionsConfirmIconYes);

    // Task options confirm button: Yes
    const btnTaskItemOptionsConfirmYes = document.createElement('button');
    btnTaskItemOptionsConfirmYes.classList.add('btn');
    btnTaskItemOptionsConfirmYes.classList.add('btn-task-confirm');
    btnTaskItemOptionsConfirmYes.addEventListener('click', () => {
      deleteTask(currentIndex, projectIndex, taskIndex);
    });
    taskItemOptionsConfirmIconYes.appendChild(btnTaskItemOptionsConfirmYes);

    // Task options confirm icon img: Yes
    const imgConfirmDeleteYes = document.createElement('img');
    imgConfirmDeleteYes.classList.add('img-confirm-delete');
    imgConfirmDeleteYes.setAttribute('src', './assets/images/tick2.svg');
    imgConfirmDeleteYes.setAttribute('alt', 'Confirm Delete');
    btnTaskItemOptionsConfirmYes.appendChild(imgConfirmDeleteYes);

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
    swipeAction.on('tap press', (ev) => {
      if (ev.target.classList[0] === 'task-container') {
        setTaskSettingsWindowValues('edit', ev.target.getAttribute('data-project-index'), ev.target.getAttribute('data-task-index'));
        toggleTaskSettings('show');
      }
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
    setLocalStorage();
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
      statusMessage = `Task '${getCurrentTask().getTitle()}' has been saved.`;
      displayStatusMessage('info', statusMessage);
    }
    toggleTaskSettings('hide');
    displayTasks();
    generateProjects();
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
    for (let i = 0; i < projectsList.length; i += 1) {
      const optionTag = document.createElement('option');
      optionTag.setAttribute('value', i);
      optionTag.textContent = projectsList[i].getTitle();
      projectsSelectInput.appendChild(optionTag);
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
    if (state === 'show') {
      shiftMobileMenuBar('hide');
      taskSettingsWrapper.classList.add('show-opacity');
      taskSettingsWrapper.classList.add('enable');
      taskSettingsMainContainer.classList.add('settings-show');
      taskSettingsMainContainer.classList.add('show');
    } else if (state === 'hide') {
      shiftMobileMenuBar('show');
      taskSettingsMainContainer.classList.remove('settings-show');
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
    const taskItemOptionsSVGOverlay = el.getElementsByClassName('task-item-options-svg-overlay');
    if (state === 'show') {
      overlayContainer[0].classList.remove('disable');
      overlayContainer[0].classList.add('animate-background-opacity');
      taskItemOptionsSVGOverlay[0].classList.add('animate-task-item-options-svg-overlay');

      overlay[0].classList.add('animate-task-item-options-overlay');
    } else if (state === 'hide') {
      overlayContainer[0].classList.add('disable');
      overlayContainer[0].classList.remove('animate-background-opacity');
      overlay[0].classList.remove('animate-task-item-options-overlay');
      taskItemOptionsSVGOverlay[0].classList.remove('animate-task-item-options-svg-overlay');
    }
  };

  const toggleMobileMenu = (state) => {
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
    if (state === 'hide') {
      taskMobileMenu.classList.add('mobile-menu-shift');
    } else if (state === 'show') {
      taskMobileMenu.classList.remove('mobile-menu-shift');
    }
  };

  const createEvents = () => {
    const taskMobileMenuArrow = document.getElementsByClassName('task-mobile-menu-arrow');
    // Submit new task from task window
    const createNewTaskSubmit = document.getElementById('settings-submit-new-task');
    createNewTaskSubmit.addEventListener('click', () => {
      const taskTitle = document.getElementById('settings-input-title');
      if (taskTitle.value) {
        setTaskFromSettings();
      }
    });
    const cancelNewTaskSubmit = document.getElementById('settings-cancel-new-task');
    cancelNewTaskSubmit.addEventListener('click', () => {
      toggleTaskSettings('hide');
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

    // Task Checklist add item
    const btnCreateNewChecklistItem = document.getElementById('add-task-checklist-item');
    btnCreateNewChecklistItem.addEventListener('click', () => {
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

    const btnTodoSettingsCog = document.getElementById('open-todo-settings');
    btnTodoSettingsCog.addEventListener('click', () => {
      toggleTodoSettingsWindow('show');
    });

    const btnTodoSettingsClose = document.getElementById('todo-settings-close');
    btnTodoSettingsClose.addEventListener('click', () => {
      toggleTodoSettingsWindow('hide');
    });

    const switchNightMode = document.getElementById('set-display-mode');
    switchNightMode.checked = false;
    switchNightMode.addEventListener('click', () => {
      if (switchNightMode.checked === true) {
        setDisplayMode('night');
      } else if (switchNightMode.checked === false) {
        setDisplayMode('day');
      }
    });

    const btnResetDemo = document.getElementById('reset-demo-data');
    btnResetDemo.addEventListener('click', () => {
      getProjectsInterface().clearProjects();
      resetDemoData();
      generateProjects();
      displayTasks();
      
    });

    // Set mobile swipe events
    mobileMenuSwipeController();
  };

  const resetDemoData = () => {
    demo().populateTasks(getProjectsInterface().getProjects());
  };

  const setLocalStorage = () => {
    const projectsListIn = getProjectsInterface().getProjects().getProjectsList();
    const projects = {
      projectsList: [],
    };

    for (let i = 0; i < projectsListIn.length; i += 1) {
      const projectsObject = {
        title: projectsListIn[i].getTitle(),
        description: projectsListIn[i].getDescription(),
        color: projectsListIn[i].getColor(),
        tasks: [],
      };

      for (let j = 0; j < projectsListIn[i].getTasks().length; j += 1) {
        const tObj = projectsListIn[i].getTasks()[j];
        const taskObject = {
          title: tObj.getTitle(),
          description: tObj.getDescription(),
          createDate: tObj.getCreateDate(),
          dueDate: tObj.getDueDate(),
          priority: tObj.getPriority(),
          notes: tObj.getNotes(),
          completed: tObj.getCompleted(),
          checklist: [],
        };

        for (let k = 0; k < projectsListIn[i].getTasks()[j].getChecklist().length; k += 1) {
          const cObj = projectsListIn[i].getTasks()[j].getChecklist();
          taskObject.checklist.push(cObj[k]);
        }
        projectsObject.tasks.push(taskObject);
      }
      projects.projectsList.push(projectsObject);
    }
    localStorage.setItem('todo-projects', JSON.stringify(projects));
  };

  const loadLocalStorage = () => {
    if (localStorage.getItem('todo-projects') !== null) {
      getProjectsInterface().clearProjects();
      // Retrieve
      const loadedProjects = JSON.parse(localStorage.getItem('todo-projects'));

      const projects = getProjectsInterface().getProjects();
      for (let i = 0; i < loadedProjects.projectsList.length; i += 1) {
        const currentProject = loadedProjects.projectsList[i];

        const project = Project(
          currentProject.title,
          currentProject.description,
          currentProject.color,
        );

        for (let j = 0; j < loadedProjects.projectsList[i].tasks.length; j += 1) {
          const currentTask = loadedProjects.projectsList[i].tasks[j];
          const checklist = [];

          for (let k = 0; k < loadedProjects.projectsList[i].tasks[j].checklist.length; k += 1) {
            const currentChecklist = loadedProjects.projectsList[i].tasks[j].checklist[k];
            checklist.push(currentChecklist);
          }

          const task = Task(
            currentTask.title,
            currentTask.description,
            currentTask.duedate,
            currentTask.priority,
            currentTask.notes,
            checklist,
            currentTask.completed,
          );

          project.addTask(task);
        }
        projects.addProject(project);
      }
    }
  };

  const init = () => {
    loadLocalStorage();
    createEvents();
    generateProjects();
  };

  init();

  return Object.freeze({
    displayTasks,
  });
};

export default DOMController;
