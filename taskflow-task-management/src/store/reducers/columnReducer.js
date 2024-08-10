// The state consists of a 'columns' array, which will hold a list of column objects.
const initialState = {
  columns: [],
};

// The columnReducer function is responsible for handling actions related to the column state.
// It takes the current state and an action as arguments and returns the new state based on the action type.
const columnReducer = (state = initialState, action) => {
  // Use a switch statement to determine how to handle different action types.
  switch (action.type) {
    // If the action type is 'ADD_COLUMN', this case is executed.
    case 'ADD_COLUMN':
      // Return a new state object with the existing state properties spread (...state)
      // and the 'columns' array updated to include the new column provided in the action's payload.
      return {
        ...state, // Spread the current state to ensure all other state properties remain unchanged.
        columns: [...state.columns, action.payload], // Add the new column to the columns array.
      };
    
    // If the action type does not match any of the defined cases, return the current state unchanged.
    default:
      return state; // No changes are made to the state.
  }
};

export default columnReducer;