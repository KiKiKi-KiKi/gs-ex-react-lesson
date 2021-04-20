import dayjs from 'dayjs';
import { useState, useCallback } from 'react';
import { timestamp } from '../firebase';

export const TodoItemEditForm = ({
  id,
  itemTodo,
  itemDueDate,
  onUpdate,
  onEditModeEnd,
}) => {
  const [todo, setTodo] = useState(itemTodo);
  // datetime-local input value format `yyyy-MM-ddThh:mm`
  const [dueDate, setDueDate] = useState(
    dayjs(itemDueDate).format('YYYY-MM-DDTHH:mm'),
  );

  const updateValueHandler = useCallback(
    (callback) => (evt) => {
      const value = evt.currentTarget.value.trim();
      typeof callback === 'function' && callback(value);
    },
    [],
  );

  const updateTodoHandler = async (evt) => {
    evt.preventDefault();
    if (todo === '' || dueDate === '') {
      return false;
    }

    await onUpdate({
      id,
      postData: {
        todo,
        dueDate: timestamp(dueDate),
      },
    });

    onEditModeEnd();
  };

  return (
    <div id={id}>
      <form onSubmit={updateTodoHandler}>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};
