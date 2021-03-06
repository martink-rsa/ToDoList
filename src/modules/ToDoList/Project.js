/* eslint-disable no-underscore-dangle */

const Project = (title, description, color) => {
  const _type = 'Project';

  let _title = title;
  let _description = description;
  let _color = color;
  let _tasks = [];

  /* Getters/Setters */
  const getType = () => _type;

  const getTitle = () => _title;
  const setTitle = (newTitle) => { _title = newTitle; };
  const getDescription = () => _description;
  const setDescription = (newDescription) => { _description = newDescription; };

  const getColor = () => _color;
  const setColor = (newColor) => { _color = newColor; };

  const getTasks = () => _tasks;
  const setTasks = (newTasks) => { _tasks = newTasks; };

  /* Private */
  const removeFromArray = function removeFromArray(arrayIn, index) {
    const tempArray = arrayIn;
    return tempArray.filter((item, i) => {
      if (i !== Number(index)) {
        return item;
      }
    });
  };

  /* Public */
  const addTask = (task) => {
    const tasks = getTasks();
    // if (task.getType() === 'Task') {
    tasks.push(task);
    // } else {
    // throw new Error('Not a Task object being passed.');
    // }
    setTasks(tasks);
  };

  const removeTask = (index) => {
    let tasks = getTasks();
    tasks = removeFromArray(tasks, index);
    setTasks(tasks);
  };

  return Object.freeze({
    getType,
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getColor,
    setColor,
    getTasks,
    setTasks,
    addTask,
    removeTask,
  });
};

export default Project;
