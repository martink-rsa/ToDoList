import Project from './Project';
import Task from './Task';
import DemoData from './demo/demoInput.xml';
import Demo from './demo/Demo';
import Projects from './Projects';
import DOMController from './DOMController';
import ProjectsInterface from './ProjectsInterface';

const ToDoList = () => {

  // Projects container
  const projects = Projects();

  // Using Demo to populate data
  const newDemo = Demo();
  newDemo.populateTasks(projects);
  // projects.addProject(newDemo.populateTasks());

  const projectsInterface = ProjectsInterface(projects);

  const DOM = DOMController(projectsInterface);

  DOM.displayTasks(projects);


  return {
  };
};

export default ToDoList;
