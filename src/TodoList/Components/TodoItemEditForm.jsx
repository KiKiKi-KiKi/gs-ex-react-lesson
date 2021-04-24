import dayjs from 'dayjs';
import { useState, useCallback } from 'react';
import { timestamp } from '../firebase';
import { useUpdateTodo } from '../hooks/useUpdateTodo';

export const TodoItemEditForm = ({
  id,
  todo: currentTodo,
  dueDate: currentDueDate,
  onEditModeEnd,
}) => {
  const { isLoading, updateTodoHandler } = useUpdateTodo();
  const [todo, setTodo] = useState(currentTodo);
  // datetime-local input value format `yyyy-MM-ddThh:mm`
  const [dueDate, setDueDate] = useState(
    dayjs(currentDueDate).format('YYYY-MM-DDTHH:mm'),
  );

  const updateValueHandler = useCallback(
    (callback) => (evt) => {
      const value = evt.currentTarget.value;
      typeof callback === 'function' && callback(value);
    },
    [],
  );

  const cancelHandler = useCallback(() => {
    onEditModeEnd();
  }, [onEditModeEnd]);

  const onUpdateTodoH = async (evt) => {
    evt.preventDefault();
    const todoTitle = todo.trim();
    if (todoTitle === '' || dueDate === '') {
      return false;
    }

    const postData = {
      todo: todoTitle,
      dueDate: timestamp(dueDate),
    };

    try {
      await updateTodoHandler({ id, data: postData });
    } catch (error) {
      console.log(error.message);
    }

    console.log(postData);

    onEditModeEnd();
  };

  return (
    <div id={id}>
      <form onSubmit={onUpdateTodoH}>
        <input
          type="text"
          name="todo"
          value={todo}
          onChange={updateValueHandler(setTodo)}
          placeholder="Input Todo"
          autoFocus={true}
        />
        <input
          name="dueDate"
          type="datetime-local"
          value={dueDate}
          onChange={updateValueHandler(setDueDate)}
        />
        <button type="submit" disabled={isLoading}>
          Update
        </button>
        <button type="button" onClick={cancelHandler} disabled={isLoading}>
          Cancel
        </button>
      </form>
    </div>
  );
};
