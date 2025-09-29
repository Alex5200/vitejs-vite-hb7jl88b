import { useState, useEffect } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const useTodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        const todosFromStorage = JSON.parse(storedTodos);
        setTodos(todosFromStorage);
      } catch (error) {
        console.error('Error loading todos from local storage:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const toggleTodo = (id: string) => {
    setTodos((prev) => 
      prev.map((todo) => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const clearAll = () => {
    setTodos([]);
  };

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Error saving todos to local storage:', error);
      }
    }
  }, [todos, isInitialized]);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteCompleted,
    clearAll,
    activeCount,
  };
};