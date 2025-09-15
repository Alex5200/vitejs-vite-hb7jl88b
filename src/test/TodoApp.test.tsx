import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { useTodoList } from '../hooks/useTodoList';

// Mock the useTodoList hook
jest.mock('../hooks/useTodoList');

const mockUseTodoList = useTodoList as jest.MockedFunction<typeof useTodoList>;

describe('Todo App', () => {
  const mockTodos = [
    { id: '1', text: 'First task', completed: false },
    { id: '2', text: 'Second task', completed: true },
  ];

  const mockFunctions = {
    addTodo: jest.fn(),
    toggleTodo: jest.fn(),
    deleteCompleted: jest.fn(),
    clearAll: jest.fn(),
    saveToStorage: jest.fn(),
    activeCount: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTodoList.mockReturnValue({
      todos: mockTodos,
      ...mockFunctions,
    });
  });

  test('renders todo app with title', () => {
    render(<App />);
    expect(screen.getByText('todos')).toBeInTheDocument();
  });

  test('should add a new task', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockFunctions.addTodo).toHaveBeenCalledWith('New Task');
  });

  test('should not add empty task', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockFunctions.addTodo).not.toHaveBeenCalled();
  });

  test('should toggle task completion', () => {
    render(<App />);
    const checkboxes = screen.getAllByRole('checkbox');

    fireEvent.click(checkboxes[0]);
    expect(mockFunctions.toggleTodo).toHaveBeenCalledWith('1');
  });

  test('should filter tasks', () => {
    render(<App />);

    // Check initial state (All tasks)
    expect(screen.getByText('First task')).toBeInTheDocument();
    expect(screen.getByText('Second task')).toBeInTheDocument();

    // Click Active filter
    const activeFilter = screen.getByText('Active');
    fireEvent.click(activeFilter);

    // Mock the hook to return only active todos
    mockUseTodoList.mockReturnValueOnce({
      todos: mockTodos.filter(todo => !todo.completed),
      ...mockFunctions,
    });

    // Re-render with new props
    render(<App />);

    expect(screen.getByText('First task')).toBeInTheDocument();
    expect(screen.queryByText('Second task')).not.toBeInTheDocument();
  });

  test('should show correct count of active items', () => {
    render(<App />);
    expect(screen.getByText('1 item left')).toBeInTheDocument();
  });

  test('should clear completed tasks', () => {
    render(<App />);
    const clearButton = screen.getByText('Clear completed');
    fireEvent.click(clearButton);
    expect(mockFunctions.deleteCompleted).toHaveBeenCalled();
  });

  test('should persist todos in localStorage', () => {
    const { unmount } = render(<App />);

    // Simulate component unmount
    unmount();

    expect(mockFunctions.saveToStorage).toHaveBeenCalled();
  });

  test('should display correct empty state', () => {
    // Mock empty todos
    mockUseTodoList.mockReturnValueOnce({
      todos: [],
      ...mockFunctions,
      activeCount: 0,
    });

    render(<App />);

    const activeFilter = screen.getByText('All');
    fireEvent.click(activeFilter);

    // No tasks message should be shown when filtered list is empty
    mockUseTodoList.mockReturnValueOnce({
      todos: [],
      ...mockFunctions,
      activeCount: 0,
    });

    render(<App />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    expect(input).toBeInTheDocument();
  });
});
