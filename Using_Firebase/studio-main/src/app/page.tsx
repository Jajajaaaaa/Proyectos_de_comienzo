'use client';

import { useState, useEffect } from 'react';
import type { Task } from '@/lib/types';
import { Header } from '@/components/layout/header';
import { AddTask } from '@/components/tasks/add-task';
import { TaskList } from '@/components/tasks/task-list';

const generateId = () => `task_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`;

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTasks([
      { id: generateId(), text: 'Design the TaskTango UI', dueDate: new Date(), completed: true },
      { id: generateId(), text: 'Develop the core features', dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), completed: false },
      { id: generateId(), text: 'Prepare for launch party', dueDate: null, completed: false },
    ]);
  }, []);

  const handleAddTask = (text: string, dueDate: Date | null) => {
    const newTask: Task = {
      id: generateId(),
      text,
      dueDate,
      completed: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: string, newText: string, newDueDate: Date | null) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText, dueDate: newDueDate } : task
      )
    );
  };

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <AddTask onAddTask={handleAddTask} />
          <div className="mt-8">
            <TaskList
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-muted-foreground text-sm">
        <p>Made with Firebase... By Josue Escobar ©</p>
      </footer>
    </div>
  );
}
