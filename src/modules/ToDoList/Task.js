/* eslint-disable no-underscore-dangle */

const Task = (title, description, dueDate, priority, notes, checklist, completed) => {
  const _type = 'Task';
  let _title = title;
  let _description = description;
  let _createDate = '20191001';
  let _dueDate = dueDate;
  let _priority = priority;
  let _notes = notes;
  let _checklist = checklist;
  let _completed = completed;

  /* Getters/Setters */
  const getType = () => _type;

  const getTitle = () => _title;
  const setTitle = (newTitle) => { _title = newTitle; };

  const getDescription = () => _description;
  const setDescription = (newDescription) => { _description = newDescription; };

  const getCreateDate = () => _createDate;
  const setCreateDate = () => { _createDate = '20191001'; };

  const getDueDate = () => _dueDate;
  const setDueDate = (newDueDate) => { _dueDate = newDueDate; };

  const getPriority = () => _priority;
  const setPriority = (newPriority) => { _priority = newPriority; };

  const getNotes = () => _notes;
  const setNotes = (newNotes) => { _notes = newNotes; };

  const getChecklist = () => _checklist;
  const setChecklist = (newChecklist) => { _checklist = newChecklist; };
  const addChecklistItem = (checklistObject) => {
    getChecklist().push(checklistObject);
  };

  const getCompleted = () => _completed;
  const setCompleted = (newCompleted) => { _completed = newCompleted; };

  /* Private functions */

  /* Public Functions */
  return Object.freeze({
    getType,
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getCreateDate,
    setCreateDate,
    getDueDate,
    setDueDate,
    getPriority,
    setPriority,
    getNotes,
    setNotes,
    getChecklist,
    setChecklist,
    addChecklistItem,
    getCompleted,
    setCompleted,
  });
};

export default Task;
