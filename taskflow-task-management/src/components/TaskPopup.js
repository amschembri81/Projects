import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { assignDueDate } from "../store/actions/taskActions";

// Styled-component for popup container.
const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

// Styled-component for overlay that covers the screen behind the popup.
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

// Styled-component for input fields inside the popup.
const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #d0d7de;
`;

// Styled-component for submit button inside the popup.
const Button = styled.button`
  padding: 10px;
  background-color: #5c6bc0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #3949ab;
  }
`;

// TaskPopup component to assign task to a person and set a due date.
const TaskPopup = ({ task, onClose, onAssignTask }) => {
  const dispatch = useDispatch(); // Get the dispatch function to send actions to the Redux store.
  
  // State to manage the assignee and due date inputs.
  const [assignee, setAssignee] = useState(task.assignee || "");
  const [dueDate, setDueDate] = useState(task.dueDate || "");

  // Handler for submitting the assigned task and due date.
  const handleSubmit = () => {
    onAssignTask(task.id, assignee, dueDate); // Call the onAssignTask callback to assign the task.
    dispatch(assignDueDate(task.id, dueDate)); // Dispatch the action to assign the due date to the task.
    onClose(); // Close the popup after submitting.
    console.log("Assigning due date:", dueDate); // Log the due date for debugging purposes.
  };

  console.log("Assigning due date:", dueDate); // Log the due date for debugging.

  return (
    <>
      {/* Overlay that closes the popup when clicked */}
      <Overlay onClick={onClose} />
      {/* Popup container with inputs for assignee and due date */}
      <PopupContainer>
        <h3>Assign Task</h3>
        <p>Task: {task.text}</p>
        <Input
          type="text"
          placeholder="Assign to..."
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)} // Update the assignee state on input change.
        />
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)} // Update the due date state on input change.
        />
        <Button onClick={handleSubmit}>Done</Button> {/* Submit the form when the button is clicked */}
      </PopupContainer>
    </>
  );
};

export default TaskPopup;