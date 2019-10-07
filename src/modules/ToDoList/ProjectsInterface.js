/* eslint-disable no-underscore-dangle */

const ProjectsInterface = (projectsIn) => {
  const _projects = projectsIn;

  /* Getters/Setters */
  const getProjects = () => _projects;
  
  const deleteTask = (projectIndex, taskIndex) => {
    console.log('PI: DELETE TASK');
    const projectsList = getProjects().getProjectsList();
    projectsList[projectIndex].removeTask(taskIndex);
  };

  return {
    getProjects,
    deleteTask,
  }
};

export default ProjectsInterface;
