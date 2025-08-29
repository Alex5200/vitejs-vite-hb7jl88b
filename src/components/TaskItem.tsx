import React from 'react';

interface TaskItemProps {
  todo: {
    id: string;
    text: string;
    completed: boolean;
  };
  onToggle: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ todo, onToggle }) => {
  return (
    <li className="todo-item">
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <label className={todo.completed ? 'completed' : ''}>
          {todo.text}
        </label>
      </div>
    </li>
  );
};

export default TaskItem;
