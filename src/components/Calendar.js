import React, { useState, useEffect } from "react";
import "../styling/Calendar.css";

function Calendar() {
  const [tasks, setTasks] = useState({}); // State to store tasks keyed by date
  const [currentDate, setCurrentDate] = useState(new Date()); // State for the currently viewed month
  const [selectedTask, setSelectedTask] = useState(null); // State for the currently selected task
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal
  const [newTask, setNewTask] = useState(""); // State for the new task input
  const [taskDate, setTaskDate] = useState(""); // State for the selected task date

  // Generate the monthly view of the calendar
  const generateMonthlyView = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = [];

    // Loop through all days of the month and add them to the array
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysInMonth.push(new Date(year, month, i));
    }

    return daysInMonth;
  };

  // Add a task to a specific date
  const addTaskToDate = (date, task) => {
    const dateString = date.toISOString().split("T")[0];
    const newTasks = { ...tasks };
    if (!newTasks[dateString]) {
      newTasks[dateString] = [];
    }
    newTasks[dateString].push({ id: Date.now(), task, completed: false });
    setTasks(newTasks);
    setNewTask("");
    setTaskDate("");
  };

  // Get tasks for a specific date
  const getTasksForDate = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return tasks[dateString] || [];
  };

  // Remove a task from a specific date
  const removeTaskFromDate = (date, taskId) => {
    const dateString = date.toISOString().split("T")[0];
    const newTasks = { ...tasks };
    newTasks[dateString] = newTasks[dateString].filter(
      (task) => task.id !== taskId
    );
    setTasks(newTasks);
    closeModal();
  };

  // Mark a task as complete
  const markTaskAsComplete = (date, taskId) => {
    const dateString = date.toISOString().split("T")[0];
    const newTasks = { ...tasks };
    const taskIndex = newTasks[dateString].findIndex(
      (task) => task.id === taskId
    );
    if (taskIndex > -1) {
      newTasks[dateString][taskIndex].completed = true;
      setTasks(newTasks);
    }
    closeModal();
  };

  // Navigate to the previous month
  const navigateToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Navigate to the next month
  const navigateToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Highlight today's date
  const highlightToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Sync tasks with an external task list (for example, sync with a task list from an API)
  const syncWithTaskList = (taskList) => {
    const newTasks = {};
    taskList.forEach((task) => {
      const dateString = new Date(task.date).toISOString().split("T")[0];
      if (!newTasks[dateString]) {
        newTasks[dateString] = [];
      }
      newTasks[dateString].push({
        id: task.id,
        task: task.task,
        completed: task.completed,
      });
    });
    setTasks(newTasks);
  };

  // Handle task click to open the edit modal
  const handleTaskClick = (date, task) => {
    setSelectedTask({ ...task, date });
    setShowModal(true);
  };

  // Close the edit modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  // Save the edited task
  const saveTask = (newTask) => {
    const dateString = selectedTask.date.toISOString().split("T")[0];
    const newTasks = { ...tasks };
    newTasks[dateString] = newTasks[dateString].map((task) =>
      task.id === selectedTask.id ? { ...task, task: newTask } : task
    );
    setTasks(newTasks);
    closeModal();
  };

  // Sync with an example external task list on component mount
  useEffect(() => {
    const externalTaskList = [
      {
        id: 1,
        date: "2024-08-15",
        task: "Meeting with team",
        completed: false,
      },
      {
        id: 2,
        date: "2024-08-17",
        task: "Doctor Appointment",
        completed: false,
      },
      // more tasks...
    ];
    syncWithTaskList(externalTaskList);
  }, []);

  // Generate the days in the currently viewed month
  const daysInMonth = generateMonthlyView(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  const today = highlightToday();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={navigateToPreviousMonth}>&larr;</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={navigateToNextMonth}>&rarr;</button>
      </div>

      <div className="task-form">
        <input
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={() => addTaskToDate(new Date(taskDate), newTask)}>
          Add Task
        </button>
      </div>

      <div className="calendar-grid">
        {daysInMonth.map((date) => (
          <div
            key={date}
            className={`calendar-day ${
              today === date.toISOString().split("T")[0] ? "today" : ""
            }`}
          >
            <span>{date.getDate()}</span>
            <div className="tasks">
              {getTasksForDate(date).map((task) => (
                <div
                  key={task.id}
                  className={`task ${task.completed ? "completed" : ""}`}
                  onClick={() => handleTaskClick(date, task)}
                >
                  <span>{task.task}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Task</h3>
            <input
              type="text"
              value={selectedTask.task}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, task: e.target.value })
              }
            />
            <button onClick={() => saveTask(selectedTask.task)}>Save</button>
            <button
              onClick={() =>
                markTaskAsComplete(selectedTask.date, selectedTask.id)
              }
            >
              Mark as Complete
            </button>
            <button
              onClick={() =>
                removeTaskFromDate(selectedTask.date, selectedTask.id)
              }
            >
              Remove
            </button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;