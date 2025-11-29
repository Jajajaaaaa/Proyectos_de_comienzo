import { ListTodo } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center space-x-4 px-4">
        <ListTodo className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground">
          The Fist⛈️⛈️
        </h1>
      </div>
    </header>
  );
}
