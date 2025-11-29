import type { Task } from '@/lib/types';
import { TaskItem } from './task-item';
import { Separator } from '@/components/ui/separator';

type TaskListProps = {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newText: string, newDueDate: Date | null) => void;
};

export function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask }: TaskListProps) {
  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Activities</h2>
        {activeTasks.length > 0 ? (
          <div className="space-y-3">
            {activeTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleTask={onToggleTask}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4">Nothing to do! Enjoy your day. 🎉</p>
        )}
      </div>

      {completedTasks.length > 0 && (
        <div>
          <Separator className="my-6" />
          <h2 className="text-2xl font-bold font-headline mb-4">Completed</h2>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleTask={onToggleTask}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
