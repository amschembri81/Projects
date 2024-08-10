import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Column from "./Column"; // Import the Column component.
import { addTask, assignTask, assignDueDate } from "../store/actions/taskActions"; // Import actions to add, assign, and set due dates for tasks.
import Header from "./Header"; // Import the Header.
import Calendar from "./Calendar"; // Import the Calendar component to display tasks on a calendar.
import TaskPopup from "./TaskPopup"; // Import the TaskPopup component for task assignment and due date setting.


// Styled-components for various UI elements.
const BoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
`;

const NewTaskInput = styled.input`
  width: 20%;
  height: 30px;
  padding: 8px;
  margin: 0 auto 20px auto;
  display: block;
  border-radius: 8px;
  border: 1px solid #d0d7de;
  text-align: center;
`;

const TaskManagementContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  border-radius: 8px;
  background-color: #f0f4f8;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  color: #1565c0;
  text-align: center;
  margin-bottom: 20px;
`;

const Board = () => {
  // State to manage the input for adding new tasks.
  const [taskText, setTaskText] = useState("");
  // State to manage the currently selected task for the popup (for assigning tasks and due dates).
  const [popupTask, setPopupTask] = useState(null);  

  // Retrieve the list of tasks from the Redux store.
  const tasks = useSelector((state) => state.tasks.tasks);
  // Get the dispatch function to send actions to the Redux store.
  const dispatch = useDispatch();

  // Handler function to add a new task when the "Enter" key is pressed.
  const handleAddTask = (e) => {
    if (e.key === "Enter" && taskText.trim()) {
      dispatch(addTask({ text: taskText })); // Dispatch the action to add a new task.
      setTaskText(""); // Clear the input field after adding the task.
    }
  };

  // Handler function to show the task popup when a task is clicked.
  const handleTaskClick = (task) => {
    setPopupTask(task);  // Set the selected task in state to show in the popup.
  };

  // Handler function to close the task popup.
  const closePopup = () => {
    setPopupTask(null); // Clear the selected task to hide the popup.
  };

  // Handler function to assign a task and set its due date.
  const handleAssignTask = (taskId, assignee, dueDate) => {
    dispatch(assignTask(taskId, assignee)); // Dispatch the action to assign the task to a person.
    dispatch(assignDueDate(taskId, dueDate)); // Dispatch the action to assign a due date to the task.
    closePopup();  // Close the popup after assigning the task and due date.
  };

  // Organize tasks into columns based on their current status (column).
  const columns = {
    "To Do": tasks.filter((task) => task.column === "To Do"),
    "In Progress": tasks.filter((task) => task.column === "In Progress"),
    Done: tasks.filter((task) => task.column === "Done"),
  };

  return (
    <>
      <Header /> {/* Render the header of the board */}
      {/* Input field for adding new tasks */}
      <NewTaskInput
        type="text"
        placeholder="Add a new task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyDown={handleAddTask} // Add a new task when the Enter key is pressed.
      />
      {/* Container holding the columns */}
      <BoardContainer>
        <Column
          title="To Do"
          tasks={columns["To Do"]} // Pass the "To Do" tasks to the Column component.
          onTaskClick={handleTaskClick}  // Handle task clicks to open the popup.
        />
        <Column
          title="In Progress"
          tasks={columns["In Progress"]} // Pass the "In Progress" tasks to the Column component.
          onTaskClick={handleTaskClick}  // Handle task clicks to open the popup.
        />
        <Column title="Done" tasks={columns["Done"]} /> {/* Pass the "Done" tasks to the Column component. */}
      </BoardContainer>

      {/* Container for the tasks calendar */}
      <TaskManagementContainer>
        <SectionTitle>Tasks Calendar</SectionTitle>
        <Calendar tasks={tasks} /> {/* Render the calendar component with the list of tasks */}
      </TaskManagementContainer>

      {/* Conditionally render the TaskPopup component if a task is selected */}
      {popupTask && (
        <TaskPopup
          task={popupTask} // Pass the selected task to the TaskPopup component.
          onClose={closePopup} // Handle the close action of the popup.
          onAssignTask={handleAssignTask} // Handle assigning tasks and setting due dates.
        />
      )}
    </>
  );
};

export default Board;