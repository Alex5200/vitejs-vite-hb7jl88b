import React, { useState } from 'react';
import { useTodoList } from './hooks/useTodoList';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteCompleted,
    activeCount,
  } = useTodoList();

  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="app">
      <h1>todos</h1>
      <div className="todo-container">
        <form onSubmit={handleSubmit} className="todo-form">
          <button type="button" className="toggle-all">
            ❯
          </button>
          <input
            type="text"
            className="todo-input"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
        
        <TodoList todos={todos} onToggle={toggleTodo} filter={filter} />
        
        {todos.length > 0 && (
          <footer className="todo-footer">
            <span className="todo-count">
              {activeCount} {activeCount === 1 ? 'item' : 'items'} left
            </span>
            <div className="filters">
              <button 
                className={filter === 'all' ? 'selected' : ''}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={filter === 'active' ? 'selected' : ''}
                onClick={() => setFilter('active')}
              >
                Active
              </button>
              <button 
                className={filter === 'completed' ? 'selected' : ''}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
            {todos.some(todo => todo.completed) && (
              <button 
                className="clear-completed"
                onClick={deleteCompleted}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}

export default App;
