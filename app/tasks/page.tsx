'use client'

import TasksPage from '../../components/TasksPage';

const tasks = [
  { id: 1, title: 'Task 1', url: 'https://example.com/task1', completed: false },
  { id: 2, title: 'Task 2', url: 'https://example.com/task2', completed: false },
];

export default function Tasks() {
  return <TasksPage tasks={tasks} telegramId="12345" />;
}
