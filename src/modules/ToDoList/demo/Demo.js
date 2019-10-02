// Demo file for populating the application with demo data
// Data is imported from the XML file 'demoInput.xml'
// Population data will be returned as a Project object
// Add this Project object to the Projects object using
//    the relevant Setter

import Task from '../Task';
import Project from '../Project';
import DemoData from './demoInput.xml';

const Demo = () => {
  const populateTasks = () => {
    console.log('Demo: populateTasks()');
    const newProject = Project('Test Project 1', 'Due on Monday');
    for (let i = 0; i < DemoData.tasks.task.length; i += 1) {
      const demo = DemoData.tasks.task[i];
      const task = Task(
        demo.title,
        demo.description,
        demo.duedate,
        demo.priority,
        demo.notes,
        demo.checklist,
        demo.completed,
      );
      newProject.addTask(task);
    }
    return newProject;
  };

  return {
    populateTasks,
  };
};

export default Demo;
