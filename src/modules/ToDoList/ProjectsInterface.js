/* eslint-disable no-underscore-dangle */

const ProjectsInterface = (projectsIn) => {
  let _projects = projectsIn;

  /* Getters/Setters */
  const getProjects = () => _projects;

  const clearProjects = function clearProjects() {
    _projects.setProjectsList([]);
  };

  const deleteTask = (projectIndex, taskIndex) => {
    const projectsList = getProjects().getProjectsList();
    projectsList[projectIndex].removeTask(taskIndex);
  };

  return {
    clearProjects,
    getProjects,
    deleteTask,
  }
};

export default ProjectsInterface;
