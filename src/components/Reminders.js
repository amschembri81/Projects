import React, { useState, useEffect } from 'react';
import '../styling/Reminders.css';

function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newReminderText, setNewReminderText] = useState('');
  const [reminderDateTime, setReminderDateTime] = useState('');

  // Set a reminder for a specific task at a given date and time
  const setReminder = (taskId, dateTime) => {
    setReminders([...reminders, { id: Date.now(), taskId, dateTime, completed: false }]);
    setNewReminderText('');
    setReminderDateTime('');
  };

  // Get a list of upcoming reminders within the next day or week
  const getUpcomingReminders = () => {
    const now = new Date();
    return reminders.filter(reminder => new Date(reminder.dateTime) > now && !reminder.completed);
  };

  // Send a notification for a reminder when it is due
  const sendNotification = (reminder) => {
    alert(`Reminder: Task ${reminder.taskId} is due!`);
  };

  // Snooze a reminder for a specified duration
  const snoozeReminder = (reminderId, duration) => {
    const newReminders = reminders.map(reminder => {
      if (reminder.id === reminderId) {
        const newDateTime = new Date(reminder.dateTime);
        newDateTime.setMinutes(newDateTime.getMinutes() + duration);
        return { ...reminder, dateTime: newDateTime };
      }
      return reminder;
    });
    setReminders(newReminders);
  };

  // Cancel a set reminder
  const cancelReminder = (reminderId) => {
    setReminders(reminders.filter(reminder => reminder.id !== reminderId));
    closeModal();
  };

  // Mark a reminder as completed
  const markReminderAsComplete = (reminderId) => {
    const newReminders = reminders.map(reminder => {
      if (reminder.id === reminderId) {
        return { ...reminder, completed: true };
      }
      return reminder;
    });
    setReminders(newReminders);
    closeModal();
  };

  // Get all reminders associated with a specific task
  const getRemindersForTask = (taskId) => {
    return reminders.filter(reminder => reminder.taskId === taskId);
  };

  // Set a reminder to repeat at specified intervals
  const repeatReminder = (reminderId, interval) => {
    const reminder = reminders.find(reminder => reminder.id === reminderId);
    if (reminder) {
      const newDateTime = new Date(reminder.dateTime);
      if (interval === 'daily') {
        newDateTime.setDate(newDateTime.getDate() + 1);
      } else if (interval === 'weekly') {
        newDateTime.setDate(newDateTime.getDate() + 7);
      }
      setReminders([...reminders, { ...reminder, id: Date.now(), dateTime: newDateTime }]);
    }
  };

  // Sync reminders with calendar tasks
  const syncWithCalendar = (calendarTasks) => {
    const newReminders = calendarTasks.map(task => ({
      id: Date.now(),
      taskId: task.id,
      dateTime: task.dateTime || new Date(task.date).toISOString(),
      completed: task.completed
    }));
    setReminders(newReminders);
  };

  // Show notification for a reminder with options to mark as complete or snooze
  const showReminderNotification = (reminderId) => {
    const reminder = reminders.find(reminder => reminder.id === reminderId);
    if (reminder) {
      sendNotification(reminder);
    }
  };

  // Handle reminder click to open modal
  const handleReminderClick = (reminder) => {
    setSelectedReminder(reminder);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedReminder(null);
  };

  // Save edited reminder
  const saveReminder = () => {
    const newReminders = reminders.map(reminder =>
      reminder.id === selectedReminder.id ? { ...reminder, taskId: newReminderText } : reminder
    );
    setReminders(newReminders);
    closeModal();
  };

  useEffect(() => {
    // Example of syncing with an external calendar task list
    const calendarTasks = [
      { id: 1, dateTime: '2024-08-15T10:00:00', task: 'Meeting with team', completed: false },
      { id: 2, dateTime: '2024-08-17T14:00:00', task: 'Doctor Appointment', completed: false },
      // more tasks...
    ];
    syncWithCalendar(calendarTasks);
  }, []);

  return (
    <div className="reminders-container">
      <div className="reminder-form">
        <input
          type="text"
          placeholder="New Reminder"
          value={newReminderText}
          onChange={(e) => setNewReminderText(e.target.value)}
        />
        <input
          type="datetime-local"
          value={reminderDateTime}
          onChange={(e) => setReminderDateTime(e.target.value)}
        />
        <button onClick={() => setReminder(newReminderText, reminderDateTime)}>Set Reminder</button>
      </div>

      <div className="reminder-list">
        <h3>Upcoming Reminders</h3>
        {getUpcomingReminders().map(reminder => (
          <div
            key={reminder.id}
            className={`reminder-item ${reminder.completed ? 'completed' : ''}`}
            onClick={() => handleReminderClick(reminder)}
          >
            <span>{reminder.taskId}</span>
            <span>{new Date(reminder.dateTime).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Reminder</h3>
            <input
              type="text"
              value={selectedReminder.taskId}
              onChange={(e) => setSelectedReminder({ ...selectedReminder, taskId: e.target.value })}
            />
            <button onClick={saveReminder}>Save</button>
            <button onClick={() => snoozeReminder(selectedReminder.id, 10)}>Snooze 10 mins</button>
            <button onClick={() => markReminderAsComplete(selectedReminder.id)}>Mark as Complete</button>
            <button onClick={() => cancelReminder(selectedReminder.id)}>Cancel</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reminders;