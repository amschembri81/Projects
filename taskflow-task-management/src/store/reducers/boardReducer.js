const initialState = {
  boards: [],
};

// The boardReducer function is responsible for handling actions related to the board state.
// It takes the current state and an action as arguments and returns the new state based on the action type.
const boardReducer = (state = initialState, action) => {
  // Use a switch statement to determine how to handle different action types.
  switch (action.type) {
    // If the action type is 'ADD_BOARD', this case is executed.
    case 'ADD_BOARD':
      // Return a new state object with the existing state properties spread (...state)
      // and the 'boards' array updated to include the new board provided in the action's payload.
      return {
        ...state, // Spread the current state to ensure all other state properties remain unchanged.
        boards: [...state.boards, action.payload], // Add the new board to the boards array.
      };
    
    // If the action type does not match any of the defined cases, return the current state unchanged.
    default:
      return state; // No changes are made to the state.
  }
};

export default boardReducer;