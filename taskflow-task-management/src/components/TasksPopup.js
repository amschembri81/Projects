import React from "react";
import styled from "styled-components";

// Styled-component for popup container.
const PopupContainer = styled.div`
  position: fixed; /* Position the popup in a fixed spot on the screen */
  top: 50%; /* Center the popup vertically */
  left: 50%; /* Center the popup horizontally */
  transform: translate(-50%, -50%); /* Adjust for the actual center positioning */
  background-color: white; /* White background for the popup */
  padding: 20px; /* Padding inside the popup */
  border-radius: 8px; /* Rounded corners for the popup */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Light shadow for a 3D effect */
  z-index: 1000; /* Ensure the popup is above other elements */
  width: 300px; /* Fixed width for the popup */
`;

// Styled-component for overlay that covers the screen behind the popup.
const Overlay = styled.div`
  position: fixed; /* Cover the entire screen */
  top: 0;
  left: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent dark background */
  z-index: 999; /* Ensure the overlay is just below the popup */
`;

// Styled-component for list of tasks inside the popup.
const TaskList = styled.ul`
  padding-left: 0; /* Remove default padding */
  list-style-type: none; /* Remove bullets */
  font-size: 14px; /* Set a smaller font size */
`;

// Styled-component for individual task items in the list.
const TaskItem = styled.li`
  background-color: #bbdefb; /* Light blue background for each task */
  border-radius: 5px; /* Rounded corners for each task item */
  padding: 5px; /* Padding inside each task item */
  margin-top: 5px; /* Space between task items */
`;

// Styled-component for the close button.
const Button = styled.button`
  padding: 10px; /* Padding inside the button */
  background-color: #5c6bc0; /* Initial background color */
  color: white; /* White text color */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners for the button */
  cursor: pointer; /* Pointer cursor on hover */
  margin-top: 10px; /* Space above the button */
  width: 100%; /* Full width button */
  &:hover {
    background-color: #3949ab; /* Darker background color on hover */
  }
`;

// TasksPopup component to display a list of tasks in a popup.
const TasksPopup = ({ tasks, onClose }) => {
  return (
    <>
      {/* Overlay that closes the popup when clicked */}
      <Overlay onClick={onClose} />
      {/* Popup container displaying the list of tasks */}
      <PopupContainer>
        <h3>Tasks Due</h3> {/* Popup title */}
        <TaskList>
          {/* Render each task in the list */}
          {tasks.map((task, index) => (
            <TaskItem key={index}>
              {task.text} (Assigned to: {task.assignee}) {/* Task text and assignee */}
            </TaskItem>
          ))}
        </TaskList>
        <Button onClick={onClose}>Close</Button> {/* Close button to close the popup */}
      </PopupContainer>
    </>
  );
};

export default TasksPopup;