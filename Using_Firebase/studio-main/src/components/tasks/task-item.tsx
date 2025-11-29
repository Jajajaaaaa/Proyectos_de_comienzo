'use client';

import { useState } from 'react';
import type { Task } from '@/lib/types';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarIcon, Pencil, Trash2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const editFormSchema = z.object({
  text: z.string().min(3, {
    message: 'Task description must be at least 3 characters.',
  }),
});

type TaskItemProps = {
  task: Task;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newText: string, newDueDate: Date | null) => void;
};

export function TaskItem({ task, onToggleTask, onDeleteTask, onEditTask }: TaskItemProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedDate, setEditedDate] = useState<Date | undefined>(task.dueDate ?? undefined);

  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      text: task.text,
    },
  });

  const handleEditSubmit = (values: z.infer<typeof editFormSchema>) => {
    onEditTask(task.id, values.text, editedDate || null);
    setIsEditDialogOpen(false);
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset({ text: task.text });
      setEditedDate(task.dueDate ?? undefined);
    }
    setIsEditDialogOpen(open);
  }

  return (
    <>
      <Card
        className={cn(
          'transition-all duration-300 hover:shadow-md animate-in fade-in-0 zoom-in-95',
          task.completed ? 'bg-card/50 dark:bg-card/50' : 'bg-card dark:bg-card'
        )}
      >
        <CardContent className="p-4 flex items-center gap-4">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => onToggleTask(task.id)}
            aria-label={`Mark task as ${task.completed ? 'incomplete' : 'complete'}`}
            className="h-6 w-6 rounded-full"
          />
          <div className="flex-grow">
            <label
              htmlFor={`task-${task.id}`}
              className={cn(
                'font-medium transition-colors cursor-pointer',
                task.completed && 'line-through text-muted-foreground'
              )}
            >
              {task.text}
            </label>
            {task.dueDate && (
              <p className={cn(
                'text-sm text-muted-foreground',
                task.completed && 'line-through'
              )}>
                Due: {format(task.dueDate, 'PPP')}
              </p>
            )}
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleOpenChange(true)}
              aria-label="Edit task"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteTask(task.id)}
              aria-label="Delete task"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel className="mb-2 block">Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !editedDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editedDate ? format(editedDate, 'PPP') : <span>Pick a new due date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={editedDate}
                      onSelect={setEditedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
