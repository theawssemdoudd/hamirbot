'use client'
import BottomNavigation from '@/components/BottomNavigation'; 
import { useState, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  url: string;
  completed: boolean;
}

const TasksPage = ({ tasks, telegramId }: { tasks: Task[]; telegramId: string }) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  useEffect(() => {
    // تحميل المهام المكتملة من localStorage (يعمل فقط على العميل)
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    setTaskList(prevTasks => prevTasks.filter(task => !completedTasks.includes(task.id)));
  }, []);

  const handleTaskClick = async (taskId: number) => {
    try {
      const task = taskList.find(t => t.id === taskId);
      if (task) {
        window.open(task.url, '_blank');
      }

      setTaskList(prevTasks =>
        prevTasks.map(t =>
          t.id === taskId ? { ...t, completed: true } : t
        )
      );
    } catch (error) {
      console.error('Error opening task:', error);
    }
  };

  const handleCheckClick = async (taskId: number) => {
    try {
      const response = await fetch('/api/update-points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telegramId }),
      });

      if (!response.ok) {
        throw new Error('Failed to update points');
      }

      setTaskList(prevTasks => prevTasks.filter(t => t.id !== taskId));

      // حفظ المهمة المكتملة في localStorage (يعمل فقط على العميل)
      const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
      completedTasks.push(taskId);
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Tasks</h1>
      {taskList.map(task => (
        <div key={task.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{task.title}</span>
            {!task.completed ? (
              <button
                onClick={() => handleTaskClick(task.id)}
                style={{ padding: '5px 10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '3px' }}
              >
                Start
              </button>
            ) : (
              <button
                onClick={() => handleCheckClick(task.id)}
                style={{ padding: '5px 10px', backgroundColor: '#28A745', color: 'white', border: 'none', borderRadius: '3px' }}
              >
                Check
              </button>
            )}
          </div>
        </div>
      ))}
     <BottomNavigation />
    </div>
  );
};

export default TasksPage;
