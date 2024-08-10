import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './store/store';
import GlobalStyles from './globalStyles';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <GlobalStyles />
          <App />
        </Router>
      </DndProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);