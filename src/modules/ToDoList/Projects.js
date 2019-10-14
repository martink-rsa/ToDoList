/* eslint-disable no-underscore-dangle */

const Projects = () => {
  const _type = 'Projects';
  let _projects = [];

  /* Getters/Setters */
  const getType = () => _type;
  const getProjectsList = () => _projects;
  const setProjectsList = (newProjects) => {
    _projects = newProjects;
  };

  /* Private */

  /* Public */
  const addProject = (project) => {
    const projects = getProjectsList();
    if (project.getType() === 'Project') {
      projects.push(project);
    } else {
      throw new Error('Object being passed is not a Project object.');
    }
    setProjectsList(projects);
    console.log('Project added: ' + project.getTitle());
  };

  const removeProject = (project) => {
    const projects = getProjectsList();
    // If Task is prototype type of Task
    // // If Task Exists
    // // // Delete Task
  };

  return Object.freeze({
    getType,
    getProjectsList,
    setProjectsList,
    addProject,
    removeProject,
  });
};

export default Projects;
