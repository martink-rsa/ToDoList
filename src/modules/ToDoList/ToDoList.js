const projectInterface = (state) => ({
  type: 'projectInterface',
  add: () => state.add(state),
});

const addTask = (state) => ({
  add: (item) => {
    console.log
    state.tasks.push(item);
  },
});

const task = (title, desc, createDate, dueDate, priority, notes, checklist) => {
  const proto = {
    title,
    desc,
    createDate,
    dueDate,
    priority,
    notes,
    checklist,
  };
  return Object.assign(Object.create(proto), { title, desc });
};

const project = (title, desc) => {
  const proto = {
    title,
    desc,
    tasks: [],
  };
  return Object.assign(Object.create(proto), { title, desc }, addTask(proto));
};

const taskOutput = (item) => {
  const proto = {
    HTML() {
      return `
        <h1>
          Item: ${item.title};
        </h1>`;
    },
  };
  return Object.assign(Object.create(proto), { item });
};

const ToDoList = () => {
  const newProject = project('Main', 'School projects');
  const newTask = task('Study', 'Finish chapter 4');
  const output = taskOutput(newTask);
  console.log(output.HTML());
  newProject.add(newTask);
};

export default ToDoList;
