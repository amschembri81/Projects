import { ADD_TASK, MOVE_TASK, ADD_NOTE, ASSIGN_TASK, ASSIGN_DUE_DATE } from "./actionTypes";

// Action creator for adding a new task to the store.
// It returns an action object with a type of ADD_TASK and a payload containing the task data.
export const addTask = (task) => {
  return {
    type: ADD_TASK, // The action type indicating that a task is being added.
    payload: task,  // The task data to be added.
  };
};

// Action creator for assigning a task to a specific person.
// It returns an action object with a type of ASSIGN_TASK and a payload containing the task ID and the assignee.
export const assignTask = (taskId, assignee) => {
  return {
    type: ASSIGN_TASK, // The action type indicating that a task is being assigned.
    payload: {
      taskId,    // The ID of the task being assigned.
      assignee,  // The person to whom the task is being assigned.
    },
  };
};

// Action creator for assigning a due date to a specific task.
// It returns an action object with a type of ASSIGN_DUE_DATE and a payload containing the task ID and the due date.
export const assignDueDate = (taskId, dueDate) => {
  return {
    type: ASSIGN_DUE_DATE, // The action type indicating that a due date is being assigned.
    payload: {
      taskId,   // The ID of the task for which the due date is being set.
      dueDate,  // The due date to be assigned to the task.
    },
  };
};

// Action creator for moving a task to a different column (e.g., in a kanban board).
// It returns an action object with a type of MOVE_TASK and a payload containing the task ID, the target column, and a timestamp.
export const moveTask = (taskId, targetColumn) => {
  return {
    type: MOVE_TASK, // The action type indicating that a task is being moved to a different column.
    payload: {
      taskId,        // The ID of the task being moved.
      targetColumn,  // The column to which the task is being moved.
      timestamp: new Date(), // The current time when the task is moved (used for tracking or history).
    },
  };
};

// Action creator for adding a note to a specific task.
// It returns an action object with a type of ADD_NOTE and a payload containing the task ID and the note content.
export const addNote = (taskId, note) => {
  return {
    type: ADD_NOTE, // The action type indicating that a note is being added to a task.
    payload: {
      taskId, // The ID of the task to which the note is being added.
      note,   // The content of the note being added.
    },
  };
};