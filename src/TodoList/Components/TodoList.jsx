import dayjs from 'dayjs';
import { useCallback } from 'react';
import { COLLECTION } from '../config';
import { db } from '../firebase';
import { TodoItem } from './TodoItem';

export const TodoList = ({ todoList, onUpdateStatus, onDelete }) => {
  const changeStatusHandler = useCallback(
    ({ id, isDone }) => {
      console.log('> change State', id, !isDone);
      const status = !isDone;
      onUpdateStatus({ id, isDone: status });
      // update return undefined
      db.collection(COLLECTION).doc(id).update({
        isDone: status,
      });
    },
    [onUpdateStatus],
  );

  const deleteHandler = useCallback(
    async (id) => {
      console.log('Delete', id);
      onDelete(id);
      // delete return undefined
      await db.collection(COLLECTION).doc(id).delete();
    },
    [onDelete],
  );

  return (
    <ul>
      {todoList?.map(([id, data]) => {
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
