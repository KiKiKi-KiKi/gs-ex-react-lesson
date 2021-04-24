import { useState, useCallback } from 'react';
import { useAppendTodo } from '../hooks/useAppendTodo';
import { LoadingSpinner } from './LoadingSpinner';

export const InputForm = ({ onReloadTodoList }) => {
  const [todo, setTodo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { isLoading, appendTodoHandler } = useAppendTodo();

  const updateValueHandler = useCallback(
    (callback) => (evt) => {
      const value = evt.currentTarget.value;
      typeof callback === 'function' && callback(value);
    },
    [],
  );

  const resetFormHandler = useCallback(() => {
    setTodo('');
    setDueDate('');
  }, []);

  const submitHandler = async (evt) => {
    evt.preventDefault();
    const todoTitle = todo.trim();
    if (todoTitle === '' || dueDate === '') {
      return false;
    }

    try {
      // DocumentReference
      await appendTodoHandler({ todoTitle, dueDate });
      resetFormHandler();
      onReloadTodoList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form action="" onSubmit={submitHandler}>
      <div>
        <label htmlFor="todo">Title</label>
        <input
          name="todo"
          type="text"
          value={todo}
          onChange={updateValueHandler(setTodo)}
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date</label>
        <input
          name="dueDate"
          type="datetime-local"
          value={dueDate}
          onChange={updateValueHandler(setDueDate)}
        />
      </div>
      <div>
        <button type="submit" disabled={isLoading}>
          Submit
          {isLoading && <LoadingSpinner />}
        </button>
      </div>
    </form>
  );
};
