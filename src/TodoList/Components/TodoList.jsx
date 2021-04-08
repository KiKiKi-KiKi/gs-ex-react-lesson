import dayjs from 'dayjs';
import { useCallback } from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({ todoList }) => {
  const changeStatusHandler = useCallback(({ id, isDone }) => {
    console.log('change State', id, isDone);
  }, []);

  const deleteHandler = useCallback((id) => {
    console.log('Delete', id);
  }, []);

  return (
    <ul>
      {todoList?.map(({ id, data }) => {
        return (
          <li key={id} id={id}>
            <TodoItem
              id={id}
              {...data}
              dueDate={dayjs(data.dueDate.seconds).format('YYYY-MM-DD H:mm:ss')}
              changeStatusHandler={changeStatusHandler}
              deleteHandler={deleteHandler}
            />
          </li>
        );
      })}
    </ul>
  );
};
