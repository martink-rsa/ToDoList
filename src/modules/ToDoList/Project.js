/* eslint-disable no-underscore-dangle */

const Project = (title, description) => {
  const _type = 'Project';

  let _title = title;
  let _description = description;
  let _tasks = [];

  /* Getters/Setters */
  const getType = () => _type;

  const getTitle = () => _title;
  const setTitle = (newTitle) => { _title = newTitle; };
  const getDescription = () => _description;
  const setDescription = (newDescription) => { _description = newDescription; };
  const getTasks = () => _tasks;
  const setTasks = (newTasks) => { _tasks = newTasks; };

  /* Private */

  /* Public */
  const addTask = (task) => {
    const tasks = getTasks();
    if (task.getType() === 'Task') {
      tasks.push(task);
    } else {
      throw new Error('Not a Task object being passed.');
    }
    setTasks(tasks);
  };

  const removeTask = (task) => {
    const tasks = getTasks();
    // If Task is prototype type of Task
    // // If Task Exists
    // // // Delete Task
  };


  return Object.freeze({
    getType,
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getTasks,
    setTasks,
    addTask,
    removeTask,
  });
};

export default Project;
