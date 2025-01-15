'use client';

import { useEffect, useState } from 'react';

interface Task {
  id: string;
  title: string;
  url: string;
  status: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setIsLoading(false);
      });
  }, []);

  const handleCompleteTask = async (taskId: string) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId, status: 'completed' }),
      });

      if (!res.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await res.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: 'completed' } : task
        )
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-4">
            <div>
              <h2 className="text-xl">{task.title}</h2>
              <p>Status: {task.status}</p>
              {task.status === 'pending' && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  onClick={() => handleCompleteTask(task.id)}
                >
                  Complete Task
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
