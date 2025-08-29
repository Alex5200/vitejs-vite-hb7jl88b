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
    saveToStorage,
  } = useTodoList();

  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(inputValue);
    setInputValue('');
  };

  const handleClearCompleted = () => {
    deleteCompleted();
    saveToStorage();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-8 text-center">
          <h1 className="text-5xl font-light text-gray-300 tracking-wider opacity-50">
            todo
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="relative mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
            />
          </div>
        </form>

        {/* List */}
        <div className="p-6 pb-4">
          <TodoList todos={todos} onToggle={toggleTodo} filter={filter} />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 bg-gray-50 border-t border-gray-200">
          <span className="text-sm text-gray-500">
            {activeCount} item{activeCount !== 1 ? 's' : ''} left
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs rounded ${
                filter === 'all'
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 text-xs rounded ${
                filter === 'active'
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 text-xs rounded ${
                filter === 'completed'
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Clear button */}
        {todos.some((t) => t.completed) && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <button
              onClick={handleClearCompleted}
              className="text-xs text-red-500 hover:text-red-700 underline"
            >
              Clear completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
