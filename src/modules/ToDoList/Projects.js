/* eslint-disable no-underscore-dangle */

const Projects = () => {
  const _type = 'Projects';
  let _projects = [];

  /* Getters/Setters */
  const getType = () => _type;
  const getProjects = () => _projects;
  const setProjects = (newProjects) => {
    _projects = newProjects;
  };

  /* Private */

  /* Public */
  const addProject = (project) => {
    const projects = getProjects();
    if (project.getType() === 'Project') {
      projects.push(project);
    } else {
      throw new Error('Object being passed is not a Project object.');
    }
    setProjects(projects);
  };

  const removeProject = (project) => {
    const projects = getProjects();
    // If Task is prototype type of Task
    // // If Task Exists
    // // // Delete Task
  };

  return Object.freeze({
    getType,
    getProjects,
    setProjects,
    addProject,
    removeProject,
  });
};

export default Projects;
