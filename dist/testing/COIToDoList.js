import projectInterface from './COIProject';

/*  const projectInterface = (state) => ({
  type: 'projectInterface',
  add: () => state.add(state),
  show: () => state.show(state),
});  */

const addTask = (state) => ({
  add: (item) => {
    state.tasks.push(item);
  },
});

const showTasks = (state) => ({
  show: () => {
  },
});

const project = (title, desc) => {
  const proto = {
    title,
    desc,
    tasks: [],
  };
  const basics = projectInterface(proto);
  const composite = Object.assign({}, basics);
  return Object.assign(Object.create(composite), addTask(proto), showTasks(proto));
};

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

const ToDoList1 = () => {
  const newProject = project('Main', 'School projects');
  const newTask = task('Study', 'Finish chapter 4');
  const output = taskOutput(newTask);
  newProject.add(newTask);
  newProject.show();
};

export default ToDoList1;
