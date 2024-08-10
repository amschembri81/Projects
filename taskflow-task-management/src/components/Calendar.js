import React, { useState } from "react";
import styled from "styled-components";
import TasksPopup from "./TasksPopup"; // Import the TasksPopup component for displaying tasks in a popup.

// Styled-components for various UI elements of the calendar.
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin-top: 20px;
  width: 100%;
`;

const DayContainer = styled.div`
  padding: 10px;
  border-radius: 8px;
  background-color: #e8f0fe;
  min-height: 100px;
  text-align: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const TaskList = styled.ul`
  padding-left: 0;
  list-style-type: none;
  font-size: 14px;
`;

const TaskItem = styled.li`
  background-color: #bbdefb;
  border-radius: 5px;
  padding: 5px;
  margin-top: 5px;
`;

const Timestamp = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 3px;
`;

const MonthNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 300px;
  margin-bottom: 10px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  display: flex;
  align-items: center;

  &:hover svg {
    fill: darkblue;
  }
`;

const ArrowIcon = styled.svg`
  width: 34px;
  height: 40px;
  fill: #1e88e5;
  transition: fill 0.2s ease;
`;

const MonthYearDisplay = styled.div`
  font-size: 22px;
  color: #1565c0;
  font-weight: bold;
`;

const Calendar = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date()); // State to manage the current displayed month and year.
  const [selectedTasks, setSelectedTasks] = useState(null); // State to manage the tasks selected for a specific day.

  // Calculate the first and last day of the current month.
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const startDay = startOfMonth.getDay(); // Determine which day of the week the month starts on.
  const daysInMonth = endOfMonth.getDate(); // Get the total number of days in the current month.

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1); // Generate an array of days for the current month.

  // Organize tasks by their due date, storing them in an object where keys are the day of the month.
  const tasksByDate = tasks.reduce((acc, task) => {
    if (!task.dueDate) return acc;

    const dueDate = new Date(task.dueDate);
    const day = dueDate.getDate();
    const month = dueDate.getMonth();
    const year = dueDate.getFullYear();

    // Only include tasks that are due in the current displayed month and year.
    if (
      month === currentDate.getMonth() &&
      year === currentDate.getFullYear()
    ) {
      if (!acc[day]) acc[day] = [];
      acc[day].push(task);
    }
    return acc;
  }, {});

  // Handler to navigate to the previous month.
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Handler to navigate to the next month.
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Handler to display tasks for the selected day in the popup.
  const handleDayClick = (day) => {
    setSelectedTasks(tasksByDate[day] || []); // Show tasks for the clicked day or an empty array if there are none.
  };

  // Handler to close the tasks popup.
  const closePopup = () => {
    setSelectedTasks(null); // Clear the selected tasks to close the popup.
  };

  // Array of month names for display purposes.
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <CalendarContainer>
      {/* Navigation controls for the calendar */}
      <MonthNavigation>
        <ArrowButton onClick={handlePrevMonth}>
          <ArrowIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
          </ArrowIcon>
        </ArrowButton>
        <MonthYearDisplay>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </MonthYearDisplay>
        <ArrowButton onClick={handleNextMonth}>
          <ArrowIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </ArrowIcon>
        </ArrowButton>
      </MonthNavigation>

      {/* Grid layout for displaying days of the current month */}
      <CalendarGrid>
        {/* Add empty divs to account for days before the first day of the month */}
        {Array.from({ length: startDay }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {/* Display each day of the month */}
        {days.map((day) => (
          <DayContainer key={day} onClick={() => handleDayClick(day)}>
            <div>{day}</div>
            <TaskList>
              {/* Display tasks due on the current day */}
              {tasksByDate[day]?.map((task, index) => (
                <TaskItem key={index}>
                  {task.text} ({task.assignee})
                  <Timestamp>
                    {new Date(task.dueDate).toLocaleString()}{" "}
                    {/* Show the timestamp for when the task is due */}
                  </Timestamp>
                </TaskItem>
              ))}
            </TaskList>
          </DayContainer>
        ))}
      </CalendarGrid>

      {/* Conditionally render the TasksPopup component if tasks are selected for a day */}
      {selectedTasks && (
        <TasksPopup tasks={selectedTasks} onClose={closePopup} />
      )}
    </CalendarContainer>
  );
};

export default Calendar;
