import React from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd"; // Import useDrop for drag-and-drop functionality.
import { useDispatch } from "react-redux"; // Import useDispatch to dispatch actions.
import Task from "./Task"; // Import the Task component for individual tasks.
import { moveTask } from "../store/actions/taskActions"; // Import the moveTask action to handle moving tasks between columns.

// Styled-component column container.
const ColumnContainer = styled.div`
  background-color: ${(props) =>
    props.title === "To Do"
      ? "#bbdefb"
      : props.title === "In Progress"
      ? "#90caf9"
      : "#64b5f6"}; // Set different background colors based on the column title.
  border-radius: 8px;
  width: 300px;
  padding: 10px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
`;

const ColumnTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #1565c0; /* Consistent title color */
  text-align: center;
`;

const Column = ({ title, tasks, onTaskClick }) => {
  const dispatch = useDispatch(); // Get the dispatch function to send actions to the Redux store.

  // Set up the drop target for tasks being dragged and dropped into this column.
  const [, drop] = useDrop({
    accept: "TASK", // Accepts draggable items of type "TASK".
    drop: (item) => {
      if (item.column !== title) {
        dispatch(moveTask(item.id, title)); // Dispatch the moveTask action if the task is dropped into a different column.
      }
    },
  });

  return (
    // Render the column container and make it a drop target.
    <ColumnContainer title={title} ref={drop}>
      <ColumnTitle>{title}</ColumnTitle> {/* Display the title of the column */}
      {/* Render each task within the column */}
      {tasks.map((task) => (
        <Task key={task.id} task={task} onTaskClick={onTaskClick} />
      ))}
    </ColumnContainer>
  );
};

export default Column;
