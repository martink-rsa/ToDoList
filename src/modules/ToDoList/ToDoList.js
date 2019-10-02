import Project from './Project';
import Task from './Task';
import DemoData from './demo/demoInput.xml';
import Demo from './demo/Demo';
import Projects from './Projects';
import DOMController from './DOMController';

const ToDoList = () => {

  // Projects container
  const projects = Projects();

  // Using Demo to populate data
  const newDemo = Demo();
  projects.addProject(newDemo.populateTasks());

  const DOM = DOMController();
  return {
  };
};

export default ToDoList;
