import React, { useState } from "react";
import Calendar from "./components/Calendar";
import ReadingList from "./components/ReadingList";
import Budget from "./components/Budget";
import Reminders from "./components/Reminders";
import Weather from "./components/Weather";
import Search from "./components/Search";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardItem from "./components/BoardItem";

function Home() {
  // State to manage the list of components displayed on the board
  const [components, setComponents] = useState([
    {
      id: 1,
      component: <Calendar />,
      name: "Calendar",
      visible: true,
      color: "lightcoral",
    },
    {
      id: 2,
      component: <ReadingList />,
      name: "ReadingList",
      visible: true,
      color: "lightblue",
    },
    {
      id: 3,
      component: <Reminders />,
      name: "Reminders",
      visible: true,
      color: "gray",
    },
    {
      id: 4,
      component: <Weather />,
      name: "Weather",
      visible: true,
      color: "#DCFFDB",
    },
    {
      id: 5,
      component: <Search />,
      name: "Search",
      visible: true,
      color: "lavender",
    },
    {
      id: 6,
      component: <Budget />,
      name: "Budget",
      visible: true,
      color: "lightyellow",
    },
  ]);

  // Function to toggle the visibility of a component by its ID
  const toggleVisibility = (id) => {
    setComponents(
      components.map((comp) =>
        comp.id === id ? { ...comp, visible: !comp.visible } : comp
      )
    );
  };

  // Function to move a component within the list based on drag-and-drop actions
  const moveComponent = (dragIndex, hoverIndex) => {
    const dragComponent = components[dragIndex];
    const newComponents = [...components];
    // Remove the component from its original position
    newComponents.splice(dragIndex, 1);
    // Insert the component at the new position
    newComponents.splice(hoverIndex, 0, dragComponent);
    setComponents(newComponents);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="home-container">
        <div className="board">
          {components.map((comp, index) =>
            // Only render components that are visible
            comp.visible ? (
              <BoardItem
                key={comp.id}
                index={index}
                id={comp.id}
                moveComponent={moveComponent}
                color={comp.color}
              >
                <div
                  className="component-container"
                  style={{ backgroundColor: comp.color }}
                >
                  <div className="component-header">
                    <h3>{comp.name}</h3>
                    {/* Button to hide the component */}
                    <button onClick={() => toggleVisibility(comp.id)}>
                      Hide
                    </button>
                  </div>
                  {/* Render the component itself */}
                  {comp.component}
                </div>
              </BoardItem>
            ) : null
          )}
        </div>
        <div className="hidden-components">
          <h4>Hidden Components</h4>
          {components
            .filter((comp) => !comp.visible)
            .map((comp) => (
              // Button to show hidden components
              <button key={comp.id} onClick={() => toggleVisibility(comp.id)}>
                Show {comp.name}
              </button>
            ))}
        </div>
      </div>
    </DndProvider>
  );
}

function App() {
  return (
    <div className="App">
      <div className="title-container">
        <h1 className="title">Clarity</h1>
        <img
          src={`${process.env.PUBLIC_URL}/Calendar.png`}
          alt="Calendar"
          className="title-image"
        />
      </div>
      <Home />
    </div>
  );
}

export default App;
