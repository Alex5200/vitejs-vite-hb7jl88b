import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Todo App', () => {
  test('should add a new task', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'Test task' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  test('should mark task as completed', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'Complete me' } });
    fireEvent.click(addButton);

    const task = screen.getByText('Complete me');
    const checkbox = task.parentElement?.querySelector('button');
    fireEvent.click(checkbox!);

    expect(task).toHaveClass('line-through');
  });

  test('should show count of remaining tasks', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(addButton);

    expect(screen.getByText('1 item left')).toBeInTheDocument();
  });

  test('should clear completed tasks', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(addButton);

    const task = screen.getByText('Task 1');
    const checkbox = task.parentElement?.querySelector('button');
    fireEvent.click(checkbox!);

    const clearBtn = screen.getByText('Clear completed');
    fireEvent.click(clearBtn);

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
  });
});
