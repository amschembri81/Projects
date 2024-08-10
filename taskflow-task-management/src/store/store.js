import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import boardReducer from './reducers/boardReducer';
import columnReducer from './reducers/columnReducer';
import taskReducer from './reducers/taskReducer';

const rootReducer = combineReducers({
  boards: boardReducer,
  columns: columnReducer,
  tasks: taskReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;