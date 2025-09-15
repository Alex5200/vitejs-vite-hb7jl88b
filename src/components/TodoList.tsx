import React from 'react';
import TaskItem from './TaskItem';

interface TodoListProps {
  todos: Array<{
    id: string;
    text: string;
    completed: boolean;
  }>;
  onToggle: (id: string) => void;
  filter: 'all' | 'active' | 'completed';
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, filter }) => {
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (todos.length === 0) {
    return null;
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TaskItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
};

export default TodoList;
