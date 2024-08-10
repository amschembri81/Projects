import {
  ASSIGN_TASK,
  ADD_TASK,
  MOVE_TASK,
  ADD_NOTE,
  ASSIGN_DUE_DATE,
} from "../actions/actionTypes";

// Define the initial state for the taskReducer.
// The state includes a 'tasks' array, which is either initialized from localStorage or set to an empty array.
const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [], // Retrieve tasks from localStorage, if available.
};

// Utility function to save the current state of tasks to localStorage.
const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Store tasks in localStorage as a JSON string.
};

// The taskReducer function is responsible for handling actions related to tasks.
// It takes the current state and an action as arguments and returns the new state based on the action type.
const taskReducer = (state = initialState, action) => {
  let updatedTasks; // Declare a variable to hold the updated tasks array.

  // Use a switch statement to handle different action types.
  switch (action.type) {
    // Handle the ADD_TASK action type.
    case ADD_TASK:
      // Add the new task to the tasks array, generating a unique ID and setting default properties.
      updatedTasks = [
        ...state.tasks, // Spread the existing tasks.
        {
          ...action.payload, // Include all properties of the new task from the action's payload.
          id: Date.now(), // Generate a unique ID using the current timestamp.
          column: "To Do", // Set the default column to "To Do".
          notes: [], // Initialize an empty notes array.
          timestamps: { toDo: new Date() }, // Record the timestamp when the task is added to "To Do".
        },
      ];
      saveTasksToLocalStorage(updatedTasks); // Save the updated tasks array to localStorage.
      return {
        ...state, // Spread the current state to maintain other state properties.
        tasks: updatedTasks, // Update the tasks array in the state.
      };

    // Handle the MOVE_TASK action type.
    case MOVE_TASK:
      // Update the column of the task being moved and add a timestamp for the new column.
      updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              column: action.payload.targetColumn, // Update the column of the task.
              timestamps: {
                ...task.timestamps, // Keep existing timestamps.
                [action.payload.targetColumn.toLowerCase().replace(" ", "")]:
                  new Date(), // Add a timestamp for the new column.
              },
            }
          : task
      );
      saveTasksToLocalStorage(updatedTasks); // Save the updated tasks array to localStorage.
      return {
        ...state,
        tasks: updatedTasks, // Update the tasks array in the state.
      };

    // Handle the ASSIGN_DUE_DATE action type.
    case ASSIGN_DUE_DATE:
      console.log("Action payload:", action.payload); // Log the action payload for debugging.
      // Assign a due date to the specified task.
      updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, dueDate: action.payload.dueDate } // Set the due date for the task.
          : task
      );
      saveTasksToLocalStorage(updatedTasks); // Save the updated tasks array to localStorage.
      return {
        ...state,
        tasks: updatedTasks, // Update the tasks array in the state.
      };

    // Handle the ASSIGN_TASK action type.
    case ASSIGN_TASK:
      // Assign a task to a specific person and record the assignment timestamp.
      updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              assignee: action.payload.assignee, // Set the assignee for the task.
              timestamps: {
                ...task.timestamps, // Keep existing timestamps.
                assigned: new Date(), // Add a timestamp for when the task was assigned.
              },
            }
          : task
      );
      saveTasksToLocalStorage(updatedTasks); // Save the updated tasks array to localStorage.
      return {
        ...state,
        tasks: updatedTasks, // Update the tasks array in the state.
      };

    // Handle the ADD_NOTE action type.
    case ADD_NOTE:
      // Add a note to a specific task and record the timestamp for when the note was added.
      updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              notes: [...task.notes, action.payload.note], // Append the new note to the notes array.
              timestamps: {
                ...task.timestamps, // Keep existing timestamps.
                noteAdded: new Date(), // Add a timestamp for when the note was added.
              },
            }
          : task
      );
      saveTasksToLocalStorage(updatedTasks); // Save the updated tasks array to localStorage.
      return {
        ...state,
        tasks: updatedTasks, // Update the tasks array in the state.
      };

    // If the action type does not match any of the defined cases, return the current state unchanged.
    default:
      return state; // No changes are made to the state.
  }
};

export default taskReducer;