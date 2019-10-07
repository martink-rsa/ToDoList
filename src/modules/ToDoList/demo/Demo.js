// Demo file for populating the application with demo data
// Data is imported from the XML file 'demoInput.xml'
// Population data will be returned as a Project object
// Add this Project object to the Projects object using
//    the relevant Setter

import Task from '../Task';
import Project from '../Project';
import DemoData from './demoInput.xml';

const Demo = () => {
  const populateTasks = (projects) => {
    // Populating projects
    for (let i = 0; i < DemoData.demo.projects[0].project.length; i += 1) {
      const demoProject = DemoData.demo.projects[0].project[i];
      const project = Project(
        demoProject.title,
        demoProject.description,
        demoProject.color,
      );
      projects.addProject(project);
    }
    // Populating tasks
    for (let i = 0; i < DemoData.demo.tasks[0].task.length; i += 1) {
      const demo = DemoData.demo.tasks[0].task[i];
      const currentProject = projects.getProjectsList()[demo.projectindex];
      const task = Task(
        demo.title,
        demo.description,
        demo.duedate,
        demo.priority,
        demo.notes,
        demo.checklist,
        demo.completed,
      );
      currentProject.addTask(task);
    }
  };

  return {
    populateTasks,
  };
};

export default Demo;
