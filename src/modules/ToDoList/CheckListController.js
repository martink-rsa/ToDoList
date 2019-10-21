const CheckListController = () => {

  const clearCheckList = () => {
    const checkListContainer = document.getElementById('task-checklist-display');
    checkListContainer.textContent = '';
  };

  const populateCheckList = (task) => {
    clearCheckList();
    for (let i = 0; i < task.getChecklist().length; i += 1) {
      const itemTitle = task.getChecklist()[i].checklistTitle;
      const itemCompleted = task.getChecklist()[i].checklistCompleted;
      addCheckListItemElement(itemTitle, itemCompleted);
    }
  };

  const addCheckListItemElement = (itemTitle = 'New Sub-Task', itemCompleted = 'false') => {
    
    const checkListContainer = document.getElementById('task-checklist-display');

    const checkListItemContainer = document.createElement('div');
    checkListItemContainer.classList.add('task-settings-checklist-item-container');

    const checkListItemCheckboxContainer = document.createElement('div');
    checkListItemCheckboxContainer.classList.add('task-settings-checklist-item-checkbox-container');
    checkListItemContainer.appendChild(checkListItemCheckboxContainer);

    const checkListItemCheckboxInput = document.createElement('input');
    checkListItemCheckboxInput.classList.add('input-task-settings-checklist-checkbox');
    checkListItemCheckboxInput.setAttribute('type', 'checkbox');
    if (itemCompleted === 'true') {
      checkListItemCheckboxInput.checked = true;
    } else if (itemCompleted === 'false') {
      checkListItemCheckboxInput.checked = false;
    }
    checkListItemCheckboxContainer.appendChild(checkListItemCheckboxInput);

    const checkListItem = document.createElement('div');
    checkListItem.classList.add('task-settings-checklist-item');
    checkListItem.textContent = itemTitle;
    checkListItemContainer.appendChild(checkListItem);

    const checkListItemIcon = document.createElement('div');
    checkListItemIcon.classList.add('task-settings-checklist-item-icon');
    checkListItemContainer.appendChild(checkListItemIcon);

    const btnCheckListItemIcon = document.createElement('button');
    btnCheckListItemIcon.setAttribute('type', 'button');
    btnCheckListItemIcon.classList.add('btn');
    btnCheckListItemIcon.classList.add('btn-task-checklist');
    btnCheckListItemIcon.addEventListener('click', (ev) => {
      // removeCheckListItem(task, checklistIndex);
      checkListContainer.removeChild(checkListItemContainer);
    });
    checkListItemIcon.appendChild(btnCheckListItemIcon);

    const imgCheckListItemIconDelete = document.createElement('img');
    imgCheckListItemIconDelete.setAttribute('src', './assets/images/Rubbish_bin.svg');
    imgCheckListItemIconDelete.classList.add('img-checklist-icon-delete');
    btnCheckListItemIcon.appendChild(imgCheckListItemIconDelete);

    checkListContainer.appendChild(checkListItemContainer);
  };

  return {
    addCheckListItemElement,
    populateCheckList,
  };
};

export default CheckListController;
